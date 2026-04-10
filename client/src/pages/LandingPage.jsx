// ============================================================
// Landing Page — public hero + features
// ============================================================
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RiMapPin2Line, RiArrowRightLine, RiShieldCheckLine, RiCalendar2Line, RiGlobalLine, RiCloudLine } from 'react-icons/ri'

const features = [
  { icon: RiGlobalLine, title: 'Explore Destinations', desc: 'Browse 100+ handpicked destinations with rich details, photos, and travel tips.', color: 'from-blue-500 to-blue-600' },
  { icon: RiCalendar2Line, title: 'Day-by-Day Planner', desc: 'Build a detailed itinerary with activities, timings, and notes for every day.', color: 'from-cyan-500 to-teal-500' },
  { icon: RiCloudLine, title: 'Live Weather', desc: 'Check real-time weather at your destination before and during your trip.', color: 'from-violet-500 to-purple-600' },
  { icon: RiShieldCheckLine, title: 'Budget Tracker', desc: 'Estimate costs for stay, food, transport and keep your spending in check.', color: 'from-amber-500 to-orange-500' },
]

const destinations = [
  { name: 'Japan', emoji: '🗾', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400' },
  { name: 'France', emoji: '🇫🇷', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
  { name: 'Maldives', emoji: '🏖️', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400' },
  { name: 'Greece', emoji: '🏛️', img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
            <RiMapPin2Line size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg">
            Globe<span className="text-gradient">Trek</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-slate-300 hover:text-white transition-colors font-medium px-4 py-2">
            Sign in
          </Link>
          <Link to="/register" className="btn-primary py-2 text-sm">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-hero-gradient" />
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px]" />
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              The smarter way to plan your travels
            </div>

            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-none mb-6">
              <span className="block">Your World,</span>
              <span className="text-gradient">Your Journey</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Plan, budget, and organize your dream trips with GlobeTrek.
              From weekend escapes to world tours — we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary text-base px-8 py-4 flex items-center gap-2 justify-center">
                Start Planning Free <RiArrowRightLine size={18} />
              </Link>
              <Link to="/login" className="btn-secondary border-white/20 text-white hover:bg-white/10 text-base px-8 py-4 text-center">
                Sign In
              </Link>
            </div>
          </motion.div>

          {/* Floating destination cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {destinations.map((d, i) => (
              <motion.div
                key={d.name}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4 + i * 0.5, ease: 'easeInOut', delay: i * 0.8 }}
                className="relative rounded-2xl overflow-hidden h-32 group"
              >
                <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-2 left-3 font-display font-bold text-white text-sm">{d.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 md:px-12 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Everything you need to <span className="text-gradient">travel smart</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              From dreaming to doing — GlobeTrek has all the tools to make travel planning effortless.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon size={22} className="text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { num: '12+', label: 'Countries' },
            { num: '50+', label: 'Top Destinations' },
            { num: '100%', label: 'Free to Use' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <p className="font-display text-5xl font-bold text-gradient mb-2">{stat.num}</p>
              <p className="text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center bg-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl font-bold mb-4">Ready for your next adventure?</h2>
          <p className="text-slate-400 mb-8">Join thousands of travelers who plan smarter with GlobeTrek.</p>
          <Link to="/register" className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2">
            Create Free Account <RiArrowRightLine size={18} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 text-center text-slate-500 text-sm">
        © 2024 GlobeTrek Planner. Built with ❤️ for explorers everywhere.
      </footer>
    </div>
  )
}
