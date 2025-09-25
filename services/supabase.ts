import { supabase } from '../lib/supabase';
import type { ChatMessage, ChatRoom } from '../lib/supabase';

export class SupabaseService {
  // User management
  static async createOrUpdateUser(clerkUser: any) {
    const { data, error } = await supabase
      .from('users')
      .upsert({
        clerk_id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        full_name: clerkUser.fullName || clerkUser.firstName,
        avatar_url: clerkUser.imageUrl,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating/updating user:', error);
      throw error;
    }

    return data;
  }

  // Chat room management
  static async createChatRoom(name: string, type: 'private' | 'group', userId: string) {
    const { data, error } = await supabase
      .from('chat_rooms')
      .insert({
        name,
        type,
        user_id: userId,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating chat room:', error);
      throw error;
    }

    return data;
  }

  static async getUserChatRooms(clerkId: string) {
    const { data, error } = await supabase
      .rpc('get_user_chat_rooms', { user_clerk_id: clerkId });

    if (error) {
      console.error('Error fetching chat rooms:', error);
      throw error;
    }

    return data;
  }

  // Message management
  static async saveMessage(chatRoomId: string, userId: string, content: string, isAi: boolean = false) {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        chat_room_id: chatRoomId,
        user_id: userId,
        content,
        is_ai: isAi,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving message:', error);
      throw error;
    }

    return data;
  }

  static async getChatMessages(chatRoomId: string, clerkId: string) {
    const { data, error } = await supabase
      .rpc('get_chat_messages', { 
        room_id: chatRoomId, 
        user_clerk_id: clerkId 
      });

    if (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }

    return data;
  }

  // Real-time subscriptions
  static subscribeToMessages(chatRoomId: string, callback: (message: ChatMessage) => void) {
    return supabase
      .channel(`chat_messages:${chatRoomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `chat_room_id=eq.${chatRoomId}`,
        },
        (payload) => {
          callback(payload.new as ChatMessage);
        }
      )
      .subscribe();
  }

  static subscribeToChatRooms(userId: string, callback: (room: ChatRoom) => void) {
    return supabase
      .channel(`chat_rooms:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_rooms',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload.new as ChatRoom);
        }
      )
      .subscribe();
  }

  // Utility functions
  static async getUserByClerkId(clerkId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', clerkId)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    return data;
  }

  static async deleteMessage(messageId: string) {
    const { error } = await supabase
      .from('chat_messages')
      .delete()
      .eq('id', messageId);

    if (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  }

  static async deleteChatRoom(chatRoomId: string) {
    const { error } = await supabase
      .from('chat_rooms')
      .delete()
      .eq('id', chatRoomId);

    if (error) {
      console.error('Error deleting chat room:', error);
      throw error;
    }
  }
}
