import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroAnimation from '../components/HeroAnimation';
import BrandMarquee from '../components/BrandMarquee';

const servicios = [
  {
    icon: 'local_cafe',
    tags: ['Láser de Alta Precisión', 'Muestras Físicas'],
    title: 'Merchandising Corporativo',
    desc: 'Tomatodos térmicos con grabado láser, tazas matte, polos de algodón pima, libretas de eco-cuero, lanyards institucionales y pines esmaltados de lujo.',
    linkText: 'Cotizar línea merch',
  },
  {
    icon: 'palette',
    tags: ['Manual de Marca', 'Material POP'],
    title: 'Publicidad & Branding',
    desc: 'Identidad corporativa 360°, manuales de marca para franquicias, rotulado vehicular microperforado, señalética arquitectónica en sillar y acrílico, y stands para ferias.',
    linkText: 'Desarrollar marca',
  },
  {
    icon: 'photo_camera',
    tags: ['Iluminación Editorial', 'Video 4K'],
    title: 'Fotografía Comercial & Video',
    desc: 'Fotografía de producto para ecommerce, producciones gastronómicas para alta cocina mistiana, reels publicitarios cinemáticos y cobertura ejecutiva de directorios.',
    linkText: 'Explorar shooting',
  },
  {
    icon: 'inventory_2',
    tags: ['Foil Dorado / Plata', 'Troquel Especial'],
    title: 'Diseño & Empaques de Lujo',
    desc: 'Cajas rígidas magnéticas, bolsas biodegradables en papel kraft serigrafiadas, fajas en cartulina importada con hot stamping y kits de bienvenida para ejecutivos.',
    linkText: 'Cotizar empaques',
  },
];

const categorias = [
  { name: 'Artículos de Escritorio', icon: 'desk', detail: 'Soluciones para oficinas que cuidan cada detalle.' },
  { name: 'Artículos Médicos y Laboratorio - Antistress', icon: 'medical_services', detail: 'Obsequios funcionales para equipos y jornadas exigentes.' },
  { name: 'Espejos - Llaveros - Winchas', icon: 'key', detail: 'Accesorios promocionales para llevar tu marca siempre.' },
  { name: 'Lapiceros Ecológicos', icon: 'eco', detail: 'Alternativas responsables para comunicar tus valores.' },
  { name: 'Lapiceros Metálicos', icon: 'edit', detail: 'Escritura ejecutiva con acabados premium.' },
  { name: 'Lapiceros Plásticos', icon: 'ink_pen', detail: 'Clásicos versátiles para campañas de alto alcance.' },
  { name: 'Libretas - Posits', icon: 'menu_book', detail: 'Ideas, reuniones y objetivos en un solo lugar.' },
  { name: 'Novedades', icon: 'auto_awesome', detail: 'Lo último para sorprender a tus clientes y equipos.' },
  { name: 'Sets', icon: 'redeem', detail: 'Combinaciones listas para regalar con intención.' },
  { name: 'Tomatodos - MUG', icon: 'local_drink', detail: 'Hidratación diaria convertida en presencia de marca.' },
  { name: "USB's - Accesorios de Celular", icon: 'devices', detail: 'Tecnología útil para acompañar el trabajo diario.' },
];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="flex flex-col w-full">
      {/* HERO ANIMATION */}
      <HeroAnimation />

      {/* CATEGORIAS */}
      <section className="w-full bg-crema py-space-3xl overflow-hidden border-y border-outline-variant/50" id="categorias">
        <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-space-2xl lg:gap-space-3xl">
            <div className="flex flex-col justify-between gap-space-xl">
              <div>
                <span className="font-label-sm text-label-sm text-azul uppercase tracking-[0.18em] font-bold">Explora nuestra selección</span>
                <h2 className="font-headline-lg text-headline-lg text-azul uppercase tracking-tight mt-space-sm max-w-xl">
                  Encuentra el producto que necesitas
                </h2>
              </div>
              <div className="max-w-sm">
                <div className="flex items-center gap-space-xs text-azul mb-space-sm">
                  <span className="material-symbols-outlined text-[20px]">arrow_downward</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">Categoría destacada</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant min-h-[44px]">{categorias[activeCategory].detail}</p>
                <Link to="/tienda" className="mt-space-lg inline-flex items-center gap-space-sm bg-azul text-white px-space-lg py-space-sm rounded-full font-label-md text-label-md font-bold hover:bg-azul-dark transition-all group">
                  Ver todo el catálogo
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="lg:border-l lg:border-outline-variant lg:pl-space-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-space-xl">
                {categorias.map((categoria, index) => (
                  <button
                    key={categoria.name}
                    type="button"
                    onClick={() => setActiveCategory(index)}
                    onMouseEnter={() => setActiveCategory(index)}
                    className={`group flex items-center gap-space-sm text-left py-space-md border-b border-outline-variant/70 transition-all ${activeCategory === index ? 'text-azul' : 'text-on-surface-variant hover:text-azul'}`}
                  >
                    <span className={`material-symbols-outlined text-[21px] transition-transform ${activeCategory === index ? 'scale-110' : 'group-hover:scale-110'}`}>{categoria.icon}</span>
                    <span className="font-title-lg text-title-lg font-bold leading-tight flex-1">{categoria.name}</span>
                    <span className={`material-symbols-outlined text-[18px] transition-all ${activeCategory === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`}>north_east</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrandMarquee />

      {/* SERVICIOS ESPECIALIZADOS */}
      <section className="w-full py-space-3xl bg-surface-container-low border-y border-outline-variant/50" id="servicios">
        <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl">
            <div>
              <span className="font-label-sm text-label-sm text-azul uppercase tracking-widest font-bold">Líneas de Producción</span>
              <h2 className="font-headline-lg text-headline-lg text-azul tracking-tight mt-space-2xs">
                Servicios Especializados de Taller
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-space-xs md:mt-0">
              Infraestructura industrial propia, dirección de arte contemporánea y control de calidad minucioso bajo los estándares más altos del sur peruano.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
            {servicios.map((serv, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-xl bg-surface-container-lowest border border-outline-variant/70 p-space-lg shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-full bg-azul/10 flex items-center justify-center text-azul mb-space-lg group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[28px]">{serv.icon}</span>
                  </div>
                  <div className="flex flex-wrap gap-space-2xs mb-space-sm">
                    {serv.tags.map((tag, i) => (
                      <span key={i} className="px-space-xs py-0.5 rounded-full bg-surface-container text-azul font-label-sm text-label-sm font-semibold border border-outline-variant/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-title-md text-title-md text-azul font-bold mb-space-xs">{serv.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">{serv.desc}</p>
                </div>
                <div className="pt-space-md mt-space-md">
                  <a href="#cotizador" className="inline-flex items-center gap-space-2xs text-azul font-label-lg text-label-lg hover:text-azul-dark transition-colors font-semibold">
                    {serv.linkText}
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full py-space-3xl bg-crema relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-azul/5 blur-3xl pointer-events-none"></div>
        <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop relative z-10 text-center">
          <div className="inline-flex items-center gap-space-2xs px-space-md py-space-2xs rounded-full bg-surface-container-lowest border border-outline-variant/70 shadow-sm mb-space-md">
            <span className="w-2 h-2 rounded-full bg-azul"></span>
            <span className="font-label-sm text-label-sm text-azul uppercase font-bold tracking-wider">Hablemos Hoy Mismo</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-azul tracking-tight max-w-3xl mx-auto mb-space-md">
            ¿Listo para transformar  la imagen de tu empresa?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-space-xl">
            Agenda una visita a nuestro showroom o conversemos directamente por WhatsApp para preparar tu cotización formal con mockup 3D sin costo.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-space-md">
            <a
              href="https://wa.me/51983033938?text=Hola%20Núcleo%20Capital,%20quisiera%20una%20cotización"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-space-xs px-space-2xl py-space-md rounded-full bg-azul text-white font-label-lg text-label-lg shadow-xl hover:bg-azul-dark transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              Iniciar Chat en WhatsApp
            </a>
            <Link
              to="/tienda"
              className="inline-flex items-center gap-space-xs px-space-2xl py-space-md rounded-full bg-surface-container-lowest border border-outline-variant/70 text-azul font-label-lg text-label-lg shadow-md hover:bg-surface-container-high transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">storefront</span>
              Ver Catálogo de Productos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
