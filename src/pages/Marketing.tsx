import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Heart, Share2, TrendingUp, Gauge } from 'lucide-react'
import SearchFilter from '../components/SearchFilter'

interface MarketingPost {
  id: string
  source: 'twitter' | 'facebook'
  content: string
  author: string
  likes: number
  shares: number
  created_at: string
}

const mockPosts: MarketingPost[] = [
  {
    id: '1',
    source: 'twitter',
    content: 'Excited to showcase our premium catering services at the Tech Summit 2024!',
    author: 'Fisher Events',
    likes: 245,
    shares: 42,
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: '2',
    source: 'facebook',
    content: 'Our team delivered an amazing experience for the corporate gala last night. Check out the highlights!',
    author: 'Fisher Catering',
    likes: 312,
    shares: 58,
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: '3',
    source: 'twitter',
    content: 'New sustainable packaging initiative reduces waste by 40%. Proud to lead the way in eco-friendly events.',
    author: 'Fisher Events',
    likes: 189,
    shares: 61,
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: '4',
    source: 'facebook',
    content: 'Thank you to all our wonderful clients who trusted us with their events this quarter!',
    author: 'Fisher Catering',
    likes: 423,
    shares: 87,
    created_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
  {
    id: '5',
    source: 'twitter',
    content: 'Introducing AI-powered planning tools for seamless event coordination. The future is here!',
    author: 'Fisher Events',
    likes: 567,
    shares: 124,
    created_at: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
]

export default function Marketing() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const getSourceIcon = (source: string) => {
    return source === 'twitter' ? '𝕏' : 'f'
  }

  const getSourceColor = (source: string) => {
    return source === 'twitter' ? 'from-slate to-gunmetal' : 'from-primary-600 to-primary-700'
  }

  const filteredPosts = useMemo(() => {
    let filtered = mockPosts

    if (selectedFilter !== 'all') {
      filtered = filtered.filter((post) => post.source === selectedFilter)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }, [searchQuery, selectedFilter])

  const totalEngagement = filteredPosts.reduce((sum, post) => sum + post.likes + post.shares, 0)
  const avgEngagement = filteredPosts.length > 0 ? Math.round(totalEngagement / filteredPosts.length) : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-chrome mb-2">Marketing</h1>
        <p className="text-silver">Social sentiment and campaign performance</p>
      </div>

      {/* Attendance Gauge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-xl border border-silver/10 bg-gradient-to-r from-success-600/20 to-secondary-600/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-silver mb-1">Campaign Attribution</p>
            <h2 className="text-3xl font-bold text-chrome">40% Attendance Increase</h2>
            <p className="text-sm text-silver mt-1">from recent social campaigns</p>
          </div>
          <div className="relative w-32 h-32">
            <Gauge className="w-32 h-32 text-success-500/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-success-500">40%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Engagement Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="glass-panel p-6 rounded-lg border border-silver/10">
          <p className="text-sm text-silver mb-1">Total Posts</p>
          <p className="text-2xl font-bold text-chrome">{filteredPosts.length}</p>
          <p className="text-xs text-primary-400">Active campaigns</p>
        </div>
        <div className="glass-panel p-6 rounded-lg border border-silver/10">
          <p className="text-sm text-silver mb-1">Total Engagement</p>
          <p className="text-2xl font-bold text-chrome">{totalEngagement.toLocaleString()}</p>
          <p className="text-xs text-secondary-400">Likes + shares</p>
        </div>
        <div className="glass-panel p-6 rounded-lg border border-silver/10">
          <p className="text-sm text-silver mb-1">Avg Per Post</p>
          <p className="text-2xl font-bold text-chrome">{avgEngagement}</p>
          <p className="text-xs text-warning-500">Interactions</p>
        </div>
      </motion.div>

      {/* Social Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-chrome">Social Media Feed</h3>
        </div>

        <SearchFilter
          placeholder="Search posts by content or author..."
          filters={[
            { label: 'Twitter', value: 'twitter' },
            { label: 'Facebook', value: 'facebook' },
          ]}
          onSearch={setSearchQuery}
          onFilterChange={setSelectedFilter}
        />

        {filteredPosts.length === 0 ? (
          <div className="glass-panel p-12 rounded-xl border border-silver/10 text-center mt-4">
            <TrendingUp className="w-12 h-12 text-silver/30 mx-auto mb-4" />
            <p className="text-silver">No posts match your search</p>
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`glass-panel p-6 rounded-lg border border-silver/10 bg-gradient-to-r ${getSourceColor(post.source)}/10 hover:border-silver/20 transition`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${getSourceColor(post.source)} flex items-center justify-center`}
                    >
                      <span className="text-white font-bold text-lg">{getSourceIcon(post.source)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-chrome">{post.author}</p>
                      <p className="text-xs text-silver capitalize">{post.source}</p>
                    </div>
                  </div>
                  <span className="text-xs text-silver">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm text-chrome mb-4">{post.content}</p>

                <div className="flex items-center gap-6 text-xs text-silver">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="w-4 h-4" />
                    <span>{post.shares} shares</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
