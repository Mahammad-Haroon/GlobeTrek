// ============================================================
// Weather Controller - OpenWeatherMap API integration
// ============================================================
const axios = require('axios');

// @desc    Get weather for a city
// @route   GET /api/weather?city=Tokyo
// @access  Private
const getWeather = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ success: false, message: 'City name is required.' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey || apiKey === 'your_openweather_api_key') {
      // Return mock data if no API key configured
      return res.json({
        success: true,
        mock: true,
        weather: {
          city: city,
          country: 'XX',
          temperature: Math.floor(Math.random() * 20) + 15,
          feelsLike: Math.floor(Math.random() * 20) + 12,
          humidity: Math.floor(Math.random() * 40) + 40,
          windSpeed: Math.floor(Math.random() * 20) + 5,
          description: 'Partly cloudy',
          icon: '02d',
          visibility: 10,
          pressure: 1013,
        },
      });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );

    const data = response.data;

    res.json({
      success: true,
      weather: {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // m/s to km/h
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        visibility: data.visibility / 1000,
        pressure: data.main.pressure,
      },
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ success: false, message: 'City not found.' });
    }
    res.status(500).json({ success: false, message: 'Weather service unavailable.' });
  }
};

module.exports = { getWeather };
