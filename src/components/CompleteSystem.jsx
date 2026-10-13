import React, { useState } from 'react';
import { Sun, BatteryCharging, Zap, Shield, Home, ArrowUpRight, CheckCircle2, Cpu } from 'lucide-react';

export default function CompleteSystem() {
  const [activeMode, setActiveMode] = useState('day'); // 'day', 'evening', 'backup'
  const [selectedComponent, setSelectedComponent] = useState('panels');

  const modes = [
    {
      id: 'day',
      label: 'Daytime Generation',
      badge: 'Peak Solar Production',
      desc: 'Panels convert sunlight directly into clean electricity, powering your home while charging the battery and sending surplus to the grid.',
      solarFlow: '9.4 kW Generating',
      batteryFlow: '+4.8 kW Charging',
      homeFlow: '2.4 kW Consumed',
      gridFlow: '+2.2 kW Exported',
    },
    {
      id: 'evening',
      label: 'Evening Battery Discharge',
      badge: 'Peak Tariff Avoidance',
      desc: 'When utility electricity rates surge in the evening, your stored battery power takes over automatically, keeping bills near zero.',
      solarFlow: '0.0 kW (Night)',
      batteryFlow: '-3.1 kW Discharging',
      homeFlow: '3.1 kW Consumed',
      gridFlow: '0.0 kW (Zero Draw)',
    },
    {
      id: 'backup',
      label: 'Grid Outage Islanding',
      badge: '10ms Automatic Microgrid',
      desc: 'If severe storms knock down external power lines, the system switches to isolated microgrid operation in 10 milliseconds.',
      solarFlow: '6.2 kW Generating',
      batteryFlow: 'Active Microgrid Buffer',
      homeFlow: '3.0 kW Critical Loads',
      gridFlow: 'ISOLATED (Grid Down)',
    },
  ];

  const currentMode = modes.find((m) => m.id === activeMode);

  return (
    <section
      id="system"
      style={{
        padding: '7rem 2rem',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(23, 107, 69, 0.08)',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              marginBottom: '1rem',
            }}
          >
            <Cpu size={14} color="var(--accent-primary)" />
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent-primary)',
              }}
            >
              Complete Clean Energy Architecture
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.25rem)',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              color: 'var(--text-heading)',
              marginBottom: '1rem',
            }}
          >
            From Single Panel to Whole-Home Resilience.
          </h2>

          <p
            style={{
              fontSize: '1.08rem',
              color: 'var(--text-body)',
              lineHeight: 1.65,
            }}
          >
            Engineered solar panels are only the beginning. Seamlessly synchronized with intelligent
            hybrid inverters and lithium storage, your rooftop becomes a self-sustaining micro-power plant.
          </p>
        </div>

        {/* Interactive Mode Selector Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '2rem',
          }}
        >
          {modes.map((mode) => {
            const isActive = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                style={{
                  padding: '0.75rem 1.35rem',
                  borderRadius: '999px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  border: `1px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  backgroundColor: isActive ? 'var(--accent-primary)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--text-heading)',
                  boxShadow: isActive ? '0 4px 14px rgba(23, 107, 69, 0.2)' : '0 2px 6px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                {mode.label}
              </button>
            );
          })}
        </div>

        {/* Main Architectural Reveal Stage */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 0.95fr',
            gap: '2.5rem',
            alignItems: 'stretch',
          }}
          className="system-grid"
        >
          {/* Left: Architectural Rooftop Visual Canvas Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
              boxShadow: 'var(--card-shadow)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Architectural Visual Container */}
            <div
              style={{
                position: 'relative',
                height: '380px',
                background: 'linear-gradient(180deg, #EBF3ED 0%, #D8E6DC 60%, #C4D7CA 100%)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Daylight Sky Sun / Ambient Glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '15%',
                  right: '18%',
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: activeMode === 'evening'
                    ? 'radial-gradient(circle, #D87D4A 0%, rgba(216, 125, 74, 0) 70%)'
                    : 'radial-gradient(circle, #FFF1A8 0%, rgba(255, 241, 168, 0.4) 40%, rgba(255, 241, 168, 0) 75%)',
                  boxShadow: activeMode === 'evening'
                    ? '0 0 40px rgba(216, 125, 74, 0.4)'
                    : '0 0 60px rgba(255, 230, 100, 0.6)',
                  transition: 'all 0.5s ease',
                }}
              />

              {/* Minimalist Architectural Residence SVG Render */}
              <svg
                viewBox="0 0 800 450"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              >
                {/* Modernist Villa Facade */}
                {/* Ground */}
                <rect x="0" y="380" width="800" height="70" fill="#B3C4B8" />
                <path d="M 0 380 Q 200 375 400 380 T 800 378 L 800 450 L 0 450 Z" fill="#9FB5A6" />

                {/* Villa Walls - Pure White & Light Sandstone */}
                <rect x="180" y="160" width="440" height="220" fill="#FFFFFF" />
                <rect x="220" y="240" width="360" height="140" fill="#F8FAF7" />

                {/* Architectural Large Window Panels */}
                <rect x="240" y="260" width="120" height="100" fill="#A8C8DB" opacity="0.65" rx="4" />
                <rect x="380" y="260" width="180" height="100" fill="#A8C8DB" opacity="0.65" rx="4" />

                {/* Roof Structure */}
                <polygon points="140,165 400,60 660,165" fill="#E4E9E4" stroke="#CBD5CD" strokeWidth="2" />

                {/* Solar Panel Array on South-Facing Roof Pitch */}
                {/* 3 Rows of Sleek Monocrystalline Modules */}
                <g transform="translate(195, 82) skewX(-26) scale(0.85, 0.7)">
                  {/* Row 1 */}
                  <rect x="0" y="0" width="70" height="42" fill="#152B3C" stroke="#8CA0B0" strokeWidth="1.5" rx="2" />
                  <rect x="76" y="0" width="70" height="42" fill="#152B3C" stroke="#8CA0B0" strokeWidth="1.5" rx="2" />
                  <rect x="152" y="0" width="70" height="42" fill="#152B3C" stroke="#8CA0B0" strokeWidth="1.5" rx="2" />
                  <rect x="228" y="0" width="70" height="42" fill="#152B3C" stroke="#8CA0B0" strokeWidth="1.5" rx="2" />
                  <rect x="304" y="0" width="70" height="42" fill="#152B3C" stroke="#8CA0B0" strokeWidth="1.5" rx="2" />

                  {/* Row 2 */}
                  <rect x="0" y="48" width="70" height="42" fill="#152B3C" stroke="#8CA0B0" strokeWidth="1.5" rx="2" />
                  <rect x="76" y="48" width="70" height="42" fill="#152B3C" stroke="#8CA0B0" strokeWidth="1.5" rx="2" />
                  <rect x="152" y="48" width="70" height="42" fill="#152B3C" stroke="#8CA0B0" strokeWidth="1.5" rx="2" />
                  <rect x="228" y="48" width="70" height="42" fill="#152B3C" stroke="#8CA0B0" strokeWidth="1.5" rx="2" />
                  <rect x="304" y="48" width="70" height="42" fill="#152B3C" stroke="#8CA0B0" strokeWidth="1.5" rx="2" />

                  {/* Row 3 */}
                  <rect x="0" y="96" width="70" height="42" fill="#152B3C" stroke="#8CA0B0" strokeWidth="1.5" rx="2" />
                  <rect x="76" y="96" width="70" height="42" fill="#152B3C" stroke="#8CA0B0" strokeWidth="1.5" rx="2" />
                  <rect x="152" y="96" width="70" height="42" fill="#152B3C" stroke="#8CA0B0" strokeWidth="1.5" rx="2" />
                  <rect x="228" y="96" width="70" height="42" fill="#152B3C" stroke="#8CA0B0" strokeWidth="1.5" rx="2" />
                  <rect x="304" y="96" width="70" height="42" fill="#152B3C" stroke="#8CA0B0" strokeWidth="1.5" rx="2" />

                  {/* Silicon Solar Glint Highlights */}
                  <line x1="10" y1="5" x2="360" y2="135" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
                </g>

                {/* Wall-Mounted Hybrid Inverter & Storage Battery on Side Garage */}
                {/* Inverter */}
                <rect x="625" y="270" width="34" height="46" fill="#F0F4F1" stroke="#176B45" strokeWidth="2" rx="3" />
                <circle cx="642" cy="285" r="4" fill="#176B45" />

                {/* LiFePO4 Home Battery Cabinet */}
                <rect x="625" y="322" width="34" height="58" fill="#FFFFFF" stroke="#8E9992" strokeWidth="2" rx="3" />
                <line x1="629" y1="338" x2="655" y2="338" stroke="#176B45" strokeWidth="2" />
                <line x1="629" y1="346" x2="655" y2="346" stroke="#176B45" strokeWidth="2" />
                <line x1="629" y1="354" x2="655" y2="354" stroke="#176B45" strokeWidth="2" />

                {/* Power Conduit Lines (Pulsing Energy Flow) */}
                <path d="M 460 170 L 642 220 L 642 270" fill="none" stroke="#69B96B" strokeWidth="2.5" strokeDasharray="6,4" />
                <line x1="642" y1="316" x2="642" y2="322" stroke="#176B45" strokeWidth="3" />

                {/* Garden Vegetation & Trees */}
                <circle cx="130" cy="360" r="35" fill="#4B7C59" opacity="0.9" />
                <circle cx="160" cy="340" r="45" fill="#588D67" opacity="0.9" />
                <circle cx="680" cy="350" r="40" fill="#4B7C59" opacity="0.9" />
              </svg>

              {/* Floating Pulse Badges for Interactive Discovery */}
              <div
                style={{
                  position: 'absolute',
                  top: '28%',
                  left: '42%',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '999px',
                  border: '1px solid var(--accent-primary)',
                  boxShadow: '0 4px 12px rgba(23, 107, 69, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.74rem',
                  fontWeight: '700',
                  color: 'var(--text-heading)',
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-secondary)' }} />
                <span>18x Aura P-Series (8.2 kWp)</span>
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '22%',
                  right: '12%',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '999px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.74rem',
                  fontWeight: '700',
                  color: 'var(--text-heading)',
                }}
              >
                <BatteryCharging size={13} color="var(--accent-primary)" />
                <span>15 kWh Battery + Hybrid Inverter</span>
              </div>
            </div>

            {/* Bottom Real-time Telemetry Bar */}
            <div
              style={{
                padding: '1.5rem 2rem',
                backgroundColor: '#FFFFFF',
                borderTop: '1px solid var(--border-color)',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
              }}
              className="telemetry-bar"
            >
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                  Rooftop Solar
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--accent-primary)', marginTop: '2px' }}>
                  {currentMode.solarFlow}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                  LiFePO4 Storage
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-heading)', marginTop: '2px' }}>
                  {currentMode.batteryFlow}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                  Home Consumption
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-heading)', marginTop: '2px' }}>
                  {currentMode.homeFlow}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                  Bi-Directional Grid
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {currentMode.gridFlow}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Synchronization Breakdown */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Mode Description Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '1.75rem',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: 'var(--accent-primary)',
                  backgroundColor: 'rgba(23, 107, 69, 0.08)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  marginBottom: '0.75rem',
                }}
              >
                {currentMode.badge}
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
                {currentMode.label}
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                {currentMode.desc}
              </p>
            </div>

            {/* Component Integration Cards */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              {[
                {
                  id: 'panels',
                  title: 'Aura Photovoltaic Array',
                  spec: 'N-Type TOPCon bifacial modules with anti-reflective glass',
                  benefit: 'Maximum conversion even in low early-morning daylight.',
                },
                {
                  id: 'inverter',
                  title: 'Smart Hybrid Inverter',
                  spec: '98.6% European weighted efficiency with dual MPPT trackers',
                  benefit: 'Sub-millisecond DC to AC conversion and grid sync.',
                },
                {
                  id: 'battery',
                  title: 'Modular LiFePO4 Storage',
                  spec: 'Cobalt-free chemistry rated for 6,000+ full charge cycles',
                  benefit: '100% depth of discharge with zero fire hazard risk.',
                },
                {
                  id: 'gateway',
                  title: 'Smart Telemetry Gateway',
                  spec: 'Cloud connected 4G/WiFi with predictive AI weather forecasting',
                  benefit: 'Automatically schedules storage for peak energy arbitrage.',
                },
              ].map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '1.15rem 1.35rem',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(23, 107, 69, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <CheckCircle2 size={16} color="var(--accent-primary)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.96rem', fontWeight: '700', color: 'var(--text-heading)' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: '600', marginBottom: '2px' }}>
                      {item.spec}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-body)' }}>
                      {item.benefit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .system-grid {
            grid-template-columns: 1fr !important;
          }
          .telemetry-bar {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

