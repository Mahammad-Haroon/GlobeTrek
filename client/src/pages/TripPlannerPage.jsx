import { useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { tripService } from '../services/tripService'
import BudgetCalculator from '../components/BudgetCalculator'
import TransportSelector from '../components/TransportSelector'
import toast from 'react-hot-toast'
import { RiSaveLine, RiArrowLeftLine, RiAddLine, RiCloseLine } from 'react-icons/ri'

const COUNTRIES = [
  'Japan', 'France', 'Italy', 'Thailand', 'USA', 'India', 'Australia',
  'Brazil', 'Greece', 'Morocco', 'Maldives', 'Peru', 'Spain', 'UK',
  'Germany', 'Canada', 'New Zealand', 'South Africa', 'Egypt', 'UAE',
]

const STEPS = ['Basic Info', 'Budget', 'Transport', 'Review']

export default function TripPlannerPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const isEdit = Boolean(id)

  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [cityInput, setCityInput] = useState('')

  const [form, setForm] = useState({
    title: '',
    country: searchParams.get('country') || '',
    cities: [],
    startDate: '',
    endDate: '',
    numberOfPeople: 1,
    status: 'planning',
    notes: '',
    budget: { stayPerNight: 80, foodPerDay: 40, travelCost: 300, miscellaneous: 50, currency: 'USD', totalEstimated: 0 },
    transport: { mode: 'flight', notes: '', estimatedCost: 0 },
    coverImage: '',
  })

  // Load existing trip if editing
  useEffect(() => {
    if (isEdit) {
      tripService.getOne(id).then(res => {
        const t = res.data.trip
        setForm({
          title: t.title, country: t.country, cities: t.cities || [],
          startDate: t.startDate || '', endDate: t.endDate || '',
          numberOfPeople: t.numberOfPeople || 1, status: t.status || 'planning',
          notes: t.notes || '', budget: t.budget || form.budget,
          transport: t.transport || form.transport, coverImage: t.coverImage || '',
        })
      }).catch(() => toast.error('Failed to load trip'))
    }
  }, [id])

  const nights = form.startDate && form.endDate
    ? Math.max(1, Math.round((new Date(form.endDate) - new Date(form.startDate)) / 86400000))
    : 1

  const set = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }))
  const setNum = (field) => (e) => setForm(p => ({ ...p, [field]: Number(e.target.value) }))

  const addCity = () => {
    const c = cityInput.trim()
    if (c && !form.cities.includes(c)) {
      setForm(p => ({ ...p, cities: [...p.cities, c] }))
    }
    setCityInput('')
  }

  const removeCity = (city) => setForm(p => ({ ...p, cities: p.cities.filter(c => c !== city) }))

  const handleSave = async () => {
    if (!form.title || !form.country) {
      toast.error('Title and country are required')
      setStep(0)
      return
    }
    setSaving(true)
    try {
      if (isEdit) {
        await tripService.update(id, form)
        toast.success('Trip updated!')
      } else {
        const res = await tripService.create(form)
        toast.success('Trip created!')
        navigate(`/trips/${res.data.trip._id}`)
        return
      }
      navigate(`/trips/${id}`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const stepValid = () => {
    if (step === 0) return form.title.trim() && form.country
    return true
  }

  return (
    <div className="max-w-3xl mx-auto space-y-7">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <RiArrowLeftLine size={20} className="text-slate-500" />
        </button>
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            {isEdit ? 'Edit Trip' : 'Plan New Trip ✈️'}
          </h1>
          <p className="text-sm text-slate-400">Fill in the details to build your perfect itinerary</p>
        </div>
      </motion.div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <button key={s} onClick={() => i < step + 1 && setStep(i)}
            className="flex items-center gap-2 group">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
              ${i === step ? 'bg-blue-600 text-white shadow-glow'
                : i < step ? 'bg-green-500 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`text-sm hidden sm:block transition-colors
              ${i === step ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-slate-400'}`}>
              {s}
            </span>
            {i < STEPS.length - 1 && <div className={`w-8 h-0.5 mx-1 ${i < step ? 'bg-green-400' : 'bg-slate-200 dark:bg-slate-700'}`} />}
          </button>
        ))}
      </div>

      {/* Step panels */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className="card p-6"
      >
        {/* Step 0 — Basic Info */}
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="font-display text-lg font-semibold text-slate-800 dark:text-white">📍 Trip Details</h2>

            <div>
              <label className="label">Trip Title *</label>
              <input type="text" className="input" placeholder="e.g. Japan Cherry Blossom Tour"
                value={form.title} onChange={set('title')} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Country *</label>
                <select className="input" value={form.country} onChange={set('country')}>
                  <option value="">Select country</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Status</label>
                <select className="input" value={form.status} onChange={set('status')}>
                  <option value="planning">Planning</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Cities */}
            <div>
              <label className="label">Cities to Visit</label>
              <div className="flex gap-2">
                <input type="text" className="input flex-1" placeholder="Add a city and press +"
                  value={cityInput} onChange={e => setCityInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCity())} />
                <button onClick={addCity} type="button" className="btn-primary px-4">
                  <RiAddLine size={18} />
                </button>
              </div>
              {form.cities.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.cities.map(city => (
                    <span key={city} className="badge badge-blue flex items-center gap-1">
                      {city}
                      <button onClick={() => removeCity(city)} className="ml-1 hover:text-red-500 transition-colors">
                        <RiCloseLine size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="label">Start Date</label>
                <input type="date" className="input" value={form.startDate} onChange={set('startDate')} />
              </div>
              <div>
                <label className="label">End Date</label>
                <input type="date" className="input" value={form.endDate} onChange={set('endDate')}
                  min={form.startDate} />
              </div>
              <div>
                <label className="label">Number of People</label>
                <input type="number" className="input" min={1} max={50}
                  value={form.numberOfPeople} onChange={setNum('numberOfPeople')} />
              </div>
            </div>

            <div>
              <label className="label">Cover Image URL (optional)</label>
              <input type="url" className="input" placeholder="https://…"
                value={form.coverImage} onChange={set('coverImage')} />
              {form.coverImage && (
                <img src={form.coverImage} alt="cover preview"
                  className="mt-2 h-24 rounded-xl object-cover w-full" />
              )}
            </div>

            <div>
              <label className="label">Notes</label>
              <textarea rows={3} className="input resize-none" placeholder="Any special requirements, visa info, etc."
                value={form.notes} onChange={set('notes')} />
            </div>
          </div>
        )}

        {/* Step 1 — Budget */}
        {step === 1 && (
          <BudgetCalculator
            value={form.budget}
            onChange={b => setForm(p => ({ ...p, budget: b }))}
            numberOfPeople={form.numberOfPeople}
            nights={nights}
          />
        )}

        {/* Step 2 — Transport */}
        {step === 2 && (
          <TransportSelector
            value={form.transport}
            onChange={t => setForm(p => ({ ...p, transport: t }))}
          />
        )}

        {/* Step 3 — Review */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="font-display text-lg font-semibold text-slate-800 dark:text-white">🔍 Review & Save</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                ['Trip Title', form.title],
                ['Country', form.country],
                ['Cities', form.cities.join(', ') || 'Not specified'],
                ['Dates', form.startDate ? `${form.startDate} → ${form.endDate}` : 'Not set'],
                ['People', String(form.numberOfPeople)],
                ['Duration', `${nights} nights`],
                ['Transport', form.transport?.mode],
                ['Est. Budget', `$${form.budget?.totalEstimated?.toLocaleString()} ${form.budget?.currency}`],
              ].map(([label, val]) => (
                <div key={label} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                  <p className="font-medium text-slate-800 dark:text-white capitalize">{val}</p>
                </div>
              ))}
            </div>
            {form.notes && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm">
                <p className="text-xs text-slate-400 mb-1">Notes</p>
                <p className="text-slate-700 dark:text-slate-200">{form.notes}</p>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Navigation buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={() => step > 0 ? setStep(p => p - 1) : navigate(-1)}
          className="btn-secondary flex items-center gap-2"
        >
          <RiArrowLeftLine size={16} /> {step === 0 ? 'Cancel' : 'Back'}
        </button>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep(p => p + 1)}
            disabled={!stepValid()}
            className="btn-primary flex items-center gap-2"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary flex items-center gap-2"
          >
            <RiSaveLine size={16} />
            {saving ? 'Saving…' : isEdit ? 'Update Trip' : 'Save Trip'}
          </button>
        )}
      </div>
    </div>
  )
}
