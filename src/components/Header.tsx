'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '../auth/AuthContext';

const Header: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActiveRoute = (path: string): boolean => {
    return pathname === path;
  };

  const getLinkClassName = (path: string): string => {
    const baseClasses = "text-sm font-medium leading-normal transition-colors duration-200";
    const activeClasses = "text-[#13a4ec] border-b-2 border-[#13a4ec] pb-1";
    const inactiveClasses = "text-[#0d171b] hover:text-[#4c809a]";
    
    return `${baseClasses} ${isActiveRoute(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7eff3] px-10 py-3 bg-white shadow-md backdrop-blur-sm">
      <div className="flex items-center text-[#0d171b]">
        <div className="w-18 h-18 relative">
          <Image 
            src="/logo.svg" 
            alt="STAB Logo" 
            width={56} 
            height={56}
            className="object-contain"
          />
        </div>
        <Link 
          href="/" 
          className="text-[#0d171b] text-lg font-bold leading-tight tracking-[-0.015em] hover:text-[#4c809a] transition-colors duration-200"
        >
          STAB
        </Link>
      </div>
      
      <div className="flex flex-1 justify-end gap-8">
        <nav className="flex items-center gap-9">
          <Link href="/" className={getLinkClassName('/')}>
            Home
          </Link>
          <Link href="/compare" className={getLinkClassName('/compare')}>
            Compare Cities
          </Link>
          <Link href="/budget" className={getLinkClassName('/budget')}>
            Budget Planner
          </Link>
          <Link href="/scholarships" className={getLinkClassName('/scholarships')}>
            Scholarships
          </Link>
          <Link href="/community" className={getLinkClassName('/community')}>
            Community
          </Link>
          {user && (
            <Link href="/profile" className={getLinkClassName('/profile')}>
              Profile
            </Link>
          )}
        </nav>
        
        <div className="flex gap-2">
          <Link 
            href="/plan-journey"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#13a4ec] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#1192d4] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#13a4ec] focus:ring-opacity-50"
          >
            <span className="truncate">Plan My Journey</span>
          </Link>
          {user ? (
            <Link 
              href="/profile" 
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7eff3] text-[#0d171b] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#d1e7f1] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#e7eff3] focus:ring-opacity-50"
            >
              <span className="truncate">Profile</span>
            </Link>
          ) : (
            <Link 
              href="/login" 
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7eff3] text-[#0d171b] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#d1e7f1] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#e7eff3] focus:ring-opacity-50"
            >
              <span className="truncate">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;