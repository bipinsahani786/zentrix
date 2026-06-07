import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';

export default function BlogIndex({ posts, categories, tags, featuredPost }) {
    return (
        <Layout>
            <Head title="Blog & Insights - Zentrix IT Solutions" />

            {/* Hero / Featured */}
            <section style={{ background: 'var(--dark)', color: '#fff', paddingTop: '8rem', paddingBottom: '4rem' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>Zentrix Insights</h1>
                        <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>Latest updates on digital forensics, cybersecurity, and data recovery.</p>
                    </div>

                    {featuredPost && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center', background: 'var(--surface)', borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div style={{ height: '100%', minHeight: '300px', background: 'linear-gradient(135deg, var(--primary-900), var(--primary-500))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '5rem', opacity: 0.3 }}>📰</span>
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <div className="badge badge-accent" style={{ marginBottom: '1rem' }}>Featured</div>
                                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', lineHeight: 1.3 }}>{featuredPost.title}</h2>
                                <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{featuredPost.excerpt}</p>
                                <Link href={`/blog/${featuredPost.slug}`} className="btn btn-primary">Read Full Article</Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Main Content */}
            <section className="section section-gray">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem', alignItems: 'start' }}>
                        {/* Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {posts.data.map((post) => (
                                <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="card" style={{ height: '100%', padding: '0', overflow: 'hidden' }}>
                                        <div style={{ height: '200px', background: `linear-gradient(135deg, var(--surface), var(--dark))`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ fontSize: '3rem', opacity: 0.3 }}>📄</span>
                                        </div>
                                        <div style={{ padding: '1.5rem' }}>
                                            {post.category && <span className="badge badge-accent" style={{ marginBottom: '0.75rem' }}>{post.category.name}</span>}
                                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', lineHeight: 1.4 }}>{post.title}</h3>
                                            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem' }}>{post.excerpt?.substring(0, 100)}...</p>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.8rem' }}>
                                                <span>{new Date(post.published_at).toLocaleDateString()}</span>
                                                <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Read →</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Sidebar */}
                        <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="card">
                                <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Categories</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {categories.map(cat => (
                                        <li key={cat.id} style={{ marginBottom: '0.5rem' }}>
                                            <Link href={`/blog?category=${cat.slug}`} style={{ color: '#475569', textDecoration: 'none', display: 'flex', justifyContent: 'space-between' }}>
                                                <span>{cat.name}</span>
                                                <span style={{ background: '#f1f5f9', padding: '0.1rem 0.5rem', borderRadius: '1rem', fontSize: '0.8rem' }}>{cat.posts_count}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
