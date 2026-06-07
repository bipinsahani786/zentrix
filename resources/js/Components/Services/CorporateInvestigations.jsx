export default function CorporateInvestigations({ service }) {
    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>Corporate Investigations</h2>
                <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.7 }}>
                    {service.short_description}
                </p>
            </div>

            {/* Infographic block */}
            <div style={{ background: 'var(--dark)', color: '#fff', borderRadius: '1rem', padding: '3rem', marginBottom: '4rem' }}>
                <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.5rem' }}>The Hidden Cost of Internal Fraud</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
                    <div>
                        <div style={{ fontSize: '3rem', color: 'var(--accent)', fontWeight: 800 }}>5%</div>
                        <p style={{ color: '#94a3b8' }}>Of annual corporate revenue is lost to fraud</p>
                    </div>
                    <div>
                        <div style={{ fontSize: '3rem', color: 'var(--accent)', fontWeight: 800 }}>14 Mo</div>
                        <p style={{ color: '#94a3b8' }}>Average time before a fraud scheme is detected</p>
                    </div>
                    <div>
                        <div style={{ fontSize: '3rem', color: 'var(--accent)', fontWeight: 800 }}>$1.7M</div>
                        <p style={{ color: '#94a3b8' }}>Average loss per severe insider threat incident</p>
                    </div>
                </div>
            </div>

            {/* Retainer Packages */}
            <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.75rem' }}>Corporate Retainer Packages</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {[
                    { name: 'Standard Risk Audit', desc: 'Quarterly review of executive devices and network logs.', price: 'Custom Quote' },
                    { name: 'Active Monitoring', desc: 'Monthly proactive threat hunting and employee exit audits.', price: 'Custom Quote' },
                    { name: 'Full Incident Response', desc: 'On-demand rapid response forensic team with zero SLA.', price: 'Custom Quote' }
                ].map(pkg => (
                    <div key={pkg.name} className="card" style={{ textAlign: 'center' }}>
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{pkg.name}</h4>
                        <p style={{ color: '#475569', marginBottom: '1.5rem', flex: 1 }}>{pkg.desc}</p>
                        <div style={{ fontWeight: 600, color: 'var(--accent)', marginBottom: '1.5rem' }}>{pkg.price}</div>
                        <a href="/contact" className="btn btn-outline" style={{ width: '100%' }}>Inquire Now</a>
                    </div>
                ))}
            </div>
        </div>
    );
}
