import SectionTitle from "./sectiontitle";
import { useState, useMemo } from "react";
import { otherSell, popularGames } from "../../data/games"

export default function GameSection({ 
    title, 
    searchVal = "",
}){

  const [selectedCategory, setSelectedCategory] = useState("All");
 
  const allGame = useMemo(
          () => [...popularGames, ...otherSell],
          []
      );
      
  const categories = useMemo(() => {
    const unique = [...new Set(allGame.map((g) => g.category))];
    return ["All", ...unique];
  }, [allGame]);
 
  const visibleGames = useMemo(() => {
    return allGame.filter((game) => {
      const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;
      const matchesSearch = game.name.toLowerCase().includes(searchVal.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allGame, selectedCategory, searchVal]);
 
  if (visibleGames.length === 0) return null;
 

    return (
        <section className="mb-8">
      <SectionTitle
        title={title}
        categories={categories}
        selectCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
 
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {visibleGames.map((game) => (
          <div key={game.id} className="rounded-xl bg-fg/20 p-3">
            <img src={game.image} alt={game.name} loading="lazy" className="aspect-[3/4] w-full object-cover" />
            <p className="text-sm font-semibold text-fg">{game.name}</p>
            <p className="text-xs text-fg/55">{game.category}</p>
            <p className="mt-1 text-sm text-fg">{game.price}</p>
          </div>
        ))}
      </div>
    </section>
    )
}