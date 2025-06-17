#!/usr/bin/env node

// Test script for new WeeLog features
import Logger from './dist/weelog.esm.js';

console.log('🧪 Testing WeeLog v2.1.0 New Features\n');

// Test 1: Human-readable timestamps
console.log('📅 Testing Human-Readable Timestamps:');
const humanLogger = new Logger({
  level: 'debug',
  useTimestamp: true,
  useHumanReadableTimestamp: true
});

humanLogger.info('This log uses human-readable timestamps', { timestamp: Date.now(), userId: 123 });
humanLogger.warn('Warning with readable time format', { timestamp: new Date(), retries: 3 });

// Test 2: ISO timestamps (existing format)
console.log('\n📅 Testing ISO Timestamps:');
const isoLogger = new Logger({
  level: 'debug',
  useTimestamp: true,
  useHumanReadableTimestamp: false
});

isoLogger.info('This log uses ISO timestamps');
isoLogger.warn('Warning with ISO time format');

// Test 3: Color logging verification
console.log('\n🎨 Testing Color Logging:');
const colorLogger = new Logger({
  level: 'debug'
});

colorLogger.debug('Debug message - should be gray');
colorLogger.info('Info message - should be cyan/blue');
colorLogger.warn('Warning message - should be yellow');
colorLogger.error('Error message - should be red');

// Test 4: Combined features
console.log('\n🔧 Testing Combined Features:');
const fullLogger = new Logger({
  level: 'debug',
  useTimestamp: true,
  useHumanReadableTimestamp: true,
  enableMemoryTracking: true,
  logMemoryInline: true,
  enablePerformanceTracking: true
});

fullLogger.info('Combined features test', { testData: 'success' });

// Test 5: Context with human-readable timestamps
console.log('\n📝 Testing Context with Human-Readable Timestamps:');
const contextLogger = fullLogger.withContext('TestSuite');
contextLogger.info('Context logging with readable timestamps');

console.log('\n✅ Feature testing complete!');