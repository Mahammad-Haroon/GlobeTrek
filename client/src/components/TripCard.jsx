import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { RiCalendarLine, RiGroupLine, RiMapPin2Line, RiArrowRightLine, RiDeleteBinLine } from 'react-icons/ri'

const statusColors = {
  planning: 'badge-blue',
  confirmed: 'badge-green',
  completed: 'badge-amber',
  cancelled: 'badge-red',
}

export default function TripCard({ trip, onDelete, index = 0 }) {
  const nights = trip.startDate && trip.endDate
    ? Math.max(1, Math.round((new Date(trip.endDate) - new Date(trip.startDate)) / 86400000))
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="card group overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Cover image */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-blue-800 to-cyan-600">
        {trip.coverImage ? (
          <img src={trip.coverImage} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-7xl opacity-40">✈️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <h3 className="font-display font-bold text-white text-lg leading-tight">{trip.title}</h3>
          <span className={`${statusColors[trip.status] || 'badge-blue'} shrink-0`}>
            {trip.status}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400 mb-4">
          <span className="flex items-center gap-1.5">
            <RiMapPin2Line size={14} className="text-blue-500" />
            {trip.country}
          </span>
          {nights && (
            <span className="flex items-center gap-1.5">
              <RiCalendarLine size={14} className="text-green-500" />
              {nights} nights
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <RiGroupLine size={14} className="text-amber-500" />
            {trip.numberOfPeople} {trip.numberOfPeople === 1 ? 'person' : 'people'}
          </span>
        </div>

        {trip.budget?.totalEstimated > 0 && (
          <div className="mb-4 px-3 py-2 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <p className="text-xs text-slate-400 dark:text-slate-500">Est. Budget</p>
            <p className="font-semibold text-slate-800 dark:text-white">
              ${trip.budget.totalEstimated.toLocaleString()} {trip.budget.currency}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Link
            to={`/trips/${trip._id}`}
            className="flex-1 btn-primary py-2.5 text-sm text-center flex items-center justify-center gap-2"
          >
            View Trip <RiArrowRightLine size={14} />
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(trip._id)}
              className="p-2.5 rounded-xl border border-red-200 dark:border-red-900/40 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <RiDeleteBinLine size={16} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
