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

        <div className="mt-space-xl grid grid-cols-1 gap-space-lg lg:grid-cols-3">
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
        </div>

        {/* CTA SECTION */}
        <section className="w-full py-space-3xl bg-crema relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-azul/5 blur-3xl pointer-events-none"></div>
          <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop relative z-10 text-center">
            <div className="inline-flex items-center gap-space-2xs px-space-md py-space-2xs rounded-full bg-surface-container-lowest border border-outline-variant/70 shadow-sm mb-space-md">
              <span className="w-2 h-2 rounded-full bg-azul"></span>
              <span className="font-label-sm text-label-sm text-azul uppercase font-bold tracking-wider">Hablemos Hoy Mismo</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-azul tracking-tight max-w-3xl mx-auto mb-space-md">
              No dejes que la duda te gane y pregunta
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

      </div>
    </div>
  );
};

export default Contact;
