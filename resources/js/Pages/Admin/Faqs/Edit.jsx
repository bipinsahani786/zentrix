import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Components/Admin/AdminLayout';

export default function Edit({ faq }) {
    const { data, setData, put, processing, errors } = useForm({
        question: faq.question || '',
        answer: faq.answer || '',
        is_active: faq.is_active ?? true,
        sort_order: faq.sort_order || 0
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/faqs/${faq.id}`);
    };

    return (
        <AdminLayout title="Edit FAQ">
            <div className="admin-card" style={{ maxWidth: '800px', padding: '2rem' }}>
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#334155' }}>Question</label>
                        <input 
                            type="text" 
                            value={data.question} 
                            onChange={e => setData('question', e.target.value)} 
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}
                        />
                        {errors.question && <div style={{ color: '#EF4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.question}</div>}
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#334155' }}>Answer</label>
                        <textarea 
                            value={data.answer} 
                            onChange={e => setData('answer', e.target.value)} 
                            rows="5"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}
                        />
                        {errors.answer && <div style={{ color: '#EF4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.answer}</div>}
                    </div>

                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#334155' }}>Sort Order</label>
                            <input 
                                type="number" 
                                value={data.sort_order} 
                                onChange={e => setData('sort_order', parseInt(e.target.value))} 
                                style={{ width: '100px', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#334155' }}>Status</label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
                                <input 
                                    type="checkbox" 
                                    checked={data.is_active} 
                                    onChange={e => setData('is_active', e.target.checked)} 
                                />
                                <span>Active (Visible on Homepage)</span>
                            </label>
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <button type="submit" disabled={processing} style={{ background: '#1E40AF', color: '#fff', padding: '0.75rem 2rem', borderRadius: '0.5rem', border: 'none', fontWeight: 500, cursor: 'pointer' }}>
                            {processing ? 'Saving...' : 'Update FAQ'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
