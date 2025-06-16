import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesShowcase } from "@/components/features-showcase";
import { DemoSection } from "@/components/demo-section";
import { DocumentationSidebar } from "@/components/documentation-sidebar";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-white font-sans text-gray-900">
      <Header />
      <HeroSection />
      
      {/* Main Content - Documentation with Integrated Demo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore WeeLog Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Try the interactive demo, learn from examples, and integrate with your favorite frameworks
          </p>
        </div>
        
        <DocumentationSidebar />
      </div>
      
      <Footer />
    </div>
  );
}
