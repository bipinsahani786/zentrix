import AdminLayout from '@/Components/Admin/AdminLayout';

export default function Subscribers({ subscribers }) {
    return (
        <AdminLayout title="Newsletter Subscribers">
            <div style={{ background: '#fff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#475569' }}>Email</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#475569' }}>Name</th>
                            <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#475569' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#475569' }}>Date Subscribed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers.data ? subscribers.data.map(sub => (
                            <tr key={sub.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1rem', fontWeight: 500 }}>{sub.email}</td>
                                <td style={{ padding: '1rem', color: '#64748b' }}>{sub.name || '-'}</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, background: sub.status === 'active' ? '#dcfce7' : '#fee2e2', color: sub.status === 'active' ? '#166534' : '#991b1b' }}>
                                        {sub.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', color: '#64748b' }}>{new Date(sub.subscribed_at).toLocaleDateString()}</td>
                            </tr>
                        )) : <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No subscribers found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
