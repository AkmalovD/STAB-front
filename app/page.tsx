'use client'

import FeaturedDestinations from '@/components/FeaturedDestinations';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import KeyFeatures from '@/components/KeyFeatures';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-[65px]">
        <Hero />
        <HowItWorks />
        <FeaturedDestinations />
        <KeyFeatures />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
