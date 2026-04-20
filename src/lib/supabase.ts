import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase project URL and anon key
// You can also put these in .env files as VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Custom interface for the CustomerReviews table
export interface CustomerReview {
  id: number;
  title: string;
  author_name: string;
  content: string;
  has_attachment: boolean;
  password?: string;
  view_count: number;
  created_at: string;
  is_pinned: boolean;
}
