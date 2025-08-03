const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Entry = sequelize.define(
  "Entry",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Movie", "TV Show"),
      allowNull: false,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    budget: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    durationHours: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    durationMinutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    seasons: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeValidate: (entry) => {
        if (entry.type === "Movie") {
          const hours = entry.durationHours;
          const minutes = entry.durationMinutes;

          if (
            typeof hours !== "number" ||
            typeof minutes !== "number" ||
            hours < 0 ||
            minutes < 0 ||
            minutes > 59
          ) {
            throw new Error(
              "Movies must have valid durationHours and durationMinutes (0–59)"
            );
          }

          entry.seasons = null;
        } else if (entry.type === "TV Show") {
          if (typeof entry.seasons !== "number" || entry.seasons < 1) {
            throw new Error(
              "TV Shows must have a valid number of seasons (1+)"
            );
          }

          entry.durationHours = null;
          entry.durationMinutes = null;
        } else {
          throw new Error("Invalid type. Must be 'Movie' or 'TV Show'");
        }
      },
    },
  }
);

// Relations
User.hasMany(Entry, { foreignKey: "userId", onDelete: "CASCADE" });
Entry.belongsTo(User, { foreignKey: "userId" });

module.exports = Entry;
