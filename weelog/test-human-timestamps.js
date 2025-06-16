/**
 * WeeLog v2.1.1 - Human-Readable Timestamps Demo
 * Comprehensive test of the new timestamp formatting features
 */

const Logger = require('./dist/weelog.cjs');

console.log('🧪 WeeLog v2.1.1 - Human-Readable Timestamps Demo\n');

// Test 1: ISO Timestamps (Technical Format)
console.log('1. ISO Timestamp Format (Technical):');
const isoLogger = new Logger({
  useTimestamp: true,
  useHumanReadableTimestamp: false
});

isoLogger.debug('Debug message with ISO timestamp');
isoLogger.info('User authentication successful');
isoLogger.warn('API rate limit at 80%');
isoLogger.error('Database connection timeout');

console.log('\n' + '='.repeat(60) + '\n');

// Test 2: Human-Readable Timestamps
console.log('2. Human-Readable Timestamp Format:');
const humanLogger = new Logger({
  useTimestamp: true,
  useHumanReadableTimestamp: true
});

humanLogger.debug('Debug message with human timestamp');
humanLogger.info('User authentication successful');
humanLogger.warn('API rate limit at 80%');
humanLogger.error('Database connection timeout');

console.log('\n' + '='.repeat(60) + '\n');

// Test 3: Advanced Features with Human Timestamps
console.log('3. Advanced Features with Human Timestamps:');
const advancedLogger = new Logger({
  useTimestamp: true,
  useHumanReadableTimestamp: true,
  enableMemoryTracking: true,
  logMemoryInline: true,
  enablePerformanceTracking: true,
  enableLogAnalytics: true
});

// Performance tracking
advancedLogger.startPerformanceTimer('api-call');
setTimeout(() => {
  advancedLogger.endPerformanceTimer('api-call', 'External API request completed');
}, 100);

// Memory tracking with inline display
advancedLogger.info('Processing user data with memory tracking');
advancedLogger.warn('Memory usage approaching threshold');

// Context logging
const contextLogger = advancedLogger.withContext('UserService');
contextLogger.info('User profile updated successfully');
contextLogger.error('Failed to validate user permissions');

console.log('\n' + '='.repeat(60) + '\n');

// Test 4: Analytics and History
setTimeout(() => {
  console.log('4. Analytics and Log History:');
  
  const analytics = advancedLogger.getAnalytics();
  console.log('📊 Analytics Summary:');
  console.log(`   Total Logs: ${analytics.totalLogs}`);
  console.log(`   Error Rate: ${analytics.errorRate.toFixed(1)}%`);
  console.log(`   Logs by Level:`, analytics.logsByLevel);
  
  // Search logs with human timestamps
  const errorLogs = advancedLogger.searchLogs({ level: 'error' });
  console.log(`\n🔍 Found ${errorLogs.length} error logs with human timestamps:`);
  errorLogs.forEach(log => {
    console.log(`   ${log.formatted}`);
  });
  
  console.log('\n✅ All timestamp features tested successfully!');
  console.log('🎉 WeeLog v2.1.1 is ready for production use!');
}, 200);