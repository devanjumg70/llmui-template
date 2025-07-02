export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  reactions?: string[];
  isCode?: boolean;
}

export interface ChatHistory {
  id: string;
  title: string;
  lastMessage: Date;
}

export interface ChatInterface {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onClearMessages: () => void;
  onToggleTheme: () => void;
  isLoading?: boolean;
  theme: 'light' | 'dark';
}

export interface TypingIndicatorProps {
  isVisible: boolean;
  theme: 'light' | 'dark';
}

export interface MessageBubbleProps {
  message: Message;
  onReaction: (messageId: string, emoji: string) => void;
  theme: 'light' | 'dark';
}