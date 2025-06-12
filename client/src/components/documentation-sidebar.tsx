import { useState } from "react";
import { Button } from "@/components/ui/button";

type TabType = 'getting-started' | 'api' | 'frameworks';

export function DocumentationSidebar() {
  const [activeTab, setActiveTab] = useState<TabType>('getting-started');

  const switchTab = (tab: TabType) => {
    setActiveTab(tab);
  };

  const getTabClasses = (tab: TabType) => {
    return activeTab === tab
      ? "flex-1 px-4 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600 bg-blue-50"
      : "flex-1 px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900";
  };

  return (
    <div id="documentation" className="lg:col-span-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => switchTab('getting-started')}
            className={getTabClasses('getting-started')}
          >
            Getting Started
          </button>
          <button
            onClick={() => switchTab('api')}
            className={getTabClasses('api')}
          >
            API Reference
          </button>
          <button
            onClick={() => switchTab('frameworks')}
            className={getTabClasses('frameworks')}
          >
            Frameworks
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="h-96 overflow-y-auto overflow-x-hidden">
          {/* Getting Started Tab */}
          {activeTab === 'getting-started' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Getting Started</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Installation</h4>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <code className="font-mono text-sm text-gray-800">npm install weelog</code>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Basic Usage</h4>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <pre className="font-mono text-sm text-gray-800">
                      <code>{`import Logger from 'weelog';

const logger = new Logger();

logger.info('Hello WeeLog!');
logger.warn('This is a warning');
logger.error('Something went wrong');`}</code>
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Configuration</h4>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <pre className="font-mono text-sm text-gray-800">
                      <code>{`const logger = new Logger({
  level: 'info',
  enabled: true,
  useTimestamp: true
});`}</code>
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Zero dependencies
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Browser & Node.js compatible
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Configurable log levels
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Context support
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Interceptor callbacks
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Colorized console output
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* API Reference Tab */}
          {activeTab === 'api' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">API Reference</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Constructor</h4>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <code className="font-mono text-sm text-gray-800">new Logger(options?)</code>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <p className="mb-2"><strong>Parameters:</strong></p>
                    <ul className="space-y-1 ml-4">
                      <li>• <code>level</code>: 'debug' | 'info' | 'warn' | 'error' (default: 'info')</li>
                      <li>• <code>enabled</code>: boolean (default: true)</li>
                      <li>• <code>useTimestamp</code>: boolean (default: false)</li>
                    </ul>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 mt-3">
                    <pre className="font-mono text-sm text-gray-800">
                      <code>{`const logger = new Logger({
  level: 'debug',
  enabled: true,
  useTimestamp: true
});`}</code>
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Logging Methods</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <code className="font-mono text-sm text-gray-800">logger.debug(message: string, data?: any)</code>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Logs debug information. Only shown when level is 'debug'.</p>
                    </div>
                    <div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <code className="font-mono text-sm text-gray-800">logger.info(message: string, data?: any)</code>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Logs general information. Shown when level is 'debug' or 'info'.</p>
                    </div>
                    <div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <code className="font-mono text-sm text-gray-800">logger.warn(message: string, data?: any)</code>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Logs warnings. Shown when level is 'debug', 'info', or 'warn'.</p>
                    </div>
                    <div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <code className="font-mono text-sm text-gray-800">logger.error(message: string, data?: any)</code>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Logs errors. Always shown regardless of level.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Control Methods</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <code className="font-mono text-sm text-gray-800">logger.setLevel(level: LogLevel)</code>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Changes the minimum log level. Returns the logger instance for chaining.</p>
                    </div>
                    <div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <code className="font-mono text-sm text-gray-800">logger.enable(enabled: boolean)</code>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Enables or disables all logging. Returns the logger instance for chaining.</p>
                    </div>
                    <div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <code className="font-mono text-sm text-gray-800">logger.withContext(context: string)</code>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Creates a new logger instance with the specified context prefix.</p>
                    </div>
                    <div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <code className="font-mono text-sm text-gray-800">logger.onLog(callback: LogInterceptor)</code>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Adds an interceptor function called for every log entry. Returns the logger instance.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Advanced Usage Examples</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Context Logging</p>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <pre className="font-mono text-sm text-gray-800">
                          <code>{`const apiLogger = logger.withContext('API');
apiLogger.info('Request started', { url: '/users' });
// Output: [INFO] [API] Request started {"url":"/users"}`}</code>
                        </pre>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Log Interception</p>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <pre className="font-mono text-sm text-gray-800">
                          <code>{`logger.onLog((level, message, context, data) => {
  // Send to analytics, save to file, etc.
  analytics.track('log_event', {
    level, message, context, data
  });
});`}</code>
                        </pre>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Method Chaining</p>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <pre className="font-mono text-sm text-gray-800">
                          <code>{`const prodLogger = new Logger()
  .setLevel('warn')
  .enable(process.env.NODE_ENV !== 'test')
  .withContext('Production');`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Frameworks Tab */}
          {activeTab === 'frameworks' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Framework Integration</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <span className="w-5 h-5 bg-blue-500 rounded mr-2 flex items-center justify-center text-white text-xs font-bold">R</span>
                    React Integration
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Custom Hook for React Components</p>
                      <div className="bg-gray-100 rounded-lg p-3 overflow-x-auto">
                        <pre className="font-mono text-xs text-gray-800 whitespace-pre-wrap break-words">
                          <code>{`// hooks/useLogger.js
import { useMemo } from 'react';
import Logger from 'weelog';

export function useLogger(context, options = {}) {
  return useMemo(() => {
    const logger = new Logger({
      level: process.env.NODE_ENV === 'development' 
        ? 'debug' : 'warn',
      useTimestamp: true,
      ...options
    });
    return context 
      ? logger.withContext(context) 
      : logger;
  }, [context, options]);
}

// Usage in component
function UserProfile({ userId }) {
  const logger = useLogger('UserProfile');
  
  useEffect(() => {
    logger.info('Loading user profile', { userId });
    fetchUser(userId)
      .then(user => logger.debug('User loaded', user))
      .catch(err => logger.error('Failed to load user', err));
  }, [userId, logger]);
}`}</code>
                        </pre>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Global Logger Provider</p>
                      <div className="bg-gray-100 rounded-lg p-3 overflow-x-auto">
                        <pre className="font-mono text-xs text-gray-800 whitespace-pre-wrap break-words">
                          <code>{`// context/LoggerContext.js
import { createContext, useContext } from 'react';
import Logger from 'weelog';

const LoggerContext = createContext();

export function LoggerProvider({ children }) {
  const logger = new Logger({
    level: 'info',
    useTimestamp: true
  });
  
  return (
    <LoggerContext.Provider value={logger}>
      {children}
    </LoggerContext.Provider>
  );
}

export const useGlobalLogger = () => 
  useContext(LoggerContext);`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <span className="w-5 h-5 bg-green-500 rounded mr-2 flex items-center justify-center text-white text-xs font-bold">V</span>
                    Vue Integration
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Vue 3 Composable</p>
                      <div className="bg-gray-100 rounded-lg p-3 overflow-x-auto">
                        <pre className="font-mono text-xs text-gray-800 whitespace-pre-wrap break-words">
                          <code>{`// composables/useLogger.js
import { ref, computed } from 'vue';
import Logger from 'weelog';

export function useLogger(context = null, options = {}) {
  const logger = ref(new Logger({
    level: import.meta.env.DEV ? 'debug' : 'info',
    useTimestamp: true,
    ...options
  }));
  
  const contextLogger = computed(() => 
    context ? logger.value.withContext(context) 
            : logger.value
  );
  
  return {
    logger: contextLogger.value,
    debug: (msg, data) => 
      contextLogger.value.debug(msg, data),
    info: (msg, data) => 
      contextLogger.value.info(msg, data),
    warn: (msg, data) => 
      contextLogger.value.warn(msg, data),
    error: (msg, data) => 
      contextLogger.value.error(msg, data)
  };
}

// Usage in component
export default {
  setup() {
    const { logger, info, error } = 
      useLogger('UserComponent');
    
    const fetchData = async () => {
      info('Fetching user data');
      try {
        const response = await api.getUsers();
        info('Data fetched successfully', 
          { count: response.length });
      } catch (err) {
        error('Failed to fetch data', err);
      }
    };
    
    return { fetchData };
  }
};`}</code>
                        </pre>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Vue Plugin</p>
                      <div className="bg-gray-100 rounded-lg p-3 overflow-x-auto">
                        <pre className="font-mono text-xs text-gray-800 whitespace-pre-wrap break-words">
                          <code>{`// plugins/logger.js
import Logger from 'weelog';

export default {
  install(app, options = {}) {
    const logger = new Logger({
      level: 'info',
      useTimestamp: true,
      ...options
    });
    
    app.config.globalProperties.$logger = logger;
    app.provide('logger', logger);
  }
};

// main.js
import { createApp } from 'vue';
import LoggerPlugin from './plugins/logger.js';

const app = createApp(App);
app.use(LoggerPlugin, { level: 'debug' });`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <span className="w-5 h-5 bg-green-600 rounded mr-2 flex items-center justify-center text-white text-xs font-bold">N</span>
                    Node.js Integration
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">CommonJS Module</p>
                      <div className="bg-gray-100 rounded-lg p-3 overflow-x-auto">
                        <pre className="font-mono text-xs text-gray-800 whitespace-pre-wrap break-words">
                          <code>{`// logger.js
const Logger = require('weelog');

const logger = new Logger({
  level: process.env.LOG_LEVEL || 'info',
  useTimestamp: true
});

// Add file logging interceptor
logger.onLog((level, message, context, data) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    context,
    message,
    data
  };
  
  // Write to file or send to external service
  if (level === 'error') {
    require('fs').appendFileSync('error.log', 
      JSON.stringify(logEntry) + '\\n'
    );
  }
});

module.exports = logger;`}</code>
                        </pre>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Express.js Middleware</p>
                      <div className="bg-gray-100 rounded-lg p-3 overflow-x-auto">
                        <pre className="font-mono text-xs text-gray-800 whitespace-pre-wrap break-words">
                          <code>{`// middleware/logger.js
const Logger = require('weelog');

const httpLogger = new Logger()
  .setLevel('info')
  .withContext('HTTP');

function requestLogger(req, res, next) {
  const start = Date.now();
  const requestId = Math.random()
    .toString(36).substr(2, 9);
  
  req.logger = httpLogger
    .withContext(\`HTTP:\${requestId}\`);
  
  req.logger.info(\`\${req.method} \${req.path}\`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    req.logger.info('Response sent', {
      statusCode: res.statusCode,
      duration: \`\${duration}ms\`
    });
  });
  
  next();
}

module.exports = requestLogger;

// Usage in app.js
const express = require('express');
const requestLogger = 
  require('./middleware/logger');

const app = express();
app.use(requestLogger);`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <span className="w-5 h-5 bg-orange-500 rounded mr-2 flex items-center justify-center text-white text-xs font-bold">A</span>
                    Angular Integration
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Injectable Service</p>
                      <div className="bg-gray-100 rounded-lg p-3 overflow-x-auto">
                        <pre className="font-mono text-xs text-gray-800 whitespace-pre-wrap break-words">
                          <code>{`// services/logger.service.ts
import { Injectable } from '@angular/core';
import Logger from 'weelog';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private logger: Logger;
  
  constructor() {
    this.logger = new Logger({
      level: 'info',
      useTimestamp: true
    });
  }
  
  withContext(context: string) {
    return this.logger.withContext(context);
  }
  
  debug(message: string, data?: any) {
    this.logger.debug(message, data);
  }
  
  info(message: string, data?: any) {
    this.logger.info(message, data);
  }
  
  warn(message: string, data?: any) {
    this.logger.warn(message, data);
  }
  
  error(message: string, data?: any) {
    this.logger.error(message, data);
  }
}

// Usage in component
import { Component } from '@angular/core';
import { LoggerService } from './services/logger.service';

@Component({
  selector: 'app-user',
  template: \`<div>User Component</div>\`
})
export class UserComponent {
  private componentLogger = 
    this.logger.withContext('UserComponent');
  
  constructor(private logger: LoggerService) {
    this.componentLogger.info('Component initialized');
  }
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <span className="w-5 h-5 bg-black rounded mr-2 flex items-center justify-center text-white text-xs font-bold">⚡</span>
                    Vite/Webpack Integration
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Environment-based Configuration</p>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <pre className="font-mono text-sm text-gray-800">
                          <code>{`// utils/logger.js
import Logger from 'weelog';

const isDevelopment = import.meta.env.DEV || process.env.NODE_ENV === 'development';
const isProduction = import.meta.env.PROD || process.env.NODE_ENV === 'production';

export const logger = new Logger({
  level: isDevelopment ? 'debug' : isProduction ? 'error' : 'info',
  enabled: !import.meta.env.SSR, // Disable in SSR
  useTimestamp: true
});

// Production error reporting
if (isProduction) {
  logger.onLog((level, message, context, data) => {
    if (level === 'error') {
      // Send to error tracking service
      if (window.Sentry) {
        window.Sentry.captureException(new Error(message), {
          tags: { context },
          extra: data
        });
      }
    }
  });
}

export default logger;`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
