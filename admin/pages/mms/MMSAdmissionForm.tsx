import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import type { MMSAdmissionPayload } from '../../types';
import { mmsAdmissionApi } from '../../api/mmsAdmissionApi';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import { SortableListContext } from '../../components/SortableList';
import AdminFormSection from '../../components/AdminFormSection';

const inputBase = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-slate-700";
const labelBase = "block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1";

const emptyForm: MMSAdmissionPayload = {
  eligibilityCriteria: {
    generalPercentage: '',
    reservedPercentage: '',
    degreeRequirement: '',
    entranceExams: []
  },
  entranceExamination: {
    primaryExam: '',
    alternativeExams: []
  },
  eligibilityCertificates: [],
  universityLinks: [],
  documentsRequired: [],
  feeSummary: {
    description: '',
    reference: ''
  },
  admissionPdf: []
};

const MMSAdmissionForm: React.FC = () => {
  const navigate = useNavigate();
  const { hash } = useLocation();
  const [form, setForm] = useState<MMSAdmissionPayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>('eligibilityCriteria');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const section = hash.replace('#', '');
    if (section === 'eligibilityCriteria' || section === 'scholarship' || section === 'documentsRequired' || section === 'feeSummary') {
      setActiveSection(section);
    }
  }, [hash]);

  const fetchData = async () => {
    try {
      const res = await mmsAdmissionApi.get();
      if (res.data) {
        const normalizeArray = (value: unknown) => {
          if (Array.isArray(value)) return value;
          if (value && typeof value === 'object') return Object.values(value as Record<string, unknown>);
          return [];
        };

        const payload = res.data as MMSAdmissionPayload;
        const normalized: MMSAdmissionPayload = {
          ...emptyForm,
          ...payload,
          eligibilityCriteria: {
            ...emptyForm.eligibilityCriteria,
            ...(payload.eligibilityCriteria || {}),
            entranceExams: normalizeArray(payload.eligibilityCriteria?.entranceExams) as { exam: string }[],
          },
          entranceExamination: {
            ...emptyForm.entranceExamination,
            ...(payload.entranceExamination || {}),
            alternativeExams: normalizeArray(payload.entranceExamination?.alternativeExams) as { exam: string }[],
          },
          eligibilityCertificates: normalizeArray(payload.eligibilityCertificates) as { certificate: string }[],
          universityLinks: normalizeArray(payload.universityLinks) as { link: string; url: string }[],
          documentsRequired: normalizeArray(payload.documentsRequired).map((row) => {
            if (typeof row === 'string') {
              return { document: row, details: '', link: '' };
            }
            const value = (row || {}) as { document?: string; details?: string; link?: string };
            return {
              document: value.document || '',
              details: value.details || '',
              link: value.link || '',
            };
          }) as { document: string; details?: string; link?: string }[],
          admissionPdf: normalizeArray(payload.admissionPdf) as { label: string; url: string; pdfFile?: string | File | null }[],
        };

        setForm(normalized);
      }
    } catch (e) {
      console.warn("Could not fetch old data, assuming empty CMS state:", e);
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
      await mmsAdmissionApi.update(form);
      setSuccessMsg('Changes saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (id: string) => {
    setActiveSection(prev => prev === id ? null : id);
  };

  const handleTextChange = (
    value: string,
    limit: number,
    setter: (val: string) => void
  ) => {
    if (value.length <= limit) setter(value);
  };

  if (loading) {
     return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading Form...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      <PageEditorHeader
        title="Admission Details"
        description="Manage eligibility, scholarship notes, required documents, and fee structure in one consolidated form."
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

        <AdminFormSection
          title="Eligibility Criteria"
          icon="✅"
          isOpen={activeSection === 'eligibilityCriteria'}
          onToggle={() => toggleSection('eligibilityCriteria')}
        >
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className={labelBase}>Min % (General) <span className="text-slate-400 lowercase font-medium">({form.eligibilityCriteria?.generalPercentage?.length || 0}/5)</span></label>
                <input id="mmsadmissionform-1" name="mmsadmissionform-1" aria-label="mmsadmissionform field" className={inputBase} placeholder="e.g. 50%" value={form.eligibilityCriteria?.generalPercentage || ''} onChange={e => handleTextChange(e.target.value, 5, val => {
                  setForm({ ...form, eligibilityCriteria: { ...form.eligibilityCriteria!, generalPercentage: val } });
                })} />
              </div>
              <div className="relative">
                <label className={labelBase}>Min % (Reserved - MH) <span className="text-slate-400 lowercase font-medium">({form.eligibilityCriteria?.reservedPercentage?.length || 0}/5)</span></label>
                <input id="mmsadmissionform-2" name="mmsadmissionform-2" aria-label="mmsadmissionform field" className={inputBase} placeholder="e.g. 45%" value={form.eligibilityCriteria?.reservedPercentage || ''} onChange={e => handleTextChange(e.target.value, 5, val => {
                  setForm({ ...form, eligibilityCriteria: { ...form.eligibilityCriteria!, reservedPercentage: val } });
                })} />
              </div>
              <div className="md:col-span-2 relative">
                <label className={labelBase}>Accepted Degree Requirement <span className="text-slate-400 lowercase font-medium">({form.eligibilityCriteria?.degreeRequirement?.length || 0}/50)</span></label>
                <input id="mmsadmissionform-3" name="mmsadmissionform-3" aria-label="mmsadmissionform field" className={inputBase + " italic"} placeholder="e.g. Bachelor's Degree (Any Discipline)" value={form.eligibilityCriteria?.degreeRequirement || ''} onChange={e => handleTextChange(e.target.value, 50, val => {
                  setForm({ ...form, eligibilityCriteria: { ...form.eligibilityCriteria!, degreeRequirement: val } });
                })} />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-6">
              <div className="relative">
                <label className={labelBase}>Primary Exam (Preferred) <span className="text-slate-400 lowercase font-medium">({form.entranceExamination?.primaryExam?.length || 0}/50)</span></label>
                <input id="mmsadmissionform-5" name="mmsadmissionform-5" aria-label="mmsadmissionform field" className={inputBase} placeholder="e.g. MAH-MBA/MMS-CET" value={form.entranceExamination?.primaryExam || ''} onChange={e => handleTextChange(e.target.value, 50, val => {
                  setForm({ ...form, entranceExamination: { ...form.entranceExamination!, primaryExam: val } });
                })} />
              </div>

              <div>
                <label className={labelBase + " text-[#2563EB]!"}>Accepted Entrance Exams</label>
                <div className="space-y-3">
                  <SortableListContext
                    items={form.eligibilityCriteria?.entranceExams || []}
                    onChange={val => setForm({ ...form, eligibilityCriteria: { ...form.eligibilityCriteria!, entranceExams: val } })}
                    renderItem={(exam, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                      <div ref={setNodeRef} style={style} className={`flex gap-3 items-center p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                        <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1 shrink-0" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                          <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                          <div className="w-4 h-0.5 bg-current rounded-full" />
                        </div>
                        <div className="flex-1 relative">
                          <input id={`mms-adm-exam-${i}`} name={`mms-adm-exam-${i}`} aria-label="mmsadmissionform field" className={inputBase} placeholder="e.g. MAH-CET" value={exam.exam || ''} onChange={e => handleTextChange(e.target.value, 100, val => {
                            const c = [...form.eligibilityCriteria!.entranceExams];
                            c[i].exam = val;
                            setForm({ ...form, eligibilityCriteria: { ...form.eligibilityCriteria!, entranceExams: c } });
                          })} />
                        </div>
                        <button type="button" onClick={() => {
                          const c = [...form.eligibilityCriteria!.entranceExams];
                          c.splice(i, 1);
                          setForm({ ...form, eligibilityCriteria: { ...form.eligibilityCriteria!, entranceExams: c } });
                        }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    )}
                  />
                  <div className="flex justify-end pt-2">
                    <button type="button" onClick={() => {
                      const c = [...(form.eligibilityCriteria?.entranceExams || [])];
                      c.push({ exam: '' });
                      setForm({ ...form, eligibilityCriteria: { ...form.eligibilityCriteria!, entranceExams: c } });
                    }} className="text-[#2563EB] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <Plus className="w-4 h-4" /> Add Exam
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className={labelBase + " text-[#2563EB]!"}>Alternative Exams</label>
                <div className="space-y-3">
                  <SortableListContext
                    items={form.entranceExamination?.alternativeExams || []}
                    onChange={val => setForm({ ...form, entranceExamination: { ...form.entranceExamination!, alternativeExams: val } })}
                    renderItem={(exam, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                      <div ref={setNodeRef} style={style} className={`flex gap-3 items-center p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                        <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1 shrink-0" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                          <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                          <div className="w-4 h-0.5 bg-current rounded-full" />
                        </div>
                        <div className="flex-1 relative">
                          <input id={`mms-adm-alt-exam-${i}`} name={`mms-adm-alt-exam-${i}`} aria-label="mmsadmissionform field" className={inputBase} placeholder="Exam Name" value={exam.exam || ''} onChange={e => handleTextChange(e.target.value, 100, val => {
                            const c = [...form.entranceExamination!.alternativeExams];
                            c[i].exam = val;
                            setForm({ ...form, entranceExamination: { ...form.entranceExamination!, alternativeExams: c } });
                          })} />
                        </div>
                        <button type="button" onClick={() => {
                          const c = [...form.entranceExamination!.alternativeExams];
                          c.splice(i, 1);
                          setForm({ ...form, entranceExamination: { ...form.entranceExamination!, alternativeExams: c } });
                        }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    )}
                  />
                  <div className="flex justify-end pt-2">
                    <button type="button" onClick={() => {
                      const c = [...(form.entranceExamination?.alternativeExams || [])];
                      c.push({ exam: '' });
                      setForm({ ...form, entranceExamination: { ...form.entranceExamination!, alternativeExams: c } });
                    }} className="text-[#2563EB] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <Plus className="w-4 h-4" /> Add Alternative Exam
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AdminFormSection>

        <AdminFormSection
          title="Scholarship"
          icon="🎓"
          isOpen={activeSection === 'scholarship'}
          onToggle={() => toggleSection('scholarship')}
        >
          <div className="space-y-8">
            <div>
              <p className={labelBase + " text-slate-400!"}>Scholarship Eligibility Notes / Certificates</p>
              <SortableListContext
                items={form.eligibilityCertificates || []}
                onChange={val => setForm({ ...form, eligibilityCertificates: val })}
                renderItem={(cert, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                  <div ref={setNodeRef} style={style} className={`flex gap-3 items-center p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                    <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1 shrink-0" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                      <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-4 h-0.5 bg-current rounded-full" />
                    </div>
                    <div className="flex-1 relative">
                      <textarea id={`mms-adm-cert-${i}`} name={`mms-adm-cert-${i}`} aria-label="mmsadmissionform field" className={inputBase + " min-h-[90px] resize-y"} value={cert.certificate || ''} placeholder="e.g. Add detailed scholarship note, required certificate, eligibility clause, and supporting guidance..." onChange={e => handleTextChange(e.target.value, 1200, val => {
                        const c = [...form.eligibilityCertificates!];
                        c[i].certificate = val;
                        setForm({ ...form, eligibilityCertificates: c });
                      })} />
                    </div>
                    <button type="button" onClick={() => {
                      const c = [...form.eligibilityCertificates!];
                      c.splice(i, 1);
                      setForm({ ...form, eligibilityCertificates: c });
                    }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0"><Trash2 className="w-4 h-4" /></button>
                  </div>
                )}
              />
              <div className="flex justify-end pt-2">
                <button type="button" onClick={() => setForm({ ...form, eligibilityCertificates: [...(form.eligibilityCertificates || []), { certificate: '' }] })} className="text-[#2563EB] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Plus className="w-4 h-4" /> Add Note
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <p className={labelBase + " text-slate-400!"}>Scholarship / University Links</p>
              <SortableListContext
                items={form.universityLinks || []}
                onChange={val => setForm({ ...form, universityLinks: val })}
                renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                  <div ref={setNodeRef} style={style} className={`p-6 bg-white border border-slate-100 rounded-3xl relative space-y-4 shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1 shrink-0" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                        <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                        <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                        <div className="w-4 h-0.5 bg-current rounded-full" />
                      </div>
                      <button type="button" onClick={() => {
                        const c = [...form.universityLinks!];
                        c.splice(i, 1);
                        setForm({ ...form, universityLinks: c });
                      }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <label className={labelBase}>Link Label</label>
                        <input id={`mms-adm-link-label-${i}`} name={`mms-adm-link-label-${i}`} aria-label="mmsadmissionform field" className={inputBase} placeholder="e.g. Scholarship Portal" value={item.link || ''} onChange={e => handleTextChange(e.target.value, 100, val => {
                          const c = [...form.universityLinks!];
                          c[i].link = val;
                          setForm({ ...form, universityLinks: c });
                        })} />
                      </div>
                      <div className="relative">
                        <label className={labelBase}>URL</label>
                        <input id={`mms-adm-link-url-${i}`} name={`mms-adm-link-url-${i}`} aria-label="mmsadmissionform field" className={inputBase + " text-[#2563EB] font-medium"} placeholder="https://..." value={item.url || ''} onChange={e => handleTextChange(e.target.value, 150, val => {
                          const c = [...form.universityLinks!];
                          c[i].url = val;
                          setForm({ ...form, universityLinks: c });
                        })} />
                      </div>
                    </div>
                  </div>
                )}
              />
              <div className="flex justify-end pt-2">
                <button type="button" onClick={() => setForm({ ...form, universityLinks: [...(form.universityLinks || []), { link: '', url: '' }] })} className="text-[#2563EB] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Plus className="w-4 h-4" /> Add Link
                </button>
              </div>
            </div>
          </div>
        </AdminFormSection>

        <AdminFormSection
          title="Documents Required"
          icon="📁"
          isOpen={activeSection === 'documentsRequired'}
          onToggle={() => toggleSection('documentsRequired')}
        >
          <div className="space-y-8">
            <div>
              <p className={labelBase + " text-slate-400!"}>Mandatory Documents List</p>
              <SortableListContext
                items={form.documentsRequired || []}
                onChange={val => setForm({ ...form, documentsRequired: val })}
                renderItem={(doc, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                  <div ref={setNodeRef} style={style} className={`p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4 ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1 shrink-0" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                        <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                        <div className="w-4 h-0.5 bg-current rounded-full" />
                      </div>
                      <button type="button" onClick={() => {
                        const c = [...form.documentsRequired!];
                        c.splice(i, 1);
                        setForm({ ...form, documentsRequired: c });
                      }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0"><Trash2 className="w-4 h-4" /></button>
                    </div>

                    <div className="relative">
                      <label className={labelBase}>Document Title</label>
                      <input id={`mms-adm-doc-${i}`} name={`mms-adm-doc-${i}`} aria-label="mmsadmissionform field" className={inputBase} value={doc.document || ''} placeholder="e.g. SSC Marksheet" onChange={e => handleTextChange(e.target.value, 200, val => {
                        const c = [...form.documentsRequired!];
                        c[i].document = val;
                        setForm({ ...form, documentsRequired: c });
                      })} />
                    </div>

                    <div className="relative">
                      <label className={labelBase}>Additional Details</label>
                      <textarea id={`mms-adm-doc-details-${i}`} name={`mms-adm-doc-details-${i}`} aria-label="mmsadmissionform field" className={inputBase + " min-h-[90px] resize-y"} value={(doc as { details?: string }).details || ''} placeholder="Add more text about this document, format requirements, attestation rules, deadlines, etc." onChange={e => handleTextChange(e.target.value, 1500, val => {
                        const c = [...form.documentsRequired!] as Array<{ document: string; details?: string; link?: string }>;
                        c[i] = { ...c[i], details: val };
                        setForm({ ...form, documentsRequired: c });
                      })} />
                    </div>

                    <div className="relative">
                      <label className={labelBase}>Reference Link (Optional)</label>
                      <input id={`mms-adm-doc-link-${i}`} name={`mms-adm-doc-link-${i}`} aria-label="mmsadmissionform field" className={inputBase + " text-[#2563EB] font-medium"} value={(doc as { link?: string }).link || ''} placeholder="https://..." onChange={e => handleTextChange(e.target.value, 300, val => {
                        const c = [...form.documentsRequired!] as Array<{ document: string; details?: string; link?: string }>;
                        c[i] = { ...c[i], link: val };
                        setForm({ ...form, documentsRequired: c });
                      })} />
                    </div>
                  </div>
                )}
              />
              <div className="flex justify-end pt-2">
                <button type="button" onClick={() => setForm({ ...form, documentsRequired: [...(form.documentsRequired || []), { document: '', details: '', link: '' }] })} className="text-[#2563EB] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Plus className="w-4 h-4" /> Add Document
                </button>
              </div>
            </div>
          </div>
        </AdminFormSection>

        <AdminFormSection
          title="Fees Structure"
          icon="💰"
          isOpen={activeSection === 'feeSummary'}
          onToggle={() => toggleSection('feeSummary')}
        >
          <div className="space-y-6">
            <div className="relative">
              <label className={labelBase}>Fee Details Summary</label>
              <textarea id="mmsadmissionform-textarea-1" name="mmsadmissionform-textarea-1" aria-label="mmsadmissionform textarea field" className={inputBase + " resize-none min-h-[100px]"} placeholder="Briefly describe fee slabs..." value={form.feeSummary?.description || ''} onChange={e => handleTextChange(e.target.value, 300, val => {
                setForm({ ...form, feeSummary: { ...form.feeSummary!, description: val } });
              })} />
            </div>
            <div className="relative">
              <label className={labelBase}>Reference Regulation</label>
              <input id="mmsadmissionform-11" name="mmsadmissionform-11" aria-label="mmsadmissionform field" className={inputBase + " italic"} placeholder="e.g. As per FRA standard circular..." value={form.feeSummary?.reference || ''} onChange={e => handleTextChange(e.target.value, 150, val => {
                setForm({ ...form, feeSummary: { ...form.feeSummary!, reference: val } });
              })} />
            </div>
          </div>
        </AdminFormSection>

      </form>
    </div>
  );
};

export default MMSAdmissionForm;
