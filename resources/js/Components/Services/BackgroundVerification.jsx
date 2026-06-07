import { useState } from 'react';

export default function BackgroundVerification({ service }) {
    const [checkedItems, setCheckedItems] = useState({});

    const checks = [
        'Criminal Record Verification (National/State)',
        'Education Credential Verification',
        'Past Employment & Reference Checks',
        'Financial & Credit History',
        'Social Media & Public Footprint Analysis',
        'Address & Identity Verification'
    ];

    const toggleCheck = (idx) => {
        setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>Comprehensive Background Verification</h2>
                    <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                        {service.short_description} Build your custom verification package below to see what we can uncover.
                    </p>
                    
                    <div className="card" style={{ background: '#f8fafc', padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Interactive Verification Checklist</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {checks.map((check, i) => (
                                <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '0.5rem', background: checkedItems[i] ? '#e0f2fe' : '#fff', borderRadius: '0.5rem', border: '1px solid #e2e8f0', transition: 'all 0.2s' }}>
                                    <input type="checkbox" checked={!!checkedItems[i]} onChange={() => toggleCheck(i)} style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent)' }} />
                                    <span style={{ fontWeight: checkedItems[i] ? 600 : 400, color: '#334155' }}>{check}</span>
                                </label>
                            ))}
                        </div>
                        <a href="/contact" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>Request Quote for {Object.values(checkedItems).filter(Boolean).length} Checks</a>
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ height: '40px', borderBottom: '1px solid #e2e8f0', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }}></div>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }}></div>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }}></div>
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginLeft: '0.5rem' }}>Confidential_Report.pdf</span>
                        </div>
                        <div style={{ height: '400px', background: '#f1f5f9', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', inset: 0, filter: 'blur(4px)', background: 'repeating-linear-gradient(0deg, transparent, transparent 20px, #e2e8f0 20px, #e2e8f0 21px)', opacity: 0.5 }}></div>
                            <div style={{ position: 'absolute', inset: '20px', background: '#fff', padding: '1rem' }}>
                                <div style={{ height: '20px', width: '50%', background: '#cbd5e1', marginBottom: '1rem' }}></div>
                                <div style={{ height: '10px', width: '100%', background: '#e2e8f0', marginBottom: '0.5rem' }}></div>
                                <div style={{ height: '10px', width: '90%', background: '#e2e8f0', marginBottom: '2rem' }}></div>
                                <div style={{ height: '100px', width: '100%', background: '#fecaca', marginBottom: '1rem', border: '1px solid #ef4444' }}></div>
                            </div>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span className="badge" style={{ background: '#0f172a', color: '#fff', padding: '0.5rem 1rem', fontSize: '1rem' }}>SAMPLE REPORT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
