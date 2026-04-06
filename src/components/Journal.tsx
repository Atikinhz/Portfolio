import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

const entries = [
  {
    title: "Cracking the 2026 Algorithm",
    date: "Mar 24, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "Engagement Hacks for TikTok",
    date: "Feb 12, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "The Power of Micro-Influencers",
    date: "Jan 05, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "Social Media ROI: A Guide",
    date: "Dec 18, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400"
  }
];

export default function Journal() {
  const { t } = useLanguage();

  return (
    <section className="bg-bg py-16 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">{t('journal_eyebrow')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-medium mb-6">
              {t('journal_heading')} <span className="font-display italic">{t('journal_heading_italic')}</span>
            </h2>
            <p className="text-muted text-sm md:text-base">
              {t('journal_subtext')}
            </p>
          </div>

          <button className="group relative items-center gap-2 rounded-full px-6 py-3 border border-stroke hover:border-transparent transition-all">
            <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 rounded-full transition-opacity" />
            <div className="absolute inset-[1px] bg-bg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 text-sm">{t('journal_view_all')}</span>
          </button>
        </motion.div>

        {/* Entries */}
        <div className="flex flex-col gap-4">
          {entries.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col sm:flex-row sm:items-center gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[32px] sm:rounded-full transition-colors cursor-pointer"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={entry.image}
                  alt={entry.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-medium mb-1 group-hover:text-text-primary transition-colors">
                  {entry.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span>{entry.date}</span>
                  <div className="w-1 h-1 rounded-full bg-stroke" />
                  <span>{entry.readTime}</span>
                </div>
              </div>

              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full border border-stroke group-hover:bg-text-primary group-hover:text-bg transition-all">
                <span className="text-lg">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
