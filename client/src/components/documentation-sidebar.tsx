import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, BookOpen, Code, Layers } from "lucide-react";
import { FeaturesShowcase } from "./features-showcase";

type TabType = 'demo' | 'getting-started' | 'api' | 'frameworks';

export function DocumentationSidebar() {
  const [activeTab, setActiveTab] = useState<TabType>('demo');

  const switchTab = (tab: TabType) => {
    setActiveTab(tab);
  };

  const getTabClasses = (tab: TabType) => {
    return activeTab === tab
      ? "flex-1 px-3 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600 bg-blue-50 flex items-center justify-center gap-2"
      : "flex-1 px-3 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center justify-center gap-2";
  };

  return (
    <div id="documentation" className="w-full">
      <div className="bg-white rounded-xl shadow-sm border-0 overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => switchTab('demo')}
            className={getTabClasses('demo')}
          >
            <Play className="w-4 h-4" />
            <span className="hidden sm:inline">Features Overview</span>
            <span className="sm:hidden">Features</span>
          </button>
          <button
            onClick={() => switchTab('getting-started')}
            className={getTabClasses('getting-started')}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Complete Guide</span>
            <span className="sm:hidden">Guide</span>
          </button>
          <button
            onClick={() => switchTab('api')}
            className={getTabClasses('api')}
          >
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">Methods & Options</span>
            <span className="sm:hidden">Methods</span>
          </button>
          <button
            onClick={() => switchTab('frameworks')}
            className={getTabClasses('frameworks')}
          >
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">Frameworks</span>
            <span className="sm:hidden">Framework</span>
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="min-h-[500px] overflow-y-auto overflow-x-hidden">
          {/* Interactive Demo Tab */}
          {activeTab === 'demo' && (
            <div className="p-0">
              <FeaturesShowcase />
            </div>
          )}
          
          {/* Complete Guide Tab */}
          {activeTab === 'getting-started' && (
            <div className="p-6 max-h-[600px] overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Guide</h3>
              
              <Card className="border-0 bg-gradient-to-r from-green-50 to-emerald-50 p-4 mb-6">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-semibold text-green-800">Production Ready</span>
                  <Badge className="ml-2 bg-green-100 text-green-800 text-xs">v2.1.2</Badge>
                </div>
                <p className="text-sm text-green-700">
                  Professional logging library with advanced debugging capabilities for modern JavaScript applications.
                </p>
              </Card>

              {/* Latest Release Notes */}
              <Card className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">What's New in v2.1.2</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2"></div>
                    <div className="text-blue-800">
                      <strong>Fixed:</strong> Human-readable timestamps now apply to JSON objects
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                    <div className="text-blue-800">
                      <strong>Added:</strong> Comprehensive METHODS_AND_OPTIONS.md reference guide
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 mr-2"></div>
                    <div className="text-blue-800">
                      <strong>Added:</strong> Complete "When to Use" guidance for every option
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 mr-2"></div>
                    <div className="text-blue-800">
                      <strong>Enhanced:</strong> Documentation with usage scenarios and best practices
                    </div>
                  </div>
                </div>
              </Card>
              
              <div className="space-y-8">
                {/* Installation */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs font-bold text-blue-600">1</span>
                    </div>
                    Installation & Basic Setup
                  </h4>
                  <div className="ml-8 space-y-3">
                    <p className="text-sm text-gray-600 mb-3">
                      Install WeeLog via npm and start logging immediately with zero configuration required.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <code className="font-mono text-sm text-green-400">npm install weelog</code>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="font-mono text-sm text-green-400">
                        <code>{`import { log, info, warn, error } from 'weelog';

// Simple logging
log('Application started');
info('User logged in', { userId: 123 });
warn('API rate limit approaching');
error('Database connection failed');

// With human-readable timestamps
import Logger from 'weelog';
const logger = new Logger({
  useTimestamp: true,
  useHumanReadableTimestamp: true
});
logger.info('User action completed');
// Output: [Jun 16, 2025, 9:45:23 PM] [INFO] User action completed`}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Performance Tracking */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs font-bold text-purple-600">2</span>
                    </div>
                    Performance Tracking
                  </h4>
                  <div className="ml-8 space-y-3">
                    <p className="text-sm text-gray-600 mb-3">
                      Measure execution times, identify bottlenecks, and optimize your application performance with precision timing.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="font-mono text-sm text-green-400">
                        <code>{`import Logger from 'weelog';

const logger = new Logger({
  enablePerformanceTracking: true
});

// Automatic timing
logger.startPerformanceTimer('database-query');
const users = await db.users.findMany();
logger.endPerformanceTimer('database-query', 'Users fetched');
// Output: [INFO] Users fetched (47.3ms)

// Manual performance data
logger.info('API response', {
  performance: { duration: 234, endpoint: '/api/users' }
});`}</code>
                      </pre>
                    </div>
                    <Card className="border-0 bg-purple-50 p-3">
                      <p className="text-xs text-purple-700">
                        <strong>Pro Tip:</strong> Use performance tracking to identify slow functions, 
                        API calls, and database queries that impact user experience.
                      </p>
                    </Card>
                  </div>
                </div>

                {/* Memory Monitoring */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs font-bold text-red-600">3</span>
                    </div>
                    Memory Monitoring
                  </h4>
                  <div className="ml-8 space-y-3">
                    <p className="text-sm text-gray-600 mb-3">
                      Track memory usage patterns, detect memory leaks, and optimize resource consumption in real-time.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="font-mono text-sm text-green-400">
                        <code>{`const logger = new Logger({
  enableMemoryTracking: true,
  logMemoryInline: true  // Show memory in every log
});

// Every log shows current memory usage
logger.info('Processing large dataset');
// Output: [INFO] Processing large dataset (Memory: 156.7 MB - 67%)

// Get detailed memory info
const memory = logger.getMemoryInfo();
logger.warn('High memory usage detected', {
  used: memory.used,
  percentage: memory.percentage
});`}</code>
                      </pre>
                    </div>
                    <Card className="border-0 bg-red-50 p-3">
                      <p className="text-xs text-red-700">
                        <strong>Memory Leak Detection:</strong> Watch for steadily increasing memory 
                        percentages over time to identify potential leaks.
                      </p>
                    </Card>
                  </div>
                </div>

                {/* Stack Traces & Debugging */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs font-bold text-orange-600">4</span>
                    </div>
                    Stack Traces & Deep Debugging
                  </h4>
                  <div className="ml-8 space-y-3">
                    <p className="text-sm text-gray-600 mb-3">
                      Capture complete call stacks, trace execution paths, and pinpoint exact locations of issues in your code.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="font-mono text-sm text-green-400">
                        <code>{`// Automatic stack trace capture
logger.trace('Checkpoint reached', { 
  userId: 123, 
  action: 'profile-update' 
});

// Context-aware logging
const apiLogger = logger.withContext('PaymentAPI');
apiLogger.error('Transaction failed', {
  transactionId: 'tx_123',
  amount: 99.99,
  reason: 'insufficient_funds'
});
// Output: [ERROR] [PaymentAPI] Transaction failed
//         at processPayment (payment.js:45:12)
//         at handleRequest (server.js:123:8)`}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Analytics & Insights */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs font-bold text-indigo-600">5</span>
                    </div>
                    Analytics & Insights
                  </h4>
                  <div className="ml-8 space-y-3">
                    <p className="text-sm text-gray-600 mb-3">
                      Get comprehensive statistics about your application's behavior, error patterns, and logging trends.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="font-mono text-sm text-green-400">
                        <code>{`const logger = new Logger({
  enableLogAnalytics: true,
  maxLogHistory: 5000
});

// Generate detailed analytics
const analytics = logger.getAnalytics();
console.log(\`Total logs: \${analytics.totalLogs}\`);
console.log(\`Error rate: \${analytics.errorRate}%\`);
console.log(\`Top contexts:\`, analytics.topContexts);

// Search and filter logs
const errorLogs = logger.searchLogs({
  level: 'error',
  context: 'API',
  timeRange: {
    start: new Date('2024-01-01'),
    end: new Date()
  }
});`}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Export & Session Management */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs font-bold text-green-600">6</span>
                    </div>
                    Export & Session Management
                  </h4>
                  <div className="ml-8 space-y-3">
                    <p className="text-sm text-gray-600 mb-3">
                      Export complete logging sessions for analysis, share debug information with team members, and maintain session continuity.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="font-mono text-sm text-green-400">
                        <code>{`// Export all session data
const sessionData = logger.exportLogs();
console.log('Session exported:', sessionData);

// Get complete log history
const history = logger.getLogHistory();
history.forEach(entry => {
  console.log(\`[\${entry.level}] \${entry.message}\`);
  console.log(\`Session: \${entry.sessionId}\`);
  console.log(\`Stack: \${entry.stackTrace}\`);
});

// Clear history when needed
logger.clearHistory();`}</code>
                      </pre>
                    </div>
                    <Card className="border-0 bg-green-50 p-3">
                      <p className="text-xs text-green-700">
                        <strong>Team Collaboration:</strong> Export logs as JSON to share debugging 
                        sessions with teammates or attach to bug reports.
                      </p>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Methods & Options Tab */}
          {activeTab === 'api' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Methods & Options Reference</h3>
              
              <div className="space-y-6">
                {/* Constructor Options */}
                <Card className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                  <h4 className="font-semibold text-blue-900 mb-3">Constructor Options</h4>
                  <div className="bg-gray-900 rounded-lg p-3 mb-3">
                    <code className="font-mono text-sm text-green-400">new Logger(options?: LoggerOptions)</code>
                  </div>
                  <div className="text-sm text-blue-800 space-y-3">
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="bg-white/50 rounded p-2">
                        <code className="text-blue-700">level: 'debug' | 'info' | 'warn' | 'error'</code>
                        <div className="text-blue-600 mt-1"><strong>Default:</strong> 'info' | <strong>Use:</strong> Set minimum log level - 'debug' for development, 'warn' for production monitoring</div>
                      </div>
                      <div className="bg-white/50 rounded p-2">
                        <code className="text-blue-700">enabled: boolean</code>
                        <div className="text-blue-600 mt-1"><strong>Default:</strong> true | <strong>Use:</strong> Master switch to disable all logging in production environments</div>
                      </div>
                      <div className="bg-white/50 rounded p-2">
                        <code className="text-blue-700">useTimestamp: boolean</code>
                        <div className="text-blue-600 mt-1"><strong>Default:</strong> false | <strong>Use:</strong> Enable for debugging time-sensitive operations and performance analysis</div>
                      </div>
                      <div className="bg-white/50 rounded p-2">
                        <code className="text-blue-700">useHumanReadableTimestamp: boolean</code>
                        <div className="text-blue-600 mt-1"><strong>Default:</strong> false | <strong>Use:</strong> When logs are reviewed by humans - shows "Jun 16, 2025, 9:45:23 PM" vs ISO format</div>
                      </div>
                      <div className="bg-white/50 rounded p-2">
                        <code className="text-blue-700">enablePerformanceTracking: boolean</code>
                        <div className="text-blue-600 mt-1"><strong>Default:</strong> false | <strong>Use:</strong> Track operation durations, API response times, identify bottlenecks</div>
                      </div>
                      <div className="bg-white/50 rounded p-2">
                        <code className="text-blue-700">enableMemoryTracking: boolean</code>
                        <div className="text-blue-600 mt-1"><strong>Default:</strong> false | <strong>Use:</strong> Memory leak detection, resource monitoring, optimization</div>
                      </div>
                      <div className="bg-white/50 rounded p-2">
                        <code className="text-blue-700">logMemoryInline: boolean</code>
                        <div className="text-blue-600 mt-1"><strong>Default:</strong> false | <strong>Use:</strong> Real-time memory monitoring during development (requires enableMemoryTracking)</div>
                      </div>
                      <div className="bg-white/50 rounded p-2">
                        <code className="text-blue-700">enableLogAnalytics: boolean</code>
                        <div className="text-blue-600 mt-1"><strong>Default:</strong> false | <strong>Use:</strong> Monitor error rates, log frequency analysis, debugging insights</div>
                      </div>
                      <div className="bg-white/50 rounded p-2">
                        <code className="text-blue-700">maxLogHistory: number</code>
                        <div className="text-blue-600 mt-1"><strong>Default:</strong> 1000 | <strong>Use:</strong> Increase for longer debugging sessions, decrease to save memory</div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Core Logging Methods */}
                <Card className="border-0 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                  <h4 className="font-semibold text-green-900 mb-3">Core Logging Methods</h4>
                  <div className="space-y-3 text-xs">
                    <div className="bg-white/50 rounded p-2">
                      <code className="text-green-700 font-mono">debug(message: string, data?: any)</code>
                      <div className="text-green-600 mt-1"><strong>Use:</strong> Detailed diagnostics, variable values, flow control</div>
                    </div>
                    <div className="bg-white/50 rounded p-2">
                      <code className="text-green-700 font-mono">info(message: string, data?: any)</code>
                      <div className="text-green-600 mt-1"><strong>Use:</strong> General application flow, user actions, system status</div>
                    </div>
                    <div className="bg-white/50 rounded p-2">
                      <code className="text-green-700 font-mono">warn(message: string, data?: any)</code>
                      <div className="text-green-600 mt-1"><strong>Use:</strong> Potential issues, deprecated usage, fallback scenarios</div>
                    </div>
                    <div className="bg-white/50 rounded p-2">
                      <code className="text-green-700 font-mono">error(message: string, data?: any)</code>
                      <div className="text-green-600 mt-1"><strong>Use:</strong> Actual errors, exceptions, failed operations</div>
                    </div>
                  </div>
                </Card>
                
                {/* Advanced Methods */}
                <Card className="border-0 bg-gradient-to-r from-purple-50 to-pink-50 p-4">
                  <h4 className="font-semibold text-purple-900 mb-3">Advanced Methods</h4>
                  <div className="space-y-2 text-xs">
                    <div className="bg-white/50 rounded p-2">
                      <code className="text-purple-700 font-mono">trace(message: string, data?: any)</code>
                      <div className="text-purple-600 mt-1"><strong>Use:</strong> Debug complex execution flows, capture stack traces automatically</div>
                    </div>
                    <div className="bg-white/50 rounded p-2">
                      <code className="text-purple-700 font-mono">withContext(context: string)</code>
                      <div className="text-purple-600 mt-1"><strong>Use:</strong> Group logs by module/component for easier filtering</div>
                    </div>
                    <div className="bg-white/50 rounded p-2">
                      <code className="text-purple-700 font-mono">startPerformanceTimer(label: string)</code>
                      <div className="text-purple-600 mt-1"><strong>Use:</strong> Begin measuring operation duration</div>
                    </div>
                    <div className="bg-white/50 rounded p-2">
                      <code className="text-purple-700 font-mono">endPerformanceTimer(label: string, message?: string)</code>
                      <div className="text-purple-600 mt-1"><strong>Use:</strong> End timer and log duration (requires enablePerformanceTracking)</div>
                    </div>
                  </div>
                </Card>

                {/* Data Retrieval Methods */}
                <Card className="border-0 bg-gradient-to-r from-orange-50 to-red-50 p-4">
                  <h4 className="font-semibold text-orange-900 mb-3">Data Retrieval & Analytics</h4>
                  <div className="space-y-2 text-xs">
                    <div className="bg-white/50 rounded p-2">
                      <code className="text-orange-700 font-mono">getAnalytics(): LogAnalytics</code>
                      <div className="text-orange-600 mt-1"><strong>Use:</strong> Monitor error rates, log frequency, application health</div>
                    </div>
                    <div className="bg-white/50 rounded p-2">
                      <code className="text-orange-700 font-mono">getLogHistory(): LogEntry[]</code>
                      <div className="text-orange-600 mt-1"><strong>Use:</strong> Review recent logs, export debugging sessions</div>
                    </div>
                    <div className="bg-white/50 rounded p-2">
                      <code className="text-orange-700 font-mono">searchLogs(criteria): LogEntry[]</code>
                      <div className="text-orange-600 mt-1"><strong>Use:</strong> Filter by level, context, message, or time range</div>
                    </div>
                    <div className="bg-white/50 rounded p-2">
                      <code className="text-orange-700 font-mono">exportLogs(): string</code>
                      <div className="text-orange-600 mt-1"><strong>Use:</strong> Export complete session as JSON for team sharing</div>
                    </div>
                    <div className="bg-white/50 rounded p-2">
                      <code className="text-orange-700 font-mono">clearHistory(): Logger</code>
                      <div className="text-orange-600 mt-1"><strong>Use:</strong> Clean up memory, start fresh debugging sessions</div>
                    </div>
                  </div>
                </Card>

                {/* Configuration Methods */}
                <Card className="border-0 bg-gradient-to-r from-teal-50 to-cyan-50 p-4">
                  <h4 className="font-semibold text-teal-900 mb-3">Runtime Configuration</h4>
                  <div className="space-y-2 text-xs">
                    <div className="bg-white/50 rounded p-2">
                      <code className="text-teal-700 font-mono">setLevel(level: LogLevel): Logger</code>
                      <div className="text-teal-600 mt-1"><strong>Use:</strong> Change minimum log level dynamically</div>
                    </div>
                    <div className="bg-white/50 rounded p-2">
                      <code className="text-teal-700 font-mono">enable(enabled: boolean): Logger</code>
                      <div className="text-teal-600 mt-1"><strong>Use:</strong> Enable/disable logging at runtime</div>
                    </div>
                    <div className="bg-white/50 rounded p-2">
                      <code className="text-teal-700 font-mono">onLog(callback: LogInterceptor): Logger</code>
                      <div className="text-teal-600 mt-1"><strong>Use:</strong> Integrate with external logging services, custom processing</div>
                    </div>
                  </div>
                </Card>

                {/* Usage Scenarios */}
                <Card className="border-0 bg-gradient-to-r from-gray-50 to-slate-50 p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Common Usage Patterns</h4>
                  <div className="space-y-3 text-xs">
                    <div className="bg-white rounded p-3 border border-gray-200">
                      <div className="font-medium text-gray-800 mb-2">Development Setup</div>
                      <div className="bg-gray-900 rounded p-2 mb-2">
                        <code className="text-green-400 font-mono text-xs">
                          {`const logger = new Logger({
  level: 'debug',
  useHumanReadableTimestamp: true,
  enablePerformanceTracking: true,
  logMemoryInline: true
});`}
                        </code>
                      </div>
                      <div className="text-gray-600">Full debugging with human-readable timestamps</div>
                    </div>
                    <div className="bg-white rounded p-3 border border-gray-200">
                      <div className="font-medium text-gray-800 mb-2">Production Setup</div>
                      <div className="bg-gray-900 rounded p-2 mb-2">
                        <code className="text-green-400 font-mono text-xs">
                          {`const logger = new Logger({
  level: 'warn',
  enableLogAnalytics: true,
  maxLogHistory: 500
});`}
                        </code>
                      </div>
                      <div className="text-gray-600">Warnings and errors only with analytics</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
          
          {/* Frameworks Tab */}
          {activeTab === 'frameworks' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Framework Integration</h3>
              
              <div className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <div className="w-6 h-6 bg-blue-500 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">R</div>
                    React with Advanced Features
                  </h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="font-mono text-xs text-green-400">
                      <code>{`// hooks/useAdvancedLogger.js
import { useMemo, useCallback } from 'react';
import Logger from 'weelog';

export function useAdvancedLogger(context, options = {}) {
  const logger = useMemo(() => {
    return new Logger({
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'warn',
      useTimestamp: true,
      enablePerformanceTracking: true,
      enableMemoryTracking: true,
      enableLogAnalytics: true,
      maxLogHistory: 500,
      ...options
    }).withContext(context);
  }, [context]);

  const trackApiCall = useCallback(async (apiName, apiCall) => {
    logger.startPerformanceTimer(apiName);
    try {
      const result = await apiCall();
      logger.endPerformanceTimer(apiName, \`\${apiName} completed\`);
      logger.info(\`API success: \${apiName}\`, { result });
      return result;
    } catch (error) {
      logger.error(\`API failed: \${apiName}\`, { error });
      throw error;
    }
  }, [logger]);

  return { logger, trackApiCall };
}

// Component usage
function UserDashboard({ userId }) {
  const { logger, trackApiCall } = useAdvancedLogger('Dashboard');
  
  useEffect(() => {
    trackApiCall('fetchUserData', () => 
      fetch(\`/api/users/\${userId}\`).then(r => r.json())
    );
  }, [userId, trackApiCall]);

  const analytics = logger.getAnalytics();
  console.log('Error rate:', analytics.errorRate);
}`}</code>
                    </pre>
                  </div>
                </Card>

                <Card className="border-0 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">N</div>
                    Node.js Server Monitoring
                  </h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="font-mono text-xs text-green-400">
                      <code>{`// server/logger.js
import Logger from 'weelog';

const serverLogger = new Logger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  useTimestamp: true,
  enablePerformanceTracking: true,
  enableMemoryTracking: true,
  enableLogAnalytics: true,
  logMemoryInline: true
});

// Middleware for request logging
export const requestLogger = (req, res, next) => {
  const requestId = Math.random().toString(36).substr(2, 9);
  const logger = serverLogger.withContext(\`Request-\${requestId}\`);
  
  logger.startPerformanceTimer('request');
  logger.info(\`\${req.method} \${req.path}\`, { 
    ip: req.ip, 
    userAgent: req.get('User-Agent') 
  });

  res.on('finish', () => {
    logger.endPerformanceTimer('request', 
      \`Request completed with status \${res.statusCode}\`);
    
    if (res.statusCode >= 400) {
      logger.error('Request failed', { 
        status: res.statusCode,
        path: req.path 
      });
    }
  });

  next();
};

// Export session data for monitoring
setInterval(() => {
  const analytics = serverLogger.getAnalytics();
  if (analytics.errorRate > 10) {
    console.log('High error rate detected:', analytics);
    // Alert system integration here
  }
}, 60000);`}</code>
                    </pre>
                  </div>
                </Card>

                <Card className="border-0 bg-gradient-to-r from-purple-50 to-pink-50 p-4">
                  <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                    <div className="w-6 h-6 bg-purple-500 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">V</div>
                    Vue.js Composition API
                  </h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="font-mono text-xs text-green-400">
                      <code>{`// composables/useLogger.js
import { ref, computed } from 'vue';
import Logger from 'weelog';

export function useLogger(context) {
  const logger = new Logger({
    level: import.meta.env.DEV ? 'debug' : 'warn',
    enablePerformanceTracking: true,
    enableMemoryTracking: true,
    enableLogAnalytics: true
  }).withContext(context);

  const analytics = ref(logger.getAnalytics());
  
  const updateAnalytics = () => {
    analytics.value = logger.getAnalytics();
  };

  const loggedErrors = computed(() => 
    logger.searchLogs({ level: 'error' })
  );

  return {
    logger,
    analytics: readonly(analytics),
    loggedErrors,
    updateAnalytics
  };
}

// Component usage
export default {
  setup() {
    const { logger, analytics } = useLogger('ProductList');
    
    const fetchProducts = async () => {
      logger.startPerformanceTimer('fetch-products');
      try {
        const products = await api.getProducts();
        logger.endPerformanceTimer('fetch-products', 'Products loaded');
        return products;
      } catch (error) {
        logger.error('Failed to fetch products', { error });
        throw error;
      }
    };

    return { fetchProducts, analytics };
  }
};`}</code>
                    </pre>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}