import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types/chat';

interface MessageBubbleProps {
  message: Message;
  theme: 'light' | 'dark';
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, theme }) => {
  const isUser = message.sender === 'user';

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <Box className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3 max-w-[80%]`}>
        {/* Avatar */}
        <Avatar
          className={`
            w-8 h-8 text-sm
            ${isUser 
              ? 'bg-blue-500 text-white' 
              : theme === 'dark'
                ? 'bg-gray-700 text-gray-200'
                : 'bg-gray-200 text-gray-700'
            }
          `}
        >
          {isUser ? 'H' : 'G'}
        </Avatar>

        {/* Message Content */}
        <Box className={`
          ${isUser ? 'mr-3' : 'ml-3'}
        `}>
          <Box className={`
            p-4 rounded-2xl
            ${isUser 
              ? 'bg-blue-500 text-white rounded-br-md' 
              : theme === 'dark'
                ? 'bg-gray-800 text-gray-100 rounded-bl-md'
                : 'bg-gray-100 text-gray-900 rounded-bl-md'
            }
          `}>
            <Box className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return (
                      <code 
                        className={`
                          px-2 py-1 rounded text-sm font-mono
                          ${isUser
                            ? 'bg-blue-600 text-blue-100'
                            : theme === 'dark' 
                              ? 'bg-gray-700 text-gray-200' 
                              : 'bg-gray-200 text-gray-800'
                          }
                        `} 
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  p: ({ children }) => (
                    <Typography variant="body2" className="mb-2 last:mb-0 leading-relaxed">
                      {children}
                    </Typography>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </Box>
          </Box>
          
          <Typography variant="caption" className={`
            block mt-1 text-xs
            ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
          `}>
            {formatTime(message.timestamp)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageBubble;