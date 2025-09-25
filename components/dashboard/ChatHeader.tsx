
import React from 'react';
import { Phone, Video, MoreVertical, Menu } from 'lucide-react';
import type { Chat } from '../../types';
import { CURRENT_USER_ID } from '../../constants';

interface ChatHeaderProps {
  chat: Chat;
  onToggleSidebar: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chat, onToggleSidebar }) => {
  const otherParticipant = chat.participants.find(p => p.id !== CURRENT_USER_ID) || chat.participants[0];
  const participantsNames = chat.participants.map(p => p.name).join(', ');

  return (
    <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-black/30 backdrop-blur-xl border-b border-white/20 dark:border-black/20 flex-shrink-0">
        <div className="flex items-center gap-4">
            <button onClick={onToggleSidebar} className="md:hidden p-2 -ml-2 rounded-full hover:bg-gray-500/20">
                <Menu />
            </button>
            <img src={otherParticipant.avatarUrl} alt={chat.name} className="w-10 h-10 rounded-full" />
            <div>
                <h2 className="font-bold">{chat.name}</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">{chat.type === 'group' ? participantsNames : (otherParticipant.isOnline ? 'Online' : 'Offline')}</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-500/20 transition-colors">
                <Phone size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-500/20 transition-colors">
                <Video size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-500/20 transition-colors">
                <MoreVertical size={20} />
            </button>
        </div>
    </div>
  );
};

export default ChatHeader;
