import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

const USER = process.env.OS_USER;
const PASS = process.env.OS_PASS;

app.get("/api/flights", async (req, res) => {
  try {
    const response = await axios.get(
      "https://opensky-network.org/api/states/all",
      {
        auth: {
          username: USER,
          password: PASS
        },
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      }
    );

    const states = response.data.states || [];

   const flights = data.states
  .filter(f => f[5] !== null && f[6] !== null)
  .map(f => ({
    callsign: f[1]?.trim() || "Unknown",
    origin_country: f[2],
    longitude: f[5],
    latitude: f[6],
    baro_altitude: f[7],
    velocity: f[9],
    heading: f[10]
  }));

      .filter(f => f.latitude !== null && f.longitude !== null);

    res.json({ count: flights.length, flights });

  } catch (err) {
    console.error("OPENSKY ERROR:", err?.response?.status, err?.response?.data, err.message);
    res.status(500).json({ error: "Unable to get live flight data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));

