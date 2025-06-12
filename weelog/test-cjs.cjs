// Test CommonJS import
const { log, info, warn, error, debug, success, Logger } = require('./dist/weelog.cjs.js');

console.log('Testing CommonJS named exports:');
log('Testing log function');
info('Testing info function');
warn('Testing warn function');
error('Testing error function');
debug('Testing debug function');
success('Testing success function');

console.log('\nTesting Logger class:');
const logger = new Logger({ level: 'debug', useTimestamp: true });
logger.debug('Testing Logger class debug method');
logger.info('Testing Logger class info method');

console.log('\nAll CommonJS exports working correctly!');