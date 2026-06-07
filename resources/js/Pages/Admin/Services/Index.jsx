import AdminLayout from '@/Components/Admin/AdminLayout';

export default function ServicesIndex({ services }) {
    return (
        <AdminLayout title="Manage Services">
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary btn-sm">Add New Service</button>
            </div>
            <div style={{ background: '#fff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#475569' }}>Service Title</th>
                            <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#475569' }}>Features</th>
                            <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#475569' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, color: '#475569' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1rem', fontWeight: 500 }}>{service.title}</td>
                                <td style={{ padding: '1rem', textAlign: 'center', color: '#64748b' }}>{service.features?.length || 0}</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, background: service.is_active ? '#dcfce7' : '#f1f5f9', color: service.is_active ? '#166534' : '#64748b' }}>
                                        {service.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right', gap: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button className="btn btn-sm" style={{ background: '#f1f5f9', color: '#0f172a' }}>Edit</button>
                                    <button className="btn btn-sm" style={{ background: '#fef2f2', color: '#ef4444' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
