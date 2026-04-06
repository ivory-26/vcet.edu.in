import React, { useEffect } from 'react';

const Accreditation: React.FC = () => {
  useEffect(() => {
    const pdfPath = '/pdfs/Accreditation/NBA_Certificate.pdf';
    window.location.href = pdfPath;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-slate-800 px-4 py-8">
      <div className="text-center">
        <p className="text-sm text-slate-500">Opening accreditation certificate...</p>
        <p className="mt-3 text-base text-slate-700">
          If the PDF does not open automatically, <a href="/pdfs/Accreditation/NBA_Certificate.pdf" className="font-semibold text-brand-blue underline">click here</a>.
        </p>
      </div>
    </div>
  );
};

export default Accreditation;
