import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoSvg from '../assets/Logo grande.svg';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio', href: '/' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-crema/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(15,46,61,0.04)]">
      <div className="h-20 max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between gap-space-md">
        {/* Logo */}
        <div className="flex items-center gap-space-lg">
          <Link to="/" className="flex items-center gap-space-xs">
            <img src={logoSvg} alt="Nucleo Capital SRL" className="h-14 w-auto" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:ml-auto lg:flex items-center gap-space-lg">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-label-lg text-lg font-bold uppercase tracking-wide text-on-surface-variant hover:text-azul transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contactanos"
            className="font-label-lg text-lg font-bold uppercase tracking-wide text-on-surface-variant transition-colors duration-150 hover:text-azul"
          >
            Contactanos
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-space-sm lg:ml-space-md">
          <Link
            to="/tienda"
            className="group flex h-12 w-fit items-center justify-between gap-space-sm whitespace-nowrap rounded-full border-2 border-azul bg-azul pl-space-lg pr-1 text-white shadow-sm transition-all hover:border-[#75b847] hover:bg-[#75b847] hover:shadow-[0_4px_14px_rgba(117,184,71,0.3)]"
          >
            <span className="text-center text-lg font-extrabold uppercase leading-none tracking-tight">
              <span className="hidden sm:inline">Catálogo</span>
              <span className="sm:hidden">Catálogo</span>
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-crema text-azul transition-transform group-hover:translate-x-0.5">
              <span className="material-symbols-outlined text-[23px]">arrow_forward</span>
            </span>
          </Link>

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
            <Link
              to="/contactanos"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-space-md py-space-sm text-left font-label-lg text-label-lg text-on-surface-variant transition-all hover:bg-surface-container-low hover:text-azul"
            >
              CONTACTANOS
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
