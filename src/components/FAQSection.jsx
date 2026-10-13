import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How do Aura N-Type TOPCon panels perform during cloudy, rainy, or winter days?',
      a: 'Even under dense cloud cover, diffuse solar radiation still reaches the earth. Our N-Type TOPCon silicon architecture and dual-sided anti-reflective nanocoated glass have a significantly broader spectral absorption curve than traditional P-type panels, producing up to 15–25% higher yield in low-light and overcast conditions. Furthermore, our bifacial cells capture reflected ambient ground light from their rear surface.',
    },
    {
      q: 'What happens to my power during a utility grid blackout or storm?',
      a: 'Standard grid-tied solar systems automatically disconnect during an outage to protect utility linemen. However, when paired with our LiFePO4 battery storage and hybrid inverter, the system automatically isolates from the grid in less than 10 milliseconds (microgrid islanding). Your lights, refrigerator, internet, and critical circuits stay on without a single flicker.',
    },
    {
      q: 'What is covered under the 30-Year Linear Power Warranty?',
      a: 'Our comprehensive warranty guarantees that the module will output at least 99.0% of its nominal nameplate capacity in Year 1, with a maximum annual linear degradation of no more than 0.40% through Year 30. At Year 30, the panel is guaranteed to generate at least 87.4% of its original rated power. In addition, the structural aluminum frame, tempered glass, and junction box carry a 25-year full product craftsmanship warranty.',
    },
    {
      q: 'Will the installation damage my roof or void existing roof warranties?',
      a: 'No. We use structural engineered flashing brackets and waterproof butyl sealing pucks tested to withstand continuous hydrostatic water pressure. For standing-seam metal roofs, we utilize non-penetrating S-5! clamps that grip the seam directly without making a single hole. For commercial flat roofs, we deploy non-penetrating ballasted aerodynamic racking systems that preserve your roofing membrane warranty.',
    },
    {
      q: 'How long does the entire engineering, permitting, and installation process take?',
      a: 'Physical installation of the solar array and electrical equipment on your home is completed in just 1 to 2 days by our master in-house electricians. The preceding phase — structural engineering drawings, municipal building permits, and utility interconnection approval — typically spans 2 to 4 weeks depending on your local jurisdiction. Our dedicated operations team manages 100% of the paperwork.',
    },
    {
      q: 'How does the 30% Federal Investment Tax Credit (ITC) apply to my system?',
      a: 'Under current federal clean energy legislation, qualifying residential and commercial solar installations, as well as battery storage systems, are eligible for a direct 30% federal tax credit against your tax liability. For example, on a $28,000 installation, you receive an $8,400 direct tax credit when filing your federal returns.',
    },
  ];

  return (
    <section
      id="faq"
      style={{
        padding: '7.5rem 2rem',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
            <HelpCircle size={14} color="var(--accent-primary)" />
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent-primary)',
              }}
            >
              Frequently Asked Questions
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
            Technical & Financial Answers.
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: 1.65 }}>
            Transparent insights into our photovoltaic engineering, warranty protections, and ROI timelines.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  borderRadius: '18px',
                  border: `1px solid ${isOpen ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  backgroundColor: isOpen ? 'var(--bg-secondary)' : '#FFFFFF',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '1.5rem 1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    textAlign: 'left',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: isOpen ? 'var(--accent-primary)' : 'var(--text-heading)',
                      lineHeight: 1.35,
                    }}
                  >
                    {faq.q}
                  </span>

                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? 'rgba(23, 107, 69, 0.12)' : 'rgba(24, 34, 28, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                    }}
                  >
                    <ChevronDown size={18} color={isOpen ? 'var(--accent-primary)' : 'var(--text-body)'} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 1.75rem 1.75rem',
                      fontSize: '0.96rem',
                      color: 'var(--text-body)',
                      lineHeight: 1.7,
                      borderTop: '1px solid rgba(228, 233, 228, 0.6)',
                      paddingTop: '1.25rem',
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

