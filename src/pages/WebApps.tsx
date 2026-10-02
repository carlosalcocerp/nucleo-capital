const services = [
  { icon: 'domain', title: 'Páginas web corporativas', text: 'Experiencias institucionales con diseño propio, estructura clara, SEO local y un CMS sencillo para tu equipo.' },
  { icon: 'dataset', title: 'Catálogos digitales B2B', text: 'Productos, fichas técnicas y solicitudes de cotización organizadas para vender mejor por volumen.' },
  { icon: 'install_mobile', title: 'Web Apps y PWA', text: 'Herramientas que funcionan como una app, con paneles, cuentas, notificaciones y operación desde el celular.' },
  { icon: 'integration_instructions', title: 'Integraciones a medida', text: 'Conectamos tu web con WhatsApp Business, formularios, CRM, pagos y los sistemas que ya utilizas.' },
  { icon: 'analytics', title: 'Landing pages de campaña', text: 'Páginas enfocadas en una acción concreta: captar contactos, presentar un proyecto o lanzar un servicio.' },
  { icon: 'support_agent', title: 'Soporte y evolución', text: 'Acompañamiento cercano después del lanzamiento para mantener, medir y mejorar tu plataforma.' },
];

const steps = [
  ['01', 'Descubrimos', 'Aterrizamos objetivos, usuarios, contenido y prioridades del negocio.'],
  ['02', 'Diseñamos', 'Convertimos la estrategia en una interfaz clara, distintiva y fácil de usar.'],
  ['03', 'Construimos', 'Desarrollamos con código limpio, responsive y pruebas antes de publicar.'],
  ['04', 'Lanzamos', 'Publicamos, transferimos accesos y acompañamos a tu equipo en la operación.'],
];

const WebApps = () => (
  <div className="flex w-full flex-col">
    <section className="relative w-full overflow-hidden bg-crema pt-space-3xl shadow-sm lg:pt-[5.5rem]">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(#034ba5_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative mx-auto max-w-[1280px] px-gutter-mobile pb-space-3xl lg:px-gutter-desktop">
        <div className="flex max-w-4xl flex-col gap-space-sm">
          <span className="inline-flex w-fit items-center gap-space-xs rounded-full bg-surface-container-low px-space-md py-space-xs font-label-md text-label-md font-bold uppercase tracking-wider text-azul"><span className="h-2 w-2 animate-pulse rounded-full bg-tertiary" />División digital de Núcleo Capital</span>
          <h1 className="font-display text-headline-lg font-bold leading-tight tracking-tight text-azul lg:text-display">Web &amp; Apps que convierten ideas en <span className="text-tertiary">experiencias útiles.</span></h1>
          <p className="max-w-3xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant">Diseñamos y desarrollamos páginas web, catálogos B2B y plataformas a medida para empresas que necesitan comunicar mejor, vender más y trabajar con menos fricción.</p>
          <div className="flex flex-wrap gap-space-md pt-space-xs">
            <a href="https://wa.me/51983033938?text=Hola%20Nucleo%20Capital,%20quiero%20cotizar%20un%20proyecto%20web" target="_blank" rel="noreferrer" className="inline-flex items-center gap-space-xs rounded-full bg-azul px-space-lg py-space-md font-label-lg text-label-lg font-bold text-white shadow-lg transition hover:bg-azul-dark"><span className="material-symbols-outlined">chat</span> Cotizar proyecto</a>
          </div>
          <div className="flex flex-wrap items-center gap-space-xs pt-space-xs sm:gap-space-sm"><div className="flex items-center gap-1.5 rounded-full bg-surface-container px-space-sm py-1 text-on-surface"><span className="material-symbols-outlined text-base text-azul">devices</span><span className="font-label-md text-label-md">100% responsive</span></div><div className="flex items-center gap-1.5 rounded-full bg-surface-container px-space-sm py-1 text-on-surface"><span className="material-symbols-outlined text-base text-azul">speed</span><span className="font-label-md text-label-md">Rendimiento optimizado</span></div><div className="flex items-center gap-1.5 rounded-full bg-surface-container px-space-sm py-1 text-on-surface"><span className="material-symbols-outlined text-base text-azul">support_agent</span><span className="font-label-md text-label-md">Soporte local</span></div></div>
        </div>
      </div>
    </section>

    <section className="bg-surface-container-low py-space-3xl"><div className="mx-auto max-w-[1280px] px-gutter-mobile lg:px-gutter-desktop"><div className="max-w-2xl"><span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-azul">Soluciones digitales</span><h2 className="mt-space-xs font-headline-lg text-headline-lg font-bold tracking-tight text-azul">La herramienta correcta para cada reto.</h2></div><div className="mt-space-2xl grid gap-space-lg md:grid-cols-2 lg:grid-cols-3">{services.map((service) => <article key={service.title} className="group rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-space-lg shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><span className="flex h-12 w-12 items-center justify-center rounded-lg bg-azul/10 text-azul transition group-hover:bg-azul group-hover:text-white"><span className="material-symbols-outlined text-2xl">{service.icon}</span></span><h3 className="mt-space-lg font-headline-sm text-headline-sm font-bold text-azul">{service.title}</h3><p className="mt-space-xs font-body-md text-body-md text-on-surface-variant">{service.text}</p><span className="mt-space-lg inline-flex items-center gap-1 font-label-md text-label-md font-bold text-azul">Conocer más <span className="material-symbols-outlined text-[17px]">arrow_forward</span></span></article>)}</div></div></section>

    <section className="bg-crema py-space-3xl"><div className="mx-auto max-w-[1280px] px-gutter-mobile lg:px-gutter-desktop"><div className="text-center"><span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-azul">Cómo trabajamos</span><h2 className="mt-space-xs font-headline-lg text-headline-lg font-bold text-azul">De la idea al lanzamiento, sin vueltas.</h2></div><div className="mt-space-2xl grid gap-space-lg md:grid-cols-2 lg:grid-cols-4">{steps.map(([number, title, text]) => <article key={number} className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm"><span className="font-display text-display font-bold leading-none text-surface-container-highest">{number}</span><h3 className="mt-space-md font-title-lg text-title-lg font-bold text-azul">{title}</h3><p className="mt-space-xs font-body-md text-body-md text-on-surface-variant">{text}</p></article>)}</div></div></section>

    <section className="px-gutter-mobile py-space-3xl lg:px-gutter-desktop"><div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-space-xl rounded-2xl bg-gradient-to-br from-azul to-azul-dark p-space-xl text-white shadow-xl lg:flex-row lg:items-center lg:p-space-2xl"><div className="max-w-2xl"><span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-tertiary-fixed">Hablemos de tu próximo proyecto</span><h2 className="mt-space-sm font-headline-lg text-headline-lg font-bold">Una buena idea merece una experiencia a su altura.</h2><p className="mt-space-sm font-body-lg text-body-lg text-blue-100">Cuéntanos qué necesitas y te responderemos con una ruta clara para hacerlo realidad.</p></div><a href="https://wa.me/51983033938?text=Hola%20Nucleo%20Capital,%20quiero%20hablar%20sobre%20un%20proyecto%20digital" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-space-xs rounded-full bg-tertiary px-space-lg py-space-md font-label-lg text-label-lg font-bold text-white transition hover:bg-tertiary-container"><span className="material-symbols-outlined">chat</span> Conversar por WhatsApp</a></div></section>
  </div>
);

export default WebApps;
