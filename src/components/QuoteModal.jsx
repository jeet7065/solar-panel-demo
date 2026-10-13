import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Sun, Phone, Mail, MapPin, Building } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose, initialData }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    projectType: 'residential',
    monthlyBill: 250,
    roofType: 'asphalt_shingle',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        monthlyBill: initialData.monthlyBill || prev.monthlyBill,
        projectType: initialData.propertyType || prev.projectType,
      }));
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate fast processing
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: 'rgba(24, 34, 28, 0.55)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={resetAndClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
          backgroundColor: '#FFFFFF',
          borderRadius: '28px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 30px 70px -15px rgba(24, 34, 28, 0.3)',
          overflow: 'hidden',
          position: 'relative',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.75rem 2.25rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, #F7F9F6 0%, #FFFFFF 100%)',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.72rem',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent-primary)',
                backgroundColor: 'rgba(23, 107, 69, 0.08)',
                padding: '0.2rem 0.65rem',
                borderRadius: '999px',
                marginBottom: '0.4rem',
              }}
            >
              <ShieldCheck size={13} />
              Zero-Obligation Engineering Consultation
            </div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-heading)' }}>
              Request Your Free Solar Quote
            </h3>
          </div>

          <button
            onClick={resetAndClose}
            aria-label="Close quote modal"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(24, 34, 28, 0.06)',
              color: 'var(--text-body)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '2rem 2.25rem', overflowY: 'auto', flexGrow: 1 }}>
          {submitted ? (
            /* Confirmation View */
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(23, 107, 69, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                }}
              >
                <CheckCircle2 size={36} color="var(--accent-primary)" />
              </div>

              <h4 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
                Quote Request Received
              </h4>

              <p style={{ fontSize: '0.98rem', color: 'var(--text-body)', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 1.75rem' }}>
                Thank you, <strong>{formData.fullName}</strong>. Our NABCEP solar engineering team has queued
                a high-resolution 3D LiDAR roof shade simulation for your property at <strong>{formData.location}</strong>.
              </p>

              <div
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  border: '1px solid var(--border-color)',
                  textAlign: 'left',
                  marginBottom: '2rem',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Consultation Summary
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-heading)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div>• <strong>Contact:</strong> {formData.email} | {formData.phone}</div>
                  <div>• <strong>Project Type:</strong> {formData.projectType.toUpperCase()}</div>
                  <div>• <strong>Current Monthly Bill:</strong> ~${formData.monthlyBill}/mo</div>
                  <div>• <strong>Turnaround:</strong> Preliminary 3D CAD schematic sent within 24 hours</div>
                </div>
              </div>

              <button
                onClick={resetAndClose}
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: '#FFFFFF',
                  padding: '0.85rem 2rem',
                  borderRadius: '999px',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                }}
              >
                Done
              </button>
            </div>
          ) : (
            /* Enquiry Form */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Name & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      backgroundColor: 'var(--bg-secondary)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      backgroundColor: 'var(--bg-secondary)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                  />
                </div>
              </div>

              {/* Email & Location */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      backgroundColor: 'var(--bg-secondary)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                    Property Address / Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="City, State / ZIP"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      backgroundColor: 'var(--bg-secondary)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                  />
                </div>
              </div>

              {/* Project Type & Monthly Bill */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      backgroundColor: 'var(--bg-secondary)',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="residential">Residential Installation</option>
                    <option value="commercial">Commercial / Industrial</option>
                    <option value="maintenance">Maintenance & Storage Retrofit</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                    Approx. Monthly Electric Bill ($)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="10000"
                    value={formData.monthlyBill}
                    onChange={(e) => setFormData({ ...formData, monthlyBill: Number(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      backgroundColor: 'var(--bg-secondary)',
                    }}
                  />
                </div>
              </div>

              {/* Roof Type Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                  Roof Material
                </label>
                <select
                  value={formData.roofType}
                  onChange={(e) => setFormData({ ...formData, roofType: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.92rem',
                    outline: 'none',
                    backgroundColor: 'var(--bg-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  <option value="asphalt_shingle">Asphalt Shingle</option>
                  <option value="metal_standing_seam">Standing-Seam Metal</option>
                  <option value="concrete_tile">Concrete / Clay Tile</option>
                  <option value="flat_commercial">Flat Membrane (TPO / EPDM)</option>
                  <option value="ground_mount">Ground Mount / Carport</option>
                </select>
              </div>

              {/* Submit CTA */}
              <div style={{ paddingTop: '0.75rem' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--accent-primary)',
                    color: '#FFFFFF',
                    padding: '1rem',
                    borderRadius: '14px',
                    fontWeight: '700',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 8px 24px rgba(23, 107, 69, 0.25)',
                    cursor: loading ? 'wait' : 'pointer',
                  }}
                >
                  <span>{loading ? 'Analyzing Solar Irradiance...' : 'Submit Consultation Request'}</span>
                  <ArrowRight size={16} />
                </button>
                <div style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.6rem' }}>
                  🔒 Your information is private. Zero sales harassment. Certified engineering review only.
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

