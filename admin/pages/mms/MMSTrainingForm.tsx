import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Image as ImageIcon, CheckCircle, AlertTriangle } from 'lucide-react';
import type { TrainingPlacementPayload } from '../../types';
import { trainingPlacementApi } from '../../api/trainingPlacement';
import { resolveApiUrl } from '../../../services/api';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import { SortableListContext } from '../../components/SortableList';

const MMSTrainingForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<TrainingPlacementPayload>({
    trainingPoints: [],
    events: [],
    careerGuidance: { guidancePoints: [], seminars: [] },
    internshipSteps: [],
    trainingGallery: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await trainingPlacementApi.get();
      if (res.data) {
        setForm(prev => ({
          ...prev,
          ...res.data,
          trainingPoints: res.data.trainingPoints || [],
          events: res.data.events || [],
          careerGuidance: res.data.careerGuidance || { guidancePoints: [], seminars: [] },
          internshipSteps: res.data.internshipSteps || [],
          trainingGallery: res.data.trainingGallery || [],
        }));
      }
    } catch (e) {
      console.warn("Could not fetch old data:", e);
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
      await trainingPlacementApi.update(form);
      setSuccessMsg('Changes saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleTextChange = (value: string, limit: number, setter: (val: string) => void) => {
    if (value.length <= limit) setter(value);
  };

  if (loading) {
    return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading Form...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      <PageEditorHeader
        title="Training"
        description="MMS Training & Placement Editor"
        onSave={() => {
          void handleSave();
        }}
        isSaving={saving}
        showBackButton
        onBack={() => navigate('/admin/pages/mms')}
      />

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-5 py-4 text-sm text-red-600 font-medium flex items-center gap-3">
          <AlertTriangle className="w-5 h-5" /> {error}
        </div>
      )}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-4 text-sm text-emerald-600 font-medium flex items-center gap-3">
          <CheckCircle className="w-5 h-5" /> {successMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">

        {/* SECTION 1: Training Points */}
        <SectionCard title="Training Points" icon="📋">
          <p className="text-xs text-slate-500 mb-4 font-medium">Add up to 5 training initiative points. Each point max 170 characters.</p>
          <div className="space-y-3">
            <SortableListContext
              items={form.trainingPoints || []}
              onChange={val => setForm({ ...form, trainingPoints: val })}
              renderItem={(pt, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`flex gap-2 items-start ${isDragging ? 'z-50 ring-2 ring-blue-500 shadow-xl bg-white rounded-xl' : ''}`}>
                  <div className="flex items-center self-stretch px-2 cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                    <div className="flex flex-col gap-0.5">
                      <div className="w-4 h-0.5 bg-current" />
                      <div className="w-4 h-0.5 bg-current" />
                      <div className="w-4 h-0.5 bg-current" />
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <input id={`mms-trn-pt-${i}`} name={`mms-trn-pt-${i}`} aria-label="mmstrainingform field"
                      type="text"
                      value={pt.point}
                      onChange={(e) => handleTextChange(e.target.value, 170, (val) => {
                        const c = [...(form.trainingPoints || [])];
                        c[i] = { ...c[i], point: val };
                        setForm({ ...form, trainingPoints: c });
                      })}
                      placeholder="Enter training point..."
                      className="admin-input-small"
                    />
                    <span className="absolute right-2 top-2.5 text-[10px] text-slate-400">{pt.point.length}/170</span>
                  </div>
                  <button type="button" onClick={() => setForm({ ...form, trainingPoints: form.trainingPoints!.filter((_, idx) => idx !== i) })} className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            />
            {(form.trainingPoints?.length || 0) < 5 && (
              <button type="button" onClick={() => setForm({ ...form, trainingPoints: [...(form.trainingPoints || []), { point: '' }] })} className="btn-add">
                <Plus className="w-4 h-4" /> Add Training Point
              </button>
            )}
            {form.trainingPoints?.length === 5 && <p className="text-xs text-amber-500 font-bold">Max 5 points reached.</p>}
          </div>
        </SectionCard>

        {/* SECTION 2: Events */}
        <SectionCard title="Events" icon="📅">
          <p className="text-xs text-slate-500 mb-4 font-medium">Manage training events (max 3). Each event includes name, resource person, date, and image.</p>
          <div className="space-y-6">
            <SortableListContext
              items={form.events || []}
              onChange={val => setForm({ ...form, events: val })}
              renderItem={(ev, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-5 bg-slate-50 border border-slate-200 rounded-xl relative ${isDragging ? 'z-50 ring-2 ring-blue-500 shadow-xl bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-4 cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                      <div className="flex flex-col gap-0.5">
                        <div className="w-6 h-0.5 bg-current" />
                        <div className="w-6 h-0.5 bg-current" />
                        <div className="w-6 h-0.5 bg-current" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400">Event #{i + 1}</span>
                    </div>
                    <button type="button" onClick={() => setForm({ ...form, events: form.events!.filter((_, idx) => idx !== i) })} className="text-red-500 p-1 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="admin-label">Sr. No (Optional)</label>
                      <input id={`mms-trn-ev-sr-${i}`} name={`mms-trn-ev-sr-${i}`} aria-label="mmstrainingform field" className="admin-input-small" value={ev.srNo} onChange={e => {
                        const c = [...form.events!]; c[i] = { ...c[i], srNo: e.target.value }; setForm({ ...form, events: c });
                      }} />
                    </div>
                    <div className="relative">
                      <label className="admin-label">Date <span className="text-slate-400 normal-case">({ev.conductionDate.length}/15)</span></label>
                      <input id={`mms-trn-ev-date-${i}`} name={`mms-trn-ev-date-${i}`} aria-label="mmstrainingform field" className="admin-input-small" placeholder="e.g. 15 Mar 2025" value={ev.conductionDate} onChange={e => handleTextChange(e.target.value, 15, val => {
                        const c = [...form.events!]; c[i] = { ...c[i], conductionDate: val }; setForm({ ...form, events: c });
                      })} />
                    </div>
                    <div className="md:col-span-2 relative">
                      <label className="admin-label">Event Name <span className="text-slate-400 normal-case">({ev.eventName.length}/60)</span></label>
                      <input id={`mms-trn-ev-name-${i}`} name={`mms-trn-ev-name-${i}`} aria-label="mmstrainingform field" className="admin-input-small" value={ev.eventName} onChange={e => handleTextChange(e.target.value, 60, val => {
                        const c = [...form.events!]; c[i] = { ...c[i], eventName: val }; setForm({ ...form, events: c });
                      })} />
                    </div>
                    <div className="md:col-span-2 relative">
                      <label className="admin-label">Resource Person / Details <span className="text-slate-400 normal-case">({ev.resourcePerson.length}/350)</span></label>
                      <textarea id={`mms-trn-ev-res-${i}`} name={`mms-trn-ev-res-${i}`} aria-label="mmstrainingform textarea field" className="admin-input-small resize-none" rows={3} value={ev.resourcePerson} onChange={e => handleTextChange(e.target.value, 350, val => {
                        const c = [...form.events!]; c[i] = { ...c[i], resourcePerson: val }; setForm({ ...form, events: c });
                      })} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="admin-label mb-2">Event Image</label>
                        <ImageUploader onFileSelect={(f) => {
                          const c = [...form.events!]; c[i] = { ...c[i], image: f }; setForm({ ...form, events: c });
                        }} value={ev.image} />
                    </div>
                  </div>
                </div>
              )}
            />
            {(form.events?.length || 0) < 3 && (
              <button type="button" onClick={() => setForm({ ...form, events: [...(form.events || []), { srNo: '', eventName: '', resourcePerson: '', conductionDate: '' }] })} className="btn-add">
                <Plus className="w-4 h-4" /> Add Event (Max 3)
              </button>
            )}
            {form.events?.length === 3 && <p className="text-xs text-amber-500 font-bold">Max 3 events reached.</p>}
          </div>
        </SectionCard>

        {/* SECTION 3: Career Guidance */}
        <SectionCard title="Career Guidance" icon="🧭">
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-sm text-slate-700 mb-3">Guidance Points <span className="text-slate-400 font-medium text-xs">(Max 4, 100 chars each)</span></h4>
              <div className="space-y-2">
                <SortableListContext
                  items={form.careerGuidance?.guidancePoints || []}
                  onChange={val => setForm({ ...form, careerGuidance: { ...form.careerGuidance!, guidancePoints: val } })}
                  renderItem={(pt, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                    <div ref={setNodeRef} style={style} className={`flex gap-2 ${isDragging ? 'z-50 ring-2 ring-blue-500 shadow-xl bg-white rounded-lg' : ''}`}>
                      <div className="flex items-center px-1 cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                        <div className="flex flex-col gap-0.5">
                          <div className="w-3 h-0.5 bg-current" />
                          <div className="w-3 h-0.5 bg-current" />
                          <div className="w-3 h-0.5 bg-current" />
                        </div>
                      </div>
                      <div className="flex-1 relative">
                        <input id={`mms-trn-guid-pt-${i}`} name={`mms-trn-guid-pt-${i}`} aria-label="mmstrainingform field" className="admin-input-small" value={pt.point} placeholder="Point description" onChange={e => handleTextChange(e.target.value, 100, val => {
                          const c = { ...form.careerGuidance! }; 
                          const pts = [...c.guidancePoints]; pts[i] = { ...pts[i], point: val }; 
                          setForm({ ...form, careerGuidance: { ...c, guidancePoints: pts } });
                        })} />
                        <span className="absolute right-2 top-2.5 text-[10px] text-slate-400">{pt.point.length}/100</span>
                      </div>
                      <button type="button" onClick={() => {
                        const c = { ...form.careerGuidance! }; 
                        const pts = [...c.guidancePoints]; pts.splice(i, 1);
                        setForm({ ...form, careerGuidance: { ...c, guidancePoints: pts } });
                      }} className="p-2 text-red-500 rounded-lg shrink-0"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  )}
                />
                {(form.careerGuidance?.guidancePoints?.length || 0) < 4 && (
                  <button type="button" onClick={() => {
                    const c = form.careerGuidance ? { ...form.careerGuidance } : { guidancePoints: [], seminars: [] };
                    setForm({ ...form, careerGuidance: { ...c, guidancePoints: [...c.guidancePoints, { point: '' }] } });
                  }} className="text-xs font-bold text-blue-600 hover:underline mt-1">+ Add Point</button>
                )}
              </div>
            </div>

            <div className="pt-5 border-t border-slate-200">
              <h4 className="font-bold text-sm text-slate-700 mb-3">Seminars / Events <span className="text-slate-400 font-medium text-xs">(Max 8)</span></h4>
              <div className="space-y-4">
                <SortableListContext
                  items={form.careerGuidance?.seminars || []}
                  onChange={val => setForm({ ...form, careerGuidance: { ...form.careerGuidance!, seminars: val } })}
                  renderItem={(sem, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                    <div ref={setNodeRef} style={style} className={`p-4 bg-slate-50 border border-slate-200 rounded-xl relative ${isDragging ? 'z-50 ring-2 ring-blue-500 shadow-xl bg-white' : ''}`}>
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-4 cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                          <div className="flex flex-col gap-0.5">
                            <div className="w-5 h-0.5 bg-current" />
                            <div className="w-5 h-0.5 bg-current" />
                            <div className="w-5 h-0.5 bg-current" />
                          </div>
                          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Seminar #{i + 1}</span>
                        </div>
                        <button type="button" onClick={() => {
                          const c = { ...form.careerGuidance! }; 
                          const sems = [...c.seminars]; sems.splice(i, 1);
                          setForm({ ...form, careerGuidance: { ...c, seminars: sems } });
                        }} className="text-red-500 p-1 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                      <div className="space-y-3">
                        <div className="relative">
                          <label className="admin-label">Title <span className="text-slate-400 normal-case">({sem.title.length}/50)</span></label>
                          <input id={`mms-trn-sem-title-${i}`} name={`mms-trn-sem-title-${i}`} aria-label="mmstrainingform field" className="admin-input-small" placeholder="Seminar / Event title" value={sem.title} onChange={e => handleTextChange(e.target.value, 50, val => {
                            const c = { ...form.careerGuidance! };
                            const sems = [...c.seminars]; sems[i] = { ...sems[i], title: val };
                            setForm({ ...form, careerGuidance: { ...c, seminars: sems } });
                          })} />
                        </div>
                        <div className="relative">
                          <label className="admin-label">Resource Details <span className="text-slate-400 normal-case">({sem.resourceDetails.length}/180)</span></label>
                          <input id={`mms-trn-sem-res-${i}`} name={`mms-trn-sem-res-${i}`} aria-label="mmstrainingform field" className="admin-input-small" placeholder="Resource person profile" value={sem.resourceDetails} onChange={e => handleTextChange(e.target.value, 180, val => {
                            const c = { ...form.careerGuidance! };
                            const sems = [...c.seminars]; sems[i] = { ...sems[i], resourceDetails: val };
                            setForm({ ...form, careerGuidance: { ...c, seminars: sems } });
                          })} />
                        </div>
                        <div>
                          <label className="admin-label mb-2">Seminar Image</label>
                            <ImageUploader onFileSelect={(f) => {
                              const c = { ...form.careerGuidance! };
                              const sems = [...c.seminars]; sems[i] = { ...sems[i], image: f };
                              setForm({ ...form, careerGuidance: { ...c, seminars: sems } });
                            }} value={sem.image} />
                        </div>
                      </div>
                    </div>
                  )}
                />
                {(form.careerGuidance?.seminars?.length || 0) < 8 && (
                  <button type="button" onClick={() => {
                    const c = form.careerGuidance ? { ...form.careerGuidance } : { guidancePoints: [], seminars: [] };
                    setForm({ ...form, careerGuidance: { ...c, seminars: [...c.seminars, { title: '', resourceDetails: '' }] } });
                  }} className="btn-add">
                    <Plus className="w-4 h-4" /> Add Seminar (Max 8)
                  </button>
                )}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 4: Internship Procedure Steps */}
        <SectionCard title="Internship Procedure Steps" icon="📝">
          <p className="text-xs text-slate-500 mb-4 font-medium">Define the internship procedure steps (max 5). Each step max 120 characters.</p>
          <div className="space-y-3">
            <SortableListContext
              items={form.internshipSteps || []}
              onChange={val => setForm({ ...form, internshipSteps: val })}
              renderItem={(step, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`flex gap-2 items-center ${isDragging ? 'z-50 ring-2 ring-blue-500 shadow-xl bg-white rounded-lg' : ''}`}>
                  <div className="flex items-center px-1 cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                    <div className="flex flex-col gap-0.5">
                      <div className="w-3 h-0.5 bg-current" />
                      <div className="w-3 h-0.5 bg-current" />
                      <div className="w-3 h-0.5 bg-current" />
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-400 w-7 text-center text-sm shrink-0">#{i + 1}</span>
                  <div className="flex-1 relative">
                    <input id={`mms-trn-step-${i}`} name={`mms-trn-step-${i}`} aria-label="mmstrainingform field" className="admin-input-small" value={step.step} placeholder="Internship step description" onChange={e => handleTextChange(e.target.value, 120, val => {
                      const c = [...form.internshipSteps!]; c[i] = { ...c[i], step: val }; setForm({ ...form, internshipSteps: c });
                    })} />
                    <span className="absolute right-2 top-2.5 text-[10px] text-slate-400">{step.step.length}/120</span>
                  </div>
                  <button type="button" onClick={() => {
                    const c = [...form.internshipSteps!]; c.splice(i, 1); setForm({ ...form, internshipSteps: c });
                  }} className="p-2 text-red-500 rounded-lg shrink-0 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              )}
            />
            {(form.internshipSteps?.length || 0) < 5 && (
              <button type="button" onClick={() => setForm({ ...form, internshipSteps: [...(form.internshipSteps || []), { step: '' }] })} className="btn-add">
                <Plus className="w-4 h-4" /> Add Step (Max 5)
              </button>
            )}
            {form.internshipSteps?.length === 5 && <p className="text-xs text-amber-500 font-bold">Max 5 steps reached.</p>}
          </div>
        </SectionCard>

        {/* SECTION 5: Training Gallery */}
        <SectionCard title="Training Gallery" icon="🖼️">
          <p className="text-xs text-slate-500 mb-4 font-medium">Upload up to 4 images for the training gallery. Label max 19 characters.</p>
          <GalleryEditor
            items={form.trainingGallery || []}
            max={4}
            labelLimit={19}
            onChange={(c) => setForm({ ...form, trainingGallery: c })}
          />
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

const SectionCard = ({ icon, title, children }: any) => (
  <div className="bg-white rounded-4xl p-8 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100">
    <div className="flex items-center gap-3 mb-8">
      {icon && <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg shadow-sm border border-slate-100">{icon}</div>}
      <h2 className="text-sm font-black text-[#111827] uppercase tracking-wider">{title}</h2>
    </div>
    <div>{children}</div>
  </div>
);

const ImageUploader = ({ value, onFileSelect }: { value?: any; onFileSelect: (f: File) => void }) => {
  const imageUrl = value instanceof File ? URL.createObjectURL(value) : (value && typeof value === 'object' && 'url' in value ? resolveApiUrl((value as any).url) : resolveApiUrl(value as string));
  return (
    <div className="relative group rounded-xl border-2 border-dashed border-slate-200 p-4 bg-slate-50 hover:bg-slate-100 transition-colors flex flex-col items-center justify-center min-h-32 text-center cursor-pointer overflow-hidden">
      <input id="mmstrainingform-9" name="mmstrainingform-9" aria-label="mmstrainingform field" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => { if (e.target.files?.[0]) onFileSelect(e.target.files[0]); }} />
      {imageUrl ? (
        <img src={imageUrl} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <>
          <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-500 mb-1" />
          <p className="text-[10px] text-slate-500 font-semibold">Click to Upload</p>
        </>
      )}
    </div>
  );
};

const GalleryEditor = ({ items, max, labelLimit, onChange }: { items: any[]; max: number; labelLimit: number; onChange: (items: any[]) => void }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <SortableListContext
      items={items}
      onChange={onChange}
      renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => {
        const imgUrl = item.image instanceof File ? URL.createObjectURL(item.image) : (item.image && typeof item.image === 'object' && 'url' in item.image ? resolveApiUrl((item.image as any).url) : resolveApiUrl(item.image as string));
        return (
          <div ref={setNodeRef} style={style} className={`p-3 bg-slate-50 border border-slate-200 rounded-lg relative space-y-2 ${isDragging ? 'z-50 ring-2 ring-blue-500 shadow-xl bg-white' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                <div className="w-3 h-0.5 bg-current mb-0.5" />
                <div className="w-3 h-0.5 bg-current mb-0.5" />
                <div className="w-3 h-0.5 bg-current" />
              </div>
              <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="bg-white border border-red-100 rounded text-red-500 p-0.5 hover:bg-red-50 transition-colors"><Trash2 className="w-3 h-3" /></button>
            </div>
            <div className="relative group rounded-lg border border-dashed border-slate-300 bg-white h-24 flex items-center justify-center cursor-pointer overflow-hidden">
              <input id={`mms-trn-gal-file-${i}`} name={`mms-trn-gal-file-${i}`} aria-label="mmstrainingform field" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                if (e.target.files?.[0]) {
                   const c = [...items]; c[i] = { ...c[i], image: e.target.files[0] }; onChange(c);
                }
              }} />
              {imgUrl ? (
                <img src={imgUrl} alt="gallery preview" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-500 mb-1" />
              )}
            </div>
            <input id={`mms-trn-gal-label-${i}`} name={`mms-trn-gal-label-${i}`} aria-label="mmstrainingform field" className="admin-input-small text-center" placeholder={`Label (Max ${labelLimit})`} value={item.label || ''} onChange={e => {
              if (e.target.value.length <= labelLimit) {
                const c = [...items]; c[i] = { ...c[i], label: e.target.value }; onChange(c);
              }
            }} />
          </div>
        );
      }}
    />
    {items.length < max && (
      <button type="button" onClick={() => onChange([...items, { label: '', image: null }])} className="btn-add min-h-28">
        <Plus className="w-5 h-5 mx-auto mb-1" /> Add Image
      </button>
    )}
  </div>
);

export default MMSTrainingForm;
