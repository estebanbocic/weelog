/**
 * WeeLog v2.1.1 - Node.js Color Logging Test
 * Testing ANSI color codes in Node.js environment
 */

const Logger = require('./dist/weelog.cjs');

console.log('🎨 Testing WeeLog Node.js Color Logging\n');

// Test 1: Basic color logging without timestamps
console.log('1. Basic Color Logging (Node.js ANSI Colors):');
const basicLogger = new Logger({
  level: 'debug'
});

basicLogger.debug('Debug message - should be gray');
basicLogger.info('Info message - should be blue');
basicLogger.warn('Warning message - should be yellow');
basicLogger.error('Error message - should be red');

console.log('\n' + '='.repeat(50) + '\n');

// Test 2: Color logging with ISO timestamps
console.log('2. Color Logging with ISO Timestamps:');
const isoLogger = new Logger({
  level: 'debug',
  useTimestamp: true,
  useHumanReadableTimestamp: false
});

isoLogger.debug('Debug with ISO timestamp');
isoLogger.info('Info with ISO timestamp');
isoLogger.warn('Warning with ISO timestamp');
isoLogger.error('Error with ISO timestamp');

console.log('\n' + '='.repeat(50) + '\n');

// Test 3: Color logging with human-readable timestamps
console.log('3. Color Logging with Human-Readable Timestamps:');
const humanLogger = new Logger({
  level: 'debug',
  useTimestamp: true,
  useHumanReadableTimestamp: true
});

humanLogger.debug('Debug with human timestamp');
humanLogger.info('Info with human timestamp');
humanLogger.warn('Warning with human timestamp');
humanLogger.error('Error with human timestamp');

console.log('\n' + '='.repeat(50) + '\n');

// Test 4: Color logging with context and memory tracking
console.log('4. Advanced Color Logging with Context:');
const advancedLogger = new Logger({
  level: 'debug',
  useTimestamp: true,
  useHumanReadableTimestamp: true,
  enableMemoryTracking: true,
  logMemoryInline: true
});

const contextLogger = advancedLogger.withContext('ColorTest');
contextLogger.debug('Debug with context and memory');
contextLogger.info('Info with context and memory');
contextLogger.warn('Warning with context and memory');
contextLogger.error('Error with context and memory');

console.log('\n' + '='.repeat(50) + '\n');

// Test 5: Performance tracking with colors
console.log('5. Performance Tracking with Colors:');
const perfLogger = new Logger({
  useTimestamp: true,
  useHumanReadableTimestamp: true,
  enablePerformanceTracking: true
});

perfLogger.startPerformanceTimer('color-test');
setTimeout(() => {
  perfLogger.endPerformanceTimer('color-test', 'Color performance test completed');
  
  console.log('\n✅ Node.js color logging test completed!');
  console.log('If you see colors above, ANSI color codes are working correctly.');
}, 100);