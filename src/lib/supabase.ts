import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock client if environment variables are not set
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not set. Using mock client.');
    return createClient('https://mock.supabase.co', 'mock-key');
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string;
          service_id: string;
          appointment_date: string;
          appointment_time: string;
          duration_minutes: number;
          status: 'pending' | 'confirmed' | 'cancelled';
          is_new_client: boolean;
          allergies?: string;
          notes?: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone: string;
          service_id: string;
          appointment_date: string;
          appointment_time: string;
          duration_minutes: number;
          status?: 'pending' | 'confirmed' | 'cancelled';
          is_new_client: boolean;
          allergies?: string;
          notes?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string;
          service_id?: string;
          appointment_date?: string;
          appointment_time?: string;
          duration_minutes?: number;
          status?: 'pending' | 'confirmed' | 'cancelled';
          is_new_client?: boolean;
          allergies?: string;
          notes?: string;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          duration_minutes: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          duration_minutes: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          duration_minutes?: number;
          created_at?: string;
        };
      };
      business_hours: {
        Row: {
          id: string;
          day_of_week: number; // 0 = Sunday, 1 = Monday, etc.
          open_time: string;
          close_time: string;
          is_closed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          day_of_week: number;
          open_time: string;
          close_time: string;
          is_closed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          day_of_week?: number;
          open_time?: string;
          close_time?: string;
          is_closed?: boolean;
          created_at?: string;
        };
      };
    };
  };
};