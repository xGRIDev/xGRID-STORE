import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const DEFAULT_CATEGORY = ["All"];

export default function SectionTitle({
  categories = DEFAULT_CATEGORY,
  selectCategory = DEFAULT_CATEGORY[0],
  onCategoryChange = () => {},
  title,
}){

  const filterBtnRef = useRef(null);
  const filterChvrnRef = useRef(null);
  const filterDrpDwnRef = useRef(null);

  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPos, setFilterPos] = useState({ top: 0, left: 0});

  const isFiltering = selectCategory !== categories[0];

  useEffect(() => {
    if (!filterOpen || !filterBtnRef.current) return;
    const rect = filterBtnRef.current.getBoundingClientRect();
    setFilterPos({ top: rect.bottom + window.scrollY + 8, left: rect.left + window.scrollX });
  }, [filterOpen]);
 
  useGSAP(
    () => {
      gsap.to(filterChvrnRef.current, {
        rotation: filterOpen ? 180 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
      if (!filterDrpDwnRef.current) return;
      if (filterOpen) {
        gsap.fromTo(
          filterDrpDwnRef.current,
          { y: -8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }
        );
      }
    },
    { dependencies: [filterOpen]}
  );
  useEffect(() => {
    if (!filterOpen) return;
    const handleClick = (e) => {
      if (filterBtnRef.current?.contains(e.target) || filterDrpDwnRef.current?.contains(e.target)) return;
      setFilterOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [filterOpen]);
    return (
         <div className="
      mb-4
      flex
      items-center
      justify-between
    ">
      <h2 className="
        text-base
        font-semibold
        text-white
      ">
        {title}
      </h2>

        <button 
        ref={filterBtnRef}
        onClick={() => setFilterOpen((v) => !v)}
        className={`flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
            isFiltering
              ? "border-purple-500/50 bg-purple-500/10 text-purple-300"
              : "border-white/5 bg-white/5 text-white/70 hover:text-white"
          }`
        }>
          <SlidersHorizontal size={19}/>
          <span className="hidden sm:inline">
            {isFiltering ? selectCategory : "Category"}
          </span>
          <ChevronDown ref={filterChvrnRef} size={14} />
        </button>
         { filterOpen && 
                createPortal(
                  <div
                    ref={filterDrpDwnRef}
                    style={{ position: "absolute", top: filterPos.top, left: filterPos.left}} 
                    className="z-[100] w-48 rounded-xl border border-white/5 bg-[#00432D] p-2 shadow-xl">
                      {categories.map((ctg) => (
                        <button
                          key={ctg}
                          onClick={() => {
                            onCategoryChange(ctg);
                            setFilterOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          selectCategory === ctg
                            ? "bg-purple-500/15 text-purple-300"
                            : "text-white/80 hover:bg-[#72BF8E] hover:text-white"
                        }`}>
                          {ctg}
                          </button>
                      ))}
                    </div>, document.body
                )
              }
    </div>
    )
}