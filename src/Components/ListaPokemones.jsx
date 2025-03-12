import Pokemon from "./Pokemon";

function ListaPokemones({ pokemones, agregarFavorito }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {pokemones.length > 0 ? (
        pokemones.map((poke) => (
          <Pokemon key={poke.id} pokemon={poke} agregarFavorito={agregarFavorito} />
        ))
      ) : (
        <p>No se encontraron resultados</p>
      )}
    </div>
  );
}

export default ListaPokemones;