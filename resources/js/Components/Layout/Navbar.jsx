import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

const services = [
    { name: 'Data Recovery', desc: 'HDD, SSD, Mobile, USB recovery', href: '/services/data-recovery', icon: '💾' },
    { name: 'Digital Forensics', desc: 'Court-ready forensic examination', href: '/services/digital-forensics', icon: '🔍' },
    { name: 'Corporate Investigations', desc: 'Fraud and due diligence', href: '/services/corporate-investigations', icon: '🏢' },
    { name: 'Background Verification', desc: 'Identity and employment checks', href: '/services/background-verification', icon: '👤' },
    { name: 'Cyber Intelligence', desc: 'OSINT and risk intelligence', href: '/services/cyber-intelligence', icon: '🌐' },
    { name: 'Evidence Preservation', desc: 'Chain-of-custody documentation', href: '/services/evidence-preservation', icon: '⚖️' },
];

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services', isDropdown: true },
    { name: 'About', href: '/about' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: 36, height: 36, background: 'var(--color-accent)', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-void)', fontSize: '1.2rem' }}>Z</div>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>Zentrix</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
                        {navLinks.map((link) => (
                            <div key={link.name} style={{ position: 'relative' }}
                                onMouseEnter={() => link.isDropdown && setServicesOpen(true)}
                                onMouseLeave={() => link.isDropdown && setServicesOpen(false)}>
                                <Link href={link.href}
                                    className={`nav-link ${url === link.href || (link.isDropdown && url.startsWith('/services')) ? 'active' : ''}`}
                                    style={{ textDecoration: 'none', padding: '0.5rem 0' }}>
                                    {link.name} {link.isDropdown && <span style={{ fontSize: '0.8em', marginLeft: '2px' }}>▾</span>}
                                </Link>
                                
                                {/* Services Mega Dropdown */}
                                {link.isDropdown && (
                                    <div style={{
                                        position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                                        paddingTop: '1rem', width: '600px', zIndex: 100,
                                        visibility: servicesOpen ? 'visible' : 'hidden',
                                        opacity: servicesOpen ? 1 : 0,
                                        transition: 'all 150ms ease-in-out',
                                        transformOrigin: 'top center',
                                    }}>
                                        <div style={{
                                            background: 'var(--color-surface)',
                                            borderRadius: '1rem', border: '1px solid var(--color-border)',
                                            padding: '1.5rem', boxShadow: 'var(--shadow-card)',
                                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'
                                        }}>
                                            {services.map((service) => (
                                                <Link key={service.href} href={service.href}
                                                    style={{
                                                        display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem',
                                                        textDecoration: 'none', borderRadius: '0.75rem', transition: 'all 0.2s',
                                                    }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,200,255,0.05)'; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                                                    <div style={{ fontSize: '1.5rem', color: 'var(--color-accent)' }}>{service.icon}</div>
                                                    <div>
                                                        <div style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{service.name}</div>
                                                        <div style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontSize: '0.8rem', lineHeight: 1.4 }}>{service.desc}</div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right side */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <a href="tel:+918012345678" className="desktop-nav mono" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            +91 80 1234 5678
                        </a>
                        <Link href="/contact" className="btn btn-primary desktop-btn" style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}>Free Consultation</Link>
                        
                        {/* Mobile hamburger */}
                        <button onClick={() => setMobileOpen(true)}
                            className="mobile-nav-btn"
                            style={{ display: 'none', background: 'none', border: 'none', color: 'var(--color-text-primary)', cursor: 'pointer', padding: '0.5rem' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <div style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', zIndex: 9999,
                background: 'var(--color-void)', padding: '2rem', display: 'flex', flexDirection: 'column',
                transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s ease-in-out',
                overflowY: 'auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3rem' }}>
                    <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-primary)', cursor: 'pointer', padding: '0.5rem' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                    {navLinks.map((link) => (
                        <div key={link.name}>
                            <Link href={link.href} onClick={() => setMobileOpen(false)}
                                style={{ display: 'block', color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                                {link.name}
                            </Link>
                            {link.isDropdown && (
                                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1rem', borderLeft: '1px solid var(--color-border)' }}>
                                    {services.map(s => (
                                        <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '1rem' }}>
                                            {s.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
                    <a href="tel:+918012345678" className="mono" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        +91 80 1234 5678
                    </a>
                    <Link href="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
                        Free Consultation
                    </Link>
                </div>
            </div>

            <style>{`
                @media (max-width: 992px) {
                    .desktop-nav { display: none !important; }
                    .desktop-btn { display: none !important; }
                    .mobile-nav-btn { display: block !important; }
                }
            `}</style>
        </>
    );
}
