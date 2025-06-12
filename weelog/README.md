# WeeLog 2.0 🚀

Next-generation JavaScript logging library with performance tracking, memory monitoring, analytics, and advanced debugging features.

## ✨ What's New in 2.0

- **⚡ Performance Tracking**: Built-in timers to measure operation durations
- **🧠 Memory Monitoring**: Real-time memory usage tracking for browser & Node.js
- **📊 Live Analytics**: Error rates, log patterns, and context insights
- **🔍 Smart Search**: Advanced filtering across log history
- **📋 Stack Traces**: Automatic capture for debugging
- **💾 Session Tracking**: Export complete debugging sessions as JSON

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
// Enable all advanced features
const logger = new Logger({
  level: 'debug',
  enablePerformanceTracking: true,
  enableMemoryTracking: true,
  enableLogAnalytics: true,
  maxLogHistory: 1000
});

// Performance tracking
logger.startPerformanceTimer('database-query');
await fetchUserData();
logger.endPerformanceTimer('database-query');

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

## 📖 API Reference

### Constructor Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `level` | `'debug' \| 'info' \| 'warn' \| 'error'` | `'info'` | Minimum log level |
| `enabled` | `boolean` | `true` | Enable/disable logging |
| `useTimestamp` | `boolean` | `false` | Include timestamps |
| `enablePerformanceTracking` | `boolean` | `false` | Track operation timers |
| `enableMemoryTracking` | `boolean` | `false` | Monitor memory usage |
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

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Support

- 📚 [Documentation](https://your-docs-site.com)
- 🐛 [Issues](https://github.com/your-repo/issues)
- 💬 [Discussions](https://github.com/your-repo/discussions)

---

Made with ❤️ for the JavaScript community