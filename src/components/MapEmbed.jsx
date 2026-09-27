const MapEmbed = () => {
  const query = encodeURIComponent(
    "No 9 Agwado Ijaye Road opposite Tanimowo Family Plaza, Ijaye, Lagos, Nigeria"
  );
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-charcoal/10 shadow-soft">
      <iframe
        title="FOA Mini Importation location"
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        width="100%"
        height="280"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="bg-white p-3 text-center">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-brand-700 hover:underline"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
};

export default MapEmbed;
