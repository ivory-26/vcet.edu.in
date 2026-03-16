import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';

const sidebarLinks = [
  { id: 'objectives',  label: 'Objectives', icon: 'ph-target' },
  { id: 'placement-cell',    label: 'Placement Cell', icon: 'ph-users' },
  { id: 'gallery',    label: 'Gallery', icon: 'ph-image' },
  { id: 'placement-statistics',label: 'Placement Statistics', icon: 'ph-chart-bar' },
  { id: 'our-recruiters',   label: 'Our Recruiters', icon: 'ph-buildings' },
];

const Placement: React.FC = () => {
  const [activeId, setActiveId] = React.useState('objectives');
  const activeLink = sidebarLinks.find(l => l.id === activeId);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const t = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
    }, 50);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, [activeId]);

  return (
    <PageLayout>
      <PageBanner
        title="Placement"
        breadcrumbs={[
          { label: 'Placement' },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 px-6 lg:px-12 py-12">
        {/* Sticky Sidebar */}
        <aside className="w-full lg:w-[320px] flex-shrink-0">
          <div className="sticky top-28 bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden border border-slate-200">
            <nav className="flex flex-col py-2">
              {sidebarLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveId(link.id)}
                    className={`px-6 py-4 text-[15px] text-left transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-[#183a68] text-[#f2a900] font-semibold'
                          : 'text-[#183a68] font-medium hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <i className={`ph ${link.icon} text-xl ${ isActive ? '' : 'opacity-70'}`} />
                      {link.label}
                    </span>
                    {isActive && (
                      <i className="ph ph-arrow-right text-sm transform group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full min-w-0">
          
          {/* Objectives Tab */}
          {activeId === 'objectives' && (
            <section className="reveal bg-white rounded-2xl p-8 lg:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#183a68] border-b border-slate-100 pb-3 mb-6">Objectives</h3>
                <ul className="list-disc pl-5 space-y-3">
                  <li>To provide necessary support for implementing the mandate of providing excellent career opportunities for the students.</li>
                  <li>To plan and execute tasks like student skills development, soft skills training and career guidance.</li>
                  <li>To plan and implement campus interview process.</li>
                  <li>To equip students with necessary technical and behavioral competencies by rigorous and meticulously designed skills and aptitude practical trainings.</li>
                  <li>To provide all necessary facilities essential for the conduct of campus recruitment.</li>
                  <li>To formulate the strategy for roll-out of campus recruitment and placement policy for the campus eligible students.</li>
                  <li>To develop and sustain a long term mutually beneficial relationship with the industry.</li>
                </ul>
              </div>
            </section>
          )}

          {/* Placement Cell Tab */}
          {activeId === 'placement-cell' && (
            <section className="reveal bg-white rounded-2xl p-8 lg:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#183a68] border-b border-slate-100 pb-3 mb-6">Placement Cell</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Manager Card */}
                  <div className="flex flex-col">
                    <div className="w-full aspect-[4/3] bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-slate-400 mb-4 overflow-hidden">
                      <i className="ph ph-image text-4xl mb-2 opacity-50"></i>
                      <span className="text-sm font-medium">Image Placeholder</span>
                    </div>
                    <h4 className="text-[#64b5f6] text-2xl font-bold mb-1">Mr. Prafulla Patil</h4>
                    <p className="text-slate-600 mb-4">Placement Manager</p>
                    
                    <div className="space-y-2 text-slate-600">
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <i className="ph-fill ph-envelope text-[#183a68]"></i>
                        <a href="mailto:placements@vcet.edu.in" className="hover:text-[#183a68] transition-colors hover:underline">placements@vcet.edu.in</a>
                      </div>
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <i className="ph-fill ph-device-mobile text-[#183a68]"></i>
                        <a href="tel:+917710070966" className="hover:text-[#183a68] transition-colors hover:underline">7710070966</a>
                      </div>
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <i className="ph-fill ph-phone text-[#183a68]"></i>
                        <span>0250-2338234 (Extn:228)</span>
                      </div>
                    </div>
                  </div>

                  {/* TPO Card */}
                  <div className="flex flex-col">
                    <div className="w-full aspect-[4/3] bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-slate-400 mb-4 overflow-hidden">
                      <i className="ph ph-image text-4xl mb-2 opacity-50"></i>
                      <span className="text-sm font-medium">Image Placeholder</span>
                    </div>
                    <h4 className="text-[#64b5f6] text-2xl font-bold mb-1">Mr. Sanket Patil</h4>
                    <p className="text-slate-600 mb-4">Training And Placement Officer</p>
                    
                    <div className="space-y-2 text-slate-600">
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <i className="ph-fill ph-envelope text-[#183a68]"></i>
                        <a href="mailto:placements@vcet.edu.in" className="hover:text-[#183a68] transition-colors hover:underline">placements@vcet.edu.in</a>
                      </div>
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <i className="ph-fill ph-device-mobile text-[#183a68]"></i>
                        <span>7710070970 / 9987173606</span>
                      </div>
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <i className="ph-fill ph-phone text-[#183a68]"></i>
                        <span>0250-2338234 (Extn:228)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="text-[#64b5f6] text-2xl font-bold mb-4">Training &amp; Placement</h4>
                  <div className="flex items-center justify-center md:justify-start">
                    <a 
                      href="https://vcet.edu.in/wp-content/uploads/2024/04/Training-and-Placement-Committee_1-2.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-700 hover:text-[#183a68] transition-colors group"
                    >
                      <i className="ph-fill ph-book-open text-lg"></i>
                      <span className="font-medium group-hover:underline">Committee</span>
                    </a>
                  </div>
                </div>

              </div>
            </section>
          )}

          {/* Gallery Tab */}
          {activeId === 'gallery' && (
            <section className="reveal bg-white rounded-2xl p-8 lg:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#183a68] border-b border-slate-100 pb-3 mb-6">Gallery</h3>
                <p>Content for Gallery is coming soon.</p>
              </div>
            </section>
          )}

          {/* Placement Statistics Tab */}
          {activeId === 'placement-statistics' && (
            <section className="reveal bg-white rounded-2xl p-8 lg:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#183a68] border-b border-slate-100 pb-3 mb-6">Placement Statistics</h3>
                <p>Content for Placement Statistics is coming soon.</p>
              </div>
            </section>
          )}

          {/* Our Recruiters Tab */}
          {activeId === 'our-recruiters' && (
            <section className="reveal bg-white rounded-2xl p-8 lg:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#183a68] border-b border-slate-100 pb-3 mb-6">Our Recruiters</h3>
                <p>Content for Our Recruiters is coming soon.</p>
              </div>
            </section>
          )}

        </main>
      </div>
    </PageLayout>
  );
};

export default Placement;
