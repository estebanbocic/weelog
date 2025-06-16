// Visual test for Node.js ANSI color output
const WeeLog = require('./dist/weelog.cjs');

console.log('🎨 WeeLog Node.js Color Output Test\n');

// Test 1: Basic colors
console.log('1. Basic ANSI Colors:');
const logger = new WeeLog({ level: 'debug' });

logger.debug('This is a DEBUG message - Gray color');
logger.info('This is an INFO message - Cyan color');
logger.warn('This is a WARN message - Yellow color');
logger.error('This is an ERROR message - Red color');

console.log('\n' + '='.repeat(60) + '\n');

// Test 2: Colors with human timestamps
console.log('2. Colors with Human-Readable Timestamps:');
const timestampLogger = new WeeLog({
  level: 'debug',
  useTimestamp: true,
  useHumanReadableTimestamp: true
});

timestampLogger.debug('Debug with human timestamp');
timestampLogger.info('Info with human timestamp');
timestampLogger.warn('Warning with human timestamp');
timestampLogger.error('Error with human timestamp');

console.log('\n' + '='.repeat(60) + '\n');

// Test 3: Colors with context and memory
console.log('3. Colors with Context and Memory Tracking:');
const advancedLogger = new WeeLog({
  level: 'debug',
  useTimestamp: true,
  useHumanReadableTimestamp: true,
  enableMemoryTracking: true,
  logMemoryInline: true
});

const contextLogger = advancedLogger.withContext('ColorTest');
contextLogger.debug('Debug with context and memory - Gray');
contextLogger.info('Info with context and memory - Cyan');
contextLogger.warn('Warning with context and memory - Yellow');
contextLogger.error('Error with context and memory - Red');

console.log('\n' + '='.repeat(60) + '\n');

// Test 4: Manual ANSI color verification
console.log('4. Manual ANSI Color Verification:');
console.log('\x1b[90mThis should be GRAY (debug color)\x1b[0m');
console.log('\x1b[36mThis should be CYAN (info color)\x1b[0m');
console.log('\x1b[33mThis should be YELLOW (warn color)\x1b[0m');
console.log('\x1b[31mThis should be RED (error color)\x1b[0m');

console.log('\n✅ Color test completed! If you see colors above, ANSI codes are working correctly in your terminal.');
console.log('📝 Note: Colors may not display in all terminal environments (e.g., some IDEs or output captures).');