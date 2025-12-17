
import TeamSection from "@/components/TeamSection";


export default function AboutUsPage() {
    return (
      <div className="p-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">About Our Real Estate Company</h1>
  
        <p className="mb-4">
          We are a trusted real estate company focused on helping clients buy,
          sell and rent high quality properties across Nigeria.
        </p>
  
        <h2 className="text-2xl font-bold mt-6">Our Mission</h2>
        <p>To make property ownership easy, transparent and secure.</p>
  
        <h2 className="text-2xl font-bold mt-6">Our Vision</h2>
        <p>To be Africa's most reliable property platform.</p>
    

      <div className=" mt-3 rounded-lg ">
      <TeamSection />
    </div>
    </div>
    );
  }
  