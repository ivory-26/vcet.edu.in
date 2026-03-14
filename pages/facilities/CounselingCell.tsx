import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';

const mentoringProcess = [
  'During the orientation programme, first year and direct second year students are introduced to the mentoring system.',
  'Parents of newly admitted students are also oriented about the mentoring system.',
  'Each mentor is assigned approximately 15-20 students.',
  'The mentor continues guiding the students until their graduation.',
  'The mentor maintains a record book for each student.',
];

const mentorRecordItems = [
  'Personal details of the student',
  'Family information',
  'Academic progress records',
  'Participation in co-curricular and extracurricular activities',
  'Attendance records',
  'Parent interaction records',
];

const CounselingCell: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Counselling Cell"
        breadcrumbs={[
          { label: 'Facilities', href: '/facilities' },
          { label: 'Counselling Cell' },
        ]}
      />

      <section className="py-10 md:py-12 bg-[#fcfdff]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="reveal rounded-none border border-brand-blue/12 bg-white p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 mb-3 border-l-4 border-brand-gold bg-[#fff8e6] px-3 py-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                      Student Support
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-brand-navy mb-4">
                    Counselling Cell
                  </h2>
                  <div className="relative overflow-hidden rounded-none border border-brand-blue/15 bg-[#f8f9fc] p-1.5 shadow-sm transition-all duration-300 hover:border-brand-gold/35 hover:shadow-[0_14px_28px_-16px_rgba(212,175,55,0.75)]">
                    <div className="relative rounded-none border border-white bg-white px-5 py-4 md:px-6 md:py-5">
                      <p
                        className="text-[#333333] leading-relaxed"
                        style={{ fontFamily: 'Cambria, Georgia, serif' }}
                      >
                        In today's fast-paced and competitive world, students face personal, social,
                        academic, and career planning challenges. Considering this as a major concern,
                        VCET provides professional counseling support to help students manage these
                        challenges effectively.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group lg:col-span-4" style={{ transitionDelay: '0.08s' }}>
                  <div className="relative h-full overflow-hidden rounded-none border border-brand-blue/15 bg-white p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-xl hover:border-brand-gold/35 hover:shadow-[0_14px_30px_-16px_rgba(212,175,55,0.65)] transition-all duration-300">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-blue" />
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-3 pl-2">
                      Services Format
                    </div>
                    <div className="space-y-2 text-sm text-[#333333]" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                        <div className="group/item flex items-center gap-2 rounded-none bg-[#f8f9fc] border border-brand-blue/10 px-3 py-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)] transition-all duration-300 hover:translate-x-1 hover:border-brand-gold/30 hover:bg-[#fffdf8] hover:shadow-[0_8px_18px_-14px_rgba(212,175,55,0.9)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-gold shrink-0" />
                        <span>Individual Counseling</span>
                      </div>
                        <div className="group/item flex items-center gap-2 rounded-none bg-[#f8f9fc] border border-brand-blue/10 px-3 py-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)] transition-all duration-300 hover:translate-x-1 hover:border-brand-gold/30 hover:bg-[#fffdf8] hover:shadow-[0_8px_18px_-14px_rgba(212,175,55,0.9)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-gold shrink-0" />
                        <span>Group Counseling</span>
                      </div>
                        <div className="group/item flex items-center gap-2 rounded-none bg-[#f8f9fc] border border-brand-blue/10 px-3 py-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)] transition-all duration-300 hover:translate-x-1 hover:border-brand-gold/30 hover:bg-[#fffdf8] hover:shadow-[0_8px_18px_-14px_rgba(212,175,55,0.9)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-gold shrink-0" />
                        <span>Orientation Sessions</span>
                      </div>
                        <div className="group/item flex items-center gap-2 rounded-none bg-[#f8f9fc] border border-brand-blue/10 px-3 py-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)] transition-all duration-300 hover:translate-x-1 hover:border-brand-gold/30 hover:bg-[#fffdf8] hover:shadow-[0_8px_18px_-14px_rgba(212,175,55,0.9)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-gold shrink-0" />
                        <span>Life Skills Training</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-[#f7f8fb]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 reveal">
              <div className="inline-flex items-center justify-center gap-2 mb-3 rounded-full border border-brand-gold/35 bg-white px-3 py-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                  Guidance
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                About Counselling Cell
              </h2>
            </div>

            <div
              className="reveal relative overflow-hidden border border-brand-blue/10 bg-white p-6 md:p-7 shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:border-brand-gold/30 transition-all duration-300"
              style={{ borderRadius: '18px 34px 18px 34px' }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-gold/25 bg-brand-gold/10 px-3 py-1">
                <div className="h-0.5 w-12 bg-brand-gold/75" />
                <div className="h-2 w-2 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.7)]" />
                <div className="h-0.5 w-6 bg-brand-gold/50" />
              </div>
              <p
                className="text-[#333333] leading-relaxed mb-4"
                style={{ fontFamily: 'Cambria, Georgia, serif' }}
              >
                The purpose of the counseling cell is to assist students in dealing with their
                problems and enable them to resolve their issues independently. The vision of the
                counseling cell is to create a positive environment within the institute and enable
                individuals to contribute effectively to the organization and the community.
              </p>
              <p
                className="text-[#333333] leading-relaxed"
                style={{ fontFamily: 'Cambria, Georgia, serif' }}
              >
                The counseling services are provided at both individual and group levels, including
                orientation sessions and life skills training. The duration of counseling sessions
                depends on the nature and complexity of the problem.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-[#fcfdff]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 reveal">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                  Professional Support
                </span>
                <div className="w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Counsellor Information
              </h2>
            </div>

            <div className="reveal">
              <div className="relative overflow-hidden rounded-none border border-brand-blue/15 bg-white shadow-md hover:-translate-y-0.5 hover:shadow-xl hover:border-brand-gold/35 hover:shadow-[0_16px_30px_-16px_rgba(212,175,55,0.7)] transition-all duration-300">
                <div className="absolute inset-x-0 top-0 h-1 bg-brand-blue" />
                <div className="p-6 md:p-7">
                  <div className="mb-4">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-1">
                        Institute Psychologist
                      </div>
                      <h3 className="text-2xl font-display font-bold tracking-tight text-brand-navy">
                        Mrs. Poonam Surange
                      </h3>
                      <div className="mt-2 inline-block border border-brand-blue/20 bg-white px-2 py-1 text-[11px] font-semibold text-brand-blue shadow-[0_6px_16px_-12px_rgba(21,51,92,0.5)]">
                        Student Counseling and Guidance
                      </div>
                    </div>
                  </div>

                  <div className="rounded-none border border-brand-blue/10 bg-[#f7f8fb] p-4 mb-4 border-l-4 border-l-brand-gold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8)]">
                    <h4 className="text-sm font-semibold text-brand-navy mb-2">Qualifications</h4>
                    <ul className="space-y-1.5 text-sm text-[#333333]" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                        PG Psychology (Gold Medalist)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                        MS - Psychology
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                        PG Diploma in Guidance and Counseling
                      </li>
                    </ul>
                  </div>

                  <p
                    className="text-[#333333] leading-relaxed"
                    style={{ fontFamily: 'Cambria, Georgia, serif' }}
                  >
                    VCET has appointed a well-qualified and experienced psychologist to provide
                    counseling support to students. Counseling services help students address
                    personal, academic, and emotional concerns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-[#f5f7fa]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto reveal">
            <div className="group relative overflow-hidden rounded-none border border-brand-blue/10 bg-white p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-brand-gold/35 hover:bg-[#fffdf7] hover:shadow-[0_14px_30px_-18px_rgba(212,175,55,0.75)]">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                  Vision
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-brand-navy mb-4 transition-colors duration-300 group-hover:text-brand-navy">
                Vision of the Counselling Cell
              </h2>
              <p
                className="text-[#333333] leading-relaxed"
                style={{ fontFamily: 'Cambria, Georgia, serif' }}
              >
                The vision of the counseling cell is to create a positive environment in the
                institute and enable individuals to contribute meaningfully to the organization and
                the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 reveal">
              <div className="inline-flex items-center justify-center gap-2 mb-3 border-l-4 border-brand-gold bg-[#fff8e6] px-3 py-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                  Mentoring Framework
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Student Mentoring System
              </h2>
            </div>

            <div className="reveal mb-5 rounded-none border border-brand-blue/10 bg-white p-1 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-brand-gold/35 hover:shadow-[0_12px_26px_-16px_rgba(212,175,55,0.8)]">
              <div className="rounded-none border-l-4 border-brand-gold bg-[#f5f7fa] px-4 py-4 md:px-5">
                <div className="inline-flex items-center border border-brand-gold/35 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-2">
                  Introduction
                </div>
                <p
                  className="text-[#333333] leading-relaxed"
                  style={{ fontFamily: 'Cambria, Georgia, serif' }}
                >
                  A well-structured mentoring (proctor) system is implemented in the institute.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
              <div className="reveal xl:col-span-2 h-full flex flex-col rounded-none border border-brand-blue/10 bg-white p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-brand-gold/30 transition-all duration-300">
                <div className="border-l-4 border-brand-blue pl-3 mb-4">
                  <h3 className="text-lg font-display font-bold tracking-tight text-brand-navy">Objective</h3>
                </div>
                <p
                  className="text-sm text-[#333333] leading-relaxed"
                  style={{ fontFamily: 'Cambria, Georgia, serif' }}
                >
                  Faculty members actively mentor students to ensure their holistic development.
                  The mentor system encourages a healthy relationship between students and faculty
                  members, helping students grow academically and personally.
                </p>

                <div className="mt-auto pt-4 border-t border-brand-blue/10">
                  <div className="rounded-none border border-brand-gold/35 bg-brand-gold/10 p-3 shadow-[0_8px_22px_-18px_rgba(212,175,55,0.9)]">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy mb-1">
                    Mentor Allocation
                  </div>
                  <p className="text-sm text-[#333333]" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                    Each mentor is assigned approximately 15-20 students and continues guidance
                    till graduation.
                  </p>
                  </div>
                </div>
              </div>

              <div className="reveal xl:col-span-3 rounded-none border border-brand-blue/10 bg-white p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-brand-gold/30 transition-all duration-300">
                <div className="border-l-4 border-brand-blue pl-3 mb-4">
                  <h3 className="text-lg font-display font-bold tracking-tight text-brand-navy">Process</h3>
                </div>

                <div className="space-y-3">
                  {mentoringProcess.map((item, idx) => (
                    <div
                      key={idx}
                      className="group rounded-none border border-brand-blue/10 bg-[#f5f7fa] px-3 py-3 hover:bg-white hover:border-brand-gold/35 hover:shadow-[0_12px_20px_-16px_rgba(212,175,55,0.8)] transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 h-6 min-w-6 border border-brand-blue/35 bg-white text-[11px] font-bold text-brand-navy flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-brand-gold/50 group-hover:bg-brand-gold/10">
                          {idx + 1}
                        </span>
                        <span
                          className="text-sm text-[#333333] leading-relaxed transition-colors duration-300 group-hover:text-[#1f2f46]"
                          style={{ fontFamily: 'Cambria, Georgia, serif' }}
                        >
                          {item}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-[#f7f8fb]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 reveal">
              <div className="inline-flex items-center justify-center gap-2 mb-3 border-l-4 border-brand-gold bg-white px-3 py-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                  Tracking System
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Mentor Record Information
              </h2>
            </div>

            <div className="reveal relative overflow-hidden rounded-none border border-brand-blue/10 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <p className="text-sm text-[#333333] mb-4" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                The mentor maintains records including:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mentorRecordItems.map((item, idx) => (
                  <div
                    key={item}
                    className="group rounded-none border border-brand-blue/10 bg-[#f5f7fa] px-4 py-3 text-sm text-[#333333] hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:border-brand-gold/35 transition-all duration-300"
                    style={{ transitionDelay: `${0.04 * idx}s` }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                      <span style={{ fontFamily: 'Cambria, Georgia, serif' }}>{item}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-none border border-brand-gold/35 bg-brand-gold/10 px-4 py-4 md:px-6 text-center shadow-[0_10px_24px_-16px_rgba(212,175,55,0.85)]">
                <p
                  className="text-sm md:text-base text-[#333333] leading-relaxed max-w-3xl mx-auto"
                  style={{ fontFamily: 'Cambria, Georgia, serif' }}
                >
                  Mentors also communicate the student's performance regularly with parents or
                  guardians.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default CounselingCell;
