import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { Crown, Home, ChevronRight } from 'lucide-react';

const members = [
  { role: 'Chairman',        name: 'Mr. Vikas Vartak',                           description: 'Chairman Vidyavardhini',                              image: 'https://picsum.photos/seed/vikas/400/400' },
  { role: 'Member',          name: 'Mr. M.N. alias Bhausaheb Mohol',             description: 'Industrialist',                                       image: 'https://picsum.photos/seed/mohol/400/400' },
  { role: 'Member',          name: 'Mr. Pandurang alias Babansheth Naik',         description: 'Educationist',                                        image: 'https://picsum.photos/seed/naik/400/400' },
  { role: 'Member',          name: 'Mr. Hasmukh Shah',                           description: 'Industrialist',                                       image: 'https://picsum.photos/seed/shah/400/400' },
  { role: 'Member',          name: 'Mr. Madhurkar B Parekh',                     description: 'Industrialist, Chairman of Pidilite Industries',       image: 'https://picsum.photos/seed/parekh/400/400' },
  { role: 'Member',          name: 'Director of Technical Education (M.S.)',      description: 'Ex-Officio',                                          image: 'https://picsum.photos/seed/dte/400/400' },
  { role: 'Member',          name: 'Nominee of the University',                  description: 'Ex-Officio',                                          image: 'https://picsum.photos/seed/uni/400/400' },
  { role: 'Member',          name: 'Director, WRO AICTE',                        description: 'Ex-Officio',                                          image: 'https://picsum.photos/seed/aicte/400/400' },
  { role: 'Member',          name: 'Educationalist/Industrialist',               description: 'Nominated by AICTE',                                  image: 'https://picsum.photos/seed/edu/400/400' },
  { role: 'Member Secretary',name: 'Dr. Rakesh Himte',                           description: 'Principal',                                           image: 'https://picsum.photos/seed/himte/400/400' },
  { role: 'Member',          name: 'Dr. Uday Aswalekar',                         description: 'Staff Representative, Professor, MECH',               image: 'https://picsum.photos/seed/uday/400/400' },
  { role: 'Member',          name: 'Dr. Archana Ekbote',                         description: 'Staff Representative, Assistant Professor, INFT',     image: 'https://picsum.photos/seed/archana/400/400' },
];

const chairman = members[0];
const otherMembers = members.slice(1);

const GoverningCouncil: React.FC = () => {
  return (
    <PageLayout>

      {/* ── Full-Width Navy Hero ── */}
      <div className="relative w-full bg-[#1a4b7c] overflow-hidden">
        {/* Decorative glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#fdb813]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-blue-200 mb-8">
            <Link to="/" className="flex items-center gap-1 hover:text-white transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-blue-300/50" />
            <Link to="/about-us" className="hover:text-white transition-colors">About Us</Link>
            <ChevronRight className="w-3.5 h-3.5 text-blue-300/50" />
            <span className="text-[#fdb813] font-semibold">Governing Council</span>
          </nav>

          {/* Header */}
          <header className="text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-12 h-px bg-[#fdb813]" />
              <p className="font-sans text-[10px] tracking-[0.3em] text-[#fdb813] font-bold uppercase">
                Leadership &amp; Governance
              </p>
              <div className="w-12 h-px bg-[#fdb813]" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-white mb-5">
              The Governing Council
            </h1>
            <p className="font-display text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed italic">
              A distinguished assembly of educators, industrialists, and visionaries dedicated to
              shaping the future of our academic community.
            </p>
          </header>
        </div>
      </div>

      {/* ── Content on White Background ── */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">
          <div className="space-y-14">

              {/* Chairman — featured card */}
              <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50 p-8 md:p-12 rounded-tr-[4rem] rounded-bl-[4rem] border border-gray-100">
                <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={chairman.image}
                    alt={chairman.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    <Crown className="w-5 h-5 text-[#fdb813]" />
                    <p className="text-sm tracking-[0.2em] text-[#fdb813] font-bold uppercase">
                      {chairman.role}
                    </p>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl text-brand-navy mb-3">
                    {chairman.name}
                  </h2>
                  <p className="font-display text-xl text-slate-500 italic">
                    {chairman.description}
                  </p>
                </div>
              </div>

              {/* Other Members */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {otherMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center gap-5 py-4 border-b border-gray-100 hover:border-[#fdb813] transition-colors duration-300"
                    style={{ transitionDelay: `${Math.min(idx * 0.05, 0.4)}s` }}
                  >
                    <div className="w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#fdb813] transition-colors duration-300">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] text-[#fdb813] font-bold uppercase mb-1">
                        {member.role}
                      </p>
                      <h3 className="font-display text-xl text-brand-navy mb-0.5">
                        {member.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {member.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default GoverningCouncil;
