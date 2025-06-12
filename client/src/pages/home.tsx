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
      <FeaturesShowcase />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 space-y-8 lg:space-y-0">
          <DemoSection />
          <DocumentationSidebar />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
