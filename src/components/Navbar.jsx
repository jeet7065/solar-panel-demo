import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sun, Phone, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenQuoteModal, onOpenCalculator }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'Technology', href: '#exploded-view' },
    { label: 'Ecosystem', href: '#system' },
    { label: 'Battery Storage', href: '#day-to-night' },
    { label: 'Solar Solutions', href: '#solutions' },
    { label: 'Engineering', href: '#why-us' },
    { label: 'Process', href: '#process' },
    { label: 'Projects', href: '#projects' },
    { label: 'Savings', href: '#calculator' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = href === '#hero' ? 0 : element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--nav-height)',
        zIndex: 100,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.88)' : 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? 'var(--border-color)' : 'rgba(228, 233, 228, 0.6)'}`,
        boxShadow: scrolled ? '0 4px 20px -2px rgba(24, 34, 28, 0.04)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          height: '100%',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #176B45 0%, #69B96B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(23, 107, 69, 0.25)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Geometric Prism Icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.18rem',
                fontWeight: '800',
                letterSpacing: '-0.03em',
                color: 'var(--text-heading)',
                lineHeight: 1.1,
              }}
            >
              AURA<span style={{ color: 'var(--accent-primary)', fontWeight: '400' }}>SOLAR</span>
            </span>
            <span
              style={{
                fontSize: '0.62rem',
                fontWeight: '600',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
              }}
            >
              Engineered Photovoltaics
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.5rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: '0.86rem',
                fontWeight: '500',
                color: 'var(--text-body)',
                transition: 'color 0.2s ease',
                position: 'relative',
                padding: '0.5rem 0',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--accent-primary)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-body)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <button
            onClick={onOpenQuoteModal}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--accent-primary)',
              color: '#FFFFFF',
              padding: '0.68rem 1.35rem',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: '600',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 4px 14px rgba(23, 107, 69, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(23, 107, 69, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(23, 107, 69, 0.2)';
            }}
          >
            <span>Get a Quote</span>
            <ArrowRight size={15} />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: 'rgba(23, 107, 69, 0.06)',
              color: 'var(--text-heading)',
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1.5rem 2rem 2rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: '1.05rem',
                fontWeight: '600',
                color: 'var(--text-heading)',
                padding: '0.6rem 0',
                borderBottom: '1px solid #F0F3F0',
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              style={{
                width: '100%',
                backgroundColor: 'var(--accent-primary)',
                color: '#fff',
                padding: '0.85rem',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '1rem',
              }}
            >
              Request Free Quote
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
