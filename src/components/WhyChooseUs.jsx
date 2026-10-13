import React from 'react';
import { ShieldCheck, Award, Zap, Compass, CheckCircle2, TrendingDown, SunMedium, Layers } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: SunMedium,
      title: 'N-Type TOPCon Silicon Architecture',
      spec: '23.4% Peak Module Efficiency',
      description: 'Unlike legacy P-type PERC cells that suffer from Light-Induced Degradation (LID), our N-type crystalline wafers deliver zero initial power loss and capture both direct and reflected rear albedo sunlight.',
    },
    {
      icon: ShieldCheck,
      title: 'Structural Armor & Hail Resistance',
      spec: '5,400 Pa Snow / 2,400 Pa Wind Uplift',
      description: 'Engineered with 3.2mm tempered low-iron glass and heavy-duty 40mm anodized perimeter frames, certified to withstand Class 4 hail (35mm ice balls at 95 km/h) and hurricane-velocity wind shears.',
    },
    {
      icon: TrendingDown,
      title: '30-Year Linear Power Warranty',
      spec: '≥ 87.4% Output Guaranteed at Year 30',
      description: 'Backed by an ultra-low 0.40% annual degradation guarantee, ensuring predictable generation decades into the future compared to standard industry 20-year degradation rates.',
    },
    {
      icon: Award,
      title: 'NABCEP-Certified In-House Crews',
      spec: 'Zero Subcontractor Policy',
      description: 'Every roof penetration, conduit run, and electrical tie-in is performed exclusively by our direct master electricians, ensuring impeccable craftsmanship and structural waterproofing integrity.',
    },
  ];

  const certifications = [
    { name: 'IEC 61215', desc: 'Design Qualification & Type Approval' },
    { name: 'IEC 61730', desc: 'Photovoltaic Module Safety Standards' },
    { name: 'UL 61730', desc: 'North American Fire & Electrical Class' },
    { name: 'ISO 9001 / 14001', desc: 'Environmental & Quality Management' },
    { name: 'CE Compliance', desc: 'European Safety & Health Conformity' },
  ];

  return (
    <section
      id="why-us"
      style={{
        padding: '7rem 2rem',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ maxWidth: '750px', marginBottom: '4rem' }}>
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
            <ShieldCheck size={14} color="var(--accent-primary)" />
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent-primary)',
              }}
            >
              Engineering Integrity
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
            Why Choose Our Solar Solutions.
          </h2>

          <p
            style={{
              fontSize: '1.08rem',
              color: 'var(--text-body)',
              lineHeight: 1.65,
            }}
          >
            Solar is a 30-year infrastructure investment. We do not compromise on wafer chemistry,
            frame extrusion metallurgy, or waterproof electrical terminations.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
            marginBottom: '4rem',
          }}
          className="pillars-grid"
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1px solid var(--border-color)',
                  padding: '2.5rem',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                  boxShadow: 'var(--card-shadow)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(23, 107, 69, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={26} color="var(--accent-primary)" />
                </div>

                <div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-secondary)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {pillar.spec}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '800',
                      color: 'var(--text-heading)',
                      marginBottom: '0.65rem',
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.94rem',
                      color: 'var(--text-body)',
                      lineHeight: 1.6,
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verified Industry Standards Bar */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            padding: '2rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div
            style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              textAlign: 'center',
            }}
          >
            International Laboratory Testing & Safety Standards
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.5rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '1.25rem',
            }}
          >
            {certifications.map((cert) => (
              <div key={cert.name} style={{ textAlign: 'center', minWidth: '160px' }}>
                <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-heading)' }}>
                  {cert.name}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  {cert.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

