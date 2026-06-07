import AdminLayout from '@/Components/Admin/AdminLayout';

export default function SettingsIndex({ settings }) {
    return (
        <AdminLayout title="Global Settings">
            <div style={{ background: '#fff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Site Information</h3>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Site Name</label>
                        <input type="text" defaultValue={settings.site_name} className="form-input" style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '0.25rem' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Contact Email</label>
                        <input type="email" defaultValue={settings.site_email} className="form-input" style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '0.25rem' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone Number</label>
                        <input type="text" defaultValue={settings.phone} className="form-input" style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '0.25rem' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Office Address</label>
                        <textarea defaultValue={settings.address} rows="3" className="form-input" style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '0.25rem' }} />
                    </div>
                    <button type="button" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Save Settings</button>
                </form>
            </div>
        </AdminLayout>
    );
}
