import Topnav from "../components/layouts/top"
import Sidebar from "../components/layouts/sidebar"
import Hero from "../components/home/hero"
import GameSection from "../components/home/gamesection"
import ScrollToTop from "../components/layouts/scroll-top"
import { useState, useMemo } from "react"
import { otherSell, popularGames } from "../data/games"


export default function Home(){

const [searchValue, setSearchValue] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");
 
const allGames = useMemo(
    () => [...popularGames, ...otherSell],
    []
);
 
const categories = useMemo(() => {
    const unique = [...new Set(allGames.map((g) => g.category))];
    return ["All", ...unique];
}, [allGames]);
 
  const filteredGames = useMemo(() => {
    return allGames.filter((game) => {
      const matchesCategory =
        selectedCategory === "All" || game.category === selectedCategory;
      const matchesSearch = game.name
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allGames, searchValue, selectedCategory]);
 
  const isFiltering = searchValue.trim() !== "" || selectedCategory !== "All";
  const [ sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="min-h-screen --surface text-fg">
            <Sidebar expanded={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)}/>
            <main className={`min-h-screen px-4 py-4 transition-[margin] duration-300 md:px-6 lg:px-8
            ${sidebarOpen ? "md:ml-[224px]" : "md:ml-[102px]"}`}>
                <Topnav
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
                <Hero/>
                   {isFiltering ? (
                    filteredGames.length > 0 ? (
                      <div data-aos="fade-up" data-aos-duration={1000}>
                        <GameSection title="Results" games={filteredGames} />
                      </div>
                    ) : (
                      <p className="mt-10 text-center text-white/40">
                        No games match {searchValue && `"${searchValue}"`}
                        {selectedCategory !== "All" && ` in ${selectedCategory}`}.
                      </p>
                      )
                    ) : (
          
                  <>
                    <div data-aos="fade-up" data-aos-duration={1000}>
                      <GameSection title="Popular" games={popularGames} />
                    </div>
                    <div data-aos="fade-up" data-aos-duration={1000}>
                      <GameSection title="Other Purchase" games={otherSell} />
                    </div>
                  </>
                  )}
                 </main>
               <ScrollToTop />
             </div>
    )
}