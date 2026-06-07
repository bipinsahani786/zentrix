import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Components/Admin/AdminLayout';

export default function Index({ faqs }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this FAQ?')) {
            router.delete(`/admin/faqs/${id}`);
        }
    };

    return (
        <AdminLayout title="Global FAQs">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                <Link href="/admin/faqs/create" style={{ background: '#1E40AF', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 500 }}>
                    + Add New FAQ
                </Link>
            </div>

            <div className="admin-card" style={{ overflow: 'hidden' }}>
                <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>Question</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faqs.map((faq) => (
                            <tr key={faq.id}>
                                <td>{faq.sort_order}</td>
                                <td style={{ fontWeight: 500 }}>{faq.question}</td>
                                <td>
                                    <span style={{ 
                                        padding: '0.25rem 0.75rem', 
                                        borderRadius: '999px', 
                                        fontSize: '0.75rem', 
                                        fontWeight: 600,
                                        backgroundColor: faq.is_active ? '#DEF7EC' : '#FDE8E8',
                                        color: faq.is_active ? '#03543F' : '#9B1C1C'
                                    }}>
                                        {faq.is_active ? 'Active' : 'Hidden'}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <Link href={`/admin/faqs/${faq.id}/edit`} style={{ color: '#1E40AF', textDecoration: 'none', marginRight: '1rem', fontWeight: 500 }}>Edit</Link>
                                    <button onClick={() => handleDelete(faq.id)} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {faqs.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
                                    No FAQs found. Create your first FAQ!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
