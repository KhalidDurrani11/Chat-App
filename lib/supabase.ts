import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export interface ChatMessage {
  id: string;
  chat_id: string;
  user_id: string;
  content: string;
  is_ai: boolean;
  created_at: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}
