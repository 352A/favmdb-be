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
      type: DataTypes.STRING, // e.g., "Movie" or "TV Show"
      allowNull: false,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    budget: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

// Relations
User.hasMany(Entry, { foreignKey: "userId", onDelete: "CASCADE" });
Entry.belongsTo(User, { foreignKey: "userId" });

module.exports = Entry;
