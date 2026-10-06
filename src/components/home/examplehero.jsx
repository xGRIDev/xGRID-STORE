import { Heart, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'

const slides = [
  {
    id: 1,
    title: "Top Up Games,",
    highlight: "Buy Games, Be a Legend",
    description:
      "Top up your favorite games, purchase digital games, vouchers, and in-game items in one trusted platform.",
    button: "Mulai Sekarang",
    image: "/images/hero/xgrid-store.png",
  },
  {
    id: 2,
    title: "Level Up Your",
    highlight: "Gaming Experience",
    description:
      "Fast, secure, and convenient game top-ups for your favorite games anytime, anywhere.",
    button: "Explore Games",
    image: "/images/hero/mobile-legends.png",
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

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length))
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  //autoplay-slide
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = slides[current];

  return (
   <section
      className="
        relative
        mb-8
        min-h-[340px]
        overflow-hidden
        rounded-[28px]
        bg-gradient-to-br
        from-[#7416a4]
        via-[#4d0870]
        to-[#180021]
      "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background glow */}
      <div className="
        absolute
        -right-32
        -top-32
        h-[450px]
        w-[450px]
        rounded-full
        bg-purple-500/20
        blur-[100px]
      " />

      <div className="
        absolute
        bottom-[-200px]
        left-[-100px]
        h-[400px]
        w-[400px]
        rounded-full
        bg-fuchsia-500/10
        blur-[100px]
      " />

      {/* Slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          variants={slideVariant}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          {/* Content */}
          <div className="
            relative
            z-20
            flex
            h-full
            min-h-[340px]
            w-full
            items-center
          ">
            <div className="
              w-[52%]
              px-6
              py-10
              sm:px-10
              lg:w-[48%]
              lg:px-12
            ">
              {/* Badge */}
              <div className="
                mb-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/10
                px-3
                py-1.5
                text-[10px]
                font-medium
                text-white
                backdrop-blur-md
              ">
                <span>🎮</span>
                YOUR ULTIMATE GAME STORE
              </div>

              {/* Heading */}
              <h1 className="
                text-3xl
                font-black
                leading-[1.05]
                tracking-tight
                text-white
                sm:text-4xl
                lg:text-5xl
              ">
                {slide.title}
                <br />

                <span className="text-fuchsia-300">
                  {slide.highlight}
                </span>
              </h1>

              {/* Description */}
              <p className="
                mt-5
                max-w-[500px]
                text-xs
                leading-6
                text-white/60
                sm:text-sm
              ">
                {slide.description}
              </p>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">

                <button className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  py-3
                  text-xs
                  font-bold
                  text-purple-800
                  shadow-xl
                  shadow-purple-950/30
                  transition
                  hover:scale-105
                ">
                  <ShoppingCart size={16} />
                  {slide.button}
                </button>

                <button className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-3
                  text-xs
                  font-medium
                  text-white
                  backdrop-blur-md
                  transition
                  hover:bg-white/10
                ">
                  <Heart size={16} />
                  Wishlist
                </button>

              </div>

              {/* Benefits */}
              <div className="
                mt-6
                flex
                gap-5
                text-[10px]
                text-white/50
              ">
                <span>⚡ Fast Process</span>
                <span>🛡 Secure</span>
                <span>💎 Best Price</span>
              </div>
            </div>

            {/* Image */}
            <div className="
              absolute
              right-0
              top-0
              h-full
              w-[58%]
              lg:w-[60%]
            ">
              <motion.img
                src={slide.image}
                alt={slide.highlight}
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
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Previous */}
      <button
        onClick={prevSlide}
        className="
          absolute
          left-4
          top-1/2
          z-30
          flex
          h-9
          w-9
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-black/20
          text-white
          backdrop-blur-md
          transition
          hover:bg-white/20
        "
      >
        <ChevronLeft size={18} />
      </button>

      {/* Next */}
      <button
        onClick={nextSlide}
        className="
          absolute
          right-4
          top-1/2
          z-30
          flex
          h-9
          w-9
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-black/20
          text-white
          backdrop-blur-md
          transition
          hover:bg-white/20
        "
      >
        <ChevronRight size={18} />
      </button>

      {/* Pagination */}
      <div className="
        absolute
        bottom-5
        left-1/2
        z-30
        flex
        -translate-x-1/2
        items-center
        gap-2
      ">
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
    </section>
  )
}