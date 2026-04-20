import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import Lenis from 'lenis';

interface CompanyIntroModalProps {
  onClose: () => void;
}

export default function CompanyIntroModal({ onClose }: CompanyIntroModalProps) {
  useEffect(() => {
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    
    // Initialize Lenis for the modal container for smooth scrolling
    const wrapper = document.getElementById('company-modal-scroll');
    const content = document.getElementById('company-modal-content');
    
    let lenis: Lenis | undefined;
    
    if (wrapper && content) {
      lenis = new Lenis({
        wrapper: wrapper,
        content: content,
        autoRaf: true,
      });
    }

    return () => {
      document.body.style.overflow = 'auto'; // allow background scroll again
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  const sections = [
    {
      title: "탐정의 실력은 경력이 아니라 '성공률'로 말합니다.",
      desc: "뻔한 이력보다 확실한 결과가 필요하신가요?\nMD는 말로만 해결을 외치지 않습니다. 검증된 PIA 전문 탐정의 정교한 분석과 압도적인 성공률로 당신의 잃어버린 권리를 찾아드립니다.",
      features: [
        { label: "성공률이 곧 실력", text: "실패 없는 증거 수집, 데이터와 팩트로 승부합니다." },
        { label: "PIA 전략 설계", text: "단순 근거 자료 수집을 넘어 법적 활용도를 고려한 전략적 조사를 수행합니다." },
        { label: "확실한 마침표", text: "당신의 고민이 '해결'될 때까지 MD가 끝까지 함께합니다." }
      ]
    },
    {
      title: "이름만 건 대표가 아닙니다. 대표 탐정이 직접 현장을 지휘합니다.",
      desc: "상담은 대표가 하고, 현장은 아르바이트생이 나가는 불량 업체에 지치셨나요?\nMD는 의뢰인과 '동행'하는 마음으로 모든 사건에 대표가 직접 투입됩니다.",
      features: [
        { label: "100% 대표 직접 상담 & 현장 지휘", text: "책임감의 무게가 다릅니다." },
        { label: "실존하는 사무실, 투명한 계약", text: "카페를 전전하는 유령 업체와는 비교를 거부합니다." },
        { label: "검증된 PIA 전문가", text: "체계적인 교육을 마친 탐정의 확실한 업무 처리를 확인하십시오." },
        { label: "철저한 비밀 유지", text: "당신의 비밀은 오직 MD의 보안 수칙 안에서만 존재합니다." }
      ]
    },
    {
      title: "심증은 100%인데 물증이 없습니까? MD가 그 1%의 빈틈을 채워드립니다.",
      desc: "혼자 고민하면 병이 되지만, MD와 함께하면 '증거'가 됩니다.\n법적 다툼에서 승리할 수 있는 결정적 한 방, 수많은 성공 사례를 보유한 MD 탐정이 지금 바로 찾아드립니다.",
      features: [
        { label: "전략적 증거 수집", text: "법원에서 인정받을 수 있는 깔끔하고 정교한 업무 처리." },
        { label: "미해결 시 A/S 가능", text: "끝까지 책임지는 정직한 서비스." },
        { label: "맞춤형 솔루션", text: "가사(개인), 기업, 실종 등 분야별 최적화된 성공 매뉴얼 적용." }
      ],
      footer: "답답함은 확신으로, 의심은 증거로 바꿔드리겠습니다."
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        id="company-modal-scroll"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[200] bg-[#0a0a0a] text-white overflow-y-auto custom-scrollbar pointer-events-auto"
        data-lenis-prevent
      >
        <div id="company-modal-content">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onClick={onClose}
            className="fixed top-6 right-6 md:top-10 md:right-10 z-[210] p-3.5 border border-white/20 bg-black/50 backdrop-blur-md rounded-full hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            <X size={26} className="text-white group-hover:text-black transition-colors" />
          </motion.button>

          {/* Top Image */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full relative bg-black flex justify-center"
          >
            <img 
              src="/회사소개.png" 
              alt="회사소개" 
              className="w-full h-auto object-cover max-h-[70vh]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Sections */}
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-32 text-[#e5e5e5]">
            {sections.map((sec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col relative"
              >
                <div className="text-gold text-lg md:text-xl font-black italic tracking-widest mb-6 opacity-80">
                  0{idx + 1}.
                </div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif leading-snug lg:leading-tight mb-8 break-keep text-white drop-shadow-md">
                  {sec.title}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-gold to-[#f9d976] mb-10 rounded-full" />
                <p className="text-base md:text-lg text-white/70 leading-loose md:leading-loose break-keep whitespace-pre-line mb-14 font-light">
                  {sec.desc}
                </p>
                
                <div className="grid gap-6 md:gap-8">
                  {sec.features.map((feature, fIdx) => (
                    <motion.div 
                      key={fIdx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: fIdx * 0.15, duration: 0.6 }}
                      className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 bg-white/[0.03] p-6 md:p-8 rounded-3xl border border-white/10 hover:border-gold/40 hover:bg-white/[0.06] transition-all duration-500 shadow-xl"
                    >
                      <div className="p-3 bg-gold/10 border border-gold/30 rounded-2xl shrink-0 text-gold shadow-inner mt-1 md:mt-0">
                        <Check size={24} strokeWidth={2.5} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gold font-bold text-lg mb-2 break-keep">{feature.label}</h4>
                        <p className="text-white/80 text-base font-light break-keep">{feature.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {sec.footer && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="mt-20 p-10 md:p-16 text-center rounded-3xl bg-black border border-gold/30 relative overflow-hidden group shadow-[0_0_40px_rgba(212,175,55,0.15)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                    <p className="relative z-10 text-2xl md:text-4xl font-serif text-white leading-relaxed break-keep font-bold">
                      {sec.footer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
            
            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="flex justify-center pt-8 pb-32"
            >
               <button 
                  onClick={onClose}
                  className="px-10 py-4 border border-white/20 rounded-full text-sm font-medium tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500 hover:scale-105"
               >
                  메인으로 돌아가기
               </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
