import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const experience = [
  {
    company: "Social Growth Agency",
    role: "Senior SMM Strategist",
    period: "2024 — Present",
    description: "Leading content strategy for high-growth tech startups. Achieved 150% increase in organic reach for key clients."
  },
  {
    company: "Brand Masters",
    role: "Content Creator",
    period: "2022 — 2024",
    description: "Produced viral video content and managed community engagement for global lifestyle brands."
  },
  {
    company: "Creative Pulse",
    role: "Junior Brand Manager",
    period: "2020 — 2022",
    description: "Assisted in brand positioning and social media management for local businesses."
  }
];

const skills = [
  "Social Strategy", "Content Creation", "Viral Marketing", "Data Analytics",
  "Community Management", "Brand Positioning", "Paid Social", "Copywriting"
];

export default function Resume() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 py-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Career</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-medium mb-16">
          My <span className="font-display italic">Resume</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Experience */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-medium mb-8 border-b border-stroke pb-4">Experience</h2>
            <div className="space-y-12">
              {experience.map((item, i) => (
                <div key={i} className="group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <h3 className="text-xl font-medium text-text-primary">{item.company}</h3>
                    <span className="text-sm text-muted font-mono">{item.period}</span>
                  </div>
                  <div className="text-text-primary/80 italic font-display text-lg mb-4">{item.role}</div>
                  <p className="text-muted leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Info */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              <div>
                <h2 className="text-2xl font-medium mb-8 border-b border-stroke pb-4">Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span key={i} className="px-4 py-2 rounded-full bg-surface border border-stroke text-xs text-muted">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-medium mb-8 border-b border-stroke pb-4">Education</h2>
                <div>
                  <h3 className="text-lg font-medium mb-1">Digital Marketing Degree</h3>
                  <p className="text-sm text-muted">University of Chicago, 2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
}
