import AdminLayout from '@/Components/Admin/AdminLayout';

export default function ContactIndex({ submissions }) {
    return (
        <AdminLayout title="Contact Leads">
            <div style={{ background: '#fff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#475569' }}>Date</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#475569' }}>Name / Email</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#475569' }}>Service</th>
                            <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#475569' }}>Urgency</th>
                            <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#475569' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, color: '#475569' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.data ? submissions.data.map(sub => (
                            <tr key={sub.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.9rem' }}>{new Date(sub.created_at).toLocaleDateString()}</td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: 500 }}>{sub.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{sub.email}</div>
                                </td>
                                <td style={{ padding: '1rem', color: '#475569' }}>{sub.service_type || '-'}</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                    <span className="badge" style={{ background: sub.urgency === 'emergency' ? '#fef2f2' : (sub.urgency === 'urgent' ? '#fffbeb' : '#f1f5f9'), color: sub.urgency === 'emergency' ? '#ef4444' : (sub.urgency === 'urgent' ? '#f59e0b' : '#64748b'), fontSize: '0.7rem' }}>
                                        {sub.urgency}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                    <span className="badge" style={{ background: sub.status === 'new' ? '#dbeafe' : '#f1f5f9', color: sub.status === 'new' ? '#1d4ed8' : '#475569' }}>
                                        {sub.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <button className="btn btn-sm" style={{ background: '#f1f5f9', color: '#0f172a' }}>View</button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No submissions found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
