import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { tripService } from '../services/tripService'
import TripCard from '../components/TripCard'
import toast from 'react-hot-toast'
import { RiAddCircleLine, RiBookmarkLine, RiSearchLine } from 'react-icons/ri'

const STATUS_FILTERS = ['All', 'planning', 'confirmed', 'completed', 'cancelled']

export default function SavedTripsPage() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    tripService.getAll()
      .then(res => setTrips(res.data.trips))
      .catch(() => toast.error('Failed to load trips'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this trip?')) return
    try {
      await tripService.delete(id)
      setTrips(p => p.filter(t => t._id !== id))
      toast.success('Trip deleted')
    } catch {
      toast.error('Failed to delete')
    }
  }

  const filtered = trips.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.country.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || t.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-7">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <RiBookmarkLine className="text-blue-500" size={28} /> My Trips
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {trips.length} trip{trips.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        <Link to="/plan" className="btn-primary flex items-center gap-2">
          <RiAddCircleLine size={16} /> New Trip
        </Link>
      </motion.div>

      {/* Filters */}
      <div className="card p-4 space-y-3">
        <div className="relative">
          <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" className="input pl-10" placeholder="Search by name or country…"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all
                ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-64 rounded-2xl animate-pulse bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 card">
          <div className="text-5xl mb-4">🗺️</div>
          <h3 className="font-display text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">
            {trips.length === 0 ? 'No trips yet' : 'No matching trips'}
          </h3>
          <p className="text-slate-400 text-sm mb-6">
            {trips.length === 0 ? 'Start planning your first adventure!' : 'Try different filters.'}
          </p>
          {trips.length === 0 && (
            <Link to="/plan" className="btn-primary inline-flex items-center gap-2">
              <RiAddCircleLine size={16} /> Plan Your First Trip
            </Link>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((trip, i) => (
            <TripCard key={trip._id} trip={trip} onDelete={handleDelete} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
