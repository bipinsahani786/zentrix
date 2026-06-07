import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content },
                body: JSON.stringify({ email }),
            });
            if (res.ok) { setSubscribed(true); setEmail(''); }
        } catch (err) { console.error(err); }
    };

    const services = [
        { name: 'Data Recovery', href: '/services/data-recovery' },
        { name: 'Digital Forensics', href: '/services/digital-forensics' },
        { name: 'Corporate Investigations', href: '/services/corporate-investigations' },
        { name: 'Background Verification', href: '/services/background-verification' },
        { name: 'Cyber Intelligence', href: '/services/cyber-intelligence' },
        { name: 'Evidence Preservation', href: '/services/evidence-preservation' },
    ];

    const companyLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
    ];

    return (
        <footer className="footer bg-dark">
            <div className="container">
                {/* Main Footer Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '3rem', paddingBottom: '4rem' }}>
                    {/* Col 1: Company Info */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                            <div style={{ width: 36, height: 36, background: 'var(--color-accent)', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-void)', fontSize: '1rem' }}>Z</div>
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>Zentrix</span>
                        </div>
                        <p className="body-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                            Digital Forensics · Data Recovery<br/>Corporate Intelligence
                        </p>
                        {/* Social Icons */}
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            {['In', 'Fb', 'Ig', 'X'].map((social) => (
                                <a key={social} href="#" style={{ width: 36, height: 36, borderRadius: '0.5rem', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'all 0.3s' }}
                                    onMouseEnter={(e) => { e.target.style.borderColor = 'var(--color-accent)'; e.target.style.color = 'var(--color-accent)'; e.target.style.background = 'rgba(0,200,255,0.05)'; }}
                                    onMouseLeave={(e) => { e.target.style.borderColor = 'var(--color-border)'; e.target.style.color = 'var(--color-text-secondary)'; e.target.style.background = 'transparent'; }}>
                                    {social}
                                </a>
                            ))}
                        </div>
                        <div className="mono" style={{ marginTop: '1.5rem', color: 'var(--color-success)', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,214,143,0.05)', border: '1px solid rgba(0,214,143,0.1)', padding: '0.25rem 0.75rem', borderRadius: '999px' }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-success)' }}></div>
                            Licensed & Confidential
                        </div>
                    </div>

                    {/* Col 2: Services */}
                    <div>
                        <div className="eyebrow" style={{ color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>SERVICES</div>
                        {services.map((link) => (
                            <Link key={link.href} href={link.href} style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>{link.name}</Link>
                        ))}
                    </div>

                    {/* Col 3: Company */}
                    <div>
                        <div className="eyebrow" style={{ color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>COMPANY</div>
                        {companyLinks.map((link) => (
                            <Link key={link.href} href={link.href} style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>{link.name}</Link>
                        ))}
                    </div>

                    {/* Col 4: Contact */}
                    <div>
                        <div className="eyebrow" style={{ color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>CONTACT</div>
                        <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--color-text-secondary)' }}><span style={{ marginRight: '0.5rem' }}>📍</span> Bangalore, Karnataka, India</p>
                        <a href="tel:+918012345678" className="mono" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.75rem', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>📞 +91 80 1234 5678</a>
                        <a href="mailto:info@zentrixit.com" className="mono" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.75rem', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>✉ info@zentrixit.com</a>
                        <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>🕐 Mon–Sat: 9AM–7PM IST</p>
                        <a href="https://wa.me/919876543210" target="_blank" rel="noopener" className="btn btn-primary btn-sm" style={{ padding: '0.5rem 1rem', color: 'var(--color-void)' }}>
                            WhatsApp Connect
                        </a>
                    </div>
                </div>

                {/* Newsletter Strip */}
                <div style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '2.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                    <div>
                        <h4 className="section-h3" style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Stay Informed</h4>
                        <p className="body-md" style={{ color: 'var(--color-text-secondary)' }}>Monthly insights on digital forensics and corporate intelligence.</p>
                    </div>
                    {subscribed ? (
                        <div className="mono" style={{ color: 'var(--color-success)', background: 'rgba(0,214,143,0.1)', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '1px solid rgba(0,214,143,0.2)' }}>✓ SECURELY SUBSCRIBED</div>
                    ) : (
                        <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', width: '100%', maxWidth: '450px' }}>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter corporate email" required
                                className="form-input-cinematic"
                                style={{ flex: '1 1 200px' }} />
                            <button type="submit" className="btn btn-primary btn-md" style={{ color: 'var(--color-void)' }}>Subscribe</button>
                        </form>
                    )}
                </div>

                {/* Bottom Bar */}
                <div style={{ padding: '2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <p className="mono" style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>© {new Date().getFullYear()} ZENTRIX IT SOLUTIONS. ALL RIGHTS RESERVED.</p>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <a href="#" className="mono" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.75rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>PRIVACY POLICY</a>
                        <a href="#" className="mono" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.75rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>TERMS OF SERVICE</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
