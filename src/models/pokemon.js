const validTypes = [
  "Plante",
  "Poisson",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Ce nom de pokemon est déja utilisé"
        },
        validate: {
          notEmpty: { msg: "Le nom du pokemon ne peut  pas être vide." },
          notNull: { msg: "Le nom du pokémon est requis" },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utiliser uniquement les entiers pour les points de vies",
          },
          notNull: { msg: "Les points de vies sont réquis" },
          min: {
            args: [0],
            msg: "Entrer les points de vies superieures à 0",
          },
          max: {
            args: [999],
            msg: "Entrer les points de vies inferieur à 1000",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utiliser  uniquement les entiers pour les dégats" },
          notNull: { msg: "Les dégats sont réquis" },
          min: {
            args: [0],
            msg: "Les dégats doivent etre superieures à 0",
          },
          max: {
            args: [99],
            msg: "Les dégats doivent etre inferieur à 100",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "Entrer une url valide pour la photo" },
          notNull: { msg: "Une photo est nécessaire" },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error("Un pokemon doit avoir au moins un type");
            }
            if (!value.split(",").length > 3) {
              throw new Error("Un pokemon  ne peut pas avoir plus de 3 types");
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type de pokemon doit appartenir à la liste suivante: ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
