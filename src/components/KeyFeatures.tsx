'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'

interface Feature {
  title: string;
  description: string;
  stats: string;
  link: string;
}

const features: Feature[] = [
  {
    title: 'Global Coverage',
    description: 'Access information about cities and universities across the world with real-time data and insights.',
    stats: '50+ Cities • 200+ Universities',
    link: '/compare',
  },
  {
    title: 'Budget Planning',
    description: 'Smart calculator to estimate living costs, tuition fees, and total expenses with currency conversion.',
    stats: 'Live Currency • Cost Breakdown',
    link: '/compare',
  },
  {
    title: 'Scholarship Database',
    description: 'Find and apply for hundreds of scholarships matching your profile and destination preferences.',
    stats: 'Personalized Matches',
    link: '/scholarships',
  },
  {
    title: 'City Comparison',
    description: 'Compare multiple destinations side-by-side to make informed decisions based on your priorities.',
    stats: 'Visual Analytics',
    link: '/compare',
  },
  {
    title: 'Step-by-Step Guide',
    description: 'Complete timeline with checklists to keep you organized throughout your application journey.',
    stats: 'Timeline Tracking',
    link: '/plan-journey',
  },
  {
    title: 'Student Community',
    description: 'Connect with fellow students and learn from their experiences through stories and discussions.',
    stats: 'Real Stories • Forums',
    link: '/community',
  },
];

const KeyFeatures: React.FC = () => {
  const router = useRouter();

  const renderIcon = (index: number) => {
    const iconClass = "w-full h-full";
    
    switch(index) {
      case 0:
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        );
      case 1:
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        );
      case 2:
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
        );
      case 3:
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 3v18h18"/>
            <path d="M18 17V9M13 17V5M8 17v-3"/>
          </svg>
        );
      case 4:
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 11l3 3L22 4"/>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
        );
      case 5:
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <section className="px-4 md:px-10 lg:px-40 py-20 bg-gradient-to-b from-white to-[#f8fafc]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-1.5 bg-white border border-[#0d98ba]/20 rounded-full mb-4">
              <span className="text-sm font-medium text-[#0d98ba]">Platform Features</span>
            </div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-[#0d171b] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Why Choose STAB?
            </motion.h2>
            <motion.p 
              className="text-lg text-[#4c809a]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Everything you need to plan your study abroad journey in one comprehensive platform
            </motion.p>
          </div>
          
          <button 
            onClick={() => router.push('/compare')}
            className="group flex items-center gap-2 text-[#0d98ba] font-semibold hover:gap-3 transition-all"
          >
            <span>Explore All Features</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              onClick={() => router.push(feature.link)}
              className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#0d98ba] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0d98ba]/5 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />
              
              <div className="relative">
                <div className="w-12 h-12 text-[#0d98ba] mb-6 group-hover:scale-110 transition-transform">
                  {renderIcon(index)}
                </div>

                <h3 className="text-xl font-bold text-[#0d171b] mb-3 group-hover:text-[#0d98ba] transition-colors">
                  {feature.title}
                </h3>

                <p className="text-[#4c809a] text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <span className="text-xs font-medium text-[#0d98ba] bg-[#f8fafc] px-3 py-1.5 rounded-full">
                    {feature.stats}
                  </span>
                  
                  <div className="w-8 h-8 rounded-full bg-[#f8fafc] flex items-center justify-center group-hover:bg-[#0d98ba] transition-colors">
                    <svg className="w-4 h-4 text-[#0d98ba] group-hover:text-white transform group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#0d98ba] to-[#13a4ec] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMzAgMzBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students who have successfully planned their study abroad experience with STAB
            </p>
            <button 
              onClick={() => router.push('/plan-journey')}
              className="px-8 py-4 bg-white text-[#0d98ba] rounded-xl font-semibold text-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
