# WeeLog 🪵

[![npm version](https://badge.fury.io/js/weelog.svg)](https://www.npmjs.com/package/weelog)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/estebanbocic/weelog/workflows/CI/badge.svg)](https://github.com/estebanbocic/weelog/actions)

**Next-generation JavaScript logging library with performance tracking, memory monitoring, analytics, and advanced debugging features.**

## ✨ What's New in 2.1.1

- **⚡ Performance Tracking**: Built-in timers to measure operation durations
- **🧠 Memory Monitoring**: Real-time memory usage tracking for browser & Node.js
- **💾 Inline Memory Display**: Live memory usage shown in each log entry
- **📊 Live Analytics**: Error rates, log patterns, and context insights
- **🔍 Smart Search**: Advanced filtering across log history
- **📋 Stack Traces**: Automatic capture for debugging
- **💾 Session Tracking**: Export complete debugging sessions as JSON
- **🌐 Enhanced Documentation**: Comprehensive guides and examples
- **🕐 Human-Readable Timestamps**: Option for user-friendly time formats
- **🎨 Improved Color Logging**: Enhanced browser and Node.js color support

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

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `level` | `'debug' \| 'info' \| 'warn' \| 'error'` | `'info'` | Minimum log level |
| `enabled` | `boolean` | `true` | Enable/disable logging |
| `useTimestamp` | `boolean` | `false` | Include timestamps |
| `useHumanReadableTimestamp` | `boolean` | `false` | Use human-friendly timestamps |
| `enablePerformanceTracking` | `boolean` | `false` | Track operation timers |
| `enableMemoryTracking` | `boolean` | `false` | Monitor memory usage |
| `logMemoryInline` | `boolean` | `false` | Show live memory in each log |
| `enableLogAnalytics` | `boolean` | `false` | Collect analytics data |
| `maxLogHistory` | `number` | `1000` | Maximum logs to keep |

### Core Methods

```javascript
// Basic logging
logger.debug(message, data?)
logger.info(message, data?)
logger.warn(message, data?)
logger.error(message, data?)

// Context logging
logger.withContext('ModuleName').info('Message')

// Performance tracking
logger.startPerformanceTimer(label)
logger.endPerformanceTimer(label, message?)

// Advanced features
logger.trace(message, data?)           // Auto stack trace
logger.getAnalytics()                  // Get metrics
logger.getLogHistory()                 // Get all logs
logger.searchLogs(criteria)            // Search with filters
logger.exportLogs()                    // Export as JSON
logger.clearHistory()                  // Clear log history
```

### Search Criteria

```javascript
logger.searchLogs({
  level?: 'debug' | 'info' | 'warn' | 'error',
  context?: string,
  message?: string,
  timeRange?: { start: Date, end: Date }
})
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