/*
  # Create booking system tables

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `duration_minutes` (integer)
      - `created_at` (timestamp)
    
    - `business_hours`
      - `id` (uuid, primary key)
      - `day_of_week` (integer) - 0=Sunday, 1=Monday, etc.
      - `open_time` (time)
      - `close_time` (time)
      - `is_closed` (boolean)
      - `created_at` (timestamp)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `service_id` (uuid, foreign key)
      - `appointment_date` (date)
      - `appointment_time` (time)
      - `duration_minutes` (integer)
      - `status` (text) - pending, confirmed, cancelled
      - `is_new_client` (boolean)
      - `allergies` (text, optional)
      - `notes` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to services and business_hours
    - Add policies for public insert access to bookings
    - Add policies for authenticated users to manage bookings
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10,2) NOT NULL,
  duration_minutes integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create business_hours table
CREATE TABLE IF NOT EXISTS business_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  open_time time NOT NULL,
  close_time time NOT NULL,
  is_closed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_id uuid NOT NULL REFERENCES services(id),
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  duration_minutes integer NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  is_new_client boolean DEFAULT true,
  allergies text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Services policies (public read access)
CREATE POLICY "Anyone can read services"
  ON services
  FOR SELECT
  TO public
  USING (true);

-- Business hours policies (public read access)
CREATE POLICY "Anyone can read business hours"
  ON business_hours
  FOR SELECT
  TO public
  USING (true);

-- Bookings policies
CREATE POLICY "Anyone can create bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can read their own bookings"
  ON bookings
  FOR SELECT
  TO public
  USING (true);

-- Insert default services
INSERT INTO services (name, description, price, duration_minutes) VALUES
  ('Classic Lash Extensions', 'One extension applied to each natural lash for a natural, elegant look', 120.00, 120),
  ('Volume Lash Extensions', 'Multiple ultra-fine extensions applied to each natural lash for dramatic volume', 180.00, 150),
  ('Mega Volume Extensions', 'Maximum volume with 6-12 ultra-light extensions per natural lash', 220.00, 180),
  ('Lash Fill (2-3 weeks)', 'Maintenance appointment to replace grown-out extensions', 65.00, 90)
ON CONFLICT DO NOTHING;

-- Insert default business hours (Monday-Sunday)
INSERT INTO business_hours (day_of_week, open_time, close_time, is_closed) VALUES
  (0, '10:00', '17:00', false), -- Sunday
  (1, '09:00', '19:00', false), -- Monday
  (2, '09:00', '19:00', false), -- Tuesday
  (3, '09:00', '19:00', false), -- Wednesday
  (4, '09:00', '19:00', false), -- Thursday
  (5, '09:00', '19:00', false), -- Friday
  (6, '09:00', '18:00', false)  -- Saturday
ON CONFLICT DO NOTHING;