-- AetherChat Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Note: Supabase handles JWT secrets automatically, no need to set them manually

-- Create users table (extends Clerk user data)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_id TEXT UNIQUE NOT NULL,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_rooms table
CREATE TABLE IF NOT EXISTS public.chat_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'private' CHECK (type IN ('private', 'group')),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_ai BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_participants table (for group chats)
CREATE TABLE IF NOT EXISTS public.chat_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(chat_room_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_chat_room_id ON public.chat_messages(chat_room_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_user_id ON public.chat_rooms(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_participants_chat_room_id ON public.chat_participants(chat_room_id);
CREATE INDEX IF NOT EXISTS idx_chat_participants_user_id ON public.chat_participants(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_participants ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Users can only see and modify their own data
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (true); -- Allow all users to view profiles for now

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (true); -- Allow all users to update profiles for now

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (true); -- Allow all users to insert profiles for now

-- Chat rooms policies (simplified for initial setup)
CREATE POLICY "Allow all chat room operations" ON public.chat_rooms
    FOR ALL USING (true);

-- Chat messages policies (simplified for initial setup)
CREATE POLICY "Allow all message operations" ON public.chat_messages
    FOR ALL USING (true);

-- Chat participants policies (simplified for initial setup)
CREATE POLICY "Allow all participant operations" ON public.chat_participants
    FOR ALL USING (true);

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_rooms_updated_at BEFORE UPDATE ON public.chat_rooms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_messages_updated_at BEFORE UPDATE ON public.chat_messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create a function to get user's chat rooms with latest message (simplified)
CREATE OR REPLACE FUNCTION get_user_chat_rooms(user_clerk_id TEXT)
RETURNS TABLE (
    chat_room_id UUID,
    chat_room_name TEXT,
    chat_room_type TEXT,
    last_message_content TEXT,
    last_message_time TIMESTAMP WITH TIME ZONE,
    unread_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cr.id as chat_room_id,
        cr.name as chat_room_name,
        cr.type as chat_room_type,
        cm.content as last_message_content,
        cm.created_at as last_message_time,
        0 as unread_count
    FROM public.chat_rooms cr
    LEFT JOIN LATERAL (
        SELECT content, created_at
        FROM public.chat_messages
        WHERE chat_room_id = cr.id
        ORDER BY created_at DESC
        LIMIT 1
    ) cm ON true
    WHERE cr.user_id = (
        SELECT id FROM public.users WHERE clerk_id = user_clerk_id
    )
    ORDER BY COALESCE(cm.created_at, cr.created_at) DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get chat messages for a room (simplified)
CREATE OR REPLACE FUNCTION get_chat_messages(room_id UUID, user_clerk_id TEXT)
RETURNS TABLE (
    message_id UUID,
    content TEXT,
    is_ai BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE,
    user_name TEXT,
    user_avatar TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cm.id as message_id,
        cm.content,
        cm.is_ai,
        cm.created_at,
        CASE 
            WHEN cm.is_ai THEN 'AI Assistant'
            ELSE COALESCE(u.full_name, 'User')
        END as user_name,
        CASE 
            WHEN cm.is_ai THEN 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
            ELSE COALESCE(u.avatar_url, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80')
        END as user_avatar
    FROM public.chat_messages cm
    LEFT JOIN public.users u ON cm.user_id = u.id
    WHERE cm.chat_room_id = room_id
    ORDER BY cm.created_at ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert some sample data (optional - remove if you don't want sample data)
INSERT INTO public.users (clerk_id, email, full_name, avatar_url) VALUES
('sample-user-1', 'user@example.com', 'Sample User', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80')
ON CONFLICT (clerk_id) DO NOTHING;

-- Create a sample chat room
INSERT INTO public.chat_rooms (name, type, user_id) VALUES
('AI Assistant', 'private', (SELECT id FROM public.users WHERE clerk_id = 'sample-user-1'))
ON CONFLICT DO NOTHING;

-- Insert sample messages
INSERT INTO public.chat_messages (chat_room_id, user_id, content, is_ai) VALUES
((SELECT id FROM public.chat_rooms WHERE name = 'AI Assistant'), (SELECT id FROM public.users WHERE clerk_id = 'sample-user-1'), 'Hello! How can I help you today?', false),
((SELECT id FROM public.chat_rooms WHERE name = 'AI Assistant'), (SELECT id FROM public.users WHERE clerk_id = 'sample-user-1'), 'Hello! I''m your AI assistant. I can help you with various tasks, answer questions, and have conversations. What would you like to talk about?', true)
ON CONFLICT DO NOTHING;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
