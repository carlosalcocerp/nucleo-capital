import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const videoUrl = 'https://www.youtube.com/embed/I_XM2wXaqb4';
const heroHeadlineLead = '¿TU EMPRESA O NEGOCIO';
const heroHeadlineFollowUp = 'ESTÁ LISTA PARA DAR EL SIGUIENTE PASO?';
const heroSubheadline = 'ESTRATEGIA, DISEÑO Y PRODUCCIÓN QUE DESTACAN';
const typewriterDelay = 0.06;

const HeroAnimation = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const renderTypedText = (text: string, startIndex: number) => Array.from(text).map((character, index) => (
    <motion.span
      key={`${startIndex + index}-${character}`}
      initial={prefersReducedMotion ? false : { opacity: 0, filter: 'blur(6px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.18,
        delay: prefersReducedMotion ? 0 : (startIndex + index) * typewriterDelay,
        ease: 'linear',
      }}
    >
      {character}
    </motion.span>
  ));

  useEffect(() => {
    if (!isVideoOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsVideoOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isVideoOpen]);

  return (
    <section className="relative isolate min-h-[calc(100svh-5rem)] w-full overflow-hidden bg-azul" aria-label="Nucleo Capital SRL">
      <iframe
        className="pointer-events-none absolute inset-0 z-0 h-full w-full scale-[1.12]"
        src={`${videoUrl}?autoplay=1&mute=1&loop=1&playlist=I_XM2wXaqb4&controls=0&playsinline=1&rel=0`}
        title="Video de presentación de Nucleo Capital SRL"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>

      <div className="absolute inset-0 z-10 bg-azul/35" aria-hidden="true"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#0057a4]/70 via-azul/20 to-[#75b847]/55" aria-hidden="true"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-azul/35 via-transparent to-black/60" aria-hidden="true"></div>

      <button
        type="button"
        className="absolute inset-0 z-20 cursor-pointer"
        onClick={() => setIsVideoOpen(true)}
        aria-label="Abrir video de presentación de Nucleo Capital SRL"
      ></button>

      <div className="relative z-30 flex min-h-[calc(100svh-5rem)] items-center justify-start px-space-lg sm:px-space-xl lg:px-space-3xl">
        <motion.div
          className="w-full max-w-5xl text-left"
          initial={prefersReducedMotion ? false : { opacity: 0, y: -28, scale: 0.96 }}
          animate={prefersReducedMotion
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: [0, 1, 1, 0], y: [-28, 0, 0, 12], scale: [0.96, 1, 1.04, 1.04] }}
          transition={prefersReducedMotion
            ? { duration: 0 }
            : { duration: 13, times: [0, 0.2, 0.78, 1], delay: 0.2, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' }}
        >
          <h1
            aria-label={`${heroHeadlineLead} ${heroHeadlineFollowUp}`}
            className="font-headline-lg font-black uppercase leading-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
          >
            <span aria-hidden="true" className="block font-impact text-5xl leading-[1.02] sm:text-7xl md:text-8xl">
              {renderTypedText(heroHeadlineLead, 0)}
            </span>
            <span aria-hidden="true" className="mt-space-lg block text-3xl sm:text-5xl md:text-6xl">
              {renderTypedText(heroHeadlineFollowUp, heroHeadlineLead.length)}
              <span className="ml-1 inline-block h-[0.9em] w-[3px] animate-pulse bg-white align-baseline motion-reduce:animate-none" />
            </span>
          </h1>
          <p aria-label={heroSubheadline} className="mt-space-xl max-w-3xl font-label-md text-sm font-bold uppercase leading-relaxed tracking-[0.1em] text-white/90 sm:text-base md:text-lg">
            <span aria-hidden="true">
              {renderTypedText(heroSubheadline, heroHeadlineLead.length + heroHeadlineFollowUp.length)}
            </span>
          </p>
        </motion.div>
      </div>

      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-azul/85 p-gutter-mobile backdrop-blur-sm lg:p-gutter-desktop"
          role="dialog"
          aria-modal="true"
          aria-label="Video de presentación de Nucleo Capital SRL"
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
                title="Video de presentación de Nucleo Capital SRL"
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
