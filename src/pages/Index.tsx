import FloatingPetals from '@/components/FloatingPetals';
import HeroSection from '@/components/sections/HeroSection';
import ApologySection from '@/components/sections/ApologySection';
import AdmireSection from '@/components/sections/AdmireSection';
import ImpactSection from '@/components/sections/ImpactSection';
import PromiseSection from '@/components/sections/PromiseSection';
import ClosingSection from '@/components/sections/ClosingSection';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Floating petals background */}
      <FloatingPetals />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <ApologySection />
        <AdmireSection />
        <ImpactSection />
        <PromiseSection />
        <ClosingSection />
      </main>
    </div>
  );
};

export default Index;
