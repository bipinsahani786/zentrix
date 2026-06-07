import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';

export default function BlogShow({ post, relatedPosts = [] }) {
    return (
        <Layout>
            <Head title={post.meta_title || post.title} />

            <section style={{ minHeight: '40vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', paddingTop: '6rem', paddingBottom: '3rem' }}>
                <div className="container" style={{ color: '#fff', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                        <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link> ›{' '}
                        <Link href="/blog" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Blog</Link> › {post.title}
                    </p>
                    {post.category && <div className="badge badge-accent" style={{ marginBottom: '1rem' }}>{post.category.name}</div>}
                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem', lineHeight: 1.2 }}>{post.title}</h1>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', color: 'var(--muted)', fontSize: '0.9rem' }}>
                        <span>📅 {new Date(post.published_at).toLocaleDateString()}</span>
                        {post.author && <span>✍️ {post.author.name}</span>}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <article style={{ lineHeight: 1.8, fontSize: '1.1rem', color: '#334155' }}>
                        {/* We use dangerouslySetInnerHTML to render the rich text content from CMS */}
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </article>

                    {post.tags && post.tags.length > 0 && (
                        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <strong style={{ marginRight: '0.5rem' }}>Tags:</strong>
                            {post.tags.map(tag => (
                                <span key={tag.id} className="badge" style={{ background: '#f1f5f9', color: '#475569' }}>#{tag.name}</span>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {relatedPosts.length > 0 && (
                <section className="section section-gray">
                    <div className="container">
                        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Related Articles</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {relatedPosts.map(rp => (
                                <Link key={rp.id} href={`/blog/${rp.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="card" style={{ height: '100%', padding: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', lineHeight: 1.4 }}>{rp.title}</h3>
                                        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>{rp.excerpt?.substring(0, 80)}...</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </Layout>
    );
}
