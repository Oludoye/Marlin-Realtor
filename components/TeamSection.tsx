import Image from 'next/image';
import Link from 'next/link';

interface TeamMemberProps {
  name: string;
  role: string;
  imageSrc: string;
  altText: string;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({ name, role, imageSrc, altText }) => {
  return (
    <div className="relative group bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-80 w-full">
        {/* Placeholder for the image. Replace src with your actual image path */}
        <img
          src={imageSrc} 
          alt={altText} 
          //  layout="fill" 
          // objectFit="cover" 
          className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
      {/* Visual background corners */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-gray-100 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gray-100 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-800 opacity-75"></div>
    </div>
  );
};

const TeamSection = () => {
  const teamMembers = [
    { name: 'Arman Bangle', role: 'Founder & CEO', imageSrc: 'oluwatobiloba.jpeg ', altText: 'Abidoye Oluwatiobi profile' },
    { name: 'Mr Alonge', role: 'Project Manager', imageSrc: 'Mr Alonge.jpeg', altText: 'Mr Alonge profile' },
    { name: 'Albert Fro', role: 'CTO', imageSrc: 'Peace Myke.jpg', altText: 'Peace Myke profile' },
  ];

  return (
    <section className="text-center py-16">
      <div className="mb-4">
        <Link href="/aboutUs">
        <span className="inline-block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-600 bg-gray-100 rounded-full">
          About Us
        </span>
        </Link>
      </div>
      <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
        Global executive leadership
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member) => (
          <div key={member.name} className="w-1/2 sm:w-full md:w-1/3 max-w-sm">
            <TeamMemberCard {...member} />
          </div>
        ))}
      </div>
      {/* <div className="flex justify-center mt-12 space-x-2">
        <span className="w-3 h-3 bg-gray-900 rounded-full"></span>
        <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
      </div> */}
    </section>
  );
};

export default TeamSection;
