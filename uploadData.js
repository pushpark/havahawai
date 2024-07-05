const xlsx = require("xlsx");
const { Airport, City, Country, sequelize } = require("./dbsetup");

async function insertDataFromSpreadsheet(filePath) {
  const workbook = xlsx.readFile(filePath);
  const airportSheet = workbook.Sheets["airport"];
  const citySheet = workbook.Sheets["city"];
  const countrySheet = workbook.Sheets["country"];

  const airportData = xlsx.utils.sheet_to_json(airportSheet);
  const cityData = xlsx.utils.sheet_to_json(citySheet);
  const countryData = xlsx.utils.sheet_to_json(countrySheet);
  await sequelize.sync({ force: true });
  try {
    await Country.bulkCreate(countryData);
    await City.bulkCreate(cityData);
    await Airport.bulkCreate(airportData);

    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await sequelize.close();
  }
}

insertDataFromSpreadsheet("./Database.xlsx");
