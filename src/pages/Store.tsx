import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import type { Producto } from '../types/product';

const PRODUCT_CATEGORIES = [
  'Artículos de Escritorio',
  'Artículos Médicos y Laboratorio - Antistress',
  'Espejos - Llaveros - Winchas',
  'Lapiceros Ecológicos',
  'Lapiceros Metálicos',
  'Lapiceros Plásticos',
  'Libretas - Posits',
  'Novedades',
  'Sets',
  'Tomatodos - MUG',
  "USB's - Accesorios de Celular",
] as const;

const Store = () => {
  const PRODUCTS_PER_PAGE = 21;
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

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
        });
        // Solo se publican productos pertenecientes a las categorías autorizadas.
        products.sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime());
        setProductos(products.filter((product) => PRODUCT_CATEGORIES.includes(product.categoria as typeof PRODUCT_CATEGORIES[number])));
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return PRODUCT_CATEGORIES.map((c) => ({
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

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSearchTerm('');
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedTypes.length > 0 || searchTerm;

  const filteredProducts = productos.filter((p) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.categoria)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(p.tipo)) return false;
    if (searchTerm && !p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) && !p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, selectedTypes]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-crema">
        <div className="flex items-center gap-space-sm">
          <span className="material-symbols-outlined text-azul animate-spin">refresh</span>
          <span className="font-body-lg text-body-lg text-on-surface-variant">Cargando productos...</span>
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
              Productos de Merchandising & Corporativos
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
                {paginatedProducts.map((producto, index) => (
                  <motion.article
                    key={producto.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-outline-variant/70 bg-surface-container-lowest shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
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
                        <p className="mt-space-xs line-clamp-2 font-body-sm text-body-sm text-on-surface-variant">{producto.descripcion}</p>
                        <span className="mt-space-lg inline-flex w-fit animate-[pulse_3s_ease-in-out_infinite] items-center justify-center gap-1 rounded-lg bg-azul px-space-lg py-2.5 font-label-md text-label-md font-bold text-white shadow-sm transition-all group-hover:bg-azul-dark group-hover:shadow-md">Ver producto <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">arrow_forward</span></span>
                      </div>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            {filteredProducts.length > PRODUCTS_PER_PAGE && (
              <nav className="flex flex-wrap items-center justify-center gap-2 pt-space-md" aria-label="Paginación de productos">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex h-10 items-center gap-1 rounded-lg border border-outline-variant bg-surface-container-lowest px-space-sm font-label-md text-label-md font-bold text-azul transition hover:bg-azul hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-current={currentPage === page ? 'page' : undefined}
                    className={`h-10 min-w-10 rounded-lg px-3 font-label-md text-label-md font-bold transition ${currentPage === page ? 'bg-azul text-white shadow-sm' : 'border border-outline-variant bg-surface-container-lowest text-azul hover:bg-azul/10'}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex h-10 items-center gap-1 rounded-lg border border-outline-variant bg-surface-container-lowest px-space-sm font-label-md text-label-md font-bold text-azul transition hover:bg-azul hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Siguiente
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </nav>
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
