export type PageRoute = 
  | 'home' 
  | 'about' 
  | 'initiatives' 
  | 'projects' 
  | 'dashboard' 
  | 'resources' 
  | 'quiz' 
  | 'contact'
  | 'auth';

export interface Initiative {
  id: string;
  title: string;
  category: 'Energy' | 'Waste' | 'Water' | 'Transport' | 'Biodiversity';
  description: string;
  environmentalBenefits: string[];
  status: 'Active' | 'Expanding' | 'Established';
  impactMetric: string;
  campusLocation: string;
  imageUrl: string;
  keyHighlights: string[];
}

export interface Project {
  id: string;
  name: string;
  category: 'Energy' | 'Water' | 'Waste' | 'Biodiversity' | 'Policy';
  status: 'Planned' | 'Ongoing' | 'Completed';
  objective: string;
  description: string;
  impactStatement: string;
  impactType: 'Actual' | 'Expected';
  imageUrl: string;
  timeline: string;
  progressPercent: number;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: number;
  registeredCount: number;
  category: 'Plantation' | 'Clean-up' | 'Recycling' | 'Workshop' | 'Awareness' | 'Transport';
  organizer: string;
}

export interface Registration {
  id: string;
  activityId: string;
  activityTitle: string;
  studentName: string;
  studentEmail: string;
  studentDepartment?: string;
  registeredAt: string;
}

export interface StudentContribution {
  id: string;
  studentName: string;
  studentEmail: string;
  activityId: string;
  activityTitle: string;
  title: string;
  description: string;
  imageUrl?: string;
  submittedAt: string;
  isDemoRecord: true;
}

export interface StudentIdea {
  id: string;
  title: string;
  description: string;
  category: 'Energy' | 'Water' | 'Waste' | 'Transportation' | 'Biodiversity' | 'Campus Infrastructure' | 'Other';
  expectedBenefit: string;
  studentName: string;
  submittedAt: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Implemented';
  upvotes: number;
}

export interface QuizQuestion {
  id: string;
  topic: 'Recycling & Waste' | 'Renewable Energy' | 'Water Conservation' | 'Climate Change' | 'Biodiversity' | 'Sustainable Transport' | 'Campus Practices';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizAttempt {
  id: string;
  timestamp: string;
  topic: string;
  score: number;
  total: number;
  percentage: number;
  userAnswers: { questionId: string; selectedIndex: number; isCorrect: boolean }[];
}

export interface EcoBadge {
  id: string;
  name: string;
  description: string;
  thresholdPoints: number;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  category: 'General Inquiry' | 'Campus Eco-Club' | 'Report Issue' | 'Suggest Collaboration';
  message: string;
  submittedAt: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  ecoPoints: number;
  createdAt: string;
}
