// Import necessary React hooks and components from Material-UI and other libraries.
import React, { useState } from 'react';
import { 
  Box, 
  IconButton, 
  TextField, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Typography,
  InputAdornment,
  Divider
} from '@mui/material';
import { 
  Add, 
  Search, 
  Chat, 
  LightMode, 
  DarkMode,
  Menu,
  Close
} from '@mui/icons-material';
// Import custom types and components.
import { ChatHistory } from '../types/chat';
import CustomTooltip from './CustomTooltip';

// Define the properties (props) that the Sidebar component accepts.
interface SidebarProps {
  chatHistory: ChatHistory[]; // Array of chat history items.
  activeChat: string | null; // The ID of the currently active chat.
  onSelectChat: (chatId: string) => void; // Function to handle selecting a chat.
  onNewChat: () => void; // Function to handle creating a new chat.
  onToggleTheme: () => void; // Function to toggle the color theme.
  theme: 'light' | 'dark'; // The current theme.
  isOpen: boolean; // State of the sidebar (open or closed).
  onToggleSidebar: () => void; // Function to toggle the sidebar's visibility.
}

// The main Sidebar component.
const Sidebar: React.FC<SidebarProps> = ({
  chatHistory,
  activeChat,
  onSelectChat,
  onNewChat,
  onToggleTheme,
  theme,
  isOpen,
  onToggleSidebar,
}) => {
  // State to hold the current search query.
  const [searchQuery, setSearchQuery] = useState('');

  // Filter the chat history based on the search query.
  const filteredHistory = chatHistory.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to format the date of the last message for display.
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      // If the message was sent today, show the time.
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      // If the message was sent yesterday, show 'Yesterday'.
      return 'Yesterday';
    } else if (days < 7) {
      // If the message was sent within the last week, show the number of days ago.
      return `${days} days ago`;
    } else {
      // Otherwise, show the full date.
      return date.toLocaleDateString();
    }
  };

  return (
    <Box className="h-full flex flex-col">
      {/* Header section of the sidebar. */}
      <Box className={`
        p-4 border-b
        ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
      `}>
        <Box className="flex items-center justify-between mb-4">
          {/* Title of the application. */}
          <Typography variant="h6" className={`
            font-semibold
            ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}
          `}>
            Gemini
          </Typography>
          <Box className="flex items-center">
            {/* Theme toggle button with a custom tooltip. */}
            <CustomTooltip content={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              <IconButton
                onClick={onToggleTheme}
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
                {theme === 'light' ? <DarkMode /> : <LightMode />}
              </IconButton>
            </CustomTooltip>
            {/* Button to close the sidebar. */}
            <CustomTooltip content="Close sidebar">
              <IconButton
                onClick={onToggleSidebar}
                className={`
                  ml-1 transition-all duration-200 hover:scale-105 active:scale-95
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
                <Close />
              </IconButton>
            </CustomTooltip>
          </Box>
        </Box>

        {/* Button to start a new chat. */}
        <CustomTooltip content="Start a new conversation">
          <Box
            onClick={onNewChat}
            className={`
              flex items-center space-x-3 p-3 rounded-xl cursor-pointer
              transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
              min-h-[48px]
              ${theme === 'dark' 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }
            `}
          >
            <Box className={`
              w-6 h-6 flex items-center justify-center
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
            `}>
              <Add />
            </Box>
            <Typography variant="body2" className="font-medium">
              New chat
            </Typography>
          </Box>
        </CustomTooltip>
      </Box>

      {/* Search input field to filter chat conversations. */}
      <Box className="p-4">
        <TextField
          fullWidth
          size="small"
          placeholder="Search conversations"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className={`
                  text-lg
                  ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
                `} />
              </InputAdornment>
            ),
            style: {
              backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb',
              color: theme === 'dark' ? '#e5e7eb' : '#111827',
              minHeight: '48px',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '& fieldset': {
                borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
              },
              '&:hover fieldset': {
                borderColor: theme === 'dark' ? '#6b7280' : '#9ca3af',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#4285f4',
              },
            },
          }}
        />
      </Box>

      {/* Section for displaying the chat history. */}
      <Box className="flex-1 overflow-y-auto sidebar-scrollbar smooth-scroll">
        {/* "Recent" section title, only shown if there is chat history. */}
        {filteredHistory.length > 0 && (
          <Box className="px-4 pb-2">
            <Typography variant="caption" className={`
              font-medium uppercase tracking-wide
              ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
            `}>
              Recent
            </Typography>
          </Box>
        )}

        {/* List of chat history items. */}
        <List className="px-2">
          {filteredHistory.map((chat) => (
            <ListItem key={chat.id} disablePadding className="mb-1 px-0">
              <CustomTooltip content={chat.title}>
                <ListItemButton
                  onClick={() => onSelectChat(chat.id)}
                  className={`
                    rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                    min-h-[48px] w-full
                    ${activeChat === chat.id
                      ? theme === 'dark'
                        ? 'bg-gray-700 text-gray-100'
                        : 'bg-blue-50 text-blue-900'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                  sx={{ 
                    borderRadius: '12px',
                    width: '100%',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                    '&:active': {
                      transform: 'scale(0.98)',
                    }
                  }}
                >
                  {/* Chat icon. */}
                  <Box className={`
                    w-6 h-6 mr-3 flex items-center justify-center
                    ${activeChat === chat.id
                      ? theme === 'dark' ? 'text-gray-200' : 'text-blue-700'
                      : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }
                  `}>
                    <Chat />
                  </Box>
                  {/* Chat title and last message time. */}
                  <ListItemText
                    primary={
                      <Typography variant="body2" className="font-medium truncate">
                        {chat.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" className={`
                        ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
                      `}>
                        {formatTime(chat.lastMessage)}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </CustomTooltip>
            </ListItem>
          ))}
        </List>

        {/* Message to display when no conversations are found from a search. */}
        {filteredHistory.length === 0 && searchQuery && (
          <Box className="p-4 text-center">
            <Typography variant="body2" className={`
              ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
            `}>
              No conversations found
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
