import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FcGoogle } from 'react-icons/fc';
import { VscTwitter } from "react-icons/vsc";
import { X } from 'lucide-react';

export default function SignIn({ open, onClose }){

    const [ shouldRender, setShouldRender ] = useState(false);
    const [ animateIn, setAnimateIn ] = useState(false);
    const panelRef = useRef(null);
    const iconProvider = [
        {
            name: "Google", icon: FcGoogle
        },
        {
            name: "Twitter", icon: VscTwitter
        }
    ];

    useEffect(() => {
        if (open) {
            setShouldRender(true);
            requestAnimationFrame(() => requestAnimationFrame(() => setAnimateIn(true)));
        } else {
            setAnimateIn(false);
            const timeout = setTimeout(() => setShouldRender(false), 250);
            return () => clearTimeout(timeout);
        }
    }, [open]);

    /* Close / Esc button*/

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Esacpe" && onClose();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    /** Lock While open Over scrolling */

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!shouldRender) return null;

    return createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div onClick={onClose} className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-550 ease-out
          ${animateIn ? "opacity-100" : "opacity-0"}`} />

            <div ref={panelRef}
            role="dialog"
            aria-modal="true" 
            className={`relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0b2b26] p-6 shadow-2xl
                        transition-all duration-250 ease-out
                        ${animateIn ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"}`}>
            <button onClick={onClose} aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full
            text-white/50 transition-colors hover:bg-white/10 hover:text-white">
            <X size={18}/>
            </button>
                <h2 className="text-xl font-semibold text-white">Sign Your Account</h2>
            
            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    onClose();
                }}
                className="mt-6 flex flex-col gap-4"
            >
            <Field label="Email" type="email" placeholder="your@example.com" />
            <Field label="Password" type="password" placeholder="••••••••" />

            <button className="mt-2 h-11 rounded-full bg-[#235347] text-sm font-semibold text-white transition-colors hover-bg[#2d6657] active:scale-[0.98]" type="submit">
                Sign-In
            </button>
        </form>
           <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-white/40">or continue with</span>
                <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="flex flex-col gap-4 px-5">
        {iconProvider.map(({ name, icon: Icon }) => (
          <button
            key={name}
            type="button"
            onClick=""
            aria-label={`Continue with ${name}`}
            className="flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5
              text-white transition-all hover:bg-white/10 active:scale-95"
          >
            <Icon size={20} />
          </button>
        ))}
      </div>
            </div>
        </div>,
        document.body
    );
}

/**Component Field */
function Field({ label, type, placeholder}) {
    return (
        <label className="flex flex-col gap-1.5 text-xs font-medium text-white/60">
            {label}
            <input type={type} placeholder={placeholder} 
            className="h-11 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white
          outline-none placeholder:text-white/30 transition-colors focus:border-[#8eb69b]" />
        </label>
    )
}