import { motion } from 'framer-motion'
import { Activity, UserPlus, Package, DollarSign, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface ActivityItem {
  id: string
  type: 'client' | 'event' | 'inventory' | 'deal'
  title: string
  description: string
  timestamp: Date
  icon: React.ReactNode
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'deal',
    title: 'Deal Signed',
    description: 'Premium contract worth $28,500 finalized',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    icon: <DollarSign className="w-4 h-4" />,
  },
  {
    id: '2',
    type: 'event',
    title: 'Event Scheduled',
    description: 'Corporate gala for 500 attendees added',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    id: '3',
    type: 'client',
    title: 'New Premium Client',
    description: 'Tech Solutions Inc joined as premium tier',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    icon: <UserPlus className="w-4 h-4" />,
  },
  {
    id: '4',
    type: 'inventory',
    title: 'Inventory Alert',
    description: 'Low stock warning for premium ingredients',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    icon: <Package className="w-4 h-4" />,
  },
  {
    id: '5',
    type: 'event',
    title: 'Event Completed',
    description: 'Wedding reception for 250 guests finished',
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    icon: <Calendar className="w-4 h-4" />,
  },
]

export default function ActivityFeed() {
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'deal':
        return 'bg-success-600/20 text-success-500'
      case 'event':
        return 'bg-primary-600/20 text-primary-400'
      case 'client':
        return 'bg-secondary-600/20 text-secondary-400'
      case 'inventory':
        return 'bg-warning-600/20 text-warning-500'
      default:
        return 'bg-silver/10 text-silver'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-panel p-6 rounded-xl border border-silver/10"
    >
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-6 h-6 text-primary-400" />
        <h3 className="text-xl font-bold text-chrome">Recent Activity</h3>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-silver/5 transition"
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-lg ${getActivityColor(
                activity.type
              )} flex items-center justify-center`}
            >
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-chrome">{activity.title}</h4>
              <p className="text-xs text-silver">{activity.description}</p>
              <p className="text-xs text-silver/70 mt-1">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
