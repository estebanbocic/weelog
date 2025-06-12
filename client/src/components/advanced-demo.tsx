import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logger from "@/lib/weelog";

interface AdvancedLogEntry {
  level: string;
  message: string;
  timestamp: Date;
  performance?: any;
  memory?: any;
  sessionId?: string;
  context?: string;
}

export function AdvancedDemo() {
  const [logs, setLogs] = useState<AdvancedLogEntry[]>([]);
  const [analytics, setAnalytics] = useState<any>({});
  const loggerRef = useRef<any>();

  useEffect(() => {
    // Create advanced logger with all features enabled
    const logger = new Logger({
      level: 'debug',
      enabled: true,
      useTimestamp: true,
      enablePerformanceTracking: true,
      enableMemoryTracking: true,
      maxLogHistory: 100,
      enableLogAnalytics: true
    });

    logger.onLog((level, message, context, data) => {
      const entry = {
        level,
        message,
        timestamp: new Date(),
        context,
        data
      };
      setLogs(prev => [...prev.slice(-19), entry]);
    });

    loggerRef.current = logger;
  }, []);

  const demoPerformanceTracking = () => {
    const logger = loggerRef.current;
    logger.startPerformanceTimer('api-call');
    
    // Simulate API call
    setTimeout(() => {
      logger.endPerformanceTimer('api-call', 'User data fetched successfully');
    }, Math.random() * 2000 + 500);
  };

  const demoMemoryTracking = () => {
    const logger = loggerRef.current;
    logger.info('Memory usage snapshot', { 
      feature: 'memory-tracking',
      timestamp: Date.now()
    });
  };

  const demoStackTrace = () => {
    const logger = loggerRef.current;
    logger.trace('Debug trace with stack information');
  };

  const demoAnalytics = () => {
    const logger = loggerRef.current;
    if (logger.getAnalytics) {
      setAnalytics(logger.getAnalytics());
    }
  };

  const demoLogSearch = () => {
    const logger = loggerRef.current;
    logger.withContext('Search').info('Testing log search functionality');
    logger.withContext('API').warn('Search filters applied');
  };

  const exportLogs = () => {
    const logger = loggerRef.current;
    if (logger.exportLogs) {
      const exported = logger.exportLogs();
      const blob = new Blob([exported], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'weelog-export.json';
      a.click();
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">🚀 Advanced WeeLog Features</h3>
      
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">⚡ Performance Tracking</h4>
            <p className="text-sm text-gray-600 mb-3">
              Automatically track operation durations with start/end timers
            </p>
            <Button onClick={demoPerformanceTracking} className="mb-3">
              Demo Performance Timer
            </Button>
            <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
              <div className="text-green-600">logger.startPerformanceTimer('api-call')</div>
              <div className="text-gray-500">// ... your async operation</div>
              <div className="text-green-600">logger.endPerformanceTimer('api-call')</div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="memory" className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">🧠 Memory Monitoring</h4>
            <p className="text-sm text-gray-600 mb-3">
              Track memory usage in both browser and Node.js environments
            </p>
            <Button onClick={demoMemoryTracking} className="mb-3">
              Check Memory Usage
            </Button>
            <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
              <div className="text-blue-600">logger.info('Process started', data)</div>
              <div className="text-gray-500">// Automatically includes memory info</div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">📊 Real-time Analytics</h4>
            <p className="text-sm text-gray-600 mb-3">
              Get insights into your application's logging patterns
            </p>
            <div className="flex gap-2 mb-3">
              <Button onClick={demoLogSearch}>Generate Sample Logs</Button>
              <Button onClick={demoAnalytics} variant="outline">View Analytics</Button>
            </div>
            
            {Object.keys(analytics).length > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Total Logs:</span> {analytics.totalLogs}
                  </div>
                  <div>
                    <span className="font-medium">Error Rate:</span> {analytics.errorRate?.toFixed(1)}%
                  </div>
                </div>
                <div className="mt-2">
                  <span className="font-medium">By Level:</span>
                  <div className="flex gap-2 mt-1">
                    {Object.entries(analytics.logsByLevel || {}).map(([level, count]) => (
                      <Badge key={level} variant="secondary">
                        {level}: {count as number}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="export" className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">💾 Log Export & Search</h4>
            <p className="text-sm text-gray-600 mb-3">
              Export logs as JSON or search through history with filters
            </p>
            <div className="flex gap-2 mb-3">
              <Button onClick={demoStackTrace}>Add Trace Log</Button>
              <Button onClick={exportLogs} variant="outline">Export Logs</Button>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
              <div className="text-purple-600">logger.searchLogs({`{`}</div>
              <div className="text-purple-600 ml-4">level: 'error',</div>
              <div className="text-purple-600 ml-4">context: 'API',</div>
              <div className="text-purple-600 ml-4">timeRange: {`{ start, end }`}</div>
              <div className="text-purple-600">{`})`}</div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6">
        <h4 className="font-semibold mb-2">Live Log Stream</h4>
        <div className="bg-gray-900 text-green-400 p-3 rounded-lg h-32 overflow-y-auto font-mono text-xs">
          {logs.map((log, i) => (
            <div key={i} className="mb-1">
              <span className="text-blue-400">[{log.timestamp.toLocaleTimeString()}]</span>
              <span className={`ml-2 ${
                log.level === 'error' ? 'text-red-400' : 
                log.level === 'warn' ? 'text-yellow-400' : 'text-green-400'
              }`}>
                [{log.level.toUpperCase()}]
              </span>
              {log.context && <span className="text-purple-400 ml-1">[{log.context}]</span>}
              <span className="ml-2">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}