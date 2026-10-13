import React from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote: 'The architectural fit was our primary concern with our standing-seam roof. Aura Solar delivered an all-black array that looks integral to our home design. In our first full year, our net electric bill totaled exactly $14.80 for grid connection fees.',
      author: 'Marcus & Elena Vance',
      role: 'Homeowners • 18.4 kW Residential Installation',
      location: 'Rancho Santa Fe, California',
      metric: '99.4% Grid Independence',
      system: 'Aura P-Series Bifacial + 30 kWh Storage',
    },
    {
      id: 2,
      quote: 'As an industrial logistics operator, predictable operating margins are critical. Aura engineered a 420 kW ballasted array on our distribution facility without puncturing our TPO membrane warranty once. We achieved complete capital payback within 3.8 years.',
      author: 'David Sterling',
      role: 'VP of Facilities • Vanguard Logistics',
      location: 'Pacific Northwest Region',
      metric: '$68,400 Annual Power Savings',
      system: '420 kW Commercial Ballasted Array',
    },
    {
      id: 3,
      quote: 'We endure heavy winter blizzards in Aspen. The mechanical strength of these panels is incredible — they easily shed 4 feet of packed powder snow while continuing to produce power through ambient reflection. Outstanding engineering and zero maintenance issues.',
      author: 'Dr. Julian Thorne',
      role: 'Architectural Client • 14.2 kW Alpine Chalet',
      location: 'Aspen, Colorado',
      metric: '5,400 Pa Snow Load Certified',
      system: 'Aura High-Load Alpine Series',
    },
  ];

  return (
    <section
      id="testimonials"
      style={{
        padding: '7.5rem 2rem',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Header */}
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
              Verified Client Experiences
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
            Trusted by Architects & Homeowners Alike.
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: 1.65 }}>
            Hear from property owners who prioritized durability, engineering rigor,
            and seamless clean energy performance.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
          }}
          className="testimonials-grid"
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: '1px solid var(--border-color)',
                padding: '2.5rem 2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--card-shadow)',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                {/* Metric Badge */}
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
                      fontSize: '0.74rem',
                      fontWeight: '700',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-primary)',
                      backgroundColor: 'rgba(23, 107, 69, 0.08)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '999px',
                    }}
                  >
                    ★ {t.metric}
                  </span>

                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#69B96B" color="#69B96B" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p
                  style={{
                    fontSize: '0.96rem',
                    color: 'var(--text-body)',
                    lineHeight: 1.65,
                    fontStyle: 'italic',
                    marginBottom: '2rem',
                  }}
                >
                  "{t.quote}"
                </p>
              </div>

              {/* Author & System */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-heading)' }}>
                  {t.author}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: '600' }}>
                  {t.role}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {t.location} • {t.system}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

