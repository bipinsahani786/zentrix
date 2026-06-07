import AdminLayout from '@/Components/Admin/AdminLayout';

export default function PostsIndex({ posts }) {
    return (
        <AdminLayout title="Manage Blog Posts">
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary btn-sm">Create Post</button>
            </div>
            <div style={{ background: '#fff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#475569' }}>Title</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#475569' }}>Category</th>
                            <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#475569' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, color: '#475569' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.data ? posts.data.map(post => (
                            <tr key={post.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1rem', fontWeight: 500 }}>{post.title}</td>
                                <td style={{ padding: '1rem', color: '#64748b' }}>{post.category?.name || 'Uncategorized'}</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, background: post.status === 'published' ? '#dcfce7' : '#fef9c3', color: post.status === 'published' ? '#166534' : '#854d0e' }}>
                                        {post.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <button className="btn btn-sm" style={{ background: '#f1f5f9', color: '#0f172a' }}>Edit</button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No posts found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
