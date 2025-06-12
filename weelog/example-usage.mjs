/**
 * WeeLog 2.0.2 Complete Usage Example
 * Demonstrates all features including the new inline memory tracking
 */

import { log, info, warn, error, debug, success } from './dist/weelog.esm.js';
import Logger from './dist/weelog.esm.js';

console.log('🚀 WeeLog 2.0.2 Complete Example\n');

// =============================================================================
// 1. Simple Named Function Usage
// =============================================================================
console.log('1️⃣ Simple Named Function Usage:');
debug('Application starting up');
info('Server configuration loaded');
warn('Using development database');
error('Failed to connect to Redis cache');
success('Application ready to serve requests');
console.log();

// =============================================================================
// 2. Basic Logger Instance
// =============================================================================
console.log('2️⃣ Basic Logger with Timestamps:');
const basicLogger = new Logger({
  level: 'debug',
  useTimestamp: true
});

basicLogger.debug('Debug mode enabled');
basicLogger.info('User authentication successful');
basicLogger.warn('High memory usage detected');
basicLogger.error('Database connection timeout');
console.log();

// =============================================================================
// 3. NEW: Inline Memory Tracking (2.0.2 Feature)
// =============================================================================
console.log('3️⃣ NEW: Inline Memory Tracking:');
const memoryLogger = new Logger({
  level: 'debug',
  enableMemoryTracking: true,
  logMemoryInline: true,        // NEW: Shows memory in each log
  useTimestamp: true
});

memoryLogger.info('Before memory allocation');

// Simulate memory allocation
const largeData = new Array(50000).fill({
  id: Math.random(),
  data: 'sample data string',
  timestamp: new Date()
});

memoryLogger.info('After allocating large array');

// Process data (more memory usage)
const processedData = largeData.map(item => ({
  ...item,
  processed: true,
  hash: Math.random().toString(36)
}));

memoryLogger.warn('Memory usage increased during processing');

// Clean up
largeData.length = 0;
processedData.length = 0;

memoryLogger.info('After memory cleanup');
console.log();

// =============================================================================
// 4. Context Logging
// =============================================================================
console.log('4️⃣ Context-Based Logging:');
const contextLogger = new Logger({
  level: 'debug',
  useTimestamp: true,
  logMemoryInline: true
});

contextLogger.withContext('UserService').info('Processing user login', {
  userId: 12345,
  email: 'user@example.com'
});

contextLogger.withContext('PaymentService').warn('Payment processing delayed', {
  paymentId: 'pay_abc123',
  amount: 99.99,
  retryCount: 2
});

contextLogger.withContext('DatabaseService').error('Connection pool exhausted', {
  activeConnections: 50,
  maxConnections: 50,
  waitingQueries: 15
});
console.log();

// =============================================================================
// 5. Performance Tracking
// =============================================================================
console.log('5️⃣ Performance Tracking:');
const perfLogger = new Logger({
  level: 'info',
  enablePerformanceTracking: true,
  logMemoryInline: true,
  useTimestamp: true
});

// Simulate database query
perfLogger.startPerformanceTimer('database-query');
await new Promise(resolve => setTimeout(resolve, 150));
perfLogger.endPerformanceTimer('database-query', 'User data retrieved');

// Simulate API call
perfLogger.startPerformanceTimer('external-api');
await new Promise(resolve => setTimeout(resolve, 75));
perfLogger.endPerformanceTimer('external-api', 'Weather data fetched');

// Simulate file processing
perfLogger.startPerformanceTimer('file-processing');
await new Promise(resolve => setTimeout(resolve, 200));
perfLogger.endPerformanceTimer('file-processing', 'Image resize completed');
console.log();

// =============================================================================
// 6. Advanced Analytics Logger
// =============================================================================
console.log('6️⃣ Advanced Analytics & Search:');
const analyticsLogger = new Logger({
  level: 'debug',
  enableMemoryTracking: true,
  logMemoryInline: true,
  enableLogAnalytics: true,
  enablePerformanceTracking: true,
  maxLogHistory: 100,
  useTimestamp: true
});

// Generate various log entries
analyticsLogger.withContext('API').debug('Request received', { endpoint: '/users', method: 'GET' });
analyticsLogger.withContext('API').info('Request processed successfully', { duration: '45ms' });
analyticsLogger.withContext('Database').warn('Slow query detected', { duration: '2.5s' });
analyticsLogger.withContext('API').error('Rate limit exceeded', { ip: '192.168.1.100' });
analyticsLogger.withContext('Cache').info('Cache hit', { key: 'user:12345' });
analyticsLogger.withContext('Database').error('Connection timeout', { host: 'db-primary' });

// Get analytics
const analytics = analyticsLogger.getAnalytics();
console.log('\n📊 Analytics Summary:');
console.log(`   Total logs: ${analytics.totalLogs}`);
console.log(`   Error rate: ${analytics.errorRate.toFixed(1)}%`);
console.log(`   Logs by level:`, analytics.logsByLevel);
console.log(`   Top contexts:`, analytics.topContexts.slice(0, 3));

// Search functionality
const errorLogs = analyticsLogger.searchLogs({ level: 'error' });
const apiLogs = analyticsLogger.searchLogs({ context: 'API' });
const recentLogs = analyticsLogger.searchLogs({ 
  timeRange: { start: new Date(Date.now() - 5000), end: new Date() }
});

console.log(`\n🔍 Search Results:`);
console.log(`   Error logs found: ${errorLogs.length}`);
console.log(`   API logs found: ${apiLogs.length}`);
console.log(`   Recent logs: ${recentLogs.length}`);
console.log();

// =============================================================================
// 7. Stack Traces and Debugging
// =============================================================================
console.log('7️⃣ Stack Traces & Debugging:');
const debugLogger = new Logger({
  level: 'debug',
  useTimestamp: true,
  logMemoryInline: true
});

debugLogger.trace('Checkpoint reached in user validation', {
  userId: 12345,
  validationStep: 'email_verification'
});

debugLogger.trace('Processing payment workflow', {
  orderId: 'ord_789',
  step: 'charge_creation'
});
console.log();

// =============================================================================
// 8. Data Export
// =============================================================================
console.log('8️⃣ Session Data Export:');
const exportData = analyticsLogger.exportLogs();
const parsedData = JSON.parse(exportData);

console.log(`📦 Export Summary:`);
console.log(`   Session ID: ${parsedData.sessionId}`);
console.log(`   Export time: ${parsedData.exportedAt}`);
console.log(`   Total logs: ${parsedData.logs.length}`);
console.log(`   Analytics included: ${!!parsedData.analytics}`);
console.log();

// =============================================================================
// 9. Production Example
// =============================================================================
console.log('9️⃣ Production-Ready Configuration:');
const productionLogger = new Logger({
  level: 'info',                    // Only info, warn, error in production
  enableMemoryTracking: true,       // Monitor memory for ops
  logMemoryInline: false,          // Don't clutter logs in production
  enableLogAnalytics: true,         // Collect metrics
  enablePerformanceTracking: true,  // Track performance
  maxLogHistory: 500,              // Reasonable history size
  useTimestamp: true
});

productionLogger.info('Application started', { 
  version: '1.0.0',
  environment: 'production',
  port: 3000
});

productionLogger.withContext('HealthCheck').info('Database connection healthy');
productionLogger.withContext('HealthCheck').info('Redis connection healthy');
productionLogger.withContext('HealthCheck').warn('External API latency high', { latency: '1.2s' });

// Get production analytics (without cluttering logs)
const prodAnalytics = productionLogger.getAnalytics();
console.log(`\n📈 Production Metrics:`);
console.log(`   System health: ${prodAnalytics.errorRate < 5 ? 'GOOD' : 'DEGRADED'}`);
console.log(`   Total events: ${prodAnalytics.totalLogs}`);
console.log(`   Error rate: ${prodAnalytics.errorRate.toFixed(1)}%`);
console.log();

// =============================================================================
// Summary
// =============================================================================
console.log('✅ Example Complete!');
console.log('\nKey Features Demonstrated:');
console.log('• Named function imports (debug, info, warn, error, success)');
console.log('• Logger class with flexible configuration');
console.log('• NEW: Inline memory tracking (logMemoryInline: true)');
console.log('• Context-based logging');
console.log('• Performance timing');
console.log('• Analytics and search');
console.log('• Stack trace capture');
console.log('• Session data export');
console.log('• Production-ready configuration');
console.log('\nWeeLog 2.0.2 provides comprehensive logging for any JavaScript application!');