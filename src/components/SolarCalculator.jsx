import React, { useState } from 'react';
import { Calculator, ArrowRight, DollarSign, Sun, Battery, Trees, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function SolarCalculator({ onOpenQuoteModalWithData }) {
  const [monthlyBill, setMonthlyBill] = useState(240);
  const [sunRegion, setSunRegion] = useState('high'); // 'moderate', 'standard', 'high'
  const [propertyType, setPropertyType] = useState('residential');

  // Realistic solar calculation formulas
  // Average electricity rate ~$0.21 / kWh
  // System size (kW) needed ~ (monthlyBill / rate * 12) / (sunHours * 365 * derate)
  const sunMultipliers = {
    moderate: 1200, // Northern US / Europe
    standard: 1450, // Central US
    high: 1700,     // Southwest / California / Sunbelt
  };

  const annualBill = monthlyBill * 12;
  const avgKwhRate = 0.22;
  const annualKwhNeeded = annualBill / avgKwhRate;
  const recommendedKw = Math.max(3.5, Math.round((annualKwhNeeded / sunMultipliers[sunRegion]) * 10) / 10);
  const annualGenerationKwh = Math.round(recommendedKw * sunMultipliers[sunRegion]);

  // 25-Year cumulative savings with 3.5% utility inflation
  // Sum of 25 years = annualBill * sum((1.035)^t) - estimated solar system cost
  const utilityWithoutSolar25Yr = Math.round(annualBill * 38.9); // ~39x due to utility compounding inflation
  const estimatedNetCost = Math.round(recommendedKw * 2800 * 0.70); // After 30% ITC
  const estimated25YrSavings = Math.max(12000, utilityWithoutSolar25Yr - estimatedNetCost);
  const taxCredit30 = Math.round(recommendedKw * 2800 * 0.30);
  const treesPlanted = Math.round(annualGenerationKwh * 0.018 * 25);
  const co2Tons = Math.round((annualGenerationKwh * 0.85 * 25) / 2000);

  const handleApplyToQuote = () => {
    if (onOpenQuoteModalWithData) {
      onOpenQuoteModalWithData({
        monthlyBill,
        recommendedKw,
        estimated25YrSavings,
        propertyType,
      });
    }
  };

  return (
    <section
      id="calculator"
      style={{
        padding: '7.5rem 2rem',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 4.5rem' }}>
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
            <Calculator size={14} color="var(--accent-primary)" />
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent-primary)',
              }}
            >
              Financial Modeling
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
            Calculate Your Clean Energy ROI.
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: 1.65 }}>
            See how much you can save over 25 years by converting volatile utility electric bills
            into predictable solar generation with verified zero-down economics.
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '28px',
            border: '1px solid var(--border-color)',
            padding: '3rem',
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '3.5rem',
            alignItems: 'center',
            boxShadow: 'var(--card-shadow)',
          }}
          className="calculator-container"
        >
          {/* Controls Column */}
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '1.75rem' }}>
              Your Current Energy Profile
            </h3>

            {/* Slider 1: Monthly Electricity Bill */}
            <div style={{ marginBottom: '2.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-heading)' }}>
                  Average Monthly Electric Bill
                </label>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>
                  ${monthlyBill}<span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '500' }}>/mo</span>
                </div>
              </div>

              <input
                type="range"
                min="80"
                max="850"
                step="10"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '4px',
                  outline: 'none',
                  accentColor: 'var(--accent-primary)',
                  cursor: 'pointer',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                <span>$80 / mo</span>
                <span>$450 / mo</span>
                <span>$850+ / mo</span>
              </div>
            </div>

            {/* Sunlight Region Selector */}
            <div style={{ marginBottom: '2.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
                Regional Solar Irradiance
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem' }}>
                {[
                  { id: 'moderate', label: 'Moderate', sub: 'North / Europe' },
                  { id: 'standard', label: 'Standard', sub: 'Midwest / East' },
                  { id: 'high', label: 'High Sunbelt', sub: 'CA / AZ / TX / FL' },
                ].map((reg) => (
                  <button
                    key={reg.id}
                    type="button"
                    onClick={() => setSunRegion(reg.id)}
                    style={{
                      padding: '0.75rem 0.5rem',
                      borderRadius: '12px',
                      border: `1px solid ${sunRegion === reg.id ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                      backgroundColor: sunRegion === reg.id ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                      boxShadow: sunRegion === reg.id ? '0 4px 12px rgba(23, 107, 69, 0.12)' : 'none',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '0.84rem', fontWeight: '700', color: sunRegion === reg.id ? 'var(--accent-primary)' : 'var(--text-heading)' }}>
                      {reg.label}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {reg.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type Selector */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
                Property Classification
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem' }}>
                {[
                  { id: 'residential', label: 'Residential Estate' },
                  { id: 'commercial', label: 'Commercial / Industrial' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setPropertyType(type.id)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      border: `1px solid ${propertyType === type.id ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                      backgroundColor: propertyType === type.id ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                      color: propertyType === type.id ? 'var(--accent-primary)' : 'var(--text-heading)',
                      fontWeight: '600',
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                    }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              padding: '2.5rem',
              boxShadow: 'var(--card-shadow)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                  Estimated 25-Year Value
                </span>
                <span style={{ fontSize: '0.74rem', fontWeight: '700', color: 'var(--accent-primary)', backgroundColor: 'rgba(23, 107, 69, 0.08)', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
                  Inflation-Adjusted
                </span>
              </div>

              {/* Big Savings Number */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ fontSize: 'clamp(2.4rem, 3.5vw, 3.4rem)', fontWeight: '800', color: 'var(--accent-primary)', lineHeight: 1, fontFamily: 'var(--font-heading)' }}>
                  ${estimated25YrSavings.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-body)', marginTop: '0.4rem' }}>
                  Net utility expense avoided over 25 years
                </div>
              </div>

              {/* Breakdown Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem',
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '1.5rem',
                  marginBottom: '1.75rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                    Recommended Array Size
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-heading)' }}>
                    {recommendedKw} kWp
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    ~{Math.round(recommendedKw * 2.2)} Aura P-Series Panels
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                    Annual Clean Yield
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-heading)' }}>
                    {annualGenerationKwh.toLocaleString()} kWh
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--accent-secondary)', fontWeight: '600' }}>
                    100% Home Electricity Offset
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                    Federal Tax Credit (ITC)
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                    ${taxCredit30.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    30% Direct Federal Incentive
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                    Lifetime Environmental
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-heading)' }}>
                    {co2Tons} Tons CO₂
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Equivalent to {treesPlanted} mature trees
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleApplyToQuote}
              style={{
                width: '100%',
                backgroundColor: 'var(--accent-primary)',
                color: '#FFFFFF',
                padding: '0.95rem',
                borderRadius: '14px',
                fontWeight: '700',
                fontSize: '0.96rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 6px 20px rgba(23, 107, 69, 0.22)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-primary)')}
            >
              <span>Lock In This Solar Estimate</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .calculator-container {
            grid-template-columns: 1fr !important;
            padding: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}

