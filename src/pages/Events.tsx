import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Plus, Edit2, Trash2, Users } from 'lucide-react'
import { eventApi } from '../services/api'
import { useRealtimeEvents } from '../hooks/useRealtime'
import { useNotificationStore } from '../store/notifications'

export default function Events() {
  const { events, loading } = useRealtimeEvents()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const addNotification = useNotificationStore((state) => state.addNotification)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    attendees: 500,
    status: 'planned' as const,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (editingId) {
        await eventApi.update({
          id: editingId,
          ...formData,
        })
        addNotification({
          type: 'success',
          title: 'Event Updated',
          message: formData.title,
        })
        setEditingId(null)
      } else {
        await eventApi.create({
          ...formData,
          client_id: '00000000-0000-0000-0000-000000000000',
        })
        addNotification({
          type: 'success',
          title: 'Event Created',
          message: formData.title,
        })
      }
      setFormData({
        title: '',
        description: '',
        date: '',
        attendees: 500,
        status: 'planned',
      })
      setShowForm(false)
    } catch (err) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: err instanceof Error ? err.message : 'Failed to save event',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await eventApi.delete(id)
      addNotification({
        type: 'success',
        title: 'Event Deleted',
        message: 'Event has been removed',
      })
    } catch (err) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: err instanceof Error ? err.message : 'Failed to delete event',
      })
    }
  }

  const handleEdit = (event: any) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      attendees: event.attendees,
      status: event.status,
    })
    setEditingId(event.id)
    setShowForm(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned':
        return 'bg-primary-600/20 text-primary-400'
      case 'in_progress':
        return 'bg-warning-600/20 text-warning-500'
      case 'completed':
        return 'bg-success-600/20 text-success-500'
      default:
        return 'bg-silver/10 text-silver'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-chrome mb-2">Events</h1>
          <p className="text-silver">Manage high-stakes events and catering operations</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 btn-primary"
        >
          <Plus className="w-5 h-5" />
          New Event
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="glass-panel p-6 rounded-xl border border-silver/10 space-y-4"
        >
          <input
            type="text"
            placeholder="Event Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-charcoal border border-silver/20 rounded-lg text-chrome focus:outline-none focus:border-primary-500"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 bg-charcoal border border-silver/20 rounded-lg text-chrome focus:outline-none focus:border-primary-500"
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="datetime-local"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="px-4 py-2 bg-charcoal border border-silver/20 rounded-lg text-chrome focus:outline-none focus:border-primary-500"
              required
            />
            <input
              type="number"
              placeholder="Attendees"
              min="1"
              value={formData.attendees}
              onChange={(e) => setFormData({ ...formData, attendees: parseInt(e.target.value) })}
              className="px-4 py-2 bg-charcoal border border-silver/20 rounded-lg text-chrome focus:outline-none focus:border-primary-500"
              required
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn-primary flex-1" disabled={submitting}>
              {submitting ? 'Saving...' : editingId ? 'Update Event' : 'Create Event'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
              }}
              className="btn-ghost flex-1"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      {/* Events List */}
      {loading ? (
        <div className="text-center py-12 text-silver">Loading events...</div>
      ) : events.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-panel p-12 rounded-xl border border-silver/10 text-center"
        >
          <Calendar className="w-12 h-12 text-silver/30 mx-auto mb-4" />
          <p className="text-silver">No events scheduled yet</p>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-6 rounded-lg border border-silver/10 hover:border-silver/20 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-chrome">{event.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  <p className="text-sm text-silver mb-3">{event.description}</p>
                  <div className="flex items-center gap-4 text-sm text-silver">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.attendees} attendees
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 hover:bg-silver/10 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4 text-silver" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 hover:bg-error/20 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4 text-error-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
