import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          tier: 'standard' | 'premium'
          company: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          email: string
          phone?: string | null
          tier?: 'standard' | 'premium'
          company?: string | null
          notes?: string | null
        }
        Update: {
          name?: string
          email?: string
          phone?: string | null
          tier?: 'standard' | 'premium'
          company?: string | null
          notes?: string | null
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          client_id: string
          date: string
          attendees: number
          status: 'planned' | 'in_progress' | 'completed'
          menu: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          description?: string | null
          client_id: string
          date: string
          attendees: number
          status?: 'planned' | 'in_progress' | 'completed'
          menu?: string | null
        }
        Update: {
          title?: string
          description?: string | null
          date?: string
          attendees?: number
          status?: 'planned' | 'in_progress' | 'completed'
          menu?: string | null
          updated_at?: string
        }
      }
      pipeline: {
        Row: {
          id: string
          client_id: string
          stage: 'negotiation' | 'consulting' | 'signed'
          value: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          client_id: string
          stage: 'negotiation' | 'consulting' | 'signed'
          value: number
          notes?: string | null
        }
        Update: {
          stage?: 'negotiation' | 'consulting' | 'signed'
          value?: number
          notes?: string | null
          updated_at?: string
        }
      }
      inventory: {
        Row: {
          id: string
          name: string
          category: string
          quantity: number
          unit: string
          waste_percentage: number
          last_updated: string
          created_at: string
        }
        Insert: {
          name: string
          category: string
          quantity: number
          unit: string
          waste_percentage?: number
        }
        Update: {
          quantity?: number
          waste_percentage?: number
          last_updated?: string
        }
      }
      upsells: {
        Row: {
          id: string
          client_id: string
          add_on: string
          price: number
          created_at: string
        }
        Insert: {
          client_id: string
          add_on: string
          price: number
        }
      }
      marketing_posts: {
        Row: {
          id: string
          source: 'twitter' | 'facebook'
          content: string
          author: string
          likes: number
          shares: number
          created_at: string
        }
        Insert: {
          source: 'twitter' | 'facebook'
          content: string
          author: string
          likes?: number
          shares?: number
        }
      }
    }
  }
}
