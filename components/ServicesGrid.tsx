export default function ServicesGrid() {
  const services = [
    "Property Acquisition",
    "Interior Design",
    "Sustainability",
    "Asset Management",
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {services.map((s) => (
        <div key={s} className="bg-white p-6 rounded shadow text-center">
          {s}
        </div>
      ))}
    </div>
  );
}
