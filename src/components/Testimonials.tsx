'use client'

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  university: string;
  country: string;
  image: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    university: 'University of Oxford',
    country: 'United Kingdom',
    image: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'STAB made my study abroad journey so much easier! The budget calculator and scholarship finder saved me thousands of dollars. Highly recommend!',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    university: 'Technical University of Munich',
    country: 'Germany',
    image: 'https://i.pravatar.cc/150?img=2',
    rating: 5,
    text: 'The city comparison tool helped me make an informed decision. I found the perfect balance between quality education and affordable living.',
  },
  {
    id: 3,
    name: 'Maria Garcia',
    university: 'University of Amsterdam',
    country: 'Netherlands',
    image: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    text: 'Amazing platform! The step-by-step planning guide kept me organized throughout the entire application process. Got accepted to my dream university!',
  },
  {
    id: 4,
    name: 'John Chen',
    university: 'University of Toronto',
    country: 'Canada',
    image: 'https://i.pravatar.cc/150?img=4',
    rating: 5,
    text: 'The scholarship database is incredible. I found and applied for 5 scholarships I never knew existed. Won 2 of them! Thank you STAB!',
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="px-4 md:px-10 lg:px-40 py-20 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-block px-4 py-1.5 bg-[#f8fafc] border border-[#0d98ba]/20 rounded-full mb-4">
            <span className="text-sm font-medium text-[#0d98ba]">Student Success</span>
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold text-[#0d171b] mb-4 max-w-2xl"
          >
            What Our Students Say
          </motion.h2>
          <p className="text-lg text-[#4c809a] max-w-2xl">
            Join thousands of students who successfully planned their study abroad journey
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{
                opacity: 0,
                x: 100,
                scale: 0.95,
                rotateY: 20
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                rotateY: 0
              }}
              exit={{
                opacity: 0,
                x: -100,
                scale: 0.95,
                rotateY: -20
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 120
              }}
              className="relative"
            >
              <motion.div
                className="relative bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-lg"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                  borderColor: "#0d98ba",
                  transition: { duration: 0.3 }
                }}
                layout
              >
                <motion.div
                  className="absolute -top-3 -left-3 w-14 h-14 bg-[#0d98ba] rounded-xl flex items-center justify-center shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 10,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className="text-white font-bold text-xl">
                    {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </motion.div>

                <motion.div
                  className="mt-6 mb-6 flex items-center gap-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + i * 0.1,
                        type: "spring",
                        stiffness: 150
                      }}
                      whileHover={{
                        scale: 1.2,
                        rotate: 10,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </motion.svg>
                  ))}
                </motion.div>

                <motion.div
                  className="relative mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <motion.svg
                    className="absolute -top-4 -left-2 w-10 h-10 text-[#0d98ba] opacity-20"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                  </motion.svg>
                  <motion.p
                    className="text-lg md:text-xl text-[#0d171b] leading-relaxed pl-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    "{currentTestimonial.text}"
                  </motion.p>
                </motion.div>

                <motion.div
                  className="pt-6 border-t border-gray-100"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <motion.h3
                    className="text-xl font-bold text-[#0d171b] mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    {currentTestimonial.name}
                  </motion.h3>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    {[
                      { text: currentTestimonial.university, icon: "🎓" },
                      { text: currentTestimonial.country, icon: "📍" }
                    ].map((item, index) => (
                      <motion.span
                        key={index}
                        className="text-xs px-3 py-1 bg-[#f8fafc] text-[#0d98ba] rounded-full border border-[#0d98ba]/20"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: 1.2 + index * 0.1,
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
                        {item.icon} {item.text}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 bg-white border border-gray-200 rounded-xl shadow-md flex items-center justify-center group overflow-hidden"
            aria-label="Previous testimonial"
            whileHover={{
              scale: 1.1,
              backgroundColor: "#0d98ba",
              borderColor: "#0d98ba",
              boxShadow: "0 10px 25px -8px rgba(13, 152, 186, 0.3)",
              x: -5
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#0d98ba] rounded-xl"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />
            <motion.svg
              className="w-6 h-6 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              whileHover={{ x: -2 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </motion.svg>
          </motion.button>

          <motion.button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 bg-white border border-gray-200 rounded-xl shadow-md flex items-center justify-center group overflow-hidden"
            aria-label="Next testimonial"
            whileHover={{
              scale: 1.1,
              backgroundColor: "#0d98ba",
              borderColor: "#0d98ba",
              boxShadow: "0 10px 25px -8px rgba(13, 152, 186, 0.3)",
              x: 5
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#0d98ba] rounded-xl"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 1 }}
            />
            <motion.svg
              className="w-6 h-6 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.button>
        </div>

        {/* Dots Indicator */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.7 }}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="h-2 rounded-full relative overflow-hidden"
              animate={{
                width: index === currentIndex ? 32 : 8,
                backgroundColor: index === currentIndex ? "#0d98ba" : "#d1d5db"
              }}
              whileHover={{
                scale: 1.2,
                backgroundColor: index === currentIndex ? "#0d98ba" : "#9ca3af"
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
