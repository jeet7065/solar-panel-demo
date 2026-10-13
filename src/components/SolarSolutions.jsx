import React from 'react';
import { Home, Building2, Wrench, ArrowRight, Check, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

export default function SolarSolutions({ onOpenQuoteModal }) {
  const solutions = [
    {
      id: 'residential',
      icon: Home,
      tag: 'Architectural Integration',
      title: 'Residential Solar Installation',
      subtitle: 'Tailored for luxury modern residences & estates',
      description: 'Custom rooftop arrays engineered with seamless all-black aesthetics, premium mounting hardware, and integrated battery backup that protects your architectural skyline while eliminating utility bills.',
      specs: [
        'Systems from 6 kW to 30+ kW custom tailored',
        'Flush-mount architectural black rail integration',
        'LiFePO4 whole-home energy storage options',
        '25-Year comprehensive production warranty'
      ],
      highlight: 'Typical 92–100% utility bill offset',
      cta: 'Explore Residential Quote',
    },
    {
      id: 'commercial',
      icon: Building2,
      tag: 'Enterprise & Industrial',
      title: 'Commercial Solar Solutions',
      subtitle: 'High-yield rooftop, carport & microgrid arrays',
      description: 'Turn unused industrial roof space and parking facilities into long-term capital assets. Designed for rapid CAPEX amortization, accelerated 30% Federal ITC monetization, and ESG compliance.',
      specs: [
        '50 kW to 2.5 MW commercial installations',
        'Non-penetrating ballasted flat-roof mounting',
        'Bifacial solar carports with EV charging hubs',
        'Accelerated MACRS depreciation guidance'
      ],
      highlight: '3.8 to 4.5 year average payback period',
      cta: 'Request Enterprise Audit',
    },
    {
      id: 'maintenance',
      icon: Wrench,
      tag: 'Asset Protection',
      title: 'Solar Maintenance & Support',
      subtitle: 'Continuous health monitoring & lifecycle care',
      description: 'Ensure your clean energy infrastructure maintains peak operational efficiency. Includes 24/7 telemetric string monitoring, automated infrared drone audits, and rapid-dispatch field technicians.',
      specs: [
        '24/7 telemetric inverter & string health monitoring',
        'Annual infrared drone hotspot inspections',
        'De-ionized reverse-osmosis panel cleaning',
        'Guaranteed 99.2% system uptime SLA'
      ],
      highlight: 'Zero downtime performance guarantee',
      cta: 'View Service Plans',
    },
  ];

  return (
    <section
      id="solutions"
      style={{
        padding: '7.5rem 2rem',
        backgroundColor: '#FFFFFF',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Section Heading */}
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
            <Zap size={14} color="var(--accent-primary)" />
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent-primary)',
              }}
            >
              Engineered Deployments
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
            Solar Solutions Built to Last Generations.
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-body)',
              lineHeight: 1.65,
            }}
          >
            Every property has unique architecture and energy profiles. We design, permit,
            and build bespoke installations that exceed structural and electrical standards.
          </p>
        </div>

        {/* 3 Premium Solutions Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
          }}
          className="solutions-grid"
        >
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '24px',
                  border: '1px solid var(--border-color)',
                  padding: '2.5rem 2.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Top Header */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.75rem',
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '14px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(24, 34, 28, 0.04)',
                      }}
                    >
                      <Icon size={24} color="var(--accent-primary)" />
                    </div>

                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--accent-primary)',
                        backgroundColor: 'rgba(23, 107, 69, 0.08)',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '999px',
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: '800',
                      color: 'var(--text-heading)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {item.title}
                  </h3>

                  <div
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: 'var(--accent-secondary)',
                      marginBottom: '1rem',
                    }}
                  >
                    {item.subtitle}
                  </div>

                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--text-body)',
                      lineHeight: 1.6,
                      marginBottom: '1.75rem',
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Bullet Specs */}
                  <div
                    style={{
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.65rem',
                      marginBottom: '2rem',
                    }}
                  >
                    {item.specs.map((spec, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <Check size={15} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA & Highlight */}
                <div>
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(23, 107, 69, 0.05)',
                      border: '1px solid rgba(23, 107, 69, 0.1)',
                      marginBottom: '1.25rem',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      color: 'var(--accent-primary)',
                      textAlign: 'center',
                    }}
                  >
                    ★ {item.highlight}
                  </div>

                  <button
                    onClick={onOpenQuoteModal}
                    style={{
                      width: '100%',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-heading)',
                      padding: '0.85rem',
                      borderRadius: '12px',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.color = 'var(--text-heading)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                  >
                    <span>{item.cta}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .solutions-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

