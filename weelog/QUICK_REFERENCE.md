# WeeLog Quick Reference

## Constructor Options Cheat Sheet

```javascript
const logger = new Logger({
  // Core Settings
  level: 'debug' | 'info' | 'warn' | 'error',     // Default: 'info'
  enabled: boolean,                                // Default: true
  
  // Timestamps
  useTimestamp: boolean,                           // Default: false
  useHumanReadableTimestamp: boolean,              // Default: false
  
  // Performance & Memory
  enablePerformanceTracking: boolean,              // Default: false
  enableMemoryTracking: boolean,                   // Default: false
  logMemoryInline: boolean,                        // Default: false
  
  // Analytics & History
  enableLogAnalytics: boolean,                     // Default: false
  maxLogHistory: number                            // Default: 1000
});
```

## Essential Methods

### Basic Logging
```javascript
logger.debug(message, data?)    // Detailed diagnostics
logger.info(message, data?)     // General information
logger.warn(message, data?)     // Warnings
logger.error(message, data?)    // Errors
```

### Context & Performance
```javascript
logger.withContext('API').info('message')        // Add context
logger.startPerformanceTimer('label')            // Start timer
logger.endPerformanceTimer('label', 'message')   // End timer
logger.trace(message, data?)                     // With stack trace
```

### Data Access
```javascript
logger.getAnalytics()           // Get statistics
logger.getLogHistory()          // Get all logs
logger.searchLogs(criteria)     // Search logs
logger.exportLogs()             // Export as JSON
logger.clearHistory()           // Clear history
```

### Configuration
```javascript
logger.setLevel('warn')         // Change level
logger.enable(false)            // Disable logging
logger.onLog(callback)          // Add interceptor
```

## Common Patterns

### Development Setup
```javascript
const logger = new Logger({
  level: 'debug',
  useTimestamp: true,
  useHumanReadableTimestamp: true,
  enablePerformanceTracking: true,
  enableMemoryTracking: true,
  logMemoryInline: true,
  enableLogAnalytics: true
});
```

### Production Setup
```javascript
const logger = new Logger({
  level: 'warn',
  useTimestamp: true,
  enableLogAnalytics: true,
  maxLogHistory: 500
});
```

### Search Examples
```javascript
// Find errors in last hour
logger.searchLogs({
  level: 'error',
  timeRange: { start: new Date(Date.now() - 3600000), end: new Date() }
});

// Find by context
logger.searchLogs({ context: 'API' });

// Find by message content
logger.searchLogs({ message: 'login' });
```

## Flag Usage Guide

| Flag | When to Enable |
|------|----------------|
| `useTimestamp` | Debugging time-sensitive operations, performance analysis |
| `useHumanReadableTimestamp` | Human review, customer support, development |
| `enablePerformanceTracking` | Measuring operation speed, optimization |
| `enableMemoryTracking` | Memory leak detection, resource monitoring |
| `logMemoryInline` | Real-time memory monitoring during development |
| `enableLogAnalytics` | Error rate monitoring, application health tracking |

## Level Guidelines

- **debug**: Variable values, flow control, detailed diagnostics
- **info**: User actions, system status, normal operations
- **warn**: Potential issues, deprecated usage, fallback scenarios
- **error**: Actual errors, exceptions, failed operations