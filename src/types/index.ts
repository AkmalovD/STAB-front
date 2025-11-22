// Core types for the Study Abroad Planner application

export interface City {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
  flag: string;
  costOfLiving: string;
  costs: CityLivingCosts;
  costBreakdown: CostBreakdown;
  metadata?: CityMetadata;
}

export interface CostBreakdown {
  housing: number;
  food: number;
  transport: number;
  entertainment: number;
  utilities: number;
}

export interface CityLivingCosts {
  rent: string;
  food: string;
  transport: string;
  tuition: string;
}

export interface CityMetadata {
  population?: number;
  climate?: string;
  language?: string;
  currency?: string;
  timezone?: string;
  studentPopulation?: number;
}

export interface University {
  id: string;
  name: string;
  cityId: string;
  ranking?: number;
  programs: string[];
  tuitionFees: {
    domestic: string;
    international: string;
  };
  requirements: {
    gpa: number;
    languageTest?: LanguageRequirement;
  };
}

export interface LanguageRequirement {
  type: 'IELTS' | 'TOEFL' | 'PTE' | 'Cambridge';
  minimumScore: number;
}

export interface CurrencyConversion {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  convertedAmount: string;
}

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Component Props Types
export interface CityCardProps {
  city: City;
  isSelected: boolean;
  onSelect: () => void;
}

export interface CostBreakdownProps {
  cities: City[];
}

export interface CurrencyConverterProps {
  className?: string;
}

export interface VisualComparisonProps {
  cities: City[];
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Utility Types
export type ComparisonMetric = 'cost' | 'quality' | 'safety' | 'lifestyle';

export interface ComparisonData {
  cityId: string;
  metric: ComparisonMetric;
  value: number;
  label: string;
}

// Form Types
export interface SearchFormData {
  query: string;
  filters: {
    country?: string;
    budgetRange?: [number, number];
    programType?: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export type CityListResponse = ApiResponse<City[]>;
export type UniversityListResponse = ApiResponse<University[]>;

// Scholarship Types
export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  country: string;
  amount: string;
  coverage: 'Full' | 'Partial' | 'Tuition Only' | 'Variable';
  deadline: string;
  studyLevel: 'Undergraduate' | 'Masters' | 'PhD' | 'All Levels';
  fieldOfStudy: string[];
  eligibleCountries: string[];
  description: string;
  requirements: string[];
  applicationUrl: string;
  difficulty: 'Easy' | 'Moderate' | 'Competitive' | 'Highly Competitive';
}

export interface ScholarshipFilters {
  country?: string;
  studyLevel?: string;
  coverage?: string;
  fieldOfStudy?: string;
  searchQuery?: string;
}

// Community Types
export interface StudentStory {
  id: string;
  studentName: string;
  studentPhoto: string;
  country: string;
  university: string;
  program: string;
  year: number;
  story: string;
  budget: string;
  scholarship: string;
  tips: string[];
  likes: number;
  comments: number;
}

export interface ForumPost {
  id: string;
  author: string;
  authorPhoto: string;
  title: string;
  content: string;
  category: string;
  country: string;
  timestamp: Date;
  views: number;
  replies: number;
  likes: number;
  answered: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'Virtual' | 'Webinar' | 'Workshop' | 'Meetup';
  date: Date;
  time: string;
  organizer: string;
  attendees: number;
  capacity: number;
  isRegistered: boolean;
  imageUrl: string;
}

// Journey Planner Types
export interface JourneyProfile {
  name: string;
  targetCountry: string;
  studyLevel: 'Undergraduate' | 'Masters' | 'PhD' | 'Language Course';
  startDate: Date;
  createdAt: Date;
  fullName: string;
  destinationCountry: string;
  intendedStartDate: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
}

export interface Phase {
  id: string;
  number: number;
  title: string;
  description: string;
  timeframe: string;
  status: 'completed' | 'in-progress' | 'not-started' | 'locked';
  tasks: Task[];
  icon: string;
}

export interface Document {
  id: string;
  name: string;
  category: string;
  status: 'ready' | 'in-progress' | 'missing';
  required: boolean;
  expiryDate?: Date;
}

// User Profile Types
export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  dateOfBirth?: string;
  location?: string;
  university?: string;
  major?: string;
  studyDestination?: string;
  targetUniversity?: string;
  budget?: string;
  startDate?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}