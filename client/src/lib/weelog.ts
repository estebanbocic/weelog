/**
 * WeeLog - Tiny Logging Library for JavaScript
 * Zero dependencies, browser and Node.js compatible
 */

export interface LoggerOptions {
  level?: LogLevel;
  enabled?: boolean;
  useTimestamp?: boolean;
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
}

export class Logger {
  private level: LogLevel;
  private enabled: boolean;
  private useTimestamp: boolean;
  private context?: string;
  private interceptors: LogInterceptor[];
  
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
    this.interceptors = [];
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
  private log(level: LogLevel, message: string, data?: any): LogEntry | null {
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
      formatted
    };

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

// Default export for easy importing
export default Logger;
