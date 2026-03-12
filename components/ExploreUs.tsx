import React, { useRef, useState, useEffect } from 'react';

const MonitorIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
);

const GraduationCapIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
);

const LibraryIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
);

const FlaskIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.62 19.344a1.99 1.99 0 0 0 1.808 2.656h11.144a1.99 1.99 0 0 0 1.808-2.656l-5.169-8.921a2 2 0 0 1-.211-.896V2"/><path d="M8.5 2h7"/><path d="M6 16h12"/></svg>
);

const TrophyIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7c0 3.31 2.69 6 6 6s6-2.69 6-6V2Z"/></svg>
);

const ChevronLeftIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
);

const ChevronRightIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);

const exploreLinks = [
  {
    id: 1,
    title: 'ERP Portal',
    description: 'Student & faculty unified portal for schedules, results and resources.',
    icon: MonitorIcon,
    color: 'text-blue-400',
    bgGlow: 'group-hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]',
    iconBg: 'bg-blue-400/10',
  },
  {
    id: 2,
    title: 'Convocation',
    description: 'Watch ceremony highlights and meet the graduating class of 2024.',
    icon: GraduationCapIcon,
    color: 'text-yellow-400',
    bgGlow: 'group-hover:shadow-[0_0_30px_rgba(250,204,21,0.15)]',
    iconBg: 'bg-yellow-400/10',
  },
  {
    id: 3,
    title: 'E-Library',
    description: '50,000+ digital resources, journals and research papers on demand.',
    icon: LibraryIcon,
    color: 'text-emerald-400',
    bgGlow: 'group-hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]',
    iconBg: 'bg-emerald-400/10',
  },
  {
    id: 4,
    title: 'Research Cell',
    description: 'Cutting-edge labs and funded projects across 8 research verticals.',
    icon: FlaskIcon,
    color: 'text-fuchsia-400',
    bgGlow: 'group-hover:shadow-[0_0_30px_rgba(232,121,249,0.15)]',
    iconBg: 'bg-fuchsia-400/10',
  },
  {
    id: 5,
    title: 'Placements',
    description: '95% placement record with top recruiting companies globally.',
    icon: TrophyIcon,
    color: 'text-amber-400',
    bgGlow: 'group-hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]',
    iconBg: 'bg-amber-400/10',
  },
];

const ExploreUs: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -320 : 320,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollPercentage =
        container.scrollLeft / (container.scrollWidth - container.clientWidth);
      setScrollProgress(scrollPercentage);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section
      id="explore"
      className="w-full bg-[#03091A] py-12 md:py-16 overflow-hidden relative flex flex-col items-center justify-center"
    >
      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#1E3A8A] opacity-20 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[2px] bg-brand-gold" />
              <span className="text-brand-gold text-xs font-bold tracking-[0.2em] uppercase">Quick Access</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight mb-1">
              Explore <span className="text-brand-gold">VCET</span>
            </h2>
            <p className="text-slate-400 text-sm font-light tracking-wide">
              Everything you need — portals, labs, events &amp; more.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden sm:flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/30 transition-all backdrop-blur-sm"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/30 transition-all backdrop-blur-sm"
              aria-label="Scroll right"
            >
              <ChevronRightIcon size={20} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-8 pt-4 -mx-6 px-6 md:mx-0 md:px-0"
        >
          {exploreLinks.map((link) => {
            const Icon = link.icon;
            return (
              <div
                key={link.id}
                className={`min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] snap-start flex-shrink-0 relative group cursor-pointer transition-all duration-500 hover:-translate-y-2 ${link.bgGlow}`}
              >
                {/* Glassmorphism card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent rounded-[1.5rem] border border-white/[0.08] group-hover:border-white/[0.2] transition-colors duration-500 backdrop-blur-md" />

                <div className="relative p-8 h-full flex flex-col min-h-[240px]">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl ${link.iconBg} ${link.color} flex items-center justify-center mb-16 shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon size={24} strokeWidth={1.5} />
                  </div>

                  {/* Text */}
                  <div className="mt-auto">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-light line-clamp-3">
                      {link.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mt-2">
          {[0, 1, 2, 3].map((index) => {
            const isActive = Math.abs(scrollProgress - index / 3) < 0.15;
            return (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  isActive ? 'w-8 bg-brand-gold' : 'w-2 bg-white/20'
                }`}
              />
            );
          })}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};

export default ExploreUs;
