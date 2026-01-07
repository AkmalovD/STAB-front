'use client'

import { useAuth } from '@/auth/AuthContext';
import { citiesData } from '@/utils/data';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import AuthRequiredModal from './AuthRequiredModal';

interface DestinationCardProps {
  city: {
    id: string;
    name: string;
    country: string;
    imageUrl: string;
    flag: string;
    costOfLiving: string;
  };
  onExplore: (cityName: string) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ city, onExplore }) => {

  const handleExplore = () => {
    onExplore(city.name);
  };

  return (
    <motion.div
      className="group relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
      whileHover={{
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.3 }
      }}
      layout
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={city.imageUrl}
          alt={city.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 0.4 }}
          transition={{ duration: 0.3 }}
        />

        {/* Flag */}
        <motion.div
          className="absolute top-4 right-4 text-3xl"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            type: "spring",
            stiffness: 200
          }}
          whileHover={{
            scale: 1.2,
            rotate: 10,
            transition: { duration: 0.2 }
          }}
        >
          {city.flag}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <motion.h3
          className="text-xl font-bold text-[#0d171b] mb-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {city.name}
        </motion.h3>
        <motion.p
          className="text-sm text-[#4c809a] mb-3"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {city.country}
        </motion.p>

        {/* Stats */}
        <motion.div
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div>
            <p className="text-xs text-gray-500 mb-1">Cost of Living</p>
            <motion.p
              className="text-lg font-bold text-[#0d98ba]"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.7,
                type: "spring",
                stiffness: 150
              }}
            >
              {city.costOfLiving}
            </motion.p>
          </div>
        </motion.div>

        {/* Explore Button */}
        <motion.button
          onClick={handleExplore}
          className="w-full py-2 bg-[#f8fafc] text-[#0d98ba] rounded-lg font-semibold overflow-hidden relative"
          whileHover={{
            backgroundColor: "#0d98ba",
            color: "white"
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            className="relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Explore {city.name}
          </motion.span>
          <motion.div
            className="absolute inset-0 bg-[#0d98ba] rounded-lg"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            style={{ originX: 0 }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

const FeaturedDestinations: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  
  // Get first 6 cities
  const featuredCities = citiesData.slice(0, 6);

  const handleCityExplore = (cityName: string) => {
    if (!user) {
      setSelectedCity(`городу ${cityName}`);
      setShowAuthModal(true);
    } else {
      router.push(`/compare?city=${encodeURIComponent(cityName)}`);
    }
  };

  const handleViewAllClick = () => {
    if (!user) {
      setSelectedCity('всем городам');
      setShowAuthModal(true);
    } else {
      router.push('/compare');
    }
  };

  return (
    <>
      <AuthRequiredModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        featureName={selectedCity}
      />
      <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="px-4 md:px-10 lg:px-40 py-16 bg-[#f8fafc]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0d171b] mb-4">
              Featured Destinations
            </h2>
            <p className="text-lg text-[#4c809a]">
              Explore the most popular study abroad destinations
            </p>
          </div>
          <button
            onClick={handleViewAllClick}
            className="hidden md:block px-6 py-3 border-2 border-[#0d98ba] text-[#0d98ba] rounded-lg font-semibold hover:bg-[#0d98ba] hover:text-white transition-colors"
          >
            View All Cities
          </button>
        </div>

        {/* Destinations Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
        >
          {featuredCities.map((city, index) => (
            <motion.div
              key={city.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 50,
                  scale: 0.8,
                  rotateX: -15
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 100
                  }
                }
              }}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="h-full"
            >
              <DestinationCard city={city} onExplore={handleCityExplore} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Button */}
        <div className="md:hidden text-center mt-8">
          <button
            onClick={handleViewAllClick}
            className="px-6 py-3 border-2 border-[#0d98ba] text-[#0d98ba] rounded-lg font-semibold hover:bg-[#0d98ba] hover:text-white transition-colors"
          >
            View All Cities
          </button>
        </div>
      </div>
    </motion.section>
    </>
  );
};

export default FeaturedDestinations;
