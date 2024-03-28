const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          const message = "Cette identifiant n'existe pas";
          return res.status(404).json({ message });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = "Le mot de passe est incorrect";
              return res.status(401).json({ message });
            }

            //Génration du tokken
            const token = jwt.sign({ userId: user.id }, privateKey, {expiresIn: "2h"});
            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user, token });
          });
      })
      .catch((err) => {
        const message =
          "Lutilisateur ne peut se connecter pour l'instant, reéssayer plus tard";
        return res.status(500).json({ message, data: err });
      });
  });
};
