/**
 * Basic WeeLog Usage Examples
 * Simple examples to get started with WeeLog
 */

// For ES Modules (modern Node.js, bundlers)
import { log, info, warn, error, debug, success, Logger } from 'weelog';

// For CommonJS (traditional Node.js)
// const { log, info, warn, error, debug, success, Logger } = require('weelog');

console.log('WeeLog Basic Usage Examples\n');

// 1. Simple logging with named functions
console.log('1. Simple Named Functions:');
debug('Application starting');
info('Configuration loaded');
warn('Using development mode');
error('Failed to load optional plugin');
success('Application ready');
console.log();

// 2. Logger with timestamps
console.log('2. Logger with Timestamps:');
const logger = new Logger({
  level: 'debug',
  useTimestamp: true
});

logger.debug('Debug information');
logger.info('Process completed successfully');
logger.warn('Memory usage is high');
logger.error('Database connection failed');
console.log();

// 3. Context-based logging
console.log('3. Context-Based Logging:');
logger.withContext('UserService').info('User logged in', { userId: 123 });
logger.withContext('PaymentService').warn('Payment delayed', { orderId: 'abc123' });
logger.withContext('EmailService').error('SMTP connection failed');
console.log();

// 4. Memory tracking (inline display)
console.log('4. Memory Tracking:');
const memoryLogger = new Logger({
  level: 'info',
  enableMemoryTracking: true,
  logMemoryInline: true,
  useTimestamp: true
});

memoryLogger.info('Before processing');
// Simulate some work
const data = new Array(10000).fill('test data');
memoryLogger.info('After data allocation');
console.log();

console.log('Basic examples complete!');