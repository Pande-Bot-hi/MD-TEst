import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone } from 'lucide-react';

export default function FloatingBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAgreed) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }
    
    setSubmitStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
        setIsAgreed(false);
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('idle');
        alert('요청을 처리하는 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('idle');
      alert('요청을 처리하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 w-full z-[100] bg-black/95 md:backdrop-blur-md border-t border-gold/30 text-white md:shadow-[0_-15px_40px_rgba(0,0,0,0.4)] layout-border"
        >
          {/* Mobile View: Thin Action Button */}
          <div className="md:hidden flex p-3 w-full">
            <a href="tel:010-3985-8279" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-gold to-[#f9d976] text-black py-3.5 rounded-lg font-bold text-[16px] shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-[0.98] transition-transform">
              <Phone size={20} className="shrink-0" />
              <span>무료 상담 요청</span>
            </a>
          </div>

          {/* Desktop View: Form */}
          <div className="hidden md:flex max-w-7xl mx-auto px-4 lg:px-8 py-4 flex-col xl:flex-row items-center justify-between gap-5 xl:gap-8">
            
            {/* Left: Logo + Text */}
            <div className="flex flex-col items-center xl:items-start shrink-0">
              <img src="/logo.png" alt="MD Logo" className="h-[28px] md:h-[32px] mb-1.5 object-contain" style={{ filter: "invert(1) brightness(1.5)" }} />
              <p className="text-white text-[12px] md:text-[14px] font-semibold tracking-tight whitespace-nowrap pt-1">
                검증된 PIA 탐정의 조사, 일반 흥신소와는 차원이 다릅니다 
              </p>
            </div>

            {/* Right: Form */}
            <form 
              action="https://formspree.io/f/xnjgdyew" 
              method="POST" 
              onSubmit={handleSubmit}
              className="flex flex-col lg:flex-row items-center w-full xl:w-auto gap-4 shrink-0"
            >
              <input type="hidden" name="source" value="floating_banner" />
              
              <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 shrink-0">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-white text-[13px] md:text-[14px] font-medium whitespace-nowrap shrink-0">성함</span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="성함을 입력해주세요 *"
                    className="w-full sm:w-[160px] lg:w-[170px] bg-white rounded-md px-3 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-black placeholder-black/40"
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-white text-[13px] md:text-[14px] font-medium whitespace-nowrap shrink-0">연락처</span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="연락처를 입력해주세요 *"
                    className="w-full sm:w-[180px] lg:w-[190px] bg-white rounded-md px-3 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-black placeholder-black/40"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-start w-full lg:w-auto gap-4 pl-1">
                <label className="flex items-center gap-2 cursor-pointer text-[12px] md:text-[13px] text-white/80 whitespace-nowrap select-none hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="w-4 h-4 accent-gold cursor-pointer shrink-0"
                  />
                  <span>개인정보 수집 및 이용에 동의합니다.</span>
                </label>

                <button
                  type="submit"
                  disabled={submitStatus === 'submitting' || submitStatus === 'success'}
                  className={`shrink-0 px-6 py-2.5 bg-gradient-to-r from-gold to-[#f9d976] text-black rounded-md text-[14px] md:text-[15px] font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 whitespace-nowrap ${submitStatus !== 'idle' ? 'opacity-70 pointer-events-none' : ''}`}
                >
                  {submitStatus === 'submitting' ? '신청중...' : submitStatus === 'success' ? '신청완료' : '상담 신청'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
