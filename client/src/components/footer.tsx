export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyInstallCommand = () => {
    navigator.clipboard.writeText('npm install weelog');
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">WeeLog</h3>
            </div>
            <p className="text-gray-600 text-sm">
              A tiny, powerful logging library for JavaScript applications. 
              Lightweight and flexible with minimal dependencies.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => scrollToSection('demo')}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Live Demo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('documentation')}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Documentation
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a 
                  href="https://www.npmjs.com/package/weelog" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  NPM Package
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Support the Project</h4>
            <button
              onClick={() => window.open('https://www.paypal.com/donate/?business=ebocic@gmail.com&item_name=Support+WeeLog+Development&currency_code=USD', '_blank')}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors mb-3 flex items-center justify-center"
            >
              ❤️ Donate via PayPal
            </button>
            <div 
              className="bg-gray-100 rounded-lg p-3 mb-2 cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={copyInstallCommand}
            >
              <code className="font-mono text-xs text-gray-800">npm install weelog</code>
            </div>
            <p className="text-xs text-gray-500">
              Version 1.0.0 • MIT License • Lightweight package
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 WeeLog. Built with ❤️ for developers everywhere.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Support open source development • PayPal donations help keep this project free
          </p>
        </div>
      </div>
    </footer>
  );
}
