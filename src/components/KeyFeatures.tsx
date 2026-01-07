'use client'

import { useAuth } from '@/auth/AuthContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import AuthRequiredModal from './AuthRequiredModal';

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
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');

  const handleFeatureClick = (feature: Feature) => {
    if (!user) {
      setSelectedFeature(feature.title);
      setShowAuthModal(true);
    } else {
      router.push(feature.link);
    }
  };

  const handleExploreAllClick = () => {
    if (!user) {
      setSelectedFeature('всем функциям платформы');
      setShowAuthModal(true);
    } else {
      router.push('/compare');
    }
  };

  const handleStartJourneyClick = () => {
    if (!user) {
      setSelectedFeature('планированию путешествия');
      setShowAuthModal(true);
    } else {
      router.push('/plan-journey');
    }
  };

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
    <>
      <AuthRequiredModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        featureName={selectedFeature}
      />
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
            onClick={handleExploreAllClick}
            className="group flex items-center gap-2 text-[#0d98ba] font-semibold hover:gap-3 transition-all"
          >
            <span>Explore All Features</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
              }
            }
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              onClick={() => handleFeatureClick(feature)}
              className="group relative bg-white border border-gray-200 rounded-2xl p-8 cursor-pointer overflow-hidden"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 60,
                  scale: 0.9,
                  rotateY: 20
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateY: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 100
                  }
                }
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(13, 152, 186, 0.15)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-[#0d98ba]/5 rounded-bl-full transform translate-x-16 -translate-y-16"
                animate={{
                  translateX: ["16px", "8px", "16px"],
                  translateY: ["-16px", "-8px", "-16px"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
              />

              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#0d98ba]/5 to-transparent opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative">
                <motion.div
                  className="w-12 h-12 text-[#0d98ba] mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 10,
                    transition: { duration: 0.3 }
                  }}
                >
                  {renderIcon(index)}
                </motion.div>

                <motion.h3
                  className="text-xl font-bold text-[#0d171b] mb-3"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ color: "#0d98ba" }}
                >
                  {feature.title}
                </motion.h3>

                <motion.p
                  className="text-[#4c809a] text-sm leading-relaxed mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.7 + index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {feature.description}
                </motion.p>

                <motion.div
                  className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <motion.span
                    className="text-xs font-medium text-[#0d98ba] bg-[#f8fafc] px-3 py-1.5 rounded-full"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#0d98ba",
                      color: "white"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {feature.stats}
                  </motion.span>

                  <motion.div
                    className="w-8 h-8 rounded-full bg-[#f8fafc] flex items-center justify-center"
                    whileHover={{
                      backgroundColor: "#0d98ba",
                      scale: 1.1
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.svg
                      className="w-4 h-4 text-[#0d98ba]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      whileHover={{
                        x: 2,
                        stroke: "white"
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </motion.svg>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 bg-gradient-to-r from-[#0d98ba] to-[#13a4ec] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          <motion.div
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMzAgMzBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')]"
            animate={{
              backgroundPosition: ["0px 0px", "60px 60px"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ opacity: 0.3 }}
          />

          {/* Floating elements */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full blur-sm"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-8 right-12 w-12 h-12 bg-white/10 rounded-full blur-sm"
            animate={{
              y: [0, 15, 0],
              x: [0, -8, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />

          <div className="relative z-10">
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              Ready to Start Your Journey?
            </motion.h3>
            <motion.p
              className="text-white/90 text-lg mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              Join thousands of students who have successfully planned their study abroad experience with STAB
            </motion.p>
            <motion.button
              onClick={handleStartJourneyClick}
              className="px-8 py-4 bg-white text-[#0d98ba] rounded-xl font-semibold text-lg relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -12px rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <motion.span
                className="relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                Get Started for Free
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#0d98ba] to-[#13a4ec] rounded-xl"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
              <motion.div
                className="absolute inset-0 bg-white rounded-xl"
                whileHover={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default KeyFeatures;
