"use client";

import React, { useRef, useState, useEffect } from "react";
import { useMotion } from "@/components/providers/motion-provider";
import { gsap, useGSAP } from "@/lib/motion/gsap-config";
import { 
  Terminal, Server, Database, BrainCircuit, ShieldAlert, 
  Cloud, Smartphone, LineChart, Network, DatabaseBackup, 
  Cpu, PenTool, Gamepad2, CheckCircle, X
} from "lucide-react";
import { careerTracks, CareerTrack, CareerPath } from "@/lib/data/career-tracks";
import { useI18n } from "@/lib/i18n/i18n-context";

const iconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="w-8 h-8 md:w-12 md:h-12" />,
  Server: <Server className="w-8 h-8 md:w-12 md:h-12" />,
  Database: <Database className="w-8 h-8 md:w-12 md:h-12" />,
  BrainCircuit: <BrainCircuit className="w-8 h-8 md:w-12 md:h-12" />,
  ShieldAlert: <ShieldAlert className="w-8 h-8 md:w-12 md:h-12" />,
  Cloud: <Cloud className="w-8 h-8 md:w-12 md:h-12" />,
  Smartphone: <Smartphone className="w-8 h-8 md:w-12 md:h-12" />,
  LineChart: <LineChart className="w-8 h-8 md:w-12 md:h-12" />,
  Network: <Network className="w-8 h-8 md:w-12 md:h-12" />,
  DatabaseBackup: <DatabaseBackup className="w-8 h-8 md:w-12 md:h-12" />,
  Cpu: <Cpu className="w-8 h-8 md:w-12 md:h-12" />,
  PenTool: <PenTool className="w-8 h-8 md:w-12 md:h-12" />,
  Gamepad2: <Gamepad2 className="w-8 h-8 md:w-12 md:h-12" />,
  CheckCircle: <CheckCircle className="w-8 h-8 md:w-12 md:h-12" />,
};

function PathModal({ path, track, onClose }: { path: CareerPath, track: CareerTrack, onClose: () => void }) {
  const { t, isRtl } = useI18n();
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // We use fixed positioning to sit entirely over the viewport and stop background interaction
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        dir={isRtl ? "rtl" : "ltr"}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl z-10 flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className={`sticky top-0 z-20 flex justify-between items-center p-6 border-b border-neutral-900 bg-neutral-950/90 backdrop-blur-xl`}>
          <div>
            <div className={`text-xs font-mono tracking-widest mb-1 ${track.color}`}>{track.title}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{path.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-8">
          <p className="text-lg text-neutral-300 leading-relaxed">
            {path.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {path.languages.length > 0 && (
                <div>
                  <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-3">{t.careerSection.modal.coreLanguages}</h3>
                  <div className="flex flex-wrap gap-2" dir="ltr">
                    {path.languages.map(lang => (
                      <span key={lang} className="px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-800 text-sm text-neutral-200">{lang}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {path.frameworks.length > 0 && (
                <div>
                  <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-3">{t.careerSection.modal.frameworks}</h3>
                  <div className="flex flex-wrap gap-2" dir="ltr">
                    {path.frameworks.map(fw => (
                      <span key={fw} className="px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-800 text-sm text-neutral-200">{fw}</span>
                    ))}
                  </div>
                </div>
              )}

              {path.tools.length > 0 && (
                <div>
                  <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-3">{t.careerSection.modal.tools}</h3>
                  <div className="flex flex-wrap gap-2" dir="ltr">
                    {path.tools.map(tool => (
                      <span key={tool} className="px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-800 text-sm text-neutral-200">{tool}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {path.databases.length > 0 && (
                <div>
                  <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-3">{t.careerSection.modal.databases}</h3>
                  <div className="flex flex-wrap gap-2" dir="ltr">
                    {path.databases.map(db => (
                      <span key={db} className="px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-800 text-sm text-neutral-200">{db}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
               <div>
                  <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-3">{t.careerSection.modal.coreConcepts}</h3>
                  <ul className="space-y-2" dir="ltr">
                    {path.concepts.map(concept => (
                      <li key={concept} className="flex items-center text-sm text-neutral-300">
                        <div className={`w-1.5 h-1.5 rounded-full mr-3 ${track.color.replace('text-', 'bg-')}`} />
                        {concept}
                      </li>
                    ))}
                  </ul>
               </div>

               <div>
                  <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-3">{t.careerSection.modal.progression}</h3>
                  <div className="flex flex-col space-y-1 relative before:absolute before:inset-y-2 before:left-2 before:w-0.5 before:bg-neutral-800" dir="ltr">
                    {path.progression.map((step) => (
                      <div key={step} className="flex items-center text-sm text-neutral-300 z-10">
                        <div className="w-4 h-4 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center mr-3">
                           <div className={`w-1 h-1 rounded-full ${track.color.replace('text-', 'bg-')}`} />
                        </div>
                        {step}
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CareerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useMotion();
  const { t, isRtl } = useI18n();
  const [activePath, setActivePath] = useState<{path: CareerPath, track: CareerTrack} | null>(null);

  // Background interactive state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize from -1 to 1 based on center of screen
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);

      if (isReducedMotion) {
        gsap.set([titleRef.current, introRef.current, q('.career-track-container')], { autoAlpha: 1 });
        gsap.set(q('.career-track-container'), { position: "relative", marginBottom: "4rem" });
        return;
      }

      // Initial state: Cards are hidden and off to the left
      gsap.set(q('.career-track-container'), { 
        xPercent: -100, 
        autoAlpha: 0, 
        scale: 0.8,
        width: "90%",
        maxWidth: "1000px",
        height: "auto",
        borderRadius: "24px"
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onToggle: (self) => {
            if (self.isActive) window.dispatchEvent(new CustomEvent("update-wayfinding", { detail: "career" }));
          }
        },
      });

      // Title enters
      tl.fromTo(titleRef.current, 
        { autoAlpha: 0, y: -20 }, 
        { autoAlpha: 1, y: 0, duration: 0.5 }, 
        0
      );

      // Philosophy Intro
      tl.fromTo(introRef.current,
        { autoAlpha: 0, scale: 0.9, y: 20 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 1 },
        0.5
      );

      tl.to({}, { duration: 2 }); // Hold intro

      tl.to(introRef.current, {
        autoAlpha: 0, scale: 1.1, duration: 1
      });

      // We have 14 tracks. We will allocate time sequentially.
      careerTracks.forEach((track, index) => {
        const container = q(`.career-track-container`)[index];
        const isLast = index === careerTracks.length - 1;

        // Enter from left
        tl.to(container, {
          xPercent: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power2.out"
        });

        // Expand to fullscreen
        tl.to(container, {
          width: "100%",
          maxWidth: "none",
          height: "100vh",
          borderRadius: "0px",
          scale: 1,
          duration: 1.5,
          ease: "power3.inOut"
        });

        // Animate elements inside the container when it expands
        const innerContent = container.querySelector('.inner-content');
        if (innerContent) {
           tl.fromTo(innerContent, 
             { autoAlpha: 0, y: 20 },
             { autoAlpha: 1, y: 0, duration: 1 },
             "<0.5" // Start halfway through the expand
           );
        }

        // Hold for reading and exploring (long hold)
        tl.to({}, { duration: 4 });

        if (!isLast) {
          // Exit 
          tl.to(container, {
            autoAlpha: 0,
            scale: 1.1, // Slight zoom in as it fades
            duration: 1,
            ease: "power2.in"
          });
        } else {
           // Final track special exit: zoom out WITHOUT changing height/width to avoid layout reflows/clipping
           tl.to(container, {
             scale: 0.9,
             borderRadius: "24px",
             duration: 2,
             ease: "power3.inOut"
           });
           
           // Hold zoomed out slightly
           tl.to({}, { duration: 1 });

           tl.to(container, {
             autoAlpha: 0,
             yPercent: -20,
             duration: 1
           });
        }
      });

    },
    { scope: sectionRef }
  );

  return (
    // 2500vh ensures plenty of scroll distance for 14 tracks
    <section ref={sectionRef} id="career" className="relative bg-neutral-950 h-[2500vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Subtle global background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.02)_0,rgba(0,0,0,0)_100%)] pointer-events-none" />

        {/* Floating Title Layer (Hides as first card expands over it) */}
        <div ref={titleRef} className="absolute top-[10vh] left-0 w-full text-center invisible z-0 pointer-events-none px-4">
          <div className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs font-medium text-neutral-400 mb-4">
            {t.careerSection.badge}
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight drop-shadow-lg">
            {t.careerSection.heading}
          </h2>
        </div>

        {/* Philosophy Intro */}
        <div ref={introRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 invisible px-4">
          <div className="max-w-2xl text-center bg-neutral-950/50 backdrop-blur-sm p-8 rounded-3xl border border-neutral-800/50 shadow-2xl">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {t.careerSection.introTitleLine1}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{t.careerSection.introTitleLine2}</span>
            </h3>
            <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
              {t.careerSection.introDesc}
            </p>
          </div>
        </div>

        {/* The Stages */}
        {careerTracks.map((track, index) => {
          // Apply subtle parallax to the background element inside the card based on visualTheme
          const rx = mousePos.x * 20; // max 20px movement
          const ry = mousePos.y * 20;

          return (
            <div
              key={track.id}
              className={`career-track-container absolute flex flex-col justify-center border overflow-hidden p-6 md:p-12 invisible z-10 bg-neutral-950 border-neutral-800`}
            >
              {/* Interactive Background Layer */}
              <div 
                className="absolute inset-0 z-0 pointer-events-none opacity-40 transition-transform duration-700 ease-out"
                style={{ transform: `translate(${rx}px, ${ry}px)` }}
              >
                 {/* Visual Theme Representation */}
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0,rgba(0,0,0,0)_70%)]" />
                 
                 {/* Example Abstract Visual (Grid lines) */}
                 <div className="absolute inset-0" style={{ 
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
                 }} />
              </div>

              {/* Main Content */}
              <div className="inner-content relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-16 items-center lg:items-start invisible">
                 {/* Left Column: Core Info */}
                 <div className="flex-1 flex flex-col">
                   <div className="flex items-center gap-4 mb-6">
                     <span className={`text-4xl md:text-6xl font-bold font-mono opacity-20 ${track.color}`}>{track.index}</span>
                     <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border shadow-lg bg-black/60 flex-shrink-0 ${track.bg} ${track.color}`}>
                       {iconMap[track.iconName]}
                     </div>
                   </div>
                   
                   <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">{track.title}</h3>
                   <p className={`text-lg md:text-xl font-medium mb-4 ${track.color}`}>{track.shortDesc}</p>
                   <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-8">
                     {track.longDesc}
                   </p>

                   <div>
                     <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3 block">{t.careerSection.coreSkills}</span>
                     <div className="flex flex-wrap gap-2" dir="ltr">
                       {track.keySkills.map(skill => (
                         <span key={skill} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm font-medium text-neutral-300">
                           {skill}
                         </span>
                       ))}
                     </div>
                   </div>
                 </div>

                 {/* Right Column: Paths */}
                 <div className="flex-1 w-full bg-black/40 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-sm font-mono uppercase tracking-widest text-neutral-400">{t.careerSection.availablePaths}</h4>
                      <span className="text-xs text-neutral-500">{t.careerSection.clickToExplore}</span>
                    </div>

                    <div className="space-y-4">
                      {track.paths.map(path => (
                        <button
                          key={path.id}
                          onClick={() => setActivePath({ path, track })}
                          className="w-full text-left group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl"
                        >
                          <div className="relative z-10 flex justify-between items-center">
                            <div>
                              <h5 className="text-lg font-bold text-white mb-1 group-hover:text-white transition-colors">{path.title}</h5>
                              <p className="text-sm text-neutral-400 line-clamp-1">{path.description}</p>
                            </div>
                            <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-black/50 opacity-50 group-hover:opacity-100 transition-opacity ${track.color}`}>
                              →
                            </div>
                          </div>
                          {/* Hover gradient effect */}
                          <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-r from-transparent to-current ${track.color}`} />
                        </button>
                      ))}
                    </div>
                 </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Path Detail Modal Portal-like rendering */}
      {activePath && (
        <PathModal 
          path={activePath.path} 
          track={activePath.track} 
          onClose={() => setActivePath(null)} 
        />
      )}
    </section>
  );
}
