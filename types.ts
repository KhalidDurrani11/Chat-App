
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  email?: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  senderId: string;
}

export interface Chat {
  id: string;
  type: 'private' | 'group';
  participants: User[];
  messages: Message[];
  name: string;
  unreadCount: number;
}
