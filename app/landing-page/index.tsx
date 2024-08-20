import React from 'react';
import PricingSection from './pricing-section';
import Hero from './hero';
import FeaturesSection from './feature-section';

const LandingPage = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Hero />
      <FeaturesSection />
      <PricingSection />
    </div>
  );
};

export default LandingPage;
