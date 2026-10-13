import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ScrollytellingCanvas from './components/ScrollytellingCanvas';
import CompleteSystemScroll from './components/CompleteSystemScroll';
import DayToNightBatteryScroll from './components/DayToNightBatteryScroll';
import CompleteSystem from './components/CompleteSystem';
import SolarSolutions from './components/SolarSolutions';
import WhyChooseUs from './components/WhyChooseUs';
import ProcessSection from './components/ProcessSection';
import ProjectsShowcase from './components/ProjectsShowcase';
import SolarCalculator from './components/SolarCalculator';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import QuoteModal from './components/QuoteModal';
import Footer from './components/Footer';

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteData, setQuoteData] = useState(null);

  const handleOpenQuote = (customData = null) => {
    setQuoteData(customData);
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* Premium Sticky Navigation */}
      <Navbar
        onOpenQuoteModal={() => handleOpenQuote(null)}
      />

      {/* Main Content Flow */}
      <main>
        {/* Core Scrollytelling 3D Exploded-View Stage (Pinned 420vh) */}
        <ScrollytellingCanvas
          onOpenQuoteModal={() => handleOpenQuote(null)}
        />

        {/* Section: Cinematic Scroll-driven Ecosystem Sequence (Generation -> Conversion -> Storage -> Power) */}
        <CompleteSystemScroll
          onOpenQuoteModal={() => handleOpenQuote(null)}
        />

        {/* Section: The "Day to Night" Transition (Selling Battery Storage) - Pinned 360vh */}
        <DayToNightBatteryScroll
          onOpenQuoteModal={() => handleOpenQuote(null)}
          onOpenCalculator={() => {
            const calcSec = document.querySelector('#calculator');
            if (calcSec) calcSec.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section: Complete Solar System Interactive Telemetry & Day/Night Grid Sim */}
        <CompleteSystem />

        {/* Section 6: Solar Solutions (Residential, Commercial, Maintenance) */}
        <SolarSolutions
          onOpenQuoteModal={() => handleOpenQuote(null)}
        />

        {/* Section 8: Trust & Engineering (Why Choose Us) */}
        <WhyChooseUs />

        {/* Our 4-Step Installation Workflow */}
        <ProcessSection
          onOpenQuoteModal={() => handleOpenQuote(null)}
        />

        {/* Featured Projects Portfolio */}
        <ProjectsShowcase
          onOpenQuoteModal={() => handleOpenQuote(null)}
        />

        {/* Interactive Solar Savings ROI Calculator */}
        <SolarCalculator
          onOpenQuoteModalWithData={(calcData) => handleOpenQuote(calcData)}
        />

        {/* Customer Testimonials & Verified Case Reviews */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Clean Editorial Footer */}
      <Footer
        onOpenQuoteModal={() => handleOpenQuote(null)}
      />

      {/* Functional Enquiry & Consultation Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={handleCloseQuote}
        initialData={quoteData}
      />
    </div>
  );
}
