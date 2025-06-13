import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

type SectionKeys = 'whatItDoes' | 'howItWorks' | 'useCases';

export function FeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<SectionKeys, boolean>>({
    whatItDoes: false,
    howItWorks: false,
    useCases: false
  });

  const toggleSection = (section: SectionKeys) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const features = [
    {
      title: "⚡ Performance Tracking",
      description: "Measures and logs execution time for operations, functions, or code blocks with microsecond precision. Uses performance.now() for high-resolution timing without external dependencies.",
      whatItDoes: "Measures operation execution times with microsecond precision",
      howItWorks: "Uses performance.now() and Map-based label storage for high-resolution timing",
      useCases: [
        "API Response Times - Measure external service call durations",
        "Database Queries - Track slow query performance in production", 
        "Algorithm Optimization - Compare different implementation speeds",
        "Bottleneck Identification - Find performance issues in complex workflows"
      ],
      code: `logger.startPerformanceTimer('api-call');
// Your code here
await fetchUserData();
logger.endPerformanceTimer('api-call', 'User data retrieved');
// Output: [INFO] User data retrieved (45.2ms)`,
      highlight: "Identify performance bottlenecks instantly"
    },
    {
      title: "🧠 Memory Monitoring", 
      description: "Tracks real-time heap memory usage in both Node.js and browser environments. Provides memory consumption analytics and optional inline display in log entries.",
      whatItDoes: "Tracks real-time heap usage in browsers and Node.js environments",
      howItWorks: "Uses performance.memory (browser) and process.memoryUsage() (Node.js) with formatted MB display",
      useCases: [
        "Memory Leak Detection - Monitor memory growth over time",
        "Resource Optimization - Track memory usage during heavy operations",
        "Production Monitoring - Watch for memory spikes in live applications",
        "Capacity Planning - Understand application memory requirements"
      ],
      code: `const logger = new Logger({
  enableMemoryTracking: true,
  logMemoryInline: true  // Shows memory in each log
});

logger.info('Processing large dataset');
// Output: [INFO] Processing large dataset (Memory: 45.7 MB)`,
      highlight: "Detect memory leaks before they impact users"
    },
    {
      title: "📊 Live Analytics",
      description: "Provides real-time insights into logging patterns, error rates, and application behavior. Automatically collects and analyzes log data to reveal trends and issues.",
      whatItDoes: "Real-time insights into logging patterns and error rates",
      howItWorks: "Maintains running counters and calculates statistics automatically with each log entry",
      useCases: [
        "Health Monitoring - Track application stability in real-time",
        "Error Rate Alerts - Identify when error rates exceed thresholds",
        "Component Analysis - See which parts of your app are most active", 
        "Production Dashboards - Display live application health metrics"
      ],
      code: `const analytics = logger.getAnalytics();
console.log(analytics);
// {
//   totalLogs: 247,
//   errorRate: 8.5,
//   logsByLevel: { debug: 45, info: 156, warn: 31, error: 15 },
//   topContexts: [
//     { context: "API", count: 89 },
//     { context: "Database", count: 67 }
//   ]
// }`,
      highlight: "Monitor application health with real-time metrics"
    },
    {
      title: "🔍 Smart Log Search",
      description: "Enables powerful filtering and querying across complete log history using multiple criteria. Search by level, context, message content, and time ranges with instant results.",
      whatItDoes: "Powerful filtering across complete log history using multiple criteria",
      howItWorks: "In-memory array filtering with AND logic for instant search results",
      useCases: [
        "Bug Investigation - Find all logs related to specific errors or components",
        "Troubleshooting - Search for patterns around the time issues occurred",
        "Performance Analysis - Filter logs by context to study component behavior",
        "Compliance Audits - Search for specific events or user actions"
      ],
      code: `// Find all error logs
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
const connections = logger.searchLogs({ message: 'connection' });`,
      highlight: "Find critical issues faster with intelligent search"
    },
    {
      title: "📋 Stack Trace Capture",
      description: "Automatically captures and stores complete call stack information when logging critical events. Provides exact code location and execution path for debugging.",
      whatItDoes: "Automatic call stack capture using JavaScript's Error object",
      howItWorks: "Preserves execution context and file locations in both browser and Node.js",
      useCases: [
        "Complex Debugging - Track execution flow through multiple function calls",
        "Error Investigation - Understand exactly where and how errors occur",
        "Code Path Analysis - Verify correct execution routes in complex logic",
        "Production Debugging - Capture critical checkpoints for later analysis"
      ],
      code: `logger.trace('Checkpoint reached in user validation', {
  userId: 12345,
  validationStep: 'email_verification'
});
// Captures and logs complete stack trace with context data

// Automatic stack traces help identify:
// - Exact function call sequence
// - File locations and line numbers  
// - Execution context and variables`,
      highlight: "Debug complex issues with complete execution context"
    },
    {
      title: "💾 Export & Session Tracking",
      description: "Maintains complete debugging sessions with unique identifiers and provides JSON export of all log data, analytics, and metadata for sharing and analysis.",
      whatItDoes: "Complete session management with unique IDs and JSON export capability",
      howItWorks: "Maintains full log history with analytics and metadata, exports comprehensive JSON",
      useCases: [
        "Team Collaboration - Share complete debugging sessions with colleagues",
        "Bug Reports - Attach comprehensive log data to issue tickets",
        "Production Issues - Export critical sessions for offline analysis",
        "Compliance Records - Generate audit trails with complete traceability"
      ],
      code: `const logger = new Logger({ enableLogAnalytics: true });

// ... application runs, logs events ...

// Export complete session
const sessionData = logger.exportLogs();
const parsed = JSON.parse(sessionData);

console.log(\`Session: \${parsed.sessionId}\`);
console.log(\`Total logs: \${parsed.logs.length}\`);

// Save for sharing or analysis
fs.writeFileSync(\`debug-session-\${parsed.sessionId}.json\`, sessionData);`,
      highlight: "Share complete debugging sessions across teams"
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

          {/* Detailed Feature Information */}
          <div className="lg:sticky lg:top-24 space-y-4">
            {/* Code Preview Card */}
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
            </Card>

            {/* Detailed Information Card */}
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Feature Details</h4>
              
              {/* What It Does */}
              <div className="mb-4">
                <button
                  onClick={() => toggleSection('whatItDoes')}
                  className="flex items-center justify-between w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-900">What It Does</span>
                  {expandedSections.whatItDoes ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {expandedSections.whatItDoes && (
                  <div className="mt-3 p-3 bg-white border rounded-lg">
                    <p className="text-sm text-gray-700">{features[activeFeature].whatItDoes}</p>
                  </div>
                )}
              </div>

              {/* How It Works */}
              <div className="mb-4">
                <button
                  onClick={() => toggleSection('howItWorks')}
                  className="flex items-center justify-between w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-900">How It Works</span>
                  {expandedSections.howItWorks ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {expandedSections.howItWorks && (
                  <div className="mt-3 p-3 bg-white border rounded-lg">
                    <p className="text-sm text-gray-700">{features[activeFeature].howItWorks}</p>
                  </div>
                )}
              </div>

              {/* Use Cases */}
              <div className="mb-4">
                <button
                  onClick={() => toggleSection('useCases')}
                  className="flex items-center justify-between w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-900">When to Use</span>
                  {expandedSections.useCases ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {expandedSections.useCases && (
                  <div className="mt-3 p-3 bg-white border rounded-lg">
                    <ul className="text-sm text-gray-700 space-y-2">
                      {features[activeFeature].useCases.map((useCase, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="text-center">
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