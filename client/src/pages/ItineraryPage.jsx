import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { tripService } from '../services/tripService'
import toast from 'react-hot-toast'
import {
  RiArrowLeftLine, RiAddLine, RiDeleteBinLine, RiSaveLine,
  RiCalendarLine, RiTimeLine
} from 'react-icons/ri'

const ACTIVITY_TYPES = ['sightseeing', 'food', 'transport', 'accommodation', 'activity', 'other']
const TYPE_ICONS = { sightseeing: '🏛️', food: '🍜', transport: '🚗', accommodation: '🏨', activity: '🎯', other: '📌' }
const TYPE_COLORS = {
  sightseeing: 'badge-blue', food: 'badge-amber', transport: 'badge-green',
  accommodation: 'badge-red', activity: 'badge-blue', other: 'badge-green'
}

const emptyActivity = () => ({ time: '09:00', title: '', description: '', type: 'sightseeing' })

export default function ItineraryPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [trip, setTrip] = useState(null)
  const [itinerary, setItinerary] = useState([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeDay, setActiveDay] = useState(0)

  useEffect(() => {
    tripService.getOne(id)
      .then(res => {
        const t = res.data.trip
        setTrip(t)
        if (t.itinerary && t.itinerary.length > 0) {
          setItinerary(t.itinerary.map(d => ({ ...d, activities: d.activities || [] })))
        } else {
          // Auto-generate days based on trip duration
          const nights = t.startDate && t.endDate
            ? Math.max(1, Math.round((new Date(t.endDate) - new Date(t.startDate)) / 86400000))
            : 3
          const days = Array.from({ length: nights }, (_, i) => ({
            day: i + 1,
            date: t.startDate ? new Date(new Date(t.startDate).getTime() + i * 86400000).toISOString().slice(0, 10) : '',
            activities: [],
          }))
          setItinerary(days)
        }
      })
      .catch(() => { toast.error('Trip not found'); navigate('/trips') })
      .finally(() => setLoading(false))
  }, [id])

  const addDay = () => {
    const n = itinerary.length + 1
    setItinerary(p => [...p, { day: n, date: '', activities: [] }])
    setActiveDay(n - 1)
  }

  const removeDay = (idx) => {
    if (itinerary.length <= 1) return toast.error('Need at least 1 day')
    setItinerary(p => {
      const updated = p.filter((_, i) => i !== idx).map((d, i) => ({ ...d, day: i + 1 }))
      return updated
    })
    setActiveDay(p => Math.min(p, itinerary.length - 2))
  }

  const addActivity = (dayIdx) => {
    setItinerary(p => p.map((d, i) =>
      i === dayIdx ? { ...d, activities: [...d.activities, emptyActivity()] } : d
    ))
  }

  const updateActivity = (dayIdx, actIdx, field, value) => {
    setItinerary(p => p.map((d, i) =>
      i === dayIdx ? {
        ...d,
        activities: d.activities.map((a, j) => j === actIdx ? { ...a, [field]: value } : a)
      } : d
    ))
  }

  const removeActivity = (dayIdx, actIdx) => {
    setItinerary(p => p.map((d, i) =>
      i === dayIdx ? { ...d, activities: d.activities.filter((_, j) => j !== actIdx) } : d
    ))
  }

  const updateDayDate = (dayIdx, date) => {
    setItinerary(p => p.map((d, i) => i === dayIdx ? { ...d, date } : d))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await tripService.update(id, { itinerary })
      toast.success('Itinerary saved!')
    } catch {
      toast.error('Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-10 h-10 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
    </div>
  )

  const currentDay = itinerary[activeDay]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(`/trips/${id}`)}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <RiArrowLeftLine size={20} className="text-slate-500" />
          </button>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              📋 Itinerary Builder
            </h1>
            <p className="text-sm text-slate-400">{trip?.title} — {itinerary.length} day{itinerary.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={addDay} className="btn-secondary flex items-center gap-2 text-sm">
            <RiAddLine size={16} /> Add Day
          </button>
          <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">
            <RiSaveLine size={16} /> {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </motion.div>

      {/* Day tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {itinerary.map((d, i) => (
          <button
            key={i}
            onClick={() => setActiveDay(i)}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
              ${activeDay === i
                ? 'bg-blue-600 text-white shadow-glow'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-700'}`}
          >
            Day {d.day}
            {d.activities.length > 0 && (
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${activeDay === i ? 'bg-white/20' : 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'}`}>
                {d.activities.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Day editor */}
      <AnimatePresence mode="wait">
        {currentDay && (
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="card p-6 space-y-5"
          >
            {/* Day header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold font-display text-lg">
                  {currentDay.day}
                </div>
                <div>
                  <h2 className="font-semibold text-slate-800 dark:text-white">Day {currentDay.day}</h2>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <RiCalendarLine size={11} />
                    <input
                      type="date"
                      value={currentDay.date || ''}
                      onChange={e => updateDayDate(activeDay, e.target.value)}
                      className="bg-transparent text-slate-400 focus:outline-none focus:text-blue-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeDay(activeDay)}
                className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <RiDeleteBinLine size={13} /> Remove Day
              </button>
            </div>

            {/* Activities */}
            <div className="space-y-3">
              <AnimatePresence>
                {currentDay.activities.map((act, actIdx) => (
                  <motion.div
                    key={actIdx}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{TYPE_ICONS[act.type]}</span>
                        <span className={`${TYPE_COLORS[act.type]} capitalize`}>{act.type}</span>
                      </div>
                      <button
                        onClick={() => removeActivity(activeDay, actIdx)}
                        className="text-slate-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <RiDeleteBinLine size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="label text-xs">Activity Title *</label>
                        <input type="text" className="input py-2 text-sm"
                          placeholder="e.g. Visit Senso-ji Temple"
                          value={act.title}
                          onChange={e => updateActivity(activeDay, actIdx, 'title', e.target.value)} />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="label text-xs flex items-center gap-1"><RiTimeLine size={10} /> Time</label>
                          <input type="time" className="input py-2 text-sm"
                            value={act.time}
                            onChange={e => updateActivity(activeDay, actIdx, 'time', e.target.value)} />
                        </div>
                        <div className="flex-1">
                          <label className="label text-xs">Type</label>
                          <select className="input py-2 text-sm capitalize"
                            value={act.type}
                            onChange={e => updateActivity(activeDay, actIdx, 'type', e.target.value)}>
                            {ACTIVITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="label text-xs">Description (optional)</label>
                      <input type="text" className="input py-2 text-sm"
                        placeholder="Additional notes…"
                        value={act.description}
                        onChange={e => updateActivity(activeDay, actIdx, 'description', e.target.value)} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Add activity */}
            <button
              onClick={() => addActivity(activeDay)}
              className="w-full py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600
                text-slate-400 dark:text-slate-500 hover:border-blue-400 hover:text-blue-500
                dark:hover:border-blue-600 dark:hover:text-blue-400 transition-all flex items-center justify-center gap-2 text-sm font-medium"
            >
              <RiAddLine size={16} /> Add Activity
            </button>

            {currentDay.activities.length === 0 && (
              <p className="text-center text-slate-400 text-sm py-2">
                No activities yet. Click the button above to add your first activity for Day {currentDay.day}.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full itinerary preview */}
      {itinerary.some(d => d.activities.length > 0) && (
        <div className="card p-6">
          <h3 className="font-display font-bold text-slate-800 dark:text-white mb-5 text-lg">Full Itinerary Preview</h3>
          <div className="space-y-6">
            {itinerary.filter(d => d.activities.length > 0).map(day => (
              <div key={day.day}>
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                    {day.day}
                  </span>
                  Day {day.day} {day.date && <span className="text-slate-400 text-sm font-normal">— {day.date}</span>}
                </h4>
                <div className="pl-9 space-y-2">
                  {day.activities.map((act, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-slate-400 dark:text-slate-500 w-14 shrink-0 pt-0.5">{act.time}</span>
                      <span className="text-base">{TYPE_ICONS[act.type]}</span>
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-200">{act.title}</p>
                        {act.description && <p className="text-slate-400 text-xs mt-0.5">{act.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
