import React from 'react';

const Home = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Main Glass Banner */}
      <div className="glass-card p-10 bg-gradient-to-br from-blue-600/20 to-transparent border-white/10">
        <h2 className="text-4xl font-bold text-white mb-2">Ready to study, Kishore? 🔥</h2>
        <p className="text-gray-400">Your 12th Grade Progress: <span className="text-blue-400">Amateur Level</span></p>
        <div className="mt-6 flex gap-4">
          <div className="glass-card px-4 py-2 text-xs">🔥 1 Day Streak</div>
          <div className="glass-card px-4 py-2 text-xs">🏆 180 Points</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Knowledge Meter */}
        <div className="glass-card p-8 flex flex-col items-center">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Knowledge Meter</h3>
          <div className="relative w-32 h-32 rounded-full border-4 border-blue-500/20 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full"></div>
            <span className="text-3xl font-bold">75%</span>
          </div>
        </div>

        {/* Timer */}
        <div className="glass-card p-8 text-center">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Focus Timer</h3>
          <div className="text-5xl font-light mb-8 tracking-tighter">25:00</div>
          <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-lg shadow-blue-500/20">
            START SESSION
          </button>
        </div>

        {/* Career Guidance Quick-link [cite: 2026-03-06] */}
        <div className="glass-card p-8 flex flex-col justify-center">
          <h3 className="text-blue-400 font-semibold mb-2">Career Guidance</h3>
          <p className="text-sm text-gray-400">Explore Medical, Engineering, and Arts paths for 2026.</p>
          <button className="mt-4 text-xs text-left text-blue-500 hover:underline">Explore More →</button>
        </div>
      </div>
    </div>
  );
};

export default Home;