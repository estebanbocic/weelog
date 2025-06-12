/**
 * Advanced WeeLog Features Example
 * Demonstrates performance tracking, analytics, and advanced logging
 */

import { Logger } from 'weelog';

async function advancedExample() {
  console.log('WeeLog Advanced Features Demo\n');

  // Advanced logger with all features enabled
  const logger = new Logger({
    level: 'debug',
    enableMemoryTracking: true,
    logMemoryInline: true,
    enablePerformanceTracking: true,
    enableLogAnalytics: true,
    maxLogHistory: 50,
    useTimestamp: true
  });

  // Performance tracking
  console.log('1. Performance Tracking:');
  logger.startPerformanceTimer('api-call');
  await simulateWork(100);
  logger.endPerformanceTimer('api-call', 'External API response received');

  logger.startPerformanceTimer('data-processing');
  await simulateWork(200);
  logger.endPerformanceTimer('data-processing', 'User data processed');
  console.log();

  // Context logging with data
  console.log('2. Rich Context Logging:');
  logger.withContext('Authentication').info('User login attempt', {
    email: 'user@example.com',
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0...'
  });

  logger.withContext('Database').warn('Slow query detected', {
    query: 'SELECT * FROM users WHERE...',
    duration: '2.3s',
    rows: 15420
  });

  logger.withContext('Payment').error('Transaction failed', {
    amount: 99.99,
    currency: 'USD',
    gateway: 'stripe',
    errorCode: 'card_declined'
  });
  console.log();

  // Stack traces
  console.log('3. Stack Trace Logging:');
  logger.trace('Checkpoint in user validation flow', {
    step: 'email_verification',
    userId: 12345
  });
  console.log();

  // Analytics
  console.log('4. Analytics Summary:');
  const analytics = logger.getAnalytics();
  console.log(`   Total logs: ${analytics.totalLogs}`);
  console.log(`   Error rate: ${analytics.errorRate.toFixed(1)}%`);
  console.log(`   Logs by level:`, analytics.logsByLevel);
  console.log(`   Top contexts:`, analytics.topContexts);
  console.log();

  // Search functionality
  console.log('5. Log Search:');
  const errorLogs = logger.searchLogs({ level: 'error' });
  const authLogs = logger.searchLogs({ context: 'Authentication' });
  console.log(`   Error logs found: ${errorLogs.length}`);
  console.log(`   Authentication logs: ${authLogs.length}`);
  console.log();

  // Export session data
  console.log('6. Session Export:');
  const exportData = logger.exportLogs();
  const sessionData = JSON.parse(exportData);
  console.log(`   Session ID: ${sessionData.sessionId}`);
  console.log(`   Export timestamp: ${sessionData.exportedAt}`);
  console.log(`   Logs exported: ${sessionData.logs.length}`);
  console.log();

  console.log('Advanced features demo complete!');
}

function simulateWork(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the example
advancedExample().catch(console.error);