// Simple Node.js color test using the Logger class directly
const WeeLog = require('./dist/weelog.cjs');

console.log('Testing Node.js ANSI Colors:');

// Create logger instance using the default export
const logger = new WeeLog({ level: 'debug' });

console.log('\nBasic colored output:');
logger.debug('Debug message (should be gray)');
logger.info('Info message (should be cyan)');
logger.warn('Warning message (should be yellow)');
logger.error('Error message (should be red)');

console.log('\nWith timestamps:');
const timestampLogger = new WeeLog({
  level: 'debug',
  useTimestamp: true,
  useHumanReadableTimestamp: true
});

timestampLogger.debug('Debug with timestamp');
timestampLogger.info('Info with timestamp');
timestampLogger.warn('Warning with timestamp');
timestampLogger.error('Error with timestamp');

console.log('\nColor test completed!');