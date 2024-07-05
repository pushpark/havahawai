const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  dialect: "sqlite",
  storage: "database.sqlite",
  logging: false,
});

const Country = sequelize.define("Country", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  alt_name: { type: DataTypes.STRING },
  country_code_two: { type: DataTypes.STRING },
  country_code_three: { type: DataTypes.STRING },
  flag_app: { type: DataTypes.STRING },
  mobile_code: { type: DataTypes.INTEGER },
  continent_id: { type: DataTypes.INTEGER },
  country_flag: { type: DataTypes.STRING },
});

const City = sequelize.define("City", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  alt_name: {
    type: DataTypes.STRING,
  },
  country_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Country,
      key: "id",
    },
  },
  is_active: { type: DataTypes.BOOLEAN },
  lat: { type: DataTypes.FLOAT },
  long: { type: DataTypes.FLOAT },
});

const Airport = sequelize.define("Airport", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  icao_code: { type: DataTypes.STRING, allowNull: false },
  iata_code: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING },
  city_id: {
    type: DataTypes.STRING,
  },
  country_id: { type: DataTypes.STRING },
  continent_id: { type: DataTypes.STRING },
  website_url: { type: DataTypes.STRING },
  latitude_deg: { type: DataTypes.FLOAT },
  longitude_deg: { type: DataTypes.FLOAT },
  elevation_ft: { type: DataTypes.INTEGER },
  wikipedia_link: { type: DataTypes.STRING },
});

City.belongsTo(Country, { foreignKey: "county_id" });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => console.error("Unable to create tables:", err));

module.exports = { Airport, City, Country, sequelize };
