import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/all";

gsap.registerPlugin(DrawSVGPlugin, useGSAP);

export const theme = {
  base: "#051F20",
  surface: "#0b2b26",
  white: "#8eb69b",
  lightwhite: "#daf1de",
  pink: "#E13F9E",
  yellow: "#F5C518",
  teal: "#0E8C6E",
  muted: "rgba(255,255,255,0.12)",
}

function LogoSpinner({ size = 64, thickness= 4 }){
   const root = useRef(null);
 
  useGSAP(() => {
      gsap.to(".arc-spin", {
        rotation: 360,
        duration: 0.9,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
      gsap.to(".arc-spin", {
        //backgroundPosition: "100% 50%",
        strokeDashoffset: 190,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
      { scope: root}
  );
 
  return (
    <div ref={root} style={{ width: size, height: size }}>
      <svg viewBox="0 0 50 50" width={size} height={size}>
        <defs>
          <linearGradient id="arcgrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={theme.white} />
            <stop offset="100%" stopColor={theme.lightwhite} />
          </linearGradient>
        </defs>
        <circle cx="25" cy="25" r="20" stroke={theme.muted} strokeWidth={thickness} fill="none" />
        <circle
          className="arc-spin"
          cx="25" cy="25" r="20"
          stroke="url(#arcgrad)"
          strokeWidth={thickness}
          strokeLinecap="round"
          fill="none"
          strokeDasharray="126"
          strokeDashoffset="90"
        />
      </svg>
    </div>
  );
}
export default function Loading({finishLoading, ready = true, coverImage })
{
  const dotsRef = useRef(null);
  const panelRef = useRef(null);
  const imgRef = useRef(null);
  const overlayRef = useRef(null);
  const spinnerWrapRef = useRef(null);
   
  useGSAP(
    () => {
      const dots = dotsRef.current.querySelectorAll("span");
      const pulse = gsap.timeline({ repeat: -1 });

      pulse
      .to(dots, { opacity: 1, duration: 3.3, stagger: 0.15 })
      .to(dots, { opacity: 0.2, duration: 3.3, stagger: 0.15 }, "-=0.2");

      if(!ready) return;
      pulse.kill();

      const exitLoader = gsap.timeline({ onComplete: finishLoading});
      exitLoader
      .to(dots, {opacity: 0, duration: 2.2})
      .to(
        spinnerWrapRef.current,
          { scale: 0.8, opacity: 0, duration: 1.45, ease: "power2.in" },
          "<"
      )
      .fromTo(imgRef.current, 
        { opacity: 0, scale: 2.5},
        { opacity: 1, scale: 2, duration: 1.0, ease: "power2.out"}, "-=0.1"
      ).to(
        overlayRef.current,
        { opacity: 0, duration: 0.8, ease: "power2.out"}, "<"
      ).to({}, { duration: 0.5})
      .to(panelRef.current, {
        y: "-100%",
        duration: 0.85,
        ease: "power4.inOut",
      });
    },
    { scope: panelRef, dependencies: [ready]}
  );
 
  return (
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        background: "linear-gradient(to right, #434343 0%, black 100%)",
        backgroundSize: "400% 400%",
        color: "#daf1de",
        zIndex: 9999,
      }}
    >
       {coverImage && (
        <img
          ref={imgRef}
          src={coverImage}
          style={{
            position: "absolute",
            top: "50%",
            inset: "50%",
            width: "min(180px, 80vw)",
            height: "50%",
            objectFit: "contain",
            transform: "translate(-50%, -50%)",
//            objectPosition: "center",
            opacity: 0,
            zIndex: 0,
          }}
        />
      )}
 
      {coverImage && (
        <div
          ref={overlayRef}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, #434343 0%, black 100%)",
            zIndex: 1,
          }}
        />
      )}
       <div
        ref={spinnerWrapRef}
        style={{ position: "relative", zIndex: 2, display: "grid", placeItems: "center" }}
      >
        <LogoSpinner size={72} />
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 2.,
          display: "flex",
          alignItems: "baseline",
          gap: 4,
          fontFamily: "system-ui, sans-serif",
          color: "#e4e4e7",
          fontWeight: 600,
          letterSpacing: 1,
          fontSize: 14,
          textTransform: "uppercase",
        }}
      >
        <span ref={dotsRef} style={{ display: "inline-flex", gap: 2 }}>
          <span style={{ opacity: 3.2 }}>Please Wait</span>
        </span>
      </div>
    </div>
  );
}