import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'

interface SearchFilterProps {
  placeholder?: string
  filters?: { label: string; value: string }[]
  onSearch: (query: string) => void
  onFilterChange?: (filter: string) => void
}

export default function SearchFilter({
  placeholder = 'Search...',
  filters = [],
  onSearch,
  onFilterChange,
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
    if (onFilterChange) {
      onFilterChange(filter)
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    onSearch('')
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-silver/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2 bg-charcoal border border-silver/20 rounded-lg text-chrome focus:outline-none focus:border-primary-500 transition"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-silver/50 hover:text-silver transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {filters.length > 0 && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              showFilters
                ? 'bg-primary-600/20 text-primary-400 border border-primary-400/30'
                : 'bg-charcoal border border-silver/20 text-silver hover:border-silver/30'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        )}
      </div>

      <AnimatePresence>
        {showFilters && filters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-panel p-4 rounded-lg border border-silver/10">
              <p className="text-xs text-silver mb-3 font-medium">Filter by:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`px-3 py-1 rounded-lg text-sm transition ${
                    selectedFilter === 'all'
                      ? 'bg-primary-600 text-white'
                      : 'bg-charcoal border border-silver/20 text-silver hover:border-silver/30'
                  }`}
                >
                  All
                </button>
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => handleFilterChange(filter.value)}
                    className={`px-3 py-1 rounded-lg text-sm transition ${
                      selectedFilter === filter.value
                        ? 'bg-primary-600 text-white'
                        : 'bg-charcoal border border-silver/20 text-silver hover:border-silver/30'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
