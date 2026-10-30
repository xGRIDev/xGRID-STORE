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
  Palette,
  LogOut,

} from "lucide-react";
import { createPortal } from 'react-dom';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import  {useTheme}  from "../styles/themes";

gsap.registerPlugin(useGSAP);

const navigation = [
  { icon: Home, label: "Home", active: true },
  { icon: Gamepad2, label: "Games" },
  { icon: ShoppingCart, label: "Store" },
  { icon: Wallet, label: "Wallet" },
  { icon: MessageCircle, label: "Chat" },
];

const settingsItems = [
  { icon: User, label: "Profile"},
  { icon: Palette, label: "Theme"},
  { icon: LogOut, label: "Sign-out"},
]

export default function Sidebar({ expanded = false, onToggle = () => {} }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const itemsRef = useRef(null);
   const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // keeps it in the DOM during the exit animation
  const [pos, setPos] = useState({ left: 0, bottom: 0 });
  const btnRef = useRef(null);
  const iconRef = useRef(null);
  const menuRef = useRef(null);
  const { theme, toggle } = useTheme();

  const tgle = () => {
    if (open) return setOpen(false);
    const rect = btnRef.current.getBoundingClientRect();
    setPos({ left: rect.right + 12, bottom: window.innerHeight - rect.bottom });
    setMounted(true);
    setOpen(true);
  };

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

  useGSAP(
    () => {
      gsap.to(iconRef.current, { rotation: open ? 360 : 0, duration: 0.85, ease: "power2.out" });
      if (!menuRef.current) return;

      gsap.killTweensOf(menuRef.current); 
      if (open) {
        gsap.fromTo(
          menuRef.current,
          { x: -12, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }
        );
        gsap.fromTo(
          menuRef.current.children,
          { x: -8, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.25, stagger: 0.05, delay: 0.08, ease: "power2.out" }
        );
      } else {
        gsap.to(menuRef.current, {
          x: -12, opacity: 0, scale: 0.95, duration: 0.2, ease: "power2.in",
          onComplete: () => setMounted(false),
        });
      }
    },
    { dependencies: [open] }
  );

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (btnRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => setOpen(false), [expanded]);

  return (
    <>
    {/**Desktop - View */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#1b0c22] text-white md:hidden cursor-pointer"
        aria-label="Open menu"
      >
        <Menu size={22} strokeWidth={2.5} />
      </button>

      <aside
        className={`fixed left-4 top-4 bottom-4 z-50 hidden flex-col items-center rounded-[24px]
        bg-page-from py-5 md:flex transition-[width] duration-300 ease-in-out shadow-xl/30
        ${expanded ? "w-[200px]" : "w-[78px]"}`}
      >
        <button onClick={onToggle} className="mb-7 text-fg cursor-pointer">
          <Menu size={24} strokeWidth={2.5} />
        </button>

        <div className="flex w-full flex-col gap-3 px-4 ">
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
           <NavButton
        icon={Settings} label="Settings" expanded={expanded}
        open={open} buttonRef={btnRef} iconRef={iconRef} onClick={tgle}
      />
      {mounted &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "fixed", left: pos.left, bottom: pos.bottom, transformOrigin: "left bottom" }}
            className="z-[80] w-52 rounded-2xl border border-[#8eb69b]/20 bg-[#0b2b26]/25 p-1.5
              shadow-2xl shadow-black/40 backdrop-blur-md"
          >
            {settingsItems.map((item) => (
              <MenuItem
    key={item.label}
    {...item}
    label={item.label === "Theme" ? (theme === "dark" ? "Light theme" : "Dark theme") : item.label}
    onClick={() => {
      if (item.label === "Theme") toggle();
      setOpen(false);
    }}
  />
            ))}
          </div>,
          document.body
        )}
        </div>
      </aside>

    { /**Mobile - View */}
      <div
        ref={backdropRef}
        onClick={() => setMobileOpen(false)}
        style={{ display: "none", opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
      />

      <div
        ref={panelRef}
        style={{ display: "none" }}
        className="fixed left-0 top-0 bottom-0 z-[70] w-[260px] flex-col bg-surface p-5 text-fg shadow-2xl md:hidden"
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="text-lg font-black tracking-tight text-[#daf1de]">
            x<span className="text-[#8eb69b]">GRID - STORE</span>
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-fg/70 hover:bg-fg/10 hover:text-fg"
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
          <div className="mb-2 h-px w-full bg-fg/10" />
          <NavButton icon={User} label="Profile" expanded onClick={() => setMobileOpen(false)} />
          <AccordionSetting onNavigate={() => setMobileOpen(false)} />
        </div>
      </div>
    </>
  );
}

function NavButton({ icon: Icon, active, label, expanded, buttonRef, iconRef, onClick = () => {} }) {
  const innerBtn = useRef(null);
  const innerIcon = useRef(null);
  const icnRef = buttonRef ?? innerBtn;
  const btnRef = iconRef ?? innerIcon;

  const handleClick = (e) => {
    gsap.fromTo(
      btnRef.current, 
      { scale: 0.92},
      { scale: 1, duration: 0.55, ease: "back.out(3)"});
      onClick(e);
  };
  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={`
        flex h-11 w-full items-center gap-3 rounded-xl px-3
        transition-colors duration-600 cursor-pointer
        ${
          active
            ? "bg-primary text-on-primary shadow-lg"
            : open 
            ? "bg-fg/10 text-fg"
            : "text-fg/70 hover:bg-fg/10 hover:text-fg"
        }
      `}
    >
      <Icon ref={icnRef} size={20} className="shrink-0" />
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

function MenuItem({ icon: Icon, label, danger, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer
        ${danger
          ? "ttextark:hover:text-red-300"
          : "text-fg/80 hover:bg-surface-2 hover:text-fg"}`}
    >
      <Icon size={16} className="shrink-0" />
      {label}
    </button>
  );
}

function AccordionSetting({ onNavigate = () => {}}) {
  const [open, setOpen] = useState(false);
  const iconRef = useRef(null);
  const listRef = useRef(null);
  const { theme, toggle} = useTheme();
  const themeLabel = (theme) => (theme === "dark" ? "Light theme" : "Dark theme");
  useGSAP(
    () => {
      gsap.to(iconRef.current, { rotation: open ? 360 : 0, duration: 0.85, ease: "power2.out" });
      gsap.to(listRef.current, { height: open ? "auto" : 0, duration: 0.35, ease: "power2.inOut" });
      if (open) {
        gsap.fromTo(
          listRef.current.children,
          { x: -10, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.25, stagger: 0.05, delay: 0.1 }
        );
      }
    },
    { dependencies: [open] }
  );

  return (
    <div>
      <NavButton
        icon={Settings} label="Settings" expanded
        open={open} iconRef={iconRef} onClick={() => setOpen((v) => !v)}
      />
      <div ref={listRef} style={{ height: 0, overflow: "hidden" }} className="pl-3">
        {settingsItems.map((item) => {
          const isTheme = item.label === "Theme";
          return (
          <MenuItem
              key={item.label}
              {...item}
              label={isTheme ? themeLabel(theme) : item.label}
              onClick={isTheme ? toggle : onNavigate}
            />
          )
          })}
      </div>
    </div>
  );
}

