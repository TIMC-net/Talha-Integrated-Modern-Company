type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Renders one or more Schema.org JSON-LD blocks. */
export default function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, index) => (
        <script
          // Stable enough for static schema blobs; order is fixed per page.
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
