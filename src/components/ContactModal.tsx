import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MessageSquare, Send } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg/80 backdrop-blur-xl"
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-surface border border-stroke rounded-[32px] overflow-hidden shadow-2xl"
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-medium mb-2">
                    {t('contact_title')} <span className="font-display italic">{t('contact_title_italic')}</span>
                  </h2>
                  <p className="text-muted text-sm">{t('contact_subtitle')}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-bg border border-stroke hover:bg-stroke transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-xs text-muted uppercase tracking-widest">{t('contact_label_name')}</label>
                  <input
                    type="text"
                    placeholder={t('contact_placeholder_name')}
                    className="w-full bg-bg border border-stroke rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-text-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted uppercase tracking-widest">{t('contact_label_email')}</label>
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    className="w-full bg-bg border border-stroke rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-text-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted uppercase tracking-widest">{t('contact_label_message')}</label>
                  <textarea
                    placeholder={t('contact_placeholder_message')}
                    rows={4}
                    className="w-full bg-bg border border-stroke rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-text-primary transition-colors resize-none"
                  />
                </div>

                <button className="group relative w-full rounded-full py-4 overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]">
                  <div className="absolute inset-0 accent-gradient" />
                  <div className="relative z-10 flex items-center justify-center gap-2 font-medium">
                    <span>{t('contact_btn_send')}</span>
                    <Send size={16} />
                  </div>
                </button>
              </form>

              <div className="mt-12 pt-8 border-t border-stroke flex flex-col sm:flex-row gap-6 justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-bg border border-stroke">
                    <Mail size={16} className="text-muted" />
                  </div>
                  <div className="text-xs">
                    <div className="text-muted uppercase tracking-widest mb-0.5">Email</div>
                    <div className="text-text-primary">nikita98zh@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-bg border border-stroke">
                    <MessageSquare size={16} className="text-muted" />
                  </div>
                  <div className="text-xs">
                    <div className="text-muted uppercase tracking-widest mb-0.5">Social</div>
                    <div className="text-text-primary">@nikitazhorov</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
