"use client";

import Image from "next/image";

type City = {
  id: number;
  name: string;
  properties: number;
  image: string;
};

const cities: City[] = [
  {
    id: 1,
    name: "San Francisco",
    properties: 120,
    image: "/city1.png",
  },
  {
    id: 2,
    name: "New York",
    properties: 95,
    image: "/city2.png",
  },
  {
    id: 3,
    name: "Chicago",
    properties: 80,
    image: "/city3.png",
  },
  {
    id: 4,
    name: "Los Angeles",
    properties: 110,
    image: "/city4.png",
  },
];

export default function ExploreByCity() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      
      {/* ✅ Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Explore Properties by City</h2>
          <p className="text-gray-500 text-sm mt-1">
            Discover the best properties across top cities.
          </p>
        </div>

        <button className="text-sm font-medium text-blue-600 hover:underline">
          View All →
        </button>
      </div>

      {/* ✅ City Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cities.map((city) => (
          <div
            key={city.id}
            className="relative rounded-xl overflow-hidden shadow group cursor-pointer"
          >
            <Image
              src={city.image}
              alt={city.name}
              width={400}
              height={300}
              className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* ✅ Overlay */}
            <div className="absolute inset-0 bg-black/25 flex flex-col justify-end p-4">
              <h3 className="text-white font-semibold">{city.name}</h3>
              <p className="text-white text-sm">
                {city.properties} Properties
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        <span className="w-2 h-2 bg-black rounded-full"></span>
        <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
        <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
      </div>
    </section>
  );
}
