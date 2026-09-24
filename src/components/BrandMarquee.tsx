const phrases = [
  'Crea con intención',
  'Diseña tu identidad',
  'Destaca con propósito',
];

const BrandMarquee = () => {
  return (
    <section className="w-full overflow-hidden bg-azul text-white border-y border-white/10" aria-label="Mensaje de marca">
      <div className="brand-marquee py-space-md" aria-hidden="true">
        <div className="brand-marquee__track">
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0 items-center">
              {phrases.map((phrase) => (
                <span key={`${group}-${phrase}`} className="flex shrink-0 items-center font-headline-md text-headline-md uppercase tracking-[0.16em] font-bold">
                  <span className="px-space-lg">{phrase}</span>
                  <span className="text-tertiary-fixed text-[16px]">+</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
