import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/src/lib/utils';

import { useLanguage } from '../context/LanguageContext';

const projects = [
  {
    title: "NEO-AI",
    image: "/input_file_0.png",
    span: "md:col-span-12",
    aspect: "aspect-[21/9]",
    category: "AI Education",
    slug: "neo-ai"
  },
  {
    title: "Viral Campaign",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1200",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]"
  },
  {
    title: "Brand Growth",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    span: "md:col-span-5",
    aspect: "aspect-[4/5]"
  },
  {
    title: "Community Management",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
    span: "md:col-span-5",
    aspect: "aspect-[4/5]"
  },
  {
    title: "Content Strategy",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1200",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]"
  }
];

export default function Works() {
  const { t } = useLanguage();

  return (
    <section id="work" className="bg-bg py-12 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">{t('works_eyebrow')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-medium mb-6">
              {t('works_heading')} <span className="font-display italic">{t('works_heading_italic')}</span>
            </h2>
            <p className="text-muted text-sm md:text-base">
              {t('works_subtext')}
            </p>
          </div>

          <button className="hidden md:inline-flex group relative items-center gap-2 rounded-full px-6 py-3 border border-stroke hover:border-transparent transition-all">
            <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 rounded-full transition-opacity" />
            <div className="absolute inset-[1px] bg-bg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 text-sm">{t('works_view_all')}</span>
            <span className="relative z-10 text-xs">→</span>
          </button>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, i) => {
            const CardContent = (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "group relative bg-surface border border-stroke rounded-3xl overflow-hidden h-full",
                  project.title === "NEO-AI" && "border-accent/30 shadow-[0_0_40px_-15px_rgba(0,102,255,0.3)]"
                )}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {project.title === "NEO-AI" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-60 pointer-events-none" />
                )}
                <div className="absolute inset-0 halftone-overlay opacity-20 mix-blend-multiply pointer-events-none" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-bg/70 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="relative p-[1px] rounded-full overflow-hidden">
                    <div className="absolute inset-0 accent-gradient animate-gradient-shift" />
                    <div className="relative bg-white text-black px-6 py-2 rounded-full text-sm font-medium">
                      {project.title === "NEO-AI" ? "Explore AI Case" : `View — ${project.title}`}
                    </div>
                  </div>
                </div>
              </motion.div>
            );

            return project.slug ? (
              <Link 
                key={i} 
                to={`/case-study/${project.slug}`}
                className={cn("block", project.span, project.aspect)}
              >
                {CardContent}
              </Link>
            ) : (
              <div 
                key={i} 
                className={cn(project.span, project.aspect)}
              >
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
