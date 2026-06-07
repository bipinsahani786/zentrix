import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';
import DataRecovery from '@/Components/Services/DataRecovery';
import CorporateInvestigations from '@/Components/Services/CorporateInvestigations';
import BackgroundVerification from '@/Components/Services/BackgroundVerification';
import CyberIntelligence from '@/Components/Services/CyberIntelligence';

export default function ServiceShow({ service }) {
    // Dynamic component rendering based on slug
    const renderCustomContent = () => {
        switch (service.slug) {
            case 'data-recovery':
                return <DataRecovery service={service} />;
            case 'corporate-investigations':
                return <CorporateInvestigations service={service} />;
            case 'background-verification':
                return <BackgroundVerification service={service} />;
            case 'cyber-intelligence':
                return <CyberIntelligence service={service} />;
            default:
                // Generic fallback for Digital Forensics and Evidence Preservation
                return (
                    <div className="container" style={{ paddingTop: '2rem' }}>
                        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem' }}>{service.title}</h2>
                            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.8 }}>{service.long_description || service.short_description}</p>
                        </div>
                    </div>
                );
        }
    };

    const isDark = service.slug === 'cyber-intelligence';

    return (
        <Layout>
            <Head title={`${service.meta_title || service.title} | Zentrix IT Solutions`} />

            <div style={{ paddingTop: '5rem', paddingBottom: '5rem', background: isDark ? '#030712' : '#ffffff' }}>
                <div className="container" style={{ marginBottom: '2rem' }}>
                    <p style={{ fontSize: '0.9rem', color: isDark ? '#64748b' : '#94a3b8' }}>
                        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link> ›{' '}
                        <Link href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link> ›{' '}
                        <span style={{ color: isDark ? '#e2e8f0' : '#0f172a', fontWeight: 500 }}>{service.title}</span>
                    </p>
                </div>

                {renderCustomContent()}

                {/* Common sections for all services: Features & Contact */}
                {service.features?.length > 0 && (
                    <div className="container" style={{ marginTop: '5rem', color: isDark ? '#fff' : 'inherit' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>Key Offerings</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {service.features.map(f => (
                                <div key={f.id} className="card" style={{ background: isDark ? 'rgba(15,23,42,0.5)' : '#fff', borderColor: isDark ? '#1e293b' : '#e2e8f0' }}>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: isDark ? '#f8fafc' : '#0f172a' }}>{f.title}</h4>
                                    <p style={{ fontSize: '0.9rem', color: isDark ? '#94a3b8' : '#64748b' }}>{f.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA Form */}
                <div className="container" style={{ marginTop: '5rem' }}>
                    <div style={{ background: isDark ? '#0f172a' : '#f8fafc', padding: '3rem', borderRadius: '1rem', border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`, maxWidth: '600px', margin: '0 auto' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center', color: isDark ? '#fff' : '#0f172a' }}>Request a Confidential Assessment</h3>
                        <form action="/api/contact" method="POST" onSubmit={async (e) => {
                            e.preventDefault();
                            await fetch('/api/contact', { method: 'POST', body: new FormData(e.target), headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content } });
                            alert('Request Sent.');
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input type="hidden" name="service_type" value={service.title} />
                                <input type="text" name="name" placeholder="Full Name" required className="form-input" style={{ background: isDark ? '#1e293b' : '#fff', color: isDark ? '#fff' : 'inherit', borderColor: isDark ? '#334155' : '#cbd5e1' }} />
                                <input type="email" name="email" placeholder="Email" required className="form-input" style={{ background: isDark ? '#1e293b' : '#fff', color: isDark ? '#fff' : 'inherit', borderColor: isDark ? '#334155' : '#cbd5e1' }} />
                                <textarea name="message" placeholder="Briefly describe your situation" required className="form-input" rows="4" style={{ background: isDark ? '#1e293b' : '#fff', color: isDark ? '#fff' : 'inherit', borderColor: isDark ? '#334155' : '#cbd5e1' }}></textarea>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Securely</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
