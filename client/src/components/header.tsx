import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

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
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">W</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">WeeLog</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Tiny Logging Library</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={() => scrollToSection('documentation')}
              className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm font-medium transition-colors"
            >
              Docs
            </button>
            <Button 
              onClick={() => window.open('https://www.paypal.com/donate/?business=ebocic@gmail.com&item_name=Support+WeeLog+Development&currency_code=USD', '_blank')}
              className="bg-blue-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-1"
            >
              <span>❤️</span>
              <span className="hidden sm:inline">Donate</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
