'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  role: 'assistant' | 'user';
  content: string;
}

const ElizaChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello, I am ELIZA. How are you feeling today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Sending request to API with message:', input);
      
      const response = await fetch('/api/elizaos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('API Response not ok:', response.status, errorData);
        throw new Error(`Failed to get response: ${response.status} ${errorData}`);
      }

      const data = await response.json();
      console.log('Received response:', data);
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error('Detailed error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I sense some difficulty in our connection. Could we explore what you were saying in a different way?' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Chat with ELIZA</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4 mb-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  message.role === 'assistant' 
                    ? 'bg-blue-100 ml-4' 
                    : 'bg-gray-100 mr-4'
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me what's on your mind..."
            className="flex-1 p-2 border rounded-lg"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Thinking...' : 'Send'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ElizaChat;