import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PageRoute, 
  Initiative, 
  Project, 
  Activity, 
  Registration, 
  StudentContribution, 
  StudentIdea, 
  QuizAttempt, 
  EcoBadge, 
  ContactMessage,
  AuthUser
} from '../types';
import { 
  INITIAL_INITIATIVES, 
  INITIAL_PROJECTS, 
  INITIAL_BADGES
} from '../data/mockData';
import { api, ApiError, getToken, setToken } from '../api';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  currentRoute: PageRoute;
  navigateTo: (route: PageRoute) => void;
  initiatives: Initiative[];
  projects: Project[];
  activities: Activity[];
  registrations: Registration[];
  contributions: StudentContribution[];
  ideas: StudentIdea[];
  upvotedIdeaIds: string[];
  quizAttempts: QuizAttempt[];
  ecoBadges: EcoBadge[];
  ecoPoints: number;
  toasts: Toast[];
  removeToast: (id: string) => void;
  showToast: (type: 'success' | 'info' | 'error', title: string, message: string) => void;
  
  user: AuthUser | null;
  authLoading: boolean;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;

  // Actions
  registerForActivity: (activityId: string, studentName: string, studentEmail: string, department?: string) => Promise<{ success: boolean; message: string }>;
  isRegisteredForActivity: (activityId: string, email?: string) => boolean;
  submitContribution: (data: Omit<StudentContribution, 'id' | 'submittedAt' | 'isDemoRecord'>) => Promise<{ success: boolean; message: string }>;
  submitIdea: (data: { title: string; description: string; category: StudentIdea['category']; expectedBenefit: string; studentName: string }) => Promise<{ success: boolean; message: string }>;
  toggleUpvoteIdea: (ideaId: string) => Promise<void>;
  recordQuizAttempt: (topic: string, score: number, total: number, userAnswers: { questionId: string; selectedIndex: number; isCorrect: boolean }[]) => Promise<void>;
  submitContactMessage: (name: string, email: string, category: ContactMessage['category'], message: string) => Promise<{ success: boolean; message: string; reference?: string }>;
  resetDemoData: () => void; // now: reload latest data from the server
  
  // Active modals
  activeModal: { type: 'register' | 'contribution' | 'idea' | 'initiative_detail' | 'project_detail' | 'viva_docs' | null; data?: any };
  openModal: (type: 'register' | 'contribution' | 'idea' | 'initiative_detail' | 'project_detail' | 'viva_docs', data?: any) => void;
  closeModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const VALID_ROUTES: PageRoute[] = ['home', 'about', 'initiatives', 'projects', 'dashboard', 'resources', 'quiz', 'contact', 'auth'];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() => {
    const hash = window.location.hash.replace('#', '') as PageRoute;
    return VALID_ROUTES.includes(hash) ? hash : 'home';
  });

  const [initiatives] = useState<Initiative[]>(INITIAL_INITIATIVES);
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);

  // Everything below now comes from the backend database
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [contributions, setContributions] = useState<StudentContribution[]>([]);
  const [ideas, setIdeas] = useState<StudentIdea[]>([]);
  const [upvotedIdeaIds, setUpvotedIdeaIds] = useState<string[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const ecoPoints = user?.ecoPoints ?? 0;

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [activeModal, setActiveModal] = useState<{ 
    type: 'register' | 'contribution' | 'idea' | 'initiative_detail' | 'project_detail' | 'viva_docs' | null; 
    data?: any 
  }>({ type: null });

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showToast = (type: 'success' | 'info' | 'error', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => removeToast(id), 4500);
  };

  const errMsg = (e: unknown) => (e instanceof ApiError ? e.message : 'Something went wrong. Please try again.');

  // ---- Load all data from the server (and the logged-in user's private data) ----
  const loadAll = async () => {
    try {
      const d = await api('/bootstrap');
      setUser(d.user);
      setActivities(d.activities);
      setContributions(d.contributions);
      setIdeas(d.ideas);
      setRegistrations(d.registrations);
      setQuizAttempts(d.quizAttempts);
      setUpvotedIdeaIds(d.upvotedIdeaIds);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) setToken(null);
      showToast('error', 'Server unavailable', errMsg(e));
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Routing ----
  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      if (VALID_ROUTES.includes(hash)) setCurrentRoute(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const ecoBadges: EcoBadge[] = INITIAL_BADGES.map((b) => ({ ...b, unlocked: ecoPoints >= b.thresholdPoints }));

  const openModal = (type: 'register' | 'contribution' | 'idea' | 'initiative_detail' | 'project_detail' | 'viva_docs', data?: any) => {
    setActiveModal({ type, data });
  };
  const closeModal = () => setActiveModal({ type: null });

  // ---- Auth ----
  const register = async (name: string, email: string, password: string) => {
    try {
      const d = await api('/auth/register', { body: { name, email, password } });
      setToken(d.token);
      await loadAll();
      showToast('success', 'Account created!', `Welcome to Green Campus, ${d.user.name}.`);
      return { success: true, message: 'Account created.' };
    } catch (e) {
      return { success: false, message: errMsg(e) };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const d = await api('/auth/login', { body: { email, password } });
      setToken(d.token);
      await loadAll();
      showToast('success', 'Logged in', `Welcome back, ${d.user.name}.`);
      return { success: true, message: 'Logged in.' };
    } catch (e) {
      return { success: false, message: errMsg(e) };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRegistrations([]);
    setQuizAttempts([]);
    setUpvotedIdeaIds([]);
    loadAll();
    showToast('info', 'Logged out', 'You have been signed out.');
  };

  // ---- Activity registration ----
  const registerForActivity = async (activityId: string, studentName: string, studentEmail: string, department?: string) => {
    try {
      const d = await api(`/activities/${activityId}/register`, { body: { studentName, studentEmail, department } });
      // Only keep it in "my registrations" if this browser's logged-in user (or guest session) made it
      setRegistrations((prev) => [d.registration, ...prev]);
      setActivities((prev) => prev.map((a) => (a.id === activityId ? d.activity : a)));
      if (d.user) setUser(d.user);
      showToast('success', 'Registration Confirmed!', `You have joined "${d.activity.title}".${d.user ? ' Earned +15 Eco Points!' : ''}`);
      return { success: true, message: 'Registered.' };
    } catch (e) {
      return { success: false, message: errMsg(e) };
    }
  };

  const isRegisteredForActivity = (activityId: string, email?: string) => {
    if (!email) return registrations.some((r) => r.activityId === activityId);
    return registrations.some((r) => r.activityId === activityId && r.studentEmail.toLowerCase() === email.toLowerCase());
  };

  // ---- Contributions ----
  const submitContribution = async (data: Omit<StudentContribution, 'id' | 'submittedAt' | 'isDemoRecord'>) => {
    try {
      const d = await api('/contributions', { body: data });
      setContributions((prev) => [d.contribution, ...prev]);
      if (d.user) setUser(d.user);
      showToast('success', 'Contribution Logged!', `Thank you ${data.studentName}! "${data.title}" was saved.${d.user ? ' (+25 Eco Points)' : ''}`);
      return { success: true, message: 'Saved.' };
    } catch (e) {
      return { success: false, message: errMsg(e) };
    }
  };

  // ---- Ideas ----
  const submitIdea = async (data: { title: string; description: string; category: StudentIdea['category']; expectedBenefit: string; studentName: string }) => {
    try {
      const d = await api('/ideas', { body: data });
      setIdeas((prev) => [d.idea, ...prev]);
      if (user) setUpvotedIdeaIds((prev) => [...prev, d.idea.id]);
      if (d.user) setUser(d.user);
      showToast('success', 'Green Idea Submitted!', `"${data.title}" has been published for peer review.${d.user ? ' (+20 Eco Points)' : ''}`);
      return { success: true, message: 'Saved.' };
    } catch (e) {
      return { success: false, message: errMsg(e) };
    }
  };

  const toggleUpvoteIdea = async (ideaId: string) => {
    if (!user) {
      showToast('info', 'Login required', 'Please log in or create an account to vote on ideas.');
      navigateTo('auth');
      return;
    }
    try {
      const d = await api(`/ideas/${ideaId}/upvote`, { method: 'POST', body: {} });
      setIdeas((prev) => prev.map((i) => (i.id === ideaId ? d.idea : i)));
      setUpvotedIdeaIds((prev) => (d.upvoted ? [...prev, ideaId] : prev.filter((id) => id !== ideaId)));
      showToast(d.upvoted ? 'success' : 'info', d.upvoted ? 'Proposal Supported!' : 'Vote Removed', d.upvoted ? 'Thank you for endorsing this proposal.' : 'You retracted your vote.');
    } catch (e) {
      showToast('error', 'Vote failed', errMsg(e));
    }
  };

  // ---- Quiz ----
  const recordQuizAttempt = async (topic: string, score: number, total: number, userAnswers: { questionId: string; selectedIndex: number; isCorrect: boolean }[]) => {
    if (!user) {
      showToast('info', 'Log in to save scores', 'Create an account to keep your quiz history and earn Eco Points.');
      return;
    }
    try {
      const d = await api('/quiz-attempts', { body: { topic, score, total, userAnswers } });
      setQuizAttempts((prev) => [d.attempt, ...prev]);
      setUser(d.user);
      showToast('success', 'Quiz Completed!', `Scored ${score}/${total} (${d.attempt.percentage}%). Earned +${d.earnedPoints} Eco Points!`);
    } catch (e) {
      showToast('error', 'Could not save quiz', errMsg(e));
    }
  };

  // ---- Contact ----
  const submitContactMessage = async (name: string, email: string, category: ContactMessage['category'], message: string) => {
    try {
      const d = await api('/contact', { body: { name, email, category, message } });
      showToast('success', 'Message sent', `Thank you, ${name}. Reference #${d.reference}.`);
      return { success: true, message: 'Sent.', reference: d.reference as string };
    } catch (e) {
      return { success: false, message: errMsg(e) };
    }
  };

  // Kept under the old name so existing buttons still work: reloads fresh data from the DB
  const resetDemoData = () => {
    loadAll();
    showToast('info', 'Data refreshed', 'Latest data reloaded from the database.');
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigateTo,
        initiatives,
        projects,
        activities,
        registrations,
        contributions,
        ideas,
        upvotedIdeaIds,
        quizAttempts,
        ecoBadges,
        ecoPoints,
        user,
        authLoading,
        register,
        login,
        logout,
        toasts,
        removeToast,
        showToast,
        registerForActivity,
        isRegisteredForActivity,
        submitContribution,
        submitIdea,
        toggleUpvoteIdea,
        recordQuizAttempt,
        submitContactMessage,
        resetDemoData,
        activeModal,
        openModal,
        closeModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
