import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const explorationItems = [
  { id: 1, image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600", rotation: -5 },
  { id: 2, image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=600", rotation: 8 },
  { id: 3, image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600", rotation: -3 },
  { id: 4, image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=600", rotation: 6 },
  { id: 5, image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600", rotation: -7 },
  { id: 6, image: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?auto=format&fit=crop&q=80&w=600", rotation: 4 },
];

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    // Pin the center content
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: contentRef.current,
      pinSpacing: false,
    });

    // Parallax columns
    gsap.to(col1Ref.current, {
      y: -300,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    gsap.to(col2Ref.current, {
      y: 300,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[300vh] bg-bg">
      {/* Pinned Content */}
      <div ref={contentRef} className="h-screen w-full flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center px-6 max-w-2xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-5xl md:text-7xl font-medium mb-8">
            Content <span className="font-display italic">experiments</span>
          </h2>
          <p className="text-muted text-sm md:text-base mb-10">
            A collection of visual studies, viral hooks, and aesthetic explorations across platforms.
          </p>
          <button className="pointer-events-auto group relative inline-flex items-center gap-2 rounded-full px-8 py-4 border border-stroke hover:border-transparent transition-all">
            <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 rounded-full transition-opacity" />
            <div className="absolute inset-[1px] bg-bg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 text-sm">Follow on Dribbble</span>
          </button>
        </div>
      </div>

      {/* Parallax Layers */}
      <div className="absolute inset-0 z-0 flex justify-center pt-40">
        <div className="grid grid-cols-2 gap-12 md:gap-40 max-w-[1400px] w-full px-12">
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-24 md:gap-40">
            {explorationItems.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                className="aspect-square max-w-[320px] bg-surface rounded-2xl overflow-hidden shadow-2xl"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                <img 
                  src={item.image} 
                  alt="" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-24 md:gap-40 pt-60">
            {explorationItems.slice(3, 6).map((item) => (
              <div 
                key={item.id}
                className="aspect-square max-w-[320px] bg-surface rounded-2xl overflow-hidden shadow-2xl"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                <img 
                  src={item.image} 
                  alt="" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
