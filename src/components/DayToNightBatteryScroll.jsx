import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sun, Moon, BatteryCharging, Zap, ShieldAlert, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

const TOTAL_FRAMES = 240;

export default function DayToNightBatteryScroll({ onOpenQuoteModal, onOpenCalculator }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedCountRef = useRef(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const rafIdRef = useRef(null);

  // Preload frames
  useEffect(() => {
    let isCancelled = false;
    const images = new Array(TOTAL_FRAMES);
    let loaded = 0;

    // Fast load frame 1
    const firstImg = new Image();
    firstImg.src = '/day_night_sequence/ezgif-frame-001.jpg';
    firstImg.onload = () => {
      if (isCancelled) return;
      images[0] = firstImg;
      loaded++;
      loadedCountRef.current = loaded;
      setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
      drawFrame(1);
    };

    // Load remaining frames in batches
    const loadRemaining = async () => {
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) return;
        const img = new Image();
        const frameNum = String(i).padStart(3, '0');
        img.src = `/day_night_sequence/ezgif-frame-${frameNum}.jpg`;
        img.onload = () => {
          if (isCancelled) return;
          images[i - 1] = img;
          loaded++;
          loadedCountRef.current = loaded;
          const pct = Math.round((loaded / TOTAL_FRAMES) * 100);
          setLoadProgress(pct);
          if (pct === 100) {
            setIsLoaded(true);
          }
        };

        if (i % 20 === 0) {
          await new Promise((r) => setTimeout(r, 6));
        }
      }
    };

    loadRemaining();
    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, []);

  // Draw frame on canvas with aspect cover
  const drawFrame = useCallback((frameNumber) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const idx = Math.min(Math.max(Math.round(frameNumber) - 1, 0), TOTAL_FRAMES - 1);
    const img = imagesRef.current[idx] || imagesRef.current[0];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    // Aspect cover
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawW, drawH, drawX, drawY;

    if (canvasAspect > imgAspect) {
      drawW = width;
      drawH = width / imgAspect;
      drawX = 0;
      drawY = (height - drawH) / 2;
    } else {
      drawH = height;
      drawW = height * imgAspect;
      drawX = (width - drawW) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Resize canvas with devicePixelRatio
  useEffect(() => {
    const updateSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const displayW = Math.round(rect.width * dpr);
      const displayH = Math.round(rect.height * dpr);

      if (canvas.width !== displayW || canvas.height !== displayH) {
        canvas.width = displayW;
        canvas.height = displayH;
      }
      drawFrame(currentFrameRef.current);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [drawFrame]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      const viewportHeight = window.innerHeight;

      const maxScroll = containerHeight - viewportHeight;
      const scrolled = -containerTop;
      const progress = Math.max(0, Math.min(1, scrolled / maxScroll));

      setScrollProgress(progress);

      const targetFrame = 1 + progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = Math.min(Math.max(targetFrame, 1), TOTAL_FRAMES);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth lerp loop
  useEffect(() => {
    let running = true;

    const loop = () => {
      if (!running) return;

      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.16;
        drawFrame(currentFrameRef.current);
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      running = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // Scroll to milestone
  const scrollToMilestone = (targetProgress) => {
    const container = containerRef.current;
    if (!container) return;
    const maxScroll = container.scrollHeight - window.innerHeight;
    const targetY = container.offsetTop + targetProgress * maxScroll;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  // Determine current phase
  // Phase 1: 0.00 - 0.33 (Daytime Harvest)
  // Phase 2: 0.33 - 0.66 (Sunset / Peak Tariff Shift)
  // Phase 3: 0.66 - 1.00 (Starry Night / Whole-Home Battery Resilience)
  const isDay = scrollProgress < 0.33;
  const isTwilight = scrollProgress >= 0.33 && scrollProgress < 0.66;
  const isNight = scrollProgress >= 0.66;

  return (
    <section
      id="day-to-night"
      ref={containerRef}
      style={{
        position: 'relative',
        height: '360vh',
        backgroundColor: '#0A0F0D',
      }}
    >
      {/* Sticky Stage */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'cover',
          }}
        />

        {/* Ambient Top Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isNight
              ? 'linear-gradient(180deg, rgba(10, 15, 13, 0.4) 0%, transparent 40%, rgba(10, 15, 13, 0.6) 100%)'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, transparent 35%, rgba(0, 0, 0, 0.35) 100%)',
            pointerEvents: 'none',
            transition: 'background 0.5s ease',
          }}
        />

        {/* Section Headline Badge (Top Center) */}
        <div
          style={{
            position: 'absolute',
            top: 'calc(var(--nav-height) + 1.25rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: isNight ? 'rgba(15, 22, 18, 0.85)' : 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${isNight ? 'rgba(105, 185, 107, 0.4)' : 'rgba(228, 233, 228, 0.8)'}`,
            borderRadius: '999px',
            padding: '0.45rem 1.35rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            color: isNight ? '#FFFFFF' : 'var(--text-heading)',
            zIndex: 20,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.4s ease',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: isNight ? '#69B96B' : '#E8A020',
            }}
            className="pulsing-indicator"
          />
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: '700',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: isNight ? '#D4E8D7' : 'var(--text-heading)',
            }}
          >
            The Day to Night Transition • Selling Battery Storage
          </span>
        </div>

        {/* Dynamic Storytelling Narrative Card (Left Floating) */}
        <div
          style={{
            position: 'absolute',
            left: 'max(2rem, calc((100vw - 1360px) / 2))',
            bottom: '6.5rem',
            maxWidth: '470px',
            width: 'calc(100% - 4rem)',
            backgroundColor: isNight ? 'rgba(18, 26, 22, 0.88)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '24px',
            padding: '2.25rem 2.25rem',
            border: `1px solid ${isNight ? 'rgba(105, 185, 107, 0.3)' : 'var(--border-color)'}`,
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
            zIndex: 20,
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            color: isNight ? '#FFFFFF' : 'var(--text-heading)',
          }}
          className="day-night-card"
        >
          {/* Phase Tag */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: isNight ? 'rgba(105, 185, 107, 0.15)' : 'rgba(23, 107, 69, 0.08)',
                padding: '0.35rem 0.85rem',
                borderRadius: '999px',
                fontSize: '0.74rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                color: isNight ? '#69B96B' : 'var(--accent-primary)',
              }}
            >
              {isDay && <Sun size={13} />}
              {isTwilight && <Zap size={13} />}
              {isNight && <Sparkles size={13} />}
              <span>
                {isDay ? '1:00 PM • FULL DAYLIGHT' : isTwilight ? '6:45 PM • THE GRID SPIKE' : '10:30 PM • 100% STORED CLEAN POWER'}
              </span>
            </div>

            <span style={{ fontSize: '0.74rem', fontWeight: '700', color: isNight ? '#98AB9E' : 'var(--text-muted)' }}>
              Frame {Math.round(currentFrameRef.current)} / 240
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: '1.75rem',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              color: isNight ? '#FFFFFF' : 'var(--text-heading)',
              lineHeight: 1.15,
              marginBottom: '0.35rem',
            }}
          >
            {isDay && 'Daylight Generates. Darkness Needs.'}
            {isTwilight && 'The Sun Sets. Utility Rates Surge.'}
            {isNight && 'The Panels Go Dark. Your Windows Shine.'}
          </h3>

          <div
            style={{
              fontSize: '0.88rem',
              fontWeight: '600',
              color: isNight ? '#69B96B' : 'var(--accent-primary)',
              marginBottom: '0.85rem',
            }}
          >
            {isDay && 'Solar panels produce peak clean power during the day.'}
            {isTwilight && 'Peak electricity tariffs double as families return home.'}
            {isNight && 'Stored battery power keeps your entire residence alive.'}
          </div>

          <p
            style={{
              fontSize: '0.94rem',
              color: isNight ? '#C4D4C8' : 'var(--text-body)',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
            }}
          >
            {isDay &&
              'Bright clear skies mean maximum kilowatt-hour generation. The solar array on the roof absorbs direct irradiance while the excess surplus charges your home battery.'}
            {isTwilight &&
              'As daylight dims, solar panels naturally cease power production. Without a battery, homes are forced to draw expensive peak grid electricity right when energy prices peak.'}
            {isNight &&
              'With modular LiFePO4 battery storage, the transition is seamless. Stored daytime sunlight silently illuminates your windows, charges your EV, and guarantees immunity during storm outages.'}
          </p>

          {/* Telemetry Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              borderTop: `1px solid ${isNight ? 'rgba(255, 255, 255, 0.12)' : 'var(--border-color)'}`,
              paddingTop: '1.25rem',
              marginBottom: isNight ? '1.5rem' : '0',
            }}
          >
            {isDay && (
              <>
                <div>
                  <div style={{ fontSize: '0.68rem', color: isNight ? '#98AB9E' : 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Rooftop Array</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--accent-primary)', marginTop: '2px' }}>+9.8 kW Sun</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: isNight ? '#98AB9E' : 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Home Demand</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-heading)', marginTop: '2px' }}>2.1 kW Active</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: isNight ? '#98AB9E' : 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Battery Tank</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--accent-secondary)', marginTop: '2px' }}>+7.7 kW In</div>
                </div>
              </>
            )}

            {isTwilight && (
              <>
                <div>
                  <div style={{ fontSize: '0.68rem', color: isNight ? '#98AB9E' : 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Rooftop Array</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-muted)', marginTop: '2px' }}>0.0 kW Dark</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: isNight ? '#98AB9E' : 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Peak Utility</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#D9534F', marginTop: '2px' }}>48¢/kWh Avoided</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: isNight ? '#98AB9E' : 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Battery Takeover</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--accent-primary)', marginTop: '2px' }}>3.2 kW Active</div>
                </div>
              </>
            )}

            {isNight && (
              <>
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#98AB9E', textTransform: 'uppercase', fontWeight: '600' }}>Solar Panels</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#CBD5CD', marginTop: '2px' }}>Dark & Ready</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#98AB9E', textTransform: 'uppercase', fontWeight: '600' }}>Home Windows</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#FFD166', marginTop: '2px' }}>100% Bright</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#98AB9E', textTransform: 'uppercase', fontWeight: '600' }}>Grid Dependency</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#69B96B', marginTop: '2px' }}>0.00 Watts</div>
                </div>
              </>
            )}
          </div>

          {/* Quick Battery Add CTA (Shown when reaching night) */}
          {isNight && (
            <button
              onClick={onOpenQuoteModal}
              style={{
                width: '100%',
                backgroundColor: 'var(--accent-primary)',
                color: '#FFFFFF',
                padding: '0.85rem',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 6px 20px rgba(23, 107, 69, 0.4)',
                cursor: 'pointer',
              }}
            >
              <span>Add Battery Storage to Your Quote</span>
              <ArrowRight size={15} />
            </button>
          )}
        </div>

        {/* Time Scrubber Dock (Floating bottom center) */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.75rem',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: isNight ? 'rgba(15, 22, 18, 0.9)' : 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${isNight ? 'rgba(105, 185, 107, 0.35)' : 'var(--border-color)'}`,
            borderRadius: '999px',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.3)',
            zIndex: 30,
            maxWidth: 'calc(100vw - 2rem)',
            overflowX: 'auto',
            transition: 'all 0.3s ease',
          }}
        >
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: isNight ? '#98AB9E' : 'var(--text-muted)',
              paddingRight: '0.25rem',
              borderRight: `1px solid ${isNight ? 'rgba(255, 255, 255, 0.15)' : 'var(--border-color)'}`,
            }}
          >
            Time of Day
          </span>

          {[
            { label: '☀️ 1:00 PM Clear Day', progress: 0.05, active: isDay },
            { label: '🌅 6:45 PM Sunset Shift', progress: 0.50, active: isTwilight },
            { label: '✨ 10:30 PM Starry Night', progress: 0.95, active: isNight },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => scrollToMilestone(item.progress)}
              style={{
                fontSize: '0.76rem',
                fontWeight: item.active ? '700' : '500',
                color: item.active ? '#FFFFFF' : isNight ? '#A0B2A5' : 'var(--text-body)',
                backgroundColor: item.active
                  ? isNight
                    ? 'var(--accent-primary)'
                    : 'var(--accent-primary)'
                  : 'transparent',
                padding: '0.35rem 0.85rem',
                borderRadius: '999px',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}
            >
              {item.label}
            </button>
          ))}

          {/* Progress bar */}
          <div
            style={{
              width: '50px',
              height: '4px',
              backgroundColor: isNight ? 'rgba(255, 255, 255, 0.2)' : 'rgba(24, 34, 28, 0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
              marginLeft: '0.25rem',
            }}
          >
            <div
              style={{
                width: `${Math.round(scrollProgress * 100)}%`,
                height: '100%',
                backgroundColor: isNight ? 'var(--accent-secondary)' : 'var(--accent-primary)',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .day-night-card {
            bottom: 5.5rem !important;
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}

