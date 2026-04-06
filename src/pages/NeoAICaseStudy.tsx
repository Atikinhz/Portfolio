import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../lib/utils';

const BlueDot = ({ className }: { className?: string }) => (
  <motion.span 
    animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className={cn("inline-block w-2 h-2 rounded-full bg-[#0055FF]", className)} 
  />
);

const SectionTitle = ({ children, eyebrow }: { children: React.ReactNode, eyebrow?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-12"
  >
    {eyebrow && (
      <div className="flex items-center gap-2 mb-4">
        <BlueDot />
        <span className="text-xs uppercase tracking-[0.3em] text-muted font-medium">{eyebrow}</span>
      </div>
    )}
    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary">
      {children}
    </h2>
  </motion.div>
);

const GlitchText = ({ children }: { children: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 50);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={cn("relative inline-block", isGlitching && "animate-pulse")}>
      {children}
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 -translate-x-[2px] text-[#0055FF] opacity-70 mix-blend-screen">{children}</span>
          <span className="absolute top-0 left-0 translate-x-[2px] text-red-500 opacity-70 mix-blend-screen">{children}</span>
        </>
      )}
    </span>
  );
};

export default function NeoAICaseStudy() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowBackToTop(latest > 0.1);
  });

  const brainScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);
  const brainOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);

  return (
    <div ref={containerRef} className="bg-white text-black font-sans selection:bg-[#0055FF] selection:text-white overflow-x-hidden">
      {/* Neural Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#0055FF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* 1. Header / Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-12"
        >
          <BlueDot className="w-3 h-3 shadow-[0_0_10px_rgba(0,85,255,0.5)]" />
          <span className="text-xl font-bold tracking-tighter">neo-AI</span>
        </motion.div>

        <div className="max-w-5xl w-full text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs md:text-sm uppercase tracking-[0.5em] text-muted mb-6 font-bold"
          >
            {t('neo_case_hero_eyebrow')}
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-9xl font-bold tracking-tighter mb-12 leading-[0.9]"
          >
            Unlock <br />
            <span className="text-[#0055FF]">YOUR FUTURE</span> <br />
            with AI
          </motion.h1>
        </div>

        <motion.div 
          style={{ scale: brainScale, opacity: brainOpacity }}
          className="relative w-full max-w-2xl aspect-square flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[#0055FF]/5 rounded-full blur-[120px] animate-pulse" />
          <img 
            src="/input_file_0.png" 
            alt="AI Brain" 
            className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_50px_rgba(0,85,255,0.2)]"
          />
          {/* Pulsing nodes overlay simulation */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.5, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
                className="absolute w-4 h-4 rounded-full bg-yellow-400 blur-md"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                }}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* 2. Project Overview */}
      <section className="py-32 px-6 bg-white relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <SectionTitle eyebrow="Overview">{t('neo_case_overview_title')}</SectionTitle>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl leading-relaxed text-muted font-medium"
            >
              {t('neo_case_overview_body')}
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[40px] overflow-hidden bg-surface border border-stroke p-12"
          >
            <img src="/input_file_0.png" alt="Brain Sidebar" className="w-full h-full object-contain opacity-50 grayscale hover:grayscale-0 transition-all duration-700" />
          </motion.div>
        </div>
      </section>

      {/* 3. Objectives */}
      <section className="py-32 px-6 bg-[#0a0a0a] text-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionTitle eyebrow="Goals">{t('neo_case_objectives_title')}</SectionTitle>
          <p className="text-2xl mb-16 text-gray-400 max-w-3xl">{t('neo_case_objectives_body')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: t('neo_case_obj_1_title'), desc: t('neo_case_obj_1_desc') },
              { title: t('neo_case_obj_2_title'), desc: t('neo_case_obj_2_desc') },
              { title: t('neo_case_obj_3_title'), desc: t('neo_case_obj_3_desc') },
              { title: t('neo_case_obj_4_title'), desc: t('neo_case_obj_4_desc') },
            ].map((obj, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#0055FF]/50 transition-colors group"
              >
                <BlueDot className="mt-2 shrink-0 group-hover:shadow-[0_0_15px_#0055FF]" />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">{obj.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{obj.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Visual & Content Strategy */}
      <section className="py-32 px-6 bg-white relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-32">
            <SectionTitle eyebrow="Strategy">{t('neo_case_strategy_title')}</SectionTitle>
            <p className="text-xl text-muted mb-12 leading-relaxed">{t('neo_case_strategy_body')}</p>
            
            <div className="space-y-8">
              {[
                { title: t('neo_case_strat_1_title'), desc: t('neo_case_strat_1_desc') },
                { title: t('neo_case_strat_2_title'), desc: t('neo_case_strat_2_desc') },
                { title: t('neo_case_strat_3_title'), desc: t('neo_case_strat_3_desc') },
                { title: t('neo_case_strat_4_title'), desc: t('neo_case_strat_4_desc') },
              ].map((strat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <BlueDot className="mt-1.5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">{strat.title}</h4>
                    <p className="text-muted text-sm leading-relaxed">{strat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[40px] overflow-hidden border border-stroke aspect-[4/5]"
            >
              <img src="/input_file_1.png" alt="Strategy Chess" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-[40px] overflow-hidden border border-stroke aspect-[4/5]"
            >
              <img src="/input_file_2.png" alt="Magazine Cover" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Content Examples Breakdown (Interactive) */}
      <section className="py-32 px-6 bg-[#0a0a0a] text-white relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-20">
          <SectionTitle eyebrow="Gallery">{t('neo_case_breakdown_title')}</SectionTitle>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-12 px-6 -mx-6 scrollbar-hide snap-x snap-mandatory">
          {[
            { img: "/input_file_0.png", title: t('neo_case_post1_title'), task: t('neo_case_post1_task'), exec: t('neo_case_post1_exec') },
            { img: "/input_file_1.png", title: t('neo_case_post2_title'), task: t('neo_case_post2_task'), exec: t('neo_case_post2_exec') },
            { img: "/input_file_2.png", title: t('neo_case_post3_title'), task: t('neo_case_post3_task'), exec: t('neo_case_post3_exec') },
            { img: "/input_file_3.png", title: t('neo_case_post4_title'), task: t('neo_case_post4_task'), exec: t('neo_case_post4_exec') },
          ].map((post, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="min-w-[320px] md:min-w-[500px] snap-center group"
            >
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden mb-8 border border-white/10 group-hover:border-[#0055FF]/50 transition-all duration-500">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#0055FF]">{post.title}</h3>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Task</p>
                  <p className="text-gray-300">{post.task}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Execution</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{post.exec}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Design System */}
      <section className="py-32 px-6 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <SectionTitle eyebrow="Architecture">{t('neo_case_design_title')}</SectionTitle>
              <p className="text-xl text-muted mb-12">{t('neo_case_design_body')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: t('neo_case_ds_1_title'), desc: t('neo_case_ds_1_desc') },
                  { title: t('neo_case_ds_2_title'), desc: t('neo_case_ds_2_desc') },
                  { title: t('neo_case_ds_3_title'), desc: t('neo_case_ds_3_desc') },
                  { title: t('neo_case_ds_4_title'), desc: t('neo_case_ds_4_desc') },
                ].map((ds, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-surface border border-stroke">
                    <BlueDot className="mb-4" />
                    <h4 className="font-bold mb-2">{ds.title}</h4>
                    <p className="text-muted text-sm leading-relaxed">{ds.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square bg-[#0a0a0a] rounded-[40px] p-12 overflow-hidden">
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
               <div className="relative z-10 w-full h-full border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center">
                  <div className="text-white/20 font-mono text-sm uppercase tracking-widest">Modular Grid System</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Results */}
      <section className="py-32 px-6 bg-[#0055FF] text-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionTitle eyebrow="Outcome">{t('neo_case_results_title')}</SectionTitle>
          <p className="text-2xl mb-16 text-white/80 max-w-3xl">{t('neo_case_results_body')}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t('neo_case_res_1_title'), desc: t('neo_case_res_1_desc'), stat: "100%" },
              { title: t('neo_case_res_2_title'), desc: t('neo_case_res_2_desc'), stat: "+40%" },
              { title: t('neo_case_res_3_title'), desc: t('neo_case_res_3_desc'), stat: "Low" },
              { title: t('neo_case_res_4_title'), desc: t('neo_case_res_4_desc'), stat: "Premium" },
            ].map((res, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20"
              >
                <div className="text-4xl font-bold mb-4">{res.stat}</div>
                <h4 className="font-bold mb-2">{res.title}</h4>
                <p className="text-white/70 text-sm leading-relaxed">{res.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Impact */}
      <section className="relative min-h-screen flex items-center justify-center py-32 px-6 bg-black overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-[#0055FF]/10 mix-blend-overlay z-10 animate-pulse" />
          <motion.img 
            animate={{ 
              scale: [1, 1.05, 1],
              filter: ["grayscale(100%) contrast(1.2)", "grayscale(100%) contrast(1.5)", "grayscale(100%) contrast(1.2)"]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            src="/input_file_3.png" 
            alt="Impact Clock" 
            className="w-full h-full object-cover" 
          />
        </motion.div>
        
        <div className="relative z-10 max-w-4xl text-center">
          <SectionTitle eyebrow="Conclusion">{t('neo_case_impact_title')}</SectionTitle>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-white leading-tight mb-12"
          >
            {t('neo_case_impact_body')}
          </motion.p>
          <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-[#0055FF] to-white/20">
            <div className="px-8 py-3 rounded-full bg-black text-white font-bold tracking-widest uppercase text-xs">
              Business Strategy through Design
            </div>
          </div>
        </div>
      </section>

      {/* 9. Key Takeaways */}
      <section className="py-32 px-6 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionTitle eyebrow="Lessons">{t('neo_case_takeaways_title')}</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: t('neo_case_kt_1_title'), desc: t('neo_case_kt_1_desc') },
              { title: t('neo_case_kt_2_title'), desc: t('neo_case_kt_2_desc') },
              { title: t('neo_case_kt_3_title'), desc: t('neo_case_kt_3_desc') },
            ].map((kt, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0055FF]/10 flex items-center justify-center">
                  <BlueDot />
                </div>
                <h4 className="text-xl font-bold">{kt.title}</h4>
                <p className="text-muted leading-relaxed">{kt.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Top */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0.5 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-white border border-stroke shadow-xl flex items-center justify-center group hover:border-[#0055FF] transition-all"
      >
        <div className="absolute inset-0 bg-[#0055FF] scale-0 group-hover:scale-100 rounded-full transition-transform duration-300" />
        <span className="relative z-10 text-xl group-hover:text-white transition-colors">↑</span>
      </motion.button>

      {/* 10. Footer Section */}
      <footer className="py-32 px-6 bg-[#0a0a0a] text-white text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-bold mb-12 tracking-tighter">
              Ready to <span className="text-[#0055FF]">Make Your Move?</span>
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 rounded-full bg-[#0055FF] text-white font-bold text-lg shadow-[0_0_30px_rgba(0,85,255,0.4)] hover:shadow-[0_0_50px_rgba(0,85,255,0.6)] transition-all"
            >
              {t('neo_case_cta')}
            </motion.button>
          </motion.div>
          
          <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <BlueDot />
              <span className="font-bold tracking-tighter">neo-AI</span>
            </div>
            <p className="text-gray-500 text-sm">© 2026 Nikita Zhorov. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
