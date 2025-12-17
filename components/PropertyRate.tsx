import { ViewIcon } from "lucide-react";

type Prop = {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
};

export default function PropertyRate({ property }: { property: Prop }) {
  return (
    <article className="bg-white shadow rounded overflow-hidden">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold">{property.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{property.location}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-blue-950">{property.price}</span>
          <button className="text-sm flex items-center gap-1 text-blue-900">
            <ViewIcon size={25} />
          </button>
        </div>
      </div>
    </article>
  );
}

