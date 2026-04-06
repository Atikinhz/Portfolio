import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';

import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const hlsUrl = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl;
    }

    // Marquee animation
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  return (
    <footer className="relative bg-bg pt-16 md:pt-32 pb-12 overflow-hidden">
      {/* Background Video (Flipped) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Marquee */}
      <div className="relative z-10 mb-24 md:mb-40 overflow-hidden whitespace-nowrap border-y border-stroke py-6">
        <div ref={marqueeRef} className="inline-block text-4xl md:text-7xl font-display italic text-text-primary/20 uppercase tracking-tighter">
          {Array(10).fill(t('footer_marquee')).join("")}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center">
        <h2 className="text-5xl md:text-8xl font-medium mb-12">
          {t('footer_heading')} <br /> <span className="font-display italic">{t('footer_heading_italic')}</span>
        </h2>
        
        <a 
          href="mailto:nikita98zh@gmail.com"
          className="group relative inline-flex items-center gap-4 rounded-full px-10 py-5 transition-all hover:scale-105"
        >
          <div className="absolute inset-0 accent-gradient rounded-full" />
          <div className="absolute inset-[2px] bg-bg rounded-full group-hover:bg-transparent transition-colors" />
          <span className="relative z-10 text-lg md:text-xl font-medium">nikita98zh@gmail.com</span>
        </a>

        {/* Footer Bar */}
        <div className="mt-32 md:mt-48 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-stroke pt-8">
          <div className="flex items-center gap-6">
            {["Instagram", "LinkedIn", "TikTok", "Twitter"].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-xs text-muted hover:text-text-primary transition-colors uppercase tracking-widest"
              >
                {social}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div className="absolute w-4 h-4 rounded-full bg-green-500/30 animate-ping" />
            </div>
            <span className="text-xs text-muted uppercase tracking-widest">{t('footer_available')}</span>
          </div>

          <div className="text-[10px] text-muted/50 uppercase tracking-widest">
            © 2026 Nikita Zhorov. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
