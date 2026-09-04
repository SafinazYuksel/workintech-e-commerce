import React from 'react';
import { Globe, Mail, Share2 } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Jerome Bell',
    role: 'IBM',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-yellow-400'
  },
  {
    id: 2,
    name: 'Brooklyn Simmons',
    role: 'eBay',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-red-500'
  },
  {
    id: 3,
    name: 'Ronald Richards',
    role: 'Starbucks',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-amber-400'
  },
  {
    id: 4,
    name: 'Floyd Miles',
    role: 'Facebook',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-sky-600'
  },
  {
    id: 5,
    name: 'Jane Cooper',
    role: 'Mitsubishi',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-emerald-500'
  },
  {
    id: 6,
    name: 'Robert Fox',
    role: 'IBM',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-blue-400'
  },
  {
    id: 7,
    name: 'Leslie Alexander',
    role: 'The Walt Disney Company',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-indigo-500'
  },
  {
    id: 8,
    name: 'Jacob Jones',
    role: 'Starbucks',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-orange-400'
  }
];

export default function TeamPage() {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
          Meet Our Team
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-500 sm:mt-4">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
        </p>

        {/* Team Grid */}
        <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition duration-300 flex flex-col items-center p-4"
            >
              {/* Member Image Container */}
              <div className={`w-full h-64 rounded-md overflow-hidden mb-4 ${member.bgColor}`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
              <p className="text-xs font-semibold text-gray-500 mt-1">{member.role}</p>

              {/* Social icons */}
              <div className="flex space-x-3 mt-4 text-indigo-600">
                <a href="#website" className="hover:text-indigo-800 transition" title="Website">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="#email" className="hover:text-indigo-800 transition" title="Email">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="#share" className="hover:text-indigo-800 transition" title="Share">
                  <Share2 className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
