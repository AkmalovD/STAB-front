'use client'

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Step {
  number: number;
  title: string;
  description: string;
  details: string[];
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Research & Explore',
    description: 'Browse through 50+ cities and 200+ universities. Compare costs, living expenses, and programs.',
    details: ['50+ Cities', '200+ Universities', 'Cost Analysis']
  },
  {
    number: 2,
    title: 'Compare Options',
    description: 'Use our interactive tools to compare cities side-by-side and calculate your budget.',
    details: ['Side-by-side', 'Budget Tools', 'Live Data']
  },
  {
    number: 3,
    title: 'Find Scholarships',
    description: 'Discover and apply for scholarships that match your profile and destination.',
    details: ['Match Profile', 'Track Apps', 'Deadlines']
  },
  {
    number: 4,
    title: 'Plan Your Journey',
    description: 'Create a step-by-step timeline with checklists, deadlines, and document tracking.',
    details: ['Timeline', 'Checklists', 'Documents']
  },
];

const HowItWorks: React.FC = () => {
  const router = useRouter();

  const renderIcon = (stepNumber: number) => {
    switch(stepNumber) {
      case 1:
        return (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
            <path d="M11 8v6"/>
            <path d="M8 11h6"/>
          </svg>
        );
      case 2:
        return (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
        );
      case 3:
        return (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="2" x2="12" y2="6"/>
            <path d="M12 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/>
            <polyline points="12 22 8 18 12 18 16 18 12 22"/>
          </svg>
        );
      case 4:
        return (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 11 12 14 22 4"/>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="px-4 md:px-10 lg:px-40 py-20 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-block px-4 py-1.5 bg-[#f8fafc] border border-[#0d98ba]/20 rounded-full mb-4">
            <span className="text-sm font-medium text-[#0d98ba]">Our Process</span>
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold text-[#0d171b] mb-4 max-w-2xl"
          >
            How It Works
          </motion.h2>
          <p className="text-lg text-[#4c809a] max-w-2xl">
            A straightforward process designed to help you navigate your study abroad journey from start to finish
          </p>
        </div>

        <div className="relative">
          <motion.div
            className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#0d98ba]/20 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            style={{ originX: 0.5 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="relative group"
              >
                <motion.div
                  className="relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#0d98ba] transition-all duration-300 hover:shadow-xl h-full overflow-hidden"
                  whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                >
                  <motion.div
                    className="absolute -top-3 -left-3 w-14 h-14 bg-[#0d98ba] rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15 + 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <span className="text-white font-bold text-xl">{step.number}</span>
                  </motion.div>

                  <motion.div
                    className="mt-6 mb-4 text-[#0d98ba]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15 + 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    {renderIcon(step.number)}
                  </motion.div>

                  <motion.h3
                    className="text-xl font-bold text-[#0d171b] mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15 + 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    {step.title}
                  </motion.h3>

                  <motion.p
                    className="text-[#4c809a] text-sm leading-relaxed mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15 + 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    {step.description}
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-2 mt-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.7 }}
                  >
                    {step.details.map((detail, idx) => (
                      <motion.span
                        key={idx}
                        className="text-xs px-3 py-1 bg-[#f8fafc] text-[#0d98ba] rounded-full border border-[#0d98ba]/20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.15 + 0.8 + idx * 0.1,
                          type: "spring",
                          stiffness: 150
                        }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "#0d98ba",
                          color: "white",
                          transition: { duration: 0.2 }
                        }}
                      >
                        {detail}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.8,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="mt-16 text-center"
        >
          <motion.button
            onClick={() => router.push('/plan-journey')}
            className="group relative px-8 py-4 bg-[#0d98ba] text-white rounded-xl font-semibold text-lg overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px -12px rgba(13, 152, 186, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 1,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#13a4ec] to-[#0d98ba] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
              initial={false}
            />
            <motion.span
              className="relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              Get Started Today
            </motion.span>
            <motion.div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100"
              initial={{ x: -10, opacity: 0 }}
              whileHover={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
