import { useState, useMemo } from 'react';
import { Modal, ConfirmModal, ActionBtn } from '../components/Modal';

const STEG_STATUSES = [
  { value: 'prep', label: 'Préparation', icon: 'fa-pen-ruler', color: '#94A3B8' },
  { value: 'submitted', label: 'Soumis', icon: 'fa-paper-plane', color: '#3B82F6' },
  { value: 'validation', label: 'En validation', icon: 'fa-spinner', color: '#F59E0B' },
  { value: 'approved', label: 'Approuvé', icon: 'fa-circle-check', color: '#10B981' },
  { value: 'rejected', label: 'Rejeté', icon: 'fa-circle-xmark', color: '#EF4444' },
];

const STEG_DOCS = [
  { id: 'cin', label: 'Copie CIN du client', icon: 'fa-id-card', cat: 'Administratif' },
  { id: 'attestation', label: "Attestation d'installation", icon: 'fa-file-signature', cat: 'Installation' },
  { id: 'facture', label: 'Facture des équipements', icon: 'fa-file-invoice', cat: 'Financier' },
  { id: 'schema', label: "Schéma unifilaire de l'installation", icon: 'fa-diagram-project', cat: 'Technique' },
  { id: 'photo_panneaux', label: 'Photo des panneaux installés', icon: 'fa-camera', cat: 'Photos' },
  { id: 'photo_onduleur', label: "Photo de l'onduleur", icon: 'fa-camera', cat: 'Photos' },
  { id: 'photo_compteur', label: 'Photo du compteur', icon: 'fa-camera', cat: 'Photos' },
  { id: 'photo_general', label: "Photo générale de l'installation", icon: 'fa-camera', cat: 'Photos' },
  { id: 'certificat_conformite', label: 'Certificat de conformité', icon: 'fa-certificate', cat: 'Certificat' },
  { id: 'pv_reception', label: 'PV de réception', icon: 'fa-file-lines', cat: 'Installation' },
  { id: 'engagement', label: "Attestation d'engagement", icon: 'fa-file-pen', cat: 'Administratif' },
  { id: 'convention', label: "Convention d'achat", icon: 'fa-file-contract', cat: 'Administratif' },
];

const LBL = { fontSize: 12, fontWeight: 600, color: 'var(--fg-muted)', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' };

export default function StegDocView({ dossiers, handlers, clients, addToast }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [detailOpen, setDetailOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ client_id: '', ref_steg: '', puissance: '', notes: '' });

  const getClient = (id) => clients.find(c => c.id === id);

  const docCategories = useMemo(() => {
    const cats = {};
    STEG_DOCS.forEach(d => {
      if (!cats[d.cat]) cats[d.cat] = [];
      cats[d.cat].push(d);
    });
    return cats;
  }, []);

  const filtered = useMemo(() => dossiers.filter(d => {
    const cl = getClient(d.client_id);
    if (search && !d.ref_steg.toLowerCase().includes(search.toLowerCase()) && (cl && !cl.name.toLowerCase().includes(search.toLowerCase()))) return false;
    if (statusFilter !== 'all' && d.status !== statusFilter) return false;
    return true;
  }), [dossiers, search, statusFilter, clients]);

  const stats = useMemo(() => ({
    total: dossiers.length,
    approved: dossiers.filter(d => d.status === 'approved').length,
    submitted: dossiers.filter(d => d.status === 'submitted' || d.status === 'validation').length,
    rejected: dossiers.filter(d => d.status === 'rejected').length,
    prep: dossiers.filter(d => d.status === 'prep').length,
    docsOk: dossiers.reduce((s, d) => s + Object.values(d.docs || {}).filter(Boolean).length, 0),
    docsTotal: dossiers.length * STEG_DOCS.length,
  }), [dossiers]);

  const progress = stats.docsTotal > 0 ? Math.round(stats.docsOk / stats.docsTotal * 100) : 0;

  const openCreate = () => {
    setForm({ client_id: '', ref_steg: '', puissance: '', notes: '' });
    setCreateOpen(true);
  };

  const handleCreate = async () => {
    if (!form.client_id || !form.ref_steg) {
      addToast('Sélectionnez un client et saisissez la réf. STEG', 'error');
      return;
    }
    try {
      await handlers.add(form);
      setCreateOpen(false);
      addToast('Dossier STEG créé avec succès');
    } catch {
      addToast('Erreur lors de la création', 'error');
    }
  };

  const handleDocToggle = async (docId) => {
    if (!selected) return;
    const newDocs = { ...(selected.docs || {}), [docId]: !(selected.docs || {})[docId] };
    try {
      const updated = await handlers.update(selected.id, { docs: newDocs });
      setSelected(updated);
    } catch {
      addToast('Erreur lors de la mise à jour', 'error');
    }
  };

  const handleSubmit = async () => {
    if (!selected) return;
    const docs = selected.docs || {};
    if (!Object.values(docs).some(Boolean)) {
      addToast('Ajoutez au moins 1 document avant de soumettre', 'error');
      return;
    }
    try {
      const updated = await handlers.submit(selected.id);
      setSelected(updated);
      setSubmitOpen(false);
      addToast('Dossier soumis à la STEG');
    } catch {
      addToast('Erreur lors de la soumission', 'error');
    }
  };

  const handleApprove = async () => {
    if (!selected) return;
    try {
      const updated = await handlers.approve(selected.id);
      setSelected(updated);
      addToast('Dossier approuvé par la STEG');
    } catch {
      addToast('Erreur lors de l\'approbation', 'error');
    }
  };

  const handleReject = async () => {
    if (!selected) return;
    try {
      const updated = await handlers.reject(selected.id);
      setSelected(updated);
      setRejectOpen(false);
      addToast('Dossier rejeté', 'error');
    } catch {
      addToast('Erreur', 'error');
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await handlers.remove(selected.id);
      setDeleteOpen(false);
      setDetailOpen(false);
      setSelected(null);
      addToast(`${selected.ref_steg} supprimé`);
    } catch {
      addToast('Erreur lors de la suppression', 'error');
    }
  };

  const statusBadge = (d) => {
    const s = STEG_STATUSES.find(st => st.value === d.status) || STEG_STATUSES[0];
    const colors = { prep: 'badge-waiting', submitted: 'badge-submitted', validation: 'badge-validation', approved: 'badge-approved', rejected: 'badge-rejected' };
    return <span className={`badge ${colors[d.status] || 'badge-waiting'}`}><i className={`fa-solid ${s.icon}`} style={{ fontSize: 10 }} />{s.label}</span>;
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Suivi STEG</h1>
          <p style={{ color: 'var(--fg-muted)', fontSize: 14 }}>{dossiers.length} dossiers — {stats.approved} approuvés</p>
        </div>
        <button className="btn-primary" onClick={openCreate}><i className="fa-solid fa-folder-plus" />Nouveau Dossier</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total dossiers', value: stats.total, icon: 'fa-folder-open', color: '#3B82F6' },
          { label: 'Préparation', value: stats.prep, icon: 'fa-pen-ruler', color: '#94A3B8' },
          { label: 'Soumis/En cours', value: stats.submitted, icon: 'fa-spinner', color: '#F59E0B' },
          { label: 'Approuvés', value: stats.approved, icon: 'fa-circle-check', color: '#10B981' },
          { label: 'Complétude', value: `${progress}%`, icon: 'fa-chart-line', color: '#F97316' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'var(--fg-muted)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{s.label}</p>
                <p style={{ fontSize: 22, fontWeight: 700 }}>{s.value}</p>
              </div>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className={`fa-solid ${s.icon}`} style={{ color: s.color, fontSize: 15 }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card" style={{ padding: 16, marginBottom: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
          <i className="fa-solid fa-search" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-muted)', fontSize: 13 }} />
          <input className="input-field" placeholder="Rechercher par réf. STEG ou client..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 38 }} />
        </div>
        <select className="input-field" style={{ width: 'auto', minWidth: 180 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">Tous les statuts</option>
          {STEG_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Réf. STEG</th><th>Client</th><th>Puissance</th><th>Statut</th><th>Documents</th><th>Date création</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--fg-muted)' }}>Aucun dossier trouvé</td></tr>
              ) : filtered.map((d, i) => {
                const cl = getClient(d.client_id);
                const docCount = Object.values(d.docs || {}).filter(Boolean).length;
                return (
                  <tr key={d.id} onClick={() => { setSelected(d); setDetailOpen(true); }} style={{ animation: `slideUp 0.3s ease-out ${i * 0.03}s both` }}>
                    <td><span style={{ fontSize: 13, fontWeight: 700, padding: '4px 10px', borderRadius: 8, background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}>{d.ref_steg}</span></td>
                    <td style={{ fontWeight: 600, fontSize: 14 }}>{cl ? cl.name : '—'}</td>
                    <td style={{ fontSize: 13, color: '#94A3B8' }}>{d.puissance || '—'}</td>
                    <td>{statusBadge(d)}</td>
                    <td><span style={{ fontWeight: 700, fontSize: 14 }}>{docCount}/{STEG_DOCS.length}</span></td>
                    <td style={{ fontSize: 13, color: '#94A3B8' }}>{new Date(d.created_at).toLocaleDateString('fr-FR')}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
                        <ActionBtn icon="fa-eye" onClick={() => { setSelected(d); setDetailOpen(true); }} hoverColor="#3B82F6" label="Voir" />
                        <ActionBtn icon="fa-trash" onClick={() => { setSelected(d); setDeleteOpen(true); }} hoverColor="#EF4444" label="Supprimer" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Nouveau Dossier STEG" width={540}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={LBL}>Client *</label>
            <select className="input-field" value={form.client_id} onChange={e => setForm({ ...form, client_id: e.target.value })}>
              <option value="">Sélectionner...</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={LBL}>Référence STEG *</label>
              <input className="input-field" value={form.ref_steg} onChange={e => setForm({ ...form, ref_steg: e.target.value })} placeholder="Ex: 20081 289 0" />
            </div>
            <div>
              <label style={LBL}>Puissance</label>
              <input className="input-field" value={form.puissance} onChange={e => setForm({ ...form, puissance: e.target.value })} placeholder="Ex: 3,240 kwc" />
            </div>
          </div>
          <div>
            <label style={LBL}>Notes</label>
            <textarea className="input-field" rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Informations complémentaires..." style={{ resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
            <button className="btn-secondary" onClick={() => setCreateOpen(false)}>Annuler</button>
            <button className="btn-primary" onClick={handleCreate}><i className="fa-solid fa-save" />Créer le dossier</button>
          </div>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal isOpen={detailOpen} onClose={() => { setDetailOpen(false); setSelected(null); }} title={`Dossier STEG — ${selected?.ref_steg || ''}`} width={800}>
        {selected && (() => {
          const d = selected;
          const cl = getClient(d.client_id);
          return (
            <div>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, padding: '16px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: 14, borderLeft: `4px solid ${STEG_STATUSES.find(s => s.value === d.status)?.color || '#94A3B8'}` }}>
                <div className="avatar" style={{ width: 56, height: 56, background: 'rgba(59,130,246,0.15)' }}>
                  <i className="fa-solid fa-file-shield" style={{ color: '#3B82F6', fontSize: 20 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 20, fontWeight: 700 }}>{d.ref_steg}</span>
                    {statusBadge(d)}
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 600 }}>{cl ? cl.name : 'Client inconnu'}</p>
                  <p style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>{cl ? cl.address : ''}</p>
                </div>
              </div>

              {/* Info grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
                {[
                  ['fa-id-card', 'CIN', cl?.cin],
                  ['fa-bolt', 'Puissance', d.puissance],
                  ['fa-hashtag', 'Réf. STEG', d.ref_steg],
                  ['fa-phone', 'Téléphone', cl?.phone],
                  ['fa-calendar', 'Créé le', new Date(d.created_at).toLocaleDateString('fr-FR')],
                  ['fa-map-pin', 'Adresse', cl?.address],
                ].map(([ic, l, v], i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: 10 }}>
                    <i className={`fa-solid ${ic}`} style={{ color: 'var(--fg-muted)', fontSize: 12, width: 16 }} />
                    <div>
                      <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{l}</p>
                      <p style={{ fontSize: 13, fontWeight: 500, marginTop: 1 }}>{v || '—'}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notes */}
              {d.notes && (
                <div style={{ padding: '12px 16px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 10, marginBottom: 20 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Notes</p>
                  <p style={{ fontSize: 13, color: '#94A3B8' }}>{d.notes}</p>
                </div>
              )}

              {/* Documents checklist */}
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <i className="fa-solid fa-file-lines" style={{ color: '#F97316', fontSize: 14 }} />Documents requis
                  <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--fg-muted)' }}>
                    ({Object.values(d.docs || {}).filter(Boolean).length}/{STEG_DOCS.length})
                  </span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {Object.entries(docCategories).map(([cat, docs]) => (
                    <div key={cat}>
                      <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, marginTop: 4 }}>{cat}</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 6 }}>
                        {docs.map(doc => {
                          const isOk = (d.docs || {})[doc.id];
                          return (
                            <div key={doc.id} onClick={() => handleDocToggle(doc.id)}
                              style={{
                                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                                background: isOk ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.02)',
                                border: `1px solid ${isOk ? 'rgba(16,185,129,0.2)' : 'var(--border)'}`,
                                borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
                              }}>
                              <div className={`doc-check ${isOk ? 'ok' : ''}`}>
                                {isOk && <i className="fa-solid fa-check" />}
                              </div>
                              <i className={`fa-solid ${doc.icon}`} style={{ color: isOk ? '#10B981' : 'var(--fg-muted)', fontSize: 12, width: 16 }} />
                              <span style={{ fontSize: 12, flex: 1, color: isOk ? '#10B981' : 'var(--fg-muted)' }}>{doc.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                {d.status === 'prep' && (
                  <button className="btn-success" onClick={() => setSubmitOpen(true)}>
                    <i className="fa-solid fa-paper-plane" />Soumettre à la STEG
                  </button>
                )}
                {d.status === 'submitted' && (
                  <>
                    <button className="btn-success" onClick={handleApprove}>
                      <i className="fa-solid fa-circle-check" />Approuver
                    </button>
                    <button className="btn-danger" onClick={() => setRejectOpen(true)}>
                      <i className="fa-solid fa-ban" />Rejeter
                    </button>
                  </>
                )}
                {d.status === 'approved' && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, background: 'rgba(16,185,129,0.1)', color: '#10B981', fontSize: 13, fontWeight: 600 }}>
                    <i className="fa-solid fa-check-circle" />Dossier approuvé le {new Date(d.approved_date).toLocaleDateString('fr-FR')}
                  </span>
                )}
                {d.status === 'rejected' && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, background: 'rgba(239,68,68,0.1)', color: '#EF4444', fontSize: 13, fontWeight: 600 }}>
                    <i className="fa-solid fa-circle-xmark" />Dossier rejeté
                  </span>
                )}
                <button className="btn-danger" onClick={() => { setDetailOpen(false); setDeleteOpen(true); }} style={{ marginLeft: 'auto' }}>
                  <i className="fa-solid fa-trash" />Supprimer
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* Submit Confirmation */}
      <Modal isOpen={submitOpen} onClose={() => setSubmitOpen(false)} title="Soumettre à la STEG" width={420}>
        {selected && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(59,130,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <i className="fa-solid fa-paper-plane" style={{ color: '#3B82F6', fontSize: 22 }} />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Soumettre le dossier ?</h3>
            <p style={{ fontSize: 14, color: 'var(--fg-muted)', marginBottom: 8 }}>{selected.ref_steg}</p>
            <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>
              {Object.values(selected.docs || {}).filter(Boolean).length} documents sur {STEG_DOCS.length} seront transmis à la STEG.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn-secondary" onClick={() => setSubmitOpen(false)}>Annuler</button>
              <button className="btn-success" onClick={handleSubmit}><i className="fa-solid fa-check" />Confirmer</button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal isOpen={rejectOpen} onClose={() => setRejectOpen(false)} onConfirm={handleReject}
        title="Rejeter le dossier"
        message={`Rejeter ${selected?.ref_steg} ? Le client devra fournir les documents manquants.`}
        confirmColor="#EF4444" />

      <ConfirmModal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={handleDelete}
        title="Supprimer le dossier"
        message={`Supprimer ${selected?.ref_steg} ? Cette action est irréversible.`}
        confirmColor="#EF4444" />
    </div>
  );
}
