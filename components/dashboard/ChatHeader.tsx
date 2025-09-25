
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
    <div className="flex items-center justify-between p-4 bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50 flex-shrink-0">
        <div className="flex items-center gap-4">
            <button onClick={onToggleSidebar} className="md:hidden p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
                <Menu className="text-gray-300" size={20} />
            </button>
            <img src={otherParticipant.avatarUrl} alt={otherParticipant.name} className="w-10 h-10 rounded-full ring-2 ring-purple-400/50" />
            <div>
                <h2 className="font-bold text-white text-lg">{otherParticipant.name}</h2>
                <p className="text-xs text-gray-300">{otherParticipant.isOnline ? 'Online' : 'Offline'}</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <Phone className="text-gray-300" size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <Video className="text-gray-300" size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <MoreVertical className="text-gray-300" size={20} />
            </button>
        </div>
    </div>
  );
};

export default ChatHeader;
