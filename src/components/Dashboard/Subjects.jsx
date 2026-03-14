import React from 'react';

const Subjects = () => {
  const subjects = [
    { name: 'Mathematics', icon: '📐' },
    { name: 'Physics', icon: '⚛️' },
    { name: 'Chemistry', icon: '🧪' },
    { name: 'Biology / CS', icon: '💻' },
    { name: 'Tamil', icon: '📚' },
    { name: 'English', icon: '📖' }
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Your 12th Subjects</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {subjects.map((sub, i) => (
          <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-blue-500 cursor-pointer transition">
            <span className="text-3xl block mb-2">{sub.icon}</span>
            <span className="text-white font-medium">{sub.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects; // Indha line dhaan mukkiyam!