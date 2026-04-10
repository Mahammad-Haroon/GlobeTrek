import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { RiMapPin2Line, RiEyeLine, RiEyeOffLine, RiMailLine, RiLockLine, RiUserLine } from 'react-icons/ri'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match')
      return
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      toast.success('Account created! Welcome to GlobeTrek 🌍')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const set = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }))

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Left — decorative */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-16 right-16 max-w-xs text-right">
          <blockquote className="font-display text-2xl italic text-white/90 mb-3">
            "To travel is to live."
          </blockquote>
          <cite className="text-slate-400 text-sm">— Hans Christian Andersen</cite>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <RiMapPin2Line size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">
              Globe<span className="text-gradient">Trek</span>
            </span>
          </Link>

          <h1 className="font-display text-3xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-slate-400 mb-8">Start planning your dream trips for free.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label text-slate-300">Full Name</label>
              <div className="relative">
                <RiUserLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" className="input pl-10 bg-slate-800/60 border-slate-700 text-white placeholder-slate-500"
                  placeholder="Jane Doe" value={form.name} onChange={set('name')} required />
              </div>
            </div>

            <div>
              <label className="label text-slate-300">Email</label>
              <div className="relative">
                <RiMailLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="email" className="input pl-10 bg-slate-800/60 border-slate-700 text-white placeholder-slate-500"
                  placeholder="you@example.com" value={form.email} onChange={set('email')} required />
              </div>
            </div>

            <div>
              <label className="label text-slate-300">Password</label>
              <div className="relative">
                <RiLockLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type={showPw ? 'text' : 'password'} className="input pl-10 pr-12 bg-slate-800/60 border-slate-700 text-white placeholder-slate-500"
                  placeholder="Min 6 characters" value={form.password} onChange={set('password')} required />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200">
                  {showPw ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="label text-slate-300">Confirm Password</label>
              <div className="relative">
                <RiLockLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="password" className="input pl-10 bg-slate-800/60 border-slate-700 text-white placeholder-slate-500"
                  placeholder="Repeat password" value={form.confirm} onChange={set('confirm')} required />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base">
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-slate-400 mt-6 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
