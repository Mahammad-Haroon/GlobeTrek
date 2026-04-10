// ============================================================
// BudgetCalculator — interactive budget estimator
// ============================================================
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'

export default function BudgetCalculator({ value, onChange, numberOfPeople = 1, nights = 1 }) {
  const [budget, setBudget] = useState({
    stayPerNight: value?.stayPerNight || 80,
    foodPerDay: value?.foodPerDay || 40,
    travelCost: value?.travelCost || 300,
    miscellaneous: value?.miscellaneous || 50,
    currency: value?.currency || 'USD',
    totalEstimated: 0,
  })

  useEffect(() => {
    const total = (
      (budget.stayPerNight * nights) +
      (budget.foodPerDay * Math.max(nights, 1)) +
      Number(budget.travelCost) +
      (budget.miscellaneous * Math.max(nights, 1))
    ) * numberOfPeople

    const updated = { ...budget, totalEstimated: Math.round(total) }
    setBudget(updated)
    onChange && onChange(updated)
  }, [budget.stayPerNight, budget.foodPerDay, budget.travelCost, budget.miscellaneous, numberOfPeople, nights])

  const handleChange = (field, val) => {
    setBudget(p => ({ ...p, [field]: Number(val) || 0 }))
  }

  const fields = [
    { key: 'stayPerNight', label: 'Stay per night (per person)', icon: '🏨', max: 1000 },
    { key: 'foodPerDay', label: 'Food per day (per person)', icon: '🍽️', max: 500 },
    { key: 'travelCost', label: 'Transport (total)', icon: '✈️', max: 5000 },
    { key: 'miscellaneous', label: 'Misc per day (per person)', icon: '🎭', max: 300 },
  ]

  const breakdown = [
    { label: 'Accommodation', value: budget.stayPerNight * nights * numberOfPeople },
    { label: 'Food', value: budget.foodPerDay * Math.max(nights, 1) * numberOfPeople },
    { label: 'Transport', value: budget.travelCost * numberOfPeople },
    { label: 'Miscellaneous', value: budget.miscellaneous * Math.max(nights, 1) * numberOfPeople },
  ]

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <RiMoneyDollarCircleLine className="text-green-500" size={20} />
        <h3 className="font-semibold text-slate-800 dark:text-white">Budget Calculator</h3>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ key, label, icon, max }) => (
          <div key={key}>
            <div className="flex items-center justify-between mb-1">
              <label className="label mb-0">
                {icon} {label}
              </label>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                ${budget[key]}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={max}
              step={key === 'travelCost' ? 50 : 5}
              value={budget[key]}
              onChange={e => handleChange(key, e.target.value)}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-700 accent-blue-500"
            />
          </div>
        ))}
      </div>

      {/* Currency select */}
      <div>
        <label className="label">Currency</label>
        <select
          className="input"
          value={budget.currency}
          onChange={e => setBudget(p => ({ ...p, currency: e.target.value }))}
        >
          {['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'INR', 'CAD', 'SGD'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Total display */}
      <motion.div
        key={budget.totalEstimated}
        initial={{ scale: 0.97 }}
        animate={{ scale: 1 }}
        className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-5 text-white"
      >
        <p className="text-sm opacity-80 mb-1">Total Estimated Cost</p>
        <p className="font-display text-4xl font-bold">
          ${budget.totalEstimated.toLocaleString()}
          <span className="text-xl font-normal opacity-80 ml-1">{budget.currency}</span>
        </p>
        <p className="text-xs opacity-70 mt-1">
          For {numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'} × {nights} nights
        </p>

        {/* Breakdown bar */}
        <div className="mt-4">
          <div className="flex rounded-full overflow-hidden h-2 mb-2">
            {breakdown.map((item, i) => {
              const pct = budget.totalEstimated > 0 ? (item.value / budget.totalEstimated) * 100 : 25
              const colors = ['bg-blue-300', 'bg-cyan-300', 'bg-teal-300', 'bg-sky-300']
              return <div key={i} style={{ width: `${pct}%` }} className={`${colors[i]} transition-all`} />
            })}
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {breakdown.map((item, i) => {
              const colors = ['text-blue-200', 'text-cyan-200', 'text-teal-200', 'text-sky-200']
              return (
                <div key={i} className="flex items-center justify-between">
                  <span className={`text-xs ${colors[i]}`}>{item.label}</span>
                  <span className="text-xs font-medium">${item.value.toLocaleString()}</span>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
