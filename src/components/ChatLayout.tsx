import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import MainChatArea from './MainChatArea';
import { Message, ChatHistory } from '../types/chat';

interface ChatLayoutProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onClearMessages: () => void;
  onToggleTheme: () => void;
  isLoading: boolean;
  theme: 'light' | 'dark';
  chatHistory: ChatHistory[];
  activeChat: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({
  messages,
  onSendMessage,
  onClearMessages,
  onToggleTheme,
  isLoading,
  theme,
  chatHistory,
  activeChat,
  onSelectChat,
  onNewChat,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Box
        className={`
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-80' : 'w-0'}
          ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}
          border-r
          ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
        `}
        sx={{ 
          minWidth: sidebarOpen ? '320px' : '0px',
          overflow: 'hidden'
        }}
      >
        <Sidebar
          chatHistory={chatHistory}
          activeChat={activeChat}
          onSelectChat={onSelectChat}
          onNewChat={onNewChat}
          onToggleTheme={onToggleTheme}
          theme={theme}
          isOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      </Box>

      {/* Main Chat Area */}
      <Box className="flex-1 flex flex-col min-w-0">
        <MainChatArea
          messages={messages}
          onSendMessage={onSendMessage}
          onClearMessages={onClearMessages}
          isLoading={isLoading}
          theme={theme}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      </Box>
    </Box>
  );
};

export default ChatLayout;