import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    <section className="px-4 md:px-10 lg:px-40 py-16 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-[#0d171b] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            What Our Students Say
          </motion.h2>
          <motion.p 
            className="text-lg text-[#4c809a]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Join thousands of students who successfully planned their study abroad journey
          </motion.p>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-gradient-to-br from-[#0d98ba]/5 to-[#0d98ba]/10 rounded-2xl p-8 md:p-12 shadow-lg">
          {/* Quote Icon */}
          <div className="absolute top-6 left-6 text-6xl text-[#0d98ba] opacity-20">
            "
          </div>

          <div className="relative">
            {/* Rating Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-xl md:text-2xl text-[#0d171b] text-center leading-relaxed mb-8 font-medium">
              {currentTestimonial.text}
            </p>

            {/* Student Info */}
            <div className="flex items-center justify-center gap-4">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="text-left">
                <h4 className="font-bold text-[#0d171b] text-lg">
                  {currentTestimonial.name}
                </h4>
                <p className="text-[#4c809a] text-sm">
                  {currentTestimonial.university}
                </p>
                <p className="text-[#4c809a] text-sm">
                  📍 {currentTestimonial.country}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[#0d98ba] hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[#0d98ba] hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-[#0d98ba] w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
