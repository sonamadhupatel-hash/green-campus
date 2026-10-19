import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Layers, 
  Calendar, 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  PlusCircle, 
  Sparkles, 
  ArrowRight,
  BookmarkCheck,
  Search,
  Filter
} from 'lucide-react';
import { Project, Activity } from '../types';

export const ProjectsPage: React.FC = () => {
  const { 
    projects, 
    activities, 
    registrations, 
    openModal, 
    navigateTo 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'projects' | 'activities'>('activities');
  const [projectStatusFilter, setProjectStatusFilter] = useState<'All' | 'Completed' | 'Ongoing' | 'Planned'>('All');
  const [activitySearch, setActivitySearch] = useState('');

  // Filtered projects
  const filteredProjects = projects.filter((p) => {
    if (projectStatusFilter === 'All') return true;
    return p.status === projectStatusFilter;
  });

  // Filtered activities
  const filteredActivities = activities.filter((a) => {
    return (
      a.title.toLowerCase().includes(activitySearch.toLowerCase()) ||
      a.location.toLowerCase().includes(activitySearch.toLowerCase()) ||
      a.category.toLowerCase().includes(activitySearch.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Title & Context Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-800 text-xs font-semibold rounded-md">
            <Layers className="w-3.5 h-3.5" />
            <span>Pillars: SHOW & PARTICIPATE</span>
          </div>
          <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight">
            Projects & Green Activities
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Distinguishing large-scale institutional infrastructure projects (solar microgrids, rainwater cistern networks) from scheduled student volunteer activities.
          </p>
        </div>

        {/* Action Button to Submit Student Work */}
        <button
          onClick={() => openModal('contribution')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Log Work / Submit Contribution</span>
        </button>
      </div>

      {/* Primary Section Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('activities')}
          className={`py-3 px-5 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'activities'
              ? 'border-emerald-600 text-emerald-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Section B: Green Activities & Drives</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">
            {activities.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`py-3 px-5 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'border-emerald-600 text-emerald-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Section A: Campus Capital Projects</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-800 font-mono">
            {projects.length}
          </span>
        </button>
      </div>

      {/* ================= SECTION B: GREEN ACTIVITIES ================= */}
      {activeTab === 'activities' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Subheader Toolbar & My Registrations Drawer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search activities by name or location..."
                value={activitySearch}
                onChange={(e) => setActivitySearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>

            <div className="text-xs text-neutral-500 flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-emerald-700" />
              <span>You have joined: <strong>{registrations.length}</strong> activity {registrations.length === 1 ? '' : 'ies'} in this demo session</span>
            </div>
          </div>

          {/* User's Demo Registrations Banner if registered */}
          {registrations.length > 0 && (
            <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1.5">
                <BookmarkCheck className="w-4 h-4 text-emerald-700" />
                <span>My Active Event Passes (Demo Records)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {registrations.map((reg) => (
                  <div key={reg.id} className="p-3 bg-white rounded-xl border border-emerald-100 text-xs shadow-2xs">
                    <div className="font-bold text-neutral-900 truncate mb-1">{reg.activityTitle}</div>
                    <div className="text-neutral-500 text-[11px]">Pass for: {reg.studentName}</div>
                    <div className="text-emerald-700 text-[11px] font-mono mt-1">Confirmed · Pass #{reg.id.slice(-6)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((act) => {
              const spotsLeft = act.capacity - act.registeredCount;
              const hasJoined = registrations.some((r) => r.activityId === act.id);

              return (
                <div
                  key={act.id}
                  className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                      <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                        {act.category}
                      </span>
                      <span className={`tabular-nums font-mono font-medium ${
                        spotsLeft <= 5 ? 'text-amber-700 font-bold' : 'text-neutral-600'
                      }`}>
                        {spotsLeft > 0 ? `${spotsLeft} seats remaining` : 'Full capacity'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-neutral-900 mb-2 leading-snug">
                      {act.title}
                    </h3>

                    <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                      {act.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral-100 pt-3 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{act.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{act.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{act.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-500 text-[11px] pt-1">
                        <Users className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span>Organized by {act.organizer}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {hasJoined ? (
                      <div className="w-full py-2.5 px-3 bg-emerald-100/80 text-emerald-900 rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>You are Registered</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => openModal('register', act)}
                        disabled={spotsLeft <= 0}
                        className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          spotsLeft > 0
                            ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                            : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                        }`}
                      >
                        {spotsLeft > 0 ? 'Join Activity (+15 Eco Pts)' : 'Capacity Reached'}
                      </button>
                    )}

                    <button
                      onClick={() => openModal('contribution')}
                      className="w-full py-1.5 text-[11px] font-medium text-neutral-600 hover:text-emerald-800 hover:underline text-center cursor-pointer"
                    >
                      Completed work? Submit Proof
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Student Contribution Callout Banner */}
          <div className="bg-emerald-900 text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Student Work Registry</span>
              </div>
              <h3 className="text-xl font-bold">Have you planted trees or joined a campus clean-up?</h3>
              <p className="text-xs text-emerald-200 max-w-xl leading-relaxed">
                Log your completed activities, upload optional proof photos, and contribute to the college green dashboard while earning demo achievement badges.
              </p>
            </div>
            <button
              onClick={() => openModal('contribution')}
              className="px-6 py-3 bg-white text-emerald-950 hover:bg-emerald-100 rounded-lg text-xs font-bold shadow-md transition-colors shrink-0 cursor-pointer"
            >
              Submit Student Contribution
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION A: CAMPUS CAPITAL PROJECTS ================= */}
      {activeTab === 'projects' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Status Filter */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-neutral-100 rounded-xl w-fit">
            {(['All', 'Completed', 'Ongoing', 'Planned'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setProjectStatusFilter(status)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  projectStatusFilter === status
                    ? 'bg-white text-emerald-950 font-semibold shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {status} Projects
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 w-full bg-neutral-100 relative overflow-hidden">
                    <img
                      src={proj.imageUrl}
                      alt={proj.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md px-2.5 py-0.5 rounded text-xs font-semibold text-emerald-300">
                      {proj.category}
                    </div>
                    <div className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[11px] font-semibold ${
                      proj.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      proj.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {proj.status}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-xs text-neutral-400 font-medium mb-1">
                      Timeline: {proj.timeline}
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 mb-2 leading-snug">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed mb-4">
                      {proj.objective}
                    </p>

                    <div className="space-y-1 mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">Execution Progress</span>
                        <span className="font-mono font-semibold text-emerald-700">{proj.progressPercent}%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-600 rounded-full"
                          style={{ width: `${proj.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-xs text-emerald-900">
                      <strong className="block text-[11px] uppercase tracking-wider text-emerald-950 mb-0.5">
                        {proj.impactType === 'Actual' ? 'Audited Realized Impact' : 'Projected Environmental Impact'}
                      </strong>
                      <p className="leading-relaxed">{proj.impactStatement}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-neutral-100 mt-2">
                  <button
                    onClick={() => openModal('project_detail', proj)}
                    className="w-full py-2 text-xs font-semibold text-emerald-800 hover:text-white bg-emerald-50 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                  >
                    View Project Details
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
