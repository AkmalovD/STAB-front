'use client'

import { useAuth } from '@/auth/AuthContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Award, Book, Calendar, Camera, Mail, MapPin, Settings, User } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || 'Student Name',
    email: user?.email || '',
    dateOfBirth: '1998-05-15',
    location: 'Tashkent, Uzbekistan',
    university: 'National University of Uzbekistan',
    major: 'Computer Science',
    studyDestination: 'United Kingdom',
    targetUniversity: 'University of Cambridge',
    budget: '$25,000 - $35,000',
    startDate: 'September 2024',
    bio: 'Aspiring computer scientist passionate about AI and machine learning. Looking to pursue a Master\'s degree abroad.',
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to database
  };

  const handleLogOut = async () => {
    try {
      await logout();
      // Redirect to home or login page after logout
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <ProtectedRoute>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-[#f0f9ff] to-white pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-[#0d98ba] to-[#0d98ba] relative">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          </div>
          
          {/* Profile Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-20 mb-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-40 h-40 rounded-full border-4 border-white bg-gradient-to-br from-[#0d98ba] to-[#0d98ba] flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    profileData.displayName.charAt(0).toUpperCase()
                  )}
                </div>
                <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow group-hover:bg-[#f0f9ff]">
                  <Camera className="w-5 h-5 text-[#0d98ba]" />
                </button>
              </div>

              {/* Name and Actions */}
              <div className="mt-6 md:mt-0 md:ml-8 flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-[#0d171b] mb-2">{profileData.displayName}</h1>
                    <p className="text-[#4c809a] flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {profileData.email}
                    </p>
                  </div>
                  <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="mt-4 md:mt-0 px-6 py-2.5 bg-[#0d98ba] text-white rounded-lg font-medium hover:bg-[#0d98ba] transition-colors shadow-sm hover:shadow-md flex items-center gap-2"
                  >
                    {isEditing ? (
                      <>
                        <span>Save Profile</span>
                      </>
                    ) : (
                      <>
                        <Settings className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mt-6 p-6 bg-[#f0f9ff] rounded-xl">
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="w-full px-4 py-3 border border-[#0d98ba] rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors resize-none"
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-[#0d171b] leading-relaxed">{profileData.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0d171b] mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-[#0d98ba]" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#4c809a] mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors"
                  />
                ) : (
                  <p className="text-[#0d171b] font-medium">{profileData.displayName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4c809a] mb-2">Email</label>
                <p className="text-[#0d171b] font-medium">{profileData.email}</p>
              </div>
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-[#4c809a] mb-2">
                  <Calendar className="w-4 h-4" />
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors"
                  />
                ) : (
                  <p className="text-[#0d171b] font-medium">{new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
                )}
              </div>
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-[#4c809a] mb-2">
                  <MapPin className="w-4 h-4" />
                  Current Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors"
                  />
                ) : (
                  <p className="text-[#0d171b] font-medium">{profileData.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-[#0d171b]">Profile Completion</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-[#0d98ba]">85%</span>
                  </div>
                </div>
                <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-100">
                  <div style={{ width: '85%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#0d98ba] to-[#0d98ba] rounded-full"></div>
                </div>
              </div>
              <p className="mt-4 text-sm text-[#4c809a]">Almost there! Complete your study preferences to get better recommendations.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-[#0d171b] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-[#f0f9ff] text-[#0d98ba] rounded-lg font-medium hover:bg-[#e0f2fe] transition-colors text-left">
                  View My Applications
                </button>
                <button className="w-full px-4 py-3 bg-[#f0f9ff] text-[#0d98ba] rounded-lg font-medium hover:bg-[#e0f2fe] transition-colors text-left">
                  Saved Scholarships
                </button>
                <button className="w-full px-4 py-3 bg-[#f0f9ff] text-[#0d98ba] rounded-lg font-medium hover:bg-[#e0f2fe] transition-colors text-left">
                  My Budget Plans
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#0d171b] mb-6 flex items-center gap-2">
            <Book className="w-6 h-6 text-[#0d98ba]" />
            Academic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#4c809a] mb-2">Current University</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.university}
                  onChange={(e) => handleInputChange('university', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors"
                />
              ) : (
                <p className="text-[#0d171b] font-medium">{profileData.university}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4c809a] mb-2">Major</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.major}
                  onChange={(e) => handleInputChange('major', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors"
                />
              ) : (
                <p className="text-[#0d171b] font-medium">{profileData.major}</p>
              )}
            </div>
          </div>
        </div>

        {/* Study Abroad Plans */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#0d171b] mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-[#0d98ba]" />
            Study Abroad Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#4c809a] mb-2">Target Country</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.studyDestination}
                  onChange={(e) => handleInputChange('studyDestination', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors"
                />
              ) : (
                <p className="text-[#0d171b] font-medium">{profileData.studyDestination}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4c809a] mb-2">Target University</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.targetUniversity}
                  onChange={(e) => handleInputChange('targetUniversity', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors"
                />
              ) : (
                <p className="text-[#0d171b] font-medium">{profileData.targetUniversity}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4c809a] mb-2">Budget Range</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors"
                />
              ) : (
                <p className="text-[#0d171b] font-medium">{profileData.budget}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4c809a] mb-2">Intended Start Date</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors"
                />
              ) : (
                <p className="text-[#0d171b] font-medium">{profileData.startDate}</p>
              )}
            </div>
          </div>
        </div>
        <div className="h-4 mt-6 bg-red-500 rounded-2xl shadow-lg p-8 flex items-center justify-center hover:bg-red-600 transition-colors">
          <button 
            onClick={handleLogOut}
            className="text-white text-2xl font-bold"
          >
            Log Out
          </button>
        </div>
        </div>
      </div>
      <Footer />
    </ProtectedRoute>
  );
}
