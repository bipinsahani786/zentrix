import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Parallax from '@/Components/UI/Parallax';

/* ─── Particle Background ──────────────────────── */
function ParticleHero() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let particles = [];
        let mouse = { x: null, y: null };

        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();
        window.addEventListener('resize', resize);
        // Removed mousemove parallax based on user feedback

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.radius = Math.random() * 1.5 + 0.5;
            }
            update() {
                // Parallax effect on mouse move
                if (mouse.x !== null) {
                    const dx = mouse.x - canvas.width / 2;
                    const dy = mouse.y - canvas.height / 2;
                    this.x += this.vx - (dx * 0.0005);
                    this.y += this.vy - (dy * 0.0005);
                } else {
                    this.x += this.vx; this.y += this.vy;
                }
                
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.fill();
            }
        }

        for (let i = 0; i < 80; i++) particles.push(new Particle());

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => { p.update(); p.draw(); });
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(animate);
        }
        animate();
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
    }, []);

    return <canvas ref={canvasRef} className="particle-canvas" />;
}

/* ─── Scroll Animation Hook ────────────────────── */
function useScrollReveal() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setVisible(true);
        }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return [ref, visible];
}

/* ─── CountUp ──────────────────────────────────── */
function CountUp({ end, suffix = '', duration = 2000 }) {
    const [count, setCount] = useState(0);
    const [ref, visible] = useScrollReveal();

    useEffect(() => {
        if (!visible) return;
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [visible, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Animated Timeline ────────────────────────── */
function AnimatedTimeline({ steps }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
    
    // A cool zigzag pathway that weaves left and right of the center line
    const svgPath = "M 50 0 C 0 5, 0 10, 50 12.5 C 100 15, 100 20, 50 25 C 0 30, 0 35, 50 37.5 C 100 40, 100 45, 50 50 C 0 55, 0 60, 50 62.5 C 100 65, 100 70, 50 75 C 0 80, 0 85, 50 87.5 C 100 90, 100 95, 50 100";

    return (
        <div className="timeline-container" ref={containerRef} style={{ position: 'relative', zIndex: 10 }}>
            {/* Interactive Animated SVG Path (Desktop Only) */}
            <div className="timeline-line-container desktop-timeline-svg" style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', zIndex: 0, pointerEvents: 'none' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d={svgPath} fill="none" stroke="rgba(0, 214, 143, 0.1)" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
                    <motion.path 
                        d={svgPath} 
                        fill="none" 
                        stroke="var(--color-accent)" 
                        strokeWidth="3" 
                        strokeDasharray="4 4" 
                        vectorEffect="non-scaling-stroke"
                        style={{ pathLength, filter: 'drop-shadow(0 0 8px rgba(0,214,143,0.8))' }} 
                    />
                </svg>
            </div>

            {/* Straight Vertical Progress Line (Mobile Only) */}
            <div className="mobile-timeline-progress" style={{ position: 'absolute', top: '2rem', bottom: '2rem', left: '31px', width: '2px', background: 'rgba(0, 214, 143, 0.1)', zIndex: 0 }}>
                <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'var(--color-accent)', transformOrigin: 'top', scaleY: scrollYProgress, filter: 'drop-shadow(0 0 8px rgba(0,214,143,0.8))' }} />
            </div>

            {steps.map((item, i) => (
                <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                    <motion.div 
                        className="timeline-node"
                        initial={{ scale: 0, backgroundColor: 'var(--color-void)' }}
                        whileInView={{ scale: 1, backgroundColor: 'var(--color-accent)', boxShadow: '0 0 15px rgba(0,214,143,0.6)' }}
                        viewport={{ once: false, margin: "-50% 0px -50% 0px" }}
                        transition={{ duration: 0.4 }}
                    ></motion.div>
                    <div className="timeline-content">
                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,214,143,0.1)', color: 'var(--color-accent)', fontWeight: 700, fontFamily: 'var(--font-mono)', marginBottom: '1rem', fontSize: '0.875rem', border: '1px solid rgba(0,214,143,0.3)' }}>
                            {item.step}
                        </div>
                        <h3 className="section-h3" style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>{item.title}</h3>
                        <p className="body-md" style={{ color: 'var(--color-text-muted)', margin: 0 }}>{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ─── Section Component ────────────────────────── */
function Section({ children, bgClass = 'bg-white', className = '', id, bgContent, style }) {
    return (
        <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            id={id} 
            className={`section-md ${bgClass} ${className}`} 
            style={{ position: 'relative', ...style }}
        >
            {bgContent}
            <div className="container" style={{ position: 'relative', zIndex: 10 }}>{children}</div>
        </motion.section>
    );
}

/* ═══════════════════════════════════════════════════
   HOME PAGE (DARK CINEMATIC INTELLIGENCE VERSION)
   ═══════════════════════════════════════════════════ */
export default function Home({ services = [], testimonials = [], posts = [], caseStudy, teamMembers = [], faqs = [] }) {
    const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', service_type: '', message: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState(null);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('/api/contact', {
                method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content },
                body: JSON.stringify({ ...contactForm, source_page: 'homepage' }),
            });
        } catch (err) { console.error(err); }
        // Always show the success state for the UI demo regardless of API success
        setFormSubmitted(true);
    };

    const serviceIcons = { 'data-recovery': '💾', 'digital-forensics': '🔬', 'corporate-investigations': '🏢', 'background-verification': '👤', 'cyber-intelligence': '🌐', 'evidence-preservation': '⚖️' };

    return (
        <Layout>
            <Head title="Zentrix IT Solutions | Digital Forensics & Corporate Intelligence" />

            {/* ════ SECTION 1: Full Screen Dark Hero ════ */}
            <section className="bg-void circuit-bg hero-glow" style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '40px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <ParticleHero />
                <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '1000px' }}>
                    
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--color-accent-border)', borderRadius: '999px', padding: '0.375rem 1rem', marginBottom: '2rem', background: 'var(--color-accent-glow)', backdropFilter: 'blur(4px)' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-success)', boxShadow: '0 0 10px var(--color-success)', animation: 'pulseAccent 2s infinite' }}></div>
                        <span className="eyebrow" style={{ color: 'var(--color-accent)' }}><span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>✦</span> DIGITAL INVESTIGATION & INTELLIGENCE SERVICES</span>
                    </div>

                    <h1 className="hero-h1" style={{ marginBottom: '1.5rem' }}>
                        Digital Investigations.<br />
                        <span style={{ color: 'var(--color-accent)' }}>Legal Data Recovery.</span><br />
                        Corporate Intelligence.
                    </h1>
                    
                    <p className="body-lg" style={{ maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                        We help individuals, businesses, law firms, and organizations recover critical digital evidence, conduct lawful investigations, and protect valuable information.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                        <Link href="/contact" className="btn btn-primary btn-lg">Request Consultation <span style={{ transition: 'transform 0.2s', display: 'inline-block' }}>→</span></Link>
                        <Link href="/services" className="btn btn-ghost btn-lg" style={{ color: 'var(--color-text-primary)', borderColor: 'rgba(255,255,255,0.4)' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                            Our Services
                        </Link>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {['✓ Confidential', '✓ Legal & Ethical', '✓ Est. Bangalore'].map((badge, i) => (
                            <span key={i} className="mono" style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>{badge}</span>
                        ))}
                    </div>

                    {/* Scroll Indicator */}
                    <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', animation: 'float 2s ease-in-out infinite' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>

                    {/* Decorative Elements (Continuous Parallax) */}
                    <Parallax offset={400} style={{ position: 'absolute', top: '-10%', right: '-10%', zIndex: 0, pointerEvents: 'none' }}>
                        <div style={{ width: '600px', height: '600px', borderRadius: '50%', border: '1px solid rgba(0,200,255,0.05)' }}></div>
                    </Parallax>
                    <Parallax offset={-300} style={{ position: 'absolute', top: '15%', right: '5%', zIndex: 0, pointerEvents: 'none' }}>
                        <div style={{ width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(0,200,255,0.08)' }}></div>
                    </Parallax>
                </div>
            </section>

            {/* ════ SECTION 2: Marquee Trust Ticker ════ */}
            <div className="bg-void" style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '12px 0', overflow: 'hidden' }}>
                <div className="marquee-container" style={{ display: 'flex', overflow: 'hidden' }}>
                    <div className="marquee-content mono" style={{ display: 'flex', gap: '2rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', minWidth: 'max-content' }}>
                        {'✓ Trusted by Law Firms · ✓ Corporate Organizations · ✓ Financial Institutions · '.repeat(2)}
                        <span style={{ color: 'var(--color-accent)' }}>✓ 500+ Cases Resolved</span>
                        {' · ✓ 100% Confidential · ✓ Evidence Preservation · ✓ Bangalore\'s #1 Digital Forensics · ✓ Legal Compliance Guaranteed · '.repeat(2)}
                    </div>
                </div>
            </div>

            {/* ════ SECTION 3: Problem Statement ════ */}
            <Section bgClass="bg-white">
                <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <h2 className="section-h2" style={{ color: 'var(--color-text-dark)', marginBottom: '1rem' }}>Digital threats don't wait.<br/>Evidence degrades every second.</h2>
                    <p className="body-lg" style={{ color: 'var(--color-text-dark-2)' }}>Whatever your situation — we have the expertise to help.</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2.5rem' }}>
                    {[
                        { icon: '💾', title: 'Lost Critical Data?', desc: 'Accidental deletion, hardware failure, or corruption — we recover what others can\'t.', color: '#2563EB', bg: '#EFF6FF' },
                        { icon: '🏢', title: 'Suspected Fraud or Misconduct?', desc: 'Internal threats, employee fraud, or corporate espionage — we investigate discreetly.', color: '#D97706', bg: '#FEF3C7' },
                        { icon: '⚖️', title: 'Need Legal Digital Evidence?', desc: 'Court-admissible forensic reports with full chain-of-custody documentation.', color: '#059669', bg: '#D1FAE5' },
                    ].map((card, i) => (
                        <div key={i} style={{ background: '#fff', border: '1px solid #F1F5F9', borderRadius: '1rem', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', transition: 'all 0.3s' }} 
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(0,200,255,0.2)'; e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.1)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#F1F5F9'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)'; }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '0.75rem', background: card.bg, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>{card.icon}</div>
                            <h3 className="section-h3" style={{ color: 'var(--color-text-dark)', marginBottom: '0.75rem' }}>{card.title}</h3>
                            <p className="body-md" style={{ color: 'var(--color-text-dark-2)' }}>{card.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ════ SECTION 3.5: Investigation Process ════ */}
            <Section bgClass="bg-void" className="dot-grid-bg" style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--color-border)' }} id="process">
                

                <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 10 }}>
                    <div className="eyebrow" style={{ marginBottom: '1rem' }}><span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>✦</span> METHODOLOGY</div>
                    <h2 className="section-h2" style={{ color: 'var(--color-text-primary)' }}>Our Investigation & Recovery Process</h2>
                    <p className="body-md" style={{ color: 'var(--color-text-muted)', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>A rigorous, secure workflow ensuring complete confidentiality from the first point of contact to final delivery.</p>
                </div>

                <AnimatedTimeline steps={[
                    { step: '01', title: 'Initial Consultation', desc: 'Free, secure discussion to understand the incident scope and required outcomes.' },
                    { step: '02', title: 'Strict NDA & Scoping', desc: 'Immediate execution of a Non-Disclosure Agreement and formalizing the engagement scope.' },
                    { step: '03', title: 'Secure Intake', desc: 'Safe collection of physical devices or establishing digital intelligence parameters.' },
                    { step: '04', title: 'Chain of Custody', desc: 'Rigorous documentation and securing of evidence to maintain legal admissibility.' },
                    { step: '05', title: 'Forensic Analysis', desc: 'Deploying military-grade software for extraction, data recovery, or undercover investigation.' },
                    { step: '06', title: 'Data Validation', desc: 'Verifying the integrity of the recovered files or intelligence findings.' },
                    { step: '07', title: 'Report Generation', desc: 'Compiling comprehensive, court-admissible documentation and forensic logs.' },
                    { step: '08', title: 'Secure Handoff', desc: 'Delivering encrypted results, returning physical devices, and providing strategic counsel.' }
                ]} />
            </Section>

            {/* ════ SECTION 4: Services Grid ════ */}
            <Section bgClass="bg-light">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="eyebrow" style={{ marginBottom: '1rem' }}><span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>✦</span> WHAT WE DO</div>
                    <h2 className="section-h2" style={{ color: 'var(--color-text-dark)' }}>Comprehensive Digital Investigation Services</h2>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.5rem' }}>
                    {services.map((svc, i) => (
                        <Link key={svc.id} href={`/services/${svc.slug}`} style={{ textDecoration: 'none' }} className="group">
                            <div style={{ background: 'var(--color-white)', border: '1px solid #E2E8F0', borderRadius: '1rem', padding: '2rem', position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease' }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent-border)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                
                                <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: 'linear-gradient(to bottom left, rgba(0,200,255,0.05), transparent)', borderRadius: '0 1rem 0 100%' }}></div>
                                <div className="mono" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--color-text-muted)' }}>0{i+1}</div>

                                <div style={{ width: '48px', height: '48px', borderRadius: '0.75rem', background: 'rgba(0,200,255,0.05)', border: '1px solid rgba(0,200,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'var(--color-accent)', marginBottom: '1.5rem' }}>
                                    {serviceIcons[svc.slug] || '⚡'}
                                </div>
                                
                                <h3 className="section-h3" style={{ color: 'var(--color-text-dark)', marginBottom: '0.75rem', transition: 'color 0.2s' }}>{svc.title}</h3>
                                <p className="body-sm" style={{ color: 'var(--color-text-dark-2)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{svc.short_description}</p>
                                
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.2s' }}>
                                    Learn More <span style={{ transition: 'transform 0.2s' }}>→</span>
                                </div>
                                
                                {/* Bottom animated line */}
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)', transform: 'scaleX(0)', transformOrigin: 'center', transition: 'transform 0.4s ease' }} className="group-hover:scale-x-100"></div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Section>

            {/* ════ SECTION 5: Stats Counter ════ */}
            <section className="bg-void dot-grid-bg divider-diagonal" style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
                        {[
                            { num: 500, suffix: '+', label: 'Cases Resolved' },
                            { num: 98, suffix: '%', label: 'Recovery Success Rate' },
                            { num: 10, suffix: '+', label: 'Years of Experience' },
                            { num: 100, suffix: '%', label: 'Client Confidentiality' },
                        ].map((stat, i) => (
                            <div key={i} style={{ padding: '3rem 2rem', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--color-border)' : 'none', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '150px', height: '150px', background: 'radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 800, color: 'var(--color-accent)', textShadow: '0 0 40px rgba(0,200,255,0.3)', lineHeight: 1 }}>
                                    <CountUp end={stat.num} suffix={stat.suffix} />
                                </div>
                                <div className="mono" style={{ color: 'var(--color-text-muted)', marginTop: '1rem' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════ SECTION 5.5: Private Detective & Investigation Services ════ */}
            <Section bgClass="bg-white">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="md:grid-cols-1">
                    <div>
                        <div className="eyebrow" style={{ marginBottom: '1rem' }}><span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>✦</span> PRIVATE DETECTIVE SERVICES</div>
                        <h2 className="section-h2" style={{ color: 'var(--color-text-dark)' }}>Personal & Corporate Investigations</h2>
                        <p className="body-md" style={{ color: 'var(--color-text-dark-2)', marginTop: '1rem', marginBottom: '2rem' }}>
                            Beyond digital forensics, we provide discreet on-the-ground intelligence and private investigation services. Our operatives are trained to handle sensitive matters with absolute secrecy.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            {[
                                { title: 'Infidelity Investigations' },
                                { title: 'Pre-Matrimonial Checks' },
                                { title: 'Missing Persons' },
                                { title: 'Corporate Espionage' },
                                { title: 'Asset Tracing' },
                                { title: 'Covert Surveillance' },
                            ].map((service, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ color: 'var(--color-accent)' }}>✓</div>
                                    <span className="body-sm" style={{ fontWeight: 500, color: 'var(--color-text-dark)' }}>{service.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <img src="/assets/images/hero_detective.png" alt="Private Investigator" style={{ width: '100%', borderRadius: '1.25rem', boxShadow: 'var(--shadow-card)' }} />
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.1)', background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)', pointerEvents: 'none' }}></div>
                    </div>
                </div>
            </Section>

            {/* ════ SECTION 6: Why Choose Zentrix ════ */}
            <Section bgClass="bg-light">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="eyebrow" style={{ marginBottom: '1rem' }}><span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>✦</span> WHY CHOOSE US</div>
                    <h2 className="section-h2" style={{ color: 'var(--color-text-dark)' }}>Trust Built on Results and Secrecy</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem' }}>
                    {[
                        { icon: '🛡️', title: 'Confidentiality First', desc: 'Every case handled under strict NDA. Zero information shared with any third party.' },
                        { icon: '⚖️', title: '100% Legal & Ethical', desc: 'All services comply with Indian IT Act, IPC, and applicable evidentiary laws.' },
                        { icon: '🖥️', title: 'Forensic-Grade Technology', desc: 'Industry-leading tools: FTK, Cellebrite, EnCase, Maltego to ensure accuracy.' },
                        { icon: '⏱️', title: 'Timely Reporting', desc: 'Clear structured reports delivered within agreed timelines without compromise.' },
                    ].map((pillar, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0,200,255,0.05)', border: '1px solid var(--color-accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>{pillar.icon}</div>
                            <h3 className="section-h3" style={{ color: 'var(--color-text-dark)', fontSize: '1.25rem' }}>{pillar.title}</h3>
                            <p className="body-md" style={{ color: 'var(--color-text-dark-2)' }}>{pillar.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ════ SECTION 7: How It Works ════ */}
            <Section bgClass="bg-light" style={{ padding: '8rem 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <div className="eyebrow" style={{ marginBottom: '1rem' }}><span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>✦</span> OUR PROCESS</div>
                    <h2 className="section-h2" style={{ color: 'var(--color-text-dark)' }}>Simple. Confidential. Effective.</h2>
                </div>
                
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
                    {/* Connecting Line (Desktop) */}
                    <div style={{ position: 'absolute', top: '32px', left: '10%', right: '10%', height: '1px', background: 'var(--color-border)', zIndex: 0 }} className="hidden md:block"></div>
                    
                    {[
                        { num: '01', title: 'Confidential Consultation', desc: 'Share your situation securely. We listen without judgment and propose an action plan.' },
                        { num: '02', title: 'Investigation & Recovery', desc: 'Our experts execute the plan using forensic methodologies and advanced analytical tools.' },
                        { num: '03', title: 'Detailed Reporting', desc: 'You receive a clear, structured, court-ready report with actionable findings.' },
                    ].map((step, i) => (
                        <div key={i} style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 10 }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-white)', border: '2px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', transition: 'all 0.3s' }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.background = 'rgba(0,200,255,0.05)'; }}>
                                <span className="mono" style={{ fontSize: '1rem' }}>{step.num}</span>
                            </div>
                            <h3 className="section-h3" style={{ color: 'var(--color-text-dark)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{step.title}</h3>
                            <p className="body-md" style={{ color: 'var(--color-text-dark-2)' }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ════ SECTION 8: Industries ════ */}
            <Section bgClass="bg-dark dot-grid-bg">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="eyebrow" style={{ marginBottom: '1rem' }}><span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>✦</span> WHO WE SERVE</div>
                    <h2 className="section-h2" style={{ color: 'var(--color-text-primary)' }}>Serving Clients Across Every Sector</h2>
                    <p className="body-md" style={{ color: 'var(--color-text-muted)', marginTop: '1rem' }}>Tailored solutions for every client's unique requirements.</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
                    {[
                        { icon: '⚖️', label: 'Law Firms' },
                        { icon: '🏢', label: 'Corporate Organizations' },
                        { icon: '🏦', label: 'Financial Institutions' },
                        { icon: '🚀', label: 'Startups & Tech' },
                        { icon: '🛡️', label: 'Insurance Companies' },
                        { icon: '👤', label: 'Private Individuals' },
                        { icon: '🎓', label: 'Educational Institutions' },
                        { icon: '🏥', label: 'Healthcare Sector' },
                    ].map((ind, i) => (
                        <div key={i} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s', cursor: 'default' }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent-border)'; e.currentTarget.style.background = 'var(--color-elevated)'; }}>
                            <span style={{ fontSize: '1.5rem' }}>{ind.icon}</span>
                            <span className="body-md" style={{ fontWeight: 500, color: 'var(--color-text-secondary)' }}>{ind.label}</span>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ════ SECTION 8.5: Elite Operatives (Characters) ════ */}
            <Section bgClass="bg-white">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="eyebrow" style={{ marginBottom: '1rem' }}><span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>✦</span> THE INTELLIGENCE TEAM</div>
                    <h2 className="section-h2" style={{ color: 'var(--color-text-dark)' }}>Meet Our Elite Operatives</h2>
                    <p className="body-md" style={{ color: 'var(--color-text-dark-2)', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
                        Our agency is powered by highly trained former law enforcement officers, certified ethical hackers, and intelligence analysts.
                    </p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ background: 'var(--color-void)', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
                        <div style={{ height: '300px', position: 'relative' }}>
                            <img src="/assets/images/team_lead.png" alt="Lead Detective" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-void), transparent)' }}></div>
                        </div>
                        <div style={{ padding: '2rem', textAlign: 'center', position: 'relative', top: '-40px', marginBottom: '-40px' }}>
                            <h3 className="section-h3" style={{ color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>Vikram Singh</h3>
                            <p className="mono" style={{ color: 'var(--color-accent)', fontSize: '0.8rem' }}>LEAD INVESTIGATOR</p>
                        </div>
                    </div>
                    
                    <div style={{ background: 'var(--color-void)', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
                        <div style={{ height: '300px', position: 'relative' }}>
                            <img src="/assets/images/team_analyst.png" alt="Cyber Analyst" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-void), transparent)' }}></div>
                        </div>
                        <div style={{ padding: '2rem', textAlign: 'center', position: 'relative', top: '-40px', marginBottom: '-40px' }}>
                            <h3 className="section-h3" style={{ color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>Ananya Rao</h3>
                            <p className="mono" style={{ color: 'var(--color-accent)', fontSize: '0.8rem' }}>CYBER INTELLIGENCE HEAD</p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ════ SECTION 9: Featured Case Study ════ */}
            {caseStudy && (
                <Section bgClass="bg-void">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <div className="eyebrow" style={{ marginBottom: '1rem' }}><span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>✦</span> CONFIDENTIAL CASE FILE</div>
                            <h2 className="section-h2" style={{ color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>We've solved what others couldn't.</h2>
                            <p className="body-lg" style={{ marginBottom: '2rem' }}>Every case we handle is treated with complete confidentiality. Our track record speaks through results, not names or exposed details.</p>
                            <Link href="/case-studies" className="btn btn-ghost">View Case Studies</Link>
                        </div>
                        
                        <div className="card-cinematic">
                            <div style={{ height: '4px', background: 'var(--background-image-gradient-main)', position: 'absolute', top: 0, left: 0, right: 0 }}></div>
                            
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                <span className="mono" style={{ background: 'rgba(0,200,255,0.1)', border: '1px solid rgba(0,200,255,0.2)', borderRadius: '999px', padding: '0.35rem 1rem', fontSize: '0.75rem' }}>{caseStudy.industry}</span>
                            </div>
                            
                            <div className="mono" style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '1rem' }}>CASE #ZIT-2024-047</div>
                            
                            <div style={{ borderLeft: '2px solid var(--color-accent)', paddingLeft: '1.25rem', marginBottom: '2.5rem' }}>
                                <p className="body-md" style={{ color: 'var(--color-text-primary)', lineHeight: 1.7, fontSize: '1.05rem' }}>{caseStudy.challenge}</p>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                <span className="mono" style={{ background: 'rgba(0,214,143,0.15)', border: '1px solid rgba(0,214,143,0.3)', color: 'var(--color-success)', borderRadius: '999px', padding: '0.35rem 1rem', fontSize: '0.75rem' }}>✓ Culprit Identified</span>
                                <span className="mono" style={{ background: 'rgba(0,214,143,0.15)', border: '1px solid rgba(0,214,143,0.3)', color: 'var(--color-success)', borderRadius: '999px', padding: '0.35rem 1rem', fontSize: '0.75rem' }}>✓ Evidence Court-Admissible</span>
                            </div>
                        </div>
                    </div>
                </Section>
            )}

            {/* ════ SECTION 10: Testimonials ════ */}
            {testimonials.length > 0 && (
                <Section bgClass="bg-void" className="circuit-bg">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div className="eyebrow" style={{ marginBottom: '1rem' }}><span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>✦</span> CLIENT EXPERIENCES</div>
                        <h2 className="section-h2" style={{ color: 'var(--color-text-primary)' }}>What Our Clients Say</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2rem' }}>
                        {testimonials.slice(0, 3).map((t, i) => (
                            <div key={t.id} className="card-cinematic" style={{ padding: '2.5rem', position: 'relative' }}>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: '6rem', fontWeight: 800, color: 'rgba(0,200,255,0.05)', position: 'absolute', top: '0.5rem', left: '1.5rem', lineHeight: 1 }}>"</div>
                                <p className="body-md" style={{ color: 'var(--color-text-primary)', fontStyle: 'italic', marginBottom: '1.5rem', position: 'relative', zIndex: 10 }}>"{t.content}"</p>
                                <div style={{ color: 'var(--color-gold)', fontSize: '1.25rem', marginBottom: '1.5rem' }}>{'★'.repeat(t.rating)}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--color-accent-border)', flexShrink: 0, background: 'var(--color-surface)' }}>
                                        <img src={`/assets/images/avatar${i + 1}.png`} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + t.name; }} />
                                    </div>
                                    <div>
                                        <p className="section-h3" style={{ fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '0.1rem' }}>{t.name}</p>
                                        <p className="mono" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t.designation}{t.company ? ` @ ${t.company}` : ''}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {/* ════ SECTION 11: Tools & Technology ════ */}
            <Section bgClass="bg-void" className="dot-grid-bg" bgContent={
                <>
                    <Parallax offset={250} style={{ position: 'absolute', top: '-40%', left: '-5%', right: '-5%', bottom: '-40%', zIndex: 0, pointerEvents: 'none' }}>
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/images/data_servers.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3, mixBlendMode: 'screen' }}></div>
                    </Parallax>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-void), transparent)', zIndex: 1 }}></div>
                </>
            }>
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div className="eyebrow" style={{ marginBottom: '1rem' }}><span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>✦</span> TECHNOLOGY INFRASTRUCTURE</div>
                        <h2 className="section-h2" style={{ color: 'var(--color-text-primary)' }}>Forensic-Grade Tools We Trust</h2>
                        <p className="body-md" style={{ color: 'var(--color-text-muted)', marginTop: '1rem' }}>Every tool used maintains evidence integrity for strict legal admissibility.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                        {['FTK Imager', 'Cellebrite UFED', 'EnCase', 'Autopsy', 'Maltego', 'Wireshark', 'X-Ways', 'Oxygen Forensic'].map((tool) => (
                            <div key={tool} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '1.5rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', transition: 'all 0.3s', backdropFilter: 'blur(4px)', cursor: 'default' }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,200,255,0.1)'; e.currentTarget.style.borderColor = 'var(--color-accent)'; }}>
                                <span className="mono" style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{tool}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* ════ SECTION 12: Blog Preview ════ */}
            {posts.length > 0 && (
                <Section bgClass="bg-light">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div className="eyebrow" style={{ marginBottom: '1rem' }}><span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>✦</span> KNOWLEDGE HUB</div>
                        <h2 className="section-h2" style={{ color: 'var(--color-text-dark)' }}>Latest from Zentrix Insights</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
                        {posts.map((post, index) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }} className="group">
                                <div style={{ background: 'var(--color-white)', borderRadius: '1rem', overflow: 'hidden', border: '1px solid #E2E8F0', transition: 'all 0.3s' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                    
                                    <div style={{ height: '200px', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                        <img src={`/assets/images/blog${(index % 2) + 1}.png`} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                                    </div>
                                    <div style={{ padding: '2rem' }}>
                                        {post.category && <span className="mono" style={{ fontSize: '0.7rem', background: 'rgba(0,200,255,0.1)', color: 'var(--color-accent)', padding: '0.25rem 0.5rem', borderRadius: '4px', marginBottom: '1rem', display: 'inline-block' }}>{post.category.name}</span>}
                                        <h3 className="section-h3" style={{ color: 'var(--color-text-dark)', marginBottom: '1rem', lineHeight: 1.4 }}>{post.title}</h3>
                                        <p className="body-md" style={{ color: 'var(--color-text-dark-2)', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                                        <span style={{ color: 'var(--color-accent)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Read Article <span>→</span></span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Section>
            )}

            {/* ════ SECTION 13: FAQ Accordion ════ */}
            <Section bgClass="bg-void" className="dot-grid-bg">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="eyebrow" style={{ marginBottom: '1rem' }}><span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>✦</span> CLARIFICATION</div>
                    <h2 className="section-h2" style={{ color: 'var(--color-text-primary)' }}>Frequently Asked Questions</h2>
                </div>
                <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, i) => {
                        const isOpen = activeAccordion === i;
                        return (
                            <div key={i} className="card-cinematic" style={{ 
                                padding: '1.5rem 2rem', 
                                border: isOpen ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                                transition: 'border-color 0.3s ease',
                                overflow: 'hidden'
                            }}>
                                <button onClick={() => setActiveAccordion(isOpen ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'none', textAlign: 'left', padding: 0 }}>
                                    <span className="section-h3" style={{ color: isOpen ? 'var(--color-accent)' : 'var(--color-text-primary)', fontSize: '1.125rem', transition: 'color 0.3s' }}>{faq.question}</span>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 45 : 0, color: isOpen ? 'var(--color-accent)' : 'var(--color-text-muted)' }}
                                        transition={{ duration: 0.3 }}
                                        style={{ fontSize: '1.5rem', fontWeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}
                                    >
                                        +
                                    </motion.div>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        >
                                            <p className="body-md" style={{ color: 'var(--color-text-muted)', paddingTop: '1.5rem', margin: 0 }}>{faq.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </Section>

            {/* ════ SECTION 14: Urgency CTA Banner ════ */}
            <section style={{ background: 'var(--background-image-gradient-main)', padding: '5rem 0', textAlign: 'center', position: 'relative' }}>
                <div className="container">
                    <h2 className="page-h1" style={{ color: 'var(--color-void)', marginBottom: '1rem' }}>Digital evidence has a strict time window.</h2>
                    <p className="body-lg" style={{ color: 'rgba(4,7,15,0.8)', marginBottom: '2.5rem', fontWeight: 500 }}>The longer you wait, the less we can recover. Contact us immediately.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="tel:+918012345678" className="btn btn-lg" style={{ background: 'var(--color-void)', color: 'var(--color-text-primary)' }}>📞 Call Now</a>
                        <a href="https://wa.me/919876543210" target="_blank" className="btn btn-lg" style={{ border: '2px solid var(--color-void)', color: 'var(--color-void)', background: 'transparent' }}>WhatsApp Us</a>
                    </div>
                </div>
            </section>

            {/* ════ SECTION 15: Confidentiality Pledge ════ */}
            <Section bgClass="bg-void" className="dot-grid-bg" style={{ padding: '8rem 0', overflow: 'hidden' }} bgContent={
                <>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--color-void), transparent)', zIndex: 1 }}></div>
                    
                    {/* Lock Background Element */}
                    <div style={{ position: 'absolute', top: '-10%', right: '-5%', bottom: '-10%', width: '50%', zIndex: 0, opacity: 0.15, pointerEvents: 'none' }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--color-void), transparent)', zIndex: 1 }}></div>
                        <img src="/assets/images/cyber_lock.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 40px var(--color-accent))' }} />
                    </div>
                </>
            }>
                <div style={{ position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <div className="eyebrow" style={{ marginBottom: '1rem' }}><span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>✦</span> MILITARY-GRADE SECRECY</div>
                        <h2 className="section-h2" style={{ color: 'var(--color-text-primary)', marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>Your Privacy Is Our<br/>Highest Priority</h2>
                        <p className="body-lg" style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', maxWidth: '500px' }}>Every investigation is sealed with strict protocols. We operate entirely off the radar to ensure your identity and data remain permanently protected.</p>
                        <p className="mono" style={{ color: 'var(--color-accent)', fontSize: '0.9rem', letterSpacing: '0.05em', borderLeft: '2px solid var(--color-accent)', paddingLeft: '1.25rem', margin: 0 }}>"We take confidentiality as seriously as you do."</p>
                    </div>
                    
                    <div className="card-cinematic" style={{ padding: '2.5rem', background: 'rgba(10, 15, 25, 0.8)', backdropFilter: 'blur(16px)', border: '1px solid rgba(0, 214, 143, 0.2)' }}>
                        {[
                            'Strict Non-Disclosure Agreement (NDA)',
                            'Identity protection from third-parties',
                            'Data permanently erased post-engagement',
                            'End-to-end encrypted communications'
                        ].map((point, i) => (
                            <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', padding: '1.5rem 0', borderBottom: i !== 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,214,143,0.1)', border: '1px solid rgba(0,214,143,0.3)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✓</div>
                                <div className="body-lg" style={{ color: 'var(--color-text-primary)', fontWeight: 500, margin: 0 }}>{point}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* ════ SECTION 16: Mini Contact Form ════ */}
            <Section bgClass="bg-void" style={{ borderTop: '1px solid var(--color-border)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '4rem', alignItems: 'start' }}>
                    <div>
                        <div className="eyebrow" style={{ marginBottom: '1rem' }}><span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>✦</span> INITIATE CONTACT</div>
                        <h2 className="section-h2" style={{ color: 'var(--color-text-primary)', marginBottom: '2rem' }}>Start a Confidential Consultation</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <span className="eyebrow" style={{ color: 'var(--color-text-muted)' }}>SECURE LINE</span>
                                <p className="body-lg" style={{ color: 'var(--color-text-primary)', fontWeight: 500, marginTop: '0.25rem' }}>+91 80 1234 5678</p>
                            </div>
                            <div>
                                <span className="eyebrow" style={{ color: 'var(--color-text-muted)' }}>ENCRYPTED EMAIL</span>
                                <p className="body-lg" style={{ color: 'var(--color-text-primary)', fontWeight: 500, marginTop: '0.25rem' }}>info@zentrixit.com</p>
                            </div>
                            <div>
                                <span className="eyebrow" style={{ color: 'var(--color-text-muted)' }}>HOURS OF OPERATION</span>
                                <p className="body-lg" style={{ color: 'var(--color-text-primary)', fontWeight: 500, marginTop: '0.25rem' }}>Mon–Sat: 9AM–7PM IST</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-cinematic" style={{ padding: '3rem', borderRadius: '1.25rem' }}>
                        {formSubmitted ? (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <div style={{ fontSize: '4rem', color: 'var(--color-success)', marginBottom: '1rem' }}>✓</div>
                                <h3 className="section-h3" style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Inquiry Secured</h3>
                                <p className="body-md" style={{ color: 'var(--color-text-muted)' }}>Your request has been encrypted and transmitted. An analyst will contact you within 2 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label className="form-label" style={{ color: 'var(--color-text-primary)' }}>Full Name / Organization</label>
                                    <input type="text" required className="form-input-cinematic" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
                                    <div>
                                        <label className="form-label" style={{ color: 'var(--color-text-primary)' }}>Phone Number</label>
                                        <input type="tel" className="form-input-cinematic" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="form-label" style={{ color: 'var(--color-text-primary)' }}>Email Address</label>
                                        <input type="email" required className="form-input-cinematic" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label" style={{ color: 'var(--color-text-primary)' }}>Service Required</label>
                                    <select className="form-input-cinematic" value={contactForm.service_type} onChange={(e) => setContactForm({ ...contactForm, service_type: e.target.value })}>
                                        <option value="">Select a service area</option>
                                        <option>Data Recovery</option>
                                        <option>Digital Forensics</option>
                                        <option>Corporate Investigations</option>
                                        <option>Cyber Intelligence</option>
                                        <option>Other / Not Sure</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="form-label" style={{ color: 'var(--color-text-primary)' }}>Brief Description (Do not include sensitive passwords)</label>
                                    <textarea rows={3} className="form-input-cinematic" style={{ resize: 'vertical' }} value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Transmit Secure Inquiry</button>
                            </form>
                        )}
                    </div>
                </div>
            </Section>

            {/* ════ SECTION 17: Map & Location ════ */}
            <Section bgClass="bg-white">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '3rem', alignItems: 'center' }}>
                    <div>
                        <div className="eyebrow" style={{ marginBottom: '1rem' }}><span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>✦</span> HEADQUARTERS</div>
                        <h3 className="section-h3" style={{ color: 'var(--color-text-dark)', marginBottom: '1rem', fontSize: '1.75rem' }}>Zentrix Secure Lab</h3>
                        <p className="body-md" style={{ color: 'var(--color-text-dark-2)', marginBottom: '1.5rem' }}>Our state-of-the-art forensic facility is located in the heart of India's tech capital. All visits are strictly by appointment only to ensure absolute security and confidentiality.</p>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--color-text-dark)', fontWeight: 500 }}>
                            <span style={{ fontSize: '1.5rem' }}>📍</span> Bangalore, Karnataka, India
                        </div>
                    </div>
                    <div style={{ borderRadius: '1rem', overflow: 'hidden', height: '400px', background: 'var(--color-light)', border: '1px solid #E2E8F0' }}>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.49085452925042!3d12.954517009617921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
                    </div>
                </div>
            </Section>

            {/* ════ SECTION 18: Final CTA ════ */}
            <section style={{ background: 'var(--background-image-gradient-dark)', padding: '8rem 0', textAlign: 'center', borderTop: '1px solid var(--color-border)' }}>
                <div className="container">
                    <h2 className="page-h1" style={{ color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>Ready to uncover the truth?</h2>
                    <p className="body-lg" style={{ marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>Engage our experts for a confidential consultation today. Secure your evidence before it's gone.</p>
                    <Link href="/contact" className="btn btn-primary btn-lg">Book Your Consultation <span style={{ marginLeft: '0.5rem' }}>→</span></Link>
                </div>
            </section>
        </Layout>
    );
}
