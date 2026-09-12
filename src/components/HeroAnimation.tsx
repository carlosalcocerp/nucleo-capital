const HeroAnimation = () => {
  return (
    <div className="relative w-full h-[500px] sm:h-[600px] overflow-hidden bg-crema">
      {/* Ambient background glow layers */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[680px] h-[680px] absolute -top-24 -left-24 rounded-full opacity-80" style={{ background: 'radial-gradient(circle, rgba(3,75,165,0.08) 0%, rgba(255,247,225,0) 70%)' }}></div>
        <div className="w-[720px] h-[720px] absolute -bottom-24 -right-24 rounded-full opacity-80" style={{ background: 'radial-gradient(circle, rgba(3,75,165,0.08) 0%, rgba(255,247,225,0) 70%)' }}></div>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#034ba5 0.75px, transparent 0.75px)', backgroundSize: '24px 24px' }}></div>
      </div>

      {/* Main Animation Stage */}
      <div className="relative w-full h-full flex items-center justify-center p-6">
        
        {/* STAGE 1: Orbital Core */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ animation: 'phaseOne 9.2s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}>
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
            {/* Outermost orbital ring */}
            <div className="absolute inset-0 rounded-full border border-azul/20 pointer-events-none" style={{ animation: 'pulseRing 3s ease-in-out infinite' }}></div>
            
            {/* Orbit Ring 1 */}
            <div className="absolute w-full h-full pointer-events-none" style={{ animation: 'spinClockwise 12s linear infinite' }}>
              <svg className="w-full h-full" fill="none" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="gradRing1" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#034ba5" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#034ba5" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <ellipse cx="200" cy="200" rx="180" ry="68" stroke="url(#gradRing1)" strokeDasharray="8 6" strokeWidth="1.75" transform="rotate(-30 200 200)" />
                <circle cx="20" cy="200" fill="#034ba5" filter="drop-shadow(0 0 6px #034ba5)" r="4.5" transform="rotate(-30 200 200)" />
                <circle cx="380" cy="200" fill="#059669" filter="drop-shadow(0 0 5px #059669)" r="3.5" transform="rotate(-30 200 200)" />
              </svg>
            </div>

            {/* Orbit Ring 2 */}
            <div className="absolute w-full h-full pointer-events-none" style={{ animation: 'spinCounter 15s linear infinite' }}>
              <svg className="w-full h-full" fill="none" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="gradRing2" x1="100%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#034ba5" stopOpacity="0.95" />
                    <stop offset="70%" stopColor="#6ee7b7" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#034ba5" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <ellipse cx="200" cy="200" opacity="0.85" rx="170" ry="60" stroke="url(#gradRing2)" strokeWidth="2" transform="rotate(40 200 200)" />
                <circle cx="30" cy="200" fill="#059669" filter="drop-shadow(0 0 7px #059669)" r="5" transform="rotate(40 200 200)" />
              </svg>
            </div>

            {/* Orbit Ring 3 */}
            <div className="absolute w-full h-full pointer-events-none" style={{ animation: 'spinClockwise 8s linear infinite' }}>
              <svg className="w-full h-full" fill="none" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="gradRing3" x1="0%" x2="100%" y1="50%" y2="50%">
                    <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#034ba5" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <ellipse cx="200" cy="200" opacity="0.7" rx="150" ry="50" stroke="url(#gradRing3)" strokeDasharray="4 8" strokeWidth="1.5" transform="rotate(85 200 200)" />
                <circle cx="350" cy="200" fill="#6ee7b7" filter="drop-shadow(0 0 6px #034ba5)" r="4" transform="rotate(85 200 200)" />
              </svg>
            </div>

            {/* Glowing Core */}
            <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center" style={{ animation: 'pulseCore 2.4s ease-in-out infinite' }}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-azul via-azul to-[#059669] opacity-25 blur-xl"></div>
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#034ba5] via-azul to-azul-dark shadow-2xl flex items-center justify-center relative overflow-hidden border border-white/30">
                <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-white/40 filter blur-sm"></div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-white to-[#6ee7b7] shadow-[0_0_16px_#fff]"></div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs tracking-[0.28em] font-bold uppercase text-azul/70">
            <span className="w-1.5 h-1.5 rounded-full bg-azul animate-ping"></span>
            <span>Núcleo • Orbital Core</span>
          </div>
        </div>

        {/* STAGE 2: Typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4" style={{ animation: 'phaseTwo 9.2s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}>
          <div className="space-y-4 max-w-xl flex flex-col items-center">
            <div className="w-12 h-1 bg-gradient-to-r from-azul to-[#059669] rounded-full mb-2"></div>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-[-0.035em] leading-none uppercase bg-gradient-to-r from-azul-dark via-azul to-[#059669] bg-clip-text text-transparent drop-shadow-sm select-none">
              NÚCLEO
            </h1>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full bg-azul/10 border border-azul/25 text-azul shadow-sm">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-azul to-[#059669]"></span>
                <span className="text-xs sm:text-sm font-extrabold tracking-[0.32em] uppercase text-azul-dark">CAPITAL</span>
              </div>
            </div>
            <p className="text-sm font-medium tracking-wide text-on-surface-variant pt-2">
              Soluciones Corporativas de Alto Nivel
            </p>
          </div>
        </div>

        {/* STAGE 3: Logo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4" style={{ animation: 'phaseThree 9.2s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}>
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-azul/15 via-azul/10 to-transparent blur-xl"></div>
              <img src="/src/assets/logo.svg" alt="Núcleo Capital" className="w-full h-full object-contain drop-shadow-lg" />
            </div>
            <div className="mt-4 flex flex-col items-center">
              <span className="text-xl font-bold tracking-tight text-azul">Núcleo Capital</span>
              <span className="text-[11px] font-semibold tracking-[0.24em] text-azul/80 uppercase mt-0.5">Taller & Estudio Creativo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Phase indicator dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <div className="h-1.5 rounded-full bg-azul" style={{ animation: 'dot1 9.2s infinite', width: 18 }}></div>
        <div className="h-1.5 rounded-full bg-azul" style={{ animation: 'dot2 9.2s infinite', width: 18 }}></div>
        <div className="h-1.5 rounded-full bg-azul" style={{ animation: 'dot3 9.2s infinite', width: 18 }}></div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes phaseOne {
          0% { opacity: 0; transform: scale(0.85); filter: blur(8px); }
          4% { opacity: 1; transform: scale(1); filter: blur(0px); }
          30% { opacity: 1; transform: scale(1); filter: blur(0px); }
          34% { opacity: 0; transform: scale(1.08); filter: blur(10px); }
          100% { opacity: 0; transform: scale(1.08); filter: blur(10px); }
        }
        @keyframes phaseTwo {
          0%, 34% { opacity: 0; transform: scale(0.88); filter: blur(8px); pointer-events: none; }
          37% { opacity: 1; transform: scale(1); filter: blur(0px); pointer-events: auto; }
          63% { opacity: 1; transform: scale(1); filter: blur(0px); pointer-events: auto; }
          67% { opacity: 0; transform: scale(1.06); filter: blur(10px); pointer-events: none; }
          100% { opacity: 0; transform: scale(1.06); filter: blur(10px); pointer-events: none; }
        }
        @keyframes phaseThree {
          0%, 67% { opacity: 0; transform: scale(0.88); filter: blur(8px); pointer-events: none; }
          70% { opacity: 1; transform: scale(1); filter: blur(0px); pointer-events: auto; }
          96% { opacity: 1; transform: scale(1); filter: blur(0px); pointer-events: auto; }
          100% { opacity: 0; transform: scale(1.06); filter: blur(10px); pointer-events: none; }
        }
        @keyframes spinClockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinCounter {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulseCore {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 25px rgba(3,75,165,0.35)); }
          50% { transform: scale(1.15); filter: drop-shadow(0 0 45px rgba(3,75,165,0.5)); }
        }
        @keyframes pulseRing {
          0%, 100% { opacity: 0.65; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(1.04); }
        }
        @keyframes dot1 {
          0%, 32% { opacity: 1; transform: scaleX(1.4); }
          35%, 100% { opacity: 0.25; transform: scaleX(1); }
        }
        @keyframes dot2 {
          0%, 33% { opacity: 0.25; transform: scaleX(1); }
          36%, 65% { opacity: 1; transform: scaleX(1.4); }
          68%, 100% { opacity: 0.25; transform: scaleX(1); }
        }
        @keyframes dot3 {
          0%, 66% { opacity: 0.25; transform: scaleX(1); }
          69%, 97% { opacity: 1; transform: scaleX(1.4); }
          100% { opacity: 0.25; transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default HeroAnimation;
