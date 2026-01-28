import { motion } from 'framer-motion'
import { Package, TrendingDown, AlertCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useRealtimeInventory } from '../hooks/useRealtime'

interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  waste_percentage: number
}

const wasteData = [
  { month: 'Jan', waste: 12, iso_target: 8 },
  { month: 'Feb', waste: 10, iso_target: 8 },
  { month: 'Mar', waste: 9, iso_target: 8 },
  { month: 'Apr', waste: 7, iso_target: 8 },
  { month: 'May', waste: 6, iso_target: 8 },
  { month: 'Jun', waste: 5, iso_target: 8 },
]

export default function Inventory() {
  const { inventory, loading } = useRealtimeInventory()

  const categoryGroups = inventory.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, InventoryItem[]>,
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-chrome mb-2">Inventory</h1>
        <p className="text-silver">Digital tracking and sustainability management</p>
      </div>

      {/* Waste Reduction Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-xl border border-silver/10"
      >
        <h3 className="text-lg font-bold text-chrome mb-4">Food Waste Reduction (ISO 20121)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={wasteData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(192, 192, 192, 0.1)" />
            <XAxis stroke="rgba(192, 192, 192, 0.5)" />
            <YAxis stroke="rgba(192, 192, 192, 0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 28, 28, 0.95)',
                border: '1px solid rgba(192, 192, 192, 0.2)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#E8E8E8' }}
            />
            <Line
              type="monotone"
              dataKey="waste"
              stroke="#4B82FF"
              name="Actual Waste %"
              strokeWidth={2}
              dot={{ fill: '#4B82FF', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="iso_target"
              stroke="rgba(192, 192, 192, 0.5)"
              name="ISO Target"
              strokeDasharray="5 5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Efficiency Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="glass-panel p-6 rounded-lg border border-silver/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-silver">Average Waste</p>
            <TrendingDown className="w-5 h-5 text-success-500" />
          </div>
          <p className="text-2xl font-bold text-chrome">6.8%</p>
          <p className="text-xs text-success-500">Below ISO target</p>
        </div>
        <div className="glass-panel p-6 rounded-lg border border-silver/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-silver">Efficiency Gain</p>
            <TrendingDown className="w-5 h-5 text-primary-400" />
          </div>
          <p className="text-2xl font-bold text-chrome">47%</p>
          <p className="text-xs text-primary-400">Waste reduction YoY</p>
        </div>
        <div className="glass-panel p-6 rounded-lg border border-silver/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-silver">Total Items</p>
            <Package className="w-5 h-5 text-secondary-400" />
          </div>
          <p className="text-2xl font-bold text-chrome">{inventory.length}</p>
          <p className="text-xs text-secondary-400">Active inventory</p>
        </div>
      </motion.div>

      {/* Inventory List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-bold text-chrome mb-4">Inventory Items</h3>
        {loading ? (
          <div className="text-center py-12 text-silver">Loading inventory...</div>
        ) : Object.keys(categoryGroups).length === 0 ? (
          <div className="glass-panel p-12 rounded-xl border border-silver/10 text-center">
            <Package className="w-12 h-12 text-silver/30 mx-auto mb-4" />
            <p className="text-silver">No inventory items yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(categoryGroups).map(([category, items]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel p-6 rounded-lg border border-silver/10"
              >
                <h4 className="font-bold text-chrome mb-4 capitalize">{category}</h4>
                <div className="space-y-2">
                  {(items as InventoryItem[]).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-charcoal rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-chrome">{item.name}</p>
                        <p className="text-xs text-silver">
                          {item.quantity} {item.unit}
                        </p>
                      </div>
                      {item.waste_percentage > 0 && (
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-warning-500" />
                          <span className="text-xs text-warning-500">{item.waste_percentage}% waste</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
