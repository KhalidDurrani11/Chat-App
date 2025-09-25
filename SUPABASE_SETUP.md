# Supabase Setup Guide for AetherChat

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login with your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - **Name**: `aetherchat`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait for the project to be created (2-3 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## Step 3: Run the SQL Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Click "Run" to execute the SQL
5. You should see "Success. No rows returned" message

## Step 4: Configure Environment Variables

Add these to your `.env` file:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 5: Test the Connection

Run your application and check the browser console for any Supabase connection errors.

## Database Schema Overview

### Tables Created:

1. **users** - Stores user information from Clerk
2. **chat_rooms** - Stores chat room/conversation data
3. **chat_messages** - Stores individual messages
4. **chat_participants** - For group chat functionality (future use)

### Key Features:

- **Row Level Security (RLS)** - Users can only access their own data
- **Automatic Timestamps** - Created/updated timestamps are managed automatically
- **Real-time Subscriptions** - Live updates for new messages
- **Optimized Queries** - Custom functions for efficient data retrieval

### Functions Created:

- `get_user_chat_rooms()` - Get all chat rooms for a user with latest message info
- `get_chat_messages()` - Get all messages for a specific chat room
- `update_updated_at_column()` - Automatically updates timestamps

## Security Features

- **Row Level Security** enabled on all tables
- **JWT Authentication** integration with Clerk
- **User-specific data access** - Users can only see their own chats
- **Secure API endpoints** with proper permissions

## Real-time Features

The schema includes real-time subscriptions for:
- New messages in chat rooms
- Chat room updates
- User presence (can be extended)

## Sample Data

The SQL includes sample data to help you test:
- A sample user
- A sample chat room
- Sample messages

You can remove the sample data insertion queries if you don't want them.

## Troubleshooting

### Common Issues:

1. **Permission Denied**: Make sure RLS policies are correctly set up
2. **Connection Failed**: Check your Supabase URL and API key
3. **Function Not Found**: Ensure all SQL was executed successfully

### Debug Steps:

1. Check Supabase dashboard → **Logs** for any errors
2. Verify environment variables are correctly set
3. Test database connection in Supabase dashboard → **Table Editor**

## Next Steps

After setting up Supabase:

1. Update your ChatWindow component to use SupabaseService
2. Implement real-time message updates
3. Add message persistence
4. Implement chat room creation/deletion

## Support

If you encounter issues:
1. Check Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
2. Review the SQL schema for any syntax errors
3. Verify your Supabase project settings
