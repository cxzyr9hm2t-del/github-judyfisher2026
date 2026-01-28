import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 45000, target: 40000 },
  { month: 'Feb', revenue: 52000, target: 45000 },
  { month: 'Mar', revenue: 48000, target: 45000 },
  { month: 'Apr', revenue: 61000, target: 50000 },
  { month: 'May', revenue: 72000, target: 55000 },
  { month: 'Jun', revenue: 85000, target: 60000 },
]

export default function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-panel p-6 rounded-xl border border-silver/10"
    >
      <h3 className="text-xl font-bold text-chrome mb-6">Revenue Performance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(192, 192, 192, 0.1)" />
          <XAxis
            dataKey="month"
            stroke="rgba(192, 192, 192, 0.5)"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="rgba(192, 192, 192, 0.5)"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${value / 1000}K`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(26, 28, 28, 0.95)',
              border: '1px solid rgba(192, 192, 192, 0.2)',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#E8E8E8' }}
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
            iconType="rect"
          />
          <Bar
            dataKey="revenue"
            fill="#4B82FF"
            name="Actual Revenue"
            radius={[8, 8, 0, 0]}
          />
          <Bar
            dataKey="target"
            fill="rgba(192, 192, 192, 0.3)"
            name="Target"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
