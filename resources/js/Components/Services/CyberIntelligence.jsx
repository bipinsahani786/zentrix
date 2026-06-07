import { useEffect } from 'react';

export default function CyberIntelligence({ service }) {
    useEffect(() => {
        // Force dark background on body for this specific page
        document.body.style.backgroundColor = '#030712';
        document.body.style.color = '#f8fafc';
        return () => {
            document.body.style.backgroundColor = '#ffffff';
            document.body.style.color = '#334155';
        };
    }, []);

    return (
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh' }}>
            <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '4rem' }}>
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <div className="badge" style={{ background: 'rgba(2, 132, 199, 0.2)', color: '#38bdf8', border: '1px solid #0284c7', marginBottom: '1rem' }}>Threat Intelligence Framework</div>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1rem', color: '#fff' }}>Cyber Intelligence & Dark Web Monitoring</h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.15rem', lineHeight: 1.7 }}>
                        {service.short_description}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {[
                        { title: 'Dark Web Scanning', desc: 'Continuous monitoring of illicit forums for leaked corporate credentials.' },
                        { title: 'OSINT Investigations', desc: 'Open Source Intelligence gathering to map out external attack surfaces.' },
                        { title: 'Threat Actor Profiling', desc: 'Identifying and tracking specific adversaries targeting your organization.' }
                    ].map(feature => (
                        <div key={feature.title} style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '2rem', borderRadius: '1rem', backdropFilter: 'blur(10px)' }}>
                            <h3 style={{ color: '#38bdf8', fontSize: '1.2rem', marginBottom: '1rem' }}>{feature.title}</h3>
                            <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* SVG Network Background */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, opacity: 0.15, pointerEvents: 'none' }}>
                <defs>
                    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                    </radialGradient>
                </defs>
                <circle cx="20%" cy="30%" r="200" fill="url(#glow)" />
                <circle cx="80%" cy="70%" r="300" fill="url(#glow)" />
                <g stroke="#0284c7" strokeWidth="1" opacity="0.5">
                    <line x1="20%" y1="30%" x2="50%" y2="50%" />
                    <line x1="50%" y1="50%" x2="80%" y2="70%" />
                    <line x1="80%" y1="70%" x2="70%" y2="20%" />
                    <line x1="70%" y1="20%" x2="20%" y2="30%" />
                    <line x1="50%" y1="50%" x2="70%" y2="20%" />
                </g>
            </svg>
        </div>
    );
}
