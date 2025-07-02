import { useState, useCallback } from 'react';
import { Message, ChatHistory } from '../types/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    {
      id: '1',
      title: 'UniVidPro Code assistant',
      lastMessage: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: '2',
      title: 'DUNEY',
      lastMessage: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: '3',
      title: 'Solana AI Explorer: Open-S...',
      lastMessage: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
    {
      id: '4',
      title: 'Solana Transaction Query T...',
      lastMessage: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
    {
      id: '5',
      title: 'Essential Computer Science...',
      lastMessage: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    },
  ]);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const addMessage = useCallback((content: string, sender: 'user' | 'ai') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      reactions: [],
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    addMessage(content, 'user');
    setIsLoading(true);

    try {
      // Simulate AI response delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      // Generate mock AI response
      const aiResponses = [
        "I'd be happy to help you with that! Let me provide you with a comprehensive answer.",
        "That's an interesting question. Here's what I think about this topic:",
        "Great question! Let me break this down for you step by step.",
        "I understand what you're asking. Here's my perspective on this:",
        "That's a complex topic. Let me provide you with detailed information:",
        "I see what you're getting at. Here's how I would approach this:",
        "Excellent point! Let me elaborate on that for you.",
        "I appreciate your question. Here's my detailed response:",
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      // Add some variety to responses
      let aiContent = randomResponse;
      
      if (content.toLowerCase().includes('code')) {
        aiContent += "\n\nHere's a simple example:\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));\n```";
      } else if (content.toLowerCase().includes('help')) {
        aiContent += "\n\n**Here are some ways I can assist you:**\n- Answer questions\n- Help with coding\n- Explain concepts\n- Provide recommendations\n- Assist with problem-solving";
      }
      
      addMessage(aiContent, 'ai');
    } catch (error) {
      addMessage("I apologize, but I encountered an error. Please try again.", 'ai');
    } finally {
      setIsLoading(false);
    }
  }, [addMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const createNewChat = useCallback(() => {
    setMessages([]);
    setActiveChat(null);
  }, []);

  const selectChat = useCallback((chatId: string) => {
    setActiveChat(chatId);
    // In a real app, you would load the messages for this chat
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    theme,
    chatHistory,
    activeChat,
    sendMessage,
    clearMessages,
    toggleTheme,
    createNewChat,
    setActiveChat: selectChat,
  };
};