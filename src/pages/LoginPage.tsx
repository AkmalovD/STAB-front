'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '@/auth/AuthContext';
import { loginSchema, type LoginFormData } from '@/validators/loginInputSchema';
import { z } from 'zod'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string;}>({})

  const [isLoading, setIsLoading] = useState(false);

  const { login, user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await login(email, password)

    if (result.error) {
      alert(result.error)
    } else {
      window.location.href = '/'
    }
  };

  return (
    <>
      <Header />
      <main className="pt-[85px] min-h-screen bg-[#f8fafc] px-4 md:px-10 lg:px-40 py-10">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-[#0d171b] mb-2 text-center">
              Welcome Back
            </h1>
            <p className="text-[#4c809a] text-center mb-8">
              Sign in to continue your study abroad journey
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#4c809a] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#4c809a] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-[#0d98ba] focus:ring-[#0d98ba] border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-[#4c809a]">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-[#0d98ba] hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-[#0d98ba] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0284c7] transition-colors"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#4c809a]">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-[#f8fafc] transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm font-medium text-[#0d171b]">Google</span>
              </button>

              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-[#f8fafc] transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm font-medium text-[#0d171b]">Facebook</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-sm text-[#4c809a]">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#0d98ba] hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#4c809a]">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-[#0d98ba] hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-[#0d98ba] hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;