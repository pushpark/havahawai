const express = require("express");
const { Airport, City, Country } = require("./dbsetup");

const app = express();
const PORT = 3005;

app.use(express.json());

app.get("/api/airport", async (req, res) => {
  const { iata_code } = req.query;
  if (!iata_code) {
    return res
      .status(400)
      .json({ message: "iata_code query parameter is required" });
  }

  try {
    const airport = await Airport.findOne({
      where: { iata_code },
    });
    console.log("airport.city_id");
    if (airport) {
      const id = airport.city_id;
      const city = await City.findOne({
        where: { id },
      });
      if (city !== null) {
        const country = await Country.findOne({
          where: { id: city.country_id },
        });
        if (country !== null) {
          const response = {
            airport: {
              id: airport.id,
              icao_code: airport.icao_code,
              iata_code: airport.iata_code,
              name: airport.name,
              type: airport.type,
              latitude_deg: airport.latitude_deg,
              longitude_deg: airport.longitude_deg,
              elevation_ft: airport.elevation_ft,
              address: {
                city: {
                  id: city.id,
                  name: city.name,
                  country_id: city.country_id,
                  is_active: city.is_active,
                  lat: city.lat,
                  long: city.long,
                },
                country: {
                  id: country.id,
                  name: country.name,
                  country_code_two: country.country_code_two,
                  country_code_three: country.country_code_three,
                  mobile_code: country.mobile_code,
                  continent_id: country.continent_id,
                },
              },
            },
          };

          res.json(response);
        } else {
          const response = {
            airport: {
              id: airport.id,
              icao_code: airport.icao_code,
              iata_code: airport.iata_code,
              name: airport.name,
              type: airport.type,
              latitude_deg: airport.latitude_deg,
              longitude_deg: airport.longitude_deg,
              elevation_ft: airport.elevation_ft,
              address: {
                city: {
                  id: city.id,
                  name: city.name,
                  country_id: city.country_id,
                  is_active: city.is_active,
                  lat: city.lat,
                  long: city.long,
                },
                country: null,
              },
            },
          };

          res.json(response);
        }
      } else {
        const result = {
          airport: {
            id: airport.id,
            icao_code: airport.icao_code,
            iata_code: airport.iata_code,
            name: airport.name,
            type: airport.type,
            latitude_deg: airport.latitude_deg,
            longitude_deg: airport.longitude_deg,
            elevation_ft: airport.elevation_ft,
            address: {
              city: null,
              country: null,
            },
          },
        };
        res.json(result);
      }
    } else {
      res.status(404).json({ message: "Airport not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving airport", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
