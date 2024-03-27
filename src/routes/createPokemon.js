const { ValidationError, UniqueConstraintError } = require("sequelize");
const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/pokemons", (req, res) => {
    Pokemon.create(req.body)
      .then((pokemon) => {
        const message = `le pokemon ${pokemon.name} a bien été créer`;
        res.json({ message: message, data: pokemon });
      })
      .catch((err) => {
        if (err instanceof ValidationError) {
          return res.status(400).json({ message: err.message, data: err });
        }
        if (err instanceof UniqueConstraintError) {
          return res.status(400).json({ message: err.message, data: err });
        }
        const message = "Le pokemon n'a pas pu etre ajouté. Réessayez plutard!";
        res.status(500).json({ message, data: err });
      });
  });
};
