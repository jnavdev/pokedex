import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import PokemonList from "./PokemonList";

const Pokemons = () => {
  const [allPokemons, setAllPokemons] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=80")
      .then(({ data }) => setAllPokemons(data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="p-4 py-5">
      <form>
        <div className="bg-white p-4 flex rounded-2xl">
          <input
            className="text-lg outline-none border-transparent focus:border-transparent focus:ring-0 flex-1"
            type="text"
            placeholder="Search your Pokemon"
          />
          <button className="border-transparent bg-red-500 p-2 rounded-xl shadow-lg shadow-red-500/50 hover:bg-red-400 transition-colors">
            <IconSearch color="white" stroke={3} />
          </button>
        </div>
      </form>
      <PokemonList pokemons={allPokemons} />
    </section>
  );
};

export default Pokemons;
