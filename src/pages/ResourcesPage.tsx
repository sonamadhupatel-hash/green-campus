import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Lightbulb, 
  Sun, 
  Droplet, 
  Recycle, 
  Bike, 
  ChevronDown, 
  ChevronUp, 
  ThumbsUp, 
  Search, 
  PlusCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Filter,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { GREEN_RESOURCES, FAQS } from '../data/mockData';
import { StudentIdea } from '../types';

export const ResourcesPage: React.FC = () => {
  const { 
    ideas, 
    upvotedIdeaIds, 
    toggleUpvoteIdea, 
    openModal 
  } = useApp();

  const [activeSection, setActiveSection] = useState<'resources' | 'ideas'>('ideas');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [ideaCategoryFilter, setIdeaCategoryFilter] = useState<string>('All');
  const [ideaSearch, setIdeaSearch] = useState('');

  const categories = ['All', 'Energy', 'Water', 'Waste', 'Transportation', 'Biodiversity', 'Campus Infrastructure', 'Other'];

  const filteredIdeas = ideas.filter((idea) => {
    const matchesCategory = ideaCategoryFilter === 'All' || idea.category === ideaCategoryFilter;
    const matchesSearch = 
      idea.title.toLowerCase().includes(ideaSearch.toLowerCase()) ||
      idea.description.toLowerCase().includes(ideaSearch.toLowerCase()) ||
      idea.expectedBenefit.toLowerCase().includes(ideaSearch.toLowerCase()) ||
      idea.studentName.toLowerCase().includes(ideaSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-md">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Pillars: INITIATE & KNOWLEDGE</span>
          </div>
          <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight">
            Green Resources & Student Ideas
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Access collegiate environmental playbooks, waste segregation guidelines, and practical dorm tips, or submit and vote on new campus sustainability proposals.
          </p>
        </div>

        <button
          onClick={() => openModal('idea')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Propose New Green Idea</span>
        </button>
      </div>

      {/* Primary Section Switcher */}
      <div className="flex items-center gap-2 border-b border-neutral-200">
        <button
          onClick={() => setActiveSection('ideas')}
          className={`py-3 px-5 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeSection === 'ideas'
              ? 'border-emerald-600 text-emerald-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>Section B: Student Green Idea Portal</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-mono">
            {ideas.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSection('resources')}
          className={`py-3 px-5 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeSection === 'resources'
              ? 'border-emerald-600 text-emerald-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>Section A: Green Resources & FAQs</span>
        </button>
      </div>

      {/* ================= SECTION B: STUDENT GREEN IDEA PORTAL ================= */}
      {activeSection === 'ideas' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Banner & Submission Callout */}
          <div className="p-6 bg-amber-50/70 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-amber-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Crowdsourced Campus Sustainability Ideation
              </h2>
              <p className="text-xs text-amber-900 leading-relaxed max-w-2xl">
                Have an innovative concept to conserve water, save dorm electricity, or recover campus waste? Submit your proposal to gather student endorsements. Top-voted ideas are presented to the College Sustainability Committee.
              </p>
            </div>
            <button
              onClick={() => openModal('idea')}
              className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold shadow-xs shrink-0 cursor-pointer"
            >
              Submit Proposal (+20 Eco Pts)
            </button>
          </div>

          {/* Search & Category Filter Toolbar */}
          <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search proposals by keyword, author or benefit..."
                value={ideaSearch}
                onChange={(e) => setIdeaSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-neutral-50/50"
              />
            </div>

            {/* Category Segmented Control */}
            <div className="flex items-center gap-1 overflow-x-auto p-1 bg-neutral-100 rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setIdeaCategoryFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    ideaCategoryFilter === cat
                      ? 'bg-white text-emerald-950 font-semibold shadow-2xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Ideas Grid */}
          {filteredIdeas.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8">
              <Lightbulb className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
              <h3 className="text-base font-bold text-neutral-900 mb-1">No ideas found in this category</h3>
              <p className="text-xs text-neutral-500 mb-4">
                Be the first student to propose a sustainable innovation here!
              </p>
              <button
                onClick={() => openModal('idea')}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg"
              >
                Submit Proposal
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredIdeas.map((idea) => {
                const hasUpvoted = upvotedIdeaIds.includes(idea.id);

                return (
                  <div
                    key={idea.id}
                    className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                        <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                          {idea.category}
                        </span>
                        
                        {/* Status Label */}
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          idea.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                          idea.status === 'Under Review' ? 'bg-amber-100 text-amber-800' :
                          idea.status === 'Implemented' ? 'bg-teal-100 text-teal-800' :
                          'bg-neutral-100 text-neutral-700'
                        }`}>
                          {idea.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">
                        {idea.title}
                      </h3>

                      <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                        {idea.description}
                      </p>

                      <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/70 text-xs text-neutral-700 space-y-1 mb-4">
                        <span className="font-bold text-[11px] uppercase tracking-wider text-neutral-500 block">
                          Expected Environmental Benefit:
                        </span>
                        <p>{idea.expectedBenefit}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                      <div>
                        <div className="font-semibold text-neutral-800 text-[11px]">{idea.studentName}</div>
                        <div className="text-[10px] text-neutral-400">Proposed: {idea.submittedAt}</div>
                      </div>

                      <button
                        onClick={() => toggleUpvoteIdea(idea.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          hasUpvoted
                            ? 'bg-emerald-700 text-white shadow-2xs'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                        title={hasUpvoted ? 'Retract endorsement' : 'Upvote proposal'}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${hasUpvoted ? 'fill-current' : ''}`} />
                        <span className="font-mono tabular-nums">{idea.upvotes}</span>
                        <span>{hasUpvoted ? 'Supported' : 'Support'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Governance Notice */}
          <div className="p-4 bg-neutral-100 rounded-2xl border border-neutral-200 text-xs text-neutral-600 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              <strong>Administrative Governance Note:</strong> Student upvotes indicate peer support and community prioritization. They do not constitute formal institutional sanction until reviewed and approved by the Faculty Sustainability Council.
            </span>
          </div>

        </div>
      )}

      {/* ================= SECTION A: GREEN RESOURCES & FAQS ================= */}
      {activeSection === 'resources' && (
        <div className="space-y-12 animate-in fade-in duration-200">
          
          {/* 4 Thematic Resource Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GREEN_RESOURCES.map((res) => (
              <div 
                key={res.id} 
                className="bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-xs space-y-4"
              >
                <div className="flex items-center gap-2.5 text-emerald-800">
                  {res.category === 'Energy' && <Sun className="w-5 h-5 text-amber-500" />}
                  {res.category === 'Water' && <Droplet className="w-5 h-5 text-blue-500" />}
                  {res.category === 'Waste' && <Recycle className="w-5 h-5 text-emerald-500" />}
                  {res.category === 'Transport' && <Bike className="w-5 h-5 text-teal-500" />}
                  <h3 className="text-base font-bold text-neutral-900">{res.title}</h3>
                </div>

                <ul className="space-y-2 text-xs text-neutral-600">
                  {res.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Student Practical Action Checklist */}
          <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-10 border border-emerald-800 space-y-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-300">
                Action Checklist
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Everyday Student Green Habits
              </h2>
              <p className="text-xs text-emerald-100/90 mt-1">
                Simple daily changes that compound into megawatts of saved power and thousands of kilograms of diverted landfill trash.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-emerald-950/70 rounded-xl border border-emerald-800 space-y-1">
                <strong className="text-emerald-300 block">Dorm Power Optimization</strong>
                <p className="text-emerald-100/80">Turn off room lights and unplug idle charging bricks when heading to morning lectures.</p>
              </div>
              <div className="p-4 bg-emerald-950/70 rounded-xl border border-emerald-800 space-y-1">
                <strong className="text-emerald-300 block">Personal Refill Habit</strong>
                <p className="text-emerald-100/80">Carry a reusable steel flask to eliminate 140,000+ plastic bottles across campus refilling stations.</p>
              </div>
              <div className="p-4 bg-emerald-950/70 rounded-xl border border-emerald-800 space-y-1">
                <strong className="text-emerald-300 block">Active Commute</strong>
                <p className="text-emerald-100/80">Use the 120 shared campus bicycles instead of motorized two-wheelers for inter-department travel.</p>
              </div>
            </div>
          </div>

          {/* Expandable FAQs Accordion */}
          <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-xs space-y-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">
                Knowledge Base
              </span>
              <h2 className="text-2xl font-bold text-neutral-900 mt-1">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-neutral-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between text-sm font-bold text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-emerald-700 shrink-0 ml-2" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0 ml-2" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3 bg-neutral-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
