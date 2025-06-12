import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function FeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "⚡ Performance Tracking",
      description: "Built-in performance timers to measure operation durations automatically",
      code: `logger.startPerformanceTimer('database-query');
// Your async operation
await fetchUserData();
logger.endPerformanceTimer('database-query');
// Automatically logs duration with context`,
      highlight: "Measure code execution time effortlessly"
    },
    {
      title: "🧠 Memory Monitoring", 
      description: "Real-time memory usage tracking for both browser and Node.js environments",
      code: `const logger = new Logger({
  enableMemoryTracking: true
});

logger.info('Process started');
// Automatically includes memory usage data
// Works in both browser and Node.js`,
      highlight: "Monitor memory consumption in real-time"
    },
    {
      title: "📊 Live Analytics",
      description: "Get insights into logging patterns, error rates, and context usage",
      code: `const analytics = logger.getAnalytics();
console.log(analytics);
// Returns:
// {
//   totalLogs: 150,
//   errorRate: 2.3,
//   logsByLevel: { info: 120, error: 30 },
//   topContexts: [{ context: 'API', count: 45 }]
// }`,
      highlight: "Real-time logging analytics and metrics"
    },
    {
      title: "🔍 Smart Log Search",
      description: "Advanced filtering and search capabilities across your log history",
      code: `// Search logs with multiple criteria
const results = logger.searchLogs({
  level: 'error',
  context: 'Authentication',
  message: 'failed login',
  timeRange: { 
    start: new Date('2024-01-01'), 
    end: new Date() 
  }
});`,
      highlight: "Find specific logs with powerful search filters"
    },
    {
      title: "📋 Stack Trace Capture",
      description: "Automatically capture and include stack traces for debugging",
      code: `// Automatic stack trace with debug info
logger.trace('Debug checkpoint reached');

// Manual error with full context
try {
  riskyOperation();
} catch (error) {
  logger.error('Operation failed', { 
    error: error.message,
    stack: error.stack 
  });
}`,
      highlight: "Capture execution context automatically"
    },
    {
      title: "💾 Export & Session Tracking",
      description: "Export logs as JSON with session tracking for debugging across sessions",
      code: `// Export complete session data
const exportData = logger.exportLogs();
// Downloads JSON file with:
// - Session ID
// - Complete log history  
// - Analytics data
// - Timestamps and metadata

// Each log includes session tracking
logger.info('User action', { userId: 123 });
// Automatically tagged with session ID`,
      highlight: "Export complete debugging sessions"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Unique Features That Set WeeLog Apart
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Go beyond basic logging with advanced features designed for modern JavaScript applications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Feature Navigation */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`p-4 cursor-pointer transition-all duration-200 ${
                  activeFeature === index
                    ? 'border-blue-500 shadow-lg bg-blue-50'
                    : 'hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {feature.description}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {feature.highlight}
                    </Badge>
                  </div>
                  <div className={`ml-4 w-3 h-3 rounded-full ${
                    activeFeature === index ? 'bg-blue-500' : 'bg-gray-300'
                  }`} />
                </div>
              </Card>
            ))}
          </div>

          {/* Code Preview */}
          <div className="lg:sticky lg:top-24">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  {features[activeFeature].title}
                </h3>
                <Badge className="bg-blue-100 text-blue-800">
                  Demo Code
                </Badge>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                  <code>{features[activeFeature].code}</code>
                </pre>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="text-sm text-blue-800">
                  <strong>Key Benefit:</strong> {features[activeFeature].highlight}
                </p>
              </div>

              <div className="mt-6 text-center">
                <Button 
                  onClick={() => window.open('https://www.npmjs.com/package/weelog', '_blank')}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Try WeeLog Now
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">6+</div>
            <div className="text-sm text-gray-600">Advanced Features</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">0ms</div>
            <div className="text-sm text-gray-600">Performance Overhead</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-sm text-gray-600">TypeScript Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">2</div>
            <div className="text-sm text-gray-600">Environments Supported</div>
          </div>
        </div>
      </div>
    </section>
  );
}