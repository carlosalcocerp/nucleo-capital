import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, doc, getDocs, getDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { mockProducts } from '../data/mockProducts';
import type { Producto } from '../types/product';

const colorMap: Record<string, string> = {
  'Negro Mate': 'bg-[#1A1A1A]',
  'Esmeralda': 'bg-[#003220]',
  'Azul Marino': 'bg-[#0F2E3D]',
  'Marfil': 'bg-[#F4EFE2]',
  'Obsidiana Gold': 'bg-[#1A1A1A]',
  'Esmeralda Imperial': 'bg-[#003220]',
  'Gris Melange': 'bg-[#9CA3AF]',
  'Verde Botella': 'bg-[#003220]',
  'Crudo Natural': 'bg-[#F5F0E0]',
  'Negro Orgánico': 'bg-[#1A1A1A]',
  'Verde Aurora': 'bg-[#003220]',
  'Negro Azabache': 'bg-[#0A0A0A]',
  'Azul Deep Sea': 'bg-[#0F2E3D]',
  'Gris Carbón': 'bg-[#374151]',
  'Arena Sillar': 'bg-[#D4C5A9]',
  'Pizarra Volcánica': 'bg-[#374151]',
  'Navy': 'bg-[#0F2E3D]',
  'Teal': 'bg-[#0D9488]',
  'Negro': 'bg-[#1A1A1A]',
  'Bambú Natural': 'bg-[#C4A35A]',
};

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [crossSellProducts, setCrossSellProducts] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'productos', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProducto({
            id: docSnap.id,
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
          });
        } else {
          console.error('Producto no encontrado en Firestore');
          setProducto(null);
        }
      } catch (error) {
        console.error('Error al cargar producto de Firestore:', error);
        setProducto(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const snapshot = await getDocs(query(collection(db, 'productos'), where('activo', '==', true)));
        const products = snapshot.docs
          .filter((productDoc) => productDoc.id !== id)
          .map((productDoc) => {
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
          })
          .sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime())
          .slice(0, 4);

        setCrossSellProducts(products.length > 0 ? products : mockProducts.filter((product) => product.id !== id).slice(0, 4));
      } catch (error) {
        console.error('Error al cargar productos relacionados:', error);
        setCrossSellProducts(mockProducts.filter((product) => product.id !== id).slice(0, 4));
      }
    };

    fetchRelatedProducts();
  }, [id]);

  useEffect(() => {
    if (!isImageOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsImageOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isImageOpen]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-crema">
        <div className="flex items-center gap-space-sm">
          <span className="material-symbols-outlined text-azul animate-spin">refresh</span>
          <span className="font-body-lg text-body-lg text-on-surface-variant">Cargando producto...</span>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-crema">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-space-md block">search_off</span>
          <h2 className="font-headline-md text-headline-md text-azul font-bold mb-space-sm">Producto no encontrado</h2>
          <Link to="/tienda" className="inline-flex items-center gap-space-xs text-azul font-label-md text-label-md hover:underline">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  const whatsappMsg = `Hola Nucleo Capital SRL, deseo cotizar formalmente ${quantity} unidades del ${producto.nombre} en color ${producto.colores[selectedColor] || 'estándar'}.`;
  const whatsappUrl = `https://wa.me/51983033938?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="bg-crema min-h-screen">
      {/* BREADCRUMB */}
      <div className="max-w-[1280px] mx-auto w-full px-gutter-mobile lg:px-gutter-desktop py-space-md lg:py-space-lg">
        <nav className="flex items-center gap-space-xs text-body-md text-on-surface-variant mb-space-lg overflow-x-auto pb-space-2xs whitespace-nowrap">
          <Link to="/tienda" className="flex items-center gap-1 hover:text-azul transition-colors font-medium">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Productos de merchandising</span>
          </Link>
          <span className="material-symbols-outlined text-sm text-outline-variant">chevron_right</span>
          <span className="hover:text-azul transition-colors">{producto.categoria}</span>
          <span className="material-symbols-outlined text-sm text-outline-variant">chevron_right</span>
          <span className="text-azul font-semibold truncate">{producto.nombre}</span>
        </nav>

        {/* TOP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* LEFT: GALLERY */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="order-2 flex flex-col gap-space-lg lg:order-2 lg:col-span-7">
            <div className="relative rounded-xl bg-white shadow-sm overflow-hidden group">
              <div className="absolute top-space-md left-space-md z-10 flex flex-wrap gap-space-xs">
                {producto.badge && (
                  <span className="bg-azul text-white px-space-sm py-1 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-sm text-tertiary-fixed">verified</span>
                    {producto.badge}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsImageOpen(true)}
                className="relative flex w-full items-center justify-center overflow-hidden bg-white cursor-zoom-in"
                aria-label={`Ampliar imagen de ${producto.nombre}`}
              >
                <img src={producto.imagen} alt={producto.nombre} className="block h-auto max-h-[75svh] w-full object-contain" />
                <span className="absolute bottom-space-sm right-space-sm flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="material-symbols-outlined">zoom_in</span>
                </span>
              </button>
            </div>

          </motion.div>

          {/* RIGHT: CONFIGURATOR */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="order-1 flex flex-col gap-space-lg lg:order-1 lg:col-span-5">
            {/* Product Header */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-sm">
              <span className="font-label-sm text-label-sm text-azul font-semibold uppercase tracking-wider">{producto.categoria} • {producto.tipo}</span>
              <h1 className="font-headline-md text-headline-md text-azul font-bold">{producto.nombre}</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">{producto.descripcion}</p>
              <div className="flex flex-wrap gap-space-xs pt-space-xs">
                <span className="bg-surface-container text-azul font-label-sm text-label-sm px-space-xs py-1 rounded-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">category</span> {producto.material}
                </span>
                {producto.capacidad && (
                  <span className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-space-xs py-1 rounded-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">water_drop</span> {producto.capacidad}
                  </span>
                )}
                <span className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-space-xs py-1 rounded-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">local_shipping</span> Despacho Sur Express
                </span>
              </div>
            </div>

            {/* Configurator */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg">
              {/* 1. Color */}
              {producto.colores.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-title-lg text-title-lg text-azul text-sm font-semibold">1. Color de Cuerpo:</span>
                    <span className="font-label-sm text-label-sm font-bold text-azul">{producto.colores[selectedColor]}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-space-xs">
                    {producto.colores.map((color, i) => (
                      <button key={i} onClick={() => setSelectedColor(i)} className={`flex flex-col items-center gap-1.5 p-space-xs rounded-lg text-center transition-all ${selectedColor === i ? 'bg-azul text-white' : 'bg-surface-container hover:bg-surface-container-high'}`}>
                        <span className={`w-6 h-6 rounded-full ${colorMap[color] || 'bg-gray-400'} shadow-inner border border-outline-variant/30`}></span>
                        <span className={`font-label-sm text-[11px] truncate w-full ${selectedColor === i ? 'text-white font-semibold' : 'text-on-surface-variant'}`}>{color}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md font-semibold text-azul">Cantidad de unidades:</span>
                  <div className="flex items-center bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-surface-container transition-colors text-azul font-bold text-lg">−</button>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} min={1} className="w-16 text-center font-bold text-azul text-body-md bg-transparent focus:outline-none" />
                    <button onClick={() => setQuantity(quantity + 25)} className="w-8 h-8 flex items-center justify-center hover:bg-surface-container transition-colors text-azul font-bold text-lg">+</button>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-space-xs">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-cta w-full bg-[#25D366] text-white py-space-sm px-space-lg rounded-xl font-label-md text-label-md font-bold flex items-center justify-center gap-space-xs hover:bg-[#20bd5a] transition-all border border-[#1da851] shadow-md hover:shadow-lg active:scale-95">
                  <svg className="whatsapp-cta__icon h-6 w-6" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.53 0 .2 5.33.2 11.88c0 2.09.55 4.13 1.59 5.92L.1 24l6.34-1.66a11.87 11.87 0 0 0 5.64 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.18-1.24-6.16-3.45-8.41Zm-8.44 18.27h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.76.99 1-3.67-.23-.38a9.87 9.87 0 0 1-1.51-5.22C2.18 6.43 6.62 2 12.08 2a9.83 9.83 0 0 1 7 2.9 9.86 9.86 0 0 1 2.9 7.01c0 5.46-4.44 9.89-9.9 9.89Zm5.42-7.4c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.86 1.22 3.06c.15.2 2.1 3.21 5.08 4.5.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35Z" />
                  </svg>
                  Cotizar Directo por WhatsApp
                </a>
              </div>
              <div className="flex items-center justify-center gap-space-md text-outline font-label-sm text-label-sm pt-space-2xs flex-wrap">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-azul">bolt</span> Respuesta en &lt;15 min</span>
                <span>•</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-azul">local_shipping</span> Guía Remisión AQP</span>
                <span>•</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-azul">receipt_long</span> Factura Electrónica</span>
              </div>
            </div>
          </motion.div>
        </div>

        {isImageOpen && (
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-gutter-mobile backdrop-blur-sm lg:p-gutter-desktop"
            role="dialog"
            aria-modal="true"
            aria-label={`Imagen ampliada de ${producto.nombre}`}
            onClick={() => setIsImageOpen(false)}
          >
            <div className="relative max-h-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
              <img src={producto.imagen} alt={producto.nombre} className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain shadow-2xl" />
              <button
                type="button"
                onClick={() => setIsImageOpen(false)}
                className="absolute right-space-sm top-space-sm flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black"
                aria-label="Cerrar imagen ampliada"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
        )}

        {/* CROSS-SELLING */}
        <div className="mt-space-3xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-lg">
            <div>
              <span className="font-label-sm text-label-sm text-azul font-bold uppercase tracking-wider">Kits de Bienvenida Corporativos</span>
              <h2 className="font-headline-sm text-headline-sm text-azul">Combina este producto en un Pack Onboarding VIP</h2>
            </div>
            <Link to="/tienda" className="inline-flex items-center gap-1 text-azul font-label-md text-label-md font-semibold hover:underline">
              Ver todos los productos <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="flex snap-x snap-mandatory gap-space-lg overflow-x-auto pb-space-sm">
             {crossSellProducts.map((p, index) => (
               <motion.article key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.06 }} viewport={{ once: true }} className="group flex w-[85%] flex-none snap-start flex-col overflow-hidden rounded-xl border border-outline-variant/70 bg-surface-container-lowest shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg sm:w-[48%] lg:w-[calc((100%-4.5rem)/4)]">
                 <Link to={`/producto/${p.id}`} className="flex h-full flex-col">
                   <div className="relative aspect-square overflow-hidden bg-surface-container-low"><img src={p.imagen} alt={p.nombre} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />{p.badge && <span className="absolute left-space-sm top-space-sm rounded-full bg-azul px-space-sm py-1 font-label-sm text-label-sm font-bold text-white">{p.badge}</span>}</div>
                   <div className="flex flex-1 flex-col p-space-md"><span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-outline">{p.categoria}</span><h3 className="mt-space-2xs font-title-lg text-title-lg font-bold leading-tight text-azul">{p.nombre}</h3><p className="mt-space-xs line-clamp-3 font-body-sm text-body-sm text-on-surface-variant">{p.descripcion}</p><span className="mt-auto flex items-center gap-1 pt-space-md font-label-md text-label-md font-bold text-azul">Ver producto <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span></span></div>
                 </Link>
               </motion.article>
             ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-space-2xl bg-azul text-white rounded-2xl p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg shadow-md">
          <div className="flex flex-col gap-1 max-w-xl text-center md:text-left">
            <span className="font-label-sm text-label-sm text-tertiary-fixed font-bold uppercase tracking-wider">Atención para Gerencias de Compras</span>
            <h3 className="font-headline-sm text-headline-sm text-white">¿Necesitas una muestra física presencial en Arequipa?</h3>
            <p className="font-body-md text-body-md text-white/80">Coordinamos la visita de un asesor corporativo con el muestrario completo de acabados y técnicas directamente a tus oficinas.</p>
          </div>
          <a href="https://wa.me/51983033938?text=Hola,%20solicito%20una%20visita%20corporativa%20con%20muestrario" target="_blank" rel="noopener noreferrer" className="bg-tertiary-fixed text-azul px-space-lg py-space-sm rounded-xl font-label-md text-label-md font-bold hover:brightness-105 transition-all flex items-center gap-2 shrink-0">
            <span className="material-symbols-outlined text-lg">calendar_month</span>
            Agendar Muestra en Oficina
          </a>
        </div>
      </div>

    </div>
  );
};

export default Product;
