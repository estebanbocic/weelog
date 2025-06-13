# WeeLog Feature Cards Content

## ⚡ Performance Tracking

**What it does:**
Measures and logs execution time for operations, functions, or code blocks with microsecond precision. Provides built-in timing capabilities without external dependencies.

**How it works:**
- Uses `performance.now()` for high-resolution timing
- Stores start timestamps in a Map with custom labels
- Calculates duration when timer is stopped
- Automatically logs results with formatted timing data
- Integrates seamlessly with regular logging flow

**Implementation:**
```javascript
logger.startPerformanceTimer('api-call');
// Your code here
logger.endPerformanceTimer('api-call', 'User data retrieved');
// Output: [INFO] User data retrieved (45.2ms)
```

**When to use:**
- **API Response Times**: Measure external service call durations
- **Database Queries**: Track slow query performance in production
- **Algorithm Optimization**: Compare different implementation speeds
- **User Experience**: Monitor page load and interaction times
- **Bottleneck Identification**: Find performance issues in complex workflows
- **SLA Monitoring**: Ensure operations meet performance requirements

---

## 🧠 Memory Monitoring

**What it does:**
Tracks real-time heap memory usage in both Node.js and browser environments. Provides memory consumption analytics and optional inline display in log entries.

**How it works:**
- **Browser**: Uses `performance.memory` API for heap size data
- **Node.js**: Leverages `process.memoryUsage()` for detailed memory stats
- Calculates usage percentages and formats data as MB
- Optional inline display shows live memory in each log entry
- Stores memory snapshots with each log entry when enabled

**Implementation:**
```javascript
const logger = new Logger({
  enableMemoryTracking: true,
  logMemoryInline: true  // Shows memory in each log
});

logger.info('Processing large dataset');
// Output: [INFO] Processing large dataset (Memory: 45.7 MB)
```

**When to use:**
- **Memory Leak Detection**: Monitor memory growth over time
- **Resource Optimization**: Track memory usage during heavy operations
- **Production Monitoring**: Watch for memory spikes in live applications
- **Development Debugging**: See immediate memory impact of code changes
- **Performance Tuning**: Optimize memory-intensive algorithms
- **Capacity Planning**: Understand application memory requirements

---

## 📊 Live Analytics

**What it does:**
Provides real-time insights into logging patterns, error rates, and application behavior. Automatically collects and analyzes log data to reveal trends and issues.

**How it works:**
- Maintains running counters for each log level (debug, info, warn, error)
- Calculates error rates as percentage of total logs
- Tracks most active contexts to identify busy components
- Updates statistics in real-time with each log entry
- Provides instant access to accumulated metrics

**Implementation:**
```javascript
const analytics = logger.getAnalytics();
console.log(analytics);
// {
//   totalLogs: 247,
//   errorRate: 8.5,
//   logsByLevel: { debug: 45, info: 156, warn: 31, error: 15 },
//   topContexts: [
//     { context: "API", count: 89 },
//     { context: "Database", count: 67 }
//   ]
// }
```

**When to use:**
- **Health Monitoring**: Track application stability in real-time
- **Error Rate Alerts**: Identify when error rates exceed thresholds
- **Component Analysis**: See which parts of your app are most active
- **Performance Insights**: Understand logging patterns and bottlenecks
- **Quality Assurance**: Monitor testing coverage and error patterns
- **Production Dashboards**: Display live application health metrics

---

## 🔍 Smart Log Search

**What it does:**
Enables powerful filtering and querying across complete log history using multiple criteria. Search by level, context, message content, and time ranges with instant results.

**How it works:**
- Maintains in-memory array of all log entries with full metadata
- Uses JavaScript array filtering for real-time search
- Supports multiple simultaneous search criteria with AND logic
- Performs substring matching for message content
- Handles date range filtering with precision

**Implementation:**
```javascript
// Find all error logs
const errors = logger.searchLogs({ level: 'error' });

// Find API-related logs from last hour
const recentAPI = logger.searchLogs({
  context: 'API',
  timeRange: {
    start: new Date(Date.now() - 3600000),
    end: new Date()
  }
});

// Find connection-related messages
const connections = logger.searchLogs({ message: 'connection' });
```

**When to use:**
- **Bug Investigation**: Find all logs related to specific errors or components
- **Troubleshooting**: Search for patterns around the time issues occurred
- **Code Review**: Analyze logging coverage for specific features
- **Performance Analysis**: Filter logs by context to study component behavior
- **Debugging Sessions**: Quickly locate relevant log entries
- **Compliance Audits**: Search for specific events or user actions

---

## 📋 Stack Trace Capture

**What it does:**
Automatically captures and stores complete call stack information when logging critical events. Provides exact code location and execution path for debugging.

**How it works:**
- Uses JavaScript's `Error` object stack property to capture call traces
- Automatically invoked with `trace()` method
- Stores stack information alongside regular log data
- Preserves full execution context and file locations
- Works in both browser and Node.js environments

**Implementation:**
```javascript
logger.trace('Checkpoint reached in user validation', {
  userId: 12345,
  validationStep: 'email_verification'
});
// Captures and logs complete stack trace with context data
```

**When to use:**
- **Complex Debugging**: Track execution flow through multiple function calls
- **Error Investigation**: Understand exactly where and how errors occur
- **Code Path Analysis**: Verify correct execution routes in complex logic
- **Integration Testing**: Ensure proper flow through system boundaries
- **Production Debugging**: Capture critical checkpoints for later analysis
- **Performance Profiling**: Identify call patterns and optimization opportunities

---

## 💾 Export & Session Tracking

**What it does:**
Maintains complete debugging sessions with unique identifiers and provides JSON export of all log data, analytics, and metadata for sharing and analysis.

**How it works:**
- Generates unique session ID when logger is created
- Attaches session ID to every log entry for traceability
- Maintains complete log history in memory with configurable limits
- Exports comprehensive JSON containing logs, analytics, and metadata
- Preserves all performance and memory data within session context

**Implementation:**
```javascript
const logger = new Logger({ enableLogAnalytics: true });

// ... application runs, logs events ...

// Export complete session
const sessionData = logger.exportLogs();
const parsed = JSON.parse(sessionData);

console.log(`Session: ${parsed.sessionId}`);
console.log(`Duration: ${calculateDuration(parsed.logs)}`);
console.log(`Total logs: ${parsed.logs.length}`);

// Save for sharing
fs.writeFileSync(`debug-session-${parsed.sessionId}.json`, sessionData);
```

**When to use:**
- **Team Collaboration**: Share complete debugging sessions with colleagues
- **Bug Reports**: Attach comprehensive log data to issue tickets
- **Production Issues**: Export critical sessions for offline analysis
- **Testing Documentation**: Preserve test execution logs as evidence
- **Performance Analysis**: Export timing data for detailed review
- **Compliance Records**: Generate audit trails with complete traceability