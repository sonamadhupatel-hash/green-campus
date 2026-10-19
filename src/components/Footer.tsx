import React from 'react';
import { useApp } from '../context/AppContext';
import { PageRoute } from '../types';
import { 
  Leaf, 
  ArrowUp, 
  RotateCcw, 
  BookOpen, 
  Globe, 
  Mail, 
  MapPin, 
  Phone,
  ShieldCheck
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, resetDemoData, openModal } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { route: PageRoute; label: string }[] = [
    { route: 'home', label: 'Home' },
    { route: 'about', label: 'About & Objectives' },
    { route: 'initiatives', label: 'Green Initiatives' },
    { route: 'projects', label: 'Projects & Activities' },
    { route: 'dashboard', label: 'Green Dashboard' },
    { route: 'resources', label: 'Resources & Ideas' },
    { route: 'quiz', label: 'Eco Quiz' },
    { route: 'contact', label: 'Contact & Feedback' },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Col 1: Brand & Three Pillars */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-neutral-950 flex items-center justify-center font-bold">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight">Green Campus</span>
            </div>
            
            <p className="text-sm text-neutral-400 leading-relaxed">
              A student-driven digital environmental platform bridging campus sustainability achievements, volunteer participation, and youth green innovation.
            </p>

            <div className="pt-2">
              <div className="text-xs uppercase tracking-wider font-semibold text-emerald-400 mb-2">
                Three Pillars Framework
              </div>
              <ul className="text-xs space-y-1.5 text-neutral-400">
                <li className="flex items-center gap-2">
                  <span className="font-semibold text-neutral-200">SHOW:</span>
                  <span>Campus achievements & audits</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold text-neutral-200">PARTICIPATE:</span>
                  <span>Tree drives, clean-ups & workshops</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold text-neutral-200">INITIATE:</span>
                  <span>Propose new sustainability policies</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Platform Routes
            </h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.route}>
                  <button
                    onClick={() => navigateTo(link.route)}
                    className="hover:text-emerald-400 transition-colors text-neutral-400 hover:underline cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Sustainability Governance & SDGs */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              UN SDG Commitments
            </h3>
            <div className="space-y-3 text-xs text-neutral-400">
              <div className="p-3 bg-neutral-800/70 rounded-lg border border-neutral-700/60">
                <div className="font-semibold text-emerald-400 mb-0.5">SDG 12: Responsible Consumption</div>
                <p>Campus source waste segregation, zero-plastic policy, e-waste recovery and student barter kiosks.</p>
              </div>
              <div className="p-3 bg-neutral-800/70 rounded-lg border border-neutral-700/60">
                <div className="font-semibold text-emerald-400 mb-0.5">SDG 13: Climate Action</div>
                <p>350 kWp solar array, active campus bike-transit, and energy efficiency benchmarking.</p>
              </div>
              <div className="p-3 bg-neutral-800/70 rounded-lg border border-neutral-700/60">
                <div className="font-semibold text-emerald-400 mb-0.5">SDG 15: Life on Land</div>
                <p>1,850+ native saplings planted, botanical sanctuary, and pollinator garden preservation.</p>
              </div>
            </div>
          </div>

          {/* Col 4: Campus Liaison & Viva Help */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Sustainability Office
            </h3>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Room 104, Environmental Sciences Building, University Campus</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>greencampus@college.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+1 (555) 234-7890 (Campus Ext. 420)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800 space-y-2">
              <button
                onClick={() => openModal('viva_docs')}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium bg-emerald-800/80 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Project Viva & Architecture Guide</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Reload the latest data from the database?')) {
                    resetDemoData();
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Refresh data</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              Academic Final Year Project Demonstration. Real physical systems are operated by the College Facilities Directorate.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="tabular-nums">© {new Date().getFullYear()} Green Campus</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
