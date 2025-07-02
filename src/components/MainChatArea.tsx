import React, { useEffect, useRef } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Menu, MoreVert } from '@mui/icons-material';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import CustomTooltip from './CustomTooltip';
import { Message } from '../types/chat';

interface MainChatAreaProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onClearMessages: () => void;
  isLoading: boolean;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const MainChatArea: React.FC<MainChatAreaProps> = ({
  messages,
  onSendMessage,
  onClearMessages,
  isLoading,
  theme,
  sidebarOpen,
  onToggleSidebar,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box className="flex flex-col h-full">
      {/* Header */}
      <Box className={`
        flex items-center justify-between p-4 border-b
        ${theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}
      `}>
        <Box className="flex items-center space-x-3">
          {!sidebarOpen && (
            <CustomTooltip content="Open sidebar">
              <IconButton
                onClick={onToggleSidebar}
                className={`
                  transition-all duration-200 hover:scale-105 active:scale-95
                  ${theme === 'dark' 
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
                  }
                `}
                sx={{ 
                  width: 48, 
                  height: 48,
                  borderRadius: '12px',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  '&:active': {
                    transform: 'scale(0.95)',
                  }
                }}
              >
                <Menu />
              </IconButton>
            </CustomTooltip>
          )}
          <Typography variant="h6" className={`
            font-medium
            ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}
          `}>
            Gemini
          </Typography>
        </Box>

        <CustomTooltip content="More options">
          <IconButton
            className={`
              transition-all duration-200 hover:scale-105 active:scale-95
              ${theme === 'dark' 
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
              }
            `}
            sx={{ 
              width: 48, 
              height: 48,
              borderRadius: '12px',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              }
            }}
          >
            <MoreVert />
          </IconButton>
        </CustomTooltip>
      </Box>

      {/* Messages Area */}
      <Box className="flex-1 overflow-y-auto messages-scrollbar smooth-scroll">
        {messages.length === 0 ? (
          <Box className="flex flex-col items-center justify-center h-full text-center p-8">
            <Box className="mb-8">
              <Typography variant="h3" className={`
                font-light mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent
              `}>
                Hello, Haseeb
              </Typography>
              <Typography variant="h6" className={`
                ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
              `}>
                How can I help you today?
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box className="max-w-4xl mx-auto p-6 space-y-6">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                theme={theme}
              />
            ))}
            <TypingIndicator isVisible={isLoading} theme={theme} />
            <div ref={messagesEndRef} />
          </Box>
        )}
      </Box>

      {/* Input Area */}
      <Box className={`
        border-t
        ${theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}
      `}>
        <Box className="max-w-4xl mx-auto p-6">
          <ChatInput
            onSendMessage={onSendMessage}
            isLoading={isLoading}
            theme={theme}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MainChatArea;