import { motion } from 'framer-motion';

const stats = [
  { value: "5M+", label: "Followers Gained" },
  { value: "15%", label: "Avg Engagement" },
  { value: "120+", label: "Viral Campaigns" }
];

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-32 border-y border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <div className="text-5xl md:text-7xl font-display italic text-text-primary mb-4">
                {stat.value}
              </div>
              <div className="text-xs text-muted uppercase tracking-[0.3em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
