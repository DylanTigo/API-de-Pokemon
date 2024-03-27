const { Pokemon } = require('../db/sequelize')
const { ValidationError } = require('sequelize')
  
module.exports = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Pokemon.findByPk(id).then(pokemon => {
        if (pokemon === null) {
          const message = "Le pokemon n'existe pas"
          return res.status(400).send({message})
        }
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    }).catch((err) => {
      if (err instanceof ValidationError) {
        return res.status(400).json({message: err.message, data: err})
      }
      const message =
        "Le pokemon n'a pas pu etre modifié. Réessayez dans un instant";
      res.status(500).json({ message, data: err });
    });
  })
}