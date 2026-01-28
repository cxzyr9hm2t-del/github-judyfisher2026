import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, TrendingUp, Award, Leaf } from 'lucide-react'
import KPICard from '../components/KPICard'
import AnalyticsInsights from '../components/Dashboard/AnalyticsInsights'
import ActivityFeed from '../components/Dashboard/ActivityFeed'
import RevenueChart from '../components/Dashboard/RevenueChart'
import { useRealtimeEvents } from '../hooks/useRealtime'
import { useRealtimeClients } from '../hooks/useRealtime'
import { useRealtimeInventory } from '../hooks/useRealtime'
import { useRealtimePipeline } from '../hooks/useRealtime'

export default function Dashboard() {
  const [countdown, setCountdown] = useState<string>('')
  const { events } = useRealtimeEvents()
  const { clients } = useRealtimeClients()
  const { inventory } = useRealtimeInventory()
  const { pipeline } = useRealtimePipeline()

  const stats = useMemo(() => {
    const premiumClients = clients.filter((c: any) => c.tier === 'premium').length
    const pipelineValue = pipeline.reduce((sum: number, p: any) => sum + (p.value || 0), 0)

    return {
      activeEvents: events.length,
      premiumClients: premiumClients,
      inventoryItems: inventory.length,
      pipelineValue: Math.round(pipelineValue / 1000),
    }
  }, [events, clients, inventory, pipeline])

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date()
      const nextMeeting = new Date()
      nextMeeting.setHours(14, 0, 0, 0)

      if (now > nextMeeting) {
        nextMeeting.setDate(nextMeeting.getDate() + 1)
      }

      const diff = nextMeeting.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setCountdown(`${hours}h ${minutes}m ${seconds}s`)
    }

    calculateCountdown()
    const interval = setInterval(calculateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-4xl font-bold text-chrome mb-2">The Pulse</h1>
        <p className="text-silver">Real-time operational metrics and executive oversight</p>
      </motion.div>

      {/* Countdown Timer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 border border-silver/10 rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-silver mb-2">Senior Staff & Revenue Review</p>
            <h2 className="text-2xl font-bold text-chrome">Next Meeting</h2>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-primary-400" />
            <div className="text-right">
              <p className="text-sm text-silver">Countdown</p>
              <p className="text-2xl font-mono font-bold text-primary-400">{countdown}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Client Satisfaction"
          value="98%"
          trend={0}
          icon={<Award className="w-6 h-6" />}
          color="primary"
        />
        <KPICard
          label="Annual Waste Savings"
          value="$15,000"
          trend={12}
          icon={<Leaf className="w-6 h-6" />}
          color="success"
        />
        <KPICard
          label="Revenue Growth"
          value="+25%"
          trend={8}
          icon={<TrendingUp className="w-6 h-6" />}
          color="secondary"
        />
        <KPICard
          label="Planning Efficiency"
          value="+15%"
          trend={5}
          icon={<Users className="w-6 h-6" />}
          color="warning"
        />
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6 rounded-xl border border-silver/10"
      >
        <h3 className="text-lg font-bold text-chrome mb-4">Performance Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            key={`events-${stats.activeEvents}`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="p-4 bg-primary-600/10 rounded-lg border border-primary-400/20"
          >
            <p className="text-xs text-silver mb-1">Active Events</p>
            <p className="text-2xl font-bold text-primary-400">{stats.activeEvents}</p>
          </motion.div>
          <motion.div
            key={`clients-${stats.premiumClients}`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="p-4 bg-secondary-600/10 rounded-lg border border-secondary-400/20"
          >
            <p className="text-xs text-silver mb-1">Premium Clients</p>
            <p className="text-2xl font-bold text-secondary-400">{stats.premiumClients}</p>
          </motion.div>
          <motion.div
            key={`inventory-${stats.inventoryItems}`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="p-4 bg-success-600/10 rounded-lg border border-success-400/20"
          >
            <p className="text-xs text-silver mb-1">Inventory Items</p>
            <p className="text-2xl font-bold text-success-500">{stats.inventoryItems}</p>
          </motion.div>
          <motion.div
            key={`pipeline-${stats.pipelineValue}`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="p-4 bg-warning-600/10 rounded-lg border border-warning-400/20"
          >
            <p className="text-xs text-silver mb-1">Pipeline Value</p>
            <p className="text-2xl font-bold text-warning-500">${stats.pipelineValue}K</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Advanced Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsInsights />
        <ActivityFeed />
      </div>

      {/* Time Saved Badge Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-panel p-6 rounded-xl border border-silver/10 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block"
        >
          <p className="text-sm text-silver mb-2">Planning Time Reduction</p>
          <div className="bg-gradient-to-r from-success-600 to-primary-600 px-6 py-3 rounded-lg inline-block">
            <p className="text-2xl font-bold text-white">15% Time Saved</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
