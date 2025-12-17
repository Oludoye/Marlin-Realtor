export default function Testimonials() {
  return (
    <section className="bg-white rounded  shadow p-10">
      <h3 className="text-2xl font-semibold  text-center">
        What Our Clients Say
      </h3>
      <p className="text-center mt-4 italic text-gray-600">
        Truly outstanding service! From start to finish, Marlin Estate made the
        home-buying process seamless and enjoyable. Their team was knowledgeable,
        responsive, and genuinely cared about finding us the perfect home. Highly
        recommend to anyone looking for their dream property!
      </p>
      <br/>
      <a
  href="/testimonials/create"
  className="bg-blue-800 text-white items-center px-4 py-2 mb-6"
>
  Leave a Testimonial
</a>


    </section>
  );
}
