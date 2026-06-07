import AdminLayout from '@/Components/Admin/AdminLayout';
import { Link } from '@inertiajs/react';

export default function Dashboard({ stats, recentLeads, chartData }) {
    const statCards = [
        { label: 'Leads Today', value: stats.total_leads_today, icon: '📥', color: '#3b82f6' },
        { label: 'Leads This Week', value: stats.total_leads_week, icon: '📅', color: '#10b981' },
        { label: 'New Subscribers', value: stats.new_subscribers, icon: '✉️', color: '#f59e0b' },
        { label: 'Active Services', value: stats.active_services, icon: '🔧', color: '#8b5cf6' },
    ];

    return (
        <AdminLayout title="Dashboard">
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {statCards.map((s, i) => (
                    <div key={i} style={{ background: '#fff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: 48, height: 48, borderRadius: '0.5rem', background: `${s.color}15`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                            {s.icon}
                        </div>
                        <div>
                            <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>{s.label}</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Chart Area */}
                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Lead Generation (Last 30 Days)</h3>
                    <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '4px', paddingTop: '2rem' }}>
                        {chartData.map((d, i) => {
                            const maxCount = Math.max(...chartData.map(c => c.count), 1);
                            const heightPercent = (d.count / maxCount) * 100;
                            return (
                                <div key={i} style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', group: 'true' }}>
                                    <div style={{ width: '100%', height: `${heightPercent}%`, background: 'var(--accent)', borderRadius: '4px 4px 0 0', opacity: 0.8, transition: 'all 0.3s' }} title={`${d.date}: ${d.count} leads`} />
                                </div>
                            );
                        })}
                    </div>
                    {chartData.length === 0 && <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '-150px' }}>No data available for the last 30 days.</p>}
                </div>

                {/* Recent Leads */}
                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Recent Leads</h3>
                        <Link href="/admin/contact-submissions" style={{ color: 'var(--primary-500)', fontSize: '0.9rem', textDecoration: 'none' }}>View All</Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recentLeads.map(lead => (
                            <div key={lead.id} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{lead.name}</span>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{new Date(lead.created_at).toLocaleDateString()}</span>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.25rem' }}>{lead.service_type || 'General Inquiry'}</p>
                                <div>
                                    <span className="badge" style={{ background: lead.urgency === 'emergency' ? '#fef2f2' : (lead.urgency === 'urgent' ? '#fffbeb' : '#f1f5f9'), color: lead.urgency === 'emergency' ? '#ef4444' : (lead.urgency === 'urgent' ? '#f59e0b' : '#64748b'), fontSize: '0.7rem' }}>
                                        {lead.urgency.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {recentLeads.length === 0 && <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No recent leads found.</p>}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
