// ============================================================
// WeatherWidget — fetch & display weather for a city
// ============================================================
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../services/api'
import { RiSearchLine, RiWindyLine, RiDropLine, RiEyeLine, RiTempHotLine } from 'react-icons/ri'
import LoadingSpinner from './LoadingSpinner'

const weatherIconUrl = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`

export default function WeatherWidget({ defaultCity = '' }) {
  const [city, setCity] = useState(defaultCity)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async (e) => {
    e?.preventDefault()
    if (!city.trim()) return
    setLoading(true); setError('')
    try {
      const res = await api.get(`/weather?city=${encodeURIComponent(city)}`)
      setWeather(res.data.weather)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not fetch weather')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card p-5">
      <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-4">
        🌤 Live Weather
      </h3>

      <form onSubmit={fetchWeather} className="flex gap-2 mb-4">
        <input
          className="input flex-1"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city name…"
        />
        <button type="submit" className="btn-primary px-4 py-3 flex items-center gap-1">
          {loading ? <LoadingSpinner size="sm" /> : <RiSearchLine size={16} />}
        </button>
      </form>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <AnimatePresence mode="wait">
        {weather && (
          <motion.div
            key={weather.city}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-4 text-white"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm opacity-80">{weather.city}, {weather.country}</p>
                <p className="text-4xl font-bold font-display">{weather.temperature}°C</p>
                <p className="text-sm capitalize opacity-90 mt-0.5">{weather.description}</p>
              </div>
              {weather.icon && (
                <img src={weatherIconUrl(weather.icon)} alt={weather.description} className="w-16 h-16" />
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/20">
              <div className="flex flex-col items-center gap-1">
                <RiDropLine size={14} className="opacity-70" />
                <span className="text-xs opacity-80">Humidity</span>
                <span className="text-sm font-semibold">{weather.humidity}%</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RiWindyLine size={14} className="opacity-70" />
                <span className="text-xs opacity-80">Wind</span>
                <span className="text-sm font-semibold">{weather.windSpeed} km/h</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RiTempHotLine size={14} className="opacity-70" />
                <span className="text-xs opacity-80">Feels like</span>
                <span className="text-sm font-semibold">{weather.feelsLike}°C</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!weather && !loading && (
        <div className="text-center py-6 text-slate-400 dark:text-slate-500 text-sm">
          Search for a city to see weather
        </div>
      )}
    </div>
  )
}
