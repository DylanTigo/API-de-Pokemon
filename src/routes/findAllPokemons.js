const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    Pokemon.findAll()
      .then((pokemons) => {
        const message = "la liste de okemons à bien été récupéreée";
        res.json({ message: message, data: pokemons });
      })
      .catch((error) => {
        const message =
          "La liste de pokemon n'a pas pu etre recuperée. Réessayez dans un instant";
        res.status(500).json({ message, data: error });
      });
  });
};
