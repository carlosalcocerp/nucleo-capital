import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
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

const crossSellProducts = [
  {
    name: 'Cuaderno Smart Bamboo A5',
    section: 'Papelería Premium',
    desc: 'Hojas ecológicas y tapa dura con placa metálica',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDURcfMIVqLuoM5De7hOAKtCQcUCw_hiwake6R3JyBzmFHu7H5-Bv33-RoHm0qyvrD3iAjlMj8UqkskNS7OkiwzQ2GTY399Ib7K7o8KT_NXbGB4nYID64IJA4lzVgvQF616jL6BLYpix3ES06ejK5xAXGyDDpQ8LQGPK4knloHeZUwAWLUaooUqrVk5yxKikkMYEZD2-JQm_YaH_DPfVBH1eiGb-0SnHr7SW_Dp0bqELHA0-Y4FuALqeQ',
  },
  {
    name: 'Caja Box Imantada de Lujo',
    section: 'Presentación de Lujo',
    desc: 'Espuma troquelada a medida y stamping metálico',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCe6Lc-DUXMKVKOWC9fJXE7xt2L4QPSmL3vn42peDulVjxTVfPzby6litV2FPvnOlg_gnB0RkFRrnGWFJoLv_SUEoMXXiMLwD8OYqo3vC46liXzqRap3sn1Lw7narQyZCr6m9hSTLpKCl2in34ZPl3j5F_XpcrauD05e1jjL8lKI-C4aeM5Fyg5mVoqdHEgKtRPgnf2FhoxDklnF0Z_tIaQVDZ0YQCt7pFDe-zanHmDIJtgwGeD84wjCA',
  },
  {
    name: 'Bolígrafo Rollerball Metal',
    section: 'Escritura Ejecutiva',
    desc: 'Tinta gel alemana de trazo ultra suave y peso balanceado',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6mVOXtDzPPRY58q0ZG8AF5bw59HlWyhxAI_EqjY4p7NKjrZsLQzxe0GAPLH-pCaAl_Ti02TcuEYsrQ1GV5OrKwmFj_bJcpmDLBDXFh4tpnfHCKaD-i5_49NUas8BauwUo7BiozecJhRv1yMYQAVI4ozwrmyUOc04i3xpeTy91UrNCvx-v6GwtyL07EG3MNE-3ibzDmlJzbXkYzTRics1D4oT23XV67n9Tp9eb_rlmq7_zxW_R611g7Q',
  },
  {
    name: 'Mochila Porta Laptop Cóndor',
    section: 'Textil & Transporte',
    desc: 'Polyester balístico hidrófugo con puerto USB integrado',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtKVF4Q1KpYV1dcC-7aUtw3leDVBfm2GS5iRT8llw0VepYLY-BTO51aD4WOncTcf8vtYwlXUn6DxlnMoeQn0RLUM36AeC23bPvqlHzDZRojdlgsOLNDoGDvNYIGereFz-zofFDANiiKNCpYOPafbVlrHwAXQdEKzu9IvlbkmNp3S6i2DX7cUXi2aPfD0kwgV7tBtmaiZXQKfO0e4QP0sZFw8OAUQPIuj2XJOcnAQnUGMoYcgJFanBQZg',
  },
];

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'craft' | 'shipping'>('specs');
  const [showMockupModal, setShowMockupModal] = useState(false);
  const [logoFileName, setLogoFileName] = useState('');

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
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const whatsappMsg = `Hola Núcleo Capital Arequipa, deseo cotizar formalmente ${quantity} unidades del ${producto.nombre} en color ${producto.colores[selectedColor] || 'estándar'}.`;
  const whatsappUrl = `https://wa.me/51983033938?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="bg-crema min-h-screen">
      {/* BREADCRUMB */}
      <div className="max-w-[1280px] mx-auto w-full px-gutter-mobile lg:px-gutter-desktop py-space-md lg:py-space-lg">
        <nav className="flex items-center gap-space-xs text-body-md text-on-surface-variant mb-space-lg overflow-x-auto pb-space-2xs whitespace-nowrap">
          <Link to="/tienda" className="flex items-center gap-1 hover:text-azul transition-colors font-medium">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Catálogo Merchandising</span>
          </Link>
          <span className="material-symbols-outlined text-sm text-outline-variant">chevron_right</span>
          <span className="hover:text-azul transition-colors">{producto.categoria}</span>
          <span className="material-symbols-outlined text-sm text-outline-variant">chevron_right</span>
          <span className="text-azul font-semibold truncate">{producto.nombre}</span>
        </nav>

        {/* TOP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* LEFT: GALLERY */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-7 flex flex-col gap-space-lg">
            <div className="relative bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden group">
              <div className="absolute top-space-md left-space-md z-10 flex flex-wrap gap-space-xs">
                {producto.badge && (
                  <span className="bg-azul text-white px-space-sm py-1 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-sm text-tertiary-fixed">verified</span>
                    {producto.badge}
                  </span>
                )}
              </div>
              <div className="relative w-full aspect-[4/3] bg-surface-container-low flex items-center justify-center overflow-hidden">
                <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>

            {/* Warranty Badge */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col sm:flex-row items-center gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-azul flex items-center justify-center shrink-0 shadow-[0_2px_10px_rgba(3,75,165,0.2)]">
                <span className="material-symbols-outlined text-white text-2xl">verified_user</span>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-title-lg text-title-lg text-azul">Garantía Directa de Taller en Yanahuara</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Generamos tu mockup 3D fotorrealista con tu logo en menos de 2 horas. Solicita una muestra física previa para tu orden corporativa.</p>
              </div>
              <span className="inline-flex items-center gap-1 bg-surface-container-low text-azul font-label-sm text-label-sm px-space-sm py-1 rounded-full font-semibold shrink-0">
                <span className="material-symbols-outlined text-xs">timer</span>
                Entrega Arequipa 48h
              </span>
            </div>
          </motion.div>

          {/* RIGHT: CONFIGURATOR */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-5 flex flex-col gap-space-lg">
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

              {/* 4. Logo Upload */}
              <label className="p-space-md rounded-xl bg-surface-container-lowest border-2 border-dashed border-outline-variant hover:border-azul transition-all cursor-pointer text-center group block">
                <input type="file" accept=".ai,.pdf,.svg,.png" className="hidden" onChange={(e) => { if (e.target.files?.[0]) setLogoFileName(e.target.files[0].name); }} />
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-azul text-2xl group-hover:scale-110 transition-transform">cloud_upload</span>
                  <span className="font-label-md text-label-md font-semibold text-azul">{logoFileName ? `✓ Archivo adjunto: ${logoFileName}` : 'Adjunta tu logotipo (AI, PDF, SVG, PNG)'}</span>
                  <span className="font-label-sm text-[11px] text-outline">Para generar tu maqueta digital fotorrealista 3D sin costo</span>
                </div>
              </label>

              {/* CTAs */}
              <div className="flex flex-col gap-space-xs">
                <button onClick={() => setShowMockupModal(true)} className="w-full bg-azul text-white py-space-sm px-space-lg rounded-xl font-label-md text-label-md font-bold flex items-center justify-center gap-space-xs hover:bg-azul-dark transition-all shadow-sm">
                  <span className="material-symbols-outlined text-xl">view_in_ar</span>
                  Solicitar Mockup Digital 3D (En 2 Horas)
                </button>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-surface-container text-azul py-space-sm px-space-lg rounded-xl font-label-md text-label-md font-semibold flex items-center justify-center gap-space-xs hover:bg-surface-container-high transition-all border border-outline-variant/30">
                  <span className="material-symbols-outlined text-xl">chat</span>
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

        {/* TABS */}
        <div className="mt-space-3xl flex flex-col gap-space-lg">
          <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs border-b border-outline-variant/30">
            {([
              { key: 'specs', label: 'Especificaciones Técnicas' },
              { key: 'craft', label: 'Técnicas de Personalización' },
              { key: 'shipping', label: 'Logística & Despacho' },
            ] as const).map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`font-label-md text-label-md px-space-lg py-space-sm rounded-full transition-all whitespace-nowrap ${activeTab === tab.key ? 'bg-azul text-white font-bold' : 'text-on-surface-variant hover:text-azul font-medium'}`}>
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'specs' && (
            <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm">
              <h2 className="font-headline-sm text-headline-sm text-azul mb-space-md">Ficha de Producto</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
                <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Categoría</span>
                  <span className="font-title-lg text-title-lg text-azul font-bold">{producto.categoria}</span>
                </div>
                <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Tipo</span>
                  <span className="font-title-lg text-title-lg text-azul font-bold">{producto.tipo}</span>
                </div>
                <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Material</span>
                  <span className="font-title-lg text-title-lg text-azul font-bold">{producto.material}</span>
                </div>
                {producto.capacidad && (
                  <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Capacidad</span>
                    <span className="font-title-lg text-title-lg text-azul font-bold">{producto.capacidad}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'craft' && (
            <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm">
              <span className="font-label-sm text-label-sm text-azul font-bold uppercase tracking-wider">Taller Yanahuara • Precisión CNC</span>
              <h2 className="font-headline-sm text-headline-sm text-azul mt-1 mb-space-md">Tecnología de Grabado Láser de Fibra Óptica</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">Nuestro taller cuenta con estaciones de fibra óptica de estado sólido con haz concentrado de 1064nm.</p>
              <ul className="flex flex-col gap-space-xs font-body-md text-body-md text-on-surface">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-azul text-lg mt-0.5">check_circle</span>
                  <span><strong>Resolución Milimétrica:</strong> Reproducción fiel de isotipos con líneas tan finas como 0.1 mm.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-azul text-lg mt-0.5">check_circle</span>
                  <span><strong>Permanencia Indeleble:</strong> Remoción selectiva del powder coating revelando el acero quirúrgico brillante.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-azul text-lg mt-0.5">check_circle</span>
                  <span><strong>Capacidad de Producción:</strong> Más de 1,200 piezas grabadas por turno en nuestro propio taller.</span>
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm">
              <span className="font-label-sm text-label-sm text-azul font-bold uppercase tracking-wider">Cadena de Suministro Directa</span>
              <h2 className="font-headline-sm text-headline-sm text-azul mt-1 mb-space-md">Plazos de Entrega y Embalaje</h2>
              <div className="flex flex-col gap-space-md">
                <div className="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-md">
                  <span className="material-symbols-outlined text-azul text-2xl mt-0.5">apartment</span>
                  <div>
                    <h4 className="font-title-lg text-title-lg text-azul">Arequipa Metropolitana • 48 a 72 Horas</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">Entrega directa en oficinas corporativas con movilidad propia.</p>
                  </div>
                </div>
                <div className="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-md">
                  <span className="material-symbols-outlined text-azul text-2xl mt-0.5">terrain</span>
                  <div>
                    <h4 className="font-title-lg text-title-lg text-azul">Campamentos Mineros & Corredor Sur • 3 a 5 Días</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">Despacho con embalaje paletizado hacia Moquegua, Cusco, Tacna y Puno.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {crossSellProducts.map((p) => (
              <div key={p.name} className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="aspect-square rounded-lg overflow-hidden bg-surface-container-low mb-space-sm">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-outline">{p.section}</span>
                  <h4 className="font-title-lg text-title-lg text-azul text-base">{p.name}</h4>
                  <p className="font-label-sm text-on-surface-variant text-[12px] mb-2">{p.desc}</p>
                  <div className="flex items-baseline justify-between pt-space-xs border-t border-outline-variant/30">
                    <button className="text-azul hover:text-azul-dark font-label-sm text-label-sm font-semibold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-sm">add_circle</span> Añadir al Pack
                    </button>
                  </div>
                </div>
              </div>
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

      {/* MOCKUP MODAL */}
      {showMockupModal && (
        <div className="fixed inset-0 z-50 bg-azul/60 backdrop-blur-sm flex items-center justify-center p-space-md">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-space-xl shadow-2xl relative flex flex-col gap-space-md">
            <button onClick={() => setShowMockupModal(false)} className="absolute top-space-md right-space-md text-outline hover:text-azul">
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            <div className="flex items-center gap-space-xs">
              <div className="w-10 h-10 rounded-xl bg-azul/10 text-azul flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">view_in_ar</span>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-azul font-bold">Solicitar Mockup 3D Gratuito</h3>
                <span className="font-label-sm text-label-sm text-azul">Diseño en 3D listo en menos de 2 horas hábiles</span>
              </div>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert('¡Solicitud enviada! Te contactaremos en menos de 2 horas.'); setShowMockupModal(false); }} className="flex flex-col gap-space-sm">
              <div>
                <label className="block font-label-sm text-label-sm text-azul font-semibold mb-1">Nombre y Apellido</label>
                <input className="w-full bg-surface-container-low p-2.5 rounded-lg text-body-md text-azul focus:outline-none focus:ring-1 focus:ring-azul" placeholder="Ej. Carlos Ramos" required />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-azul font-semibold mb-1">Empresa o Institución</label>
                <input className="w-full bg-surface-container-low p-2.5 rounded-lg text-body-md text-azul focus:outline-none focus:ring-1 focus:ring-azul" placeholder="Ej. Corporación Minera del Sur S.A.A." required />
              </div>
              <div className="grid grid-cols-2 gap-space-sm">
                <div>
                  <label className="block font-label-sm text-label-sm text-azul font-semibold mb-1">Correo Corporativo</label>
                  <input type="email" className="w-full bg-surface-container-low p-2.5 rounded-lg text-body-md text-azul focus:outline-none focus:ring-1 focus:ring-azul" placeholder="compras@empresa.pe" required />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-azul font-semibold mb-1">WhatsApp</label>
                  <input type="tel" className="w-full bg-surface-container-low p-2.5 rounded-lg text-body-md text-azul focus:outline-none focus:ring-1 focus:ring-azul" placeholder="+51 983 033 938" required />
                </div>
              </div>
              <button type="submit" className="w-full bg-azul text-white py-space-sm rounded-xl font-label-md text-label-md font-bold flex items-center justify-center gap-2 hover:bg-azul-dark transition-all">
                <span className="material-symbols-outlined text-lg">send</span>
                Generar y Enviar a mi WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
