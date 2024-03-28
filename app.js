const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express(); //creation de l'instance du serveur express
const port = 3000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());
  
sequelize.initDb();

//Route pour l'affichage de tous les pokemons
require("./src/routes/findAllPokemons")(app);

//Route pour l'affichage d'un pokémon par Id
require("./src/routes/finPokemonByPk")(app);

//Route pour la création d'un pokemon
require("./src/routes/createPokemon")(app);

//Route pour modifier un pokemon
require("./src/routes/updatePokemon")(app);

//Route pour supprimmer un pokemon
require("./src/routes/deletePokemon")(app);

//Route d'authenfification
require("./src/routes/login")(app);
//Route pour le 404
app.use(({res}) => {
  const message = 'Impossible de  trouver cette page';
  res.status(404).json({message});
});


app.listen(port, () =>
  console.log(`Notre application est démarée sur : http://localhost:${port}`)
);
