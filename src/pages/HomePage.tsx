import React from 'react';
import { useApp } from '../context/AppContext';
import { HeroSlider } from '../components/HeroSlider';
import { 
  Sun, 
  Recycle, 
  Droplet, 
  Bike, 
  Trees, 
  Flower2, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight, 
  Lightbulb, 
  Award, 
  Sparkles, 
  TrendingUp, 
  HelpCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { CAMPUS_STATIC_METRICS } from '../data/mockData';

export const HomePage: React.FC = () => {
  const { 
    navigateTo, 
    initiatives, 
    projects, 
    activities, 
    ideas, 
    registrations, 
    openModal 
  } = useApp();

  const featuredInitiatives = initiatives.slice(0, 6);
  const upcomingActivities = activities.slice(0, 3);
  const featuredProjects = projects.slice(0, 3);
  const recentIdeas = ideas.slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      
      {/* B. HERO IMAGE SLIDER */}
      <HeroSlider />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* C. THREE PILLARS SECTION */}
        <section aria-labelledby="three-pillars-heading">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">
              Core Framework
            </span>
            <h2 id="three-pillars-heading" className="text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
              How Green Campus Works
            </h2>
            <p className="text-neutral-600 text-sm mt-3 text-balance">
              Connecting institutional environmental progress with direct student volunteerism and creative youth innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 1: SHOW */}
            <div className="bg-white rounded-2xl p-7 border border-neutral-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg mb-5 group-hover:scale-105 transition-transform">
                  <Sun className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                  Pillar One
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">SHOW</h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  Discover what the college has already accomplished: audited 350 kWp solar grids, 450,000L rainwater systems, and native biodiversity preservation.
                </p>
              </div>
              <button
                onClick={() => navigateTo('initiatives')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer group-hover:underline"
              >
                <span>View Campus Achievements</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Pillar 2: PARTICIPATE */}
            <div className="bg-white rounded-2xl p-7 border border-neutral-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg mb-5 group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
                  Pillar Two
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">PARTICIPATE</h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  Take active part in scheduled sustainability events: tree plantations, perimeter plogging clean-ups, e-waste drop days, and composting masterclasses.
                </p>
              </div>
              <button
                onClick={() => navigateTo('projects')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors cursor-pointer group-hover:underline"
              >
                <span>Explore Scheduled Activities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Pillar 3: INITIATE */}
            <div className="bg-white rounded-2xl p-7 border border-neutral-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-lg mb-5 group-hover:scale-105 transition-transform">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                  Pillar Three
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">INITIATE</h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  Empowering student minds to submit original environmental proposals, gather peer endorsements, and shape collegiate sustainability policies.
                </p>
              </div>
              <button
                onClick={() => navigateTo('resources')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors cursor-pointer group-hover:underline"
              >
                <span>Propose Green Ideas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </section>

        {/* D. CAMPUS IMPACT STATISTICS */}
        <section aria-labelledby="impact-stats-heading" className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-10 border border-neutral-800 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
                Data & Verification
              </span>
              <h2 id="impact-stats-heading" className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Campus Environmental Benchmark
              </h2>
            </div>
            
            <div className="text-xs text-neutral-400 bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700 self-start sm:self-auto">
              {CAMPUS_STATIC_METRICS.label}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                {CAMPUS_STATIC_METRICS.treesPlanted.toLocaleString()}+
              </div>
              <div className="text-xs text-neutral-400 font-medium">Native Trees Planted</div>
              <div className="text-[11px] text-emerald-400">89% 2-year survival</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                {(CAMPUS_STATIC_METRICS.wasteRecycledKg / 1000).toFixed(1)}k
              </div>
              <div className="text-xs text-neutral-400 font-medium">Kg Waste Recycled</div>
              <div className="text-[11px] text-emerald-400">Cafeteria & e-waste</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                3.2M
              </div>
              <div className="text-xs text-neutral-400 font-medium">Litres Water Saved</div>
              <div className="text-[11px] text-emerald-400">Rainwater harvesting</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                {CAMPUS_STATIC_METRICS.solarCapacityKwp} <span className="text-lg font-normal text-neutral-400">kWp</span>
              </div>
              <div className="text-xs text-neutral-400 font-medium">Solar Array Capacity</div>
              <div className="text-[11px] text-emerald-400">38% daytime load</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                {CAMPUS_STATIC_METRICS.totalEventsOrganized + registrations.length}
              </div>
              <div className="text-xs text-neutral-400 font-medium">Activities & Joins</div>
              <div className="text-[11px] text-emerald-400">Active student body</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                {ideas.length}
              </div>
              <div className="text-xs text-neutral-400 font-medium">Green Ideas Proposed</div>
              <div className="text-[11px] text-emerald-400">Live student registry</div>
            </div>
          </div>
        </section>

        {/* E. FEATURED GREEN INITIATIVES */}
        <section aria-labelledby="featured-initiatives-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">
                Institutional Progress
              </span>
              <h2 id="featured-initiatives-heading" className="text-3xl font-bold text-neutral-900 mt-1">
                Featured Green Initiatives
              </h2>
              <p className="text-neutral-600 text-sm mt-1">
                Broad strategic areas where our college has instituted ongoing sustainable systems.
              </p>
            </div>

            <button
              onClick={() => navigateTo('initiatives')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>View All 8 Initiatives</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredInitiatives.map((init) => (
              <div 
                key={init.id}
                className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 w-full overflow-hidden bg-neutral-100 relative">
                    <img
                      src={init.imageUrl}
                      alt={init.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md px-2.5 py-0.5 rounded text-xs font-semibold text-emerald-300">
                      {init.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-xs text-neutral-500 font-medium mb-1">
                      Status: <span className="text-emerald-700 font-semibold">{init.status}</span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">
                      {init.title}
                    </h3>
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-3">
                      {init.description}
                    </p>
                    <div className="text-xs font-mono font-medium text-emerald-800 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                      {init.impactMetric}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-neutral-100 mt-2">
                  <button
                    onClick={() => openModal('initiative_detail', init)}
                    className="w-full py-2 text-xs font-semibold text-emerald-800 hover:text-white bg-emerald-50 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                  >
                    View Specifications
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* F. UPCOMING ACTIVITIES */}
        <section aria-labelledby="upcoming-activities-heading" className="bg-emerald-50/50 rounded-3xl p-8 sm:p-10 border border-emerald-100">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-800">
                Student Participation
              </span>
              <h2 id="upcoming-activities-heading" className="text-3xl font-bold text-neutral-900 mt-1">
                Upcoming Green Activities
              </h2>
              <p className="text-neutral-600 text-sm mt-1">
                Sign up to join drives on campus. Earn demo points and build community.
              </p>
            </div>

            <button
              onClick={() => navigateTo('projects')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-900 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>View Full Calendar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingActivities.map((act) => {
              const spotsLeft = act.capacity - act.registeredCount;
              return (
                <div 
                  key={act.id}
                  className="bg-white rounded-2xl p-6 border border-emerald-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-emerald-800 font-medium mb-3">
                      <span className="bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                        {act.category}
                      </span>
                      <span className="tabular-nums">
                        {spotsLeft > 0 ? `${spotsLeft} spots available` : 'Full capacity'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-neutral-900 mb-2">
                      {act.title}
                    </h3>

                    <p className="text-xs text-neutral-600 leading-relaxed mb-4 line-clamp-2">
                      {act.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-neutral-500 mb-6 border-t border-neutral-100 pt-3">
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
                    </div>
                  </div>

                  <button
                    onClick={() => openModal('register', act)}
                    disabled={spotsLeft <= 0}
                    className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      spotsLeft > 0
                        ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                        : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                    }`}
                  >
                    {spotsLeft > 0 ? 'Join Activity' : 'Capacity Full'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* G. FEATURED PROJECTS */}
        <section aria-labelledby="featured-projects-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">
                Infrastructure & Policy
              </span>
              <h2 id="featured-projects-heading" className="text-3xl font-bold text-neutral-900 mt-1">
                Campus Capital Projects
              </h2>
              <p className="text-neutral-600 text-sm mt-1">
                Engineered infrastructure implementations with verified and projected environmental impacts.
              </p>
            </div>

            <button
              onClick={() => navigateTo('projects')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((proj) => (
              <div 
                key={proj.id}
                className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                    <span className="font-semibold text-neutral-700">{proj.category}</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      proj.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      proj.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {proj.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 mb-2">
                    {proj.name}
                  </h3>

                  <p className="text-xs text-neutral-600 line-clamp-3 mb-4 leading-relaxed">
                    {proj.objective}
                  </p>

                  <div className="space-y-1 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Progress</span>
                      <span className="font-mono font-semibold text-emerald-700">{proj.progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${proj.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-600 border border-neutral-200/70 mb-4">
                    <strong className="text-neutral-800">
                      {proj.impactType === 'Actual' ? 'Audited Impact:' : 'Expected Impact:'}
                    </strong>{' '}
                    {proj.impactStatement}
                  </div>
                </div>

                <button
                  onClick={() => openModal('project_detail', proj)}
                  className="w-full py-2 text-xs font-semibold text-neutral-700 hover:text-emerald-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* H. SUSTAINABILITY PROGRESS BARS */}
        <section aria-labelledby="progress-heading" className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/90 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">
              Target Tracking
            </span>
            <h2 id="progress-heading" className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
              Campus Sustainability Targets (2026–2030)
            </h2>
            <p className="text-neutral-600 text-sm mt-1">
              Institutional performance indicators benchmarked against the campus master sustainability charter.
            </p>
          </div>

          <div className="space-y-6 max-w-3xl">
            {/* Target 1: Energy */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-neutral-800 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-500" />
                  Daytime Renewable Electricity Generation
                </span>
                <span className="font-mono text-emerald-700 font-bold tabular-nums">
                  38% of 50% Target (76% of Goal)
                </span>
              </div>
              <div className="w-full h-3.5 bg-neutral-100 rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-emerald-600 rounded-full transition-all duration-1000" style={{ width: '76%' }} />
              </div>
              <div className="text-xs text-neutral-500 flex justify-between">
                <span>Current: 350 kWp installed</span>
                <span>2030 Target: 550 kWp microgrid</span>
              </div>
            </div>

            {/* Target 2: Waste */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-neutral-800 flex items-center gap-2">
                  <Recycle className="w-4 h-4 text-emerald-500" />
                  Organic & Recyclable Waste Landfill Diversion
                </span>
                <span className="font-mono text-emerald-700 font-bold tabular-nums">
                  78% of 90% Target (86% of Goal)
                </span>
              </div>
              <div className="w-full h-3.5 bg-neutral-100 rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-teal-600 rounded-full transition-all duration-1000" style={{ width: '86%' }} />
              </div>
              <div className="text-xs text-neutral-500 flex justify-between">
                <span>Current: 4.8 tons organic diverted/mo</span>
                <span>2030 Target: Zero-Waste to Landfill certified</span>
              </div>
            </div>

            {/* Target 3: Water */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-neutral-800 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-blue-500" />
                  Rainwater Harvesting & Landscape Self-Sufficiency
                </span>
                <span className="font-mono text-emerald-700 font-bold tabular-nums">
                  82% Self-Sufficient
                </span>
              </div>
              <div className="w-full h-3.5 bg-neutral-100 rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: '82%' }} />
              </div>
              <div className="text-xs text-neutral-500 flex justify-between">
                <span>Current: 450,000L Cistern + 6 recharge pits</span>
                <span>2030 Target: 100% landscape irrigation recycled</span>
              </div>
            </div>
          </div>
        </section>

        {/* I. STUDENT IDEAS SECTION */}
        <section aria-labelledby="student-ideas-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">
                Pillar Three: INITIATE
              </span>
              <h2 id="student-ideas-heading" className="text-3xl font-bold text-neutral-900 mt-1">
                Student Environmental Proposals
              </h2>
              <p className="text-neutral-600 text-sm mt-1">
                Ideas proposed by students to make our university more resilient and sustainable.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openModal('idea')}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs cursor-pointer"
              >
                Submit Your Idea
              </button>
              <button
                onClick={() => navigateTo('resources')}
                className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg cursor-pointer"
              >
                Browse All Proposals
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentIdeas.map((idea) => (
              <div
                key={idea.id}
                className="bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                    <span className="font-semibold text-emerald-800">{idea.category}</span>
                    <span className="px-2 py-0.5 bg-neutral-100 rounded text-[11px] font-medium">
                      {idea.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 mb-2">
                    {idea.title}
                  </h3>

                  <p className="text-xs text-neutral-600 line-clamp-3 mb-4 leading-relaxed">
                    {idea.description}
                  </p>

                  <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-lg text-xs text-emerald-900 mb-3">
                    <strong>Expected Benefit:</strong> {idea.expectedBenefit}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-100 pt-3">
                  <span className="truncate max-w-[150px]">{idea.studentName}</span>
                  <span className="font-mono text-emerald-700 font-semibold">{idea.upvotes} Upvotes</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* J. ECO QUIZ PREVIEW */}
        <section aria-labelledby="eco-quiz-preview-heading" className="bg-linear-to-r from-emerald-900 to-teal-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800/80 rounded-md text-xs font-semibold text-emerald-300">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Interactive Eco Quiz Module</span>
            </div>

            <h2 id="eco-quiz-preview-heading" className="text-3xl sm:text-4xl font-bold tracking-tight">
              Test Your Sustainability Knowledge & Earn Eco Points
            </h2>

            <p className="text-emerald-100/90 text-sm leading-relaxed">
              Explore 12+ real-world environmental awareness questions across waste segregation, renewable solar engineering, rainwater aquifers, and biodiversity conservation. Instant educational feedback provided!
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigateTo('quiz')}
                className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-bold text-sm rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Start Interactive Eco Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openModal('viva_docs')}
                className="px-5 py-3 bg-emerald-950/60 hover:bg-emerald-950 text-emerald-200 border border-emerald-500/30 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                View Viva & Project Guide
              </button>
            </div>
          </div>

          <div className="hidden lg:block absolute -right-10 -bottom-10 opacity-15 pointer-events-none">
            <Trees className="w-96 h-96 text-white" />
          </div>
        </section>

      </div>
    </div>
  );
};
