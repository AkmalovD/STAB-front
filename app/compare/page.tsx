'use client'

import CityComparison from '@/components/CityComparison';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Compare() {
  return (
    <>
      <Header />
      <main className="pt-[80px]">
        <CityComparison />
      </main>
      <Footer />
    </>
  );
}
