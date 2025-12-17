
import Header from "./Header";

export default function HeroSearch() {
  return (
    <section className="relative bg-blue-950 text-white rounded-lg p-10">
      <div className="  max-w-4xl mx-auto text-center">
         <Header />
        <h1 className=" text-7xl item-left font-bold">
          Find Your Ideal Property in Minutes.
        </h1>
        <p className="mt-3">Search homes, apartments and more.</p>

        <div className="mt-8 flex items-center gap-3 justify-center">
          <input
            className="w-2/3 p-3 rounded-md text-black"
            placeholder="Search by city, neighbourhood or address"
          />
          <button className="bg-accent px-4 py-3 rounded-md">Search</button>
        </div>
      </div>
    </section>
  );
}
