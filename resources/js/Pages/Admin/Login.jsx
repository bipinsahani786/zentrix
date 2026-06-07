import { Head, useForm } from '@inertiajs/react';

export default function Login({ errors = {} }) {
    const { data, setData, post, processing } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', fontFamily: "'DM Sans', sans-serif" }}>
            <Head title="Admin Login - Zentrix IT Solutions" />

            <div style={{ background: '#1e293b', padding: '3rem', borderRadius: '1rem', width: '100%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ width: 48, height: 48, background: 'var(--accent)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', fontWeight: 'bold', fontSize: '1.5rem', margin: '0 auto 1rem' }}>Z</div>
                    <h1 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 600 }}>Zentrix Admin</h1>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Sign in to manage your site</p>
                </div>

                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email Address</label>
                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} required
                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #334155', background: '#0f172a', color: '#fff', fontSize: '1rem' }} />
                        {errors?.email && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.email}</div>}
                    </div>

                    <div>
                        <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
                        <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} required
                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #334155', background: '#0f172a', color: '#fff', fontSize: '1rem' }} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="checkbox" id="remember" checked={data.remember} onChange={e => setData('remember', e.target.checked)} />
                        <label htmlFor="remember" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Remember me</label>
                    </div>

                    <button type="submit" disabled={processing} style={{ width: '100%', padding: '0.75rem', background: 'var(--accent)', color: '#0f172a', border: 'none', borderRadius: '0.5rem', fontWeight: 600, fontSize: '1rem', cursor: processing ? 'not-allowed' : 'pointer' }}>
                        {processing ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
