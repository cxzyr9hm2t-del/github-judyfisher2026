import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNotificationStore } from '../store/notifications'

export function useRealtimeEvents() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const addNotification = useNotificationStore((state) => state.addNotification)

  useEffect(() => {
    loadEvents()

    const channel = supabase
      .channel('events-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setEvents((current) => [payload.new, ...current])
            addNotification({
              type: 'success',
              title: 'New Event Created',
              message: `${payload.new.title} - ${payload.new.attendees} attendees`,
            })
          } else if (payload.eventType === 'UPDATE') {
            setEvents((current) =>
              current.map((event) =>
                event.id === payload.new.id ? payload.new : event
              )
            )
            addNotification({
              type: 'info',
              title: 'Event Updated',
              message: `${payload.new.title} status changed to ${payload.new.status}`,
            })
          } else if (payload.eventType === 'DELETE') {
            setEvents((current) =>
              current.filter((event) => event.id !== payload.old.id)
            )
            addNotification({
              type: 'warning',
              title: 'Event Deleted',
              message: `${payload.old.title} has been removed`,
            })
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [addNotification])

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (err) {
      console.error('Error loading events:', err)
    } finally {
      setLoading(false)
    }
  }

  return { events, loading, refresh: loadEvents }
}

export function useRealtimeClients() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const addNotification = useNotificationStore((state) => state.addNotification)

  useEffect(() => {
    loadClients()

    const channel = supabase
      .channel('clients-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'clients',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setClients((current) => [payload.new, ...current])
            addNotification({
              type: 'success',
              title: 'New Client Added',
              message: `${payload.new.name} - ${payload.new.tier} tier`,
            })
          } else if (payload.eventType === 'UPDATE') {
            setClients((current) =>
              current.map((client) =>
                client.id === payload.new.id ? payload.new : client
              )
            )
            addNotification({
              type: 'info',
              title: 'Client Updated',
              message: `${payload.new.name} information updated`,
            })
          } else if (payload.eventType === 'DELETE') {
            setClients((current) =>
              current.filter((client) => client.id !== payload.old.id)
            )
            addNotification({
              type: 'warning',
              title: 'Client Removed',
              message: `${payload.old.name} has been removed`,
            })
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [addNotification])

  const loadClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setClients(data || [])
    } catch (err) {
      console.error('Error loading clients:', err)
    } finally {
      setLoading(false)
    }
  }

  return { clients, loading, refresh: loadClients }
}

export function useRealtimeInventory() {
  const [inventory, setInventory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const addNotification = useNotificationStore((state) => state.addNotification)

  useEffect(() => {
    loadInventory()

    const channel = supabase
      .channel('inventory-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'inventory',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setInventory((current) => [...current, payload.new])
          } else if (payload.eventType === 'UPDATE') {
            setInventory((current) =>
              current.map((item) =>
                item.id === payload.new.id ? payload.new : item
              )
            )
            if (payload.new.quantity < 10) {
              addNotification({
                type: 'warning',
                title: 'Low Inventory Alert',
                message: `${payload.new.name} is running low (${payload.new.quantity} ${payload.new.unit})`,
              })
            }
          } else if (payload.eventType === 'DELETE') {
            setInventory((current) =>
              current.filter((item) => item.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [addNotification])

  const loadInventory = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .order('category', { ascending: true })

      if (error) throw error
      setInventory(data || [])
    } catch (err) {
      console.error('Error loading inventory:', err)
    } finally {
      setLoading(false)
    }
  }

  return { inventory, loading, refresh: loadInventory }
}

export function useRealtimePipeline() {
  const [pipeline, setPipeline] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const addNotification = useNotificationStore((state) => state.addNotification)

  useEffect(() => {
    loadPipeline()

    const channel = supabase
      .channel('pipeline-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pipeline',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setPipeline((current) => [...current, payload.new])
            addNotification({
              type: 'info',
              title: 'New Deal Added',
              message: `${payload.new.title || 'Deal'} worth $${payload.new.value?.toLocaleString() || '0'}`,
            })
          } else if (payload.eventType === 'UPDATE') {
            setPipeline((current) =>
              current.map((item) =>
                item.id === payload.new.id ? payload.new : item
              )
            )
            if (payload.new.stage === 'signed') {
              addNotification({
                type: 'success',
                title: 'Deal Closed!',
                message: `Contract signed for $${payload.new.value?.toLocaleString() || '0'}`,
              })
            } else {
              addNotification({
                type: 'info',
                title: 'Deal Updated',
                message: `${payload.new.title || 'Deal'} moved to ${payload.new.stage}`,
              })
            }
          } else if (payload.eventType === 'DELETE') {
            setPipeline((current) =>
              current.filter((item) => item.id !== payload.old.id)
            )
            addNotification({
              type: 'warning',
              title: 'Deal Removed',
              message: `${payload.old.title || 'Deal'} has been removed`,
            })
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [addNotification])

  const loadPipeline = async () => {
    try {
      const { data, error } = await supabase.from('pipeline').select('*')

      if (error) throw error
      setPipeline(data || [])
    } catch (err) {
      console.error('Error loading pipeline:', err)
    } finally {
      setLoading(false)
    }
  }

  return { pipeline, loading, refresh: loadPipeline }
}
