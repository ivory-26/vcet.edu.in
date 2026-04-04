import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, Video, Trash2, Plus, CheckCircle, AlertTriangle, GripVertical } from 'lucide-react';
import { resolveApiUrl } from '../../api/client';
import type { MMSHomePayload } from '../../types';
import { mmsHomeApi } from '../../api/mmsHomeApi';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import { SortableListContext } from '../../components/SortableList';

const emptyForm: MMSHomePayload = {
  sliders: Array(3).fill({ title: '', subtitle: '', image: null }),
  admission: { heading: '', description: '', banner: null },
  notices: Array(3).fill({ title: '', label: '', text: '' }),
  notifications: Array(3).fill({ title: '', text: '' }),
  internships: Array(3).fill({ title: '', altText: '', logo: null }),
  events: Array(3).fill({ title: '', eventTitle: '', altText: '', image: null }),
  testimonials: Array(3).fill({ sectionTitle: '', name: '', role: '', quote: '' }),
  videos: Array(3).fill({ sectionTitle: '', videoTitle: '', posterAlt: '', videoFile: null, videoUrl: '', poster: null }),
  documents: Array(2).fill({ label: '', url: '', pdfFile: null })
};

const MMSHomepageForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<MMSHomePayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await mmsHomeApi.get();
      if (res.data) {
        const fetchedData = { ...res.data };
        ['sliders', 'notices', 'notifications', 'internships', 'events', 'testimonials', 'videos', 'documents'].forEach(key => {
           if (fetchedData[key] !== null && typeof fetchedData[key] === 'object' && !Array.isArray(fetchedData[key])) {
              fetchedData[key] = Object.values(fetchedData[key]);
           }
        });
        setForm({ ...emptyForm, ...fetchedData });
      }
    } catch (e) {
      console.warn('Could not fetch old data, assuming empty CMS state', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSaving(true);
    setError('');
    setSuccessMsg('');
    try {
      await mmsHomeApi.update(form);
      setSuccessMsg('MMS Homepage updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update homepage');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key: keyof MMSHomePayload, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleArrayChange = (key: keyof MMSHomePayload, index: number, field: string, value: any) => {
    setForm(prev => {
      const list = [...(prev[key] as any[])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [key]: list };
    });
  };

  const addArrayItem = (key: keyof MMSHomePayload, defaultItem: any) => {
    setForm(prev => ({
      ...prev,
      [key]: [...(prev[key] as any[]), defaultItem]
    }));
  };

  const removeArrayItem = (key: keyof MMSHomePayload, index: number) => {
    setForm(prev => ({
      ...prev,
      [key]: (prev[key] as any[]).filter((_, i) => i !== index)
    }));
  };

  if (loading) {
     return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      <PageEditorHeader
        title="Edit Homepage"
        description="MMS Homepage Content Editor"
        onSave={() => {
          void handleSave();
        }}
        isSaving={saving}
        showBackButton
        onBack={() => navigate('/admin/pages/mms')}
      />

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-5 py-4 text-sm text-red-600 font-medium flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" /> {error}
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-4 text-sm text-emerald-600 font-medium flex items-center gap-3">
          <CheckCircle className="w-5 h-5 shrink-0" /> {successMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Admission Highlight */}
        <SectionCard title="Admission Highlight" icon="🎓">
          <div className="grid gap-4">
            <div>
              <label className="admin-label">Heading (Max 60)</label>
              <input 
                id="mmshome-adm-h" 
                name="mmshome-adm-h" 
                maxLength={60} 
                value={form.admission.heading || ''} 
                onChange={e => updateField('admission', { ...form.admission, heading: e.target.value })} 
                className="admin-input-small" 
              />
            </div>
            <div>
              <label className="admin-label">Description (Max 220)</label>
              <textarea 
                id="mmshome-adm-desc" 
                name="mmshome-adm-desc" 
                maxLength={220} 
                value={form.admission.description || ''} 
                onChange={e => updateField('admission', { ...form.admission, description: e.target.value })} 
                className="admin-input-small" 
                rows={3} 
              />
            </div>
            <div>
              <label className="admin-label">Banner Image</label>
              <input 
                id="mmshome-adm-banner" 
                name="mmshome-adm-banner" 
                type="file" 
                accept="image/*" 
                onChange={e => updateField('admission', { ...form.admission, banner: e.target.files?.[0] || null })} 
                className="admin-input-small" 
              />
              <FilePreview file={form.admission.banner} type="image" onRemove={() => updateField('admission', { ...form.admission, banner: null })} />
            </div>
          </div>
        </SectionCard>

        {/* Notice Board */}
        <SectionCard title="Notice Board" icon="📢">
          <div className="flex justify-end mb-4">
            <button type="button" onClick={() => addArrayItem('notices', { title: '', label: '', text: '' })} className="btn-add w-auto px-4">
              <Plus className="w-4 h-4" /> Add Notice
            </button>
          </div>
          <div className="space-y-4">
            <SortableListContext
              items={form.notices}
              onChange={val => updateField('notices', val)}
              renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-5 bg-slate-50 border border-slate-200 rounded-xl relative ${isDragging ? 'z-50 ring-2 ring-blue-500 shadow-xl bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                      <GripVertical className="w-5 h-5" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Notice #{i + 1}</span>
                    </div>
                    <button type="button" onClick={() => removeArrayItem('notices', i)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="admin-label">Title (Max 35)</label>
                      <input id={`not-t-${i}`} maxLength={35} value={item.title || ''} onChange={e => handleArrayChange('notices', i, 'title', e.target.value)} className="admin-input-small" />
                    </div>
                    <div>
                      <label className="admin-label">Label (Max 20)</label>
                      <input id={`not-l-${i}`} maxLength={20} value={item.label || ''} onChange={e => handleArrayChange('notices', i, 'label', e.target.value)} className="admin-input-small" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="admin-label">Text (Max 120)</label>
                    <textarea id={`not-txt-${i}`} maxLength={120} value={item.text || ''} onChange={e => handleArrayChange('notices', i, 'text', e.target.value)} className="admin-input-small" rows={2} />
                  </div>
                </div>
              )}
            />
          </div>
        </SectionCard>

        {/* Latest Notifications */}
        <SectionCard title="Latest Notifications" icon="🔔">
          <div className="flex justify-end mb-4">
            <button type="button" onClick={() => addArrayItem('notifications', { title: '', text: '' })} className="btn-add w-auto px-4">
              <Plus className="w-4 h-4" /> Add Notification
            </button>
          </div>
          <div className="space-y-3">
            <SortableListContext
              items={form.notifications}
              onChange={val => updateField('notifications', val)}
              renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl relative ${isDragging ? 'z-50 ring-2 ring-blue-500 shadow-xl bg-white' : ''}`}>
                  <div className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <input 
                      id={`notif-${i}`} 
                      value={item.title || item.text || ''} 
                      onChange={e => handleArrayChange('notifications', i, 'title', e.target.value)} 
                      className="admin-input-small" 
                      placeholder="Notification text..."
                    />
                  </div>
                  <button type="button" onClick={() => removeArrayItem('notifications', i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            />
          </div>
        </SectionCard>

        {/* Testimonials */}
        <SectionCard title="Testimonials" icon="💬">
          <SortableListContext
            items={form.testimonials}
            onChange={val => updateField('testimonials', val)}
            renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
              <div ref={setNodeRef} style={style} className={`p-6 border border-slate-100 bg-slate-50/50 rounded-2xl mb-6 relative ${isDragging ? 'z-50 ring-2 ring-blue-500 shadow-xl bg-white' : ''}`}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                    <GripVertical className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Testimonial #{i+1}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="admin-label">Section Title (Max 40)</label>
                    <input maxLength={40} value={item.sectionTitle || ''} onChange={e => handleArrayChange('testimonials', i, 'sectionTitle', e.target.value)} className="admin-input-small" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="admin-label">Student Name (Max 35)</label>
                      <input maxLength={35} value={item.name || ''} onChange={e => handleArrayChange('testimonials', i, 'name', e.target.value)} className="admin-input-small" />
                    </div>
                    <div>
                      <label className="admin-label">Role (Max 30)</label>
                      <input maxLength={30} value={item.role || ''} onChange={e => handleArrayChange('testimonials', i, 'role', e.target.value)} className="admin-input-small" />
                    </div>
                  </div>
                  <div>
                    <label className="admin-label">Quote (Max 320)</label>
                    <textarea maxLength={320} value={item.quote || ''} onChange={e => handleArrayChange('testimonials', i, 'quote', e.target.value)} className="admin-input-small" rows={3} />
                  </div>
                </div>
              </div>
            )}
          />
        </SectionCard>

        {/* Summer Internships */}
        <SectionCard title="Summer Internships" icon="🏢">
          <div className="flex justify-end mb-4">
            <button type="button" onClick={() => addArrayItem('internships', { title: '', altText: '', logo: null })} className="btn-add w-auto px-4">
              <Plus className="w-4 h-4" /> Add Internship
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SortableListContext
              items={form.internships}
              onChange={val => updateField('internships', val)}
              renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-5 bg-white border border-slate-200 rounded-2xl relative space-y-4 ${isDragging ? 'z-50 ring-2 ring-blue-500 shadow-xl' : ''}`}>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                      <GripVertical className="w-5 h-5" />
                      <span className="text-[10px] font-black tracking-widest text-slate-400">#{i+1}</span>
                    </div>
                    <button type="button" onClick={() => removeArrayItem('internships', i)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <label className="admin-label">Company Name</label>
                    <input maxLength={60} value={item.title || ''} onChange={e => handleArrayChange('internships', i, 'title', e.target.value)} className="admin-input-small" />
                  </div>
                  <div>
                    <label className="admin-label">Company Logo</label>
                    <input type="file" accept="image/*" onChange={e => handleArrayChange('internships', i, 'logo', e.target.files?.[0] || null)} className="admin-input-small" />
                    <FilePreview file={item.logo} type="image" onRemove={() => handleArrayChange('internships', i, 'logo', null)} />
                  </div>
                </div>
              )}
            />
          </div>
        </SectionCard>

        {/* Our Events */}
        <SectionCard title="Our Events" icon="🎉">
          <div className="flex justify-end mb-4">
            <button type="button" onClick={() => addArrayItem('events', { title: '', eventTitle: '', altText: '', image: null })} className="btn-add w-auto px-4">
              <Plus className="w-4 h-4" /> Add Event
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SortableListContext
              items={form.events}
              onChange={val => updateField('events', val)}
              renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-5 bg-white border border-slate-200 rounded-2xl relative space-y-4 ${isDragging ? 'z-50 ring-2 ring-blue-500 shadow-xl' : ''}`}>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                      <GripVertical className="w-5 h-5" />
                      <span className="text-[10px] font-black tracking-widest text-slate-400">#{i+1}</span>
                    </div>
                    <button type="button" onClick={() => removeArrayItem('events', i)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <label className="admin-label">Event Title (Max 60)</label>
                    <input maxLength={60} value={item.title || item.eventTitle || ''} onChange={e => handleArrayChange('events', i, 'title', e.target.value)} className="admin-input-small" />
                  </div>
                  <div>
                    <label className="admin-label">Event Flyer / Image</label>
                    <input type="file" accept="image/*" onChange={e => handleArrayChange('events', i, 'image', e.target.files?.[0] || null)} className="admin-input-small" />
                    <FilePreview file={item.image} type="image" onRemove={() => handleArrayChange('events', i, 'image', null)} />
                  </div>
                </div>
              )}
            />
          </div>
        </SectionCard>

        {/* Experiential Learning Videos */}
        <SectionCard title="Experiential Learning Videos" icon="🎥">
          <SortableListContext
            items={form.videos}
            onChange={val => updateField('videos', val)}
            renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
              <div ref={setNodeRef} style={style} className={`p-6 border border-slate-100 bg-slate-50/50 rounded-3xl mb-6 relative ${isDragging ? 'z-50 ring-2 ring-blue-500 shadow-xl bg-white' : ''}`}>
                <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors mb-5" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                  <GripVertical className="w-5 h-5" />
                  <span className="text-[10px] font-black text-slate-400 uppercase">Video #{i+1}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="admin-label">Section Title (Max 45)</label>
                    <input maxLength={45} value={item.sectionTitle || ''} onChange={e => handleArrayChange('videos', i, 'sectionTitle', e.target.value)} className="admin-input-small" />
                  </div>
                  <div>
                    <label className="admin-label">Video Title (Max 55)</label>
                    <input maxLength={55} value={item.videoTitle || ''} onChange={e => handleArrayChange('videos', i, 'videoTitle', e.target.value)} className="admin-input-small" />
                  </div>
                  <div>
                    <label className="admin-label">Video URL (Max 250)</label>
                    <input maxLength={250} value={item.videoUrl || ''} onChange={e => handleArrayChange('videos', i, 'videoUrl', e.target.value)} placeholder="Or upload below" className="admin-input-small" />
                  </div>
                  <div>
                    <label className="admin-label">Video File Upload</label>
                    <input type="file" accept="video/*" onChange={e => handleArrayChange('videos', i, 'videoFile', e.target.files?.[0] || null)} className="admin-input-small" />
                    <FilePreview file={item.videoFile} type="video" onRemove={() => handleArrayChange('videos', i, 'videoFile', null)} />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="admin-label">Poster Alt Text (Max 90)</label>
                      <input maxLength={90} value={item.posterAlt || ''} onChange={e => handleArrayChange('videos', i, 'posterAlt', e.target.value)} className="admin-input-small" />
                    </div>
                    <div>
                      <label className="admin-label">Poster Image</label>
                      <input type="file" accept="image/*" onChange={e => handleArrayChange('videos', i, 'poster', e.target.files?.[0] || null)} className="admin-input-small" />
                      <FilePreview file={item.poster} type="image" onRemove={() => handleArrayChange('videos', i, 'poster', null)} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          />
        </SectionCard>

        {/* Resources / PDF Documents */}
        <SectionCard title="Resources / Documents" icon="📄">
          <div className="flex justify-end mb-4">
            <button type="button" onClick={() => addArrayItem('documents', { label: '', url: '', pdfFile: null })} className="btn-add w-auto px-4">
              <Plus className="w-4 h-4" /> Add Document
            </button>
          </div>
          <div className="space-y-4">
            <SortableListContext
              items={form.documents}
              onChange={val => updateField('documents', val)}
              renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-5 bg-slate-50 border border-slate-200 rounded-2xl relative ${isDragging ? 'z-50 ring-2 ring-blue-500 shadow-xl bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                      <GripVertical className="w-5 h-5" />
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Document #{i+1}</span>
                    </div>
                    <button type="button" onClick={() => removeArrayItem('documents', i)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <label className="admin-label">Document Label (Max 60)</label>
                    <input maxLength={60} value={item.label || ''} onChange={e => handleArrayChange('documents', i, 'label', e.target.value)} className="admin-input-small" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <label className="admin-label">External URL (Optional)</label>
                      <input value={item.url || ''} onChange={e => handleArrayChange('documents', i, 'url', e.target.value)} placeholder="https://..." className="admin-input-small" />
                    </div>
                    <div>
                      <label className="admin-label">Upload PDF File</label>
                      <input type="file" accept="application/pdf" onChange={e => handleArrayChange('documents', i, 'pdfFile', e.target.files?.[0] || null)} className="admin-input-small" />
                      <FilePreview file={item.pdfFile} type="pdf" onRemove={() => handleArrayChange('documents', i, 'pdfFile', null)} />
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </SectionCard>
      </form>

      <style>{`
        .admin-input-small { width: 100%; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 0.5rem 0.75rem; color: #0f172a; font-size: 0.75rem; font-weight: 500; outline: none; transition: 0.2s; }
        .admin-input-small:focus { border-color: #2563EB; background: #fff; box-shadow: 0 0 0 2px rgba(37,99,235, 0.1); }
        .admin-label { display: block; font-size: 0.65rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.35rem; }
        .btn-add { display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; border: 2px dashed #cbd5e1; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; font-weight: bold; color: #64748b; background: white; transition: 0.2s; cursor: pointer; }
        .btn-add:hover { border-color: #2563EB; color: #2563EB; background: #eff6ff; }
      `}</style>
    </div>
  );
};

/* ── Helper Components ── */

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-4xl p-8 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
    <div className="flex items-center gap-3 mb-8">
       {icon && <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg shadow-sm border border-slate-100">{icon}</div>}
       <h3 className="text-sm font-black text-[#111827] uppercase tracking-wider">{title}</h3>
    </div>
    <div>{children}</div>
  </div>
);

const FilePreview = ({ file, type, onRemove }: { file: any, type: 'image' | 'video' | 'pdf', onRemove?: () => void }) => {
  if (!file) return null;
  const url = typeof file === 'string' ? resolveApiUrl(file) : (file.url ? resolveApiUrl(file.url) : URL.createObjectURL(file as File));
  return (
    <div className="mt-2 rounded border border-slate-200 p-2 bg-slate-50 flex items-center justify-between">
      <div className="flex items-center">
        {type === 'image' ? (
          <img src={url} alt="preview" className="h-12 w-auto rounded object-cover" />
        ) : type === 'video' ? (
          <video src={url} className="h-12 w-auto rounded object-cover" muted />
        ) : (
          <div className="h-12 w-12 flex items-center justify-center bg-brand-blue/10 text-brand-blue rounded">
            <span className="text-xs font-bold">PDF</span>
          </div>
        )}
        <div className="text-xs text-slate-500 max-w-xs truncate ml-2">
          {typeof file === 'string' ? file.split('/').pop() : ((file as any).name || 'Current ' + type)}
        </div>
      </div>
      {onRemove && (
        <button type="button" onClick={onRemove} className="ml-4 p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default MMSHomepageForm;
