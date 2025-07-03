"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Array<{sender: string, text: string, time: string}>>([])
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (message.trim()) {
      const userMessage = {
        sender: "user",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, userMessage])
      setMessage("")
      
      // Simulate response
      setIsTyping(true)
      setTimeout(() => {
        const botMessage = {
          sender: "support",
          text: getResponse(message),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
      }, 1500)
    }
  }

  const getResponse = (userMessage: string) => {
    const lowerMsg = userMessage.toLowerCase()
    if (lowerMsg.includes("pricing")) return "Our hosting plans start at $5.99/month. Would you like me to send you our pricing page?"
    if (lowerMsg.includes("support")) return "Our support team is available 24/7. You can reach them via email at support@yourhosting.com or phone at +1 (555) 123-4567."
    if (lowerMsg.includes("migration")) return "We offer free website migration services for all new customers. Would you like me to connect you with our migration specialist?"
    return "Thanks for your message! Our support team will get back to you shortly. Is there anything else I can help with?"
  }

  // Auto-open after 30 seconds if not interacted with
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && messages.length === 0) {
        setIsOpen(true)
      }
    }, 30000)
    return () => clearTimeout(timer)
  }, [isOpen, messages.length])

  return (
    <>
      {/* Chat Bubble */}
      {!isOpen && (
        <button 
          title="Live Chat Support"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-background border rounded-lg shadow-xl flex flex-col z-50">
          <div className="bg-primary text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Live Chat Support</h3>
            <button title="Close" onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-4 flex-1 h-80 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground h-full flex items-center justify-center">
                <p>How can we help you today?</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-xs p-3 rounded-lg ${
                        msg.sender === "user" 
                          ? "bg-primary text-white rounded-br-none" 
                          : "bg-muted rounded-bl-none"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg rounded-bl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Our average response time is under 2 minutes
            </p>
          </div>
        </div>
      )}
    </>
  )
}