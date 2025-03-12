import { useState, useEffect } from "react";
import ListaPokemones from "./Components/ListaPokemones";
import Pokemon from "./Components/Pokemon";

function App() {
  const [pokemones, setPokemones] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function obtenerPokemonesIniciales() {
      try {
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        if (!respuesta.ok) throw new Error("No se pudieron cargar los Pokémon");
        const datos = await respuesta.json();
        const detallesPokemones = await Promise.all(
          datos.results.map(async (pokemon) => {
            const respuestaPoke = await fetch(pokemon.url);
            return await respuestaPoke.json();
          })
        );
        setPokemones(detallesPokemones);
      } catch (err) {
        setError("Hubo un error al cargar los Pokémon.");
      }
    }

    obtenerPokemonesIniciales();
  }, []);

  useEffect(() => {
    async function buscarPokemon() {
      if (busqueda.trim() === "") return;
      setError("");
      try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda.toLowerCase()}`);
        if (!respuesta.ok) throw new Error("Pokémon no encontrado");
        const poke = await respuesta.json();
        setPokemones([poke]);
      } catch (err) {
        setPokemones([]);
        setError("Pokémon no encontrado. Intenta con otro nombre.");
      }
    }

    buscarPokemon();
  }, [busqueda]);

  function agregarFavorito(pokemon) {
    setFavoritos((prev) =>
      prev.some((fav) => fav.id === pokemon.id)
        ? prev.filter((fav) => fav.id !== pokemon.id)
        : [...prev, pokemon]
    );
  }

  return (
    <div>
      <h1>Lista de Pokémon</h1>
      <input
        type="text"
        placeholder="Buscar Pokémon"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      {error && <p>{error}</p>}
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
