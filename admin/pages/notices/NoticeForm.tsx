import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { noticesApi } from '../../api/notices';
import type { NoticePayload } from '../../types';
import PdfPreviewModal from '../../components/PdfPreviewModal';

const CATEGORIES = ['Academic', 'Cultural', 'Placement', 'Administrative', 'General'];

const empty: NoticePayload = {
  title: '',
  category: 'General',
  description: '',
  is_active: true,
  expiry_date: '',
  expiry_time: '',
};

const NoticeForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<NoticePayload>(empty);
  const [file, setFile] = useState<File | null>(null);
  const [existingPdfUrl, setExistingPdfUrl] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    setFetching(true);
    noticesApi
      .get(Number(id))
      .then((r) => {
        if (r.data) {
          const d = r.data;
          setForm({
            title: d.title,
            category: d.category ?? 'General',
            description: d.description ?? '',
            is_active: d.is_active,
            expiry_date: d.expiry_date ?? '',
            expiry_time: d.expiry_time ?? '',
          });
          if (d.attachment) setExistingPdfUrl(d.attachment);
        }
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setFetching(false));
  }, [id]);

  const set = <K extends keyof NoticePayload>(key: K, value: NoticePayload[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isEdit && !file) {
      setError('A PDF file is required when uploading a new notice.');
      return;
    }

    setLoading(true);
    const payload: NoticePayload = { ...form };
    if (file) payload.attachment = file;

    try {
      if (isEdit) {
        await noticesApi.update(Number(id), payload);
      } else {
        await noticesApi.create(payload);
      }
      navigate('/admin/notices');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) {
      setFile(null);
      return;
    }
    if (selected.type !== 'application/pdf') {
      alert('Only PDF files are allowed.');
      e.target.value = '';
      return;
    }
    setFile(selected);
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-3 border-slate-100 border-t-[#2563EB] rounded-full animate-spin" />
      </div>
    );
  }

  const pdfPreviewToUse = file ? URL.createObjectURL(file) : existingPdfUrl;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <PdfPreviewModal 
        isOpen={previewOpen} 
        onClose={() => setPreviewOpen(false)} 
        pdfUrl={pdfPreviewToUse} 
        title={form.title || 'PDF Preview'} 
      />

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-widest">
            <Link to="/admin" className="hover:text-slate-600 transition-colors">Dashboard</Link>
            <span className="text-slate-300 font-normal">/</span>
            <Link to="/admin/notices" className="hover:text-slate-600 transition-colors">Notices</Link>
            <span className="text-slate-300 font-normal">/</span>
            <span className="text-slate-600">{isEdit ? 'Edit' : 'New'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">{isEdit ? 'Edit Notice' : 'Upload New Notice'}</h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4 text-sm text-red-600 font-medium flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border text-left border-slate-200 shadow-sm rounded-3xl p-8 lg:p-10 space-y-8">
        {/* Basic Info */}
        <div className="space-y-6">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Notice Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Notice Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                required
                className="admin-input"
                placeholder="e.g. Mandatory End Semester Form Submission"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Category</label>
              <select
                value={form.category ?? 'General'}
                onChange={(e) => set('category', e.target.value)}
                className="admin-input appearance-none"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            
            <div className="flex items-center pt-8">
              <label className="flex items-center gap-3.5 cursor-pointer group select-none">
                <div className={`relative flex items-center w-12 h-6.5 rounded-full transition-all duration-300 ${form.is_active ? 'bg-[#2563EB]' : 'bg-slate-200'}`}>
                  <input type="checkbox" checked={form.is_active} onChange={(e) => set('is_active', e.target.checked)} className="sr-only" />
                  <span className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${form.is_active ? 'translate-x-6.5' : 'translate-x-1'}`} />
                </div>
                <div>
                  <span className="block text-sm font-bold text-slate-700 group-hover:text-black transition-colors">Set as Active</span>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Description (Optional)</label>
            <textarea
              value={form.description ?? ''}
              onChange={(e) => set('description', e.target.value)}
              rows={3}
              className="admin-input resize-none"
              placeholder="Brief summary or details about the notice..."
            />
          </div>
        </div>

        {/* Expiry Details */}
        <div className="space-y-6 pt-2">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Expiry Details</h3>
          <p className="text-xs text-slate-500 font-medium">When the date and time pass, the notice will automatically be marked as "Expired" and will no longer show on the user side.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Expiry Date *</label>
              <input
                type="date"
                value={form.expiry_date ?? ''}
                onChange={(e) => set('expiry_date', e.target.value)}
                required
                className="admin-input"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Expiry Time *</label>
              <input
                type="time"
                value={form.expiry_time ?? ''}
                onChange={(e) => set('expiry_time', e.target.value)}
                required
                className="admin-input"
              />
            </div>
          </div>
        </div>

        {/* PDF Upload Area */}
        <div className="space-y-6 pt-2">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Document Upload</h3>
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-500 mb-4 ring-1 ring-slate-100">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            </div>
            
            <input
              type="file"
              accept=".pdf,application/pdf"
              id="file-upload"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <label htmlFor="file-upload" className="cursor-pointer bg-white ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-[#2563EB] text-[#2563EB] text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-sm">
              Browse PDF File
            </label>
            
            <p className="text-xs text-slate-400 font-medium mt-3">Maximum file size: 10MB. PDF formats only.</p>

            {/* Display Selected File or Existing PDF */}
            {pdfPreviewToUse && (
              <div className="mt-6 w-full flex items-center justify-between bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-black tracking-tight">PDF</span>
                  </div>
                  <div className="text-left truncate">
                    <p className="text-sm font-bold text-slate-900 truncate">{file ? file.name : (form.title || 'Current Document.pdf')}</p>
                    <p className="text-xs text-emerald-600 font-bold uppercase tracking-wide">Ready for upload</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  className="ml-4 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  Preview
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate('/admin/notices')}
            className="px-6 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#2563EB] hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <span>{isEdit ? 'Save Changes' : 'Upload Notice'}</span>
            )}
          </button>
        </div>
      </form>

      <style>{`
        .admin-input {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: #0f172a;
          font-size: 0.875rem;
          font-weight: 500;
          outline: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .admin-input::placeholder { color: #94a3b8; font-weight: 400; }
        .admin-input:focus { 
          border-color: #2563EB; 
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(37,99,235, 0.1);
        }
        select.admin-input {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1.25rem;
          padding-right: 2.5rem;
        }
      `}</style>
    </div>
  );
};

export default NoticeForm;
