# WeeLog

[![npm version](https://badge.fury.io/js/weelog.svg)](https://badge.fury.io/js/weelog)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/weelog)](https://bundlephobia.com/package/weelog)

Professional JavaScript logging library with advanced debugging capabilities, performance tracking, memory monitoring, and comprehensive analytics for modern applications.

**🌐 Live Documentation**: [weelog.estebanbocic.com](https://weelog.estebanbocic.com)

## Features

### Core Logging
- **Zero Dependencies**: Lightweight and fast
- **Universal Compatibility**: Browser and Node.js support
- **TypeScript Ready**: Full type definitions included
- **Colorized Output**: Beautiful console formatting
- **Context-Aware**: Organized logging with contexts

### Advanced Features
- **Performance Tracking**: Measure execution times with precision
- **Memory Monitoring**: Track heap usage and detect leaks
- **Stack Trace Capture**: Complete call stack debugging
- **Log Analytics**: Comprehensive statistics and insights
- **Search & Filter**: Query logs by level, context, and time
- **Session Management**: Export and share debugging sessions

## Installation

```bash
npm install weelog
```

## Quick Start

### Basic Usage

```javascript
import { log, info, warn, error } from 'weelog';

// Simple logging
log('Application started');
info('User logged in', { userId: 123 });
warn('API rate limit approaching');
error('Database connection failed');
```

### Advanced Logger

```javascript
import Logger from 'weelog';

const logger = new Logger({
  level: 'info',
  useTimestamp: true,
  enablePerformanceTracking: true,
  enableMemoryTracking: true,
  enableLogAnalytics: true,
  maxLogHistory: 1000
});

// Performance tracking
logger.startPerformanceTimer('api-call');
await fetchData();
logger.endPerformanceTimer('api-call', 'Data fetched');
// Output: [INFO] Data fetched (47.3ms)

// Memory monitoring with inline display
logger.info('Processing large dataset');
// Output: [INFO] Processing large dataset (Memory: 156.7 MB - 67%)

// Context-aware logging
const apiLogger = logger.withContext('PaymentAPI');
apiLogger.error('Transaction failed', {
  transactionId: 'tx_123',
  amount: 99.99
});

// Stack trace capture
logger.trace('Checkpoint reached', { userId: 123 });

// Analytics and insights
const analytics = logger.getAnalytics();
console.log(`Error rate: ${analytics.errorRate}%`);
console.log(`Total logs: ${analytics.totalLogs}`);

// Search and filter logs
const errorLogs = logger.searchLogs({
  level: 'error',
  context: 'API',
  timeRange: { start: new Date('2024-01-01'), end: new Date() }
});

// Export session data
const sessionData = logger.exportLogs();
```

## API Reference

### Logger Constructor

```javascript
const logger = new Logger({
  level: 'info',                    // Minimum log level
  enabled: true,                    // Enable/disable logging
  useTimestamp: true,               // Include timestamps
  enablePerformanceTracking: true, // Track execution times
  enableMemoryTracking: true,      // Monitor memory usage
  logMemoryInline: true,           // Show memory in each log
  maxLogHistory: 1000,             // Maximum stored logs
  enableLogAnalytics: true         // Collect statistics
});
```

### Methods

#### Basic Logging
- `logger.debug(message, data?)` - Debug level logs
- `logger.info(message, data?)` - Info level logs
- `logger.warn(message, data?)` - Warning level logs
- `logger.error(message, data?)` - Error level logs

#### Advanced Features
- `logger.trace(message, data?)` - Capture stack traces
- `logger.withContext(context)` - Create contextual logger
- `logger.startPerformanceTimer(label)` - Begin timing
- `logger.endPerformanceTimer(label, message?)` - End timing

#### Analytics & Management
- `logger.getAnalytics()` - Get logging statistics
- `logger.searchLogs(criteria)` - Filter log history
- `logger.exportLogs()` - Export session data
- `logger.getLogHistory()` - Get all logged entries
- `logger.clearHistory()` - Clear log history

## Framework Integration

### React

```javascript
import Logger from 'weelog';

const logger = new Logger({
  enablePerformanceTracking: true,
  enableMemoryTracking: true
});

function App() {
  useEffect(() => {
    logger.startPerformanceTimer('app-mount');
    
    return () => {
      logger.endPerformanceTimer('app-mount', 'App unmounted');
    };
  }, []);

  const handleError = (error) => {
    logger.error('React error boundary', {
      error: error.message,
      stack: error.stack
    });
  };

  return <ErrorBoundary onError={handleError}>...</ErrorBoundary>;
}
```

### Node.js Server

```javascript
import express from 'express';
import Logger from 'weelog';

const logger = new Logger({
  enablePerformanceTracking: true,
  enableLogAnalytics: true
});

const app = express();

app.use((req, res, next) => {
  const requestId = Math.random().toString(36);
  req.logger = logger.withContext(`Request-${requestId}`);
  
  req.logger.startPerformanceTimer('request');
  req.logger.info(`${req.method} ${req.path}`);
  
  res.on('finish', () => {
    req.logger.endPerformanceTimer('request', 
      `Response ${res.statusCode}`);
  });
  
  next();
});
```

## Use Cases

### Performance Optimization
Track slow functions, API calls, and database queries to identify bottlenecks.

### Memory Leak Detection
Monitor memory usage patterns to detect and prevent memory leaks.

### Error Debugging
Capture complete stack traces with context for faster issue resolution.

### Application Monitoring
Generate analytics and insights about application behavior and health.

### Team Collaboration
Export debugging sessions to share with team members or attach to bug reports.

## Browser Support

- Chrome/Edge 60+
- Firefox 55+  
- Safari 12+
- Node.js 12+

## License

MIT - See [LICENSE](LICENSE) file for details.

## Contributing

Visit our [documentation site](https://weelog.estebanbocic.com) for examples and detailed guides.
