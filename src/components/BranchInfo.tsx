import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PhoneCall } from 'lucide-react';
import SouthKorea from '@svg-maps/south-korea';

const BRANCHES = [
  { id: 'seoul', name: '서울지사', phone: '010-3985-8279' },
  { id: 'gyeonggi', name: '경기지사', phone: '010-3985-8279' },
  { id: 'incheon', name: '인천지사', phone: '010-3985-8279' },
  { id: 'north-chungcheong', name: '충북지사', phone: '010-3985-8279' },
  { id: 'south-chungcheong', name: '충남지사', phone: '010-3985-8279' },
  { id: 'south-gyeongsang', name: '경남지사', phone: '010-3985-8279' },
  { id: 'north-gyeongsang', name: '경북지사', phone: '010-3985-8279' },
  { id: 'south-jeolla', name: '전남지사', phone: '010-3985-8279' },
  { id: 'north-jeolla', name: '전북지사', phone: '010-3985-8279' },
  { id: 'gangwon', name: '강원도지사', phone: '010-3985-8279' },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
};

export default function BranchInfo() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Map SVGs are not perfectly sized sometimes, so we center it nicely
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-[#fafafa] text-black relative overflow-hidden border-t border-black/5">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="hidden md:block absolute top-1/4 left-1/4 w-[50vh] h-[50vh] bg-gold/10 rounded-full blur-[100px]" />
        <div className="hidden md:block absolute bottom-1/4 right-1/4 w-[50vh] h-[50vh] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Text */}
        <motion.div {...fadeInUp} className="text-center mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-[0.5em] mb-6 md:mb-8 block font-mono text-black/40">
            NATIONWIDE NETWORK
          </span>
          <h2 className="text-3xl md:text-6xl font-serif italic mb-6 md:mb-8 leading-tight">
            전국지사 안내
          </h2>
          <p className="text-lg md:text-xl font-light opacity-80 max-w-2xl mx-auto break-keep leading-relaxed text-black/80">
            탄탄한 전국 지사망을 통해 지체 없이, 가장 신속하게 움직입니다.
          </p>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Left Column: SVG Map */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-full relative flex justify-center items-center p-6 md:p-8 bg-white rounded-[2.5rem] border border-black/5 shadow-[0_20px_40px_rgb(0,0,0,0.04)] group"
          >
            {/* Outline Glow Effect */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            <div className="w-full max-w-[280px] md:max-w-[420px] pb-4 md:pb-6 aspect-[4/5] object-contain flex items-center justify-center">
              <svg 
                viewBox={SouthKorea.viewBox} 
                className="w-full h-full"
                aria-label={SouthKorea.label}
              >
                {SouthKorea.locations.map((loc) => {
                  const isBranch = BRANCHES.some(b => b.id === loc.id);
                  const isHovered = hoveredRegion === loc.id;
                  
                  return (
                    <path
                      key={loc.id}
                      id={loc.id}
                      d={loc.path}
                      name={loc.name}
                      onMouseEnter={() => isBranch && setHoveredRegion(loc.id)}
                      onMouseLeave={() => isBranch && setHoveredRegion(null)}
                      className={`transition-colors duration-300 ease-in-out cursor-pointer ${
                        isHovered 
                          ? 'fill-gold stroke-gold z-10' 
                          : isBranch
                            ? 'fill-black/[0.05] md:hover:fill-gold/40 stroke-black/20' 
                            : 'fill-black/[0.02] stroke-black/5'
                      }`}
                      style={{
                        strokeWidth: isHovered ? 2 : 1,
                        strokeLinejoin: 'round'
                      }}
                    />
                  );
                })}
              </svg>
            </div>
            
            {/* Pop-up region name next to map */}
            <div className="absolute bottom-8 right-8 text-right pointer-events-none">
              {hoveredRegion && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-gold/30 text-gold font-bold tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.3)] shadow-gold/20"
                >
                  {BRANCHES.find(b => b.id === hoveredRegion)?.name}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Buttons Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 md:gap-5">
              {BRANCHES.map((branch, i) => (
                <motion.a
                  key={branch.id}
                  href={`tel:${branch.phone}`}
                  onMouseEnter={() => setHoveredRegion(branch.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`
                    flex items-center justify-between px-3 py-3 md:px-6 md:py-5 rounded-2xl border transition-all duration-500
                    ${hoveredRegion === branch.id 
                      ? 'bg-gold border-gold text-white shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-[1.02]' 
                      : 'bg-white border-black/5 text-black/80 hover:bg-black/[0.02] hover:border-gold/30 hover:text-black shadow-sm'
                    }
                  `}
                >
                  <span className="font-serif text-sm md:text-lg font-bold tracking-wide">{branch.name}</span>
                  <div className={`p-1.5 md:p-2 rounded-full transition-colors duration-500 ${hoveredRegion === branch.id ? 'bg-black/20' : 'bg-black/5 group-hover:bg-gold/20'}`}>
                    <PhoneCall size={16} className={`md:w-[18px] md:h-[18px] ${hoveredRegion === branch.id ? 'text-white' : 'text-gold'}`} />
                  </div>
                </motion.a>
              ))}
              

            </div>
            
            <div className="mt-8 p-6 rounded-2xl bg-black/[0.02] border border-black/5 mt-auto">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0"></div>
                <p className="text-base md:text-lg font-medium text-black/80 leading-relaxed break-keep">
                  전국 거점 지사 운영으로 대한민국 전 지역 어디든 즉시 출동합니다. 촘촘한 광역 네트워크를 통해 지역적 한계 없는 신속하고 정확한 조사를 약속드립니다.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
