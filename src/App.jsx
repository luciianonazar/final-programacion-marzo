import { useState, useEffect } from "react";
import ListaPokemones from "./Components/ListaPokemones";
import Pokemon from "./Components/Pokemon";

function App() {
  const [pokemones, setPokemones] = useState([]);
  const [Busqueda, setBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    async function buscarPokemon() {
      if (Busqueda.trim() === "") return;
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${Busqueda.toLowerCase()}`);
        if (!response.ok) throw new Error("Pokémon no encontrado");
        const poke = await response.json();
        setPokemones([poke]);
      } catch {
        setPokemones([]);
      }
    }

    buscarPokemon();
  }, [Busqueda]);

  function agregarFavorito(pokemon) {
    setFavoritos((prev) =>
      prev.some((fav) => fav.id === pokemon.id) ? prev : [...prev, pokemon]
    );
  }

  return (
    <div>
      <h1>Lista de Pokémon</h1>
      <input
        type="text"
        placeholder="Buscar Pokémon"
        value={Busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <ListaPokemones pokemones={pokemones} agregarFavorito={agregarFavorito} />
      <h2>Favoritos</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {favoritos.map((poke) => (
          <Pokemon key={poke.id} pokemon={poke} agregarFavorito={agregarFavorito} />
        ))}
      </div>
    </div>
  );
}

export default App;
