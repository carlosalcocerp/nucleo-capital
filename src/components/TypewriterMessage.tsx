import { useEffect, useState } from 'react';

const phrases = [
  'Crea con intención',
  'Diseña tu identidad',
  'Destaca con propósito',
];

const TypewriterMessage = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setText(phrases[0]);
      return;
    }

    const phrase = phrases[phraseIndex];
    const isComplete = text === phrase;
    const isEmpty = text === '';
    const delay = isComplete ? 1800 : isEmpty && isDeleting ? 350 : isDeleting ? 45 : 85;

    const timeout = window.setTimeout(() => {
      if (isComplete) {
        setIsDeleting(true);
      } else if (isEmpty && isDeleting) {
        setIsDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
      } else if (isDeleting) {
        setText(phrase.slice(0, text.length - 1));
      } else {
        setText(phrase.slice(0, text.length + 1));
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [isDeleting, phraseIndex, text]);

  return (
    <section className="w-full overflow-hidden bg-azul text-white border-y border-white/10" aria-label="Mensaje de marca">
      <div className="flex min-h-[72px] items-center justify-center px-gutter-mobile py-space-md lg:px-gutter-desktop">
        <p className="font-headline-md text-headline-md uppercase tracking-[0.16em] font-bold text-center">
          <span aria-live="polite">{text}</span>
          <span className="typewriter-cursor text-tertiary-fixed" aria-hidden="true">|</span>
          <span className="text-tertiary-fixed text-[16px] ml-space-sm" aria-hidden="true">+</span>
        </p>
      </div>
    </section>
  );
};

export default TypewriterMessage;
