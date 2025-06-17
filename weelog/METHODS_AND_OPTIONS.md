# WeeLog Methods and Options Reference

## Constructor Options

### Core Configuration

#### `level: 'debug' | 'info' | 'warn' | 'error'` (default: `'info'`)
Sets the minimum log level that will be displayed.

**When to use:**
- `'debug'`: Development environment, detailed troubleshooting
- `'info'`: Production logging, general application flow
- `'warn'`: Monitoring mode, focus on potential issues
- `'error'`: Critical-only logging, production error tracking

**Example:**
```javascript
const logger = new Logger({ level: 'debug' }); // Shows all levels
const prodLogger = new Logger({ level: 'error' }); // Only errors
```

#### `enabled: boolean` (default: `true`)
Master switch to enable or disable all logging output.

**When to use:**
- Set to `false` in production builds to disable logging
- Conditionally disable logging based on environment variables
- Temporarily disable logging for performance-critical sections

**Example:**
```javascript
const logger = new Logger({ 
  enabled: process.env.NODE_ENV !== 'production' 
});
```

### Timestamp Configuration

#### `useTimestamp: boolean` (default: `false`)
Adds timestamp prefix to all log messages.

**When to use:**
- Debugging time-sensitive operations
- API request/response logging
- Performance analysis
- Correlating logs across different systems

**Example:**
```javascript
const logger = new Logger({ useTimestamp: true });
logger.info('Request processed');
// Output: [2025-06-17T00:28:56.811Z] [INFO] Request processed
```

#### `useHumanReadableTimestamp: boolean` (default: `false`)
Formats timestamps in human-friendly format instead of ISO format.

**When to use:**
- Logs reviewed by humans rather than machines
- Development and debugging sessions
- Customer support and troubleshooting
- When readability is more important than precision

**Example:**
```javascript
const logger = new Logger({ 
  useTimestamp: true, 
  useHumanReadableTimestamp: true 
});
logger.info('User action', { timestamp: Date.now() });
// Output: [Jun 17, 2025, 12:28:56 AM] [INFO] User action {"timestamp":"Jun 17, 2025, 12:28:56 AM"}
```

### Performance and Memory Tracking

#### `enablePerformanceTracking: boolean` (default: `false`)
Enables performance timer functionality for measuring operation durations.

**When to use:**
- Measuring API response times
- Identifying performance bottlenecks
- Optimizing code execution
- Tracking database query performance

**Example:**
```javascript
const logger = new Logger({ enablePerformanceTracking: true });
logger.startPerformanceTimer('api-call');
await fetchData();
logger.endPerformanceTimer('api-call');
```

#### `enableMemoryTracking: boolean` (default: `false`)
Collects memory usage data for analytics and monitoring.

**When to use:**
- Memory leak detection
- Resource optimization
- Production monitoring
- Performance profiling

**Example:**
```javascript
const logger = new Logger({ enableMemoryTracking: true });
const analytics = logger.getAnalytics();
// analytics includes memory usage statistics
```

#### `logMemoryInline: boolean` (default: `false`)
Shows live memory usage in each log entry. Requires `enableMemoryTracking: true`.

**When to use:**
- Real-time memory monitoring during development
- Tracking memory consumption of specific operations
- Debugging memory-intensive processes

**Example:**
```javascript
const logger = new Logger({ 
  enableMemoryTracking: true,
  logMemoryInline: true 
});
logger.info('Processing data');
// Output: [INFO] Processing data (Memory: 23.15 MB)
```

### Analytics and History

#### `enableLogAnalytics: boolean` (default: `false`)
Collects statistics about log patterns, error rates, and usage.

**When to use:**
- Monitoring application health
- Tracking error rates over time
- Identifying problematic areas
- Generating debugging insights

**Example:**
```javascript
const logger = new Logger({ enableLogAnalytics: true });
const stats = logger.getAnalytics();
console.log(`Error rate: ${stats.errorRate}%`);
```

#### `maxLogHistory: number` (default: `1000`)
Maximum number of log entries to keep in memory.

**When to use:**
- Increase for longer debugging sessions
- Decrease to save memory in production
- Adjust based on available system resources

**Example:**
```javascript
const debugLogger = new Logger({ maxLogHistory: 5000 }); // Extended debugging
const prodLogger = new Logger({ maxLogHistory: 100 });   // Production efficiency
```

## Core Methods

### Basic Logging Methods

#### `debug(message: string, data?: any): LogEntry | null`
Logs detailed diagnostic information.

**When to use:**
- Variable values and state inspection
- Flow control debugging
- Detailed diagnostic information
- Development-only logging

#### `info(message: string, data?: any): LogEntry | null`
Logs general application flow information.

**When to use:**
- User actions and system events
- Application status updates
- Normal operation logging
- Audit trails

#### `warn(message: string, data?: any): LogEntry | null`
Logs potential issues and warnings.

**When to use:**
- Deprecated functionality usage
- Fallback scenarios
- Performance warnings
- Configuration issues

#### `error(message: string, data?: any): LogEntry | null`
Logs actual errors and exceptions.

**When to use:**
- Exception handling
- Failed operations
- Critical system errors
- User-facing errors

### Context Management

#### `withContext(context: string): Logger`
Creates a logger instance with a specific context label.

**When to use:**
- Grouping logs by module or component
- Separating concerns in large applications
- Making logs easier to filter and search
- Organizing logs by feature area

**Example:**
```javascript
const apiLogger = logger.withContext('API');
const dbLogger = logger.withContext('Database');

apiLogger.info('Request received');  // [INFO] [API] Request received
dbLogger.error('Connection failed'); // [ERROR] [Database] Connection failed
```

### Performance Tracking

#### `startPerformanceTimer(label: string): Logger`
Starts a performance timer with the given label.

**Usage pattern:**
```javascript
logger.startPerformanceTimer('operation-name');
// ... perform operation
logger.endPerformanceTimer('operation-name');
```

#### `endPerformanceTimer(label: string, message?: string): Logger`
Ends a performance timer and logs the duration.

**Parameters:**
- `label`: Must match the label used in `startPerformanceTimer`
- `message`: Optional custom message (defaults to performance summary)

### Advanced Logging

#### `trace(message: string, data?: any): LogEntry | null`
Logs a message with automatic stack trace capture.

**When to use:**
- Debugging complex execution flows
- Identifying call paths
- Troubleshooting hard-to-reproduce issues
- Understanding code execution order

**Example:**
```javascript
function processData(data) {
  logger.trace('Processing started', { dataSize: data.length });
  // Stack trace automatically included
}
```

### Configuration Management

#### `setLevel(level: LogLevel): Logger`
Changes the minimum log level dynamically.

**Example:**
```javascript
logger.setLevel('debug'); // Show all levels
logger.setLevel('error'); // Only show errors
```

#### `enable(enabled: boolean): Logger`
Enables or disables logging dynamically.

**Example:**
```javascript
logger.enable(false); // Disable all logging
logger.enable(true);  // Re-enable logging
```

### Interceptors and Callbacks

#### `onLog(callback: LogInterceptor): Logger`
Registers a callback function that gets called for every log entry.

**Callback signature:**
```javascript
(level: LogLevel, message: string, context?: string, data?: any) => void
```

**When to use:**
- Sending logs to external services
- Custom log processing
- Analytics integration
- Real-time log monitoring

**Example:**
```javascript
logger.onLog((level, message, context, data) => {
  if (level === 'error') {
    sendToErrorService({ level, message, context, data });
  }
});
```

### Data Retrieval and Analysis

#### `getAnalytics(): LogAnalytics`
Returns comprehensive analytics about logging patterns.

**Returns:**
```javascript
{
  totalLogs: number,
  logsByLevel: {
    debug: number,
    info: number,
    warn: number,
    error: number
  },
  averageLogRate: number,    // Logs per minute
  errorRate: number,         // Percentage of error logs
  topContexts: Array<{
    context: string,
    count: number
  }>
}
```

#### `getLogHistory(): LogEntry[]`
Returns array of all stored log entries.

**LogEntry structure:**
```javascript
{
  level: LogLevel,
  message: string,
  context?: string,
  data?: any,
  timestamp: Date,
  formatted: string,
  performance?: PerformanceMetrics,
  memory?: MemoryInfo,
  stackTrace?: string,
  sessionId: string
}
```

#### `searchLogs(criteria: SearchCriteria): LogEntry[]`
Searches log history with flexible criteria.

**Search options:**
```javascript
{
  level?: 'debug' | 'info' | 'warn' | 'error',
  context?: string,
  message?: string,
  timeRange?: {
    start: Date,
    end: Date
  }
}
```

**Search examples:**
```javascript
// Find all errors from the last hour
const recentErrors = logger.searchLogs({
  level: 'error',
  timeRange: {
    start: new Date(Date.now() - 3600000),
    end: new Date()
  }
});

// Find logs containing specific text
const authLogs = logger.searchLogs({ 
  message: 'authentication' 
});

// Find all database-related logs
const dbLogs = logger.searchLogs({ 
  context: 'Database' 
});
```

#### `exportLogs(): string`
Exports complete session data as JSON string.

**Export format:**
```javascript
{
  sessionId: string,
  exportedAt: string,
  analytics: LogAnalytics,
  logs: LogEntry[]
}
```

#### `clearHistory(): Logger`
Clears all stored log entries from memory.

**When to use:**
- Memory management in long-running applications
- Starting fresh debugging sessions
- Cleaning up after specific operations

## Usage Patterns

### Development Setup
```javascript
const devLogger = new Logger({
  level: 'debug',
  useTimestamp: true,
  useHumanReadableTimestamp: true,
  enablePerformanceTracking: true,
  enableMemoryTracking: true,
  logMemoryInline: true,
  enableLogAnalytics: true,
  maxLogHistory: 2000
});
```

### Production Setup
```javascript
const prodLogger = new Logger({
  level: 'warn',
  useTimestamp: true,
  enableLogAnalytics: true,
  maxLogHistory: 500
});

prodLogger.onLog((level, message, context, data) => {
  if (level === 'error') {
    sendToMonitoringService({ level, message, context, data });
  }
});
```

### Performance Monitoring
```javascript
const perfLogger = new Logger({
  level: 'info',
  enablePerformanceTracking: true,
  enableMemoryTracking: true,
  useTimestamp: true
});

// Measure critical operations
perfLogger.startPerformanceTimer('api-response');
const result = await apiCall();
perfLogger.endPerformanceTimer('api-response', `API returned ${result.data.length} items`);
```

### Debugging Session
```javascript
const debugLogger = new Logger({
  level: 'debug',
  useTimestamp: true,
  useHumanReadableTimestamp: true,
  enableLogAnalytics: true,
  maxLogHistory: 5000
});

// Comprehensive debugging
debugLogger.trace('Function entry', { params });
debugLogger.debug('Processing step 1', { intermediate });
debugLogger.info('Step completed', { result });

// Export for analysis
const session = debugLogger.exportLogs();
fs.writeFileSync('debug-session.json', session);
```