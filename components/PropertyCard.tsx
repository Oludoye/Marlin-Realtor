
import { ViewIcon } from "lucide-react";

type Prop = {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
};

export default function PropertyCard({ property }: { property: Prop }) {
  return (
    <article className="bg-white shadow rounded overflow-hidden">
        <div className="p-4">
        <h3 className="font-semibold">{property.title}</h3>
        
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-gray-500">{property.location}
</span>

          {/* ✅ Proper Lucide Icon Usage */}
          <button className="text-sm flex items-center gap-1 text-blue-900">
            <ViewIcon size={25} />
          </button>
        </div>
      </div>

      <img
  src={property.image}  // ✅ COMES FROM LISTINGS TABLE
  alt={property.title}
  className="w-full h-48 object-cover"
/>

      
    </article>
  );
}
