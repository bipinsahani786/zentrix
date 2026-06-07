import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';

export default function Contact({ services = [], settings = {}, googleMaps }) {
    return (
        <Layout>
            <Head title="Contact Us - Zentrix IT Solutions" />

            <section style={{ minHeight: '50vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', paddingTop: '6rem' }}>
                <div className="container" style={{ color: '#fff', textAlign: 'center' }}>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>Contact Zentrix</h1>
                    <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
                        Strict confidentiality guaranteed. We are ready to assist you with data recovery and digital investigations.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
                        {/* Contact Info */}
                        <div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Get In Touch</h2>
                            <p style={{ color: '#475569', marginBottom: '2rem', lineHeight: 1.6 }}>
                                Whether you've lost critical data or suspect corporate fraud, time is of the essence. Reach out to us immediately.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ fontSize: '1.5rem' }}>📍</div>
                                    <div>
                                        <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Our Office</h4>
                                        <p style={{ color: '#475569', fontSize: '0.95rem' }}>{settings.address || 'Bangalore, Karnataka, India'}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ fontSize: '1.5rem' }}>📞</div>
                                    <div>
                                        <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Phone & WhatsApp</h4>
                                        <p style={{ color: '#475569', fontSize: '0.95rem' }}>{settings.phone || '+91 80 1234 5678'}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ fontSize: '1.5rem' }}>✉️</div>
                                    <div>
                                        <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Email</h4>
                                        <p style={{ color: '#475569', fontSize: '0.95rem' }}>{settings.site_email || 'info@zentrixit.com'}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ fontSize: '1.5rem' }}>🕐</div>
                                    <div>
                                        <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Business Hours</h4>
                                        <p style={{ color: '#475569', fontSize: '0.95rem' }}>{settings.business_hours || 'Mon–Sat: 9AM–7PM'}</p>
                                        <p style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Emergency cases handled 24/7</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="card">
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Send a Confidential Message</h3>
                            <form action="/api/contact" method="POST" onSubmit={async (e) => {
                                e.preventDefault();
                                const form = e.target;
                                const formData = new FormData(form);
                                const data = Object.fromEntries(formData.entries());
                                try {
                                    const res = await fetch('/api/contact', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content },
                                        body: JSON.stringify(data),
                                    });
                                    if(res.ok) {
                                        alert('Message sent successfully. We will contact you shortly.');
                                        form.reset();
                                    }
                                } catch(err) {}
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <input type="text" name="name" placeholder="Full Name" required className="form-input" />
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <input type="email" name="email" placeholder="Email Address" required className="form-input" />
                                        <input type="tel" name="phone" placeholder="Phone Number" className="form-input" />
                                    </div>
                                    <select name="service_type" className="form-input">
                                        <option value="">Select Service Needed (Optional)</option>
                                        {services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                                    </select>
                                    <select name="urgency" className="form-input" required>
                                        <option value="normal">Standard Priority</option>
                                        <option value="urgent">Urgent</option>
                                        <option value="emergency">Emergency (Critical)</option>
                                    </select>
                                    <textarea name="message" placeholder="Briefly describe your situation..." rows="5" required className="form-input"></textarea>
                                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>Submit Securely</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {googleMaps && (
                <section style={{ height: '400px', background: '#e2e8f0' }}>
                    <div dangerouslySetInnerHTML={{ __html: googleMaps.replace('width="600"', 'width="100%"').replace('height="450"', 'height="100%"') }} style={{ width: '100%', height: '100%' }} />
                </section>
            )}
        </Layout>
    );
}
