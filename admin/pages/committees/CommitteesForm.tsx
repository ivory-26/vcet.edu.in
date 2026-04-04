import React, { useState, useEffect } from 'react';
import { pagesApi } from '../../api/pagesApi';
import { CommitteeData, CommitteePayload, CommitteeMember, CommitteeReport } from '../../types';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import AdminFormSection from '../../components/AdminFormSection';
import { SortableListContext } from '../../components/SortableList';

/* ── UI Components ─────────────────────────────────────────────────────────── */
const inputBase = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-slate-700";
const labelBase = "block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1";

/* ── List Manager (Dynamic Strings) ────────────────────────────────────────── */
const ListManager: React.FC<{
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
  maxItems?: number;
  charLimit?: [number, number];
}> = ({ title, items, onChange, maxItems = 6, charLimit }) => {
  const addItem = () => {
    if (items.length < maxItems) onChange([...items, '']);
  };
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, val: string) => {
    const next = [...items];
    next[idx] = val;
    onChange(next);
  };
  return (
    <div className="space-y-4">
      <SortableListContext
        items={items}
        onChange={onChange}
        renderItem={(item, idx, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
          <div ref={setNodeRef} style={style} className="flex gap-4 group items-start p-2 bg-white rounded-2xl border border-transparent hover:border-slate-100 transition-all">
            <div className="flex flex-col gap-1 pt-3/5 opacity-50 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-slate-400 hover:text-[#2563EB]" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
            </div>
            <div className="grow">
               <label className={labelBase}>{title} {idx + 1}</label>
              <input id={`committeesform-list-${idx}`} name={`committeesform-list-${idx}`} aria-label="committeesform field" 
                value={item} 
                onChange={e => updateItem(idx, e.target.value)}
                className={inputBase}
                placeholder={`Enter ${title.toLowerCase()}...`}
              />
              {charLimit && (
                <p className={`text-[10px] mt-1.5 ml-1 font-bold uppercase tracking-wider ${item.length > charLimit[1] ? 'text-red-500' : 'text-slate-400'}`}>
                  {item.length} / {charLimit[1]} Characters
                </p>
              )}
            </div>
            <button 
              type="button" 
              onClick={() => removeItem(idx)}
              className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 mt-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
      />
      {items.length < maxItems && (
        <button type="button" onClick={addItem} className="text-[#2563EB] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity ml-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          Add {title} ({items.length}/{maxItems})
        </button>
      )}
    </div>
  );
};

/* ── Table Manager (Members) ─────────────────────────────────────────────── */
const TableManager: React.FC<{
  items: CommitteeMember[];
  onChange: (items: CommitteeMember[]) => void;
  columns: { key: keyof CommitteeMember; label: string; placeholder: string; limit?: number }[];
  maxItems?: number;
}> = ({ items, onChange, columns, maxItems = 10 }) => {
  const addItem = () => {
    if (items.length < maxItems) {
      const newItem: any = {};
      columns.forEach(c => newItem[c.key] = '');
      onChange([...items, newItem]);
    }
  };
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, key: keyof CommitteeMember, val: string) => {
    const next = [...items];
    next[idx] = { ...next[idx], [key]: val };
    onChange(next);
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/50">
              <th className="w-10 px-4 py-4"></th>
              {columns.map(col => (
                <th key={col.key as string} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{col.label}</th>
              ))}
              <th className="w-16 px-6 py-4"></th>
            </tr>
          </thead>
          <SortableListContext
            items={items}
            onChange={onChange}
            renderItem={(item, idx, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
              <tr ref={setNodeRef} style={{...style, display: 'table-row'}} className="border-t border-slate-100 group bg-white hover:bg-slate-50/30 transition-colors">
                <td className="px-4 py-4 w-10">
                  <div className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-[#2563EB] opacity-50 group-hover:opacity-100 transition-opacity" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
                  </div>
                </td>
                {columns.map(col => (
                  <td key={col.key as string} className="px-6 py-4">
                    <input id={`committeesform-table-${idx}-${col.key as string}`} name={`committeesform-table-${idx}-${col.key as string}`} aria-label="committeesform field" 
                      value={item[col.key] || ''} 
                      onChange={e => updateItem(idx, col.key, e.target.value)}
                      className="w-full bg-transparent border-none text-sm font-bold text-slate-700 focus:ring-0 p-0 placeholder:text-slate-300 placeholder:font-medium"
                      placeholder={col.placeholder}
                      maxLength={col.limit}
                    />
                  </td>
                ))}
                <td className="px-6 py-4 text-right">
                  <button type="button" onClick={() => removeItem(idx)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </td>
              </tr>
            )}
          />
        </table>
      </div>
      {items.length < maxItems && (
        <button type="button" onClick={addItem} className="text-[#2563EB] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity ml-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          Add Member ({items.length}/{maxItems})
        </button>
      )}
    </div>
  );
};

/* ── Report Manager (Files) ─────────────────────────────────────────────── */
const ReportManager: React.FC<{
  items: CommitteeReport[];
  onChange: (items: CommitteeReport[]) => void;
  maxItems?: number;
}> = ({ items, onChange, maxItems = 5 }) => {
  const addItem = () => {
    if (items.length < maxItems) {
      onChange([...items, { year: '2024-25', fileName: null, fileUrl: null }]);
    }
  };
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, updates: Partial<CommitteeReport & { file?: File | null }>) => {
    const next = [...items];
    next[idx] = { ...next[idx], ...updates };
    onChange(next);
  };

  const years = ['2023-24', '2024-25', '2025-26', '2022-23'];

  return (
    <div className="space-y-4">
      <SortableListContext
        items={items}
        onChange={onChange}
        renderItem={(item, idx, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
          <div ref={setNodeRef} style={style} className="flex gap-4 p-6 bg-slate-50 border border-slate-200 rounded-3xl group relative shadow-sm">
            <div className="flex flex-col justify-center items-center mr-2 cursor-grab active:cursor-grabbing text-slate-400 hover:text-[#2563EB] opacity-50 group-hover:opacity-100 transition-opacity" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
               <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
            </div>
            
            <button type="button" onClick={() => removeItem(idx)} className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-red-100 shadow-sm text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="flex flex-col md:flex-row gap-6 grow w-full">
              <div className="w-full md:w-1/3">
                <label className={labelBase}>Academic Year</label>
                <select id={`committeesform-select-${idx}`} name={`committeesform-select-${idx}`} aria-label="committeesform select field" 
                  value={item.year} 
                  onChange={e => updateItem(idx, { year: e.target.value })}
                  className={inputBase}
                >
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              <div className="grow">
                <label className={labelBase}>PDF Report Document</label>
                <div className="relative h-[3.45rem] bg-white border border-slate-200 rounded-2xl px-5 flex items-center justify-between overflow-hidden ring-offset-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                   <input id={`committeesform-pdf-${idx}`} name={`committeesform-pdf-${idx}`} aria-label="committeesform field" 
                     type="file" 
                     accept=".pdf" 
                     onChange={e => updateItem(idx, { file: e.target.files?.[0] || null })}
                     className="absolute inset-0 opacity-0 cursor-pointer z-10"
                   />
                   <span className="text-sm font-bold text-slate-700 truncate">
                     {(item as any).file?.name || item.fileName || 'Select institutional PDF...'}
                   </span>
                   <div className="w-8 h-8 rounded-xl bg-[#2563EB]/5 flex items-center justify-center text-[#2563EB]">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      />
      {items.length < maxItems && (
        <button type="button" onClick={addItem} className="text-[#2563EB] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity ml-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          Add Yearly Report ({items.length}/{maxItems})
        </button>
      )}
    </div>
  );
};

/* ── PDF Document Manager (Generic) ─────────────────────────────────────── */
const PDFDocumentManager: React.FC<{
  items: any[];
  onChange: (items: any[]) => void;
  maxItems?: number;
  showUrlField?: boolean;
}> = ({ items, onChange, maxItems = 3, showUrlField }) => {
  const addItem = () => {
    if (items.length < maxItems) {
      onChange([...items, { title: '', fileName: null, fileUrl: null, pdfUrl: '' }]);
    }
  };
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, updates: any) => {
    const next = [...items];
    next[idx] = { ...next[idx], ...updates };
    onChange(next);
  };

  return (
    <div className="space-y-4">
      <SortableListContext
        items={items}
        onChange={onChange}
        renderItem={(item, idx, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
          <div ref={setNodeRef} style={style} className="flex gap-4 p-6 bg-slate-50 border border-slate-200 rounded-3xl group relative space-y-4 shadow-sm">
            <div className="flex flex-col pt-12 justify-start items-center mr-2 cursor-grab active:cursor-grabbing text-slate-400 hover:text-[#2563EB] opacity-50 group-hover:opacity-100 transition-opacity" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
               <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
            </div>

             <button type="button" onClick={() => removeItem(idx)} className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-red-100 shadow-md text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="grow space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelBase}>Document Label</label>
                  <input id={`committeesform-doctitle-${idx}`} name={`committeesform-doctitle-${idx}`} aria-label="committeesform field" 
                    value={item.title} 
                    onChange={e => updateItem(idx, { title: e.target.value })}
                    className={inputBase}
                    placeholder="e.g. Committee Guideline 2024"
                  />
                </div>
                <div>
                  <label className={labelBase}>PDF Document File</label>
                  <div className="relative h-[3.45rem] bg-white border border-slate-200 rounded-2xl px-5 flex items-center justify-between overflow-hidden ring-offset-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                     <input id={`committeesform-docpdf-${idx}`} name={`committeesform-docpdf-${idx}`} aria-label="committeesform field" 
                       type="file" 
                       accept=".pdf" 
                       onChange={e => updateItem(idx, { file: e.target.files?.[0] || null })}
                       className="absolute inset-0 opacity-0 cursor-pointer z-10"
                     />
                     <span className="text-sm font-bold text-slate-700 truncate">
                       {item.file?.name || item.fileName || 'Click to upload PDF...'}
                     </span>
                     <div className="w-8 h-8 rounded-xl bg-[#2563EB]/5 text-[#2563EB] flex items-center justify-center">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                     </div>
                  </div>
                </div>
              </div>
              {showUrlField && (
                <div>
                  <label className={labelBase}>Legacy Redirect / External PDF URL (Optional)</label>
                  <input id={`committeesform-docurl-${idx}`} name={`committeesform-docurl-${idx}`} aria-label="committeesform field" 
                    value={item.pdfUrl} 
                    onChange={e => updateItem(idx, { pdfUrl: e.target.value })}
                    className={inputBase}
                    placeholder="https://example.com/document.pdf"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      />
      {items.length < maxItems && (
        <button type="button" onClick={addItem} className="text-[#2563EB] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity ml-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          Add Document ({items.length}/{maxItems})
        </button>
      )}
    </div>
  );
};

/* ── Main Form Component ──────────────────────────────────────────────────── */
interface CommitteesFormProps {
  slug: string;
  onBack: () => void;
}

const CommitteesForm: React.FC<CommitteesFormProps> = ({ slug, onBack }) => {
  const [data, setData] = useState<CommitteeData | null>(null);
  const [payload, setPayload] = useState<CommitteePayload>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeAccordionSection, setActiveAccordionSection] = useState<string | null>(null);

  useEffect(() => {
    pagesApi.committees.get(slug)
      .then(res => {
        setData(res.data);
        setPayload({
          responsibilities: res.data?.responsibilities || [],
          objectives: res.data?.objectives || [],
          guidelines: res.data?.guidelines || [],
          members: res.data?.members || [],
          reports: res.data?.reports || [],
          documents: res.data?.documents || [],
        });
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const saveChanges = async () => {
    setSaving(true);
    try {
      await pagesApi.committees.update(slug, payload);
      alert(`${data?.name} updated successfully!`);
    } catch (err) {
      console.error(err);
      alert('Failed to update committee.');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveChanges();
  };

  if (loading) return (
    <div className="flex items-center justify-center h-96 bg-white border border-slate-200/60 rounded-6xl animate-pulse">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gathering Committee Records...</p>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSave} className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <PageEditorHeader
        title={data?.name || 'Committee Editor'}
        description="Manage professional committee protocols, members, and historical reports."
        onSave={saveChanges}
        isSaving={saving}
        showBackButton
        onBack={onBack}
      />

      <div className="space-y-4">
        {/* CDC Responsibilities */}
        {slug === 'cdc' && (
          <AdminFormSection title="Core Responsibilities" icon="📋" isOpen={activeAccordionSection === 'responsibilities'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'responsibilities' ? null : 'responsibilities')}>
            <ListManager 
              title="Responsibility" 
              items={payload.responsibilities || []} 
              onChange={items => setPayload({...payload, responsibilities: items})} 
              charLimit={[80, 250]}
            />
          </AdminFormSection>
        )}

        {/* IQAC/SCST/ICC/AntiRagging/Grievance Objectives */}
        {['iqac', 'anti-ragging', 'grievance', 'sc-st', 'icc'].includes(slug) && (
          <AdminFormSection title="Strategic Objectives" icon="🎯" isOpen={activeAccordionSection === 'objectives'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'objectives' ? null : 'objectives')}>
            <ListManager 
              title="Objective" 
              items={payload.objectives || []} 
              onChange={items => setPayload({...payload, objectives: items})} 
              charLimit={slug === 'sc-st' ? [50, 450] : [50, 600]}
            />
          </AdminFormSection>
        )}

        {/* SGRC Guidelines */}
        {slug === 'sgrc' && (
          <AdminFormSection title="Constitutional Guidelines" icon="📜" isOpen={activeAccordionSection === 'guidelines'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'guidelines' ? null : 'guidelines')}>
            <ListManager 
              title="Guideline" 
              items={payload.guidelines || []} 
              onChange={items => setPayload({...payload, guidelines: items})} 
            />
          </AdminFormSection>
        )}

        {/* Member Table */}
        {!['equal-opportunity', 'sedg'].includes(slug) && (
          <AdminFormSection title="Committee Member Roster" icon="👥" isOpen={activeAccordionSection === 'members'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'members' ? null : 'members')}>
            <TableManager 
              items={payload.members || []} 
              onChange={members => setPayload({...payload, members})}
              columns={
                slug === 'cdc' ? [{ key: 'post', label: 'Committee Post', placeholder: 'e.g. Chairman' }, { key: 'name', label: 'Full Member Name', placeholder: 'e.g. Dr. John Doe' }] :
                slug === 'iqac' ? [{ key: 'name', label: 'Official Name', placeholder: 'Full Name' }, { key: 'designation', label: 'Academic Designation', placeholder: 'e.g. Professor & Head' }] :
                slug === 'anti-ragging' ? [{ key: 'name', label: 'Official Name', placeholder: 'Full Name' }, { key: 'designation', label: 'Designation', placeholder: 'e.g. HOD IT' }, { key: 'contact', label: 'Emergency Contact', placeholder: 'Mobile / Extension', limit: 40 }] :
                slug === 'grievance' ? [{ key: 'post', label: 'Post', placeholder: 'e.g. Member Secretary' }, { key: 'name', label: 'Full Name', placeholder: 'Official Name' }, { key: 'email', label: 'Institutional Email', placeholder: 'email@vcet.edu.in', limit: 40 }] :
                slug === 'icc' ? [{ key: 'post', label: 'Post', placeholder: 'e.g. Presiding Officer' }, { key: 'name', label: 'Official Name', placeholder: 'Full Name' }, { key: 'contact', label: 'Contact', placeholder: 'Phone Number', limit: 40 }] :
                [{ key: 'name', label: 'Full Name', placeholder: 'Official Name' }, { key: 'post', label: 'Committee Role', placeholder: 'e.g. Member Secretary' }]
              }
              maxItems={slug === 'cdc' ? 12 : 10}
            />
          </AdminFormSection>
        )}

        {/* IQAC Reports */}
        {slug === 'iqac' && (
          <AdminFormSection title="AQAR Archives (Annual Reports)" icon="📊" isOpen={activeAccordionSection === 'reports'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'reports' ? null : 'reports')}>
            <ReportManager 
              items={payload.reports || []} 
              onChange={reports => setPayload({...payload, reports})} 
            />
          </AdminFormSection>
        )}

        {/* Equal Opportunity / SEDG Cell PDF Uploads */}
        {['equal-opportunity', 'sedg'].includes(slug) && (
          <AdminFormSection title="Regulatory Documentation" icon="📁" isOpen={activeAccordionSection === 'docs'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'docs' ? null : 'docs')}>
            <PDFDocumentManager 
              items={payload.documents || []} 
              onChange={docs => setPayload({...payload, documents: docs})} 
              maxItems={slug === 'sedg' ? 2 : 4}
              showUrlField={slug === 'equal-opportunity'}
            />
          </AdminFormSection>
        )}
      </div>
    </form>
  );
};

export default CommitteesForm;
