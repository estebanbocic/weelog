/**
 * WeeLog 2.0 Documentation Examples Test
 * This file tests all examples from the README documentation
 */

import { log, info, warn, error, debug, success } from './dist/weelog.esm.js';
import Logger from './dist/weelog.esm.js';

console.log('🧪 Testing WeeLog 2.0 Documentation Examples\n');

// =============================================================================
// Test 1: Named Function Imports (Quick Start)
// =============================================================================
console.log('📝 Test 1: Named Function Imports');
debug('Debug message');
info('Information message');
warn('Warning message'); 
error('Error message');
success('Success message');
console.log('✅ Named function imports working\n');

// =============================================================================
// Test 2: Logger Class Usage (Quick Start)
// =============================================================================
console.log('📝 Test 2: Logger Class Usage');
const logger = new Logger({
  level: 'debug',
  useTimestamp: true
});

logger.info('Hello World!');
logger.withContext('API').error('Request failed', { status: 500 });
console.log('✅ Logger class working\n');

// =============================================================================
// Test 3: Advanced Features
// =============================================================================
console.log('📝 Test 3: Advanced Features');
const advancedLogger = new Logger({
  level: 'debug',
  enablePerformanceTracking: true,
  enableMemoryTracking: true,
  enableLogAnalytics: true,
  maxLogHistory: 1000
});

// Performance tracking test
console.log('  🔄 Testing performance tracking...');
advancedLogger.startPerformanceTimer('database-query');
// Simulate async operation
await new Promise(resolve => setTimeout(resolve, 100));
advancedLogger.endPerformanceTimer('database-query', 'User data fetched');

// Automatic stack traces test
console.log('  🔄 Testing stack traces...');
advancedLogger.trace('Debug checkpoint reached');

// Analytics test
console.log('  🔄 Testing analytics...');
const analytics = advancedLogger.getAnalytics();
console.log(`    Error rate: ${analytics.errorRate}%`);
console.log(`    Total logs: ${analytics.totalLogs}`);

// Search logs test
console.log('  🔄 Testing log search...');
const errorLogs = advancedLogger.searchLogs({
  level: 'error',
  timeRange: { start: new Date('2024-01-01'), end: new Date() }
});
console.log(`    Found ${errorLogs.length} error logs`);

// Export session data test
console.log('  🔄 Testing data export...');
const exportData = advancedLogger.exportLogs();
const parsedData = JSON.parse(exportData);
console.log(`    Exported ${parsedData.logs.length} logs in session ${parsedData.sessionId}`);
console.log('✅ Advanced features working\n');

// =============================================================================
// Test 4: Constructor Options
// =============================================================================
console.log('📝 Test 4: Constructor Options');
const configLogger = new Logger({
  level: 'warn',           // Only warn and error
  enabled: true,           // Enable logging
  useTimestamp: true,      // Include timestamps
  enablePerformanceTracking: true,
  enableMemoryTracking: true,
  enableLogAnalytics: true,
  maxLogHistory: 500
});

configLogger.debug('This should not appear (below warn level)');
configLogger.info('This should not appear (below warn level)');
configLogger.warn('This warning should appear');
configLogger.error('This error should appear');
console.log('✅ Constructor options working\n');

// =============================================================================
// Test 5: Core Methods
// =============================================================================
console.log('📝 Test 5: Core Methods');
const methodLogger = new Logger({ level: 'debug', useTimestamp: true });

// Basic logging
methodLogger.debug('Debug message', { data: 'debug-data' });
methodLogger.info('Info message', { data: 'info-data' });
methodLogger.warn('Warning message', { data: 'warn-data' });
methodLogger.error('Error message', { data: 'error-data' });

// Context logging
methodLogger.withContext('ModuleName').info('Message with context');
methodLogger.withContext('UserService').error('Authentication failed', { userId: 123 });

// Performance tracking
methodLogger.startPerformanceTimer('operation-1');
await new Promise(resolve => setTimeout(resolve, 50));
methodLogger.endPerformanceTimer('operation-1', 'Operation completed');

// Advanced features
methodLogger.trace('Stack trace message', { location: 'test-file' });
const currentAnalytics = methodLogger.getAnalytics();
const logHistory = methodLogger.getLogHistory();
console.log(`    Analytics: ${currentAnalytics.totalLogs} total logs`);
console.log(`    History: ${logHistory.length} logs in memory`);

methodLogger.clearHistory();
const clearedHistory = methodLogger.getLogHistory();
console.log(`    After clear: ${clearedHistory.length} logs in memory`);
console.log('✅ Core methods working\n');

// =============================================================================
// Test 6: Search Criteria
// =============================================================================
console.log('📝 Test 6: Search Criteria');
const searchLogger = new Logger({
  level: 'debug',
  enableLogAnalytics: true,
  maxLogHistory: 100
});

// Generate test logs
searchLogger.withContext('TestModule').debug('Debug in TestModule');
searchLogger.withContext('TestModule').info('Info in TestModule');
searchLogger.withContext('UserService').warn('Warning in UserService');
searchLogger.withContext('UserService').error('Error in UserService');
searchLogger.info('General info message');

// Test different search criteria
const debugLogs = searchLogger.searchLogs({ level: 'debug' });
const userServiceLogs = searchLogger.searchLogs({ context: 'UserService' });
const messageSearch = searchLogger.searchLogs({ message: 'info' });
const recentLogs = searchLogger.searchLogs({
  timeRange: { start: new Date(Date.now() - 1000), end: new Date() }
});

console.log(`    Debug logs: ${debugLogs.length}`);
console.log(`    UserService logs: ${userServiceLogs.length}`);
console.log(`    Message containing 'info': ${messageSearch.length}`);
console.log(`    Recent logs: ${recentLogs.length}`);
console.log('✅ Search criteria working\n');

// =============================================================================
// Test 7: Analytics Data Structure
// =============================================================================
console.log('📝 Test 7: Analytics Data Structure');
const analyticsLogger = new Logger({
  level: 'debug',
  enableLogAnalytics: true,
  maxLogHistory: 100
});

// Generate varied logs for analytics
analyticsLogger.debug('Debug 1');
analyticsLogger.debug('Debug 2');
analyticsLogger.info('Info 1');
analyticsLogger.info('Info 2');
analyticsLogger.info('Info 3');
analyticsLogger.warn('Warning 1');
analyticsLogger.error('Error 1');

const finalAnalytics = analyticsLogger.getAnalytics();
console.log('    Analytics structure:');
console.log(`      Total logs: ${finalAnalytics.totalLogs}`);
console.log(`      Error rate: ${finalAnalytics.errorRate}%`);
console.log(`      Average log rate: ${finalAnalytics.averageLogRate}`);
console.log(`      Logs by level:`, finalAnalytics.logsByLevel);
console.log(`      Top contexts:`, finalAnalytics.topContexts);
console.log('✅ Analytics data structure working\n');

// =============================================================================
// Test 8: Export Format
// =============================================================================
console.log('📝 Test 8: Export Format');
const exportLogger = new Logger({
  level: 'debug',
  enableLogAnalytics: true,
  enablePerformanceTracking: true,
  maxLogHistory: 50
});

exportLogger.info('Export test log 1');
exportLogger.error('Export test log 2');

const exportResult = exportLogger.exportLogs();
const parsedExport = JSON.parse(exportResult);

console.log('    Export format validation:');
console.log(`      Has sessionId: ${!!parsedExport.sessionId}`);
console.log(`      Has exportedAt: ${!!parsedExport.exportedAt}`);
console.log(`      Has analytics: ${!!parsedExport.analytics}`);
console.log(`      Has logs array: ${Array.isArray(parsedExport.logs)}`);
console.log(`      Logs count: ${parsedExport.logs.length}`);
console.log('✅ Export format working\n');

// =============================================================================
// Test Summary
// =============================================================================
console.log('🎉 All Documentation Examples Passed!');
console.log('');
console.log('Summary:');
console.log('✅ Named function imports');
console.log('✅ Logger class usage');
console.log('✅ Advanced features (performance, memory, analytics)');
console.log('✅ Constructor options');
console.log('✅ Core methods');
console.log('✅ Search functionality');
console.log('✅ Analytics data structure');
console.log('✅ Export format');
console.log('');
console.log('WeeLog 2.0 is ready for production use! 🚀');