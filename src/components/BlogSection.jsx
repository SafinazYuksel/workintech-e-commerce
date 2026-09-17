import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MessageSquare, ChevronRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Koudetat à la Maison #1 (L'intégrale)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    commentsCount: 10,
    isNew: true,
    tags: ["Google", "Trending", "New"],
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Koudetat à la Maison #1 (L'intégrale)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    commentsCount: 10,
    isNew: true,
    tags: ["Google", "Trending", "New"],
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Koudetat à la Maison #1 (L'intégrale)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    commentsCount: 10,
    isNew: true,
    tags: ["Google", "Trending", "New"],
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Koudetat à la Maison #1 (L'intégrale)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    commentsCount: 10,
    isNew: true,
    tags: ["Google", "Trending", "New"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Koudetat à la Maison #1 (L'intégrale)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    commentsCount: 10,
    isNew: true,
    tags: ["Google", "Trending", "New"],
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Koudetat à la Maison #1 (L'intégrale)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    commentsCount: 10,
    isNew: true,
    tags: ["Google", "Trending", "New"],
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=800&q=80"
  }
];

export default function BlogSection({ limit }) {
  const postsToDisplay = limit ? blogPosts.slice(0, limit) : blogPosts;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-bold text-[#23A6F0] tracking-wider uppercase block mb-1">
          Practice Advice
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#252B42] tracking-tight">
          Featured Posts
        </h2>
        <p className="text-xs sm:text-sm text-[#737373] mt-2 leading-relaxed">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
        </p>
      </div>

      {/* Blog Cards Grid: 2 columns on Desktop (matching desktop-blog-1), 1 column on Mobile (matching mobile-blog-1) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {postsToDisplay.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            {/* Image Container with NEW badge */}
            <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-100">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {post.isNew && (
                <span className="absolute top-4 left-4 bg-[#E74040] text-white text-[11px] font-bold px-3 py-1 rounded shadow-md uppercase tracking-wider">
                  NEW
                </span>
              )}
            </div>

            {/* Post Content */}
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                {/* Category Tags */}
                <div className="flex items-center space-x-3 text-xs mb-3">
                  <span className="text-[#23A6F0] font-medium cursor-pointer hover:underline">
                    Google
                  </span>
                  <span className="text-[#737373] font-medium cursor-pointer hover:underline">
                    Trending
                  </span>
                  <span className="text-[#737373] font-medium cursor-pointer hover:underline">
                    New
                  </span>
                </div>

                {/* Post Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#252B42] leading-snug group-hover:text-[#23A6F0] transition-colors cursor-pointer">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#737373] mt-2.5 leading-relaxed line-clamp-2">
                  {post.description}
                </p>
              </div>

              <div>
                {/* Meta info bar */}
                <div className="flex items-center justify-between py-4 mt-4 border-b border-gray-100 text-xs text-[#737373]">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-[#23A6F0]" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <MessageSquare className="w-4 h-4 text-[#2DC071]" />
                    <span>{post.commentsCount} comments</span>
                  </div>
                </div>

                {/* Learn More Action Button */}
                <div className="pt-4">
                  <Link
                    to="/blog"
                    className="inline-flex items-center text-xs font-bold text-[#23A6F0] group-hover:text-[#0082c8] space-x-1 transition-all"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
