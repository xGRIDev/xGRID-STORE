import { ShoppingCart } from "lucide-react"
export default function ListGame({game}){
    return (
         <article className="
      group
      cursor-pointer
    ">

      <div className="
        relative
        aspect-[0.72]
        overflow-hidden
        rounded-xl
        bg-[#32113e]
      ">

        <img
          src={game.image}
          alt={game.name}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-500
            group-hover:scale-110
          "
        />

        <div className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/90
          via-black/10
          to-transparent
        " />

        <div className="
          absolute
          bottom-0
          left-0
          right-0
          p-3
        ">
          <p className="
            mb-1
            text-[9px]
            uppercase
            tracking-wider
            text-white/50
          ">
            {game.category}
          </p>

          <h3 className="
            text-sm
            font-bold
            text-white
          ">
            {game.name}
          </h3>

          <div className="
            mt-2
            flex
            items-center
            justify-between
          ">
            <span className="
              text-xs
              font-semibold
              text-purple-200
            ">
              {game.price}
            </span>

            <button className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              bg-white
              text-purple-800
              opacity-0
              transition
              group-hover:opacity-100
            ">
              <ShoppingCart size={13} />
            </button>
          </div>
        </div>
      </div>
    </article>
    )
}