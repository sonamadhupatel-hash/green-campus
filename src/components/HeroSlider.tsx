import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Sun, 
  Trees, 
  Users, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface Slide {
  id: string;
  badge: string;
  icon: React.ReactNode;
  tagline: string;
  highlightText: string;
  image: string;
  secondaryStat: string;
}

export const HeroSlider: React.FC = () => {
  const { navigateTo, openModal } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
  const timerRef = useRef<any>(null);

  const slides: Slide[] = [
    {
      id: 'solar',
      badge: 'Renewable Clean Energy',
      icon: <Sun className="w-4 h-4 text-amber-300" />,
      tagline: 'Solar Microgrids Powering Academic Research',
      highlightText: '350 kWp of rooftop solar panels providing 38% of peak campus daytime electricity with zero carbon emissions.',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1600&q=85',
      secondaryStat: '280 Tons CO2 Offset Annually'
    },
    {
      id: 'biodiversity',
      badge: 'Ecological Restoration',
      icon: <Trees className="w-4 h-4 text-emerald-300" />,
      tagline: '1,850+ Indigenous Trees & Living Bioswales',
      highlightText: 'Preserving campus microclimates through drought-resilient native woodland, medicinal botanical gardens, and aquifer recharge basins.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=85',
      secondaryStat: '140+ Native Flora Species Documented'
    },
    {
      id: 'participation',
      badge: 'Student-Driven Action',
      icon: <Users className="w-4 h-4 text-sky-300" />,
      tagline: 'Empowering Student Changemakers Every Week',
      highlightText: 'From zero-waste plogging runs to circular e-waste collection and organic composting masterclasses, real change happens together.',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1600&q=85',
      secondaryStat: '52,400 kg Organic Waste Diverted'
    }
  ];

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length]);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <div 
      className="relative w-full overflow-hidden bg-neutral-900 min-h-[560px] lg:min-h-[640px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image / Fallback Layer */}
      {slides.map((slide, index) => {
        const isCurrent = index === currentSlide;
        const hasError = imageError[index];

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {!hasError ? (
              <img
                src={slide.image}
                alt={slide.tagline}
                referrerPolicy="no-referrer"
                onError={() => setImageError((prev) => ({ ...prev, [index]: true }))}
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
              />
            ) : (
              // Styled SVG Fallback Container
              <div className="w-full h-full bg-linear-to-br from-emerald-950 via-neutral-900 to-teal-950 flex items-center justify-center">
                <div className="text-center p-8 text-neutral-400 max-w-md">
                  <Trees className="w-16 h-16 mx-auto mb-3 text-emerald-500 opacity-60" />
                  <p className="text-sm font-medium text-emerald-300">{slide.tagline}</p>
                </div>
              </div>
            )}

            {/* Measured Scrim for WCAG AA Contrast */}
            <div className="absolute inset-0 bg-linear-to-r from-neutral-950/90 via-neutral-950/75 to-neutral-950/40" />
            <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-neutral-950/30" />
          </div>
        );
      })}

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="max-w-3xl">
          
          {/* Subtle Top Metadata Line */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-medium backdrop-blur-md mb-6">
            {active.icon}
            <span>{active.badge}</span>
            <span aria-hidden="true" className="text-emerald-500">·</span>
            <span className="text-emerald-200">{active.secondaryStat}</span>
          </div>

          {/* Primary Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6 text-balance">
            A Greener Campus <span className="text-emerald-400">Starts With Us.</span>
          </h1>

          {/* Dynamic Slide Narrative */}
          <p className="text-lg sm:text-xl text-neutral-200 font-normal leading-relaxed mb-4 text-balance">
            {active.tagline}
          </p>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed mb-8">
            {active.highlightText}
          </p>

          {/* Required Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigateTo('initiatives')}
              className="px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 shrink-0"
            >
              <span>Explore Initiatives</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('projects')}
              className="px-6 py-3.5 text-sm font-semibold text-white bg-neutral-800/90 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg backdrop-blur-xs transition-all cursor-pointer flex items-center gap-2 shrink-0"
            >
              <span>Join an Activity</span>
            </button>

            <button
              onClick={() => openModal('idea')}
              className="px-5 py-3.5 text-sm font-medium text-emerald-300 hover:text-emerald-200 hover:bg-emerald-950/60 border border-emerald-500/40 rounded-lg backdrop-blur-xs transition-all cursor-pointer flex items-center gap-2 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Share an Idea</span>
            </button>
          </div>

        </div>
      </div>

      {/* Slider Controls (Bottom-Right Floating Panel) */}
      <div className="absolute z-20 bottom-8 right-4 sm:right-8 flex items-center gap-3 bg-neutral-950/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-neutral-800">
        
        {/* Previous Button */}
        <button
          onClick={goToPrev}
          className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-1.5 px-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentSlide 
                  ? 'w-6 bg-emerald-400' 
                  : 'w-2 bg-neutral-600 hover:bg-neutral-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <span aria-hidden="true" className="text-neutral-700">|</span>

        {/* Pause / Play Toggle for Accessibility */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
          title={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
        >
          {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4" />}
        </button>

      </div>
    </div>
  );
};
