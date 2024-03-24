import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import PokemonList from "./PokemonList";
import { useIntersectionObserver } from "@uidotdev/usehooks";

const INITIAL_LIMIT = 20;
const INCREASE_LIMIT = 20;

const Pokemons = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [limit, setLimit] = useState(INITIAL_LIMIT);

  const [ref, entry] = useIntersectionObserver({});
  const isVisible = !!entry?.isIntersecting;

  const pokemonsByName = allPokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  );

  const handleChangePokemonName = (e) =>
    setPokemonName(e.target.value.toLowerCase());

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=898")
      .then(({ data }) => setAllPokemons(data.results))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const maxPokemons = pokemonsByName.length;
    if (isVisible && maxPokemons !== 0) {
      const newLimit = limit + INCREASE_LIMIT;
      newLimit > maxPokemons ? setLimit(maxPokemons) : setLimit(newLimit);
    }
  }, [isVisible]);

  useEffect(() => {
    setLimit(INITIAL_LIMIT);
  }, [pokemonName]);

  return (
    <section className="p-4 py-5">
      <form>
        <div className="bg-white p-4 flex rounded-2xl">
          <input
            className="text-lg outline-none border-transparent focus:border-transparent focus:ring-0 flex-1"
            type="text"
            autoComplete="off"
            placeholder="Search your Pokemon"
            name="pokemonName"
            onChange={handleChangePokemonName}
          />
          <button
            type="button"
            className="border-transparent bg-red-500 p-2 rounded-xl shadow-lg shadow-red-500/50 hover:bg-red-400 transition-colors"
          >
            <IconSearch color="white" stroke={3} />
          </button>
        </div>
      </form>
      <PokemonList pokemons={pokemonsByName.slice(0, limit)} />

      {/* Target Observer */}
      <span ref={ref}></span>
    </section>
  );
};

export default Pokemons;
