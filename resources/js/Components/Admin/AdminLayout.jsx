import { Head, Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children, title }) {
    const { url } = usePage();

    const menu = [
        { name: 'Dashboard', href: '/admin', icon: '📊' },
        { name: 'Contact Leads', href: '/admin/contact-submissions', icon: '📥' },
        { name: 'Services', href: '/admin/services', icon: '🔧' },
        { name: 'Blog Posts', href: '/admin/posts', icon: '📝' },
        { name: 'FAQs', href: '/admin/faqs', icon: '❓' },
        { name: 'Newsletter', href: '/admin/newsletter/subscribers', icon: '✉️' },
        { name: 'Team', href: '/admin/team', icon: '👥' },
        { name: 'Testimonials', href: '/admin/testimonials', icon: '⭐' },
        { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
    ];

    return (
        <div className="admin-theme" style={{ display: 'flex', minHeight: '100vh' }}>
            <Head title={`${title} - Zentrix Admin`} />

            {/* Sidebar */}
            <aside className="admin-sidebar" style={{ width: '260px', position: 'fixed', top: 0, bottom: 0, left: 0, overflowY: 'auto' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 32, height: 32, background: '#1E40AF', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 'bold' }}>Z</div>
                    <span style={{ fontWeight: 600, fontSize: '1.1rem', color: '#0F172A' }}>Zentrix Admin</span>
                </div>
                <nav style={{ padding: '1.5rem 1rem' }}>
                    {menu.map(item => {
                        const isActive = url.startsWith(item.href) && (item.href !== '/admin' || url === '/admin');
                        return (
                            <Link key={item.name} href={item.href} style={{
                                display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
                                color: isActive ? '#1E40AF' : '#64748B',
                                background: isActive ? '#EFF6FF' : 'transparent',
                                borderRadius: '0.5rem',
                                textDecoration: 'none',
                                fontWeight: isActive ? 600 : 500,
                                marginBottom: '0.25rem',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#334155'; } }}
                            onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B'; } }}>
                                <span>{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{ marginLeft: '260px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <header style={{ background: '#FFFFFF', padding: '1rem 2rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', margin: 0 }}>{title}</h1>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="/" target="_blank" style={{ padding: '0.5rem 1rem', border: '1px solid #CBD5E1', borderRadius: '0.5rem', color: '#475569', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, transition: 'all 0.2s' }}
                           onMouseEnter={(e) => { e.currentTarget.style.background = '#F8FAFC'; }}
                           onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                            View Public Site
                        </a>
                        <Link href="/admin/logout" method="post" as="button" style={{ padding: '0.5rem 1rem', background: '#1E40AF', border: 'none', borderRadius: '0.5rem', color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = '#1E3A8A'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = '#1E40AF'; }}>
                            Logout
                        </Link>
                    </div>
                </header>
                <div style={{ padding: '2rem', flex: 1 }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
