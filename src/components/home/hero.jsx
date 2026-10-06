import { Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion,AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'

const slides = [
  {
    id: 1,
    title: "Top Up Games,",
    highlight: "Buy Games, Be a Legend",
    description:
      "Top up your favorite games, purchase digital games, vouchers, and in-game items in one trusted platform.",
    button: "Mulai Sekarang",
    image: '../assets/images/store-icon.png',
  },
  {
    id: 2,
    title: "Level Up Your",
    highlight: "Gaming Experience",
    description:
      "Fast, secure, and convenient game top-ups for your favorite games anytime, anywhere.",
    button: "Explore Games",
    image: "../assets/images/banner.png",
  },
  {
    id: 3,
    title: "Everything You Need",
    highlight: "For Your Gaming Journey",
    description:
      "Discover game credits, vouchers, digital games, skins, and other gaming essentials.",
    button: "Shop Now",
    image: "/images/hero/xgrid-store.png",
  },  
];

const slideVariant = {
  enter: {
    opacity: 0,
    x: 100,
  },
  center: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -100,
  },
};

export default function Hero() {
  const [ current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length))
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  const slide = slides[current];
  return (
    <section className="relative mb-7 min-h-[280px] overflow-hidden rounded-[22px] bg-gradient-to-r from-zinc-900 via-[#1C2539] to-gray-500">
      <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-purple-400/10 blur-3xl"  data-aos="fade-up" data-aos-duration={1400}/>

      <div className="relative z-10 flex min-h-[280px] items-center">
        <div className="max-w-[48%] px-6 py-8 sm:px-8">
          
          <h1 className="text-3xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-4xl">
            One Platform
            <br />
            For All Your Gaming Needs

            <span className="mt-2 block text-sm tracking-[5px] text-yellow-300">
              What we Serve
            </span>
          </h1>

          <p className="mt-4 max-w-[350px] text-[11px] leading-5 text-white/60">
            Experience an exciting multiplayer battle royale. Build your strategy,and dominate the battlefield.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <button className="rounded-lg bg-white px-5 py-3 text-xs font-bold text-[#4b0870] transition hover:bg-purple-100">
              Buy Game
            </button>

            <button className="flex items-center gap-2 text-xs font-medium text-white">
              <Heart size={16} />
              Add to Wishlist
            </button>
          </div>
        </div>

        <div className="absolute right-0 top-0 h-full w-[60%]">
           <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full
          border border-white/10 bg-black/20 text-white backdrop-blur-md transition hover:bg-white/20">
        <ChevronLeft size={18} />
      </button>
          <motion.img
          src={slide.image}
          initial={{
            scale: 1.08,
            opacity: 0,
          }}
            animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="
                  h-full
                  w-full
                  object-contain
                  object-right
                "
          />
        </div>

        

        <div className="absolute bottom-5 right-6 flex gap-2">
           {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`
              h-2
              rounded-full
              transition-all
              duration-300
              ${
                current === index
                  ? "w-7 bg-white"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }
            `}
          />
        ))}
        </div>
      </div>
    </section>
  )
}