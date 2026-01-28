import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface KPICardProps {
  label: string
  value: string | number
  trend?: number
  unit?: string
  icon?: React.ReactNode
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
}

const colorMap = {
  primary: 'from-primary-600/20 to-primary-600/5',
  secondary: 'from-secondary-600/20 to-secondary-600/5',
  success: 'from-success-600/20 to-success-600/5',
  warning: 'from-warning-600/20 to-warning-600/5',
  error: 'from-error-600/20 to-error-600/5',
}

export default function KPICard({
  label,
  value,
  trend,
  unit,
  icon,
  color = 'primary',
}: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`kpi-card bg-gradient-to-br ${colorMap[color]} overflow-hidden relative group hover:border-silver/20 transition`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-chrome/5 opacity-0 group-hover:opacity-100 transition" />

      <div className="relative z-10 flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-silver mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-chrome">{value}</h3>
            {unit && <span className="text-sm text-silver">{unit}</span>}
          </div>
        </div>
        {icon && <div className="text-silver/50">{icon}</div>}
      </div>

      {trend !== undefined && (
        <div className="flex items-center gap-1">
          {trend > 0 ? (
            <>
              <TrendingUp className="w-4 h-4 text-success-500" />
              <span className="text-sm text-success-500 font-medium">+{trend}%</span>
            </>
          ) : trend < 0 ? (
            <>
              <TrendingDown className="w-4 h-4 text-error-500" />
              <span className="text-sm text-error-500 font-medium">{trend}%</span>
            </>
          ) : null}
        </div>
      )}
    </motion.div>
  )
}
