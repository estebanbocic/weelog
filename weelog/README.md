# WeeLog 🪵

[![npm version](https://badge.fury.io/js/weelog.svg)](https://badge.fury.io/js/weelog)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/weelog)](https://bundlephobia.com/package/weelog)

A tiny, powerful logging library for JavaScript applications. Zero dependencies, maximum flexibility.

## ✨ Features

- **🪶 Lightweight**: Only 2KB gzipped, zero dependencies
- **🌐 Universal**: Works in browsers and Node.js environments
- **🎨 Colorized**: Beautiful console output with level-based colors (browser)
- **📝 Contextual**: Add context to your logs for better organization
- **⚙️ Configurable**: Control log levels, timestamps, and more
- **🔌 Extensible**: Interceptor callbacks for custom log handling
- **📦 Modern**: ES6+ with TypeScript support

## 🚀 Quick Start

### Installation

```bash
npm install weelog
```

### Basic Usage

```javascript
import Logger from 'weelog';

const logger = new Logger();

logger.info('Hello WeeLog!');
logger.warn('This is a warning');
logger.error('Something went wrong');
```

### Configuration

```javascript
const logger = new Logger({
  level: 'debug',          // Minimum log level
  enabled: true,           // Enable/disable logging
  useTimestamp: true       // Include timestamps
});
```

## 📖 API Reference

### Constructor

```javascript
new Logger(options?)
```

**Options:**
- `level`: `'debug' | 'info' | 'warn' | 'error'` (default: `'info'`)
- `enabled`: `boolean` (default: `true`)
- `useTimestamp`: `boolean` (default: `false`)

### Logging Methods

```javascript
logger.debug(message, data?)   // Debug information
logger.info(message, data?)    // General information  
logger.warn(message, data?)    // Warnings
logger.error(message, data?)   // Errors
```

### Control Methods

```javascript
logger.setLevel(level)         // Change log level
logger.enable(boolean)         // Enable/disable logging
logger.withContext(name)       // Create contextual logger
logger.onLog(callback)         // Add log interceptor
```

## 🔧 Advanced Usage

### Context Logging

```javascript
const apiLogger = logger.withContext('API');
apiLogger.info('Request started', { url: '/users' });
// Output: [INFO] [API] Request started {"url":"/users"}
```

### Log Interception

```javascript
logger.onLog((level, message, context, data) => {
  // Send to analytics, save to file, etc.
  analytics.track('log_event', {
    level, message, context, data
  });
});
```

### Method Chaining

```javascript
const prodLogger = new Logger()
  .setLevel('warn')
  .enable(process.env.NODE_ENV !== 'test')
  .withContext('Production');
```

## 🖥️ Framework Integration

### React Hook

```javascript
import { useMemo } from 'react';
import Logger from 'weelog';

export function useLogger(context, options = {}) {
  return useMemo(() => {
    const logger = new Logger({
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'warn',
      useTimestamp: true,
      ...options
    });
    return context ? logger.withContext(context) : logger;
  }, [context, options]);
}
```

### Vue Composable

```javascript
import { ref, computed } from 'vue';
import Logger from 'weelog';

export function useLogger(context = null, options = {}) {
  const logger = ref(new Logger({
    level: import.meta.env.DEV ? 'debug' : 'info',
    useTimestamp: true,
    ...options
  }));
  
  const contextLogger = computed(() => 
    context ? logger.value.withContext(context) : logger.value
  );
  
  return {
    logger: contextLogger.value,
    debug: (msg, data) => contextLogger.value.debug(msg, data),
    info: (msg, data) => contextLogger.value.info(msg, data),
    warn: (msg, data) => contextLogger.value.warn(msg, data),
    error: (msg, data) => contextLogger.value.error(msg, data)
  };
}
```

### Node.js

```javascript
const Logger = require('weelog');

const logger = new Logger({
  level: process.env.LOG_LEVEL || 'info',
  useTimestamp: true
});

// Add file logging interceptor
logger.onLog((level, message, context, data) => {
  if (level === 'error') {
    require('fs').appendFileSync('error.log', 
      JSON.stringify({ level, message, context, data, timestamp: new Date() }) + '\n'
    );
  }
});

module.exports = logger;
```

### Express.js Middleware

```javascript
const Logger = require('weelog');

const httpLogger = new Logger()
  .setLevel('info')
  .withContext('HTTP');

function requestLogger(req, res, next) {
  const start = Date.now();
  const requestId = Math.random().toString(36).substr(2, 9);
  
  req.logger = httpLogger.withContext(`HTTP:${requestId}`);
  
  req.logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    req.logger.info(`Response sent`, {
      statusCode: res.statusCode,
      duration: `${duration}ms`
    });
  });
  
  next();
}

module.exports = requestLogger;
```

## 📊 Log Levels

| Level | Description | Color (Browser) |
|-------|-------------|-----------------|
| `debug` | Detailed debugging information | Gray |
| `info` | General informational messages | Blue |
| `warn` | Warning messages | Yellow |
| `error` | Error messages | Red |

## 🌍 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎯 Node.js Support

- Node.js 12.0.0+

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/weelog)
- [GitHub Repository](https://github.com/weelog/weelog)
- [Documentation](https://weelog.dev)
- [Live Demo](https://weelog.dev)

---

Made with ❤️ for developers everywhere.