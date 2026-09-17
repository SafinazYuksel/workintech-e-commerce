import React from 'react';

const teamMembers = [
  {
    id: 1,
    name: 'Jerome Bell',
    role: 'IBM',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Brooklyn Simmons',
    role: 'eBay',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Ronald Richards',
    role: 'Starbucks',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Floyd Miles',
    role: 'Facebook',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    name: 'Jane Cooper',
    role: 'Mitsubishi',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    name: 'Robert Fox',
    role: 'IBM',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 7,
    name: 'Leslie Alexander',
    role: 'The Walt Disney Company',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 8,
    name: 'Jacob Jones',
    role: 'Starbucks',
    image: 'https://images.unsplash.com/photo-15395371696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80'
  }
];

export default function TeamSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center font-sans">
      {/* Header matching desktop-team-1 & mobile-team-1 */}
      <div className="max-w-xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-black text-[#252B42] tracking-tight">
          Meet Our Team
        </h2>
        <p className="text-xs sm:text-sm text-[#737373] mt-3 leading-relaxed font-medium">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
        </p>
      </div>

      {/* 4x2 Grid on Desktop, 1 Column on Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex flex-col items-start text-left group">
            <div className="w-full h-80 rounded-xl overflow-hidden mb-4 shadow-sm border border-gray-100">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <h3 className="text-base font-bold text-[#252B42]">{member.name}</h3>
            <p className="text-xs font-medium text-[#737373] mt-0.5">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
