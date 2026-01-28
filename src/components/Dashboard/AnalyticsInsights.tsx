import { motion } from 'framer-motion'
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target } from 'lucide-react'

interface Insight {
  id: string
  type: 'success' | 'warning' | 'info'
  title: string
  description: string
  action?: string
  icon: React.ReactNode
}

const insights: Insight[] = [
  {
    id: '1',
    type: 'success',
    title: 'Peak Performance Quarter',
    description: 'Client satisfaction up 12% from last quarter. Premium tier conversions are 40% above target.',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    id: '2',
    type: 'info',
    title: 'Inventory Optimization',
    description: 'Smart forecasting suggests ordering 15% less produce next week based on historical waste patterns.',
    action: 'Review Recommendations',
    icon: <Lightbulb className="w-5 h-5" />,
  },
  {
    id: '3',
    type: 'warning',
    title: 'High-Value Pipeline Alert',
    description: '3 consulting deals totaling $45K have been in negotiation for 14+ days. Consider follow-up.',
    action: 'View Deals',
    icon: <AlertTriangle className="w-5 h-5" />,
  },
  {
    id: '4',
    type: 'success',
    title: 'Revenue Milestone',
    description: 'On track to exceed annual revenue goals by 25% at current growth rate.',
    icon: <Target className="w-5 h-5" />,
  },
]

export default function AnalyticsInsights() {
  const getColorClasses = (type: string) => {
    switch (type) {
      case 'success':
        return {
          border: 'border-success-500/30',
          bg: 'bg-success-600/10',
          icon: 'text-success-500',
        }
      case 'warning':
        return {
          border: 'border-warning-500/30',
          bg: 'bg-warning-600/10',
          icon: 'text-warning-500',
        }
      default:
        return {
          border: 'border-primary-400/30',
          bg: 'bg-primary-600/10',
          icon: 'text-primary-400',
        }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-panel p-6 rounded-xl border border-silver/10"
    >
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-6 h-6 text-secondary-400" />
        <h3 className="text-xl font-bold text-chrome">AI-Powered Insights</h3>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => {
          const colors = getColorClasses(insight.type)
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`p-4 rounded-lg border ${colors.border} ${colors.bg}`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 mt-1 ${colors.icon}`}>
                  {insight.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-chrome mb-1">{insight.title}</h4>
                  <p className="text-xs text-silver mb-2">{insight.description}</p>
                  {insight.action && (
                    <button className="text-xs text-primary-400 hover:text-primary-300 transition font-medium">
                      {insight.action} →
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
