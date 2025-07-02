import React from 'react';
import { Box, Typography } from '@mui/material';

interface TypingIndicatorProps {
  isVisible: boolean;
  theme: 'light' | 'dark';
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible, theme }) => {
  if (!isVisible) return null;

  return (
    <Box className="flex items-start space-x-3 mb-6">
      {/* Avatar */}
      <Box className={`
        w-8 h-8 rounded-full flex items-center justify-center text-sm
        ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'}
      `}>
        G
      </Box>

      {/* Typing Animation */}
      <Box className={`
        p-4 rounded-2xl rounded-bl-md
        ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}
      `}>
        <Box className="flex items-center space-x-1">
          <Box className={`
            w-2 h-2 rounded-full animate-bounce
            ${theme === 'dark' ? 'bg-gray-400' : 'bg-gray-500'}
          `} style={{ animationDelay: '0ms' }}></Box>
          <Box className={`
            w-2 h-2 rounded-full animate-bounce
            ${theme === 'dark' ? 'bg-gray-400' : 'bg-gray-500'}
          `} style={{ animationDelay: '150ms' }}></Box>
          <Box className={`
            w-2 h-2 rounded-full animate-bounce
            ${theme === 'dark' ? 'bg-gray-400' : 'bg-gray-500'}
          `} style={{ animationDelay: '300ms' }}></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TypingIndicator;