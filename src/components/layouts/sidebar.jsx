import { useRef, useState, useEffect } from "react";
import {
  Gamepad2,
  Home,
  MessageCircle,
  Settings,
  ShoppingCart,
  User,
  Wallet,
  Menu,
  X,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const navigation = [
  { icon: Home, label: "Home", active: true },
  { icon: Gamepad2, label: "Games" },
  { icon: ShoppingCart, label: "Store" },
  { icon: Wallet, label: "Wallet" },
  { icon: MessageCircle, label: "Chat" },
];

export default function Sidebar({ expanded = false, onToggle = () => {} }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const itemsRef = useRef(null);

  /* Mobile drawer open/close */
  useGSAP(
    () => {
      if (!backdropRef.current || !panelRef.current) return;

      if (mobileOpen) {
        gsap.set(backdropRef.current, { display: "block" });
        gsap.set(panelRef.current, { display: "flex" });

        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(
          panelRef.current,
          { x: "-100%" },
          { x: "0%", duration: 0.4, ease: "power3.out" }
        );
        gsap.fromTo(
          itemsRef.current.children,
          { x: -16, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.06, delay: 0.15, ease: "power2.out" }
        );
      } else {
        gsap.to(backdropRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => gsap.set(backdropRef.current, { display: "none" }),
        });
        gsap.to(panelRef.current, {
          x: "-100%",
          duration: 0.3,
          ease: "power3.in",
          onComplete: () => gsap.set(panelRef.current, { display: "none" }),
        });
      }
    },
    { dependencies: [mobileOpen] }
  );

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#1b0c22] text-white md:hidden cursor-pointer"
        aria-label="Open menu"
      >
        <Menu size={22} strokeWidth={2.5} />
      </button>

      <aside
        className={`fixed left-4 top-4 bottom-4 z-50 hidden flex-col items-center rounded-[24px]
        bg-[transparent] py-5 md:flex transition-[width] duration-300 ease-in-out
        ${expanded ? "w-[200px]" : "w-[78px]"}`}
      >
        <button onClick={onToggle} className="mb-7 text-white cursor-pointer">
          <Menu size={24} strokeWidth={2.5} />
        </button>

        <div className="flex w-full flex-col gap-3 px-4">
          {navigation.map((item, index) => (
            <NavButton
              key={index}
              icon={item.icon}
              active={item.active}
              label={item.label}
              expanded={expanded}
            />
          ))}
        </div>

        <div className="mt-auto flex w-full flex-col gap-3 px-4.5">
          <div className="mb-2 h-px w-full bg-white/10" />
          <NavButton icon={User} label="Profile" expanded={expanded} />
          <NavButton icon={Settings} label="Settings" expanded={expanded} />
        </div>
      </aside>

      <div
        ref={backdropRef}
        onClick={() => setMobileOpen(false)}
        style={{ display: "none", opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
      />

      <div
        ref={panelRef}
        style={{ display: "none" }}
        className="fixed left-0 top-0 bottom-0 z-[70] w-[260px] flex-col bg-[#0b2b26] p-5 md:hidden"
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="text-lg font-black tracking-tight text-[#daf1de]">
            x<span className="text-[#8eb69b]">GRID - STORE</span>
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div ref={itemsRef} className="flex flex-col gap-2">
          {navigation.map((item, index) => (
            <NavButton
              key={index}
              icon={item.icon}
              active={item.active}
              label={item.label}
              expanded
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <div className="mb-2 h-px w-full bg-white/10" />
          <NavButton icon={User} label="Profile" expanded onClick={() => setMobileOpen(false)} />
          <NavButton icon={Settings} label="Settings" expanded onClick={() => setMobileOpen(false)} />
        </div>
      </div>
    </>
  );
}

function NavButton({ icon: Icon, active, label, expanded, onClick = () => {} }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex h-11 w-full items-center gap-3 rounded-xl px-3
        transition-all duration-300 cursor-pointer
        ${
          active
            ? "bg-white text-purple-800 shadow-lg"
            : "text-white/70 hover:bg-white/10 hover:text-white"
        }
      `}
    >
      <Icon size={20} className="shrink-0" />
      <span
        className={`
          overflow-hidden whitespace-nowrap text-sm font-medium
          transition-all duration-300
          ${expanded ? "max-w-[120px] opacity-100" : "max-w-0 opacity-0"}
        `}
      >
        {label}
      </span>
    </button>
  );
}