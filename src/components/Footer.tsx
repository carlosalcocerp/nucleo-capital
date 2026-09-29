import logoSvg from '../assets/Logo grande.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-crema border-t border-outline-variant/60 pt-space-3xl pb-space-2xl text-brand-navy">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl mb-space-3xl">
          {/* Brand */}
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs">
              <img src={logoSvg} alt="Nucleo Capital SRL" className="h-10 w-auto" />
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              Soluciones integrales de alta gama en artículos corporativos, textiles técnicos y merchandising de precisión para marcas y firmas en el sur del país.
            </p>
            <div className="flex items-center gap-space-xs pt-space-xs">
              <span className="material-symbols-outlined text-azul text-lg">verified_user</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Taller Propio & Logística Integral Arequipa</span>
            </div>
          </div>

          {/* Catálogo */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-title-lg text-title-lg text-azul">Catálogo Corporativo</span>
            {['Línea Ejecutiva & Escritorio', 'Textilería Corporativa & EPP', 'Tecnología & Gadgets Premium', 'Drinkware & Botellas Térmicas', 'Kits de Bienvenida & Onboarding'].map((item) => (
              <a key={item} href="/tienda" className="font-body-md text-body-md text-on-surface-variant hover:text-azul transition-colors">{item}</a>
            ))}
          </div>

          {/* Showroom */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-title-lg text-title-lg text-azul">Showroom & Taller</span>
            <div className="flex items-start gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-azul mt-1 w-5 shrink-0 text-lg text-center">location_on</span>
              <span className="font-body-md text-body-md">Galerías Pizarro, Pizarro 308, Arequipa - Perú</span>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-azul w-5 shrink-0 text-lg text-center">phone</span>
              <span className="font-body-md text-body-md">+51 983 033 938</span>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-azul w-5 shrink-0 text-lg text-center">mail</span>
              <span className="font-body-md text-body-md">ventas@nucleocapital.pe</span>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-azul w-5 shrink-0 text-lg text-center">schedule</span>
              <span className="font-body-md text-body-md">Lun - Sáb: 9:00 AM - 8:00 PM</span>
            </div>
          </div>

          {/* Cotizaciones */}
          <div className="flex flex-col gap-space-md">
            <span className="font-title-lg text-title-lg text-azul">Cotizaciones Exclusivas</span>
            <p className="font-body-md text-body-md text-on-surface-variant">Generamos muestras digitales con mockup institucional en menos de 2 horas hábiles.</p>
            <a href="#cotizador" className="bg-azul text-white text-center py-space-sm rounded-xl font-label-md text-label-md hover:bg-azul-dark transition-colors shadow-[0_2px_8px_rgba(3,75,165,0.1)]">
              Abrir Cotizador Online
            </a>
          </div>
        </div>

        <div className="border-t border-outline-variant/60 pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-sm">
          <span className="font-label-sm text-label-sm text-outline">© {new Date().getFullYear()} Nucleo Capital SRL. Todos los derechos reservados.</span>
          <div className="flex flex-wrap items-center justify-center gap-space-md">
            <Link to="/politicas-de-garantia" className="font-label-sm text-label-sm text-outline hover:text-on-surface">Políticas de Garantía</Link>
            <Link to="/terminos-de-servicio" className="font-label-sm text-label-sm text-outline hover:text-on-surface">Términos de Servicio</Link>
            <Link to="/libro-de-reclamaciones" className="font-label-sm text-label-sm text-outline hover:text-on-surface">Libro de Reclamaciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
