import React from 'react';
import { motion } from 'framer-motion';

const ExamPrep = () => {
  // TN 12th Standard Competitive Exam Guidance [cite: 2026-03-06]
  const examResources = [
    { title: 'Class XII Mathematics Cheatsheet', category: 'Math', views: 176 },
    { title: 'NEET Biology Quick Revision', category: 'Medical', views: 245 },
    { title: 'JEE Physics Formula Book', category: 'Engineering', views: 189 },
    { title: 'TNPSC Group 4 General Tamil', category: 'Arts', views: 132 }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 space-y-8">
      
      {/* 1. Main Exam Banner */}
      <div className="bg-[#161b22] border border-white/10 rounded-[2.5rem] p-10 text-center relative overflow-hidden">
        <div className="flex justify-center gap-4 mb-6 text-4xl">
           <span className="bg-white/5 p-3 rounded-2xl">🎓</span>
           <span className="bg-white/5 p-3 rounded-2xl border-2 border-blue-500">🎯</span>
           <span className="bg-white/5 p-3 rounded-2xl">🔥</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Prepare for your Exams with AI</h1>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Turn your study materials into an interactive, guided learning experience.
        </p>
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-3 rounded-full transition shadow-lg shadow-blue-500/30">
          + Create new exam
        </button>
        <p className="mt-6 text-blue-400 text-sm cursor-pointer hover:underline">How it works ❓</p>
      </div>

      {/* 2. Exam Search & Categories */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Find exam preps</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-full md:w-64">
            <input type="text" placeholder="Search by title..." className="bg-transparent outline-none w-full text-sm" />
          </div>
        </div>

        {/* 3. Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examResources.map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-[#161b22] p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:bg-white/[0.03] transition cursor-pointer"
            >
              <div>
                <span className="bg-white/10 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full text-gray-300">
                  {item.category}
                </span>
                <h3 className="text-white font-medium mt-4 text-lg">{item.title}</h3>
                <p className="text-gray-500 text-xs mt-2">TN State Board</p>
              </div>
              <div className="mt-6 flex items-center text-gray-400 text-sm">
                <span>👁️ {item.views} views</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Pre-made by AI Section */}
      <div className="bg-gradient-to-b from-white/5 to-transparent p-8 rounded-[2rem] border border-white/10 text-center">
         <div className="w-10 h-10 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">✨</div>
         <h3 className="text-white font-bold">Pre-made by KISHORE AI</h3>
         <p className="text-gray-400 text-sm mt-2">Curated topics to expand your knowledge.</p>
         <button className="mt-6 border border-white/20 px-8 py-2 rounded-xl hover:bg-white/5 transition text-sm">Explore</button>
      </div>

    </motion.div>
  );
};

export default ExamPrep; // Import error fix aagum