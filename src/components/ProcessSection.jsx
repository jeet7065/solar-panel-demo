import React from 'react';
import { Compass, FileCheck, Wrench, Wifi, ArrowRight } from 'lucide-react';

export default function ProcessSection({ onOpenQuoteModal }) {
  const steps = [
    {
      num: '01',
      icon: Compass,
      title: '3D LiDAR & Solar Audit',
      duration: 'Day 1–2',
      description: 'We generate an exact 3D digital twin of your roof using drone LiDAR imagery to model azimuth, shade angles, and annual solar irradiance with 99.4% accuracy.',
    },
    {
      num: '02',
      icon: FileCheck,
      title: 'Engineering & Permitting',
      duration: 'Weeks 1–3',
      description: 'Our licensed PE structural and electrical engineers draft municipal schematics, file city building permits, and secure utility interconnection pre-approval.',
    },
    {
      num: '03',
      icon: Wrench,
      title: 'Precision Installation',
      duration: '1–2 Days',
      description: 'Master in-house crews install weather-flashed brackets, route concealed electrical conduits, and mount the monocrystalline array with zero roof leaks guaranteed.',
    },
    {
      num: '04',
      icon: Wifi,
      title: 'Grid PTO & Telemetry',
      duration: 'Immediate',
      description: 'Following final utility inspection and Permission to Operate (PTO), we calibrate your bidirectional smart meter and link your live mobile monitoring dashboard.',
    },
  ];

  return (
    <section
      id="process"
      style={{
        padding: '7.5rem 2rem',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: 'rgba(23, 107, 69, 0.08)',
              padding: '0.35rem 0.95rem',
              borderRadius: '999px',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent-primary)',
              }}
            >
              Streamlined Deployment
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 3.8vw, 3.25rem)',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              color: 'var(--text-heading)',
              marginBottom: '1rem',
            }}
          >
            Our Installation Process.
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-body)',
              lineHeight: 1.65,
            }}
          >
            From your initial rooftop consultation to grid activation, our turnkey engineering
            workflow handles every technical, structural, and bureaucratic detail.
          </p>
        </div>

        {/* 4 Process Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.75rem',
          }}
          className="process-grid"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  padding: '2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Step Number Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.8rem',
                      fontWeight: '800',
                      color: 'var(--accent-primary)',
                      lineHeight: 1,
                    }}
                  >
                    {step.num}
                  </span>

                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      color: 'var(--text-muted)',
                      backgroundColor: 'rgba(24, 34, 28, 0.05)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '999px',
                    }}
                  >
                    {step.duration}
                  </span>
                </div>

                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Icon size={20} color="var(--accent-primary)" />
                </div>

                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '800',
                    color: 'var(--text-heading)',
                    marginBottom: '0.65rem',
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-body)',
                    lineHeight: 1.6,
                  }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div
          style={{
            marginTop: '3.5rem',
            textAlign: 'center',
          }}
        >
          <button
            onClick={onOpenQuoteModal}
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: '#FFFFFF',
              padding: '0.9rem 2.2rem',
              borderRadius: '999px',
              fontSize: '0.95rem',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 16px rgba(23, 107, 69, 0.2)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-primary)')}
          >
            <span>Schedule Your Free Roof Assessment</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

