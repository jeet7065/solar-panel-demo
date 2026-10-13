import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowDown, Layers, Sparkles, Check, ChevronRight, Info, ShieldCheck, Zap } from 'lucide-react';
import { LAYER_SPECS } from '../data/layerSpecs';
import LayerModal from './LayerModal';

const TOTAL_FRAMES = 240;

export default function ScrollytellingCanvas({ onOpenQuoteModal, onOpenCalculator }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedCountRef = useRef(0);
  
  // Animation state
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeLayerModal, setActiveLayerModal] = useState(null);
  
  // Mouse parallax
  const mouseOffset = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const currentScaleRef = useRef(0.66);
  const targetScaleRef = useRef(0.66);
  const currentShiftXRef = useRef(0);
  const targetShiftXRef = useRef(0);
  const rafIdRef = useRef(null);

  // Preload frames
  useEffect(() => {
    let isCancelled = false;
    const images = new Array(TOTAL_FRAMES);
    let loaded = 0;

    // Fast load frame 1 first
    const firstImg = new Image();
    firstImg.src = '/sequence/ezgif-frame-001.jpg';
    firstImg.onload = () => {
      if (isCancelled) return;
      images[0] = firstImg;
      loaded++;
      loadedCountRef.current = loaded;
      setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
      drawFrame(1, currentScaleRef.current, currentShiftXRef.current);
    };

    // Load remaining frames in batches
    const loadRemaining = async () => {
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) return;
        const img = new Image();
        const frameNum = String(i).padStart(3, '0');
        img.src = `/sequence/ezgif-frame-${frameNum}.jpg`;
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
        if (i % 15 === 0) {
          await new Promise((r) => setTimeout(r, 8));
        }
      }
    };

    loadRemaining();
    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, []);

  // Draw a frame on canvas with dynamic scale and position
  const drawFrame = useCallback((frameNumber, scaleVal, shiftXVal) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const idx = Math.min(Math.max(Math.round(frameNumber) - 1, 0), TOTAL_FRAMES - 1);
    const img = imagesRef.current[idx] || imagesRef.current[0];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background with soft white gradient
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Compute base aspect-fit
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let baseW, baseH;

    if (canvasAspect > imgAspect) {
      baseH = height;
      baseW = height * imgAspect;
    } else {
      baseW = width;
      baseH = width / imgAspect;
    }

    // Apply scale and position offset
    const drawW = baseW * scaleVal;
    const drawH = baseH * scaleVal;
    const drawX = (width - drawW) / 2 + shiftXVal;
    const drawY = (height - drawH) / 2;

    // Gentle mouse parallax
    const px = mouseOffset.current.x * (width * 0.012);
    const py = mouseOffset.current.y * (height * 0.01);

    ctx.save();
    ctx.translate(px, py);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
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
      drawFrame(currentFrameRef.current, currentScaleRef.current, currentShiftXRef.current);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [drawFrame]);

  // Scroll tracking and timeline mapping
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

      // Frame mapping
      let targetFrame = 1;

      if (progress <= 0.15) {
        // Complete panel product shot
        const sub = progress / 0.15;
        targetFrame = 1 + sub * 11;
      } else if (progress <= 0.40) {
        // First separation
        const sub = (progress - 0.15) / 0.25;
        targetFrame = 12 + sub * (90 - 12);
      } else if (progress <= 0.65) {
        // Engineering revealed
        const sub = (progress - 0.40) / 0.25;
        targetFrame = 90 + sub * (170 - 90);
      } else if (progress <= 0.84) {
        // Complete architecture full explosion
        const sub = (progress - 0.65) / 0.19;
        targetFrame = 170 + sub * (240 - 170);
      } else {
        // Smooth reassembly
        const sub = (progress - 0.84) / 0.16;
        targetFrame = 240 - sub * 239;
      }

      targetFrameRef.current = Math.min(Math.max(targetFrame, 1), 240);

      // Size and Position Dynamics:
      // At p = 0: Panel is decreased in size (scale: 0.66) and on the right side!
      // As p increases to 0.25: Moves to center (shiftX: 0) and scales up to 1.0!
      const canvas = canvasRef.current;
      const cWidth = canvas ? canvas.width : window.innerWidth;
      const isDesktop = window.innerWidth >= 900;
      
      const initialShift = isDesktop ? cWidth * 0.23 : cWidth * 0.05;
      const initialScale = isDesktop ? 0.66 : 0.72;

      if (progress <= 0.25) {
        const t = progress / 0.25;
        // Smooth easeInOut curve
        const ease = t * t * (3 - 2 * t);
        targetScaleRef.current = initialScale + (1.0 - initialScale) * ease;
        targetShiftXRef.current = initialShift * (1 - ease);
      } else {
        targetScaleRef.current = 1.0;
        targetShiftXRef.current = 0;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth RAF render loop (Lerp interpolation for frame, scale, and position)
  useEffect(() => {
    let running = true;

    const loop = () => {
      if (!running) return;

      // Mouse lerp
      mouseOffset.current.x += (mouseOffset.current.targetX - mouseOffset.current.x) * 0.08;
      mouseOffset.current.y += (mouseOffset.current.targetY - mouseOffset.current.y) * 0.08;

      // Frame lerp
      const diffFrame = targetFrameRef.current - currentFrameRef.current;
      const diffScale = targetScaleRef.current - currentScaleRef.current;
      const diffShift = targetShiftXRef.current - currentShiftXRef.current;

      let needRedraw = false;

      if (Math.abs(diffFrame) > 0.03) {
        currentFrameRef.current += diffFrame * 0.18;
        needRedraw = true;
      }
      if (Math.abs(diffScale) > 0.002) {
        currentScaleRef.current += diffScale * 0.14;
        needRedraw = true;
      }
      if (Math.abs(diffShift) > 0.5) {
        currentShiftXRef.current += diffShift * 0.14;
        needRedraw = true;
      }
      if (Math.abs(mouseOffset.current.targetX - mouseOffset.current.x) > 0.005) {
        needRedraw = true;
      }

      if (needRedraw) {
        drawFrame(currentFrameRef.current, currentScaleRef.current, currentShiftXRef.current);
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      running = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // Mouse move handler
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    mouseOffset.current.targetX = x;
    mouseOffset.current.targetY = y;
  };

  const handleMouseLeave = () => {
    mouseOffset.current.targetX = 0;
    mouseOffset.current.targetY = 0;
  };

  // Jump smoothly to a specific milestone
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

  // Visibility helpers
  const isExplodedPhase = scrollProgress >= 0.16 && scrollProgress <= 0.83;
  const isHeroPhase = scrollProgress < 0.18;
  const isReassembledPhase = scrollProgress > 0.86;

  // Specific layer opacities
  const getLayerOpacity = (start, peak, end) => {
    if (scrollProgress < start || scrollProgress > end) return 0;
    if (scrollProgress < peak) {
      return (scrollProgress - start) / (peak - start);
    }
    return 1 - (scrollProgress - peak) / (end - peak);
  };

  const glassOpacity = getLayerOpacity(0.16, 0.35, 0.83);
  const evaFrontOpacity = getLayerOpacity(0.18, 0.40, 0.83);
  const cellsOpacity = getLayerOpacity(0.30, 0.55, 0.83);
  const evaRearOpacity = getLayerOpacity(0.35, 0.60, 0.83);
  const backsheetOpacity = getLayerOpacity(0.40, 0.68, 0.83);
  const frameOpacity = getLayerOpacity(0.20, 0.48, 0.83);
  const junctionBoxOpacity = getLayerOpacity(0.45, 0.70, 0.83);

  return (
    <section
      id="exploded-view"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        height: '420vh',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Sticky Fullscreen 3D Stage */}
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
          background: 'radial-gradient(ellipse at 50% 50%, rgba(105, 185, 107, 0.05) 0%, #FFFFFF 75%)',
        }}
      >
        {/* Subtle Ambient Radial Lighting */}
        <div
          style={{
            position: 'absolute',
            width: '800px',
            height: '800px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(23, 107, 69, 0.05) 0%, rgba(105, 185, 107, 0.03) 40%, transparent 70%)',
            pointerEvents: 'none',
            transform: `translate(${mouseOffset.current.x * 20}px, ${mouseOffset.current.y * 20}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        />

        {/* 3D Render Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'contain',
            cursor: isExplodedPhase ? 'crosshair' : 'default',
          }}
        />

        {/* Preload Indicator */}
        {!isLoaded && loadProgress < 100 && (
          <div
            className="liquid-glass-pill"
            style={{
              position: 'absolute',
              top: 'calc(var(--nav-height) + 1rem)',
              right: '2rem',
              padding: '0.45rem 1rem',
              borderRadius: '999px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.72rem',
              fontWeight: '700',
              color: 'var(--text-muted)',
              zIndex: 30,
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: '2px solid var(--accent-secondary)',
                borderTopColor: 'transparent',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <span>Preloading 3D sequence: {loadProgress}%</span>
          </div>
        )}

        {/* ========================================================= */}
        {/* HERO SECTION OVERLAY (With Liquid Glass Card) */}
        {/* The Solar Panel floats on the right; Hero card on the left */}
        {/* ========================================================= */}
        <div
          id="hero"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 2.5rem',
            pointerEvents: isHeroPhase ? 'auto' : 'none',
            opacity: Math.max(0, 1 - scrollProgress * 5.5),
            transform: `translateY(${-scrollProgress * 100}px)`,
            transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
            zIndex: 20,
          }}
        >
          {/* Liquid Glass Hero Container on the Left Side */}
          <div
            className="liquid-glass"
            style={{
              maxWidth: '620px',
              marginLeft: 'max(1.5rem, calc((100vw - 1400px) / 2))',
              borderRadius: '28px',
              padding: '2.5rem 2.5rem 2.25rem',
            }}
          >
            {/* Supertag Pill */}
            <div
              className="liquid-glass-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.95rem',
                borderRadius: '999px',
                marginBottom: '1.25rem',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-secondary)',
                }}
                className="pulsing-indicator"
              />
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-primary)',
                }}
              >
                AURA P-SERIES BIFACIAL • N-TYPE TOPCON 23.4%
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
                fontWeight: '800',
                letterSpacing: '-0.04em',
                color: 'var(--text-heading)',
                lineHeight: 1.05,
                marginBottom: '0.5rem',
              }}
            >
              Power Your Future.
            </h1>

            {/* Supporting Headline */}
            <h2
              style={{
                fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
                fontWeight: '600',
                color: 'var(--accent-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}
            >
              Solar technology, engineered for tomorrow.
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: '0.98rem',
                color: 'var(--text-body)',
                lineHeight: 1.6,
                marginBottom: '1.85rem',
              }}
            >
              Discover intelligent solar solutions designed to deliver dependable performance,
              long-term value, and cleaner energy.
            </p>

            {/* Dual CTAs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.85rem',
                marginBottom: '1.85rem',
              }}
            >
              <button
                onClick={onOpenQuoteModal}
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: '#FFFFFF',
                  padding: '0.85rem 1.65rem',
                  borderRadius: '9999px',
                  fontSize: '0.92rem',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 8px 20px rgba(23, 107, 69, 0.25)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Get a Free Solar Quote</span>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => scrollToMilestone(0.35)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  color: 'var(--text-heading)',
                  border: '1px solid rgba(228, 233, 228, 0.9)',
                  padding: '0.85rem 1.45rem',
                  borderRadius: '9999px',
                  fontSize: '0.92rem',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.color = 'var(--accent-primary)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(228, 233, 228, 0.9)';
                  e.currentTarget.style.color = 'var(--text-heading)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Layers size={15} />
                <span>Explore Our Technology</span>
              </button>
            </div>

            {/* Quick Spec Metrics Ribbon */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, auto)',
                gap: '1.5rem',
                borderTop: '1px solid rgba(228, 233, 228, 0.7)',
                paddingTop: '1.25rem',
              }}
            >
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-heading)' }}>
                  23.4%
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                  Cell Efficiency
                </div>
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                  30 Yrs
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                  Linear Warranty
                </div>
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-heading)' }}>
                  5,400 Pa
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                  Hail & Snow Load
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Prompt */}
          <div
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-muted)',
              fontSize: '0.74rem',
              fontWeight: '600',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
            className="animate-float"
          >
            <span>Scroll to Center & Explode Internal Engineering</span>
            <ArrowDown size={14} color="var(--accent-secondary)" />
          </div>
        </div>

        {/* ========================================================= */}
        {/* EXPLANATORY COMPONENT CALLOUTS (Liquid Glass Effect) */}
        {/* Surrounding the centered exploded solar panel */}
        {/* ========================================================= */}

        {/* LEFT SIDE CALLOUTS */}
        <div
          style={{
            position: 'absolute',
            left: 'max(2rem, calc((100vw - 1440px) / 2))',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            width: '320px',
            pointerEvents: isExplodedPhase ? 'auto' : 'none',
            zIndex: 25,
          }}
        >
          {/* Callout 1: ALUMINUM FRAME */}
          <CalloutCard
            title="ALUMINUM FRAME"
            quote="Structural strength for secure mounting."
            detail="40mm aerospace-grade 6005-T6 anodized alloy with integrated water drainage channels."
            opacity={frameOpacity}
            side="left"
            onClick={() => setActiveLayerModal(LAYER_SPECS.frame)}
          />

          {/* Callout 2: TEMPERED GLASS */}
          <CalloutCard
            title="TEMPERED GLASS"
            quote="Hail-resistant surface protection."
            detail="3.2mm low-iron solar glass with dual-sided anti-reflective nanocoating. Withstands 35mm hail impacts."
            opacity={glassOpacity}
            side="left"
            onClick={() => setActiveLayerModal(LAYER_SPECS.glass)}
          />

          {/* Callout 3: PHOTOVOLTAIC CELLS */}
          <CalloutCard
            title="PHOTOVOLTAIC CELLS"
            quote="Convert sunlight into usable electricity."
            detail="144 half-cut N-type TOPCon monocrystalline bifacial cells yielding 23.4% high-conversion efficiency."
            opacity={cellsOpacity}
            side="left"
            onClick={() => setActiveLayerModal(LAYER_SPECS.cells)}
          />

          {/* Callout 4: JUNCTION BOX */}
          <CalloutCard
            title="JUNCTION BOX"
            quote="Connects the panel to the electrical system."
            detail="IP68 submersible enclosure equipped with Schottky bypass diodes and genuine Stäubli MC4-Evo2 connectors."
            opacity={junctionBoxOpacity}
            side="left"
            onClick={() => setActiveLayerModal(LAYER_SPECS.junctionBox)}
          />
        </div>

        {/* RIGHT SIDE CALLOUTS */}
        <div
          style={{
            position: 'absolute',
            right: 'max(2rem, calc((100vw - 1440px) / 2))',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            width: '320px',
            pointerEvents: isExplodedPhase ? 'auto' : 'none',
            zIndex: 25,
          }}
        >
          {/* Callout 5: EVA ENCAPSULANT (FRONT) */}
          <CalloutCard
            title="EVA ENCAPSULANT"
            quote="Cushions and protects the solar cells."
            detail="Ultra-pure cross-linked co-polymer film ensuring 99.9% optical transmittance and zero air-void bonding."
            opacity={evaFrontOpacity}
            side="right"
            onClick={() => setActiveLayerModal(LAYER_SPECS.evaFront)}
          />

          {/* Callout 6: REAR EVA FILM */}
          <CalloutCard
            title="REAR EVA FILM"
            quote="Hermetically seals the active wafer matrix."
            detail="Specialized hydrolysis-resistant cushioning layer with enhanced back-surface internal light recycling."
            opacity={evaRearOpacity}
            side="right"
            onClick={() => setActiveLayerModal(LAYER_SPECS.evaRear)}
          />

          {/* Callout 7: PROTECTIVE BACKSHEET */}
          <CalloutCard
            title="PROTECTIVE BACKSHEET"
            quote="Helps insulate and protect the rear."
            detail="Fluoropolymer composite barrier with 1,500V DC electrical insulation and complete moisture-vapor shielding."
            opacity={backsheetOpacity}
            side="right"
            onClick={() => setActiveLayerModal(LAYER_SPECS.backsheet)}
          />
        </div>

        {/* ========================================================= */}
        {/* REASSEMBLY OVERLAY BANNER (Liquid Glass Effect) */}
        {/* ========================================================= */}
        <div
          className="liquid-glass"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            pointerEvents: isReassembledPhase ? 'auto' : 'none',
            opacity: Math.max(0, (scrollProgress - 0.85) * 6),
            transition: 'opacity 0.2s ease-out',
            zIndex: 28,
            maxWidth: '640px',
            borderRadius: '28px',
            padding: '2.5rem 3rem',
          }}
        >
          <div
            className="liquid-glass-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1.15rem',
              borderRadius: '999px',
              marginBottom: '1rem',
            }}
          >
            <ShieldCheck size={15} color="var(--accent-primary)" />
            <span
              style={{
                fontSize: '0.76rem',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent-primary)',
              }}
            >
              MONOLITHIC SYSTEM RESTORED • 100% SEALED
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              color: 'var(--text-heading)',
              lineHeight: 1.15,
              marginBottom: '0.75rem',
            }}
          >
            Engineered as One.
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-body)',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
            }}
          >
            Every physical layer is fused under high-vacuum lamination to deliver 30+ years of uninterrupted clean power on your roof.
          </p>

          <button
            onClick={() => {
              const systemSec = document.querySelector('#system');
              if (systemSec) systemSec.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: '#fff',
              padding: '0.85rem 1.85rem',
              borderRadius: '999px',
              fontWeight: '600',
              fontSize: '0.92rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 6px 20px rgba(23, 107, 69, 0.25)',
            }}
          >
            <span>See Complete Ecosystem In Motion</span>
            <ArrowDown size={15} />
          </button>
        </div>

        {/* ========================================================= */}
        {/* TIMELINE MILESTONE SCRUBBER (Liquid Glass Pill Dock) */}
        {/* ========================================================= */}
        <div
          className="liquid-glass"
          style={{
            position: 'absolute',
            bottom: '1.75rem',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '999px',
            padding: '0.45rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
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
              color: 'var(--text-muted)',
              paddingRight: '0.35rem',
              borderRight: '1px solid rgba(228, 233, 228, 0.9)',
            }}
          >
            Layers
          </span>

          {[
            { label: '01 Assembled', progress: 0.05 },
            { label: '02 Separation', progress: 0.25 },
            { label: '03 Silicon Core', progress: 0.50 },
            { label: '04 Exploded Architecture', progress: 0.75 },
            { label: '05 Reassembly', progress: 0.95 },
          ].map((milestone, idx) => {
            const isActive =
              (idx === 0 && scrollProgress <= 0.15) ||
              (idx === 1 && scrollProgress > 0.15 && scrollProgress <= 0.40) ||
              (idx === 2 && scrollProgress > 0.40 && scrollProgress <= 0.65) ||
              (idx === 3 && scrollProgress > 0.65 && scrollProgress <= 0.84) ||
              (idx === 4 && scrollProgress > 0.84);

            return (
              <button
                key={milestone.label}
                onClick={() => scrollToMilestone(milestone.progress)}
                style={{
                  fontSize: '0.76rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#FFFFFF' : 'var(--text-heading)',
                  backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '999px',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {milestone.label}
              </button>
            );
          })}

          {/* Quick Progress Indicator */}
          <div
            style={{
              width: '45px',
              height: '4px',
              backgroundColor: 'rgba(24, 34, 28, 0.08)',
              borderRadius: '2px',
              overflow: 'hidden',
              marginLeft: '0.25rem',
            }}
          >
            <div
              style={{
                width: `${Math.round(scrollProgress * 100)}%`,
                height: '100%',
                backgroundColor: 'var(--accent-primary)',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
        </div>
      </div>

      {/* Layer Detail Inspection Modal */}
      <LayerModal
        layer={activeLayerModal}
        onClose={() => setActiveLayerModal(null)}
      />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 1024px) {
          #exploded-view .callout-card {
            width: 260px !important;
          }
        }
        @media (max-width: 768px) {
          #exploded-view .callout-card {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

// Sub-component for Explanatory Callouts with Liquid Glass Effect
function CalloutCard({ title, quote, detail, opacity, side, onClick }) {
  if (opacity <= 0.02) return null;

  return (
    <div
      className="liquid-glass callout-card"
      onClick={onClick}
      style={{
        opacity: Math.max(0, Math.min(1, opacity)),
        transform: `translateY(${Math.max(-15, Math.min(15, (1 - opacity) * 20))}px) scale(${0.96 + opacity * 0.04})`,
        transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
        borderRadius: '18px',
        padding: '1.25rem 1.35rem',
        cursor: 'pointer',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-primary)';
        e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.9)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {/* Connector Pin Dot */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          [side === 'left' ? 'right' : 'left']: '-28px',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          flexDirection: side === 'left' ? 'row' : 'row-reverse',
        }}
      >
        <div
          style={{
            width: '20px',
            height: '1px',
            backgroundColor: '#CBD5CD',
          }}
        />
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-primary)',
            boxShadow: '0 0 0 4px rgba(105, 185, 107, 0.25)',
          }}
        />
      </div>

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.4rem',
        }}
      >
        <div
          style={{
            fontSize: '0.72rem',
            fontWeight: '800',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent-primary)',
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            fontSize: '0.68rem',
            fontWeight: '600',
            color: 'var(--text-muted)',
          }}
        >
          <span>Spec</span>
          <Info size={11} />
        </div>
      </div>

      {/* Headline Quote */}
      <div
        style={{
          fontSize: '0.94rem',
          fontWeight: '700',
          color: 'var(--text-heading)',
          lineHeight: 1.25,
          marginBottom: '0.35rem',
        }}
      >
        "{quote}"
      </div>

      {/* Supporting Detail */}
      <p
        style={{
          fontSize: '0.78rem',
          color: 'var(--text-body)',
          lineHeight: 1.45,
        }}
      >
        {detail}
      </p>
    </div>
  );
}
