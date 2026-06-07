import { useState } from 'react';

export default function DataRecovery({ service }) {
    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                <div>
                    <div className="badge badge-accent" style={{ marginBottom: '1rem', background: '#fef2f2', color: '#ef4444', border: '1px solid #fca5a5' }}>
                        🛡️ NO DATA, NO FEE GUARANTEE
                    </div>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>Advanced Data Recovery Lab</h2>
                    <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                        {service.long_description || service.short_description}
                    </p>
                    <a href="/contact" className="btn btn-primary">Start Evaluation Process</a>
                </div>
                
                <div className="card" style={{ background: '#f8fafc' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Our Recovery Success Rates</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                            { label: 'Hard Disk Drives (HDD)', rate: 92 },
                            { label: 'Solid State Drives (SSD)', rate: 85 },
                            { label: 'Mobile Devices (iOS/Android)', rate: 88 },
                            { label: 'USB / Flash Media', rate: 78 }
                        ].map(stat => (
                            <div key={stat.label}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600 }}>
                                    <span>{stat.label}</span>
                                    <span style={{ color: 'var(--accent)' }}>{stat.rate}%</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${stat.rate}%`, height: '100%', background: 'var(--accent)', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
