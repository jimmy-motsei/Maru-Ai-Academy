'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Minimize2, MessageCircle, HelpCircle, Target, BookOpen, Lightbulb, type LucideIcon } from 'lucide-react';
import ChatMessage, { TypingIndicator, Message } from './ChatMessage';
import { EDUCATION_GREETING, EDUCATION_CONVERSATION_STARTERS } from '@/lib/education-content';


/** Resolves a conversation starter's lucide icon name to a component. */
const STARTER_ICONS: Record<string, LucideIcon> = { HelpCircle, Target, BookOpen, Lightbulb }

const StarterIcon = ({ name }: { name: string }) => {
  const Icon = STARTER_ICONS[name] ?? HelpCircle
  return <Icon className="h-5 w-5 flex-none text-maru-teal transition-transform group-hover:scale-110" aria-hidden="true" />
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: Message = {
        id: '1',
        role: 'assistant',
        content: EDUCATION_GREETING,
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-white border border-maru-line"
          >
            <div className="relative">
              <div className="w-8 h-8 bg-white border border-maru-line rounded-lg flex items-center justify-center shadow-sm overflow-hidden p-1">
                <img src="/brand/maru-mark.png" alt="M" className="w-full h-full object-contain" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-overdue rounded-full border-2 border-white"></span>
            </div>
            <span className="font-bold tracking-wide text-maru-navy">Help</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
              isMinimized ? 'h-[70px]' : 'h-[600px] max-h-[calc(100vh-6rem)]'
            }`}
          >
            {/* Header */}
            <div className="px-5 py-4 bg-maru-navy flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-transparent border border-maru-navy-700 rounded-lg flex items-center justify-center shadow-sm overflow-hidden p-1">
                  <img src="/brand/maru-mark.png" alt="M" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Learning assistant</h3>
                  <p className="text-xs text-maru-grey flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-verified"></span>
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-maru-grey">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hover:text-white transition-colors p-1"
                >
                  <Minimize2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white transition-colors p-1"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-5 py-4 bg-maru-cloud scrollbar-thin scrollbar-thumb-gray-200">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {/* Conversation Starters */}
              {messages.length === 1 && !isLoading && (
                <div className="grid grid-cols-1 gap-2 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {EDUCATION_CONVERSATION_STARTERS.map((starter, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputValue(starter.query);
                        // Small timeout to allow state update before sending
                        setTimeout(() => {
                           // This is a bit of a hack to access the form submission
                           // Ideally refactor to separable logic, but this works for simple case
                           const form = document.querySelector('form.chat-input-form');
                           if(form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                        }, 100);
                      }}
                      className="text-left p-3 rounded-xl bg-white border border-maru-line shadow-sm hover:border-maru-teal-300 hover:shadow-md transition-all group"
                      // Since we can't easily trigger the send from here without refactoring handledSendMessage to not start with e.preventDefault,
                      // we'll just populate for now. Better UX would be auto-send.
                      // Let's modify onClick to just populate
                    >
                      <div className="flex items-center gap-3">
                        <StarterIcon name={starter.icon} />
                        <div>
                          <span className="block text-sm font-medium text-maru-navy">{starter.text}</span>
                          <span className="block text-xs text-maru-grey truncate max-w-[200px]">{starter.query}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-maru-line flex-shrink-0">
              <form 
                onSubmit={handleSendMessage} 
                className="flex items-end gap-2 chat-input-form bg-maru-cloud p-2 rounded-xl border border-maru-line focus-within:border-maru-teal focus-within:ring-1 focus-within:ring-maru-teal-100 transition-all"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  aria-label="Ask a question about your lesson"
                  placeholder="Ask a question about your lesson..."
                  className="flex-1 bg-transparent border-none focus:ring-0 p-2 text-sm max-h-24"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2 rounded-lg bg-maru-teal text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-maru-teal-600 transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
              <p className="text-[10px] text-center text-maru-grey mt-2">
                Maru AI can make mistakes. Please verify important info.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
