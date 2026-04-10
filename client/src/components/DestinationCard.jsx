import { motion } from 'framer-motion'
import { RiStarFill, RiMapPin2Line, RiCalendarLine } from 'react-icons/ri'

export default function DestinationCard({ dest, onClick, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="card overflow-hidden cursor-pointer group"
      onClick={() => onClick && onClick(dest)}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={dest.image}
          alt={dest.country}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 text-white text-xs">
          <RiStarFill size={11} className="text-amber-400" />
          <span className="font-medium">{dest.rating}</span>
        </div>

        {/* Country */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-xs text-white/70 mb-0.5">{dest.continent}</p>
          <h3 className="font-display font-bold text-white text-xl">{dest.country}</h3>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {dest.description}
        </p>

        {/* Best time */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <RiCalendarLine size={12} className="text-green-500" />
          Best: {dest.bestTime}
        </div>

        {/* Top places */}
        <div className="flex flex-wrap gap-1.5">
          {dest.topPlaces.slice(0, 3).map(p => (
            <span key={p} className="flex items-center gap-1 text-xs px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
              <RiMapPin2Line size={10} /> {p}
            </span>
          ))}
          {dest.topPlaces.length > 3 && (
            <span className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full">
              +{dest.topPlaces.length - 3}
            </span>
          )}
        </div>

        {/* Budget range */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
          <span className="text-slate-400">From</span>
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            ~${dest.avgBudget.budget}/day
          </span>
        </div>
      </div>
    </motion.div>
  )
}
