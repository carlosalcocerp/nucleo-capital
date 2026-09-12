import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoSvg from '../assets/logo.svg';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Catálogo Merchandising', href: '/tienda' },
    { label: 'Portafolio', href: '/#galeria' },
    { label: 'Cotizador Online', href: '/#cotizador' },
    { label: 'Contacto', href: '/#cotizador' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-crema/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(15,46,61,0.04)]">
      <div className="h-20 max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between gap-space-md">
        {/* Logo */}
        <div className="flex items-center gap-space-lg">
          <Link to="/" className="flex items-center gap-space-xs">
            <img src={logoSvg} alt="Núcleo Capital" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-space-xs bg-surface-container-low p-1.5 rounded-full">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-label-md text-label-md text-on-surface-variant hover:text-azul px-space-md py-space-xs rounded-full transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-space-sm">
          <a
            href="https://wa.me/51983033938"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-space-xs bg-azul text-white px-space-md py-2.5 rounded-full font-label-md text-label-md hover:shadow-[0_4px_14px_rgba(3,75,165,0.25)] hover:brightness-105 transition-all"
          >
            <span className="material-symbols-outlined text-lg">chat</span>
            <span className="hidden sm:inline font-semibold">Cotizar WhatsApp</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-surface-container-lowest border border-outline-variant/60 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-azul">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-crema border-t border-outline-variant/60 px-gutter-mobile py-space-lg">
          <nav className="flex flex-col gap-space-xs">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-azul hover:bg-surface-container-low transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
