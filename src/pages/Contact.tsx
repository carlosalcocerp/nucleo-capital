import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="min-h-screen bg-crema pt-28 pb-space-3xl">
      <div className="mx-auto max-w-[900px] px-gutter-mobile lg:px-gutter-desktop">
        <Link to="/" className="inline-flex items-center gap-space-xs font-label-md text-label-md font-bold text-azul hover:text-azul-dark">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Volver al inicio
        </Link>

        <header className="mt-space-xl border-b border-outline-variant/70 pb-space-xl">
          <span className="font-label-sm text-label-sm font-bold uppercase tracking-[0.18em] text-azul">Nucleo Capital SRL</span>
          <h1 className="mt-space-sm font-headline-lg text-headline-lg font-bold text-azul">Contáctanos</h1>
          <p className="mt-space-md max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            Estamos listos para ayudarte con tu próximo pedido corporativo.
          </p>
        </header>

        <div className="mt-space-xl grid grid-cols-1 gap-space-lg sm:grid-cols-2">
          <div className="rounded-2xl border border-outline-variant/70 bg-surface-container-lowest p-space-xl shadow-sm">
            <span className="material-symbols-outlined text-3xl text-azul">location_on</span>
            <h2 className="mt-space-md font-title-lg text-title-lg font-bold text-azul">Visítanos</h2>
            <p className="mt-space-xs font-body-md text-body-md text-on-surface-variant">Galerías Pizarro, Pizarro 308, Arequipa - Perú</p>
          </div>
          <div className="rounded-2xl border border-outline-variant/70 bg-surface-container-lowest p-space-xl shadow-sm">
            <span className="material-symbols-outlined text-3xl text-azul">schedule</span>
            <h2 className="mt-space-md font-title-lg text-title-lg font-bold text-azul">Horario de atención</h2>
            <p className="mt-space-xs font-body-md text-body-md text-on-surface-variant">Lun - Sáb: 9:00 AM - 8:00 PM</p>
          </div>
          <div className="rounded-2xl border border-outline-variant/70 bg-surface-container-lowest p-space-xl shadow-sm">
            <span className="material-symbols-outlined text-3xl text-azul">phone</span>
            <h2 className="mt-space-md font-title-lg text-title-lg font-bold text-azul">Llámanos</h2>
            <a href="tel:+51983033938" className="mt-space-xs block font-body-md text-body-md text-on-surface-variant hover:text-azul">+51 983 033 938</a>
          </div>
          <div className="rounded-2xl border border-outline-variant/70 bg-surface-container-lowest p-space-xl shadow-sm">
            <span className="material-symbols-outlined text-3xl text-azul">mail</span>
            <h2 className="mt-space-md font-title-lg text-title-lg font-bold text-azul">Escríbenos</h2>
            <a href="mailto:ventas@nucleocapital.pe" className="mt-space-xs block font-body-md text-body-md text-on-surface-variant hover:text-azul">ventas@nucleocapital.pe</a>
          </div>
        </div>

        <div className="mt-space-xl rounded-2xl bg-azul p-space-xl text-center shadow-lg">
          <h2 className="font-headline-sm text-headline-sm font-bold text-white">¿Quieres realizar una cotización?</h2>
          <p className="mx-auto mt-space-xs max-w-xl font-body-md text-body-md text-white/80">Escríbenos por WhatsApp y te ayudaremos a elegir la mejor solución para tu empresa.</p>
          <a
            href="https://wa.me/51983033938?text=Hola%20Nucleo%20Capital%20SRL,%20quiero%20realizar%20una%20cotización"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-space-lg inline-flex items-center gap-space-xs rounded-full bg-[#25D366] px-space-xl py-space-sm font-label-md text-label-md font-bold text-white transition-colors hover:bg-[#20bd5a]"
          >
            <span className="material-symbols-outlined">chat</span>
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
