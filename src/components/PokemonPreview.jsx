import { useEffect, useState } from "react";
import axios from "axios";
import { colorByType } from "../constants/pokemon";

const PokemonPreview = ({ pokemonURL, onClick }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios
      .get(pokemonURL)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <article
      onClick={onClick}
      className="text-center bg-white rounded-3xl font-semibold capitalize pb-4 shadow-lg shadow-slate-400/10 border-solid border-2 border-transparent hover:border-slate-200 cursor-pointer"
    >
      <header className="h-22">
        <img
          src={
            pokemon?.sprites.versions["generation-v"]["black-white"]
              .front_default
          }
          alt=""
        />
      </header>
      <span className="text-sm text-slate-400">N° {pokemon?.id}</span>
      <h4 className="text-lg">{pokemon?.name}</h4>
      <div className="flex gap-2 justify-center">
        {pokemon?.types.map((type) => (
          <span
            className={`p-1 rounded-md px-2 text-white text-sm ${
              colorByType[type.type.name]
            }`}
            key={type.type.name}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </article>
  );
};

export default PokemonPreview;
