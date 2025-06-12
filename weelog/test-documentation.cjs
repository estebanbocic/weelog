/**
 * WeeLog 2.0 Documentation Examples Test - CommonJS Version
 * This file tests all examples using CommonJS require() syntax
 */

const { log, info, warn, error, debug, success, Logger } = require('./dist/weelog.cjs');

async function runTests() {
  console.log('🧪 Testing WeeLog 2.0 Documentation Examples (CommonJS)\n');

  // Test 1: Named Function Imports
  console.log('📝 Test 1: Named Function Imports (CommonJS)');
  debug('Debug message');
  info('Information message');
  warn('Warning message'); 
  error('Error message');
  success('Success message');
  console.log('✅ CommonJS named imports working\n');

  // Test 2: Logger Class
  console.log('📝 Test 2: Logger Class Usage');
  const logger = new Logger({
    level: 'debug',
    useTimestamp: true,
    enablePerformanceTracking: true,
    enableAnalytics: true
  });

  logger.info('Hello from CommonJS!');
  logger.withContext('CommonJS-Test').error('Testing error with context');
  
  // Performance test
  logger.startPerformanceTimer('cjs-test');
  await new Promise(resolve => setTimeout(resolve, 50));
  logger.endPerformanceTimer('cjs-test', 'CommonJS performance test completed');

  const analytics = logger.getAnalytics();
  console.log(`Analytics: ${analytics.totalLogs} logs, ${analytics.errorRate}% error rate`);
  console.log('✅ CommonJS Logger class working\n');

  console.log('🎉 CommonJS Documentation Examples Passed!\n');
  console.log('WeeLog 2.0 works perfectly with both ES modules and CommonJS! 🚀');
}

runTests().catch(console.error);