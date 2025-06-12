import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Logger, { LogLevel, LogEntry } from "@/lib/weelog";

interface DemoLogEntry {
  id: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: any;
  timestamp: Date;
  formatted: string;
}

export function DemoSection() {
  const [logLevel, setLogLevel] = useState<LogLevel>('info');
  const [enableLogger, setEnableLogger] = useState(true);
  const [useTimestamp, setUseTimestamp] = useState(true);
  const [logMessage, setLogMessage] = useState('Hello from WeeLog!');
  const [logContext, setLogContext] = useState('');
  const [logEntries, setLogEntries] = useState<DemoLogEntry[]>([]);
  const [consoleEntries, setConsoleEntries] = useState<DemoLogEntry[]>([]);
  
  const loggerRef = useRef<Logger>();

  useEffect(() => {
    // Initialize logger
    const logger = new Logger({
      level: logLevel,
      enabled: enableLogger,
      useTimestamp: useTimestamp
    });

    // Add interceptor for demo display
    logger.onLog((level, message, context, data) => {
      const entry: DemoLogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        level,
        message,
        context,
        data,
        timestamp: new Date(),
        formatted: `${useTimestamp ? `[${new Date().toISOString()}] ` : ''}[${level.toUpperCase()}]${context ? ` [${context}]` : ''} ${message}${data ? ` ${JSON.stringify(data)}` : ''}`
      };
      
      setLogEntries(prev => [...prev.slice(-49), entry]);
      setConsoleEntries(prev => [...prev.slice(-29), entry]);
    });

    loggerRef.current = logger;

    // Welcome message
    setTimeout(() => {
      logger.info('Welcome to WeeLog demo!', { version: '1.0.0' });
      logger.withContext('Demo').debug('Logger initialized successfully');
    }, 500);
  }, [logLevel, enableLogger, useTimestamp]);

  const testLog = (level: LogLevel) => {
    if (!loggerRef.current) return;
    
    const message = logMessage || 'Test message';
    const testData = { 
      timestamp: Date.now(), 
      random: Math.floor(Math.random() * 1000) 
    };
    
    if (logContext.trim()) {
      loggerRef.current.withContext(logContext.trim())[level](message, testData);
    } else {
      loggerRef.current[level](message, testData);
    }
  };

  const clearLogs = () => {
    setLogEntries([]);
    setConsoleEntries([]);
  };

  const getLevelColor = (level: LogLevel) => {
    const colors = {
      debug: 'text-gray-400',
      info: 'text-blue-400',
      warn: 'text-yellow-400',
      error: 'text-red-400'
    };
    return colors[level];
  };

  const getLevelBgColor = (level: LogLevel) => {
    const colors = {
      debug: 'bg-gray-500 hover:bg-gray-600',
      info: 'bg-blue-500 hover:bg-blue-600',
      warn: 'bg-amber-500 hover:bg-amber-600',
      error: 'bg-red-500 hover:bg-red-600'
    };
    return colors[level];
  };

  return (
    <div id="demo" className="lg:col-span-8 mb-12 lg:mb-0">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Interactive Demo</h3>
          <p className="text-sm text-gray-600 mt-1">Test all WeeLog features in real-time</p>
        </div>
        
        {/* Demo Controls */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logger Configuration */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Logger Configuration</h4>
              
              <div>
                <Label htmlFor="logLevel" className="block text-sm font-medium text-gray-700 mb-2">
                  Log Level
                </Label>
                <Select value={logLevel} onValueChange={(value) => setLogLevel(value as LogLevel)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warn">Warn</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="enableLogger" 
                    checked={enableLogger} 
                    onCheckedChange={setEnableLogger}
                  />
                  <Label htmlFor="enableLogger" className="text-sm text-gray-700">
                    Enable Logging
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="useTimestamp" 
                    checked={useTimestamp} 
                    onCheckedChange={setUseTimestamp}
                  />
                  <Label htmlFor="useTimestamp" className="text-sm text-gray-700">
                    Use Timestamp
                  </Label>
                </div>
              </div>
            </div>
            
            {/* Test Message */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Test Message</h4>
              
              <div>
                <Label htmlFor="logMessage" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </Label>
                <Input
                  id="logMessage"
                  value={logMessage}
                  onChange={(e) => setLogMessage(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="logContext" className="block text-sm font-medium text-gray-700 mb-2">
                  Context (optional)
                </Label>
                <Input
                  id="logContext"
                  value={logContext}
                  onChange={(e) => setLogContext(e.target.value)}
                  placeholder="e.g., Auth, API, UserService"
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={() => testLog('debug')}
              className={`text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors ${getLevelBgColor('debug')}`}
            >
              Debug Log
            </Button>
            <Button
              onClick={() => testLog('info')}
              className={`text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors ${getLevelBgColor('info')}`}
            >
              Info Log
            </Button>
            <Button
              onClick={() => testLog('warn')}
              className={`text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors ${getLevelBgColor('warn')}`}
            >
              Warn Log
            </Button>
            <Button
              onClick={() => testLog('error')}
              className={`text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors ${getLevelBgColor('error')}`}
            >
              Error Log
            </Button>
            <Button
              variant="outline"
              onClick={clearLogs}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Clear Logs
            </Button>
          </div>
        </div>
        
        {/* Log Output */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-gray-900">Live Log Output</h4>
            <span className="text-xs text-gray-500">Real-time logging demonstration</span>
          </div>
          <div className="bg-gray-900 rounded-lg h-64 overflow-y-auto p-4 font-mono text-sm">
            {logEntries.length === 0 ? (
              <div className="text-gray-400">Logs will appear here when you test the logger...</div>
            ) : (
              logEntries.map((entry) => (
                <div key={entry.id} className={`${getLevelColor(entry.level)} mb-1`}>
                  <span className="text-gray-500">
                    [{entry.timestamp.toLocaleTimeString()}]
                  </span>{' '}
                  <span className="font-medium">[{entry.level.toUpperCase()}]</span>
                  {entry.context && <span> [{entry.context}]</span>} {entry.message}
                  {entry.data && <span> {JSON.stringify(entry.data)}</span>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Console Output Simulation */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Browser Console Output</h3>
          <p className="text-sm text-gray-600 mt-1">How logs appear in your browser's developer console</p>
        </div>
        <div className="p-6">
          <div className="bg-gray-900 rounded-lg h-48 overflow-y-auto p-4 font-mono text-sm">
            {consoleEntries.length === 0 ? (
              <div className="text-gray-400">Console output will be simulated here...</div>
            ) : (
              consoleEntries.map((entry) => (
                <div key={entry.id + '-console'} className={`${getLevelColor(entry.level)} mb-1`}>
                  ▸ <span className="font-medium">{entry.level}</span>: 
                  {entry.context && <span> [{entry.context}]</span>} {entry.message}
                  {entry.data && <span> {JSON.stringify(entry.data)}</span>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
