import React, { useState } from 'react';
import { ArrowUpRight, Zap, MapPin, Building, Home, CheckCircle2 } from 'lucide-react';

export default function ProjectsShowcase({ onOpenQuoteModal }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      type: 'residential',
      title: 'The Crestview Glasshouse Estate',
      location: 'Rancho Santa Fe, CA',
      capacity: '18.4 kWp',
      production: '29,400 kWh / yr',
      offset: '100% Net Zero Energy',
      panels: '40x Aura P-Series 460W All-Black',
      battery: '30 kWh LiFePO4 Storage',
      desc: 'Architectural flush-mounted solar array integrated onto a standing-seam zinc roof. Fully powers 6,800 sq ft smart residence and two electric vehicles.',
      gradient: 'linear-gradient(135deg, #1C3326 0%, #2A4837 100%)',
    },
    {
      id: 2,
      type: 'commercial',
      title: 'Vanguard Industrial Logistics Hub',
      location: 'Tacoma, WA',
      capacity: '420 kWp',
      production: '512,000 kWh / yr',
      offset: '380 Metric Tons CO₂ Offset',
      panels: '912x Aura P-Series 460W Bifacial',
      battery: '120 kWh Peak Demand Buffer',
      desc: 'Non-penetrating ballasted flat roof installation with aerodynamic deflector wind shields, delivering payback in 3.6 years.',
      gradient: 'linear-gradient(135deg, #1E2D38 0%, #2D4353 100%)',
    },
    {
      id: 3,
      type: 'residential',
      title: 'Nordic Passive Solar Residence',
      location: 'Aspen, CO',
      capacity: '14.2 kWp',
      production: '21,800 kWh / yr',
      offset: 'High Snow-Load Engineered',
      panels: '31x Aura High-Load Monocrystalline',
      battery: '20 kWh Cold-Climate Insulated Storage',
      desc: 'Engineered for extreme alpine climates with 5,400 Pa front mechanical snow rating and thermal sub-deck heating channels.',
      gradient: 'linear-gradient(135deg, #1A3831 0%, #255146 100%)',
    },
    {
      id: 4,
      type: 'commercial',
      title: 'AeroTech Research Campus & Solar Carport',
      location: 'Austin, TX',
      capacity: '280 kWp',
      production: '445,000 kWh / yr',
      offset: '60 Dual-Port EV Chargers',
      panels: '608x Aura Bifacial Glass-Glass',
      battery: 'Microgrid Islanding System',
      desc: 'Architectural solar carport canopy generating clean shade for 120 executive vehicles while charging corporate electric fleets.',
      gradient: 'linear-gradient(135deg, #24352D 0%, #354D41 100%)',
    },
  ];

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.type === activeFilter);

  return (
    <section
      id="projects"
      style={{
        padding: '7.5rem 2rem',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Header and Filter Controls */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '2rem',
            marginBottom: '3.5rem',
          }}
        >
          <div style={{ maxWidth: '640px' }}>
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
                Portfolio Excellence
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.25rem)',
                fontWeight: '800',
                letterSpacing: '-0.03em',
                color: 'var(--text-heading)',
                marginBottom: '0.75rem',
              }}
            >
              Residential & Commercial Projects.
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
              A sample of high-efficiency architectural solar deployments engineered to standard.
            </p>
          </div>

          {/* Filter Pills */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-color)',
              borderRadius: '999px',
              padding: '0.35rem',
              gap: '0.25rem',
            }}
          >
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'residential', label: 'Residential' },
              { id: 'commercial', label: 'Commercial' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: activeFilter === f.id ? '#FFFFFF' : 'var(--text-body)',
                  backgroundColor: activeFilter === f.id ? 'var(--accent-primary)' : 'transparent',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
          }}
          className="projects-grid"
        >
          {filtered.map((proj) => (
            <div
              key={proj.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                boxShadow: 'var(--card-shadow)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--card-shadow)';
              }}
            >
              {/* Card Visual Hero Area */}
              <div
                style={{
                  padding: '2.5rem',
                  background: proj.gradient,
                  color: '#FFFFFF',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-secondary)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '999px',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {proj.type === 'residential' ? 'Residential Estate' : 'Commercial Facility'}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: '#D2DCD4' }}>
                    <MapPin size={14} />
                    <span>{proj.location}</span>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: '1.65rem',
                    fontWeight: '800',
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.5rem',
                  }}
                >
                  {proj.title}
                </h3>

                <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '1.25rem' }}>
                  <div>
                    <div style={{ fontSize: '0.74rem', color: '#B0C2B6', textTransform: 'uppercase' }}>Installed Peak</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#FFFFFF' }}>{proj.capacity}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.74rem', color: '#B0C2B6', textTransform: 'uppercase' }}>Annual Clean Output</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#69B96B' }}>{proj.production}</div>
                  </div>
                </div>
              </div>

              {/* Card Body Details */}
              <div style={{ padding: '2rem 2.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '0.94rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {proj.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', color: 'var(--text-heading)' }}>
                      <CheckCircle2 size={15} color="var(--accent-primary)" />
                      <span><strong>Module Spec:</strong> {proj.panels}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', color: 'var(--text-heading)' }}>
                      <CheckCircle2 size={15} color="var(--accent-primary)" />
                      <span><strong>Storage System:</strong> {proj.battery}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', color: 'var(--text-heading)' }}>
                      <CheckCircle2 size={15} color="var(--accent-primary)" />
                      <span><strong>Performance:</strong> {proj.offset}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenQuoteModal}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '0.75rem 1rem',
                    color: 'var(--accent-primary)',
                    fontWeight: '600',
                    fontSize: '0.88rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--accent-primary)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <span>Request Engineering Design for Similar Site</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

