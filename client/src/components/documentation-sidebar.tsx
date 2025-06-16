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
                  <Badge className="ml-2 bg-green-100 text-green-800 text-xs">v2.1.0</Badge>
                </div>
                <p className="text-sm text-green-700">
                  Professional logging library with advanced debugging capabilities for modern JavaScript applications.
                </p>
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
error('Database connection failed');`}</code>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Methods & Configuration</h3>
              
              <div className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Logger Constructor</h4>
                  <div className="bg-gray-900 rounded-lg p-3 mb-3">
                    <code className="font-mono text-sm text-green-400">new Logger(options?: LoggerOptions)</code>
                  </div>
                  <div className="text-sm text-blue-800">
                    <div className="font-medium mb-2">Advanced Options:</div>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="bg-white/50 rounded p-2">
                        <code className="text-blue-700">enablePerformanceTracking: boolean</code>
                        <div className="text-blue-600 mt-1">Track execution times automatically</div>
                      </div>
                      <div className="bg-white/50 rounded p-2">
                        <code className="text-blue-700">enableMemoryTracking: boolean</code>
                        <div className="text-blue-600 mt-1">Monitor heap memory usage</div>
                      </div>
                      <div className="bg-white/50 rounded p-2">
                        <code className="text-blue-700">enableLogAnalytics: boolean</code>
                        <div className="text-blue-600 mt-1">Collect logging statistics</div>
                      </div>
                      <div className="bg-white/50 rounded p-2">
                        <code className="text-blue-700">maxLogHistory: number</code>
                        <div className="text-blue-600 mt-1">Maximum logs to keep in memory</div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="border-0 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                  <h4 className="font-semibold text-green-900 mb-3">Advanced Methods</h4>
                  <div className="space-y-3">
                    <div className="bg-white/50 rounded p-3">
                      <div className="bg-gray-900 rounded p-2 mb-2">
                        <code className="font-mono text-xs text-green-400">logger.trace(message, data)</code>
                      </div>
                      <p className="text-xs text-green-700">Captures complete stack trace for debugging</p>
                    </div>
                    <div className="bg-white/50 rounded p-3">
                      <div className="bg-gray-900 rounded p-2 mb-2">
                        <code className="font-mono text-xs text-green-400">logger.startPerformanceTimer(label)</code>
                      </div>
                      <p className="text-xs text-green-700">Begin tracking execution time for operations</p>
                    </div>
                    <div className="bg-white/50 rounded p-3">
                      <div className="bg-gray-900 rounded p-2 mb-2">
                        <code className="font-mono text-xs text-green-400">logger.getAnalytics()</code>
                      </div>
                      <p className="text-xs text-green-700">Get real-time logging statistics and error rates</p>
                    </div>
                    <div className="bg-white/50 rounded p-3">
                      <div className="bg-gray-900 rounded p-2 mb-2">
                        <code className="font-mono text-xs text-green-400">logger.searchLogs(criteria)</code>
                      </div>
                      <p className="text-xs text-green-700">Filter log history by level, context, or time range</p>
                    </div>
                    <div className="bg-white/50 rounded p-3">
                      <div className="bg-gray-900 rounded p-2 mb-2">
                        <code className="font-mono text-xs text-green-400">logger.exportLogs()</code>
                      </div>
                      <p className="text-xs text-green-700">Export complete session as JSON for sharing</p>
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