"use client"
import React, { useEffect, useRef, useState } from "react";

interface LinkItem {
  href: string;
  label: string;
}

interface FooterProps {
  leftLinks: LinkItem[];
  rightLinks: LinkItem[];
  copyrightText: string;
  barCount?: number; 
}

const Footer: React.FC<FooterProps> = ({
  leftLinks,
  rightLinks,
  copyrightText,
  barCount = 23, 
}) => {
  const waveRefs = useRef<(HTMLDivElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 } 
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);


  useEffect(() => {
    let t = 0; 

    const animateWave = () => {
      const waveElements = waveRefs.current;
      let offset = 0;

      waveElements.forEach((element, index) => {
        if (element) {
          offset += Math.max(0, 20 * Math.sin((t + index) * 0.3)); 
          element.style.transform = `translateY(${offset}px)`;
        }
      });

      t += 0.1;
      animationFrameRef.current = requestAnimationFrame(animateWave);
    };

    if (isVisible) {
      animateWave();
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isVisible]);

  return (
    <footer
      ref={footerRef}
      className="bg-[#050505] text-white relative flex flex-col w-full justify-between pt-24 px-8 overflow-hidden"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between w-full gap-12 pb-24">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-blue-500" />
            <span className="text-xl font-bold tracking-tighter uppercase italic">Skills Nexus</span>
          </div>
          <ul className="flex flex-wrap gap-8">
            {leftLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-widest font-medium">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-8 flex items-center gap-x-2">
            {copyrightText}
          </p>
        </div>
        <div className="space-y-8 text-right md:text-left">
          <ul className="flex flex-wrap gap-8 justify-end md:justify-start">
            {rightLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-widest font-medium">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="text-right">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[10px] text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-[0.3em] font-bold"
            >
              Return to Peak
            </button>
          </div>
        </div>
      </div>
      <div
        id="waveContainer"
        aria-hidden="true"
        className="flex items-end justify-center gap-1 opacity-20 pointer-events-none"
        style={{ height: 100 }}
      >
          {Array.from({ length: barCount }).map((_, index) => (
            <div
              key={index}
              ref={(el) => { waveRefs.current[index] = el; }}
              className="w-4 bg-blue-500 rounded-t-full"
              style={{
                height: `${20 + (index % 10) * 8}px`,
                transition: "transform 0.1s linear",
                willChange: "transform",
              }}
            />
          ))}
      </div>
    </footer>
  );
};

export default Footer;
