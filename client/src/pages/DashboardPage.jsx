import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { tripService } from '../services/tripService'
import TripCard from '../components/TripCard'
import WeatherWidget from '../components/WeatherWidget'
import toast from 'react-hot-toast'
import {
  RiAddCircleLine, RiMapPin2Line, RiBookmarkLine,
  RiGlobalLine, RiArrowRightLine
} from 'react-icons/ri'

const greeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    tripService.getAll()
      .then(res => setTrips(res.data.trips))
      .catch(() => toast.error('Failed to load trips'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this trip?')) return
    try {
      await tripService.delete(id)
      setTrips(p => p.filter(t => t._id !== id))
      toast.success('Trip deleted')
    } catch {
      toast.error('Failed to delete')
    }
  }

  const stats = [
    { icon: RiBookmarkLine, label: 'Total Trips', value: trips.length, color: 'text-blue-500' },
    { icon: RiMapPin2Line, label: 'Countries Planned', value: new Set(trips.map(t => t.country)).size, color: 'text-green-500' },
    { icon: RiGlobalLine, label: 'Upcoming', value: trips.filter(t => t.status === 'planning').length, color: 'text-amber-500' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-8 text-white shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-32 w-40 h-40 bg-cyan-400/10 rounded-full translate-y-1/2" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-blue-200 text-sm font-medium mb-1">{greeting()},</p>
            <h1 className="font-display text-3xl font-bold mb-2">{user?.name} ✈️</h1>
            <p className="text-blue-100 text-sm">Where are you heading next?</p>
          </div>
          <Link to="/plan" className="flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg shrink-0">
            <RiAddCircleLine size={18} />
            Plan New Trip
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ icon: Icon, label, value, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card p-5 text-center"
          >
            <Icon size={24} className={`${color} mx-auto mb-2`} />
            <p className="font-display text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* Trips section — 2/3 width */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">Recent Trips</h2>
            <Link to="/trips" className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1 font-medium">
              View all <RiArrowRightLine size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2].map(i => (
                <div key={i} className="card h-64 animate-pulse bg-slate-200 dark:bg-slate-800" />
              ))}
            </div>
          ) : trips.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card p-12 text-center"
            >
              <div className="text-5xl mb-4">🗺️</div>
              <h3 className="font-display text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">
                No trips yet
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Start planning your first adventure with GlobeTrek.
              </p>
              <Link to="/plan" className="btn-primary inline-flex items-center gap-2">
                <RiAddCircleLine size={16} /> Create Your First Trip
              </Link>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {trips.slice(0, 4).map((trip, i) => (
                <TripCard key={trip._id} trip={trip} onDelete={handleDelete} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar — 1/3 width */}
        <div className="space-y-5">
          <WeatherWidget />

          {/* Quick links */}
          <div className="card p-5">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { to: '/plan', icon: '✈️', label: 'Plan New Trip', desc: 'Start from scratch' },
                { to: '/destinations', icon: '🌍', label: 'Explore Destinations', desc: 'Get inspired' },
                { to: '/trips', icon: '📋', label: 'My Saved Trips', desc: 'View all trips' },
              ].map(({ to, icon, label, desc }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                >
                  <span className="text-xl w-8 text-center">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{label}</p>
                    <p className="text-xs text-slate-400">{desc}</p>
                  </div>
                  <RiArrowRightLine size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
