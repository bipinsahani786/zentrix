import AdminLayout from '@/Components/Admin/AdminLayout';

export default function GenericIndex({ title, data }) {
    return (
        <AdminLayout title={title}>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary btn-sm">Add New</button>
            </div>
            <div style={{ background: '#fff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '2rem', textAlign: 'center' }}>
                <p style={{ color: '#64748b' }}>{data?.length || data?.data?.length || 0} items found. (List view initialized)</p>
            </div>
        </AdminLayout>
    );
}
