'use client'

import { useAuth } from '@/auth/AuthContext';
import { debounce, validateSearchQuery } from '@/utils/calculations';
import { searchCities } from '@/utils/data';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import AuthRequiredModal from './AuthRequiredModal';

const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (validateSearchQuery(query)) {
        setIsSearching(true);
        const results = searchCities(query);
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 300),
    []
  );

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateSearchQuery(searchQuery)) {
      if (!user) {
        setShowAuthModal(true);
      } else {
        // Navigate to compare page with search query
        router.push(`/compare?search=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  const handleCitySelect = (cityName: string) => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setSearchQuery(cityName);
      setSearchResults([]);
      router.push(`/compare?city=${encodeURIComponent(cityName)}`);
    }
  };

  return (
    <>
      <AuthRequiredModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        featureName="поиску городов"
      />
      <div className="@container">
      <div className="@[480px]:p-4">
        <div
          className="flex min-h-[calc(100vh)] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4 relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(13, 152, 186, 0.85) 0%, rgba(19, 164, 236, 0.85) 100%), url("https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1600")`
          }}
        >
          {/* Sign In Button - Only visible when user is not logged in */}
          {!user && (
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              onClick={() => router.push('/login')}
              className="absolute top-6 right-6 px-6 py-2.5 bg-[#0d98ba] text-white font-semibold rounded-lg hover:bg-[#0b7a96] transition-all duration-200 shadow-md hover:shadow-lg z-20"
            >
              Sign In
            </motion.button>
          )}

          {/* Floating background elements */}
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-32 right-16 w-32 h-32 bg-white/5 rounded-full blur-xl"
            animate={{
              y: [0, 30, 0],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />

          <div className="text-center max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <motion.h1
                className="text-white text-5xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] mb-4"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 100
                }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="inline-block"
                >
                  Plan Your Study Abroad Journey
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-white/90 text-xl @[480px]:text-2xl font-medium leading-relaxed mb-8"
            >
              Discover the perfect destination for your international education. Compare cities, universities, and living costs all in one place.
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 120
            }}
            onSubmit={handleSearchSubmit}
            className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16 relative"
          >
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-lg">
              <div className="text-[#4c809a] flex border border-[#cfdfe7] bg-slate-50 items-center justify-center pl-[15px] rounded-l-xl border-r-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
              </div>
              <input
                placeholder="Search cities, universities, or countries..."
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-5 h-full placeholder:text-[#4c809a] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal transition-all duration-200"
                value={searchQuery}
                onChange={handleSearchInputChange}
                autoComplete="off"
              />
              <div className="flex items-center justify-center rounded-r-xl border-l-0 border border-[#cfdfe7] bg-slate-50 pr-[7px]">
                <button
                  type="submit"
                  disabled={!validateSearchQuery(searchQuery) || isSearching}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#0d98ba] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-[#0d98ba] focus:outline-none focus:ring-2 focus:ring-[#0d98ba] focus:ring-opacity-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="truncate">
                    {isSearching ? 'Searching...' : 'Start Planning'}
                  </span>
                </button>
              </div>
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#cfdfe7] rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto"
                >
                  {searchResults.map((city, index) => (
                    <motion.button
                      key={city.id}
                      type="button"
                      onClick={() => handleCitySelect(city.name)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl transition-colors duration-150"
                    >
                      <div className="font-medium text-[#0d171b]">{city.name}</div>
                      <div className="text-sm text-[#4c809a]">{city.country}</div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="flex flex-wrap gap-6 mt-8 text-white/90 text-center"
          >
            {[
              { number: '50+', label: 'Cities Covered' },
              { number: '200+', label: 'Universities' },
              { number: '10K+', label: 'Students Helped' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 1.4 + index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 150
                }}
              >
                <motion.div
                  className="text-2xl font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.6 + index * 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Hero;