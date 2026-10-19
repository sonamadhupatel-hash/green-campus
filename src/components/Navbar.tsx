import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageRoute } from '../types';
import { 
  Leaf, 
  Menu, 
  X, 
  Award, 
  CalendarCheck, 
  RotateCcw,
  BookOpen,
  UserCircle,
  LogOut
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentRoute, navigateTo, ecoPoints, registrations, resetDemoData, openModal, user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { route: PageRoute; label: string }[] = [
    { route: 'home', label: 'Home' },
    { route: 'about', label: 'About' },
    { route: 'initiatives', label: 'Initiatives' },
    { route: 'projects', label: 'Projects & Activities' },
    { route: 'dashboard', label: 'Dashboard' },
    { route: 'resources', label: 'Resources & Ideas' },
    { route: 'quiz', label: 'Eco Quiz' },
    { route: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (route: PageRoute) => {
    navigateTo(route);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Notification / Demo Ribbon */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-semibold text-emerald-300">College Sustainability Hub</span>
            <span aria-hidden="true" className="text-emerald-500 hidden sm:inline">·</span>
            <span className="text-emerald-200/80 hidden sm:inline">SHOW · PARTICIPATE · INITIATE</span>
          </div>
          
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => openModal('viva_docs')}
              className="flex items-center gap-1.5 text-xs text-emerald-200 hover:text-white transition-colors cursor-pointer"
              title="View Viva Preparation & Architecture Guide"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline font-medium">Viva & Docs</span>
            </button>

            <span aria-hidden="true" className="text-emerald-700">|</span>

            <div className="flex items-center gap-1 text-emerald-200">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span className="tabular-nums font-semibold text-white">{ecoPoints}</span>
              <span className="text-[11px] text-emerald-300/90">Pts</span>
            </div>

            <button
              onClick={() => {
                if (window.confirm('Reload the latest data from the database?')) {
                  resetDemoData();
                }
              }}
              className="text-emerald-300 hover:text-amber-200 transition-colors text-[11px] flex items-center gap-1 cursor-pointer"
              title="Refresh data"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Bar (adheres to 3-zone contract) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left text-neutral-900 group cursor-pointer shrink-0"
            aria-label="Green Campus Home"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-neutral-900 leading-tight">
                Green Campus
              </span>
              <span className="text-[11px] font-medium text-emerald-700 tracking-wide">
                Sustainability Platform
              </span>
            </div>
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-600 shrink-0">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`relative py-1 whitespace-nowrap transition-colors cursor-pointer ${
                    isActive 
                      ? 'text-emerald-800 font-semibold' 
                      : 'hover:text-emerald-700 text-neutral-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <div className="hidden md:flex items-center gap-2 text-sm text-neutral-700">
                <UserCircle className="w-5 h-5 text-emerald-700" />
                <span className="font-medium max-w-[110px] truncate">{user.name}</span>
                <button onClick={logout} title="Log out" className="p-1.5 text-neutral-500 hover:text-red-600 cursor-pointer">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('auth')}
                className="hidden md:inline-flex px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 rounded-lg cursor-pointer whitespace-nowrap"
              >
                Log in / Sign up
              </button>
            )}
            <button
              onClick={() => handleNavClick('projects')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs hover:shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Explore Activities</span>
              {registrations.length > 0 && (
                <span className="ml-1 text-xs px-1.5 py-0.2 bg-emerald-900/60 rounded-full font-mono">
                  {registrations.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-emerald-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 px-3 py-1">
              Navigation Menu
            </div>
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
                </button>
              );
            })}

            <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
              {user ? (
                <button onClick={() => { setMobileMenuOpen(false); logout(); }} className="w-full text-center px-4 py-2.5 text-sm font-semibold text-neutral-700 bg-neutral-100 rounded-lg">
                  Log out ({user.name})
                </button>
              ) : (
                <button onClick={() => handleNavClick('auth')} className="w-full text-center px-4 py-2.5 text-sm font-semibold text-emerald-800 bg-emerald-50 rounded-lg">
                  Log in / Sign up
                </button>
              )}
              <button
                onClick={() => handleNavClick('projects')}
                className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
              >
                Explore Activities ({registrations.length} Joined)
              </button>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal('viva_docs');
                }}
                className="w-full text-center px-4 py-2 text-sm font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg"
              >
                Viva Prep & Architecture Guide
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
