# WeeLog 🪵

[![npm version](https://badge.fury.io/js/weelog.svg)](https://www.npmjs.com/package/weelog)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/estebanbocic/weelog/workflows/CI/badge.svg)](https://github.com/estebanbocic/weelog/actions)

**Next-generation JavaScript logging library with performance tracking, memory monitoring, analytics, and advanced debugging features.**

## ✨ What's New in 2.1.2

- **🔧 Fixed**: Human-readable timestamp formatting now applies to timestamps inside JSON objects
- **📚 Enhanced Documentation**: Comprehensive METHODS_AND_OPTIONS.md reference guide
- **🎯 Usage Guidance**: Complete "When to Use" instructions for every constructor option and method
- **📖 Quick Reference**: Added QUICK_REFERENCE.md for easy method lookup
- **🛠️ Best Practices**: Enhanced documentation with usage scenarios for development vs production

## 🚀 Quick Start

```bash
npm install weelog
```

### Named Function Imports

```javascript
import { log, info, warn, error, debug, success } from 'weelog';

debug('Debug message');
info('Information message');
warn('Warning message');
error('Error message');
success('Success message');
```

### Logger Class Usage

```javascript
import Logger from 'weelog';

const logger = new Logger({
  level: 'debug',
  useTimestamp: true
});

logger.info('Hello World!');
logger.withContext('API').error('Request failed', { status: 500 });
```

### Advanced Features

```javascript
// Enable all advanced features including timestamps and memory display
const logger = new Logger({
  level: 'debug',
  useTimestamp: true,
  useHumanReadableTimestamp: true,  // NEW: Human-friendly timestamps
  enablePerformanceTracking: true,
  enableMemoryTracking: true,
  logMemoryInline: true,            // Show memory in each log
  enableLogAnalytics: true,
  maxLogHistory: 1000
});

// Performance tracking
logger.startPerformanceTimer('database-query');
await fetchUserData();
logger.endPerformanceTimer('database-query');

// Logs with human-readable timestamps and inline memory display
logger.info('Processing user data');
// Output: [Jun 16, 2025, 9:45:23 PM] [INFO] Processing user data (Memory: 23.15 MB)

// Automatic stack traces
logger.trace('Debug checkpoint reached');

// Get analytics
const analytics = logger.getAnalytics();
console.log(`Error rate: ${analytics.errorRate}%`);

// Search logs
const errorLogs = logger.searchLogs({
  level: 'error',
  timeRange: { start: new Date('2024-01-01'), end: new Date() }
});

// Export session data
const exportData = logger.exportLogs();
```

### Timestamp Formatting

WeeLog offers two timestamp formats to suit different debugging preferences:

```javascript
// ISO format (default): Technical precision
const isoLogger = new Logger({
  useTimestamp: true,
  useHumanReadableTimestamp: false
});
isoLogger.info('User logged in');
// Output: [2025-06-16T21:45:23.156Z] [INFO] User logged in

// Human-readable format: Easy to read
const humanLogger = new Logger({
  useTimestamp: true,
  useHumanReadableTimestamp: true
});
humanLogger.info('User logged in');
// Output: [Jun 16, 2025, 9:45:23 PM] [INFO] User logged in
```

## 📖 API Reference

### Constructor Options

| Option | Type | Default | Description | When to Use |
|--------|------|---------|-------------|-------------|
| `level` | `'debug' \| 'info' \| 'warn' \| 'error'` | `'info'` | Sets minimum log level that will be displayed | Use `'debug'` for development, `'info'` for production, `'warn'` for monitoring, `'error'` for critical-only logging |
| `enabled` | `boolean` | `true` | Master switch to enable/disable all logging | Set to `false` to completely disable logging in production or specific environments |
| `useTimestamp` | `boolean` | `false` | Adds timestamp prefix to all log messages | Enable for debugging time-sensitive operations, API calls, or performance analysis |
| `useHumanReadableTimestamp` | `boolean` | `false` | Formats timestamps in human-friendly format instead of ISO | Use when logs are reviewed by humans rather than machines; shows "Jun 16, 2025, 9:45:23 PM" vs "2025-06-16T21:45:23.156Z" |
| `enablePerformanceTracking` | `boolean` | `false` | Enables performance timer functionality | Use when measuring operation durations, API response times, or optimizing code performance |
| `enableMemoryTracking` | `boolean` | `false` | Collects memory usage data for analytics | Enable for memory leak detection, optimization, or resource monitoring |
| `logMemoryInline` | `boolean` | `false` | Shows live memory usage in each log entry | Use during development to track memory consumption in real-time; requires `enableMemoryTracking: true` |
| `enableLogAnalytics` | `boolean` | `false` | Collects statistics about log patterns and usage | Enable for monitoring error rates, log frequency analysis, and debugging insights |
| `maxLogHistory` | `number` | `1000` | Maximum number of log entries to keep in memory | Increase for longer debugging sessions, decrease to save memory in production |

## 🎯 Usage Scenarios & Best Practices

### Development Environment
```javascript
const devLogger = new Logger({
  level: 'debug',
  useTimestamp: true,
  useHumanReadableTimestamp: true,
  enablePerformanceTracking: true,
  enableMemoryTracking: true,
  logMemoryInline: true,
  enableLogAnalytics: true
});

// Perfect for debugging and optimization
devLogger.startPerformanceTimer('api-call');
const result = await fetchData();
devLogger.endPerformanceTimer('api-call');
```

### Production Environment
```javascript
const prodLogger = new Logger({
  level: 'warn',
  useTimestamp: true,
  enableLogAnalytics: true,
  maxLogHistory: 500
});

// Focus on warnings and errors only
prodLogger.onLog((level, message, context, data) => {
  if (level === 'error') {
    sendToErrorTracking({ level, message, context, data });
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

// Monitor critical operations
perfLogger.startPerformanceTimer('database-query');
const users = await db.users.findMany();
perfLogger.endPerformanceTimer('database-query', `Found ${users.length} users`);
```

### Debugging Sessions
```javascript
const debugLogger = new Logger({
  level: 'debug',
  useTimestamp: true,
  useHumanReadableTimestamp: true,
  enableLogAnalytics: true,
  maxLogHistory: 2000
});

// Comprehensive debugging
debugLogger.trace('Entering function', { params });
debugLogger.info('Processing data', { step: 1 });
debugLogger.warn('Potential issue detected', { issue });

// Export session for analysis
const session = debugLogger.exportLogs();
localStorage.setItem('debug-session', session);
```

## 💾 Inline Memory Tracking

Enable live memory display in log output with the `logMemoryInline` option:

```javascript
const logger = new Logger({
  level: 'debug',
  enableMemoryTracking: true,  // Required for memory tracking
  logMemoryInline: true,       // Show memory in each log entry
  useTimestamp: true
});

logger.info('Before memory allocation');
// Output: [2025-06-12T05:53:17.005Z] [INFO] Before memory allocation (Memory: 4.27 MB)

const data = new Array(100000).fill('test');
logger.info('After memory allocation');  
// Output: [2025-06-12T05:53:17.006Z] [INFO] After memory allocation (Memory: 5.04 MB)
```

**How it works:**
- **Node.js**: Uses `process.memoryUsage().heapUsed` for accurate heap memory
- **Browser**: Uses `performance.memory.usedJSHeapSize` when available
- **Format**: Memory displayed as MB with 2 decimal places
- **Performance**: Minimal overhead, memory check happens only when logging

**Separate controls:**
- `enableMemoryTracking: true` - Enables memory data collection for analytics
- `logMemoryInline: true` - Shows live memory usage in log output
- Use both together for complete memory monitoring

## 🌍 Environment Support

- ✅ **Browser**: Full feature support including memory tracking
- ✅ **Node.js**: Complete functionality with process memory monitoring
- ✅ **TypeScript**: Full type definitions included
- ✅ **ES Modules**: Native ESM support
- ✅ **CommonJS**: Legacy compatibility

## 📊 Analytics Data

```javascript
const analytics = logger.getAnalytics();
// Returns:
{
  totalLogs: number,
  errorRate: number,
  logsByLevel: { debug: 0, info: 10, warn: 2, error: 1 },
  averageLogRate: number,
  topContexts: [{ context: 'API', count: 15 }]
}
```

## 💾 Export Format

```javascript
const exportData = logger.exportLogs();
// Returns JSON string with:
{
  sessionId: string,
  exportedAt: string,
  analytics: AnalyticsData,
  logs: LogEntry[]
}
```

## 🎯 Migration from 1.x

WeeLog 2.0 is fully backward compatible. All existing code continues to work, and new features are opt-in through constructor options.

```javascript
// v1.x code works unchanged
const logger = new Logger({ level: 'info' });
logger.info('Still works!');

// Add new features when ready
const advancedLogger = new Logger({
  level: 'info',
  enablePerformanceTracking: true  // New in 2.0
});
```

## 🧪 Testing & Validation

WeeLog includes comprehensive test files that validate all documentation examples:

```bash
# Run all tests (ES modules + CommonJS)
npm test

# Test ES modules only
npm run test:esm

# Test CommonJS only  
npm run test:cjs
```

The test files (`test-documentation.mjs` and `test-documentation.cjs`) verify every code example in this README works correctly with the actual library.

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Support

- 📚 [Documentation & Demo](https://weelog.estebanbocic.com)
- 🐛 [Report Issues](https://github.com/estebanbocic/weelog/issues)
- 💬 [Discussions](https://github.com/estebanbocic/weelog/discussions)
- 📦 [NPM Package](https://www.npmjs.com/package/weelog)
- ⭐ [Star on GitHub](https://github.com/estebanbocic/weelog)

### Getting Help

- **Questions?** Use [GitHub Discussions](https://github.com/estebanbocic/weelog/discussions)
- **Bug Reports?** Create an [Issue](https://github.com/estebanbocic/weelog/issues)
- **Feature Requests?** Start a [Discussion](https://github.com/estebanbocic/weelog/discussions) or [Issue](https://github.com/estebanbocic/weelog/issues)
- **Live Demo:** Try all features at [weelog.estebanbocic.com](https://weelog.estebanbocic.com)

---

Made with ❤️ for the JavaScript community