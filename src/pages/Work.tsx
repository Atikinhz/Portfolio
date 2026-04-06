import { motion } from 'framer-motion';
import Works from '../components/Works';
import CaseStudyDetail from '../components/CaseStudyDetail';
import Footer from '../components/Footer';

export default function Work() {
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
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Portfolio</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-medium mb-8">
          Selected <span className="font-display italic">Works</span>
        </h1>
        <p className="text-muted text-lg max-w-2xl mb-16">
          A deep dive into my most impactful SMM campaigns, content strategies, and brand growth initiatives.
        </p>
      </div>
      <Works />
      <CaseStudyDetail />
      <Footer />
    </motion.div>
  );
}
