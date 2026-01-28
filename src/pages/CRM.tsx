import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Users, Plus } from 'lucide-react'
import SearchFilter from '../components/SearchFilter'
import { useRealtimeClients, useRealtimePipeline } from '../hooks/useRealtime'

export default function CRM() {
  const { clients, loading: clientsLoading } = useRealtimeClients()
  const { pipeline, loading: pipelineLoading } = useRealtimePipeline()
  const [clientSearch, setClientSearch] = useState('')
  const [pipelineSearch, setPipelineSearch] = useState('')
  const [stageFilter, setStageFilter] = useState('all')
  const loading = clientsLoading || pipelineLoading

  const filteredClients = useMemo(() => {
    return clients.filter((client: any) =>
      client.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      client.company?.toLowerCase().includes(clientSearch.toLowerCase()) ||
      client.email?.toLowerCase().includes(clientSearch.toLowerCase())
    )
  }, [clients, clientSearch])

  const filteredPipeline = useMemo(() => {
    return pipeline.filter((item: any) => {
      const matchesStage = stageFilter === 'all' || item.stage === stageFilter
      const matchesSearch =
        !pipelineSearch ||
        item.title?.toLowerCase().includes(pipelineSearch.toLowerCase())
      return matchesStage && matchesSearch
    })
  }, [pipeline, pipelineSearch, stageFilter])

  const upsellCalculator = useMemo(() => {
    const totalPipeline = filteredPipeline.reduce((sum: number, item: any) => sum + (item.value || 0), 0)
    return Math.round(totalPipeline * 0.3)
  }, [filteredPipeline])

  const stageColors = {
    negotiation: 'bg-primary-600/20 text-primary-400',
    consulting: 'bg-warning-600/20 text-warning-500',
    signed: 'bg-success-600/20 text-success-500',
  }

  const getPipelineByStage = (stage: string) => {
    return filteredPipeline.filter((item: any) => item.stage === stage)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-chrome mb-2">CRM</h1>
          <p className="text-silver">Strategic client management and sales pipeline</p>
        </div>
        <button className="flex items-center gap-2 btn-primary">
          <Plus className="w-5 h-5" />
          New Client
        </button>
      </div>

      {/* Upsell Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-xl border border-silver/10 bg-gradient-to-r from-secondary-600/20 to-primary-600/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-silver mb-1">Strategic Upsell Projection</p>
            <h2 className="text-3xl font-bold text-chrome">+30% Revenue</h2>
            <p className="text-sm text-silver mt-1">from premium add-ons</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-silver mb-1">Potential Value</p>
            <p className="text-3xl font-bold text-secondary-400">${upsellCalculator.toLocaleString()}</p>
          </div>
        </div>
      </motion.div>

      {/* Pipeline Kanban */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-chrome">Sales Pipeline</h3>
        </div>

        <SearchFilter
          placeholder="Search deals..."
          filters={[
            { label: 'All Stages', value: 'all' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Consulting', value: 'consulting' },
            { label: 'Signed', value: 'signed' },
          ]}
          onSearch={setPipelineSearch}
          onFilterChange={setStageFilter}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {['negotiation', 'consulting', 'signed'].map((stage) => (
            <div key={stage} className="glass-panel p-4 rounded-lg border border-silver/10 min-h-96">
              <h4 className={`font-bold mb-4 capitalize px-3 py-2 rounded-lg inline-block ${stageColors[stage as keyof typeof stageColors]}`}>
                {stage === 'negotiation'
                  ? 'Contract Negotiation'
                  : stage === 'consulting'
                    ? 'Budgetary Consulting'
                    : 'Signed'}
              </h4>
              <div className="space-y-3">
                {getPipelineByStage(stage).map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 bg-charcoal rounded-lg border border-silver/10 hover:border-silver/20 transition cursor-move"
                  >
                    <p className="text-sm text-chrome font-medium">Value: ${item.value.toLocaleString()}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Clients List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-chrome">Clients</h3>
        </div>

        <SearchFilter
          placeholder="Search by name, company, or email..."
          onSearch={setClientSearch}
        />

        {loading ? (
          <div className="text-center py-12 text-silver">Loading clients...</div>
        ) : filteredClients.length === 0 ? (
          <div className="glass-panel p-12 rounded-xl border border-silver/10 text-center mt-4">
            <Users className="w-12 h-12 text-silver/30 mx-auto mb-4" />
            <p className="text-silver">
              {clients.length === 0 ? 'No clients yet' : 'No clients match your search'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {filteredClients.map((client: any) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-4 rounded-lg border border-silver/10 hover:border-silver/20 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-chrome">{client.name}</h4>
                    <p className="text-xs text-silver">{client.company}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      client.tier === 'premium'
                        ? 'bg-secondary-600/20 text-secondary-400'
                        : 'bg-primary-600/20 text-primary-400'
                    }`}
                  >
                    {client.tier}
                  </span>
                </div>
                <p className="text-xs text-silver mb-2">{client.email}</p>
                {client.phone && <p className="text-xs text-silver">{client.phone}</p>}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
