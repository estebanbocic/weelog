import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showCopied, setShowCopied] = useState(false);
  
  const fullText = `import Logger from 'weelog';

const logger = new Logger({
  level: 'info',
  enabled: true,
  useTimestamp: true
});

logger.info("App started successfully");
logger.withContext('Auth').warn("Session expired");`;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;
    let isTyping = true;

    const typeText = () => {
      if (currentIndex <= fullText.length && isTyping) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(typeText, 4000 / fullText.length); // 4 seconds total
      } else if (isTyping) {
        // Finished typing, wait 10 seconds
        isTyping = false;
        timeoutId = setTimeout(() => {
          currentIndex = 0;
          isTyping = true;
          setDisplayText('');
          typeText();
        }, 10000);
      }
    };

    typeText();

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(cursorInterval);
    };
  }, []);

  const scrollToDemo = () => {
    const element = document.getElementById('demo');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDocs = () => {
    const element = document.getElementById('documentation');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyNpmCommand = async () => {
    try {
      await navigator.clipboard.writeText('npm install weelog');
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Tiny, Powerful Logging for JavaScript
        </h2>
        <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          Lightweight, browser and Node.js compatible logging library with context support, 
          level control, and colorized console output.
        </p>
        <p className="text-lg text-blue-600 font-medium mb-6">
          Available on NPM
        </p>
        
        <div className="flex justify-center mb-6 relative">
          <button
            onClick={copyNpmCommand}
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-mono text-sm hover:bg-blue-200 transition-colors cursor-pointer"
          >
            npm install weelog
          </button>
          
          {/* Copy notification */}
          <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
            showCopied 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}>
            Copied to clipboard!
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 text-left max-w-2xl mx-auto mb-8">
          <pre className="text-green-400 font-mono text-sm min-h-[200px]">
            <code>
              {displayText}
              <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
                |
              </span>
            </code>
          </pre>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Button 
            onClick={scrollToDemo}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Try Live Demo
          </Button>
          <Button 
            variant="outline"
            onClick={scrollToDocs}
            className="border border-gray-300 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            View Documentation
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.open('https://www.npmjs.com/package/weelog', '_blank')}
            className="border border-blue-300 text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors text-sm sm:text-base"
          >
            View on NPM
          </Button>
          <Button 
            onClick={() => window.open('https://www.paypal.com/donate/?business=ebocic@gmail.com&item_name=Support+WeeLog+Development&currency_code=USD', '_blank')}
            className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            ❤️ Support Project
          </Button>
        </div>
      </div>
    </section>
  );
}
