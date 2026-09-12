import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import type { Producto } from '../types/product';

const colorMap: Record<string, string> = {
  'Negro Mate': 'bg-[#1A1A1A]',
  'Esmeralda': 'bg-[#003220]',
  'Azul Marino': 'bg-[#0F2E3D]',
  'Marfil': 'bg-[#F4EFE2]',
  'Blanco Clásico': 'bg-[#FFFFFF]',
  'Arena Sillar': 'bg-[#D4C5A9]',
  'Transparente': 'bg-[#E5E7EB]',
  'Ahumado': 'bg-[#6B7280]',
  'Azul Cielo': 'bg-[#38BDF8]',
  'Rojo': 'bg-[#EF4444]',
  'Negro': 'bg-[#1A1A1A]',
  'Plata': 'bg-[#9CA3AF]',
  'Negro Ejecutivo': 'bg-[#1A1A1A]',
  'Café Cognac': 'bg-[#92400E]',
  'Verde Bosque': 'bg-[#065F46]',
  'Blanco': 'bg-[#FFFFFF]',
  'Gris': 'bg-[#6B7280]',
  'Crudo Natural': 'bg-[#F5F0E0]',
  'Negro Orgánico': 'bg-[#1A1A1A]',
  'Gris Carbón': 'bg-[#374151]',
  'Azul Deep Sea': 'bg-[#0F2E3D]',
  'Obsidiana Gold': 'bg-[#1A1A1A]',
  'Esmeralda Imperial': 'bg-[#003220]',
};

const Store = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePrice, setActivePrice] = useState(-1);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, 'productos'),
          where('activo', '==', true)
        );
        const querySnapshot = await getDocs(q);
        const products: Producto[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          products.push({
            id: doc.id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
            imagen: data.imagen,
            categoria: data.categoria,
            tipo: data.tipo,
            stock: data.stock,
            activo: data.activo,
            fechaCreacion: data.fechaCreacion?.toDate() || new Date(),
            moq: data.moq || 25,
            tecnica: data.tecnica || '',
            colores: data.colores || [],
            material: data.material || '',
            capacidad: data.capacidad,
            badge: data.badge,
          });
        });
        // Ordenar por fecha de creación (más recientes primero)
        products.sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime());
        setProductos(products);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(productos.map((p) => p.categoria))];
    return cats.map((c) => ({
      name: c,
      count: productos.filter((p) => p.categoria === c).length,
    }));
  }, [productos]);

  const types = useMemo(() => {
    const t = [...new Set(productos.map((p) => p.tipo))];
    return t.map((t) => ({
      name: t,
      count: productos.filter((p) => p.tipo === t).length,
    }));
  }, [productos]);

  const allColors = useMemo(() => {
    const colors = new Set<string>();
    productos.forEach((p) => p.colores.forEach((c) => colors.add(c)));
    return [...colors];
  }, [productos]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedColors([]);
    setSearchTerm('');
    setActivePrice(-1);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedTypes.length > 0 || selectedColors.length > 0 || searchTerm || activePrice >= 0;

  const filteredProducts = productos.filter((p) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.categoria)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(p.tipo)) return false;
    if (selectedColors.length > 0 && !p.colores.some((c) => selectedColors.includes(c))) return false;
    if (searchTerm && !p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) && !p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (activePrice === 0 && p.precio >= 20) return false;
    if (activePrice === 1 && (p.precio < 20 || p.precio >= 50)) return false;
    if (activePrice === 2 && (p.precio < 50 || p.precio >= 100)) return false;
    if (activePrice === 3 && p.precio < 100) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-crema">
        <div className="flex items-center gap-space-sm">
          <span className="material-symbols-outlined text-azul animate-spin">refresh</span>
          <span className="font-body-lg text-body-lg text-on-surface-variant">Cargando catálogo...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* HERO */}
      <section className="relative w-full bg-crema overflow-hidden shadow-sm">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#034ba5_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="relative max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-xl lg:py-space-2xl">
          <div className="flex flex-col gap-space-sm">
            <div className="inline-flex items-center gap-space-xs bg-surface-container-low text-azul font-label-sm text-label-sm px-space-sm py-1 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-azul animate-pulse"></span>
              TALLER DE PRECISIÓN YANAHUARA • AREQUIPA 2025
            </div>
            <h1 className="font-display text-headline-lg lg:text-display text-azul tracking-tight">
              Catálogo de Merchandising & Productos Corporativos
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-3xl">
              Personalización institucional con grabado láser 360°, serigrafía al tacto, bordado fino en relieve y acabados de lujo ejecutados directamente en nuestro taller propio en Arequipa.
            </p>
            <div className="flex flex-wrap items-center gap-space-xs sm:gap-space-sm pt-space-xs">
              {[
                { icon: 'verified', text: 'Muestras físicas gratis en taller' },
                { icon: 'package_2', text: 'Desde 15 a 25 unidades MOQ' },
                { icon: 'local_shipping', text: 'Despachos a todo el Perú' },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-1.5 bg-surface-container px-space-sm py-1 rounded-full text-on-surface">
                  <span className="material-symbols-outlined text-azul text-base">{badge.icon}</span>
                  <span className="font-label-md text-label-md">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STICKY SEARCH BAR */}
      <section className="w-full bg-surface-container-low shadow-sm sticky top-20 z-30">
        <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xs lg:gap-space-sm items-center">
            <div className="lg:col-span-6 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none">search</span>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-surface-container-lowest rounded-xl text-body-md text-on-surface placeholder:text-outline focus:outline-none shadow-sm focus:shadow-md transition-shadow"
                placeholder="Buscar tomatodos, tazas, libretas, mochilas..."
                type="text"
              />
            </div>
            
            <div className="lg:col-span-2 flex items-center justify-end">
              {hasActiveFilters && (
                <button onClick={clearFilters} className="flex items-center gap-1 text-azul font-label-md text-label-md hover:underline">
                  <span className="material-symbols-outlined text-base">filter_list_off</span>
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT: SIDEBAR + GRID */}
      <main className="w-full max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-start">
          {/* SIDEBAR FILTERS */}
          <aside className="lg:col-span-3 flex flex-col gap-space-md lg:sticky lg:top-44">
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-lg">
              <div className="flex items-center justify-between pb-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-azul text-xl">filter_list</span>
                  <span className="font-title-lg text-title-lg text-azul">Filtros</span>
                </div>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="font-label-sm text-label-sm text-azul hover:underline">Limpiar todo</button>
                )}
              </div>

              {/* Active Tags */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-1.5">
                  {selectedCategories.map((cat) => (
                    <span key={cat} className="inline-flex items-center gap-1 bg-azul/10 text-azul px-2 py-1 rounded-md font-label-sm text-label-sm">
                      {cat}
                      <span className="material-symbols-outlined text-xs cursor-pointer" onClick={() => toggleCategory(cat)}>close</span>
                    </span>
                  ))}
                  {selectedTypes.map((type) => (
                    <span key={type} className="inline-flex items-center gap-1 bg-azul/10 text-azul px-2 py-1 rounded-md font-label-sm text-label-sm">
                      {type}
                      <span className="material-symbols-outlined text-xs cursor-pointer" onClick={() => toggleType(type)}>close</span>
                    </span>
                  ))}
                  {selectedColors.map((color) => (
                    <span key={color} className="inline-flex items-center gap-1 bg-azul/10 text-azul px-2 py-1 rounded-md font-label-sm text-label-sm">
                      {color}
                      <span className="material-symbols-outlined text-xs cursor-pointer" onClick={() => toggleColor(color)}>close</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Categories */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-azul font-bold tracking-wide uppercase">Categoría</span>
                <div className="flex flex-col gap-1 text-body-md text-on-surface pt-1">
                  {categories.map((cat) => (
                    <label key={cat.name} className={`flex items-center justify-between p-1.5 rounded-lg hover:bg-surface cursor-pointer ${selectedCategories.includes(cat.name) ? 'bg-surface/60' : ''}`}>
                      <span className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.name)}
                          onChange={() => toggleCategory(cat.name)}
                          className="w-4 h-4 rounded text-azul accent-azul focus:ring-0"
                        />
                        <span className={selectedCategories.includes(cat.name) ? 'font-medium text-azul' : ''}>{cat.name}</span>
                      </span>
                      <span className="font-label-sm text-label-sm text-outline bg-surface-container px-1.5 py-0.5 rounded">{cat.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Types */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-azul font-bold tracking-wide uppercase">Tipo de Producto</span>
                <div className="flex flex-col gap-1 text-body-md text-on-surface pt-1">
                  {types.map((type) => (
                    <label key={type.name} className={`flex items-center justify-between p-1.5 rounded-lg hover:bg-surface cursor-pointer ${selectedTypes.includes(type.name) ? 'bg-surface/60' : ''}`}>
                      <span className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type.name)}
                          onChange={() => toggleType(type.name)}
                          className="w-4 h-4 rounded text-azul accent-azul focus:ring-0"
                        />
                        <span className={selectedTypes.includes(type.name) ? 'font-medium text-azul' : ''}>{type.name}</span>
                      </span>
                      <span className="font-label-sm text-label-sm text-outline bg-surface-container px-1.5 py-0.5 rounded">{type.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-azul font-bold tracking-wide uppercase">Colores</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {allColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => toggleColor(color)}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border transition-all ${
                        selectedColors.includes(color)
                          ? 'border-azul bg-azul/10 text-azul'
                          : 'border-outline-variant/50 bg-surface-container-lowest text-on-surface-variant hover:border-azul/50'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${colorMap[color] || 'bg-gray-400'} shadow-sm border border-outline-variant/30`}></span>
                      <span className="font-label-sm text-label-sm">{color}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Help Card */}
              <div className="bg-surface-container p-space-md rounded-xl flex flex-col gap-space-xs mt-space-xs">
                <div className="flex items-center gap-1.5 text-azul">
                  <span className="material-symbols-outlined text-lg">architecture</span>
                  <span className="font-label-md text-label-md font-bold uppercase tracking-wide">¿Proyecto a Medida?</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-snug">
                  Desarrollamos prototipos únicos desde cero en nuestro taller.
                </p>
                <a href="https://wa.me/51983033938" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-azul hover:text-azul-dark font-label-md text-label-md font-bold pt-1">
                  Consultar con Taller
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID */}
          <section className="lg:col-span-9 flex flex-col gap-space-lg">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant">
                Mostrando <strong className="text-azul">{filteredProducts.length}</strong> de <strong>{productos.length}</strong> productos
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-space-3xl bg-surface-container-lowest rounded-2xl shadow-sm">
                <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-space-md block">inventory_2</span>
                <p className="font-body-lg text-body-lg text-on-surface-variant">No se encontraron productos.</p>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="mt-space-md text-azul font-label-md text-label-md hover:underline">Limpiar filtros</button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-lg">
                {filteredProducts.map((producto, index) => (
                  <motion.div
                    key={producto.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div className="block bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                      <div className="relative w-full h-52 bg-surface-container-low overflow-hidden">
                        <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        {producto.badge && (
                          <span className="absolute top-3 left-3 bg-azul text-white px-space-xs py-0.5 rounded-full font-label-sm text-label-sm font-bold shadow-sm">
                            {producto.badge}
                          </span>
                        )}
                        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-azul font-label-sm text-label-sm px-2 py-1 rounded-lg shadow-sm flex items-center gap-1 font-semibold">
                          <span className="material-symbols-outlined text-xs">inventory_2</span>
                          MOQ: {producto.moq}u
                        </div>
                      </div>
                      <div className="p-space-md flex flex-col gap-space-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm text-azul uppercase font-bold tracking-wider">{producto.categoria}</span>
                          <span className="font-label-sm text-label-sm text-outline">{producto.tipo}</span>
                        </div>
                        <h3 className="font-title-lg text-title-lg text-azul group-hover:text-azul-dark transition-colors leading-snug">{producto.nombre}</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{producto.descripcion}</p>
                        <div className="flex items-center gap-1 flex-wrap">
                          <span className="bg-surface-container text-azul font-label-sm text-[10px] px-1.5 py-0.5 rounded">{producto.tecnica}</span>
                          {producto.colores.length > 0 && (
                            <div className="flex items-center gap-0.5 ml-auto">
                              {producto.colores.slice(0, 3).map((c, i) => (
                                <span key={i} className={`w-3 h-3 rounded-full ${colorMap[c] || 'bg-gray-400'} shadow-sm border border-white`}></span>
                              ))}
                              {producto.colores.length > 3 && (
                                <span className="font-label-sm text-[10px] text-outline ml-0.5">+{producto.colores.length - 3}</span>
                              )}
                            </div>
                          )}
                        </div>
                         <div className="pt-space-xs flex items-center gap-space-xs border-t border-outline-variant/30">
                           <Link
                             to={`/producto/${producto.id}`}
                             className="flex-1 text-center bg-azul text-white px-space-sm py-2 rounded-lg font-label-md text-label-md font-semibold hover:bg-azul-dark hover:scale-[1.02] active:scale-95 transition-all animate-[bounce_2s_ease-in-out_infinite] text-xs"
                           >
                             Ver detalle
                           </Link>
                           <a
                             href={`https://wa.me/51983033938?text=${encodeURIComponent(`Hola, deseo consultar por ${producto.nombre}.`)}`}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="flex-1 text-center border border-azul text-azul px-space-sm py-2 rounded-lg font-label-md text-label-md font-semibold hover:bg-azul hover:text-white hover:scale-[1.02] active:scale-95 transition-all animate-[bounce_2s_ease-in-out_infinite] text-xs"
                           >
                             Consultar
                           </a>
                         </div>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      
      {/* BOTTOM CTA */}
      <section className="w-full bg-surface-container-high">
        <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-2xl">
          <div className="bg-azul text-white rounded-3xl p-space-xl lg:p-space-2xl relative overflow-hidden shadow-xl">
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
              <div className="lg:col-span-8 flex flex-col gap-space-sm">
                <div className="inline-flex items-center gap-2 text-tertiary-fixed font-label-sm text-label-sm font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-base">support_agent</span>
                  Laboratorio de Pre-prensa & Diseño
                </div>
                <h2 className="font-headline-lg text-headline-lg text-white leading-tight">¿Cuentas con tu logotipo en vector o boceto preliminar?</h2>
                <p className="font-body-lg text-body-lg text-white/80 max-w-2xl">Nuestro equipo genera tu muestra digital fotorrealista en menos de 2 horas hábiles, sin costo.</p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-space-sm items-stretch">
                <a href="https://wa.me/51983033938" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-space-xs bg-white text-azul py-3.5 px-space-lg rounded-xl font-headline-sm text-title-lg shadow-lg hover:bg-crema transition-all text-center font-bold">
                  <span className="material-symbols-outlined text-xl">send</span>
                  Enviar Logotipo para Mockup
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Store;
