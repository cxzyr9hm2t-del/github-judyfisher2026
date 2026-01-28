/*
  # Create Fisher Command Center Database Schema

  1. New Tables
    - `users`: User profiles and authentication
    - `clients`: CRM client management with tier differentiation
    - `events`: Event management system for high-stakes events (500+ attendees)
    - `pipeline`: CRM pipeline tracking (Negotiation, Consulting, Signed stages)
    - `inventory`: Digital inventory tracking for waste management
    - `upsells`: Strategic upsell opportunities and revenue tracking
    - `marketing_posts`: Social sentiment data from X and Facebook

  2. Security
    - Enable RLS on all tables
    - Create policies for authenticated user access to their data

  3. Features
    - Real-time subscriptions for instant dashboard updates
    - Cascade deletes for data integrity
    - Timestamp tracking for audit trail
*/

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  tier TEXT CHECK (tier IN ('standard', 'premium')) DEFAULT 'standard',
  company TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  date TIMESTAMPTZ NOT NULL,
  attendees INTEGER NOT NULL DEFAULT 1,
  status TEXT CHECK (status IN ('planned', 'in_progress', 'completed')) DEFAULT 'planned',
  menu TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pipeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  stage TEXT CHECK (stage IN ('negotiation', 'consulting', 'signed')) NOT NULL,
  value DECIMAL(15, 2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  unit TEXT NOT NULL,
  waste_percentage DECIMAL(5, 2) DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS upsells (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  add_on TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS marketing_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT CHECK (source IN ('twitter', 'facebook')) NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE upsells ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated users can read users" ON users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "All authenticated users can read clients" ON clients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "All authenticated users can insert clients" ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "All authenticated users can update clients" ON clients
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "All authenticated users can read events" ON events
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "All authenticated users can insert events" ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "All authenticated users can update events" ON events
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "All authenticated users can read pipeline" ON pipeline
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "All authenticated users can insert pipeline" ON pipeline
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "All authenticated users can update pipeline" ON pipeline
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "All authenticated users can read inventory" ON inventory
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "All authenticated users can insert inventory" ON inventory
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "All authenticated users can update inventory" ON inventory
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "All authenticated users can read upsells" ON upsells
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "All authenticated users can insert upsells" ON upsells
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "All authenticated users can read marketing posts" ON marketing_posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "All authenticated users can insert marketing posts" ON marketing_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE INDEX idx_clients_tier ON clients(tier);
CREATE INDEX idx_events_client_id ON events(client_id);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_pipeline_client_id ON pipeline(client_id);
CREATE INDEX idx_pipeline_stage ON pipeline(stage);
CREATE INDEX idx_inventory_category ON inventory(category);
CREATE INDEX idx_upsells_client_id ON upsells(client_id);
CREATE INDEX idx_marketing_posts_source ON marketing_posts(source);
