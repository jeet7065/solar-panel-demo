import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sun, Zap, BatteryCharging, Home, ArrowRight, ShieldCheck, Cpu, Activity, CheckCircle2 } from 'lucide-react';

const TOTAL_FRAMES = 300;

export default function CompleteSystemScroll({ onOpenQuoteModal, onOpenCalculator }) {
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
    firstImg.src = '/system_sequence/ezgif-frame-001.jpg';
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
        img.src = `/system_sequence/ezgif-frame-${frameNum}.jpg`;
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

  // Draw frame on canvas with aspect cover/contain
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

    // Background color
    ctx.fillStyle = '#0F1612';
    ctx.fillRect(0, 0, width, height);

    // Compute aspect cover
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

      // Target frame mapping across 300 frames:
      // progress 0.0 -> frame 1
      // progress 1.0 -> frame 300
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

  // Determine current chapter
  // 0.00 - 0.22: Generation (Frames 1-60)
  // 0.22 - 0.46: Conversion (Frames 61-130)
  // 0.46 - 0.70: Storage (Frames 131-200)
  // 0.70 - 1.00: Power (Frames 201-300)
  const currentChapter =
    scrollProgress < 0.22
      ? 1
      : scrollProgress < 0.46
      ? 2
      : scrollProgress < 0.70
      ? 3
      : 4;

  const chapters = [
    {
      id: 1,
      phase: 'STAGE 01',
      title: 'Solar Generation',
      subtitle: 'Capturing Ambient Photon Energy',
      icon: Sun,
      progressTarget: 0.08,
      desc: 'High-density N-type TOPCon monocrystalline cells capture direct sunlight and diffuse ground albedo, producing clean DC power with 23.4% peak efficiency.',
      stats: [
        { label: 'Array Output', value: '9.4 kWp Peak' },
        { label: 'Cell Type', value: 'N-Type TOPCon' },
        { label: 'Optical Glass', value: '3.2mm Anti-Reflective' },
      ],
    },
    {
      id: 2,
      phase: 'STAGE 02',
      title: 'Inverter Conversion',
      subtitle: 'Sub-Millisecond DC to AC Inversion',
      icon: Zap,
      progressTarget: 0.35,
      desc: 'The intelligent hybrid inverter converts raw direct current into clean 240V alternating current with 98.6% European-weighted efficiency and active MPPT string tracking.',
      stats: [
        { label: 'Conversion Eff.', value: '98.6% Euro Rating' },
        { label: 'MPPT Trackers', value: 'Dual High-Voltage' },
        { label: 'Grid Sync', value: '< 10ms Response' },
      ],
    },
    {
      id: 3,
      phase: 'STAGE 03',
      title: 'Home Battery Storage',
      subtitle: 'Cobalt-Free LiFePO4 Energy Buffer',
      icon: BatteryCharging,
      progressTarget: 0.60,
      desc: 'Surplus daytime electricity is stored seamlessly in modular lithium iron phosphate cells. Safe, non-toxic chemistry designed for 6,000+ full charge cycles.',
      stats: [
        { label: 'Usable Capacity', value: '15 – 30 kWh Modular' },
        { label: 'Depth of Discharge', value: '100% Usable' },
        { label: 'Cycle Life', value: '6,000+ Cycles (15+ Yrs)' },
      ],
    },
    {
      id: 4,
      phase: 'STAGE 04',
      title: 'Whole-Home Power',
      subtitle: 'Net-Zero Architectural Independence',
      icon: Home,
      progressTarget: 0.88,
      desc: 'At dusk and during utility grid outages, the integrated ecosystem silently powers lighting, climate systems, and EV chargers with zero interruption.',
      stats: [
        { label: 'Self-Sufficiency', value: '100% Net Zero' },
        { label: 'Outage Backup', value: 'Automated Microgrid' },
        { label: 'Annual Savings', value: '$2,800+ / Year' },
      ],
    },
  ];

  const activeData = chapters[currentChapter - 1];

  return (
    <section
      id="system"
      ref={containerRef}
      style={{
        position: 'relative',
        height: '350vh',
        backgroundColor: '#0F1612',
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

        {/* Cinematic Vignette & Ambient Overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15, 22, 18, 0.45) 0%, rgba(15, 22, 18, 0.05) 40%, rgba(15, 22, 18, 0.65) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Section Headline Badge (Top Center) */}
        <div
          style={{
            position: 'absolute',
            top: 'calc(var(--nav-height) + 1.25rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(15, 22, 18, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(105, 185, 107, 0.3)',
            borderRadius: '999px',
            padding: '0.45rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            color: '#FFFFFF',
            zIndex: 20,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-secondary)',
            }}
            className="pulsing-indicator"
          />
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: '700',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#D4E8D7',
            }}
          >
            The Ecosystem In Motion • Scroll to Traverse Lifecycle
          </span>
        </div>

        {/* Dynamic Chapter Card (Positioned Float on Left) */}
        <div
          style={{
            position: 'absolute',
            left: 'max(2rem, calc((100vw - 1360px) / 2))',
            bottom: '6.5rem',
            maxWidth: '460px',
            width: 'calc(100% - 4rem)',
            backgroundColor: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '24px',
            padding: '2rem 2.25rem',
            border: '1px solid rgba(228, 233, 228, 0.8)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
            zIndex: 20,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="system-floating-card"
        >
          {/* Phase Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(23, 107, 69, 0.08)',
                padding: '0.3rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.74rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                color: 'var(--accent-primary)',
              }}
            >
              <activeData.icon size={13} />
              <span>{activeData.phase}</span>
            </div>

            <span style={{ fontSize: '0.74rem', fontWeight: '700', color: 'var(--text-muted)' }}>
              Frame {Math.round(currentFrameRef.current)} / 300
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: '1.65rem',
              fontWeight: '800',
              color: 'var(--text-heading)',
              letterSpacing: '-0.02em',
              marginBottom: '0.25rem',
            }}
          >
            {activeData.title}
          </h3>

          <div
            style={{
              fontSize: '0.86rem',
              fontWeight: '600',
              color: 'var(--accent-primary)',
              marginBottom: '0.85rem',
            }}
          >
            {activeData.subtitle}
          </div>

          <p
            style={{
              fontSize: '0.92rem',
              color: 'var(--text-body)',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
            }}
          >
            {activeData.desc}
          </p>

          {/* Live Telemetry Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '1.25rem',
            }}
          >
            {activeData.stats.map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-heading)', marginTop: '2px' }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Bottom Scrubber Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.75rem',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(15, 22, 18, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(105, 185, 107, 0.3)',
            borderRadius: '999px',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
            zIndex: 30,
            maxWidth: 'calc(100vw - 2rem)',
            overflowX: 'auto',
          }}
        >
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#9EAEA2',
              paddingRight: '0.25rem',
              borderRight: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            Ecosystem
          </span>

          {chapters.map((chap) => {
            const isActive = currentChapter === chap.id;
            return (
              <button
                key={chap.id}
                onClick={() => scrollToMilestone(chap.progressTarget)}
                style={{
                  fontSize: '0.76rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#FFFFFF' : '#A4B4A8',
                  backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '999px',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>{chap.title}</span>
              </button>
            );
          })}

          {/* Scrub Bar */}
          <div
            style={{
              width: '50px',
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              overflow: 'hidden',
              marginLeft: '0.25rem',
            }}
          >
            <div
              style={{
                width: `${Math.round(scrollProgress * 100)}%`,
                height: '100%',
                backgroundColor: 'var(--accent-secondary)',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .system-floating-card {
            bottom: 5.5rem !important;
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}

