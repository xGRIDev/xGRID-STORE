import {
    Bell,
    ChevronDown,
    Search,
    ShoppingCart,
} from 'lucide-react'
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Topnav(
  { searchValue = "",
   onSearchChange = () => {},
  }
){


    
    const headerRef = useRef(null);
    const searchWrapRef = useRef(null);
    const chevronRef = useRef(null);
    const dropdownRef = useRef(null);
    const profileBtnRef = useRef(null);
    const bellRef = useRef(null);


    const [searchFocused, setsearchFocused] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0});


    useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current.children,
        { y: -14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: "power2.out" }
      );
 
      gsap.to(".notif-dot", {
        scale: 1.4,
        opacity: 0.4,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: headerRef }
  );
 
  /** Search Filter */
  useGSAP(
    () => {
      gsap.to(searchWrapRef.current, {
        scale: searchFocused ? 1.02 : 1,
        boxShadow: searchFocused
          ? "0 0 0 3px rgba(168,85,247,0.25)"
          : "0 0 0 0px rgba(168,85,247,0)",
        duration: 0.25,
        ease: "power2.out",
      });
    },
    { dependencies: [searchFocused], scope: headerRef }
  );
 
  /**Profile */
  useEffect(() => {
    if (!profileOpen || !profileBtnRef.current) return;
    const rect = profileBtnRef.current.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + window.scrollY + 8,
      left: rect.right + window.scrollX - 176,
    });
  }, [profileOpen]);
 
  /* Dropdown Animasi GSAP*/
  useGSAP(
    () => {
      gsap.to(chevronRef.current, {
        rotation: profileOpen ? 180 : 0,
        duration: 0.45,
        ease: "power2.out",
      });
 
      if (!dropdownRef.current) return;
      if (profileOpen) {
        gsap.fromTo(
          dropdownRef.current,
          { y: -8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }
        );
      }
    },
    { dependencies: [profileOpen], scope: headerRef }
  );
 
  useGSAP(() => {
    gsap.fromTo(
      bellRef.current,
      { rotate: 0 },
      {
        rotate: 14,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
        transformOrigin: "50% 0%",
      }
    );
  }, []);
 
  useEffect(() => {
    if (!profileOpen) return;
    const handleClick = (e) => {
      if (
        profileBtnRef.current?.contains(e.target) ||
        dropdownRef.current?.contains(e.target)
      )
        return;
      setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [profileOpen]);

    return (
      <header ref={headerRef} className="relative z-50 mb-6 flex items-center gap-4">
      <div ref={searchWrapRef} className="relative max-w-[430px] flex-1 rounded-full">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          type="text"
          value={searchValue}
          placeholder="Search games..."
          onFocus={() => setsearchFocused(true)}
          onBlur={() => setsearchFocused(false)}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-11 w-full rounded-full border border-white/5 bg-[transparent] pl-11 pr-5 text-sm text-white outline-none placeholder:text-white/30 focus:border-zinc-200 transition-colors"
        />
      </div>
 
      <div className="ml-auto flex items-center gap-3">
        <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F5751] text-white transition-transform duration-200 hover:scale-105 hover:bg-[#0c453f] active:scale-95">
          <ShoppingCart size={19} />
        </button>
 
        <button
          ref={bellRef}
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#32133f] text-white transition-transform duration-200 hover:scale-105 hover:bg-[#461854] active:scale-95"
        >
          <Bell size={19} />
          <span className="notif-dot absolute right-2 top-2 h-2 w-2 rounded-full bg-pink-500" />
        </button>
 
        <div className="hidden items-center gap-3 sm:flex">
          <button ref={profileBtnRef} onClick={() => setProfileOpen((v) => !v)} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600" />
            <div className="hidden lg:block text-left">
              <p className="text-sm font-semibold text-white">User</p>
              <p className="text-[10px] text-white/40">user@example.com</p>
            </div>
            <ChevronDown ref={chevronRef} size={15} className="text-white/50" />
          </button>
        </div>
      </div>
 
      {profileOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{ position: "absolute", top: dropdownPos.top, left: dropdownPos.left }}
            className="z-[100] w-44 rounded-xl border border-white/5 bg-[#1b0c22] p-2 shadow-xl"
          >
            {["Profile", "Settings", "Sign out"].map((item) => (
              <button
                key={item}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/80 transition-colors hover:bg-[#32133f] hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>,
          document.body
        )}
    </header>
    )
}