const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", (req, res) => {
    Pokemon.findByPk(req.params.id).then((pokemon) => {
      if (pokemon === null) {
        const message = "Le pokemon que vous essayer de supprimé n'existe pas!";
        return res.status(404).send({ message });
      }
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: { id: pokemon.id },
      })
        .then((_) => {
          const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`;
          res.json({ message, data: pokemonDeleted });
        })
        .catch((error) => {
          const message =
            "Le pokemon n'a pas pu etre modifié. Réessayez dans un instant";
          res.status(500).json({ message, data: error });
        });
    });
  });
};
