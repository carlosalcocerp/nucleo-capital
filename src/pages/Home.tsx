import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, getDocs, query, where } from 'firebase/firestore';
import HeroAnimation from '../components/HeroAnimation';
import BrandMarquee from '../components/BrandMarquee';
import { db } from '../firebase';
import type { Producto } from '../types/product';

const logosClientes = Object.entries(import.meta.glob<string>('../assets/clientes/*.svg', {
  eager: true,
  import: 'default',
  query: '?url',
}))
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([path, src], index) => ({
    path,
    src,
    alt: `Cliente ${String(index + 1).padStart(2, '0')}`,
  }));
const logosPorVista = 10;

const servicios = [
  {
    icon: 'local_cafe',
    title: 'Merchandising Corporativo',
    tags: ['Láser', 'Muestras Físicas'],
    desc: 'Tomatodos térmicos con grabado láser, tazas matte, polos de algodón pima, libretas de eco-cuero, lanyards institucionales y pines esmaltados de lujo.',
    linkText: 'Cotizar línea merch',
  },
  {
    icon: 'palette',
    title: 'Publicidad & Branding',
    tags: ['Manual de Marca', 'Material POP'],
    desc: 'Identidad corporativa 360°, manuales de marca para franquicias, rotulado vehicular microperforado, señalética arquitectónica en sillar y acrílico, y stands para ferias.',
    linkText: 'Desarrollar marca',
  },
  {
    icon: 'photo_camera',
    title: 'Fotografía Comercial & Video',
    tags: ['Fotografía de Producto', 'Producciones Gastronómicas'],
    desc: 'Fotografía de producto para ecommerce, producciones gastronómicas para alta cocina mistiana, reels publicitarios cinemáticos y cobertura ejecutiva de directorios.',
    linkText: 'Explorar shooting',
  },
  {
    icon: 'inventory_2',
    title: 'Diseño & Publicidad Impresa',
    tags: ['Foil Dorado / Plata', 'Troquel Especial'],
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
  const [paginaLogos, setPaginaLogos] = useState(0);
  const [productosActivos, setProductosActivos] = useState<Producto[]>([]);
  const productsTrackRef = useRef<HTMLDivElement>(null);
  const productsCount = Math.min(productosActivos.length, 8);
  const productosCarrusel = productosActivos.slice(0, productsCount);
  const productosDuplicados = [...productosCarrusel, ...productosCarrusel];

  useEffect(() => {
    if (logosClientes.length <= logosPorVista) return;

    const intervalId = window.setInterval(() => {
      setPaginaLogos((paginaActual) => (paginaActual + 1) % Math.ceil(logosClientes.length / logosPorVista));
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const inicioLogos = (paginaLogos * logosPorVista) % logosClientes.length;
  const logosVisibles = logosClientes.length > logosPorVista
    ? Array.from({ length: logosPorVista }, (_, index) => logosClientes[(inicioLogos + index) % logosClientes.length])
    : logosClientes;

  useEffect(() => {
    const fetchActiveProducts = async () => {
      try {
        const snapshot = await getDocs(query(collection(db, 'productos'), where('activo', '==', true)));
        const products = snapshot.docs.map((productDoc) => {
          const data = productDoc.data();
          return {
            id: productDoc.id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            imagen: data.imagen,
            categoria: data.categoria,
            tipo: data.tipo,
            activo: data.activo,
            fechaCreacion: data.fechaCreacion?.toDate() || new Date(),
            colores: data.colores || [],
            material: data.material || '',
            capacidad: data.capacidad,
            badge: data.badge,
          } as Producto;
        });

        products.sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime());
        setProductosActivos(products);
      } catch (error) {
        console.error('Error al cargar productos activos:', error);
      }
    };

    fetchActiveProducts();
  }, []);

  useEffect(() => {
    const track = productsTrackRef.current;
    if (!track || productsCount < 2) return;

    const intervalId = window.setInterval(() => {
      const firstCard = track.querySelector<HTMLElement>('[data-product-card]');
      if (!firstCard) return;

      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
      const step = firstCard.getBoundingClientRect().width + gap;
      const loopDistance = step * productsCount;
      const nextScrollLeft = track.scrollLeft + step;

      track.scrollTo({
        left: nextScrollLeft >= loopDistance ? nextScrollLeft - loopDistance : nextScrollLeft,
        behavior: 'smooth',
      });
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [productsCount]);

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
                  Ver todos los productos
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

      {productosActivos.length > 0 && (
        <section className="w-full bg-crema py-space-3xl border-y border-outline-variant/50" id="novedades">
          <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-2xl">
              <div>
                <span className="font-label-sm text-label-sm text-azul uppercase tracking-widest font-bold">Productos actualizados</span>
                <h2 className="font-headline-lg text-headline-lg text-azul tracking-tight mt-space-2xs">Novedades</h2>
              </div>
              <Link to="/tienda" className="inline-flex items-center gap-space-xs text-azul font-label-lg text-label-lg font-bold hover:text-azul-dark transition-colors">
                Ver todos los productos
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>

            <div ref={productsTrackRef} className="flex snap-x snap-mandatory gap-space-lg overflow-x-auto pb-space-sm">
              {productosDuplicados.map((producto, index) => (
                <motion.article
                  key={`${producto.id}-${index}`}
                  data-product-card
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  viewport={{ once: true }}
                  className="group flex w-[85%] flex-none snap-start flex-col overflow-hidden rounded-xl border border-outline-variant/70 bg-surface-container-lowest shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg sm:w-[48%] lg:w-[calc((100%-4.5rem)/4)]"
                >
                  <Link to={`/producto/${producto.id}`} className="flex h-full flex-col">
                    <div className="relative aspect-square overflow-hidden bg-surface-container-low">
                      <img src={producto.imagen} alt={producto.nombre} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      {producto.badge && (
                        <span className="absolute left-space-sm top-space-sm rounded-full bg-azul px-space-sm py-1 font-label-sm text-label-sm font-bold text-white">
                          {producto.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-space-md">
                      <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-outline">{producto.categoria}</span>
                      <h3 className="mt-space-2xs font-title-lg text-title-lg font-bold leading-tight text-azul">{producto.nombre}</h3>
                      <p className="mt-space-xs line-clamp-3 font-body-sm text-body-sm text-on-surface-variant">{producto.descripcion}</p>
                      <span className="mt-auto flex items-center gap-space-2xs pt-space-md font-label-md text-label-md font-bold text-azul">
                        Ver producto
                        <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

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
                  <h3 className="font-title-md text-title-md text-azul font-bold mb-space-xs">{serv.title}</h3>
                  <div className="flex flex-wrap gap-space-2xs mb-space-sm">
                    {serv.tags.map((tag, i) => (
                      <span key={i} className="px-space-xs py-0.5 rounded-full bg-surface-container text-azul font-label-sm text-label-sm font-semibold border border-outline-variant/50">
                        {tag}
                      </span>
                    ))}
                  </div>
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
          <div className="flex flex-wrap items-center justify-center gap-space-md">
            <a
              href="https://wa.me/51983033938?text=Hola%20Nucleo%20Capital%20SRL,%20quisiera%20una%20cotización"
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
               Ver Productos
            </Link>
          </div>
        </div>
      </section>

      {/* MARCAS */}
      <section className="w-full border-y border-white/10 bg-azul py-space-2xl" aria-labelledby="marcas-heading">
        <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
          <div className="mb-space-lg text-center">
            <h2 id="marcas-heading" className="mt-space-2xs flex flex-wrap items-center justify-center gap-space-md font-headline-lg text-headline-lg text-crema">
              <span className="font-black uppercase">Confían</span>
              <span className="font-normal normal-case">EN NÚCLEO</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-space-lg sm:grid-cols-3 lg:grid-cols-5">
            {logosVisibles.map((logo, index) => (
              <motion.div
                key={`${paginaLogos}-${logo.path}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="flex min-h-32 items-center justify-center px-space-sm"
              >
                <img src={logo.src} alt={logo.alt} className="h-auto max-h-24 w-full max-w-[320px] object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
