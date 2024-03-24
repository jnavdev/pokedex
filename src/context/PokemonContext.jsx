import { createContext, useState } from "react";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [showPokemonDetail, setShowPokemonDetail] = useState(false);

  const showPokemonById = () => {
    setShowPokemonDetail(true);
  };

  const closePokemonDetail = () => {
    setShowPokemonDetail(false);
  };

  return (
    <PokemonContext.Provider
      value={{
        showPokemonDetail,
        showPokemonById,
        closePokemonDetail,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
