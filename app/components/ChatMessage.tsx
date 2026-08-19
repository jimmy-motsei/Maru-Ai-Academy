'use client';

import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`flex ${isBot ? 'flex-row' : 'flex-row-reverse'} max-w-[85%] items-start gap-2`}>
        {/* Avatar */}
        {isBot ? (
          <div className="flex-shrink-0 w-8 h-8 bg-white border border-maru-line rounded-lg flex items-center justify-center shadow-sm overflow-hidden p-1">
            <img src="/brand/maru-mark.png" alt="" className="w-full h-full object-contain" />
          </div>
        ) : (
          <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm bg-maru-grey text-white">
            <User size={18} />
          </div>
        )}

        {/* Message Content */}
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm ${
            isBot 
              ? 'bg-white border border-maru-line text-maru-navy' 
              : 'bg-maru-navy text-white'
          }`}
        >
          <div className="text-sm leading-relaxed whitespace-pre-wrap markdown-content">
            {message.content}
          </div>
          
          {/* Timestamp */}
          <p className={`text-[10px] mt-1 ${isBot ? 'text-maru-grey-300' : 'text-maru-grey-300'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Typing indicator component
 */
export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex justify-start mb-4"
    >
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 w-8 h-8 bg-white border border-maru-line rounded-lg flex items-center justify-center shadow-sm overflow-hidden p-1">
          <img src="/brand/maru-mark.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="px-4 py-3 rounded-2xl bg-white border border-maru-line">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-maru-grey-300 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-maru-grey-300 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-maru-grey-300 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
