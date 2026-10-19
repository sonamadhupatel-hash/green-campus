import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Leaf, 
  Target, 
  Globe2, 
  Users, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sun,
  Lightbulb,
  Award,
  Sparkles
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo, openModal } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-md">
          <Leaf className="w-3.5 h-3.5" />
          <span>Academic Final Year Capstone Project</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight text-balance">
          About the Green Campus Platform
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed text-balance">
          A digital sustainability and student engagement ecosystem designed to make collegiate environmental stewardship visible, actionable, and innovative.
        </p>
      </div>

      {/* 1. What is Green Campus & The Problem Statement */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/90 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              The Reality
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              The Environmental Problem We Address
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Higher education institutions operate as small towns, consuming substantial megawatts of electricity, generating hundreds of tons of cafeteria and packaging waste, and managing extensive land plots.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Yet on most campuses, sustainability efforts remain fragmented. Administrative reports remain locked in internal PDF audits, students are unaware of physical initiatives like solar grids or rainwater systems, and volunteer drives suffer from poor event coordination and duplicate sign-ups.
            </p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-neutral-100 grid grid-cols-2 gap-4 text-xs text-neutral-600">
            <div>
              <strong className="block text-neutral-900 text-sm font-bold">Unseen Efforts</strong>
              Students cannot protect or learn from facilities they do not know exist.
            </div>
            <div>
              <strong className="block text-neutral-900 text-sm font-bold">Untapped Innovation</strong>
              Student environmental ideas rarely reach collegiate decision-makers.
            </div>
          </div>
        </div>

        <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-10 border border-emerald-800 shadow-lg flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              The Solution
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Our College Needs Green Campus
            </h2>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Green Campus replaces disconnected bulletin boards with a centralized digital engagement platform.
            </p>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              By uniting environmental reporting with active volunteer registration and an open innovation portal, the campus transforms from an ordinary consumer of utility power into an interactive <strong>living laboratory for sustainability</strong>.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-emerald-800/80 flex items-center justify-between">
            <div className="text-xs text-emerald-200">
              Built with React, TypeScript & LocalStorage
            </div>
            <button
              onClick={() => openModal('viva_docs')}
              className="text-xs font-semibold text-emerald-300 hover:text-white underline cursor-pointer"
            >
              Read Architecture Docs →
            </button>
          </div>
        </div>
      </section>

      {/* 2. Project Vision & Mission */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 border border-neutral-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-4">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900">Project Vision</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            To create an environmentally literate, climate-conscious collegiate community where campus operations, academic study, and student volunteerism collectively drive tangible progress toward net-zero environmental impact.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-neutral-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold mb-4">
            <Globe2 className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900">Project Mission</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            To deliver an accessible, engaging digital platform that transparently presents campus green metrics (SHOW), streamlines student participation in drives and conservation workshops (PARTICIPATE), and sparks creative student sustainability policies (INITIATE).
          </p>
        </div>
      </section>

      {/* 3. The Three Pillars Detailed */}
      <section className="bg-neutral-50 rounded-3xl p-8 sm:p-12 border border-neutral-200/80">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">
            Architectural Philosophy
          </span>
          <h2 className="text-3xl font-bold text-neutral-900 mt-1">
            The Three Pillars of Engagement
          </h2>
          <p className="text-neutral-600 text-sm mt-2">
            Every feature on Green Campus aligns directly with one of our three core principles:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3 bg-white p-6 rounded-2xl border border-neutral-200">
            <div className="text-emerald-700 font-extrabold text-2xl font-mono">01. SHOW</div>
            <h3 className="text-lg font-bold text-neutral-900">Institutional Transparency</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Provides students, alumni, and prospective scholars with verified metrics on campus renewable generation, waste segregation, water reclamation, and native botanical preservation.
            </p>
            <div className="text-xs text-neutral-500 pt-2 border-t border-neutral-100">
              <strong>Key Features:</strong> 8 Initiatives Catalog, Capital Projects Timeline, Green Dashboard benchmarks.
            </div>
          </div>

          <div className="space-y-3 bg-white p-6 rounded-2xl border border-neutral-200">
            <div className="text-teal-700 font-extrabold text-2xl font-mono">02. PARTICIPATE</div>
            <h3 className="text-lg font-bold text-neutral-900">Direct Student Volunteerism</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Transitions passive observation into physical action. Students register for tree drives, cleanup runs, and soil workshops with capacity limits and work submission tracking.
            </p>
            <div className="text-xs text-neutral-500 pt-2 border-t border-neutral-100">
              <strong>Key Features:</strong> Activity registration with duplicate prevention, Work contribution logging, Eco Points.
            </div>
          </div>

          <div className="space-y-3 bg-white p-6 rounded-2xl border border-neutral-200">
            <div className="text-amber-700 font-extrabold text-2xl font-mono">03. INITIATE</div>
            <h3 className="text-lg font-bold text-neutral-900">Open Youth Innovation</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Allows any student to author sustainability proposals (such as solar study benches or cafeteria pantry kiosks), solicit peer endorsements, and trigger collegiate administrative review.
            </p>
            <div className="text-xs text-neutral-500 pt-2 border-t border-neutral-100">
              <strong>Key Features:</strong> Green Idea Submission Portal, Upvoting with spam prevention, Status workflow tracking.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Expected Benefits for Stakeholders */}
      <section className="space-y-8">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">
            Impact Analysis
          </span>
          <h2 className="text-3xl font-bold text-neutral-900 mt-1">
            Expected Benefits by Stakeholder
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">For Students</h3>
            </div>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Hands-on environmental field experience outside lecture halls.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Verified demo portfolio of green volunteer contributions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Direct voice to propose tangible campus policy improvements.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">For College Management</h3>
            </div>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Centralized dashboard to showcase sustainability investments.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Automated activity registration tracking without paper chaos.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Crowdsourced student solutions that reduce institutional utility bills.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">For the Environment</h3>
            </div>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Lower campus carbon emissions via 350 kWp solar adoption.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Over 50 tons of organic waste diverted from landfill methane release.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Groundwater replenishment and native species habitat restoration.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. UN SDGs Alignment */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/90 shadow-xs space-y-8">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">
            Global Framework
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
            Alignment with UN Sustainable Development Goals
          </h2>
          <p className="text-neutral-600 text-sm mt-1">
            Green Campus operates in direct harmony with the 2030 United Nations Agenda:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-3">
            <div className="text-xs font-mono font-bold text-amber-900 bg-amber-200/60 px-2.5 py-1 rounded-md inline-block">
              UN SDG 12
            </div>
            <h3 className="text-lg font-bold text-amber-950">Responsible Consumption & Production</h3>
            <p className="text-xs text-amber-900 leading-relaxed">
              Addressed through campus cafeteria 3-stream segregation, on-site aerobic composting of food leftovers, e-waste drop days, and single-use plastic elimination.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-3">
            <div className="text-xs font-mono font-bold text-emerald-900 bg-emerald-200/60 px-2.5 py-1 rounded-md inline-block">
              UN SDG 13
            </div>
            <h3 className="text-lg font-bold text-emerald-950">Climate Action</h3>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Addressed through our 350 kWp rooftop solar photovoltaic installations, student active mobility bike-shares, and campus energy conservation audits.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-teal-50/70 border border-teal-200/70 space-y-3">
            <div className="text-xs font-mono font-bold text-teal-900 bg-teal-200/60 px-2.5 py-1 rounded-md inline-block">
              UN SDG 15
            </div>
            <h3 className="text-lg font-bold text-teal-950">Life on Land</h3>
            <p className="text-xs text-teal-900 leading-relaxed">
              Addressed through 1,850+ native saplings planted across 12 hectares, a 2.5-acre botanical sanctuary, and natural pollinator garden preservation.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Honest Transparency & Ethical Scope Disclosure */}
      <section className="bg-neutral-100/90 rounded-2xl p-6 sm:p-8 border border-neutral-300/80 space-y-3">
        <div className="flex items-center gap-2 text-neutral-800 font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          <span>Academic Honesty & Transparency Notice</span>
        </div>
        <p className="text-xs text-neutral-600 leading-relaxed">
          Green Campus is designed and evaluated honestly as a <strong>digital engagement and sustainability management platform</strong>. It connects student volunteers, aggregates environmental data, and facilitates open ideation. It does not claim to automate or physically toggle heavy college utility machinery (such as high-voltage breakers or main water valves), which are safely operated by university facilities engineering personnel.
        </p>
      </section>

      {/* Navigation CTA Strip */}
      <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200">
        <button
          onClick={() => navigateTo('home')}
          className="text-sm font-semibold text-neutral-700 hover:text-emerald-800 cursor-pointer"
        >
          ← Back to Home
        </button>
        <button
          onClick={() => navigateTo('initiatives')}
          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-semibold shadow-xs cursor-pointer flex items-center gap-2"
        >
          <span>Explore Campus Initiatives</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
