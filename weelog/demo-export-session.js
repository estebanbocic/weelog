/**
 * WeeLog Export & Session Tracking Demo
 * Demonstrates session management and data export capabilities
 */

import { Logger } from './dist/weelog.esm.js';

async function demonstrateExportAndSession() {
  console.log('🔄 WeeLog Export & Session Tracking Demo\n');

  // Create logger with session tracking enabled
  const logger = new Logger({
    level: 'debug',
    enableMemoryTracking: true,
    enablePerformanceTracking: true,
    enableLogAnalytics: true,
    maxLogHistory: 100,
    useTimestamp: true
  });

  console.log('📋 Session Information:');
  console.log(`   Session ID: ${logger.sessionId || 'N/A'}`);
  console.log(`   Started at: ${new Date().toISOString()}`);
  console.log();

  // Simulate application workflow with different contexts
  console.log('🚀 Simulating Application Session...\n');

  // User authentication flow
  logger.withContext('AuthService').info('User login attempt', {
    email: 'user@example.com',
    ip: '192.168.1.100'
  });

  logger.startPerformanceTimer('auth-validation');
  await simulateWork(50);
  logger.endPerformanceTimer('auth-validation', 'User credentials validated');

  logger.withContext('AuthService').info('User login successful', {
    userId: 12345,
    sessionToken: 'abc123...'
  });

  // Database operations
  logger.withContext('Database').debug('Connecting to user database');
  
  logger.startPerformanceTimer('db-query');
  await simulateWork(100);
  logger.endPerformanceTimer('db-query', 'User profile retrieved');

  logger.withContext('Database').info('User profile loaded', {
    userId: 12345,
    preferences: { theme: 'dark', notifications: true }
  });

  // API calls
  logger.withContext('ExternalAPI').info('Fetching user recommendations');
  
  logger.startPerformanceTimer('api-call');
  await simulateWork(200);
  logger.endPerformanceTimer('api-call', 'Recommendations received');

  // Error simulation
  logger.withContext('PaymentService').warn('Payment processing delayed', {
    orderId: 'ord_789',
    amount: 99.99,
    retryCount: 1
  });

  logger.withContext('PaymentService').error('Payment gateway timeout', {
    gateway: 'stripe',
    errorCode: 'TIMEOUT',
    orderId: 'ord_789'
  });

  // Business logic
  logger.withContext('BusinessLogic').info('Processing user workflow', {
    workflowId: 'wf_456',
    steps: ['validate', 'authorize', 'execute']
  });

  logger.withContext('BusinessLogic').debug('Workflow step completed', {
    step: 'validate',
    duration: '45ms'
  });

  console.log('✅ Session simulation complete!\n');

  // Show session analytics
  console.log('📊 Session Analytics:');
  const analytics = logger.getAnalytics();
  console.log(`   Total logs in session: ${analytics.totalLogs}`);
  console.log(`   Error rate: ${analytics.errorRate.toFixed(1)}%`);
  console.log(`   Logs by level:`, analytics.logsByLevel);
  console.log(`   Active contexts:`, analytics.topContexts.slice(0, 5));
  console.log();

  // Export session data
  console.log('💾 Exporting Session Data...');
  const exportData = logger.exportLogs();
  const sessionData = JSON.parse(exportData);

  console.log(`   Session ID: ${sessionData.sessionId}`);
  console.log(`   Export timestamp: ${sessionData.exportedAt}`);
  console.log(`   Total logs exported: ${sessionData.logs.length}`);
  console.log(`   Session duration: ${calculateSessionDuration(sessionData.logs)}`);
  console.log();

  // Show export structure
  console.log('📁 Export Data Structure:');
  console.log('   ├── sessionId: Unique session identifier');
  console.log('   ├── exportedAt: Export timestamp');
  console.log('   ├── analytics: Session statistics');
  console.log('   └── logs: Complete log history');
  console.log();

  // Demonstrate log filtering within session
  console.log('🔍 Session Log Analysis:');
  const errorLogs = logger.searchLogs({ level: 'error' });
  const authLogs = logger.searchLogs({ context: 'AuthService' });
  const paymentLogs = logger.searchLogs({ context: 'PaymentService' });

  console.log(`   Error logs in session: ${errorLogs.length}`);
  console.log(`   Authentication logs: ${authLogs.length}`);
  console.log(`   Payment logs: ${paymentLogs.length}`);
  console.log();

  // Show sample log entries from session
  console.log('📝 Sample Session Log Entries:');
  const recentLogs = logger.getLogHistory().slice(-3);
  recentLogs.forEach((log, index) => {
    console.log(`   ${index + 1}. [${log.level.toUpperCase()}] ${log.context || 'GLOBAL'}: ${log.message}`);
    if (log.data) {
      console.log(`      Data: ${JSON.stringify(log.data)}`);
    }
    console.log(`      Time: ${log.timestamp.toISOString()}`);
    console.log(`      Session: ${log.sessionId}`);
    console.log();
  });

  // Save export to file (demonstration)
  console.log('💾 Export Use Cases:');
  console.log('   • Debug session sharing with team members');
  console.log('   • Production issue investigation');
  console.log('   • Performance analysis and optimization');
  console.log('   • Audit trails and compliance reporting');
  console.log('   • Integration testing validation');
  console.log();

  // Show how to save export data
  console.log('📄 To save export data:');
  console.log('   const fs = require("fs");');
  console.log('   fs.writeFileSync(`debug-session-${sessionData.sessionId}.json`, exportData);');
  console.log();

  console.log('✅ Export & Session Tracking Demo Complete!');
}

function simulateWork(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function calculateSessionDuration(logs) {
  if (logs.length < 2) return '0ms';
  
  const firstLog = new Date(logs[0].timestamp);
  const lastLog = new Date(logs[logs.length - 1].timestamp);
  const duration = lastLog - firstLog;
  
  if (duration < 1000) return `${duration}ms`;
  if (duration < 60000) return `${(duration / 1000).toFixed(1)}s`;
  return `${(duration / 60000).toFixed(1)}m`;
}

// Run the demonstration
demonstrateExportAndSession().catch(console.error);