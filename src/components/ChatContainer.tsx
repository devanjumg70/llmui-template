import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paper, IconButton, Tooltip } from '@mui/material';
import { LightMode, DarkMode, Refresh } from '@mui/icons-material';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { Message } from '../types/chat';

interface ChatContainerProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onClearMessages: () => void;
  onToggleTheme: () => void;
  isLoading?: boolean;
  theme: 'light' | 'dark';
}

const ChatContainer: React.FC<ChatContainerProps> = ({ 
  messages, 
  onSendMessage, 
  onClearMessages,
  onToggleTheme,
  isLoading = false, 
  theme 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom && messages.length > 0);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    console.log(`Adding reaction ${emoji} to message ${messageId}`);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={`
      min-h-screen flex flex-col transition-all duration-300
      ${theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
      }
    `}>
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`
          flex items-center justify-between p-6 backdrop-blur-xl border-b
          ${theme === 'dark' 
            ? 'bg-slate-900/50 border-slate-700/50' 
            : 'bg-white/50 border-slate-200/50'
          }
        `}
      >
        <div>
          <h1 className={`
            text-2xl font-semibold tracking-tight
            ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}
          `}>
            AI Assistant
          </h1>
          <p className={`
            text-sm mt-1
            ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}
          `}>
            Powered by advanced AI technology
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Tooltip title="Clear chat">
            <IconButton
              onClick={onClearMessages}
              className={`
                transition-all duration-200 hover:scale-105
                ${theme === 'dark' 
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                }
              `}
            >
              <Refresh />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton
              onClick={onToggleTheme}
              className={`
                transition-all duration-200 hover:scale-105
                ${theme === 'dark' 
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                }
              `}
            >
              {theme === 'light' ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Tooltip>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex justify-center p-6 overflow-hidden">
        <Paper
          className={`
            w-full max-w-4xl flex flex-col h-full
            backdrop-blur-xl border shadow-2xl overflow-hidden
            ${theme === 'dark' 
              ? 'bg-slate-900/30 border-slate-700/30' 
              : 'bg-white/30 border-slate-200/30'
            }
          `}
          elevation={0}
          sx={{ borderRadius: '16px' }}
        >
          {/* Messages Area */}
          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth custom-scrollbar"
          >
            <AnimatePresence>
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center py-16"
                >
                  <div className="text-6xl mb-6">🤖</div>
                  <h2 className={`
                    text-2xl font-semibold mb-3
                    ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}
                  `}>
                    Welcome to AI Chat
                  </h2>
                  <p className={`
                    max-w-md leading-relaxed
                    ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}
                  `}>
                    Start a conversation with our AI assistant. Ask questions, get help with coding, 
                    or just have a friendly chat!
                  </p>
                </motion.div>
              ) : (
                messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    onReaction={handleReaction}
                    theme={theme}
                  />
                ))
              )}
            </AnimatePresence>
            
            <TypingIndicator isVisible={isLoading} theme={theme} />
            <div ref={messagesEndRef} />
          </div>

          {/* Scroll to Bottom Button */}
          <AnimatePresence>
            {showScrollButton && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-32 right-8"
              >
                <IconButton
                  onClick={scrollToBottom}
                  className={`
                    backdrop-blur-xl border shadow-lg transition-all duration-200 hover:scale-105
                    ${theme === 'dark' 
                      ? 'bg-slate-800/50 border-slate-600/50 text-slate-300 hover:bg-slate-700/50' 
                      : 'bg-white/50 border-slate-300/50 text-slate-700 hover:bg-white/70'
                    }
                  `}
                  sx={{ borderRadius: '12px' }}
                >
                  ↓
                </IconButton>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Area */}
          <ChatInput
            onSendMessage={onSendMessage}
            isLoading={isLoading}
            theme={theme}
          />
        </Paper>
      </div>
    </div>
  );
};

export default React.memo(ChatContainer);