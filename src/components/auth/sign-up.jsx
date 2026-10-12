import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function SignUp({ open, onClose }){

    const [ shouldRender, setShouldRender ] = useState(false);
    const [ animateIn, setAnimateIn ] = useState(false);
    const panelRef = useRef(null);

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
                <h2 className="text-xl font-semibold text-white">Create Account</h2>
                <p className="mt-1 text-sm text-white/50">Participate Your Journey</p>
            
            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    onClose();
                }}
                className="mt-6 flex flex-col gap-4"
            >
            <Field label="Username" type="text" placeholder="your username" />
            <Field label="Email" type="email" placeholder="your@example.com" />
            <Field label="Password" type="password" placeholder="••••••••" />

            <button className="mt-2 h-11 rounded-full bg-[#235347] text-sm font-semibold text-white transition-colors hover-bg[#2d6657] active:scale-[0.98]" type="submit">
                Sign-up
            </button>
        </form>
            <p className="mt-5 text-center text-xs text-white/40">
                Already Having Account?{" "}
                <button className="font-semibold text-[#8eb69b] hover:underlined">Sign-In</button>
            </p>
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