'use client'

import { useAuth } from '@/auth/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Header: React.FC = () => {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const isActiveRoute = (path: string): boolean => {
    return pathname === path;
  };

  const getLinkClassName = (path: string): string => {
    const baseClasses = "text-sm font-medium leading-normal transition-colors duration-200";
    const activeClasses = "text-[#0d98ba] border-b-2 border-[#0d98ba] pb-1";
    const inactiveClasses = "text-[#0d171b] hover:text-[#4c809a]";
    
    return `${baseClasses} ${isActiveRoute(path) ? activeClasses : inactiveClasses}`;
  };

  // TEMPORARY: Show header while loading auth state
  // TODO: Re-enable after fixing Supabase email confirmation
  if (!user) {
    return null;  
  }

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
      
      <nav className="flex flex-1 justify-center items-center gap-9">
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
      </nav>
      
      <div className="flex gap-2 items-center">
          <Link 
            href="/plan-journey"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#0d98ba] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0d98ba] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0d98ba] focus:ring-opacity-50"
          >
            <span className="truncate">Plan My Journey</span>
          </Link>
          {user ? (
            <Link 
              href="/profile" 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0d98ba] text-white font-bold text-sm hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0d98ba] focus:ring-opacity-50 overflow-hidden"
              title={user.user_metadata?.name || user.email || 'Profile'}
            >
              {user.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="User Avatar" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{(user.user_metadata?.name || user.email || 'U').charAt(0).toUpperCase()}</span>
              )}
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
    </header>
  );
};

export default Header;