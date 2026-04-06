import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function CaseStudyDetail() {
  const { t } = useLanguage();

  const sections = [
    {
      title: t('neo_ai_challenge_title'),
      desc: t('neo_ai_challenge_desc'),
      image: "/input_file_0.png",
      reversed: false
    },
    {
      title: t('neo_ai_strategy_title'),
      desc: t('neo_ai_strategy_desc'),
      image: "/input_file_1.png",
      reversed: true
    },
    {
      title: t('neo_ai_results_title'),
      desc: t('neo_ai_results_desc'),
      image: "/input_file_2.png",
      reversed: false
    }
  ];

  return (
    <section className="bg-bg py-24 md:py-40 relative overflow-hidden">
      {/* AI Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-accent/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24 md:mb-40"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">{t('neo_ai_subtitle')}</span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-5xl md:text-8xl font-medium">
            {t('neo_ai_title')} <span className="font-display italic">Case Study</span>
          </h2>
        </motion.div>

        <div className="space-y-32 md:space-y-64">
          {sections.map((section, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${section.reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
            >
              {/* Image Side */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, x: section.reversed ? 50 : -50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex-1 w-full aspect-[4/3] rounded-[40px] overflow-hidden border border-stroke group"
              >
                <div className="relative w-full h-full">
                  <img 
                    src={section.image} 
                    alt={section.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-accent/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 halftone-overlay opacity-10" />
                </div>
              </motion.div>

              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex-1 text-center md:text-left"
              >
                <h3 className="text-3xl md:text-5xl font-medium mb-6 font-display italic text-text-primary">
                  {section.title}
                </h3>
                <p className="text-muted text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0">
                  {section.desc}
                </p>
                
                <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
                  <div className="w-12 h-px bg-stroke" />
                  <span className="text-[10px] text-muted uppercase tracking-[0.4em]">0{i + 1}</span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-40 flex justify-center"
        >
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-4 text-muted hover:text-text-primary transition-colors"
          >
            <div className="w-12 h-12 rounded-full border border-stroke flex items-center justify-center group-hover:border-text-primary transition-colors">
              <span className="text-xl">↑</span>
            </div>
            <span className="text-sm font-medium uppercase tracking-widest">Back to Top</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
