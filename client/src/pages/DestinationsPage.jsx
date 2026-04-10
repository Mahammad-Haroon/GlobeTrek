import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../services/api'
import DestinationCard from '../components/DestinationCard'
import WeatherWidget from '../components/WeatherWidget'
import toast from 'react-hot-toast'
import { RiSearchLine, RiFilterLine, RiGlobalLine, RiCloseLine } from 'react-icons/ri'

const continents = ['All', 'Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania']
const tags = ['All', 'beaches', 'temples', 'history', 'food', 'nature', 'adventure', 'luxury', 'culture']

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [continent, setContinent] = useState('All')
  const [tag, setTag] = useState('All')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    api.get('/destinations')
      .then(res => setDestinations(res.data.destinations))
      .catch(() => toast.error('Failed to load destinations'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = destinations.filter(d => {
    const q = search.toLowerCase()
    const matchSearch = !search || d.country.toLowerCase().includes(q) ||
      d.topPlaces.some(p => p.toLowerCase().includes(q)) ||
      d.tags.some(t => t.includes(q))
    const matchContinent = continent === 'All' || d.continent === continent
    const matchTag = tag === 'All' || d.tags.includes(tag)
    return matchSearch && matchContinent && matchTag
  })

  return (
    <div className="space-y-7">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
          <RiGlobalLine className="text-blue-500" size={30} /> Explore Destinations
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Discover amazing places around the world</p>
      </motion.div>

      {/* Search + filters */}
      <div className="card p-5 space-y-4">
        <div className="relative">
          <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            className="input pl-10"
            placeholder="Search countries, cities, or experiences…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1 text-xs text-slate-400 font-medium mr-1 self-center">
            <RiFilterLine size={12} /> Continent:
          </span>
          {continents.map(c => (
            <button
              key={c}
              onClick={() => setContinent(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
                ${continent === c ? 'bg-blue-600 text-white shadow-glow' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1 text-xs text-slate-400 font-medium mr-1 self-center">
            <RiFilterLine size={12} /> Tag:
          </span>
          {tags.map(t => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize
                ${tag === t ? 'bg-cyan-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-400">
        {filtered.length} destination{filtered.length !== 1 ? 's' : ''} found
      </p>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Cards grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-72 rounded-2xl animate-pulse bg-slate-200 dark:bg-slate-800" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-slate-500">No destinations match your search.</p>
              <button onClick={() => { setSearch(''); setContinent('All'); setTag('All') }}
                className="mt-4 text-blue-500 hover:underline text-sm">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filtered.map((dest, i) => (
                <DestinationCard key={dest.id} dest={dest} onClick={setSelected} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <WeatherWidget />
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img src={selected.image} alt={selected.country} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                >
                  <RiCloseLine size={18} />
                </button>
                <div className="absolute bottom-4 left-6">
                  <p className="text-white/70 text-sm">{selected.continent}</p>
                  <h2 className="font-display text-3xl font-bold text-white">{selected.country}</h2>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{selected.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <p className="text-xs text-slate-400 mb-1">Best Time</p>
                    <p className="font-medium text-slate-800 dark:text-white">📅 {selected.bestTime}</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <p className="text-xs text-slate-400 mb-1">Currency</p>
                    <p className="font-medium text-slate-800 dark:text-white">💰 {selected.currency}</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <p className="text-xs text-slate-400 mb-1">Language</p>
                    <p className="font-medium text-slate-800 dark:text-white">🗣️ {selected.language}</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <p className="text-xs text-slate-400 mb-1">Budget/day</p>
                    <p className="font-medium text-slate-800 dark:text-white">💵 From ${selected.avgBudget.budget}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-3">Top Places</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.topPlaces.map(p => (
                      <span key={p} className="badge badge-blue">{p}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.tags.map(t => (
                      <span key={t} className="badge badge-amber capitalize">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => { setSelected(null); window.location.href = `/plan?country=${selected.country}` }}
                    className="flex-1 btn-primary"
                  >
                    Plan Trip to {selected.country}
                  </button>
                  <button onClick={() => setSelected(null)} className="btn-secondary">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
