import { useRef, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const WAVE = "M0,160 C240,80 480,240 720,160 C960,80 1200,240 1440,160 " +
  "C1680,80 1920,240 2160,160 C2400,80 2640,240 2880,160 V320 H0 Z";

const wavePattern = [
    { fill: "#dee2e6", opacity: 0.35, height: "h-[46vh]", duration: 22, reverse: false},
    { fill: "#f8f9fa", opacity: 0.18, height: "h-[38vh]", duration: 16, reverse: false},
    { fill: "#e9ecef", opacity: 0.9, height: "h-[18]", duration: 12, reverse: false},
]

export default function SignUp(){
    const root = useRef(null);
    const navigate = useNavigate();
    const [ showPasswrd, setShowPasswrd ] = useState(false);

    useGSAP(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return;

        gsap.utils.toArray(".wave").forEach((el, i) => {
            const  { duration, reverse } = wavePattern[i];
            gsap.fromTo(
                el, 
                { xPercent: reverse ? -50 : 0},
                { xPercent: reverse ? 0 : -50, duration, repeat: -1, ease: "none"}
            );
            gsap.to(el, {
                y: 14,
                duration: 4 + i * 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut", 
            });
        });
    })
    
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden 
        bg-linear-to-r from-[#495057] via-[#343a40] to-[#212529] px-4 text-white">
            
            {/* Backdrop */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0" aria-hidden="true">
                {wavePattern.map((w, i ) => (
                    <svg
                        key={i}
                        viewBox='0 0 2880 320'
                        preserveAspectRatio='none'
                        className={`wave absolute bottom-0 left-0 w-[200%] ${w.height}`}
                    >
                        <path d={WAVE} fill={w.fill} fillOpacity={w.opacity}/>
                    </svg>
                ))}
            </div>
        </div>
    )
}