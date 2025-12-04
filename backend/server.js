app.get("/api/flights", async (req, res) => {
  try {
    const response = await axios.get(
      "https://opensky-network.org/api/states/all",
      {
        headers: {
          "User-Agent": "Mozilla/5.0",      // ✅ Spoof browser
          "Accept": "application/json"
        },
        timeout: 10000                     // avoid Render timeout
      }
    );

    const states = response.data.states || [];

    const flights = states
      .map(f => ({
        icao24: f[0],
        callsign: f[1]?.trim() || "Unknown",
        origin_country: f[2],
        last_contact: f[4],
        longitude: f[5],
        latitude: f[6],
        baro_altitude: f[7],
        on_ground: f[8],
        velocity: f[9],
        heading: f[10],
        vertical_rate: f[11]
      }))
      .filter(f => f.latitude !== null && f.longitude !== null);

    res.json({ count: flights.length, flights });

  } catch (err) {
    console.error("Backend error:", err.message);
    res.status(500).json({ error: "Unable to get live flight data" });
  }
});


app.listen(5000, () => console.log("API running on http://localhost:5000"));


