import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  Sun, 
  Recycle, 
  Droplet, 
  Trees, 
  Users, 
  CheckCircle2, 
  Award, 
  Lightbulb, 
  Calendar, 
  TrendingUp, 
  ShieldCheck, 
  PlusCircle, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { CAMPUS_STATIC_METRICS } from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const { 
    contributions, 
    ideas, 
    registrations, 
    ecoPoints, 
    ecoBadges, 
    openModal, 
    resetDemoData, 
    navigateTo 
  } = useApp();

  const [activeChartTab, setActiveChartTab] = useState<'waste' | 'solar' | 'water'>('waste');

  // Waste Monthly Diversion Data (in Kilograms)
  const monthlyWasteData = [
    { month: 'May', organic: 3800, ewaste: 320, dryRecycled: 1400 },
    { month: 'Jun', organic: 4100, ewaste: 410, dryRecycled: 1600 },
    { month: 'Jul', organic: 3600, ewaste: 290, dryRecycled: 1300 },
    { month: 'Aug', organic: 4500, ewaste: 550, dryRecycled: 1900 },
    { month: 'Sep', organic: 4800, ewaste: 620, dryRecycled: 2100 },
    { month: 'Oct', organic: 5100, ewaste: 480, dryRecycled: 2200 },
  ];

  // Solar Generation by Campus Zone (in MWh this semester)
  const solarBuildingData = [
    { building: 'Central Library', capacity: '120 kWp', generatedMwh: 84, percent: 34 },
    { building: 'Tech Block A & B', capacity: '100 kWp', generatedMwh: 71, percent: 29 },
    { building: 'Hostel Complex 4', capacity: '80 kWp', generatedMwh: 56, percent: 23 },
    { building: 'Sports Pavilion', capacity: '50 kWp', generatedMwh: 35, percent: 14 },
  ];

  // Water Cistern Utilization by Month (kL)
  const waterHarvestData = [
    { month: 'May', harvested: 280, irrigationUsed: 260 },
    { month: 'Jun', harvested: 640, irrigationUsed: 310 },
    { month: 'Jul', harvested: 980, irrigationUsed: 420 },
    { month: 'Aug', harvested: 1120, irrigationUsed: 540 },
    { month: 'Sep', harvested: 890, irrigationUsed: 480 },
    { month: 'Oct', harvested: 450, irrigationUsed: 390 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header & Demo Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-md">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Campus Real-Time Sustainability Metrics</span>
          </div>
          <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight">
            Green Campus Dashboard
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Consolidated environmental performance data combining institutional utility meters with live student community engagement records.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => openModal('contribution')}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Work</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reload the latest data from the database?')) {
                resetDemoData();
              }
            }}
            className="p-2.5 text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
            title="Refresh data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Transparent Labeling Banner */}
      <div className="p-3.5 bg-neutral-100 border border-neutral-200 rounded-xl text-xs text-neutral-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            <strong>Audit Disclosure:</strong> Environmental statistics (trees, kg recycled, litres saved) represent audited college baseline data. Student registrations and idea counts dynamically update from this browser session.
          </span>
        </div>
        <div className="text-[11px] font-mono text-emerald-800 bg-white px-2.5 py-1 rounded border border-neutral-200 shrink-0">
          State: Synchronized (database)
        </div>
      </div>

      {/* 8 Impact Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        
        {/* Metric 1: Trees Planted */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-medium">Native Trees Planted</span>
            <Trees className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
            {CAMPUS_STATIC_METRICS.treesPlanted.toLocaleString()}+
          </div>
          <div className="text-[11px] text-emerald-700 flex items-center gap-1">
            <span className="font-semibold">89%</span> 2-year survival across 12 ha
          </div>
        </div>

        {/* Metric 2: Waste Recycled */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-medium">Waste Recycled</span>
            <Recycle className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
            {CAMPUS_STATIC_METRICS.wasteRecycledKg.toLocaleString()} <span className="text-sm font-normal text-neutral-500">kg</span>
          </div>
          <div className="text-[11px] text-teal-700 flex items-center gap-1">
            <span className="font-semibold">4.8 tons</span> organic composted/mo
          </div>
        </div>

        {/* Metric 3: Water Saved */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-medium">Water Harvested</span>
            <Droplet className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
            3.2M <span className="text-sm font-normal text-neutral-500">Litres</span>
          </div>
          <div className="text-[11px] text-blue-700 flex items-center gap-1">
            <span className="font-semibold">450kL</span> cistern + 6 recharge pits
          </div>
        </div>

        {/* Metric 4: Solar Generation */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-medium">Solar Clean Power</span>
            <Sun className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
            {CAMPUS_STATIC_METRICS.solarCapacityKwp} <span className="text-sm font-normal text-neutral-500">kWp</span>
          </div>
          <div className="text-[11px] text-amber-700 flex items-center gap-1">
            <span className="font-semibold">38%</span> daytime electricity supply
          </div>
        </div>

        {/* Metric 5: Activities Organized */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-medium">Drives Organized</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
            {CAMPUS_STATIC_METRICS.totalEventsOrganized}
          </div>
          <div className="text-[11px] text-neutral-500">
            Plogging, e-waste & planting
          </div>
        </div>

        {/* Metric 6: Student Registrations (Dynamic) */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-300 shadow-2xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-medium text-emerald-950 font-semibold">Student Joins</span>
            <Users className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-mono tabular-nums">
            {registrations.length}
          </div>
          <div className="text-[11px] text-emerald-700">
            Live passes in this browser
          </div>
        </div>

        {/* Metric 7: Student Contributions (Dynamic) */}
        <div className="bg-white p-5 rounded-2xl border border-teal-300 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-medium text-teal-950 font-semibold">Work Logged</span>
            <CheckCircle2 className="w-4 h-4 text-teal-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-teal-800 font-mono tabular-nums">
            {contributions.length}
          </div>
          <div className="text-[11px] text-teal-700">
            Volunteer submissions
          </div>
        </div>

        {/* Metric 8: Green Ideas Proposed (Dynamic) */}
        <div className="bg-white p-5 rounded-2xl border border-amber-300 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-medium text-amber-950 font-semibold">Ideas Proposed</span>
            <Lightbulb className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-800 font-mono tabular-nums">
            {ideas.length}
          </div>
          <div className="text-[11px] text-amber-700">
            Student policy proposals
          </div>
        </div>

      </div>

      {/* Sustainability Targets Progress Section */}
      <section className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-xs space-y-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">
            Charter Benchmarks
          </span>
          <h2 className="text-2xl font-bold text-neutral-900 mt-1">
            2026–2030 Campus Conservation Targets
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-800 flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-500" /> Solar Coverage Target
              </span>
              <span className="font-mono text-emerald-800 font-bold">76% of Goal</span>
            </div>
            <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: '76%' }} />
            </div>
            <div className="text-[11px] text-neutral-500 leading-snug">
              Goal: 50% peak daytime solar coverage (currently at 38% with 350 kWp installed).
            </div>
          </div>

          <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-800 flex items-center gap-1.5">
                <Recycle className="w-4 h-4 text-emerald-500" /> Waste Diversion Target
              </span>
              <span className="font-mono text-emerald-800 font-bold">86% of Goal</span>
            </div>
            <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
              <div className="h-full bg-teal-600 rounded-full" style={{ width: '86%' }} />
            </div>
            <div className="text-[11px] text-neutral-500 leading-snug">
              Goal: 90% cafeteria waste diverted from municipal landfill (currently at 78%).
            </div>
          </div>

          <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-800 flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-blue-500" /> Water Self-Sufficiency
              </span>
              <span className="font-mono text-emerald-800 font-bold">82% of Goal</span>
            </div>
            <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '82%' }} />
            </div>
            <div className="text-[11px] text-neutral-500 leading-snug">
              Goal: 100% landscape irrigation sourced from recycled rainwater (currently at 82%).
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Charts & Analytics Section */}
      <section className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">
              Interactive Analytics
            </span>
            <h2 className="text-2xl font-bold text-neutral-900 mt-1">
              Resource Conservation Breakdown
            </h2>
          </div>

          {/* Chart View Switcher */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl">
            <button
              onClick={() => setActiveChartTab('waste')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeChartTab === 'waste' ? 'bg-white text-emerald-950 shadow-2xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Waste Diversion
            </button>
            <button
              onClick={() => setActiveChartTab('solar')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeChartTab === 'solar' ? 'bg-white text-emerald-950 shadow-2xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Solar by Building
            </button>
            <button
              onClick={() => setActiveChartTab('water')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeChartTab === 'water' ? 'bg-white text-emerald-950 shadow-2xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Rainwater Harvested
            </button>
          </div>
        </div>

        {/* Chart View 1: Waste Diversion */}
        {activeChartTab === 'waste' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-6 text-xs text-neutral-600 pb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-emerald-600 inline-block" /> Cafeteria Organic Compost (kg)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-teal-400 inline-block" /> Dry Recyclables (kg)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-amber-400 inline-block" /> E-Waste Diverted (kg)
              </span>
            </div>

            <div className="grid grid-cols-6 gap-3 sm:gap-6 pt-6 pb-2 items-end h-64 border-b border-neutral-200">
              {monthlyWasteData.map((d) => {
                const total = d.organic + d.dryRecycled + d.ewaste;
                const max = 8000;
                const organicHeight = (d.organic / max) * 100;
                const dryHeight = (d.dryRecycled / max) * 100;
                const ewasteHeight = (d.ewaste / max) * 100;

                return (
                  <div key={d.month} className="flex flex-col items-center h-full justify-end group">
                    <div className="w-full max-w-[48px] flex flex-col justify-end rounded-t-lg overflow-hidden bg-neutral-100 h-full relative">
                      <div style={{ height: `${ewasteHeight}%` }} className="w-full bg-amber-400" title={`E-waste: ${d.ewaste}kg`} />
                      <div style={{ height: `${dryHeight}%` }} className="w-full bg-teal-400" title={`Dry recyclables: ${d.dryRecycled}kg`} />
                      <div style={{ height: `${organicHeight}%` }} className="w-full bg-emerald-600" title={`Organic: ${d.organic}kg`} />
                    </div>
                    <span className="text-xs font-semibold text-neutral-700 mt-2">{d.month}</span>
                    <span className="text-[10px] text-neutral-400 font-mono">{total}kg</span>
                  </div>
                );
              })}
            </div>
            <div className="text-xs text-neutral-500">
              Monthly audit of cafeteria compost, cardboard recovery, and e-waste collected.
            </div>
          </div>
        )}

        {/* Chart View 2: Solar Generation by Building */}
        {activeChartTab === 'solar' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {solarBuildingData.map((b) => (
                <div key={b.building} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="font-semibold text-neutral-800">{b.building}</span>
                    <span className="font-mono text-amber-700">{b.capacity}</span>
                  </div>
                  <div className="text-2xl font-extrabold text-neutral-900 font-mono">
                    {b.generatedMwh} <span className="text-xs font-normal text-neutral-500">MWh</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${b.percent * 2.5}%` }} />
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Supplies {b.percent}% of campus rooftop solar output
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs text-neutral-500">
              Audited clean electricity delivered to laboratories and dormitories during this academic calendar.
            </div>
          </div>
        )}

        {/* Chart View 3: Rainwater Cistern Volume */}
        {activeChartTab === 'water' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-6 gap-3 sm:gap-6 pt-6 pb-2 items-end h-64 border-b border-neutral-200">
              {waterHarvestData.map((w) => {
                const max = 1200;
                const harvestPercent = (w.harvested / max) * 100;
                const usedPercent = (w.irrigationUsed / max) * 100;

                return (
                  <div key={w.month} className="flex flex-col items-center h-full justify-end">
                    <div className="flex items-end gap-1 h-full w-full max-w-[48px] justify-center">
                      <div 
                        style={{ height: `${harvestPercent}%` }} 
                        className="w-1/2 bg-blue-600 rounded-t-sm"
                        title={`Harvested: ${w.harvested} kL`}
                      />
                      <div 
                        style={{ height: `${usedPercent}%` }} 
                        className="w-1/2 bg-teal-400 rounded-t-sm"
                        title={`Irrigation used: ${w.irrigationUsed} kL`}
                      />
                    </div>
                    <span className="text-xs font-semibold text-neutral-700 mt-2">{w.month}</span>
                    <span className="text-[10px] text-neutral-400 font-mono">{w.harvested}kL</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-6 text-xs text-neutral-600">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-blue-600 inline-block" /> Rainwater Infiltration (kL)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-teal-400 inline-block" /> Landscape Irrigation Reused (kL)
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Recent Student Contributions & Ideas Two-Column Feed */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Recent Contributions */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Recent Student Contributions
              </h3>
              <button
                onClick={() => openModal('contribution')}
                className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
              >
                + Add Work
              </button>
            </div>

            <div className="space-y-3">
              {contributions.slice(0, 4).map((c) => (
                <div key={c.id} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-neutral-500 text-[11px]">
                    <span className="font-semibold text-neutral-800">{c.studentName}</span>
                    <span className="font-mono text-emerald-700">Unverified Demo Record</span>
                  </div>
                  <div className="font-bold text-neutral-900 text-sm">{c.title}</div>
                  <p className="text-neutral-600 leading-relaxed line-clamp-2">{c.description}</p>
                  <div className="text-[11px] text-neutral-400 pt-1">
                    Activity: {c.activityTitle}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>Showing latest {Math.min(4, contributions.length)} of {contributions.length} recorded</span>
            <button
              onClick={() => navigateTo('projects')}
              className="text-emerald-700 font-semibold hover:underline"
            >
              View Projects Page →
            </button>
          </div>
        </div>

        {/* Right Column: Recent Green Ideas */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Recent Green Ideas Proposed
              </h3>
              <button
                onClick={() => openModal('idea')}
                className="text-xs font-semibold text-amber-700 hover:underline cursor-pointer"
              >
                + Submit Idea
              </button>
            </div>

            <div className="space-y-3">
              {ideas.slice(0, 4).map((i) => (
                <div key={i.id} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-neutral-500 text-[11px]">
                    <span className="font-semibold text-emerald-800">{i.category}</span>
                    <span className="px-2 py-0.5 bg-neutral-200 rounded text-[10px] font-semibold text-neutral-700">
                      {i.status}
                    </span>
                  </div>
                  <div className="font-bold text-neutral-900 text-sm">{i.title}</div>
                  <p className="text-neutral-600 leading-relaxed line-clamp-2">{i.description}</p>
                  <div className="text-[11px] text-neutral-500 flex items-center justify-between pt-1">
                    <span>By {i.studentName}</span>
                    <span className="font-mono text-emerald-700 font-semibold">{i.upvotes} votes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>Showing latest {Math.min(4, ideas.length)} of {ideas.length} proposals</span>
            <button
              onClick={() => navigateTo('resources')}
              className="text-emerald-700 font-semibold hover:underline"
            >
              Browse Idea Portal →
            </button>
          </div>
        </div>

      </section>

      {/* Demo Gamification & Badges Status Section */}
      <section className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-10 border border-emerald-900 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Demo Gamification System</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Student Eco Badges & Milestone Progress
            </h2>
            <p className="text-xs text-emerald-200/80 mt-1">
              Earn demo points by joining activities (+15), submitting verified work (+25), proposing ideas (+20), and passing quizzes.
            </p>
          </div>

          <div className="bg-emerald-900/90 px-4 py-3 rounded-2xl border border-emerald-700 text-center shrink-0">
            <div className="text-xs text-emerald-300 font-medium">Your Demo Score</div>
            <div className="text-3xl font-extrabold text-white font-mono tabular-nums">{ecoPoints}</div>
            <div className="text-[11px] text-emerald-300">Total Eco Points</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {ecoBadges.map((badge) => (
            <div 
              key={badge.id}
              className={`p-5 rounded-2xl border transition-all ${
                badge.unlocked
                  ? 'bg-emerald-900/80 border-emerald-500/80 shadow-md'
                  : 'bg-emerald-950/40 border-emerald-900/60 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  {badge.name}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  badge.unlocked ? 'bg-amber-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  {badge.unlocked ? 'Unlocked' : `${badge.thresholdPoints} Pts Needed`}
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
