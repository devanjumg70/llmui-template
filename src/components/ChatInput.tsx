import React, { useState, useRef } from 'react';
import { 
  Box,
  TextField, 
  IconButton, 
  Paper
} from '@mui/material';
import { 
  Send, 
  Mic, 
  AttachFile,
  Add,
  Search,
  Palette
} from '@mui/icons-material';
import CustomTooltip from './CustomTooltip';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  theme: 'light' | 'dark';
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, theme }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      className={`
        w-full max-w-4xl mx-auto overflow-hidden
        ${theme === 'dark' 
          ? 'bg-gray-800 border-gray-600' 
          : 'bg-white border-gray-200'
        }
      `}
      elevation={0}
      sx={{ 
        borderRadius: '32px',
        border: `1px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'}`,
        transition: 'all 0.2s ease-in-out',
        '&:focus-within': {
          borderColor: '#4285f4',
          boxShadow: '0 0 0 3px rgba(66, 133, 244, 0.1)',
        }
      }}
    >
      {/* Text Input Section */}
      <Box className="px-6 pt-4 pb-2">
        <TextField
          ref={inputRef}
          fullWidth
          multiline
          maxRows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask Gemini"
          variant="standard"
          disabled={isLoading}
          className="textbox-scrollbar"
          InputProps={{
            disableUnderline: true,
            style: {
              color: theme === 'dark' ? '#f3f4f6' : '#111827',
              fontSize: '16px',
              fontFamily: 'Google Sans, sans-serif',
              lineHeight: '1.5',
            },
          }}
          sx={{
            '& .MuiInputBase-input': {
              padding: '8px 0',
              minHeight: '24px',
            },
            '& .MuiInputBase-input::placeholder': {
              color: theme === 'dark' ? '#9ca3af' : '#6b7280',
              opacity: 1,
            },
            '& .MuiInputBase-root': {
              overflow: 'auto',
            },
          }}
        />
      </Box>

      {/* Toolbar Section */}
      <Box className={`
        flex items-center justify-between px-4 py-3
        border-t
        ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}
      `}>
        {/* Left Side - Add Button */}
        <Box className="flex items-center">
          <CustomTooltip content="Add content">
            <IconButton
              className={`
                transition-all duration-200 hover:scale-105 active:scale-95
                ${theme === 'dark' 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/60' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
                }
              `}
              sx={{ 
                width: 48, 
                height: 48,
                borderRadius: '12px',
              }}
            >
              <Add />
            </IconButton>
          </CustomTooltip>
        </Box>

        {/* Center - Additional Action Buttons */}
        <Box className="flex items-center space-x-2">
          <CustomTooltip content="Deep Research">
            <IconButton
              className={`
                transition-all duration-200 hover:scale-105 active:scale-95
                ${theme === 'dark' 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/60' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
                }
              `}
              sx={{ 
                width: 48, 
                height: 48,
                borderRadius: '12px',
              }}
            >
              <Search />
            </IconButton>
          </CustomTooltip>

          <CustomTooltip content="Canvas">
            <IconButton
              className={`
                transition-all duration-200 hover:scale-105 active:scale-95
                ${theme === 'dark' 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/60' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
                }
              `}
              sx={{ 
                width: 48, 
                height: 48,
                borderRadius: '12px',
              }}
            >
              <Palette />
            </IconButton>
          </CustomTooltip>
        </Box>

        {/* Right Side - Action Buttons */}
        <Box className="flex items-center space-x-2">
          <CustomTooltip content="Attach file">
            <IconButton
              className={`
                transition-all duration-200 hover:scale-105 active:scale-95
                ${theme === 'dark' 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/60' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
                }
              `}
              sx={{ 
                width: 48, 
                height: 48,
                borderRadius: '12px',
              }}
            >
              <AttachFile />
            </IconButton>
          </CustomTooltip>

          <CustomTooltip content="Voice input">
            <IconButton
              className={`
                transition-all duration-200 hover:scale-105 active:scale-95
                ${theme === 'dark' 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/60' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
                }
              `}
              sx={{ 
                width: 48, 
                height: 48,
                borderRadius: '12px',
              }}
            >
              <Mic />
            </IconButton>
          </CustomTooltip>

          <CustomTooltip 
            content={!message.trim() || isLoading ? "Enter a message to send" : "Send message"}
          >
            <span>
              <IconButton
                type="submit"
                disabled={!message.trim() || isLoading}
                className={`
                  transition-all duration-200 hover:scale-105 active:scale-95
                  ${!message.trim() || isLoading
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-500 hover:text-blue-600 hover:bg-blue-50/60'
                  }
                `}
                sx={{ 
                  width: 48, 
                  height: 48,
                  borderRadius: '12px',
                  '&:disabled': {
                    transform: 'none',
                  }
                }}
              >
                <Send />
              </IconButton>
            </span>
          </CustomTooltip>
        </Box>
      </Box>
    </Paper>
  );
};

export default ChatInput;