#!/usr/bin/env node

// Test script to verify human readable timestamp fix in JSON objects
import Logger from './dist/weelog.esm.js';

console.log('🧪 Testing Human Readable Timestamp Fix\n');

// Test 1: Human-readable timestamps with JSON data containing timestamp
console.log('📅 Testing JSON timestamp formatting with human readable enabled:');
const humanLogger = new Logger({
  level: 'debug',
  useTimestamp: true,
  useHumanReadableTimestamp: true
});

// Test with timestamp in JSON object
humanLogger.info('Processing data', { 
  timestamp: Date.now(),
  userId: 123,
  status: 'active'
});

humanLogger.warn('API rate limit', {
  timestamp: new Date(),
  remaining: 10,
  resetTime: Date.now() + 60000
});

// Test with nested timestamp
humanLogger.error('Database error', {
  error: 'Connection failed',
  details: {
    timestamp: Date.now(),
    retries: 3
  }
});

console.log('\n📅 Testing JSON timestamp formatting with human readable disabled:');
const isoLogger = new Logger({
  level: 'debug',
  useTimestamp: true,
  useHumanReadableTimestamp: false
});

// Same tests with ISO timestamps
isoLogger.info('Processing data', { 
  timestamp: Date.now(),
  userId: 123,
  status: 'active'
});

isoLogger.warn('API rate limit', {
  timestamp: new Date(),
  remaining: 10,
  resetTime: Date.now() + 60000
});

console.log('\n✅ Test complete - verify that timestamps in JSON objects are formatted correctly');