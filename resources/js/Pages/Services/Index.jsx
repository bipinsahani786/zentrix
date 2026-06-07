import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';
import { useState } from 'react';

export default function ServicesIndex({ services = [], caseStudies = [] }) {
    const [activeTab, setActiveTab] = useState(null);

    const serviceIcons = { 'data-recovery': '💾', 'digital-forensics': '🔬', 'corporate-investigations': '🕵️', 'background-verification': '✅', 'cyber-intelligence': '🌐', 'evidence-preservation': '🔒' };

    const timeline = [
        { title: 'Initial Consultation', desc: 'Understand your situation confidentially' },
        { title: 'Case Assessment', desc: 'Evaluate scope, devices, requirements' },
        { title: 'Investigation/Recovery', desc: 'Deploy tools and methodologies' },
        { title: 'Analysis & Verification', desc: 'Verify findings, maintain chain of custody' },
        { title: 'Report Delivery', desc: 'Structured professional report' },
    ];

    const turnaround = [
        { service: 'Data Recovery', standard: '3-7 days', urgent: '24-48 hrs', emergency: 'Same day' },
        { service: 'Digital Forensics', standard: '5-10 days', urgent: '48-72 hrs', emergency: '24 hrs' },
        { service: 'Background Verification', standard: '2-5 days', urgent: '24-48 hrs', emergency: '12 hrs' },
        { service: 'Corporate Investigation', standard: '7-21 days', urgent: '3-5 days', emergency: '48 hrs' },
        { service: 'Cyber Intelligence', standard: '3-7 days', urgent: '24-48 hrs', emergency: '12 hrs' },
    ];

    return (
        <Layout>
            <Head title="Our Services" />

            {/* Hero */}
            <section style={{ minHeight: '60vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', paddingTop: '6rem' }}>
                <div className="container" style={{ color: '#fff', textAlign: 'center' }}>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link> › Services
                    </p>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>Our Services</h1>
                    <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
                        Comprehensive digital investigation, forensics, and intelligence services for individuals and organizations.
                    </p>
                </div>
            </section>

            {/* Sticky Tab Nav */}
            <div style={{ position: 'sticky', top: '60px', zIndex: 50, background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0.75rem 0' }}>
                <div className="container" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '0 1rem' }}>
                    {services.map((svc) => (
                        <a key={svc.id} href={`#${svc.slug}`}
                            style={{ padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', textDecoration: 'none',
                                background: activeTab === svc.slug ? 'var(--accent)' : 'transparent',
                                color: activeTab === svc.slug ? 'var(--dark)' : '#475569',
                                border: '1px solid ' + (activeTab === svc.slug ? 'var(--accent)' : '#e2e8f0'),
                            }}
                            onClick={() => setActiveTab(svc.slug)}>
                            {svc.title}
                        </a>
                    ))}
                </div>
            </div>

            {/* Service Blocks */}
            {services.map((svc, i) => (
                <section key={svc.id} id={svc.slug} className={`section ${i % 2 === 0 ? '' : 'section-gray'}`}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', direction: i % 2 !== 0 ? 'rtl' : 'ltr' }}>
                            <div style={{ direction: 'ltr' }}>
                                <div className="badge badge-accent" style={{ marginBottom: '1rem' }}>Service {String(i + 1).padStart(2, '0')}</div>
                                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginBottom: '1rem' }}>{svc.title}</h2>
                                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>{svc.long_description || svc.short_description}</p>
                                {svc.features && (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                        {svc.features.map((f) => (
                                            <p key={f.id} style={{ fontSize: '0.9rem', color: '#475569' }}>✓ {f.title}</p>
                                        ))}
                                    </div>
                                )}
                                <Link href={`/services/${svc.slug}`} className="btn btn-primary btn-sm">Learn More →</Link>
                            </div>
                            <div style={{ direction: 'ltr', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '100%', maxWidth: '300px', aspectRatio: '1', borderRadius: '1rem', background: `linear-gradient(135deg, var(--primary-900), var(--surface))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem' }}>
                                    {serviceIcons[svc.slug] || '⚡'}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* Process Timeline */}
            <section className="section">
                <div className="container">
                    <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginBottom: '3rem' }}>Our Investigation & Recovery Process</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', position: 'relative' }}>
                        {timeline.map((step, i) => (
                            <div key={i} style={{ flex: '1 1 160px', textAlign: 'center', position: 'relative' }}>
                                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--accent)', color: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, margin: '0 auto 1rem' }}>{i + 1}</div>
                                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>{step.title}</h4>
                                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Turnaround Table */}
            <section className="section section-gray">
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Service Delivery Timelines</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            <thead>
                                <tr style={{ background: 'var(--dark)', color: '#fff' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Service</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Standard</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Urgent</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Emergency</th>
                                </tr>
                            </thead>
                            <tbody>
                                {turnaround.map((row, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '1rem', fontWeight: 600 }}>{row.service}</td>
                                        <td style={{ padding: '1rem', textAlign: 'center', color: '#475569' }}>{row.standard}</td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}><span className="badge badge-warning">{row.urgent}</span></td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}><span className="badge badge-danger">{row.emergency}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ textAlign: 'center', color: '#64748b', marginTop: '1rem', fontSize: '0.85rem' }}>Timelines depend on case complexity. Emergency cases handled on priority.</p>
                </div>
            </section>

            {/* Emergency Banner */}
            <section style={{ background: 'linear-gradient(135deg, #7f1d1d, #991b1b)', padding: '3rem 0', textAlign: 'center' }}>
                <div className="container" style={{ color: '#fff' }}>
                    <h2 style={{ marginBottom: '0.75rem' }}>🚨 Emergency Case? We're Available.</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>Critical evidence can degrade within hours. Call our emergency line immediately.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="tel:+918012345678" className="btn" style={{ background: '#fff', color: '#991b1b', borderColor: '#fff' }}>📞 Call Emergency Line</a>
                        <a href="https://wa.me/919876543210" className="btn btn-whatsapp">WhatsApp Now</a>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-accent-gradient" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Get a Custom Quote</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>Every case is unique. We provide tailored pricing based on your specific requirements.</p>
                    <Link href="/contact" className="btn" style={{ background: '#fff', color: 'var(--dark)', borderColor: '#fff' }}>Request a Quote →</Link>
                </div>
            </section>
        </Layout>
    );
}
