import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface PageBannerProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  /** Short category label shown above the title with decorative rules, e.g. "Leadership & Governance" */
  category?: string;
  /** Optional italic subtitle shown below the title */
  subtitle?: string;
}

const PageBanner: React.FC<PageBannerProps> = ({ title, breadcrumbs, category, subtitle }) => {
  const categoryLabel = category ?? breadcrumbs?.[0]?.label ?? 'VCET';

  return (
    <section className="relative bg-brand-navy overflow-hidden">
      {/* Subtle radial glow top-right */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-gold/[0.06] rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-16 md:py-24 flex flex-col items-center text-center">

        {/* Breadcrumbs */}
        {breadcrumbs && (
          <nav className="flex items-center justify-center gap-2 mb-8 animate-fade-in" style={{ animationDelay: '0.05s' }}>
            <a href="/" className="text-white/50 hover:text-brand-gold transition-colors duration-300">
              <Home className="w-4 h-4" />
            </a>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                {crumb.href ? (
                  <a href={crumb.href} className="text-white/50 hover:text-white text-sm transition-colors duration-300">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-brand-gold font-semibold text-sm">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Category label with decorative horizontal rules */}
        <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <span className="flex-1 max-w-[80px] h-px bg-brand-gold/70" />
          <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold whitespace-nowrap">
            {categoryLabel}
          </span>
          <span className="flex-1 max-w-[80px] h-px bg-brand-gold/70" />
        </div>

        {/* Title — large Playfair Display serif */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-tight tracking-tight animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          {title}
        </h1>

        {/* Optional italic subtitle */}
        {subtitle && (
          <p
            className="mt-6 max-w-2xl text-lg md:text-xl font-display italic text-white/70 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
    </section>
  );
};

export default PageBanner;
