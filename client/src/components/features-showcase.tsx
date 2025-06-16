import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Play, Zap, Brain, BarChart3, Search, FileStack, Download } from "lucide-react";

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
      title: "Performance Tracking",
      icon: Zap,
      gradient: "from-yellow-400 to-orange-500",
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
      highlight: "Identify performance bottlenecks instantly",
      stats: "45.2ms avg response"
    },
    {
      title: "Memory Monitoring", 
      icon: Brain,
      gradient: "from-purple-400 to-pink-500",
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
      highlight: "Detect memory leaks before they impact users",
      stats: "45.7 MB tracked"
    },
    {
      title: "Live Analytics",
      icon: BarChart3,
      gradient: "from-blue-400 to-cyan-500",
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
      highlight: "Monitor application health with real-time metrics",
      stats: "8.5% error rate"
    },
    {
      title: "Smart Log Search",
      icon: Search,
      gradient: "from-green-400 to-emerald-500",
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
      highlight: "Find critical issues faster with intelligent search",
      stats: "1000+ logs searched"
    },
    {
      title: "Stack Trace Capture",
      icon: FileStack,
      gradient: "from-red-400 to-rose-500",
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
      highlight: "Debug complex issues with complete execution context",
      stats: "Full stack captured"
    },
    {
      title: "Export & Session Tracking",
      icon: Download,
      gradient: "from-indigo-400 to-purple-500",
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
      highlight: "Share complete debugging sessions across teams",
      stats: "JSON export ready"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Advanced Logging Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience powerful debugging capabilities that transform how you monitor and optimize your JavaScript applications
          </p>
        </div>

        {/* Left-Right Layout: Compact Cards on Left, Code on Right */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          
          {/* Left Side: Compact Feature Cards */}
          <div className="lg:col-span-2 space-y-3">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-200 h-24 ${
                    activeFeature === index
                      ? 'ring-2 ring-blue-500 shadow-lg scale-[1.02]'
                      : 'hover:shadow-md hover:scale-[1.01]'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="p-4 h-full flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.gradient} text-white shadow-md flex-shrink-0`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 truncate">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {feature.stats}
                      </p>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs bg-gradient-to-r ${feature.gradient} text-white border-0 mt-1`}
                      >
                        Key Feature
                      </Badge>
                    </div>
                  </div>
                  {activeFeature === index && (
                    <div className={`h-1 bg-gradient-to-r ${feature.gradient}`} />
                  )}
                </Card>
              );
            })}
          </div>

          {/* Right Side: Expanded Code Example */}
          <div className="lg:col-span-3 lg:sticky lg:top-8">
            <Card className="overflow-hidden border-0 shadow-2xl min-h-[600px]">
              <div className={`bg-gradient-to-r ${features[activeFeature].gradient} p-1`}>
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${features[activeFeature].gradient} text-white shadow-lg`}>
                      {(() => {
                        const IconComponent = features[activeFeature].icon;
                        return <IconComponent className="w-7 h-7" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{features[activeFeature].title}</h3>
                      <p className="text-sm text-gray-500 font-medium">{features[activeFeature].stats}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {features[activeFeature].description}
                    </p>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-5 mb-6 min-h-[300px]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-gray-400 text-xs ml-2">example.js</span>
                    </div>
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                      <code>{features[activeFeature].code}</code>
                    </pre>
                  </div>
                  
                  <div className={`bg-gradient-to-r ${features[activeFeature].gradient} bg-opacity-10 border-l-4 border-opacity-50 p-4 rounded-r-lg mb-4`}>
                    <p className="font-semibold text-gray-800 text-sm">
                      💡 {features[activeFeature].highlight}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 text-sm mb-2">What it does:</h4>
                      <p className="text-gray-700 text-sm">{features[activeFeature].whatItDoes}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 text-sm mb-2">How it works:</h4>
                      <p className="text-gray-700 text-sm">{features[activeFeature].howItWorks}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button 
            onClick={() => window.open('https://www.npmjs.com/package/weelog', '_blank')}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-8 py-3"
          >
            Get Started with WeeLog
          </Button>
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