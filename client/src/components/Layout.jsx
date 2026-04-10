// ============================================================
// Layout — sidebar + navbar wrapper for protected pages
// ============================================================
import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import {
  RiDashboardLine, RiAddCircleLine, RiGlobalLine,
  RiBookmarkLine, RiMapPin2Line, RiCompassLine
} from 'react-icons/ri'

const sideLinks = [
  { to: '/dashboard', icon: RiDashboardLine, label: 'Dashboard' },
  { to: '/plan', icon: RiAddCircleLine, label: 'Plan New Trip' },
  { to: '/destinations', icon: RiGlobalLine, label: 'Explore' },
  { to: '/trips', icon: RiBookmarkLine, label: 'Saved Trips' },
]

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar onMenuToggle={() => setMobileOpen(p => !p)} menuOpen={mobileOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pt-6 pb-8 px-3">
          <div className="mb-6 px-3">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Navigation</p>
          </div>
          <nav className="flex flex-col gap-1 flex-1">
            {sideLinks.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Bottom decoration */}
          <div className="mt-auto px-3">
            <div className="rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-4 text-white">
              <RiCompassLine size={24} className="mb-2 opacity-80" />
              <p className="text-sm font-semibold">Ready to explore?</p>
              <p className="text-xs opacity-75 mt-1">12 new destinations added this week.</p>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-30 bg-black/40 lg:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 z-40 w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 pt-20 pb-8 px-3 lg:hidden"
              >
                <nav className="flex flex-col gap-1">
                  {sideLinks.map(({ to, icon: Icon, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                        ${isActive ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`
                      }
                    >
                      <Icon size={18} />
                      {label}
                    </NavLink>
                  ))}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
