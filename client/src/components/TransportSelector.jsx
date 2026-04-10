import { motion } from 'framer-motion'

const modes = [
  { id: 'flight', icon: '✈️', label: 'Flight', time: 'Fastest', costMultiplier: 1.5 },
  { id: 'train', icon: '🚆', label: 'Train', time: 'Comfortable', costMultiplier: 0.8 },
  { id: 'bus', icon: '🚌', label: 'Bus', time: 'Budget', costMultiplier: 0.4 },
  { id: 'car', icon: '🚗', label: 'Car', time: 'Flexible', costMultiplier: 1.0 },
  { id: 'mixed', icon: '🔀', label: 'Mixed', time: 'Custom', costMultiplier: 1.0 },
]

export default function TransportSelector({ value, onChange }) {
  const selected = value?.mode || 'flight'

  const handleSelect = (mode) => {
    onChange && onChange({ ...value, mode })
  }

  const handleNotesChange = (e) => {
    onChange && onChange({ ...value, notes: e.target.value })
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-slate-800 dark:text-white">🚀 Transport Mode</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {modes.map((m) => (
          <motion.button
            key={m.id}
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(m.id)}
            className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer
              ${selected === m.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'}`}
          >
            <div className="text-2xl mb-1">{m.icon}</div>
            <p className="text-xs font-semibold text-slate-800 dark:text-white">{m.label}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{m.time}</p>
          </motion.button>
        ))}
      </div>

      <div>
        <label className="label">Transport Notes (optional)</label>
        <input
          type="text"
          className="input"
          value={value?.notes || ''}
          onChange={handleNotesChange}
          placeholder="e.g. Direct flight from Mumbai to Tokyo"
        />
      </div>
    </div>
  )
}
