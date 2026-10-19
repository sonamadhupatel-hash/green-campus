/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { ModalContainer } from './components/ModalContainer';

// 8 Connected Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { InitiativesPage } from './pages/InitiativesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { DashboardPage } from './pages/DashboardPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { QuizPage } from './pages/QuizPage';
import { ContactPage } from './pages/ContactPage';
import { AuthPage } from './pages/AuthPage';

const AppContent: React.FC = () => {
  const { currentRoute } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-800 selection:bg-emerald-200 selection:text-emerald-950 font-sans">
      {/* Top 3-Zone Navigation Bar */}
      <Navbar />

      {/* Main Connected Route View */}
      <main className="flex-1 w-full">
        {currentRoute === 'home' && <HomePage />}
        {currentRoute === 'about' && <AboutPage />}
        {currentRoute === 'initiatives' && <InitiativesPage />}
        {currentRoute === 'projects' && <ProjectsPage />}
        {currentRoute === 'dashboard' && <DashboardPage />}
        {currentRoute === 'resources' && <ResourcesPage />}
        {currentRoute === 'quiz' && <QuizPage />}
        {currentRoute === 'contact' && <ContactPage />}
        {currentRoute === 'auth' && <AuthPage />}
      </main>

      {/* Unified Footer */}
      <Footer />

      {/* Floating Notifications & Interactive Modal Dialogs */}
      <ToastContainer />
      <ModalContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
