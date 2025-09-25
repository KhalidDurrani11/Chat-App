
import { User, Chat } from './types';

// This will be set dynamically based on Clerk user
export let CURRENT_USER_ID = 'user-1';

export const users: Record<string, User> = {
  'user-1': { 
    id: 'user-1', 
    name: 'You', 
    avatarUrl: 'https://picsum.photos/seed/you/100/100', 
    email: 'you@aetherchat.dev', 
    isOnline: true 
  },
  'user-2': { 
    id: 'user-2', 
    name: 'Alice', 
    avatarUrl: 'https://picsum.photos/seed/alice/100/100', 
    isOnline: true 
  },
  'user-3': { 
    id: 'user-3', 
    name: 'Bob', 
    avatarUrl: 'https://picsum.photos/seed/bob/100/100', 
    isOnline: false 
  },
  'user-4': { 
    id: 'user-4', 
    name: 'Charlie', 
    avatarUrl: 'https://picsum.photos/seed/charlie/100/100', 
    isOnline: true 
  },
  'user-5': { 
    id: 'user-5', 
    name: 'Design Team', 
    avatarUrl: 'https://picsum.photos/seed/design/100/100', 
    isOnline: true 
  },
};

// Function to update current user from Clerk
export const updateCurrentUser = (clerkUser: any): void => {
  if (clerkUser) {
    CURRENT_USER_ID = clerkUser.id;
    users[clerkUser.id] = {
      id: clerkUser.id,
      name: clerkUser.fullName || clerkUser.firstName || 'User',
      avatarUrl: clerkUser.imageUrl || 'https://picsum.photos/seed/user/100/100',
      email: clerkUser.emailAddresses[0]?.emailAddress || '',
      isOnline: true
    };
  }
};

export const chats: Chat[] = [
  {
    id: 'chat-1',
    type: 'private',
    participants: [users['user-1'], users['user-2']],
    name: 'Alice',
    unreadCount: 2,
    messages: [
      { id: 'msg-1', text: 'Hey, how is it going?', timestamp: '10:30 AM', senderId: 'user-2' },
      { id: 'msg-2', text: 'Great! Working on the new designs. You?', timestamp: '10:31 AM', senderId: 'user-1' },
      { id: 'msg-3', text: 'Awesome! I am just reviewing them. They look amazing!', timestamp: '10:32 AM', senderId: 'user-2' },
      { id: 'msg-4', text: 'Thanks! Let me know if you have any feedback.', timestamp: '10:32 AM', senderId: 'user-2' },
    ],
  },
  {
    id: 'chat-2',
    type: 'group',
    participants: [users['user-1'], users['user-3'], users['user-4']],
    name: 'Project Phoenix',
    unreadCount: 0,
    messages: [
      { id: 'msg-5', text: 'Team, the deadline is approaching. How is the progress?', timestamp: 'Yesterday', senderId: 'user-3' },
      { id: 'msg-6', text: 'Frontend is almost done. Just need to integrate the API.', timestamp: 'Yesterday', senderId: 'user-1' },
      { id: 'msg-7', text: 'Backend services are all deployed. Ready when you are!', timestamp: 'Yesterday', senderId: 'user-4' },
    ],
  },
  {
    id: 'chat-3',
    type: 'private',
    participants: [users['user-1'], users['user-3']],
    name: 'Bob',
    unreadCount: 0,
    messages: [
      { id: 'msg-8', text: 'Can we have a quick sync tomorrow?', timestamp: 'Tuesday', senderId: 'user-3' },
      { id: 'msg-9', text: 'Sure, what time works for you?', timestamp: 'Tuesday', senderId: 'user-1' },
    ],
  },
];
