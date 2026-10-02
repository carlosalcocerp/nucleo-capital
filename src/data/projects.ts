export type Project = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  icon: string;
  deliverables: string[];
  results: { value: string; label: string }[];
  gallery: { image: string; caption: string }[];
};

export const projects: Project[] = [
  {
    slug: 'portal-corporativo-andes',
    category: 'Identidad visual',
    title: 'Identidad visual para Andes Mining',
    summary: 'Una identidad gráfica sobria y consistente para comunicar solidez, precisión y experiencia en el sector minero.',
    description: 'Desarrollamos una identidad visual completa para una empresa de servicios mineros. El proyecto articuló estrategia de marca, sistema gráfico y piezas corporativas para lograr una presencia coherente en cada punto de contacto.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=85',
    icon: 'palette',
    deliverables: ['Concepto y dirección de arte', 'Logotipo y sistema visual', 'Manual básico de marca', 'Papelería y piezas corporativas'],
    results: [{ value: '1', label: 'sistema visual unificado' }, { value: '24', label: 'piezas desarrolladas' }, { value: '100%', label: 'aplicación de marca' }],
    gallery: [
      { image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1000&q=85', caption: 'Sistema gráfico y construcción de identidad visual' },
      { image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=1000&q=85', caption: 'Aplicaciones de marca para comunicación corporativa' },
    ],
  },
  {
    slug: 'catalogo-b2b-nucleo',
    category: 'Fotografía comercial',
    title: 'Campaña visual para productos premium',
    summary: 'Fotografía de producto y dirección de arte para presentar una colección con carácter, detalle y deseo.',
    description: 'Creamos una campaña visual para una línea de productos premium, desde la definición del concepto hasta la producción fotográfica y la selección de piezas finales para catálogo, redes y material comercial.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85',
    icon: 'photo_camera',
    deliverables: ['Dirección de arte y estilismo', 'Fotografía de producto', 'Retoque y color profesional', 'Adaptaciones para redes y catálogo'],
    results: [{ value: '38', label: 'fotos finales' }, { value: '4K', label: 'calidad de producción' }, { value: '3', label: 'formatos de campaña' }],
    gallery: [
      { image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85', caption: 'Dirección de arte para fotografía de producto' },
      { image: 'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?auto=format&fit=crop&w=1000&q=85', caption: 'Selección y retoque de imágenes para campaña' },
    ],
  },
  {
    slug: 'kit-onboarding-perumin',
    category: 'Diseño editorial',
    title: 'Dirección de arte para una colección editorial',
    summary: 'Un lenguaje visual cálido y contemporáneo para convertir una colección de piezas en una historia coherente.',
    description: 'Desarrollamos la dirección de arte y las piezas gráficas de una colección editorial, cuidando la composición, la selección tipográfica y la producción de cada fotografía para generar una presentación memorable.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=85',
    icon: 'auto_stories',
    deliverables: ['Dirección de arte y concepto', 'Diseño de piezas editoriales', 'Sesión fotográfica de colección', 'Preparación de archivos para impresión'],
    results: [{ value: '18', label: 'piezas gráficas' }, { value: '2', label: 'formatos editoriales' }, { value: '1', label: 'lenguaje visual' }],
    gallery: [
      { image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85', caption: 'Composición editorial y selección tipográfica' },
      { image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1000&q=85', caption: 'Producción fotográfica de la colección' },
    ],
  },
];
