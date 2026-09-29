import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';

const legalSections = {
  guarantees: {
    eyebrow: 'Atención al cliente',
    title: 'Políticas de Garantía',
    intro: 'En Nucleo Capital SRL cuidamos cada detalle de nuestros productos y procesos de personalización.',
    sections: [
      {
        title: 'Cobertura',
        text: 'Nuestros productos cuentan con garantía por defectos de fabricación y fallas atribuibles al proceso de producción. La cobertura aplica desde la fecha de entrega indicada en la cotización o comprobante correspondiente.',
      },
      {
        title: 'Qué no cubre la garantía',
        text: 'La garantía no cubre daños ocasionados por uso incorrecto, golpes, desgaste natural, modificaciones realizadas por terceros, almacenamiento inadecuado o cambios propios de materiales naturales y acabados artesanales.',
      },
      {
        title: 'Solicitud de atención',
        text: 'Para solicitar una revisión, escríbenos a ventas@nucleocapital.pe indicando el número de pedido, fecha de compra, descripción del inconveniente y fotografías del producto. Nuestro equipo evaluará el caso y responderá en un plazo máximo de cinco días hábiles.',
      },
      {
        title: 'Solución',
        text: 'Según la evaluación, podremos reparar el producto, reemplazarlo por uno equivalente o coordinar una alternativa previamente aprobada con el cliente.',
      },
    ],
  },
  terms: {
    eyebrow: 'Información legal',
    title: 'Términos de Servicio',
    intro: 'Estos términos regulan el uso del sitio web y la contratación de productos y servicios de Nucleo Capital SRL.',
    sections: [
      {
        title: 'Uso del sitio',
        text: 'El contenido de este sitio se presenta con fines informativos y comerciales. El usuario se compromete a utilizarlo de forma lícita y a proporcionar información veraz cuando solicite una cotización o realice una consulta.',
      },
      {
        title: 'Cotizaciones y pedidos',
        text: 'Las cotizaciones tienen la vigencia indicada en cada propuesta. Un pedido se considera confirmado cuando el cliente acepta las condiciones comerciales y se acredita el pago o adelanto acordado.',
      },
      {
        title: 'Personalización y entregas',
        text: 'Los colores, medidas y acabados pueden presentar ligeras variaciones propias de los procesos de producción. Los plazos de entrega se confirman según disponibilidad, cantidad, nivel de personalización y destino.',
      },
      {
        title: 'Propiedad intelectual y contacto',
        text: 'Los textos, imágenes, diseños y elementos visuales de este sitio pertenecen a Nucleo Capital SRL o se utilizan con autorización. Para consultas sobre estos términos, contáctanos en ventas@nucleocapital.pe.',
      },
    ],
  },
} as const;

type LegalContent = (typeof legalSections)[keyof typeof legalSections];

const LegalPage = ({ content }: { content: LegalContent }) => (
  <div className="min-h-screen bg-crema pt-28 pb-space-3xl">
    <div className="mx-auto max-w-[900px] px-gutter-mobile lg:px-gutter-desktop">
      <Link to="/" className="inline-flex items-center gap-space-xs font-label-md text-label-md font-bold text-azul hover:text-azul-dark">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Volver al inicio
      </Link>
      <header className="mt-space-xl border-b border-outline-variant/70 pb-space-xl">
        <span className="font-label-sm text-label-sm font-bold uppercase tracking-[0.18em] text-azul">{content.eyebrow}</span>
        <h1 className="mt-space-sm font-headline-lg text-headline-lg font-bold text-azul">{content.title}</h1>
        <p className="mt-space-md max-w-2xl font-body-lg text-body-lg text-on-surface-variant">{content.intro}</p>
      </header>
      <div className="mt-space-xl flex flex-col gap-space-xl">
        {content.sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-title-lg text-title-lg font-bold text-azul">{section.title}</h2>
            <p className="mt-space-xs font-body-md text-body-md leading-relaxed text-on-surface-variant">{section.text}</p>
          </section>
        ))}
      </div>
    </div>
  </div>
);

export const GuaranteesPage = () => <LegalPage content={legalSections.guarantees} />;

export const TermsPage = () => <LegalPage content={legalSections.terms} />;

export const ComplaintsPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-crema pt-28 pb-space-3xl">
      <div className="mx-auto max-w-[900px] px-gutter-mobile lg:px-gutter-desktop">
        <Link to="/" className="inline-flex items-center gap-space-xs font-label-md text-label-md font-bold text-azul hover:text-azul-dark">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Volver al inicio
        </Link>
        <header className="mt-space-xl border-b border-outline-variant/70 pb-space-xl">
          <span className="font-label-sm text-label-sm font-bold uppercase tracking-[0.18em] text-azul">Atención al cliente</span>
          <h1 className="mt-space-sm font-headline-lg text-headline-lg font-bold text-azul">Libro de Reclamaciones</h1>
          <p className="mt-space-md max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            Déjanos tus datos y cuéntanos lo ocurrido. Revisaremos tu solicitud y nos pondremos en contacto contigo.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-space-xl rounded-2xl border border-outline-variant/70 bg-surface-container-lowest p-space-lg shadow-sm sm:p-space-xl">
          <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
            <label className="flex flex-col gap-space-xs font-label-md text-label-md font-semibold text-azul">
              Nombres y apellidos
              <input required name="nombre" type="text" className="rounded-lg border border-outline-variant bg-crema px-space-sm py-space-sm font-body-md text-body-md font-normal text-on-surface outline-none focus:border-azul" />
            </label>
            <label className="flex flex-col gap-space-xs font-label-md text-label-md font-semibold text-azul">
              DNI o documento
              <input required name="documento" type="text" className="rounded-lg border border-outline-variant bg-crema px-space-sm py-space-sm font-body-md text-body-md font-normal text-on-surface outline-none focus:border-azul" />
            </label>
            <label className="flex flex-col gap-space-xs font-label-md text-label-md font-semibold text-azul">
              Correo electrónico
              <input required name="email" type="email" className="rounded-lg border border-outline-variant bg-crema px-space-sm py-space-sm font-body-md text-body-md font-normal text-on-surface outline-none focus:border-azul" />
            </label>
            <label className="flex flex-col gap-space-xs font-label-md text-label-md font-semibold text-azul">
              Teléfono
              <input required name="telefono" type="tel" className="rounded-lg border border-outline-variant bg-crema px-space-sm py-space-sm font-body-md text-body-md font-normal text-on-surface outline-none focus:border-azul" />
            </label>
            <label className="flex flex-col gap-space-xs font-label-md text-label-md font-semibold text-azul sm:col-span-2">
              Tipo de solicitud
              <select required name="tipo" defaultValue="" className="rounded-lg border border-outline-variant bg-crema px-space-sm py-space-sm font-body-md text-body-md font-normal text-on-surface outline-none focus:border-azul">
                <option value="" disabled>Selecciona una opción</option>
                <option>Queja</option>
                <option>Reclamo</option>
              </select>
            </label>
            <label className="flex flex-col gap-space-xs font-label-md text-label-md font-semibold text-azul sm:col-span-2">
              Detalle de la solicitud
              <textarea required name="detalle" rows={6} className="resize-y rounded-lg border border-outline-variant bg-crema px-space-sm py-space-sm font-body-md text-body-md font-normal text-on-surface outline-none focus:border-azul" />
            </label>
          </div>
          <button type="submit" className="mt-space-lg inline-flex items-center gap-space-xs rounded-full bg-azul px-space-lg py-space-sm font-label-md text-label-md font-bold text-white transition-colors hover:bg-azul-dark">
            <span className="material-symbols-outlined text-[18px]">send</span>
            Enviar solicitud
          </button>
          {submitted && <p className="mt-space-md font-body-md text-body-md font-semibold text-azul" role="status">Hemos recibido tu solicitud. Nuestro equipo se pondrá en contacto contigo.</p>}
        </form>
      </div>
    </div>
  );
};
