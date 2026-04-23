export interface RouteSearchEntry {
  label: string;
  href: string;
  category: string;
  context?: string;
  keywords: string[];
  external?: boolean;
}

const PUBLIC_ROUTE_PATHS: string[] = [
  '/',
  '/about-us',
  '/academic-calendar',
  '/aicte-idea-vcet',
  '/ai-data-science',
  '/ai-data-science/faculty/:slug',
  '/airnova',
  '/anti-ragging',
  '/audited-statement',
  '/best-practices',
  '/brochure',
  '/career-at-vcet',
  '/central-computing',
  '/centurion',
  '/civil-engineering',
  '/civil-engineering/faculty/:slug',
  '/code-of-conduct',
  '/coe-siemens',
  '/college-development-committee',
  '/computer-engineering',
  '/computer-engineering/faculty/:slug',
  '/consultancy-projects',
  '/contact-us',
  '/counseling-cell',
  '/courses-and-intake',
  '/cs-data-science',
  '/cs-data-science/faculty/:slug',
  '/csi',
  '/cultural-committee',
  '/cut-off',
  '/dean-academics',
  '/developers',
  '/differently-abled',
  '/documents-required',
  '/downloads',
  '/ebsb',
  '/e-cell',
  '/electronics-telecomm',
  '/electronics-telecommunication/faculty/:slug',
  '/emechto',
  '/equal-opportunity',
  '/exam',
  '/exam/about',
  '/exam/notices',
  '/exam/question-paper',
  '/exam/results',
  '/exam/sample-papers',
  '/exam/syllabus',
  '/exam/timetable',
  '/exam/verification',
  '/exam-cell',
  '/e-yantra',
  '/faculty/:id',
  '/fees-structure',
  '/first-year-engineering',
  '/first-year-engineering/faculty/:slug',
  '/funded-research',
  '/german-language-club',
  '/governing-council',
  '/grievance-redressal',
  '/hackathon',
  '/health-facilities',
  '/helpline-for-divyangjan',
  '/honours-minor',
  '/ieee',
  '/iete',
  '/igbc',
  '/iic',
  '/iiic',
  '/information-technology',
  '/information-technology/faculty/:slug',
  '/internal-complaint',
  '/iqac',
  '/ishrae',
  '/ladies-common-room',
  '/library',
  '/literati',
  '/machinery-diagnostics',
  '/mechanical-engineering',
  '/mechanical-engineering/faculty/:slug',
  '/mms',
  '/mms/about',
  '/mms/about/dab',
  '/mms/about/faculty',
  '/mms/about/hods-desk',
  '/mms/about/principals-desk',
  '/mms/about/program-outcomes',
  '/mms/about/vision-mission',
  '/mms/admission',
  '/mms/admission/documents-required',
  '/mms/admission/fees-structure',
  '/mms/admission/scholarship',
  '/mms/admission-details',
  '/mms/admission-details/documents-required',
  '/mms/admission-details/fees-structure',
  '/mms/admission-details/scholarship',
  '/mms/experiential-learning',
  '/mms/experiential-learning/3d-model-making-presentation',
  '/mms/experiential-learning/entrepreneurial-drive',
  '/mms/experiential-learning/financial-literacy-program',
  '/mms/experiential-learning/group-discussion',
  '/mms/experiential-learning/nesco-bombay-exhibition-centre',
  '/mms/experiential-learning/role-play',
  '/mms/facilities',
  '/mms/facilities/classroom',
  '/mms/facilities/gymkhana',
  '/mms/facilities/library',
  '/mms/facilities/seminar-hall',
  '/mms/faqs',
  '/mms/students-life',
  '/mms/students-life/about-add-on-courses',
  '/mms/students-life/add-on-courses-adavance-excel',
  '/mms/students-life/add-on-courses-advance-excel',
  '/mms/students-life/add-on-courses-powerbi',
  '/mms/students-life/book-review',
  '/mms/students-life/dlle',
  '/mms/students-life/event/:slug',
  '/mms/students-life/ideathon-1-0',
  '/mms/students-life/industry-expert-sessions',
  '/mms/students-life/nsim-training',
  '/mms/students-life/oscillations',
  '/mms/students-life/rankers',
  '/mms/students-life/v-ecstatic',
  '/mms/training-placement/placement',
  '/mms/training-placement/placement/gallery',
  '/mms/training-placement/placement/internships',
  '/mms/training-placement/placement/our-recruiters',
  '/mms/training-placement/placement/placement-cell',
  '/mms/training-placement/placement/psychometric-test',
  '/mms/training-placement/placement/psycometric-test',
  '/mms/training-placement/placement/soft-skill-training',
  '/mms/training-placement/placement/students-placements',
  '/mms/training-placement/training',
  '/mms/training-placement/training/career-guidance',
  '/mms/training-placement/training/events',
  '/mms/training-placement/training/gallery',
  '/mms/training-placement/training/internship',
  '/naac-score',
  '/naac-ssr-cycle-1',
  '/nirf',
  '/nsdc',
  '/nss',
  '/oracle-academy',
  '/organizational-structure',
  '/parents',
  '/patents',
  '/placement',
  '/presidents-desk',
  '/principals-desk',
  '/publications',
  '/research',
  '/research-downloads',
  '/research-facility',
  '/robotics-lab',
  '/scholarships',
  '/sc-st-committee',
  '/sedg-cell',
  '/sports-committee',
  '/sports-gymkhana',
  '/srgc-committee',
  '/ssr-cycle-1',
  '/ssr-cycle-2',
  '/sss-report',
  '/strategic-plan',
  '/students-club',
  '/students-council',
  '/swayam-nptel',
  '/teaching-learning',
  '/texas-instruments-lab',
  '/training',
  '/vmea',
];

const SEGMENT_KEYWORD_ALIASES: Record<string, string[]> = {
  mms: ['mba', 'management studies', 'master of management studies'],
  exams: ['exam', 'examination', 'test'],
  exam: ['results', 'timetable', 'question paper', 'syllabus', 'notices'],
  iic: ['innovation council'],
  iete: ['electronics society'],
  ecell: ['e cell', 'entrepreneurship'],
  ebsb: ['ek bharat shreshtha bharat'],
  nirf: ['ranking'],
  naac: ['accreditation'],
  sss: ['student satisfaction survey'],
  ssr: ['self study report'],
  iqac: ['quality assurance'],
  nsdc: ['skill development'],
  nss: ['national service scheme'],
  csi: ['computer society'],
  ieee: ['technical society'],
};

function toWords(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[_/\\.-]+/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function toTitleFromPath(path: string): string {
  if (path === '/') return 'Home';

  const cleaned = path
    .replace(/\/:[^/]+/g, ' profile')
    .replace(/^\//, '')
    .split('/')
    .filter(Boolean)
    .slice(-2)
    .join(' ')
    .replace(/-/g, ' ')
    .replace(/\b([a-z])/g, (m) => m.toUpperCase());

  return cleaned || 'Page';
}

function categoryFromPath(path: string): string {
  if (path === '/') return 'Homepage';
  const first = path.split('/').filter(Boolean)[0] || 'Page';
  return first
    .replace(/-/g, ' ')
    .replace(/\b([a-z])/g, (m) => m.toUpperCase());
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function keywordsForPath(path: string): string[] {
  const tokens = toWords(path);
  const aliases = tokens.flatMap((token) => SEGMENT_KEYWORD_ALIASES[token] || []);
  return unique([...tokens, ...aliases.flatMap(toWords)]);
}

export function buildRouteCatalogEntries(): RouteSearchEntry[] {
  const entries: RouteSearchEntry[] = [];

  for (const path of PUBLIC_ROUTE_PATHS) {
    if (path.includes('/:')) continue;

    const category = categoryFromPath(path);
    const label = toTitleFromPath(path);

    entries.push({
      label,
      href: path,
      category,
      context: `Route ${path}`,
      keywords: keywordsForPath(path),
      external: false,
    });
  }

  return entries;
}
