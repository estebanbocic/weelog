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
        <div className="h-96 overflow-y-auto">
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
                    <code className="font-mono text-sm text-gray-800">new Logger(options)</code>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Options: level, enabled, useTimestamp
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Logging Methods</h4>
                  <div className="space-y-2">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <code className="font-mono text-sm text-gray-800">logger.debug(message, data?)</code>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <code className="font-mono text-sm text-gray-800">logger.info(message, data?)</code>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <code className="font-mono text-sm text-gray-800">logger.warn(message, data?)</code>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <code className="font-mono text-sm text-gray-800">logger.error(message, data?)</code>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Control Methods</h4>
                  <div className="space-y-2">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <code className="font-mono text-sm text-gray-800">logger.setLevel(level)</code>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <code className="font-mono text-sm text-gray-800">logger.enable(boolean)</code>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <code className="font-mono text-sm text-gray-800">logger.withContext(name)</code>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <code className="font-mono text-sm text-gray-800">logger.onLog(callback)</code>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Example with Context</h4>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <pre className="font-mono text-sm text-gray-800">
                      <code>{`const authLogger = logger
  .withContext('Auth');

authLogger.warn('Invalid token');
// Output: [WARN] [Auth] Invalid token`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Frameworks Tab */}
          {activeTab === 'frameworks' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Framework Integration</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">React Hook</h4>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <pre className="font-mono text-sm text-gray-800">
                      <code>{`import { useMemo } from 'react';
import Logger from 'weelog';

export function useLogger(context) {
  return useMemo(() => 
    new Logger().withContext(context),
    [context]
  );
}`}</code>
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Vue Composable</h4>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <pre className="font-mono text-sm text-gray-800">
                      <code>{`import { ref } from 'vue';
import Logger from 'weelog';

export function useLogger(context) {
  const logger = ref(
    new Logger().withContext(context)
  );
  return { logger: logger.value };
}`}</code>
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Node.js (CommonJS)</h4>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <pre className="font-mono text-sm text-gray-800">
                      <code>{`const Logger = require('weelog');

const logger = new Logger({
  level: 'info',
  useTimestamp: true
});

logger.info('Server started');
module.exports = logger;`}</code>
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Express.js Middleware</h4>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <pre className="font-mono text-sm text-gray-800">
                      <code>{`const logger = new Logger()
  .withContext('HTTP');

app.use((req, res, next) => {
  logger.info(\`\${req.method} \${req.path}\`);
  next();
});`}</code>
                    </pre>
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
