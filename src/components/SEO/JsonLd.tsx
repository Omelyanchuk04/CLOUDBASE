// Структуровані дані schema.org для пошукових систем.
// «<» екранується, щоб вміст не міг закрити тег script
const JsonLd = ({ data }: { data: object }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
  />
);

export default JsonLd;
