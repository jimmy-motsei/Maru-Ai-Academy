'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button'; 
import { Send, AlertCircle, CheckCircle2, Bot, User as UserIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PromptChallenge {
  id: string;
  initialMessage: string;
  successResponse: string;
  hint: string;
  // New: AI grading context
  gradingContext: {
    goal: string;
    criteria: string[];
    exampleGoodPrompt?: string;
  };
  // Legacy fallback validation (used if API fails)
  validation?: {
    requiredKeywords?: string[];
    forbiddenKeywords?: string[];
    minLength?: number;
  };
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  status?: 'success' | 'error' | 'neutral';
  score?: number;
  suggestions?: string[];
}

interface PromptGymProps {
  challenge: PromptChallenge;
  onSuccess: () => void;
}

export function PromptGym({ challenge, onSuccess }: PromptGymProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: challenge.initialMessage, status: 'neutral' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Fallback validation (used if API fails)
  const fallbackValidate = (prompt: string): { isValid: boolean; feedback: string } => {
    const lowerPrompt = prompt.toLowerCase();
    
    if (challenge.validation?.minLength && prompt.length < challenge.validation.minLength) {
      return { isValid: false, feedback: 'Your prompt is too short. Be more descriptive.' };
    }

    if (challenge.validation?.forbiddenKeywords) {
      for (const word of challenge.validation.forbiddenKeywords) {
        if (lowerPrompt.includes(word.toLowerCase())) {
          return { isValid: false, feedback: `Try to avoid using the word "${word}".` };
        }
      }
    }

    if (challenge.validation?.requiredKeywords) {
      const missingWords = challenge.validation.requiredKeywords.filter(
        word => !lowerPrompt.includes(word.toLowerCase())
      );
      if (missingWords.length > 0) {
        return { isValid: false, feedback: challenge.hint };
      }
    }

    return { isValid: true, feedback: '' };
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userPrompt = input;
    setInput('');
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userPrompt }]);
    
    // Show AI thinking
    setIsTyping(true);

    try {
      // Call the Gemini-powered grading API
      const response = await fetch('/api/prompt-grader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt,
          challengeContext: challenge.gradingContext
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const result = await response.json();
      setIsTyping(false);

      if (result.isValid) {
        setMessages(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: result.feedback || challenge.successResponse, 
            status: 'success',
            score: result.score,
            suggestions: result.suggestions
          }
        ]);
        onSuccess();
      } else {
        setMessages(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: result.feedback, 
            status: 'error',
            score: result.score,
            suggestions: result.suggestions
          }
        ]);
      }

    } catch (error) {
      console.error('Grading API error:', error);
      setIsTyping(false);
      
      // Use fallback validation
      const fallbackResult = fallbackValidate(userPrompt);
      
      if (fallbackResult.isValid) {
        setMessages(prev => [
          ...prev, 
          { role: 'assistant', content: challenge.successResponse, status: 'success' }
        ]);
        onSuccess();
      } else {
        setMessages(prev => [
          ...prev, 
          { role: 'assistant', content: fallbackResult.feedback, status: 'error' }
        ]);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={cn(
              "flex w-full max-w-[85%] gap-3",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
            )}
          >
            {/* Avatar */}
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              msg.role === 'assistant' ? "bg-primary-100 text-primary-600" : "bg-gray-200 text-gray-600"
            )}>
              {msg.role === 'assistant' ? <Bot size={18} /> : <UserIcon size={18} />}
            </div>

            {/* Bubble */}
            <div className={cn(
              "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
              msg.role === 'user' 
                ? "bg-primary-600 text-white rounded-tr-none" 
                : "bg-white border border-gray-100 rounded-tl-none text-gray-800",
              msg.status === 'error' ? "border-amber-200 bg-amber-50 text-amber-900" : "",
              msg.status === 'success' ? "border-green-200 bg-green-50 text-green-800" : ""
            )}>
              {msg.status === 'error' && (
                <div className="flex items-center gap-1.5 font-semibold mb-1 text-amber-700">
                  <AlertCircle size={14} />
                  <span>Keep trying!</span>
                  {msg.score !== undefined && (
                    <span className="ml-2 text-xs font-normal bg-amber-200 px-2 py-0.5 rounded-full">
                      Score: {msg.score}/100
                    </span>
                  )}
                </div>
              )}
              {msg.status === 'success' && (
                <div className="flex items-center gap-1.5 font-semibold mb-1 text-green-700">
                  <CheckCircle2 size={14} />
                  <span>Excellent!</span>
                  {msg.score !== undefined && (
                    <span className="ml-2 text-xs font-normal bg-green-200 px-2 py-0.5 rounded-full">
                      Score: {msg.score}/100
                    </span>
                  )}
                </div>
              )}
              
              <div>{msg.content}</div>
              
              {/* AI Suggestions */}
              {msg.suggestions && msg.suggestions.length > 0 && msg.status === 'error' && (
                <div className="mt-3 pt-3 border-t border-amber-200">
                  <div className="text-xs font-semibold text-amber-700 mb-1.5 flex items-center gap-1">
                    <Sparkles size={12} />
                    Suggestions:
                  </div>
                  <ul className="space-y-1">
                    {msg.suggestions.map((suggestion, i) => (
                      <li key={i} className="text-xs text-amber-800 flex items-start gap-1.5">
                        <span className="text-amber-400 mt-0.5">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex w-full max-w-[85%] gap-3">
             <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
               <Bot size={18} />
             </div>
             <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
               <div className="flex items-center gap-2 text-gray-500 text-sm">
                 <Sparkles className="w-4 h-4 text-primary-500 animate-pulse" />
                 <span>Analyzing your prompt...</span>
               </div>
               <div className="flex gap-1 mt-2">
                 <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                 <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                 <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 relative z-10">
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-center gap-2"
        >
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your prompt here..."
            disabled={isTyping}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-gray-50 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className={cn(
              "h-[46px] w-[46px] rounded-lg p-0 flex items-center justify-center",
              input.trim() && !isTyping ? "bg-primary-600 hover:bg-primary-700" : "bg-gray-200 text-gray-400"
            )}
          >
            <Send size={20} />
          </Button>
        </form>
        <div className="text-xs text-center text-gray-400 mt-2 flex items-center justify-center gap-1">
          <Sparkles size={10} className="text-primary-400" />
          Powered by AI grading
        </div>
      </div>
    </div>
  );
}
