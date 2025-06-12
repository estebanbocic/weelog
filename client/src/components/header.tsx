import { Button } from "@/components/ui/button";

export function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyInstallCommand = () => {
    navigator.clipboard.writeText('npm install weelog');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">WeeLog</h1>
              <p className="text-xs text-gray-500">Tiny Logging Library</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => scrollToSection('documentation')}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Docs
            </button>
            <button 
              onClick={() => scrollToSection('demo')}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Demo
            </button>
            <Button 
              onClick={copyInstallCommand}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              npm install weelog
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
