import { ArrowUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function ScrollTop({ threshold = 300}){
    const [ visible, setVisible ] = useState(false);
    const btnRef = useRef(null);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY >  threshold);
        window.addEventListener("scroll", onScroll, { passive : true});
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);

    useGSAP(
         () => {
      if (!btnRef.current) return;
 
      if (visible) {
        gsap.set(btnRef.current, { display: "flex" });
        gsap.fromTo(
          btnRef.current,
          { scale: 0.6, opacity: 0, y: 12 },
          { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(2)" }
        );
      } else {
        gsap.to(btnRef.current, {
          scale: 0.6,
          opacity: 0,
          y: 12,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => gsap.set(btnRef.current, { display: "none" }),
        });
      }
    },
    { dependencies: [visible] }
    );

    const handleClick = () => {
        window.scrollTo({ top: 0, behaviour: "smooth"});
        gsap.fromTo(
            btnRef.current,
            { scale: 0.65},
            { scale: 1, duration: 0.3, ease: "back.out(3)"}
        );
    }


    return (
        <button
            ref={btnRef}
            onClick={handleClick}
            style={{ display: "none"}} 
            className="fixed bottom-6 right-6 z-[90] flex h-12 w-12 items-center justify-center
              rounded-full bg-[#163832] text-[#daf1de] shadow-lg shadow-black/30
              transition-colors hover:bg-[#235347] active:scale-95 md:bottom-8 md:right-8 cursor-pointer">
              <ArrowUp size={20} strokeWidth={2.5}/>
        </button>
    )
}