/**
 * WeeLog - Tiny Logging Library for JavaScript
 * Zero dependencies, browser and Node.js compatible
 */

export interface LoggerOptions {
  level?: LogLevel;
  enabled?: boolean;
  useTimestamp?: boolean;
  enablePerformanceTracking?: boolean;
  enableMemoryTracking?: boolean;
  logMemoryInline?: boolean;
  maxLogHistory?: number;
  enableLogAnalytics?: boolean;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type LogInterceptor = (level: LogLevel, message: string, context?: string, data?: any) => void;

export interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  data?: any;
  timestamp: Date;
  formatted: string;
  performance?: PerformanceMetrics;
  memory?: MemoryInfo;
  stackTrace?: string;
  sessionId?: string;
}

export interface PerformanceMetrics {
  duration?: number;
  timestamp: number;
  memoryUsage?: number;
}

export interface MemoryInfo {
  used: number;
  total: number;
  percentage: number;
}

export interface LogAnalytics {
  totalLogs: number;
  logsByLevel: Record<LogLevel, number>;
  averageLogRate: number;
  errorRate: number;
  topContexts: Array<{ context: string; count: number }>;
}

export class Logger {
  private level: LogLevel;
  private enabled: boolean;
  private useTimestamp: boolean;
  private context?: string;
  private interceptors: LogInterceptor[];
  private enablePerformanceTracking: boolean;
  private enableMemoryTracking: boolean;
  private logMemoryInline: boolean;
  private maxLogHistory: number;
  private enableLogAnalytics: boolean;
  private logHistory: LogEntry[];
  private sessionId: string;
  private performanceMarks: Map<string, number>;
  private analytics: LogAnalytics;
  
  private readonly levels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  };
  
  private readonly colors: Record<LogLevel, string> = {
    debug: '#6b7280',
    info: '#2563eb',
    warn: '#f59e0b',
    error: '#ef4444'
  };

  constructor(options: LoggerOptions = {}) {
    this.level = options.level || 'info';
    this.enabled = options.enabled !== false;
    this.useTimestamp = options.useTimestamp || false;
    this.enablePerformanceTracking = options.enablePerformanceTracking || false;
    this.enableMemoryTracking = options.enableMemoryTracking || false;
    this.logMemoryInline = options.logMemoryInline || false;
    this.maxLogHistory = options.maxLogHistory || 1000;
    this.enableLogAnalytics = options.enableLogAnalytics || false;
    this.interceptors = [];
    this.logHistory = [];
    this.sessionId = this.generateSessionId();
    this.performanceMarks = new Map();
    this.analytics = {
      totalLogs: 0,
      logsByLevel: { debug: 0, info: 0, warn: 0, error: 0 },
      averageLogRate: 0,
      errorRate: 0,
      topContexts: []
    };
  }

  /**
   * Set the minimum log level
   */
  setLevel(level: LogLevel): Logger {
    this.level = level;
    return this;
  }

  /**
   * Enable or disable logging
   */
  enable(enabled: boolean): Logger {
    this.enabled = enabled;
    return this;
  }

  /**
   * Create a logger with a specific context
   */
  withContext(context: string): Logger {
    const newLogger = Object.create(this);
    newLogger.context = context;
    return newLogger;
  }

  /**
   * Add a log interceptor callback
   */
  onLog(callback: LogInterceptor): Logger {
    this.interceptors.push(callback);
    return this;
  }

  /**
   * Generate a unique session ID
   */
  private generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  /**
   * Get memory usage information
   */
  private getMemoryInfo(): MemoryInfo | undefined {
    if (!this.enableMemoryTracking) return undefined;
    
    // Browser environment
    if (typeof window !== 'undefined' && (performance as any).memory) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        percentage: Math.round((memory.usedJSHeapSize / memory.totalJSHeapSize) * 100)
      };
    }
    
    // Node.js environment
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const memory = process.memoryUsage();
      return {
        used: memory.heapUsed,
        total: memory.heapTotal,
        percentage: Math.round((memory.heapUsed / memory.heapTotal) * 100)
      };
    }
    
    return undefined;
  }

  /**
   * Format memory usage for inline display
   */
  private formatMemoryUsage(): string {
    if (!this.logMemoryInline) {
      return '';
    }

    const memoryInfo = this.getMemoryInfo();
    if (!memoryInfo) {
      return '';
    }

    const memoryMB = (memoryInfo.used / 1024 / 1024).toFixed(2);
    return ` (Memory: ${memoryMB} MB)`;
  }

  /**
   * Start performance tracking for a specific operation
   */
  startPerformanceTimer(label: string): Logger {
    if (this.enablePerformanceTracking) {
      this.performanceMarks.set(label, Date.now());
    }
    return this;
  }

  /**
   * End performance tracking and log the duration
   */
  endPerformanceTimer(label: string, message?: string): Logger {
    if (this.enablePerformanceTracking && this.performanceMarks.has(label)) {
      const startTime = this.performanceMarks.get(label)!;
      const duration = Date.now() - startTime;
      this.performanceMarks.delete(label);
      
      const perfMessage = message || `Performance: ${label} completed`;
      this.info(perfMessage, { 
        performanceTimer: label,
        duration: `${duration}ms`,
        timestamp: Date.now()
      });
    }
    return this;
  }

  /**
   * Log with automatic stack trace capture
   */
  trace(message: string, data?: any): LogEntry | null {
    const stackTrace = new Error().stack;
    return this.log('debug', message, data, stackTrace);
  }

  /**
   * Get current analytics data
   */
  getAnalytics(): LogAnalytics {
    return { ...this.analytics };
  }

  /**
   * Get log history
   */
  getLogHistory(): LogEntry[] {
    return [...this.logHistory];
  }

  /**
   * Clear log history
   */
  clearHistory(): Logger {
    this.logHistory = [];
    return this;
  }

  /**
   * Export logs as JSON
   */
  exportLogs(): string {
    return JSON.stringify({
      sessionId: this.sessionId,
      exportedAt: new Date().toISOString(),
      analytics: this.analytics,
      logs: this.logHistory
    }, null, 2);
  }

  /**
   * Search logs by criteria
   */
  searchLogs(criteria: {
    level?: LogLevel;
    context?: string;
    message?: string;
    timeRange?: { start: Date; end: Date };
  }): LogEntry[] {
    return this.logHistory.filter(entry => {
      if (criteria.level && entry.level !== criteria.level) return false;
      if (criteria.context && entry.context !== criteria.context) return false;
      if (criteria.message && !entry.message.includes(criteria.message)) return false;
      if (criteria.timeRange) {
        if (entry.timestamp < criteria.timeRange.start || entry.timestamp > criteria.timeRange.end) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * Check if a log level should be output
   */
  private shouldLog(level: LogLevel): boolean {
    return this.enabled && this.levels[level] >= this.levels[this.level];
  }

  /**
   * Format a log message
   */
  private formatMessage(level: LogLevel, message: string, data?: any): string {
    let formatted = '';
    
    if (this.useTimestamp) {
      formatted += `[${new Date().toISOString()}] `;
    }
    
    formatted += `[${level.toUpperCase()}]`;
    
    if (this.context) {
      formatted += ` [${this.context}]`;
    }
    
    formatted += ` ${message}`;
    
    // Add inline memory usage if enabled
    if (this.logMemoryInline) {
      formatted += this.formatMemoryUsage();
    }
    
    if (data !== undefined && data !== null) {
      if (typeof data === 'object') {
        try {
          formatted += ` ${JSON.stringify(data)}`;
        } catch (e) {
          formatted += ` [Object (circular)]`;
        }
      } else {
        formatted += ` ${data}`;
      }
    }
    
    return formatted;
  }

  /**
   * Internal log method
   */
  private log(level: LogLevel, message: string, data?: any, stackTrace?: string): LogEntry | null {
    if (!this.shouldLog(level)) {
      return null;
    }

    const timestamp = new Date();
    const formatted = this.formatMessage(level, message, data);
    
    const logEntry: LogEntry = {
      level,
      message,
      context: this.context,
      data,
      timestamp,
      formatted,
      sessionId: this.sessionId,
      stackTrace: stackTrace
    };

    // Add performance and memory tracking
    if (this.enablePerformanceTracking) {
      logEntry.performance = {
        timestamp: Date.now(),
        memoryUsage: this.enableMemoryTracking ? this.getMemoryInfo()?.used : undefined
      };
    }

    if (this.enableMemoryTracking) {
      logEntry.memory = this.getMemoryInfo();
    }

    // Update analytics
    if (this.enableLogAnalytics) {
      this.updateAnalytics(level, this.context);
    }

    // Add to history
    this.logHistory.push(logEntry);
    if (this.logHistory.length > this.maxLogHistory) {
      this.logHistory.shift();
    }

    // Call interceptors
    this.interceptors.forEach(interceptor => {
      try {
        interceptor(level, message, this.context, data);
      } catch (e) {
        // Avoid infinite loops by using plain console.error
        if (typeof console !== 'undefined' && console.error) {
          console.error('Logger interceptor error:', e);
        }
      }
    });

    // Output to console
    this.outputToConsole(level, formatted);
    
    return logEntry;
  }

  /**
   * Update analytics data
   */
  private updateAnalytics(level: LogLevel, context?: string): void {
    this.analytics.totalLogs++;
    this.analytics.logsByLevel[level]++;
    
    if (level === 'error') {
      this.analytics.errorRate = (this.analytics.logsByLevel.error / this.analytics.totalLogs) * 100;
    }

    if (context) {
      const existingContext = this.analytics.topContexts.find(c => c.context === context);
      if (existingContext) {
        existingContext.count++;
      } else {
        this.analytics.topContexts.push({ context, count: 1 });
      }
      // Keep only top 10 contexts
      this.analytics.topContexts.sort((a, b) => b.count - a.count);
      this.analytics.topContexts = this.analytics.topContexts.slice(0, 10);
    }
  }

  /**
   * Output formatted message to console with colors (browser only)
   */
  private outputToConsole(level: LogLevel, formatted: string): void {
    if (typeof console === 'undefined') {
      return;
    }

    const color = this.colors[level];
    
    // Browser environment - use colored output
    if (typeof window !== 'undefined' && console.log) {
      const weight = level === 'error' ? 'bold' : 'normal';
      console.log(`%c${formatted}`, `color: ${color}; font-weight: ${weight}`);
    } 
    // Node.js environment - use appropriate console method
    else if (typeof process !== 'undefined') {
      switch (level) {
        case 'debug':
          console.debug ? console.debug(formatted) : console.log(formatted);
          break;
        case 'info':
          console.info(formatted);
          break;
        case 'warn':
          console.warn(formatted);
          break;
        case 'error':
          console.error(formatted);
          break;
        default:
          console.log(formatted);
      }
    }
    // Fallback
    else if (console.log) {
      console.log(formatted);
    }
  }

  /**
   * Log a debug message
   */
  debug(message: string, data?: any): LogEntry | null {
    return this.log('debug', message, data);
  }

  /**
   * Log an info message
   */
  info(message: string, data?: any): LogEntry | null {
    return this.log('info', message, data);
  }

  /**
   * Log a warning message
   */
  warn(message: string, data?: any): LogEntry | null {
    return this.log('warn', message, data);
  }

  /**
   * Log an error message
   */
  error(message: string, data?: any): LogEntry | null {
    return this.log('error', message, data);
  }
}

// Create a default logger instance for convenience functions
const defaultLogger = new Logger();

// Named exports for individual logging functions
export const log = (message: string, data?: any) => defaultLogger.info(message, data);
export const info = (message: string, data?: any) => defaultLogger.info(message, data);
export const warn = (message: string, data?: any) => defaultLogger.warn(message, data);
export const error = (message: string, data?: any) => defaultLogger.error(message, data);
export const debug = (message: string, data?: any) => defaultLogger.debug(message, data);
export const success = (message: string, data?: any) => defaultLogger.info(`✅ ${message}`, data);

// Types are already exported inline above

// Default export for easy importing
export default Logger;