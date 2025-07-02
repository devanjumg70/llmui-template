import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ChatLayout from './components/ChatLayout';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isLoading, theme, sendMessage, clearMessages, toggleTheme, chatHistory, activeChat, setActiveChat, createNewChat } = useChat();

  // Create MUI theme based on current theme
  const muiTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: '#4285f4',
      },
      background: {
        default: theme === 'light' ? '#ffffff' : '#1a1a1a',
        paper: theme === 'light' ? '#ffffff' : '#2d2d2d',
      },
      text: {
        primary: theme === 'light' ? '#202124' : '#e8eaed',
        secondary: theme === 'light' ? '#5f6368' : '#9aa0a6',
      },
    },
    typography: {
      fontFamily: 'Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
      fontSize: 14,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });

  // Apply theme class to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.body.className = theme === 'dark' ? 'dark' : '';
  }, [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className="font-google-sans min-h-screen">
        <ChatLayout
          messages={messages}
          onSendMessage={sendMessage}
          onClearMessages={clearMessages}
          onToggleTheme={toggleTheme}
          isLoading={isLoading}
          theme={theme}
          chatHistory={chatHistory}
          activeChat={activeChat}
          onSelectChat={setActiveChat}
          onNewChat={createNewChat}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;