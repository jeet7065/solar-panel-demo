import React from 'react';
import { ArrowUp, Sun, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ onOpenQuoteModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border-color)',
        padding: '6rem 2rem 3rem',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Top Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr',
            gap: '3.5rem',
            marginBottom: '4.5rem',
          }}
          className="footer-grid"
        >
          {/* Col 1: Brand Manifesto */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #176B45 0%, #69B96B 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-heading)' }}>
                AURA<span style={{ color: 'var(--accent-primary)', fontWeight: '400' }}>SOLAR</span>
              </span>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.65, marginBottom: '1.5rem', maxWidth: '340px' }}>
              Pioneering high-durability, architecturally refined clean energy systems.
              Engineered with N-Type TOPCon silicon and backed by a 30-year linear performance warranty.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  color: 'var(--accent-primary)',
                  backgroundColor: 'rgba(23, 107, 69, 0.08)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '999px',
                }}
              >
                <ShieldCheck size={13} />
                NABCEP Certified EPC
              </div>
            </div>
          </div>

          {/* Col 2: Architecture & Tech */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-heading)', marginBottom: '1.25rem' }}>
              Engineering
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-body)' }}>
              <li><a href="#exploded-view" style={{ transition: 'color 0.2s' }}>Exploded 3D Visualizer</a></li>
              <li><a href="#exploded-view">N-Type TOPCon Cells</a></li>
              <li><a href="#exploded-view">3.2mm Tempered Glass</a></li>
              <li><a href="#exploded-view">Anodized Alloy Frame</a></li>
              <li><a href="#system">Smart Hybrid Inverter</a></li>
              <li><a href="#system">LiFePO4 Home Storage</a></li>
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-heading)', marginBottom: '1.25rem' }}>
              Deployments
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-body)' }}>
              <li><a href="#solutions">Residential Installation</a></li>
              <li><a href="#solutions">Commercial Ballasted Roofs</a></li>
              <li><a href="#solutions">Solar Carport Infrastructure</a></li>
              <li><a href="#solutions">Asset Care & Drone Audits</a></li>
              <li><a href="#projects">Architectural Case Studies</a></li>
              <li><a href="#calculator">Solar ROI Calculator</a></li>
            </ul>
          </div>

          {/* Col 4: Consultation */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-heading)', marginBottom: '1.25rem' }}>
              Free Roof Assessment
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Speak with a licensed solar project engineer to receive a custom 3D roof irradiance model.
            </p>
            <button
              onClick={onOpenQuoteModal}
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: '#FFFFFF',
                padding: '0.75rem 1.4rem',
                borderRadius: '999px',
                fontSize: '0.88rem',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>Get Free Solar Quote</span>
            </button>
          </div>
        </div>

        {/* Bottom Disclosures & Back to Top */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Designed by Clickzain.com
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Warranty Disclosures</span>

            <button
              onClick={scrollToTop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                padding: '0.45rem 0.85rem',
                borderRadius: '999px',
                color: 'var(--text-heading)',
                fontSize: '0.76rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

