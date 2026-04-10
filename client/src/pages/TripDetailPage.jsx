import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { tripService } from '../services/tripService'
import WeatherWidget from '../components/WeatherWidget'
import toast from 'react-hot-toast'
import {
  RiArrowLeftLine, RiEditLine, RiDeleteBinLine, RiCalendarLine,
  RiGroupLine, RiMapPin2Line, RiCarLine, RiMoneyDollarCircleLine, RiListCheck2
} from 'react-icons/ri'

const statusColors = { planning: 'badge-blue', confirmed: 'badge-green', completed: 'badge-amber', cancelled: 'badge-red' }
const transportIcons = { flight: '✈️', train: '🚆', bus: '🚌', car: '🚗', mixed: '🔀' }

export default function TripDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    tripService.getOne(id)
      .then(res => setTrip(res.data.trip))
      .catch(() => { toast.error('Trip not found'); navigate('/trips') })
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!confirm('Delete this trip permanently?')) return
    try {
      await tripService.delete(id)
      toast.success('Trip deleted')
      navigate('/trips')
    } catch {
      toast.error('Failed to delete')
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-10 h-10 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
    </div>
  )

  if (!trip) return null

  const nights = trip.startDate && trip.endDate
    ? Math.max(1, Math.round((new Date(trip.endDate) - new Date(trip.startDate)) / 86400000))
    : null

  const budget = trip.budget || {}
  const transport = trip.transport || {}

  return (
    <div className="space-y-7">
      {/* Hero cover */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="relative rounded-3xl overflow-hidden h-64 md:h-80 bg-gradient-to-br from-blue-800 to-cyan-700">
        {trip.coverImage && (
          <img src={trip.coverImage} alt={trip.title}
            className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2">
          <button onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors">
            <RiArrowLeftLine size={18} />
          </button>
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <Link to={`/plan/${id}`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/30 backdrop-blur-sm text-white text-sm hover:bg-black/50 transition-colors">
            <RiEditLine size={14} /> Edit
          </Link>
          <button onClick={handleDelete}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/80 backdrop-blur-sm text-white text-sm hover:bg-red-600/80 transition-colors">
            <RiDeleteBinLine size={14} /> Delete
          </button>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-3 mb-2">
            <span className={`${statusColors[trip.status] || 'badge-blue'} capitalize`}>{trip.status}</span>
            {trip.country && <span className="text-white/70 text-sm flex items-center gap-1"><RiMapPin2Line size={12} />{trip.country}</span>}
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white">{trip.title}</h1>
        </div>
      </motion.div>

      {/* Info grid */}
      <div className="grid lg:grid-cols-3 gap-7">
        <div className="lg:col-span-2 space-y-5">

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: RiCalendarLine, label: 'Duration', value: nights ? `${nights} nights` : 'TBD', color: 'text-blue-500' },
              { icon: RiGroupLine, label: 'Travelers', value: `${trip.numberOfPeople} ${trip.numberOfPeople === 1 ? 'person' : 'people'}`, color: 'text-green-500' },
              { icon: RiCarLine, label: 'Transport', value: transportIcons[transport.mode] + ' ' + (transport.mode || 'TBD'), color: 'text-amber-500' },
              { icon: RiMoneyDollarCircleLine, label: 'Budget', value: budget.totalEstimated ? `$${budget.totalEstimated.toLocaleString()}` : 'TBD', color: 'text-purple-500' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="card p-4 text-center">
                <Icon size={20} className={`${color} mx-auto mb-1.5`} />
                <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{value}</p>
              </div>
            ))}
          </div>

          {/* Dates */}
          {(trip.startDate || trip.endDate) && (
            <div className="card p-5">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                <RiCalendarLine className="text-blue-500" /> Travel Dates
              </h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex-1 text-center">
                  <p className="text-xs text-slate-400 mb-1">Departure</p>
                  <p className="font-semibold text-slate-800 dark:text-white">{trip.startDate || '—'}</p>
                </div>
                <div className="text-slate-300 dark:text-slate-600 text-xl">→</div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex-1 text-center">
                  <p className="text-xs text-slate-400 mb-1">Return</p>
                  <p className="font-semibold text-slate-800 dark:text-white">{trip.endDate || '—'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Cities */}
          {trip.cities?.length > 0 && (
            <div className="card p-5">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                <RiMapPin2Line className="text-green-500" /> Cities
              </h3>
              <div className="flex flex-wrap gap-2">
                {trip.cities.map(c => (
                  <span key={c} className="badge badge-green">{c}</span>
                ))}
              </div>
            </div>
          )}

          {/* Budget breakdown */}
          {budget.totalEstimated > 0 && (
            <div className="card p-5">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <RiMoneyDollarCircleLine className="text-purple-500" /> Budget Breakdown
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  ['🏨 Stay', (budget.stayPerNight || 0) * (nights || 1) * (trip.numberOfPeople || 1)],
                  ['🍽️ Food', (budget.foodPerDay || 0) * (nights || 1) * (trip.numberOfPeople || 1)],
                  ['✈️ Travel', (budget.travelCost || 0) * (trip.numberOfPeople || 1)],
                  ['🎭 Misc', (budget.miscellaneous || 0) * (nights || 1) * (trip.numberOfPeople || 1)],
                ].map(([label, val]) => (
                  <div key={label} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                    <p className="text-xs text-slate-400 mb-1">{label}</p>
                    <p className="font-semibold text-slate-700 dark:text-slate-200">${val.toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl text-white">
                <span className="font-medium">Total Estimated</span>
                <span className="font-display text-2xl font-bold">${budget.totalEstimated.toLocaleString()} {budget.currency}</span>
              </div>
            </div>
          )}

          {/* Notes */}
          {trip.notes && (
            <div className="card p-5">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-3">📝 Notes</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{trip.notes}</p>
            </div>
          )}

          {/* Itinerary button */}
          <Link to={`/trips/${id}/itinerary`}
            className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base">
            <RiListCheck2 size={18} /> View / Edit Itinerary
          </Link>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <WeatherWidget defaultCity={trip.cities?.[0] || trip.country} />

          {transport.mode && (
            <div className="card p-5">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-3">🚀 Transport</h3>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{transportIcons[transport.mode]}</span>
                <div>
                  <p className="font-medium text-slate-800 dark:text-white capitalize">{transport.mode}</p>
                  {transport.notes && <p className="text-xs text-slate-400 mt-0.5">{transport.notes}</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
