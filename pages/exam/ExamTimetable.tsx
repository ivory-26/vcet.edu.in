import React, { useEffect, useState } from 'react';
import ExamPDFPage, { PDFGroup } from './ExamPDFPage';
import { pagesApi } from '../../admin/api/pagesApi';
import { resolveBackendHref } from '../../utils/uploadedAssets';

const defaultTimetableGroups: PDFGroup[] = [
  {
    groupName: 'Current Exam Timetables',
    pdfs: [
      { name: 'TIME-TABLE_SEM-VIII_C-SCHEME_AUG-2025', url: '/pdfs/Exam/UniversityExamTime-Table/TIME-TABLE_SEM-VIII_C-SCHEME_AUG-2025.pdf' },
      { name: 'TIME TABLE_SEM V_C-SCHEME_NOV 2025', url: '/pdfs/Exam/UniversityExamTime-Table/TIME-TABLE_SEM-V_C-SCHEME_NOV-2025.pdf' },
      { name: 'TIME TABLE_SEM III_C-SCHEME_NOV 2025', url: '/pdfs/Exam/UniversityExamTime-Table/TIME-TABLE_SEM-III_C-SCHEME_NOV-2025.pdf' },
      { name: 'TIME TABLE_SEM I_C-SCHEME_NOV 2025', url: '/pdfs/Exam/UniversityExamTime-Table/TIME-TABLE_SEM-I-_C-SCHEME_-NOV-2025.pdf' },
      { name: 'TIME TABLE _SEM VII_C-SCHEME_MAY 2025', url: '/pdfs/Exam/UniversityExamTime-Table/TIME-TABLE-_SEM-VII_C-SCHEME_MAY-2025.pdf' },
      { name: 'TIME TABLE _SEM V_C-SCHEME_MAY 2025', url: '/pdfs/Exam/UniversityExamTime-Table/TIME-TABLE-_SEM-V_C-SCHEME_MAY-2025.pdf' },
      { name: 'TIME TABLE _SEM III_C-SCHEME_MAY 2025', url: '/pdfs/Exam/UniversityExamTime-Table/TIME-TABLE-_SEM-III_C-SCHEME_MAY-2025.pdf' }
    ]
  }
];

const ExamTimetable: React.FC = () => {
  const [timetableGroups, setTimetableGroups] = useState<PDFGroup[]>(defaultTimetableGroups);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pagesApi.exam.get()
      .then((res: any) => {
        const data = res?.data || res;
        if (data && data.timetable && data.timetable.length > 0) {
          const uploadedPdfs = data.timetable.map((doc: any) => ({
            name: doc.title,
            url: doc.fileUrl ? resolveBackendHref(doc.fileUrl) : ''
          })).filter((doc: { url: string }) => doc.url !== '');

          if (uploadedPdfs.length > 0) {
             setTimetableGroups([
               {
                 groupName: 'University Exam Timetable',
                 pdfs: uploadedPdfs
               }
             ]);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch exam data', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ExamPDFPage
      title="University Exam Timetable"
      subtitle="View current and upcoming semester examination schedules."
      breadcrumbLabel="Timetable"
      groups={timetableGroups}
    />
  );
};

export default ExamTimetable;
