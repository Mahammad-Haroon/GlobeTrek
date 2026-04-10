import { motion } from 'framer-motion'

export default function LoadingSpinner({ full = false, size = 'md' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }

  const spinner = (
    <div className={`${sizes[size]} relative`}>
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-blue-500/20"
        style={{ borderTopColor: '#3b82f6' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )

  if (full) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          {spinner}
          <p className="text-slate-500 dark:text-slate-400 font-body text-sm tracking-wide">Loading GlobeTrek…</p>
        </motion.div>
      </div>
    )
  }

  return spinner
}
