import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';

export default function About({ teamMembers = [], testimonials = [] }) {
    return (
        <Layout>
            <Head title="About Us - Zentrix IT Solutions" />

            {/* Hero */}
            <section style={{ minHeight: '60vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', paddingTop: '6rem', position: 'relative' }}>
                <div className="container" style={{ color: '#fff', textAlign: 'center' }}>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>About Zentrix</h1>
                    <p style={{ color: 'var(--muted)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.7, fontSize: '1.1rem' }}>
                        Bangalore's trusted authority in digital forensics, data recovery, and corporate intelligence.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="section">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>Our Mission</h2>
                    <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                        At Zentrix IT Solutions, we believe that the truth is always in the data. Our mission is to uncover it ethically, legally, and professionally. Since our inception, we have been dedicated to providing forensic-grade data recovery and digital investigation services to individuals, law firms, and corporations across India.
                    </p>
                    <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '1.1rem' }}>
                        Based in Bangalore, the tech capital of India, we combine cutting-edge technology with rigorous chain-of-custody protocols to ensure our findings are not just accurate, but court-admissible.
                    </p>
                </div>
            </section>

            {/* Core Values */}
            <section className="section section-gray">
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>Our Core Values</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {[
                            { icon: '🔒', title: 'Absolute Confidentiality', desc: 'Every engagement begins with a strict NDA. Your identity and data are entirely protected.' },
                            { icon: '⚖️', title: 'Uncompromising Ethics', desc: 'We operate 100% within the boundaries of the law. No illegal hacking, no shortcuts.' },
                            { icon: '🔬', title: 'Scientific Precision', desc: 'We rely on proven forensic methodologies and industry-standard tools, not guesswork.' },
                        ].map((v, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{v.icon}</div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>{v.title}</h3>
                                <p style={{ color: '#64748b', lineHeight: 1.6 }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            {teamMembers.length > 0 && (
                <section className="section">
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <p className="section-label">The Experts Behind The Data</p>
                            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>Our Leadership</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            {teamMembers.map((member) => (
                                <div key={member.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                                    <div style={{ height: '240px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {member.image ? (
                                            <img src={`/storage/${member.image}`} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <span style={{ fontSize: '4rem', opacity: 0.2 }}>👤</span>
                                        )}
                                    </div>
                                    <div style={{ padding: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{member.name}</h3>
                                        <p style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{member.designation}</p>
                                        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>{member.bio}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="section-accent-gradient" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Need our expertise?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>Contact us for a confidential assessment of your case.</p>
                    <Link href="/contact" className="btn" style={{ background: '#fff', color: 'var(--dark)' }}>Get in Touch</Link>
                </div>
            </section>
        </Layout>
    );
}
