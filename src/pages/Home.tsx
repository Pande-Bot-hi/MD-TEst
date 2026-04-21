import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Shield, Cpu, Eye, Search, UserCheck, Lock, ArrowRight, ChevronDown, Globe, FileText, ShieldAlert, Scale, Target, MessageCircle, Send, Instagram, Phone, User, MessageSquareText, Users, FileCheck, CheckCircle, Trash2, X } from 'lucide-react';
import Lenis from 'lenis';
import { useTranslation } from 'react-i18next';
import '../i18n';
import { supabase } from '../lib/supabase';
import FloatingBanner from '../components/FloatingBanner';
import CompanyIntroModal from '../components/CompanyIntroModal';
import BranchInfo from '../components/BranchInfo';

const CountUp = ({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / (duration * 1000);
        if (progress < 1) {
          setCount(Math.min(Math.floor(end * (1 - Math.pow(1 - progress, 3))), end));
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [end, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const EXTRA_CERTS = [
  '/ㅇㅇ/개개비/1.jpg',
  '/ㅇㅇ/개개비/2.jpg',
  '/ㅇㅇ/개개비/3.jpg',
  '/ㅇㅇ/개개비/4.png',
  '/ㅇㅇ/개개비/KakaoTalk_20260420_230722745_04.jpg',
  '/ㅇㅇ/개개비/KakaoTalk_20260420_230722745_06.jpg',
  '/ㅇㅇ/개개비/KakaoTalk_20260420_230722745_07.jpg',
  '/ㅇㅇ/개개비/KakaoTalk_20260420_230722745_08.jpg',
  '/ㅇㅇ/개개비/MD로고.png',
  '/ㅇㅇ/개개비/윤지훈.jpg'
];

const VIRTUAL_REVIEWS = [
  { name: '권OO', type: '기업 의뢰인', content: '신속하고 정확한 조사 덕분에 기업 손실을 막을 수 있었습니다.' },
  { name: '김OO', type: '익명', content: '오랜 기간 동안 찾지 못했던 사람을 며칠 만에 찾아주셨어요. 정말 감사합니다.' },
  { name: '이OO', type: '익명', content: '보안이 확실하고 철저하게 비밀을 유지해주셔서 마음 편히 의뢰할 수 있었습니다.' },
  { name: '최OO', type: '기업 의뢰인', content: '내부 횡령 건으로 막막했는데, 결정적인 증거를 수집해주셔서 큰 도움이 되었습니다.' },
  { name: '박OO', type: '익명', content: '현장 장악력이 대단합니다. 예상치 못한 돌발 상황에서도 완벽하게 대처해주셨습니다.' },
  { name: '정OO', type: '익명', content: '불안하고 힘든 시간이었는데 든든하게 곁에서 현장을 통제해주셔서 안심이 되었습니다.' },
  { name: '윤OO', type: '기업 의뢰인', content: '타 업체와는 비교할 수 없는 전문성을 보여주었습니다. 결과 보고서도 매우 상세했습니다.' },
  { name: '신OO', type: '익명', content: '막연한 의심만 있었는데, 명확한 사실 관계를 확인해주셔서 앞으로의 대응이 명확해졌습니다.' },
  { name: '송OO', type: '기업 의뢰인', content: '긴급한 요청에도 밤낮 가리지 않고 신속하게 투입되어 문제를 해결해주셨습니다. 최고입니다.' },
  { name: '강OO', type: '익명', content: '정말 믿고 맡길 수 있는 곳입니다. 세세한 부분까지 신경써주셔서 진심으로 감사드립니다.' }
];

const ReviewCard = ({ review, onClick }: { review: any, onClick?: () => void }) => (
  <div onClick={onClick} className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 md:gap-10 p-6 md:p-12 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl h-full shadow-lg md:shadow-2xl transition-colors hover:bg-white/10 mx-3 md:mx-4 w-[75vw] sm:w-[450px] md:w-[700px] flex-shrink-0 cursor-pointer will-change-transform">
    {/* Avatar */}
    <div className="flex-shrink-0">
      <div className="w-16 h-16 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/20 flex items-center justify-center p-1 shadow-inner">
        <div className="w-full h-full rounded-full bg-black/50 flex items-center justify-center overflow-hidden">
          <User className="w-8 h-8 md:w-16 md:h-16 text-white/40" />
        </div>
      </div>
    </div>
    
    {/* Content */}
    <div className="flex flex-col flex-1 h-full justify-center w-full">
      <div className="flex justify-center sm:justify-start gap-1 text-gold mb-3 md:mb-6">
        {[...Array(5)].map((_, j) => (
          <svg key={j} className="w-3.5 h-3.5 md:w-5 md:h-5 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-[13px] md:text-2xl font-light text-white/90 leading-relaxed mb-4 md:mb-8 italic whitespace-pre-wrap text-center sm:text-left line-clamp-4 md:line-clamp-none break-keep">
        "{review.content}"
      </p>
      <div className="mt-auto text-center sm:text-left">
        <div className="font-serif text-base md:text-2xl text-white">{review.author_name || review.name || '익명'}</div>
        <div className="text-[10px] md:text-sm uppercase tracking-widest text-gold mt-1 md:mt-2 opacity-80">{review.title || review.type || '고객 후기'}</div>
      </div>
    </div>
  </div>
);

const OfficeGallery = () => {
  const images = ['/ㅇㅇ/1.jpg', '/ㅇㅇ/2.jpg', '/ㅇㅇ/3.jpg', '/ㅇㅇ/4.jpg', '/ㅇㅇ/5.jpg', '/ㅇㅇ/6.jpg'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative w-full h-[40vh] sm:h-[50vh] md:h-[90vh] overflow-hidden bg-black border-t border-white/10">
      <AnimatePresence>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-contain md:object-cover"
          alt={`Office Snapshot ${currentIndex + 1}`}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-neutral-950/20 pointer-events-none z-10 mix-blend-multiply" />
    </section>
  );
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [legalModalContent, setLegalModalContent] = useState<'privacy' | 'terms' | 'compliance' | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isCompanyIntroOpen, setIsCompanyIntroOpen] = useState(false);
  const [isScrolledForBanner, setIsScrolledForBanner] = useState(false);
  const [realReviews, setRealReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
        if (data && data.length > 0) setRealReviews(data);
      } catch (err) { console.error('Failed to fetch reviews:', err); }
    };
    fetchReviews();
  }, []);

  const displayReviews = realReviews.length > 0 ? [...realReviews, ...realReviews] : [...VIRTUAL_REVIEWS, ...VIRTUAL_REVIEWS];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledForBanner(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateStepKeyframes = (name: string, steps: number, customPauseFraction: number = 0.75) => {
    if (steps <= 0) return '';
    let css = `@keyframes ${name} {\n`;
    const cyclePercent = 100 / steps;
    const pauseFraction = customPauseFraction;

    for (let i = 0; i < steps; i++) {
        const cycleStart = i * cyclePercent;
        const moveStart = cycleStart + (cyclePercent * pauseFraction);
        const currentPos = `-${(i * 50) / steps}%`;
        const nextPos = `-${((i + 1) * 50) / steps}%`;

        css += `  ${cycleStart}% { transform: translateX(${currentPos}); animation-timing-function: linear; }\n`;
        css += `  ${moveStart}% { transform: translateX(${currentPos}); animation-timing-function: ease-in-out; }\n`;
        
        if (i === steps - 1) {
            css += `  100% { transform: translateX(${nextPos}); animation-timing-function: linear; }\n`;
        }
    }
    css += `}\n`;
    return css;
  };

  const displayReviewsCount = Math.max(1, Math.floor(displayReviews.length / 2));
  const reviewKeyframesCss = generateStepKeyframes('infinite-scroll', displayReviewsCount, 0.75); // 75% pause
  const certKeyframesCss = generateStepKeyframes('cert-infinite-scroll', EXTRA_CERTS.length, 0.4); // 40% pause, 60% move (longer scroll)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      } else {
        setSubmitStatus('idle');
        alert('Error submitting form.');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('idle');
    }
  };

  const toggleLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  useEffect(() => {
    // Rely on native smooth scrolling for better performance, mobile zooming, and zero scroll jank
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          const y = el.getBoundingClientRect().top + window.scrollY - 100; // Offset for navbar
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  return (
    <div className="min-h-screen font-sans selection:bg-white/20 relative">
      {/* Fixed Global Background */}
      <div className="fixed inset-0 w-full h-full -z-50 bg-[#0A1128]">
        <img
          src="/dark_navy_building_bg.png"
          alt="Global Background"
          className="w-full h-full object-cover opacity-[0.15] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/80 via-[#0A1128]/40 to-[#0A1128]/90 pointer-events-none" />
      </div>

      {/* Success Overlay */}
      {submitStatus === 'success' && (
        <div className="fixed inset-0 z-[100] bg-white text-black flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center flex flex-col items-center max-w-lg"
          >
            <img
              src="/Logo/logo.png"
              alt="MD Logo"
              className="w-48 mb-12 select-none"
            />
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight whitespace-pre-line" dangerouslySetInnerHTML={{ __html: t('inquiry.success_title') }} />
            <p className="text-xl md:text-2xl font-light opacity-60 mb-12 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: t('inquiry.success_desc') }} />
            <button
              onClick={() => setSubmitStatus('idle')}
              className="px-8 py-4 bg-black text-white rounded-full font-medium tracking-tight hover:scale-105 transition-transform duration-500"
            >
              {t('inquiry.success_btn')}
            </button>
          </motion.div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white text-black max-w-2xl w-full max-h-[80vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative"
          >
            <div className="p-6 md:p-8 flex justify-between items-center border-b border-black/10">
              <h3 className="text-xl md:text-2xl font-serif font-bold">{t('inquiry.privacy.title')}</h3>
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="w-10 h-10 flex items-center justify-center bg-black/5 rounded-full hover:bg-black/10 transition-colors"
              >
                <Lock size={18} className="opacity-60" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto font-light text-sm md:text-base leading-relaxed opacity-80 whitespace-pre-wrap">
              {t('inquiry.privacy.content')}
            </div>

            <div className="p-6 md:p-8 border-t border-black/10 bg-black/5">
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="w-full py-4 bg-black text-white rounded-full font-medium hover:scale-[1.02] transition-transform duration-300"
              >
                {i18n.language === 'ko' ? '확인' : 'Confirm'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col pt-24 px-8 text-white pointer-events-auto"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-6 p-2 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8 text-2xl font-serif tracking-widest mt-12">
              <button 
                onClick={() => { setIsCompanyIntroOpen(true); setIsMobileMenuOpen(false); }} 
                className="text-left hover:text-gold transition-colors"
              >
                회사소개
              </button>
              <Link to="/reviews" className="hover:text-gold transition-colors">이용후기</Link>
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition-colors">{t('nav.services')}</a>
              <a href="#procedure" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition-colors">{t('nav.procedure')}</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition-colors">{t('nav.inquiry')}</a>
            </div>
            
            <div className="mt-auto mb-16 border-t border-white/10 pt-8 flex flex-col gap-8">
              <div className="flex gap-4">
                <button
                  onClick={() => { toggleLanguage('en'); setIsMobileMenuOpen(false); }}
                  className={`text-lg transition-colors ${i18n.language === 'en' ? 'text-gold' : 'text-white/50'}`}
                >
                  EN
                </button>
                <span className="text-white/20">|</span>
                <button
                  onClick={() => { toggleLanguage('ko'); setIsMobileMenuOpen(false); }}
                  className={`text-lg transition-colors ${i18n.language === 'ko' ? 'text-gold' : 'text-white/50'}`}
                >
                  KR
                </button>
              </div>
              <button className="text-[13px] uppercase tracking-[0.2em] border border-white/20 px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-500 self-start">
                {t('nav.portal')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Floating Links */}
      <div className={`fixed right-4 md:right-8 z-[90] flex flex-col gap-4 transform transition-all duration-500 ${isScrolledForBanner ? 'bottom-[110px] md:bottom-8' : 'bottom-8'}`}>
        <a
          href="tel:010-3985-8279"
          className="hidden md:flex w-14 h-14 bg-green-600 text-white border border-white/20 rounded-full items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 relative group"
        >
          <Phone size={24} fill="currentColor" />
          <span className="absolute right-full mr-4 bg-black/90 backdrop-blur-sm text-white text-xs py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10 pointer-events-none">
            대표 전화걸기: 010-3985-8279
          </span>
        </a>
        <a
          href="http://pf.kakao.com/_vxlIxhX/chat"
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 bg-[#FEE500] text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 relative group"
        >
          <MessageCircle size={24} fill="currentColor" />
          <span className="absolute right-full mr-4 bg-black/90 backdrop-blur-sm text-white text-xs py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10 pointer-events-none">
            카카오톡 연락하기
          </span>
        </a>
        <a
          href="https://t.me/mdetection1"
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 bg-[#24A1DE] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 relative group"
        >
          <Send size={24} fill="currentColor" className="ml-1" />
          <span className="absolute right-full mr-4 bg-black/90 backdrop-blur-sm text-white text-xs py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10 pointer-events-none">
            텔레그램 연락하기
          </span>
        </a>
        {/* Invisible Spacer to keep layout identical after removing Instagram */}
        <div className="w-14 h-14 pointer-events-none" />
      </div>

      {/* Navigation - Logo Only (No Mix Blend) */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "circOut" }}
        className="fixed top-0 left-0 w-full z-[51] px-4 md:px-8 py-6 flex items-center pointer-events-none"
      >
        <a href="#" className="flex items-center gap-4 pointer-events-auto hover:opacity-80 transition-opacity">
          <img src="/PIA.png" alt="PIA Logo" className="h-8 md:h-12 w-auto object-contain" />
        </a>
      </motion.nav>

      {/* Navbar Fixed Shadow Layer to replace mix-blend */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-[49] pointer-events-none" />

      {/* Navigation - Text Elements */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "circOut" }}
        className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-6 flex justify-between items-center pointer-events-none text-white drop-shadow-md"
      >
        <a href="#" className="flex items-center gap-4 pointer-events-auto hover:opacity-80 transition-opacity">
          {/* Transparent spacer to maintain exact layout alignment */}
          <img src="/PIA.png" alt="" className="h-8 md:h-12 w-auto object-contain opacity-0 pointer-events-none" />
          <div className="text-xl md:text-2xl font-serif tracking-tighter font-bold whitespace-nowrap -mt-3 md:-mt-1.5 pb-0.5">한국공인탐정협회</div>
        </a>

        <div className="hidden md:flex gap-8 lg:gap-12 text-[13px] md:text-[14px] uppercase tracking-[0.2em] font-medium items-center pointer-events-auto">
          <button onClick={() => setIsCompanyIntroOpen(true)} className="hover:opacity-50 transition-opacity">회사소개</button>
          <Link to="/reviews" className="hover:opacity-50 transition-opacity">이용후기</Link>
          <a href="#services" className="hover:opacity-50 transition-opacity">{t('nav.services')}</a>
          <a href="#procedure" className="hover:opacity-50 transition-opacity">{t('nav.procedure')}</a>
          <a href="#contact" className="hover:opacity-50 transition-opacity">{t('nav.inquiry')}</a>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 hover:opacity-50 transition-opacity pointer-events-auto"
            >
              <Globe size={18} />
              {i18n.language.toUpperCase()}
            </button>
            {isLangMenuOpen && (
              <div className="absolute top-full mt-4 right-0 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden py-2 min-w-[100px] pointer-events-auto">
                <button
                  onClick={() => toggleLanguage('en')}
                  className={`w-full text-left px-4 py-2 hover:bg-white/10 transition-colors ${i18n.language === 'en' ? 'text-gold' : 'text-white'}`}
                >
                  English
                </button>
                <button
                  onClick={() => toggleLanguage('ko')}
                  className={`w-full text-left px-4 py-2 hover:bg-white/10 transition-colors ${i18n.language === 'ko' ? 'text-gold' : 'text-white'}`}
                >
                  한국어
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 pointer-events-auto">
          <button className="hidden md:block text-[13px] md:text-[14px] uppercase tracking-[0.2em] border border-white/20 px-5 py-2.5 md:px-8 md:py-3 rounded-full hover:bg-white hover:text-black transition-all duration-500">
            {t('nav.portal')}
          </button>
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 -mr-2 hover:opacity-70 transition-opacity text-white"
            aria-label="Open Menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video Background */}
        <video
          ref={(el) => {
            if (el) {
              el.setAttribute('muted', 'true');
              el.setAttribute('playsinline', '');
              el.defaultMuted = true;
              el.muted = true;
              const playPromise = el.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {}); // prevent uncaught promise on low power mode
              }
            }
          }}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
        >
          <source src="https://videos.pexels.com/video-files/3121459/3121459-hd_1920_1080_24fps.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 text-center px-4 max-w-5xl mt-16 md:mt-0 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center mt-4 md:mt-8"
          >
            <img
              src="/logo.png"
              alt="MD Logo"
              className="w-56 md:w-[28rem] mb-8 select-none"
              style={{ filter: "invert(1) brightness(1.5)" }}
            />
            <h2 className="text-2xl md:text-4xl font-serif tracking-[0.5em] md:tracking-[1em] font-light opacity-80 pl-[0.5em] md:pl-[1em]">
              탐정사무소
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 md:mt-20 flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <a
              href="#contact"
              className="px-12 py-5 bg-white text-black rounded-full font-medium tracking-tight hover:scale-105 transition-transform duration-500 flex items-center gap-3"
            >
              {t('hero.btn_start')} <ArrowRight size={16} />
            </a>
            <a
              href="#services"
              className="px-12 py-5 border border-white/20 rounded-full font-medium tracking-tight hover:bg-white/5 transition-colors duration-500"
            >
              {t('hero.btn_expertise')}
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
          <span className="text-[10px] uppercase tracking-widest">{t('hero.scroll')}</span>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-10 md:py-14 bg-black text-white relative z-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3 gap-2 md:gap-8 divide-x divide-white/10">
            <div className="flex flex-col items-center justify-center text-center px-2 md:px-0">
              <span className="text-[10px] md:text-sm font-light text-white/60 tracking-widest mb-2 md:mb-3 break-keep">사건 해결률</span>
              <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-gold drop-shadow-lg">
                <CountUp end={95} suffix="%" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-2 md:px-0">
              <span className="text-[10px] md:text-sm font-light text-white/60 tracking-widest mb-2 md:mb-3 break-keep">누적 고객수</span>
              <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white drop-shadow-lg">
                <CountUp end={1130} suffix="명" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-2 md:px-0">
              <span className="text-[10px] md:text-sm font-light text-white/60 tracking-widest mb-2 md:mb-3 break-keep">총 의뢰수</span>
              <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white drop-shadow-lg">
                <CountUp end={1032} suffix="건" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Intro Section */}
      <section className="relative py-24 md:py-32 bg-transparent text-white overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-3/4 max-w-[280px] sm:max-w-none sm:w-1/2 lg:w-5/12 mx-auto lg:mx-0 relative order-1"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-white/10">
              <img src="/부엉이/대표1.png" alt="대표 이미지" className="w-full h-full object-cover object-top" />
            </div>
            {/* Image Decoration Base */}
            <div className="absolute -z-10 top-4 -left-4 w-full h-full border border-gold/30 rounded-2xl hidden lg:block"></div>
          </motion.div>

          {/* Text */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-7/12 flex flex-col order-2"
          >
            <h3 className="text-3xl md:text-5xl font-serif font-bold leading-[1.4] mb-8 break-keep">
              "공중파 방송이 증명한 베테랑,<br className="hidden md:block" />
              <span className="text-gold">결과로 말하는 엠디탐정</span>"
            </h3>
            
            <p className="text-base md:text-xl font-light text-white/80 leading-[1.8] mb-6 break-keep">
              <strong className="text-white font-medium">엠디탐정은 끝까지 책임집니다.</strong> 밑바닥부터 현장을 누비며 쌓아온 경험, 엠디탐정은 시작부터 다릅니다.
            </p>
            
            <p className="text-base md:text-xl font-light text-white/80 leading-[1.8] mb-8 break-keep">
              저 엠디탐정 대표는 유명 유튜브 채널과 지상파 방송에 출연하며 실력을 검증받은 탐정회사에서 모든 사건을 직접 도맡아 해결해 왔습니다. 풍부한 경험은 곧 압도적인 결과의 차이를 만듭니다. 현장에서 다져진 노하우로 당신이 바라는 최선의 결과를 도출해 내겠습니다. 저희가 해결하지 못하는 사건이라면, 그 누구도 해결할 수 없습니다.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {[
                { title: '실제 존재하는 사무실', desc: '방문상담 언제든 환영' },
                { title: '대표가 직접 진두지휘하는 현장', desc: '대표가 현장을 직접 확인하고 설계합니다.' },
                { title: '미해결 사건 as', desc: '엠디 탐정은 수 많은 사건 경험으로 상황에 맞는 솔루션을 제공합니다.' }
              ].map((item, idx) => (
                <div key={idx} className="group relative bg-white/5 border border-white/10 p-5 rounded-xl flex items-start gap-4 hover:bg-white/10 transition-colors duration-300">
                  <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-md pointer-events-none"></div>
                  <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                  <div className="relative z-10">
                    <h4 className="text-white font-bold text-base md:text-lg mb-1">{item.title}</h4>
                    <p className="text-white/70 text-sm md:text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold"></div>
              <p className="text-lg md:text-2xl font-medium leading-[1.6] break-keep">
                MD는 고객의 입장에서 사건을 생각합니다.<br className="hidden md:block" />
                <span className="text-gold font-bold break-keep">저희가 확실하게 해결해 드리겠습니다.</span>
              </p>
            </div>
            
            <div className="mt-8 flex justify-center lg:justify-start">
              <img src="/logo.png" alt="MD Logo" className="h-10 md:h-12 opacity-50" style={{ filter: "invert(1) brightness(1.5)" }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Office Gallery Section */}
      <OfficeGallery />

      {/* Media & Press Section (Relocated right below Hero) */}
      <section className="py-16 md:py-32 bg-[#F8F9FA] text-black relative z-20 border-t-[12px] border-black overflow-hidden sm:overflow-visible">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
            {/* Left Header - Editorial Style */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/3 flex flex-col"
            >
              <span className="text-red-600 font-bold tracking-[0.2em] mb-4 md:mb-6 text-sm md:text-base inline-flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                MD IN THE MEDIA
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-black mb-6 md:mb-8 leading-[1.3] break-keep">
                {t('media.title1')} <br />
                <span className="text-zinc-400 italic font-light">{t('media.title2')}</span>
              </h2>
              <p className="text-base md:text-lg font-medium text-black/70 leading-[1.8] mb-4 md:mb-8 break-keep">
                {t('media.desc')}
              </p>
              <div className="w-full h-px bg-black/10 my-4 hidden lg:block"></div>
            </motion.div>

            {/* Right Cards - News Feed Style (Horizontal scroll on mobile) */}
            <div className="lg:w-2/3 flex flex-row overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 gap-4 md:gap-8 pb-4 sm:pb-0 sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[
                {
                  type: t('media.news'),
                  title: t('media.items.news1'),
                  url: 'https://www.gynews.kr/news/articleView.html?idxno=70322',
                  image: '/뉴스/뉴스1.JPG',
                  color: 'bg-red-600',
                  textHighlight: 'text-red-600'
                },
                {
                  type: t('media.news'),
                  title: t('media.items.news2'),
                  url: 'http://www.news24korea.com/news/475478',
                  image: '/뉴스/뉴스2.JPG',
                  color: 'bg-red-600',
                  textHighlight: 'text-red-600'
                },
                {
                  type: t('media.blog'),
                  title: t('media.items.blog1'),
                  url: 'https://m.blog.naver.com/mdetection/224213275756',
                  image: '/뉴스/블로그1.JPG',
                  color: 'bg-blue-600',
                  textHighlight: 'text-blue-600'
                },
                {
                  type: t('media.blog'),
                  title: t('media.items.blog2'),
                  url: 'https://m.blog.naver.com/mdetection/224227005611',
                  image: '/뉴스/블로그2.JPG',
                  color: 'bg-blue-600',
                  textHighlight: 'text-blue-600'
                }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className="group flex flex-col bg-white overflow-hidden shadow-lg hover:shadow-2xl border border-black/5 hover:-translate-y-2 transition-transform duration-500 rounded-lg flex-shrink-0 w-[85vw] sm:w-auto snap-center sm:snap-align-none"
                >
                  <div className="w-full aspect-[16/10] overflow-hidden relative group-hover:shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] transition-shadow duration-500">
                    <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-black/90 backdrop-blur-md rounded shadow-lg text-[11px] font-bold text-white tracking-wider flex items-center gap-2 transition-transform duration-500">
                       <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                       {item.type}
                    </div>
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 group-hover:brightness-[0.3] transition-all duration-700" />
                    
                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
                      <div className="px-6 py-3 bg-black/60 backdrop-blur-sm border border-white/20 text-white font-bold text-sm tracking-wider rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 shadow-2xl">
                        자세히 보기 <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-1 bg-white relative">
                    <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${item.color === 'bg-red-600' ? 'from-red-600' : 'from-blue-600'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <h3 className={`text-lg md:text-xl font-bold leading-[1.6] mb-8 text-black group-hover:${item.textHighlight} transition-colors line-clamp-3`}>
                      "{item.title}"
                    </h3>
                    <div className={`mt-auto flex items-center justify-between opacity-50 group-hover:opacity-100 group-hover:${item.textHighlight} transition-all font-bold uppercase text-xs tracking-widest`}>
                      <span className="relative">
                        기사 확인하기
                        <span className={`absolute -bottom-1 left-0 w-full h-px ${item.color.replace('bg-', '')} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`}></span>
                      </span>
                      <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Agents Section (Relocated right below Media & Press) */}
      <section id="agents" className="py-16 md:py-32 px-4 md:px-8 bg-transparent border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeInUp}
            className="text-center mb-10 md:mb-24"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] mb-4 md:mb-8 block opacity-40 font-mono text-gold">{t('agents.label')}</span>
            <h2 className="text-3xl md:text-6xl font-serif italic mb-4 md:mb-8">{t('agents.title')}</h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 md:gap-12 max-w-5xl mx-auto">
            {[
              {
                id: 'ceo',
                image: '/agent/노천석.jpg?v=2',
                role: t('agents.list.ceo.role'),
                name: t('agents.list.ceo.name'),
                desc: t('agents.list.ceo.desc', { returnObjects: true })
              },
              {
                id: 'director',
                image: '/agent/윤지한.jpg?v=2',
                role: t('agents.list.director.role'),
                name: t('agents.list.director.name'),
                desc: t('agents.list.director.desc', { returnObjects: true })
              },
              {
                id: 'team1',
                image: '/agent/장진원.jpg?v=2',
                role: t('agents.list.team1.role'),
                name: t('agents.list.team1.name'),
                desc: t('agents.list.team1.desc', { returnObjects: true })
              },
              {
                id: 'team2',
                image: '/agent/김채윤.jpg?v=2',
                role: t('agents.list.team2.role'),
                name: t('agents.list.team2.name'),
                desc: t('agents.list.team2.desc', { returnObjects: true })
              }
            ].map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative bg-white/[0.02] border border-white/10 rounded-2xl md:rounded-[2rem] p-6 sm:p-8 md:p-12 text-center group hover:bg-white/[0.05] hover:border-gold/30 hover:-translate-y-2 transition-all duration-500 shadow-xl md:shadow-2xl overflow-hidden flex flex-col items-center"
              >
                {/* Glowing effect background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative w-full aspect-[4/5] object-top mb-6 md:mb-8 rounded-xl overflow-hidden border border-white/5 group-hover:border-gold/50 shadow-lg md:shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] transition-all duration-700 z-10 bg-black/50">
                  <img
                    src={agent.image}
                    alt={agent.role}
                    className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                  />
                </div>

                <div className="relative z-10 w-full flex flex-col items-center mt-2 md:mt-2">
                  <h3 className="text-base sm:text-xl md:text-3xl lg:text-4xl font-serif mb-2 md:mb-2 text-white/90 group-hover:text-white transition-colors duration-300 tracking-wide break-keep flex flex-col md:flex-row items-center justify-center">
                    <span>{agent.role}</span> <span className="text-gold font-light mt-1 md:mt-0 md:ml-2 text-sm sm:text-lg md:text-2xl lg:text-3xl">{agent.name}</span>
                  </h3>

                  <div className="w-8 md:w-12 h-[2px] md:h-1 bg-gradient-to-r from-gold to-[#f9d976] rounded-full my-4 md:my-6 group-hover:w-16 md:group-hover:w-24 transition-all duration-500" />

                  {/* Descriptions visible on mobile but highly compact */}
                  <div className="flex flex-col text-white/60 transition-colors duration-300 max-w-sm w-full mx-auto px-1 md:px-2">
                    {Array.isArray(agent.desc) && agent.desc.map((line: string, idx: number) => {
                      const isTitle = line.startsWith('[') && line.endsWith(']');
                      if (isTitle) {
                        return (
                          <div key={idx} className={`text-gold font-bold mb-2 pb-1 text-[11px] md:text-[13px] text-center tracking-widest border-b border-white/10 w-full font-serif mx-auto ${idx === 0 ? 'mt-2 md:mt-4' : 'mt-4 md:mt-5'}`}>
                            {line.substring(1, line.length - 1)}
                          </div>
                        );
                      }
                      return (
                        <div key={idx} className="flex items-start justify-start gap-1.5 md:gap-2 mb-1.5 md:mb-2 px-1 md:px-0">
                          <span className="text-gold/40 text-[8px] md:text-[10px] mt-[3px] md:mt-[4px]">▪</span>
                          <span className="text-[11px] md:text-[13px] font-light text-white/70 group-hover:text-white/90 transition-colors tracking-tight text-left leading-[1.6] flex-1 break-keep">{line}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section (Relocated right below Agents) */}
      <section id="certifications" className="py-20 md:py-32 px-4 md:px-8 bg-[#fafafa] text-black border-t border-black/5 relative overflow-hidden">
        {/* Subtle Building Blend Decoration */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
          <img src="/dark_navy_building_bg.png" alt="background" className="w-full h-full object-cover mix-blend-multiply grayscale" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12 md:mb-20 flex flex-col items-center w-full"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] mb-4 md:mb-6 block opacity-40 font-mono text-black">{t('certifications.label')}</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif italic mb-6 md:mb-8 leading-tight break-keep">
              {t('certifications.title')}
            </h2>
            <p className="text-sm md:text-lg font-medium opacity-60 leading-relaxed px-4 md:px-0 max-w-2xl mx-auto text-center break-keep">
              {t('certifications.desc')}
            </p>
          </motion.div>

          {/* Grid of 4 Certificates - Compact 2x2 on mobile, 4 in a row on PC */}
          <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4 md:px-0 max-w-md sm:max-w-5xl lg:max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative w-full aspect-[1/1.35] border border-black/10 group bg-transparent rounded-md overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-500 bg-white"
              >
                {/* Overlay effect */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                <img
                  src={`/cert${item}.jpg`}
                  alt={`Certification ${item}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>

          {/* Marquee for other certificates */}
          <style>{`
${certKeyframesCss}
            .animate-cert-scroll {
              animation: cert-infinite-scroll 40s linear infinite;
              will-change: transform;
              transform: translateZ(0);
            }
          `}</style>
          <div className="mt-12 md:mt-24 w-full overflow-hidden relative">
            {/* Fade edges */}
            <div className="absolute top-0 left-0 w-6 md:w-24 h-full bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-6 md:w-24 h-full bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex gap-4 md:gap-8 w-max items-center animate-cert-scroll">
              {[...EXTRA_CERTS, ...EXTRA_CERTS].map((src, idx) => (
                <div key={idx} className="relative h-48 sm:h-64 md:h-80 w-auto bg-transparent overflow-hidden flex-shrink-0 group">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none hidden md:block" />
                  <img src={src} alt={`Extra Certification ${idx}`} className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clobet On-Site Dominance Section */}
      <section className="relative py-24 md:py-32 px-4 md:px-8 bg-transparent text-white overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 z-0 pointer-events-none mix-blend-lighten">
          {/* Background Layer 1: Center-aligned main image */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/Clobet/Gemini_Generated_Image_8035cv8035cv8035.png"
              alt="MD Tactical Experience 1"
              className="w-full h-full object-cover opacity-40 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128] via-[#0A1128]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#0A1128] via-transparent to-[#0A1128]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-[#0A1128]/80" />
          </div>

          {/* Background Layer 2: Left-aligned overlay image */}
          <div className="absolute top-0 left-0 w-full lg:w-1/2 h-full hidden lg:block">
            <img
              src="/Clobet/Gemini_Generated_Image_fj9fnofj9fnofj9f.png"
              alt="MD Tactical Experience 2"
              className="w-full h-full object-cover opacity-30 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128]/90 via-transparent to-[#0A1128]" />
          </div>

          {/* Background Layer 3: Overlay accent */}
          <div className="absolute top-0 left-1/4 w-full h-full lg:w-3/4">
            <img
              src="/Clobet/Gemini_Generated_Image_yv62jhyv62jhyv62.png"
              alt="MD Tactical Experience 3"
              className="w-full h-full object-cover opacity-20 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#0A1128] via-transparent to-[#0A1128]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left Side: Powerful Message */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6"
          >
            <h2 className="text-5xl md:text-7xl font-black font-sans leading-[1.1] text-white tracking-tighter">
              {t('clobe.title1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">{t('clobe.title2')}</span>
            </h2>
            <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed max-w-lg whitespace-pre-line mt-6">
              {t('clobe.desc')}
            </p>
          </motion.div>

          {/* Right Side: Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="space-y-12 lg:pl-12 lg:border-l border-white/10"
          >
            <h3 className="text-3xl md:text-4xl font-serif italic text-gold">
              {t('clobe.side_title')}
            </h3>

            <div className="space-y-8">
              <div className="flex gap-6 items-start group">
                <div className="mt-1 p-4 bg-white/5 rounded-full text-white group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-xl">
                  <Target size={28} />
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-bold mb-3 text-white tracking-tight">{t('clobe.features.military.title')}</h4>
                  <p className="text-base md:text-lg font-light text-white/60 leading-relaxed">
                    {t('clobe.features.military.desc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="mt-1 p-4 bg-white/5 rounded-full text-white group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-xl">
                  <ShieldAlert size={28} />
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-bold mb-3 text-white tracking-tight">{t('clobe.features.control.title')}</h4>
                  <p className="text-base md:text-lg font-light text-white/60 leading-relaxed">
                    {t('clobe.features.control.desc')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section (Auto-scrolling with Supabase integration) */}
      <section className="py-16 md:py-32 bg-transparent text-white overflow-hidden relative border-t border-white/5">
        <div className="w-full">
          <div className="text-center mb-12 md:mb-20 px-4">
            <span className="text-[10px] uppercase tracking-[0.5em] mb-4 md:mb-6 block opacity-40 font-mono text-gold">TESTIMONIALS</span>
            <h2 className="text-4xl md:text-6xl font-serif italic leading-tight">실제 고객 이용후기</h2>
          </div>

          <style>{`
${reviewKeyframesCss}
            .animate-infinite-scroll {
              animation: infinite-scroll 25s linear infinite;
              will-change: transform;
              transform: translateZ(0);
            }
          `}</style>
          
          <div className="relative w-full overflow-hidden py-4">
            <div className="flex w-max animate-infinite-scroll">
              {displayReviews.map((review, idx) => (
                <ReviewCard key={idx} review={review} onClick={() => navigate('/reviews')} />
              ))}
            </div>
            
            {/* Soft gradient mask mimicking global background for edge fade */}
            <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 px-4 md:px-8 bg-white text-black relative overflow-hidden">
        {/* Subtle Building Blend Decoration */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]">
          <img src="/dark_navy_building_bg.png" alt="background" className="w-full h-full object-cover mix-blend-multiply grayscale" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            {...fadeInUp}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-4 md:gap-8"
          >
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-7xl font-serif italic mb-6 md:mb-8">
                {t('services.title1')}
                {t('services.title2') && <><br />{t('services.title2')}</>}
              </h2>
              <p className="text-lg md:text-xl opacity-60 font-light">
                {t('services.desc')}
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="text-[80px] md:text-[120px] font-serif opacity-5 leading-none mt-8 md:mt-0 hidden md:block">01</span>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 border border-black/10"
          >
            {[
              {
                title: t('services.items.debt.title'),
                desc: t('services.items.debt.desc', { returnObjects: true }),
                image: '/제비/개인 및 가정 문제.jpg'
              },
              {
                title: t('services.items.background.title'),
                desc: t('services.items.background.desc', { returnObjects: true }),
                image: '/제비/신변위협 문제.jpg'
              },
              {
                title: t('services.items.school.title'),
                desc: t('services.items.school.desc', { returnObjects: true }),
                image: '/제비/범죄 문제.jpg'
              },
              {
                title: t('services.items.evidence.title'),
                desc: t('services.items.evidence.desc', { returnObjects: true }),
                image: '/제비/기업문제.jpg'
              },
              {
                title: t('services.items.corporate.title'),
                desc: t('services.items.corporate.desc', { returnObjects: true }),
                image: '/제비/금융 문제.jpg'
              },
              {
                title: t('services.items.detection.title'),
                desc: t('services.items.detection.desc', { returnObjects: true }),
                image: '/제비/해외 문제 및 기타 업무.jpg'
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white p-4 md:p-8 group hover:bg-black/5 transition-colors duration-700 h-full flex flex-col"
              >
                <div className="w-full aspect-[4/3] md:h-48 mb-4 md:mb-6 overflow-hidden rounded-lg bg-black/5">
                  <img src={service.image} alt={service.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-serif italic mb-3 md:mb-5 group-hover:translate-x-2 transition-transform duration-500 break-keep">
                  {service.title}
                </h3>
                <div className="opacity-70 font-light leading-relaxed mb-6 flex-grow space-y-2 md:space-y-3">
                  {Array.isArray(service.desc) ? service.desc.map((line: string, idx: number) => (
                    <p key={idx} className="flex items-start gap-1.5 md:gap-3">
                      <span className="text-gold mt-1 md:mt-1.5 min-w-[4px] md:min-w-[6px] h-1 md:h-1.5 rounded-full bg-gold inline-block flex-shrink-0"></span> <span className="text-xs sm:text-sm md:text-base break-keep line-clamp-2 md:line-clamp-none">{line}</span>
                    </p>
                  )) : <p className="text-xs sm:text-sm md:text-base break-keep line-clamp-3 md:line-clamp-none">{service.desc}</p>}
                </div>
                <div className="h-0.5 w-6 md:w-12 bg-black/20 group-hover:w-full transition-all duration-700 mt-auto" />
              </motion.div>
            ))}
          </motion.div>


        </div>
      </section>






      {/* Branch Info Section */}
      <BranchInfo />

      {/* Procedure Section */}
      <section id="procedure" className="py-20 md:py-32 px-4 md:px-8 bg-transparent border-t border-white/5 relative overflow-hidden text-white" style={{ fontFamily: "'Pretendard', sans-serif" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16 md:mb-24"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] mb-6 md:mb-8 block opacity-40 font-mono text-gold">{t('procedure.label')}</span>
            <h2 className="text-3xl md:text-5xl font-serif italic mb-6 md:mb-8 leading-tight">{t('procedure.title')}</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-8"
          >
            {(t('procedure.steps', { returnObjects: true }) as Array<{ num: string; title: string; desc: string }>).map((step, i) => {
              const Icon = [MessageSquareText, Users, Search, FileCheck, CheckCircle, Trash2][i];
              return (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white/5 border border-white/10 p-5 sm:p-6 md:p-12 group hover:bg-white/10 transition-colors duration-700 flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="flex justify-between items-start mb-4 md:mb-6 relative z-10">
                  <Icon className="w-6 h-6 md:w-10 md:h-10 text-gold opacity-80" strokeWidth={1.5} />
                  <div className="text-gold font-mono text-[10px] tracking-widest opacity-60 group-hover:opacity-100 transition-opacity duration-500">{step.num}</div>
                </div>
                <h3 className="text-base sm:text-lg md:text-2xl font-bold mb-2 md:mb-4 group-hover:translate-x-2 transition-transform duration-500 text-white relative z-10 break-keep">{step.title}</h3>
                <div className="text-white/60 font-light text-xs sm:text-sm md:text-base leading-relaxed mb-6 md:mb-12 flex-grow relative z-10 break-keep">{step.desc}</div>
                <div className="h-px w-6 md:w-8 bg-gold/30 group-hover:w-full transition-all duration-700 mt-auto relative z-10" />
              </motion.div>
            )})}
          </motion.div>
        </div>
      </section>


      {/* Inquiry Form Section */}
      <section id="contact" className="py-20 md:py-32 px-4 md:px-8 bg-white text-black relative overflow-hidden">
        {/* Subtle Building Blend Decoration */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]">
          <img src="/dark_navy_building_bg.png" alt="background" className="w-full h-full object-cover mix-blend-multiply grayscale" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-5xl md:text-8xl font-serif italic mb-6 md:mb-8">{t('inquiry.title1')} <br />{t('inquiry.title2')}</h2>
            <p className="text-lg md:text-xl font-light opacity-60 px-4 md:px-0">
              {t('inquiry.desc')}
            </p>
          </motion.div>

          <motion.form
            action="https://formspree.io/f/xnjgdyew"
            method="POST"
            onSubmit={handleFormSubmit}
            {...fadeInUp}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">{t('inquiry.form_name')}</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border-b border-black/20 py-4 focus:outline-none focus:border-black transition-colors bg-transparent"
                  placeholder={t('inquiry.form_name_placeholder')}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">{t('inquiry.form_phone')}</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full border-b border-black/20 py-4 focus:outline-none focus:border-black transition-colors bg-transparent"
                  placeholder={t('inquiry.form_phone_placeholder')}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">{t('inquiry.form_email')}</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border-b border-black/20 py-4 focus:outline-none focus:border-black transition-colors bg-transparent"
                  placeholder={t('inquiry.form_email_placeholder')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">{t('inquiry.form_service')}</label>
              <div className="relative">
                <select name="service_category" required className="w-full border-b border-black/20 py-4 focus:outline-none focus:border-black transition-colors bg-transparent appearance-none">
                  <option value="debt">{t('inquiry.form_service_options.debt')}</option>
                  <option value="background">{t('inquiry.form_service_options.background')}</option>
                  <option value="school">{t('inquiry.form_service_options.school')}</option>
                  <option value="evidence">{t('inquiry.form_service_options.evidence')}</option>
                  <option value="corporate">{t('inquiry.form_service_options.corporate')}</option>
                  <option value="detection">{t('inquiry.form_service_options.detection')}</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-40" size={16} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">{t('inquiry.form_overview')}</label>
              <textarea
                rows={4}
                name="message"
                required
                className="w-full border-b border-black/20 py-4 focus:outline-none focus:border-black transition-colors bg-transparent resize-none"
                placeholder={t('inquiry.form_overview_placeholder')}
              />
            </div>

            <div className="pt-12">
              <div className="flex items-start gap-4 mb-8 text-sm">
                <input
                  type="checkbox"
                  id="privacy-consent"
                  required
                  className="mt-1 w-4 h-4 accent-black"
                />
                <label htmlFor="privacy-consent" className="font-light opacity-80 select-none cursor-pointer flex-1 flex flex-wrap items-center gap-2">
                  {t('inquiry.privacy.agree')}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsPrivacyModalOpen(true);
                    }}
                    className="font-medium underline hover:text-black/60 transition-colors inline-block"
                  >
                    {t('inquiry.privacy.view')}
                  </button>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitStatus === 'submitting'}
                className={`w-full py-6 bg-black text-white rounded-full text-lg font-medium hover:scale-[1.02] transition-transform duration-500 ${submitStatus === 'submitting' ? 'opacity-50 pointer-events-none' : ''}`}
              >
                {submitStatus === 'submitting' ? '...' : t('inquiry.btn_submit')}
              </button>
              <p className="text-center mt-8 text-[10px] uppercase tracking-[0.2em] opacity-40">
                {t('inquiry.footer_note')}
              </p>

              <div className="mt-16 text-center text-black/60 font-light space-y-2">
                <h4 className="text-lg md:text-xl font-serif italic mb-4 font-bold text-black">{t('inquiry.company_info.name')}</h4>
                <p className="text-xs md:text-sm">{t('inquiry.company_info.details1')}</p>
                <p className="text-xs md:text-sm">{t('inquiry.company_info.details2')}</p>
                <p className="text-[10px] md:text-xs mt-6 opacity-40 whitespace-pre-wrap">{t('inquiry.company_info.copyright')}</p>
              </div>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 md:py-16 bg-[#fafafa] text-black relative overflow-hidden">
        {/* Subtle Building Blend Decoration */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
          <img src="/dark_navy_building_bg.png" alt="background" className="w-full h-full object-cover mix-blend-multiply grayscale" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center relative z-10">
          <div className="flex flex-nowrap justify-between items-center w-full gap-3 sm:gap-4 md:gap-8 lg:gap-12">
            {[
              "검찰.jpg",
              "경찰청.jpg",
              "공정위.jpg",
              "대법원.jpg",
              "한국가정법률.jpg",
              "한국소비자원.jpg"
            ].map((img, i) => (
              <img
                key={i}
                src={`/협력소/${img}`}
                alt={img.replace('.jpg', '')}
                className="h-6 sm:h-8 md:h-12 lg:h-14 w-[14%] object-contain mix-blend-multiply hover:-translate-y-1 lg:hover:-translate-y-2 transition-transform duration-300 drop-shadow-sm hover:drop-shadow-md"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 md:py-24 px-4 md:px-8 border-t border-white/10 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 md:gap-16">
          <div className="max-w-xs text-center md:text-left mx-auto lg:mx-0">
            <div className="text-3xl font-serif italic mb-6 md:mb-8">MD</div>
            <p className="text-sm opacity-40 leading-relaxed font-light">
              {t('footer.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 w-full lg:w-auto text-center md:text-left">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-8 opacity-40">{t('footer.locations')}</h4>
              <ul className="space-y-4 text-sm font-light opacity-60">
                <li>Seoul, KR</li>
                <li>London, UK</li>
                <li>New York, US</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-8 opacity-40">{t('footer.legal')}</h4>
              <ul className="space-y-4 text-sm font-light opacity-60">
                <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setLegalModalContent('privacy')}>{t('footer.legal_links.privacy')}</li>
                <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setLegalModalContent('terms')}>{t('footer.legal_links.terms')}</li>
                <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setLegalModalContent('compliance')}>{t('footer.legal_links.compliance')}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-8 opacity-40">{t('footer.contact')}</h4>
              <ul className="space-y-4 text-sm font-light opacity-60">
                <li>mdetection@naver.com</li>
                <li>010-3985-8279</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-widest opacity-30">
          <span>{t('footer.copyright')}</span>
          <span>{t('footer.encrypted')}</span>
        </div>
      </footer>

      {/* Legal Modal */}
      <AnimatePresence>
        {legalModalContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLegalModalContent(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative bg-white text-black p-8 md:p-12 w-full max-w-3xl rounded-3xl border border-black/10 shadow-2xl overflow-y-auto max-h-[85vh] z-10 custom-scrollbar"
            >
              <button
                onClick={() => setLegalModalContent(null)}
                className="absolute top-6 right-6 text-black/50 hover:text-black transition-colors bg-black/5 hover:bg-black/10 p-2 rounded-full"
              >
                <X size={24} />
              </button>
              
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-black border-b border-black/10 pb-6 pr-12">
                {t(`footer.legal_links.${legalModalContent}`)}
              </h3>
              
              <div className="text-base md:text-lg font-light text-black/80 whitespace-pre-wrap leading-relaxed space-y-6">
                {t(`legal_content.${legalModalContent}`) && t(`legal_content.${legalModalContent}`).split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <FloatingBanner />
      {isCompanyIntroOpen && <CompanyIntroModal onClose={() => setIsCompanyIntroOpen(false)} />}
    </div>
  );
}
