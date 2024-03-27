const { Pokemon } = require("../db/sequelize");
const { Op, QueryTypes } = require('sequelize');

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;
      if(name.length < 2){
        const message = "Le terme de recherche doit etre de minimum 2 caractères.";
        return res.status(400).json({message})
      }
      return Pokemon.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        order: ['name'],
        limit: limit  
      })
        .then(({count, rows}) => {
          const message = `Il y a ${count} pour le terme chercher ${name}`;
          res.status(200).json({ message, data: rows });
        })
        .catch((error) => {
          const message =
            "La liste de pokemon n'a pas pu etre recuperée. Réessayez dans un instant";
          res.status(500).json({ message, data: error });
        });
    }
    Pokemon.findAll({order: ['name']})
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
