import { useEffect, useState } from 'react';

const videoUrl = 'https://www.youtube.com/embed/I_XM2wXaqb4';

const HeroAnimation = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (!isVideoOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsVideoOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isVideoOpen]);

  return (
    <section className="relative isolate h-[500px] w-full overflow-hidden bg-azul sm:h-[600px]" aria-label="Núcleo Capital">
      <iframe
        className="pointer-events-none absolute inset-0 z-0 h-full w-full scale-[1.08]"
        src={`${videoUrl}?autoplay=1&mute=1&loop=1&playlist=I_XM2wXaqb4&controls=0&playsinline=1&rel=0`}
        title="Video de presentación de Núcleo Capital"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>

      <div className="absolute inset-0 z-10 bg-azul/45" aria-hidden="true"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-azul/25 via-transparent to-azul/70" aria-hidden="true"></div>

      <button
        type="button"
        className="absolute inset-0 z-20 cursor-pointer"
        onClick={() => setIsVideoOpen(true)}
        aria-label="Abrir video de presentación de Núcleo Capital"
      ></button>

      <div className="relative z-30 flex h-full items-center justify-center px-gutter-mobile text-center lg:px-gutter-desktop">
        <div>
          <p className="mb-space-sm font-label-sm text-label-sm font-bold uppercase tracking-[0.35em] text-white/85">
            Taller &amp; Estudio Creativo
          </p>
          <h1 className="font-headline-lg text-headline-lg font-black uppercase tracking-[-0.04em] text-white drop-shadow-lg sm:text-6xl md:text-8xl">
            NUCLEO CAPITAL
          </h1>
        </div>
      </div>

      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-azul/85 p-gutter-mobile backdrop-blur-sm lg:p-gutter-desktop"
          role="dialog"
          aria-modal="true"
          aria-label="Video de presentación de Núcleo Capital"
          onClick={() => setIsVideoOpen(false)}
        >
          <div className="relative w-full max-w-5xl overflow-hidden rounded-xl bg-black shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="absolute right-space-sm top-space-sm z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/90"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Cerrar video"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={`${videoUrl}?autoplay=1&rel=0`}
                title="Video de presentación de Núcleo Capital"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroAnimation;
