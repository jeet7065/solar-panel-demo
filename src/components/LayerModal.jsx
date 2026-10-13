import React from 'react';
import { X, ShieldCheck, Zap, Layers, Award, CheckCircle2 } from 'lucide-react';

export default function LayerModal({ layer, onClose }) {
  if (!layer) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: 'rgba(24, 34, 28, 0.45)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div
        className="liquid-glass"
        style={{
          width: '100%',
          maxWidth: '560px',
          borderRadius: '26px',
          overflow: 'hidden',
          position: 'relative',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div
          style={{
            padding: '1.75rem 2rem 1.25rem',
            borderBottom: '1px solid rgba(228, 233, 228, 0.8)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 249, 246, 0.7) 100%)',
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
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent-primary)',
                backgroundColor: 'rgba(23, 107, 69, 0.08)',
                padding: '0.25rem 0.65rem',
                borderRadius: '999px',
                marginBottom: '0.5rem',
              }}
            >
              <Layers size={13} />
              Architectural Layer Analysis
            </div>
            <h3
              style={{
                fontSize: '1.45rem',
                fontWeight: '800',
                color: 'var(--text-heading)',
                marginBottom: '0.25rem',
              }}
            >
              {layer.title}
            </h3>
            <p
              style={{
                fontSize: '0.92rem',
                fontWeight: '500',
                color: 'var(--accent-primary)',
                fontStyle: 'italic',
              }}
            >
              "{layer.shortQuote}"
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close layer modal"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(24, 34, 28, 0.05)',
              color: 'var(--text-body)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(24, 34, 28, 0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(24, 34, 28, 0.05)')}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem 2rem', maxHeight: '70vh', overflowY: 'auto' }}>
          <p
            style={{
              fontSize: '0.96rem',
              color: 'var(--text-body)',
              lineHeight: 1.65,
              marginBottom: '1.5rem',
            }}
          >
            {layer.description}
          </p>

          {/* Quick Metrics Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                padding: '0.9rem 1rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.2rem' }}>
                Profile Thickness
              </div>
              <div style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--text-heading)' }}>
                {layer.thickness}
              </div>
            </div>

            <div
              style={{
                padding: '0.9rem 1rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.2rem' }}>
                Optical / Power Spec
              </div>
              <div style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                {layer.transmittance}
              </div>
            </div>

            <div
              style={{
                padding: '0.9rem 1rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.2rem' }}>
                Durability Rating
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-heading)' }}>
                {layer.durability}
              </div>
            </div>

            <div
              style={{
                padding: '0.9rem 1rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.2rem' }}>
                Surface / Treatment
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-body)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {layer.coating}
              </div>
            </div>
          </div>

          {/* Key Engineering Features */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-heading)',
                marginBottom: '0.75rem',
              }}
            >
              Engineering Advantages
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {layer.keyFeatures.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '1.25rem 2rem',
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '0.65rem 1.5rem',
              borderRadius: '999px',
              backgroundColor: 'var(--accent-primary)',
              color: '#FFFFFF',
              fontWeight: '600',
              fontSize: '0.88rem',
            }}
          >
            Close Spec View
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

