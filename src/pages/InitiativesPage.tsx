import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Leaf, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Filter,
  Sparkles,
  Info
} from 'lucide-react';

export const InitiativesPage: React.FC = () => {
  const { initiatives, openModal, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Energy', 'Waste', 'Water', 'Transport', 'Biodiversity'];

  const filteredInitiatives = useMemo(() => {
    return initiatives.filter((init) => {
      const matchesCategory = selectedCategory === 'All' || init.category === selectedCategory;
      const matchesSearch = 
        init.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        init.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        init.impactMetric.toLowerCase().includes(searchTerm.toLowerCase()) ||
        init.campusLocation.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initiatives, selectedCategory, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-md">
          <Leaf className="w-3.5 h-3.5" />
          <span>Pillar One: SHOW</span>
        </div>
        <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight">
          Campus Green Initiatives
        </h1>
        <p className="text-base text-neutral-600 leading-relaxed">
          Comprehensive strategic sustainability programs established across our college grounds. These institutional initiatives create the foundation for our renewable transition, resource conservation, and circular zero-waste goals.
        </p>
      </div>

      {/* Search and Category Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Field */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search initiatives, technologies, benefits or campus buildings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-neutral-50/50"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Tabs (Zero-Pill: Clean Segmented Control) */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-neutral-100 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-emerald-950 font-semibold shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scope Disclaimer */}
      <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <span>
          <strong>Distinction Notice:</strong> <em>Initiatives</em> represent ongoing broad institutional focus areas. For scheduled student participation drives, visit <strong>Projects & Activities</strong>; for student proposals, visit <strong>Resources & Ideas</strong>.
        </span>
      </div>

      {/* Initiatives Grid */}
      {filteredInitiatives.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8">
          <Leaf className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
          <h3 className="text-lg font-bold text-neutral-900 mb-1">No initiatives match your filter</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-4">
            Try adjusting your search terms or select "All" categories to view all campus programs.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInitiatives.map((init) => (
            <div
              key={init.id}
              className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Media Banner */}
                <div className="h-48 w-full overflow-hidden bg-neutral-100 relative">
                  <img
                    src={init.imageUrl}
                    alt={init.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-neutral-900/85 backdrop-blur-md px-2.5 py-1 rounded text-xs font-semibold text-emerald-300">
                    {init.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-semibold text-neutral-800">
                    {init.status}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">
                    {init.title}
                  </h2>
                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed mb-4">
                    {init.description}
                  </p>

                  <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl mb-4">
                    <div className="text-[10px] uppercase font-bold text-emerald-900 tracking-wider mb-0.5">
                      Audited Metric
                    </div>
                    <div className="text-xs font-mono font-semibold text-emerald-800">
                      {init.impactMetric}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-neutral-600 mb-2">
                    <div className="font-semibold text-neutral-800 text-[11px] uppercase tracking-wider">
                      Key Highlights:
                    </div>
                    {init.environmentalBenefits.slice(0, 2).map((b, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-neutral-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0 border-t border-neutral-100 mt-2 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400 flex items-center gap-1 truncate max-w-[170px]">
                  <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                  {init.campusLocation}
                </span>

                <button
                  onClick={() => openModal('initiative_detail', init)}
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:text-white bg-emerald-50 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom CTA to Projects */}
      <div className="p-8 bg-neutral-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold">Ready to participate in campus green activities?</h3>
          <p className="text-xs text-neutral-300">
            Join upcoming tree plantation drives, electronics recycling days, and composting workshops.
          </p>
        </div>
        <button
          onClick={() => navigateTo('projects')}
          className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-semibold text-xs rounded-lg transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <span>View Projects & Activities</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
