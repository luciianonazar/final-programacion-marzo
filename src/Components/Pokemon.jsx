function Pokemon({ pokemon, agregarFavorito }) {
    return (
      <div style={{ border: "1px solid #ccc", padding: "10px", textAlign: "center" }}>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        <p>Tipo: {pokemon.types[0].type.name}</p>
        <button onClick={() => agregarFavorito(pokemon)}>Agregar a Favoritos</button>
      </div>
    );
  }
  
  export default Pokemon;