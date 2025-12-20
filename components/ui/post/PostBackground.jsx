"use client";

export default function PostBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-green-400/15 to-emerald-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-sky-400/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      
      {/* Geometric patterns */}
      <div className="absolute top-4 right-8 w-2 h-2 bg-emerald-400/30 rounded-full"></div>
      <div className="absolute top-8 right-12 w-1 h-1 bg-teal-400/40 rounded-full"></div>
      <div className="absolute bottom-12 left-8 w-3 h-3 bg-green-400/25 rounded-full"></div>
      <div className="absolute bottom-6 left-12 w-1.5 h-1.5 bg-emerald-400/35 rounded-full"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)',
        backgroundSize: '20px 20px'
      }}></div>
    </div>
  );
}

