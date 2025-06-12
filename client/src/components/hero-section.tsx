import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToDemo = () => {
    const element = document.getElementById('demo');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDocs = () => {
    const element = document.getElementById('documentation');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Tiny, Powerful Logging for JavaScript
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Zero dependencies, browser and Node.js compatible logging library with context support, 
          level control, and colorized console output.
        </p>
        <div className="bg-gray-900 rounded-xl p-6 text-left max-w-2xl mx-auto mb-8">
          <pre className="text-green-400 font-mono text-sm">
            <code>{`import Logger from 'weelog';

const logger = new Logger({
  level: 'info',
  enabled: true,
  useTimestamp: true
});

logger.info("App started successfully");
logger.withContext('Auth').warn("Session expired");`}</code>
          </pre>
        </div>
        <div className="flex justify-center space-x-4">
          <Button 
            onClick={scrollToDemo}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Try Live Demo
          </Button>
          <Button 
            variant="outline"
            onClick={scrollToDocs}
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            View Documentation
          </Button>
        </div>
      </div>
    </section>
  );
}
