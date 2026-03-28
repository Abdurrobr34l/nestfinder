import { useState, useRef, useEffect } from "react"
import {
  MessageCircle, X, Send, Bot, User,
  Loader2, Minimize2, Sparkles
} from "lucide-react"

// ─── Types ──────────────────────────────────────────────────────────
interface Message {
  id: string
  role: "user" | "assistant"
  text: string
  timestamp: string
}

// ─── Helpers ────────────────────────────────────────────────────────
const getTime = () =>
  new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })

const SYSTEM_PROMPT = `You are NestFinder AI, a helpful real estate assistant for Bangladesh. 
You help users find properties, answer questions about real estate in Bangladesh, 
give advice on renting and buying property, explain market trends in cities like 
Dhaka, Chittagong, Sylhet, Rajshahi, and Khulna, and provide general real estate guidance.

Keep your responses concise, helpful, and focused on Bangladesh real estate.
Use Bangladeshi context (BDT currency, local area names, local laws).
If asked about specific listings, suggest the user search on NestFinder.
Never make up specific property listings or prices — give ranges instead.`

const SUGGESTED_QUESTIONS = [
  "What is the average rent in Dhaka?",
  "Best areas to buy flat in Chittagong?",
  "How do I verify a property before buying?",
  "What documents do I need to rent a flat?",
]

// ─── Message Bubble ──────────────────────────────────────────────────
const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === "user"
  return (
    <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 ${
        isUser
          ? "bg-blue-800 text-white"
          : "bg-amber-500 text-white"
      }`}>
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-blue-800 text-white rounded-tr-sm"
            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-sm"
        }`}>
          {message.text}
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500 px-1">
          {message.timestamp}
        </span>
      </div>
    </div>
  )
}

// ─── Main Chatbot Component ──────────────────────────────────────────
const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi! I'm NestFinder AI 👋 I can help you find properties, understand the Bangladesh real estate market, and answer any questions about renting or buying. What are you looking for?",
      timestamp: getTime(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen, isMinimized])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, isMinimized])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
      timestamp: getTime(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setLoading(true)
    setError(null)

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY

      if (!apiKey) {
        throw new Error("Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file.")
      }

      // Build conversation history for context
      const conversationHistory = messages
        .filter(m => m.id !== "welcome")
        .map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }))

      // Add current user message
      conversationHistory.push({
        role: "user",
        parts: [{ text: text.trim() }],
      })

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents: conversationHistory,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            },
          }),
        }
      )

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData?.error?.message || "Failed to get response from Gemini.")
      }

      const data = await response.json()
      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response. Please try again."

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: aiText,
        timestamp: getTime(),
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleSuggestion = (q: string) => {
    sendMessage(q)
  }

  const handleClear = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        text: "Chat cleared! How can I help you with your property search?",
        timestamp: getTime(),
      },
    ])
    setError(null)
  }

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); setIsMinimized(false) }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-800 hover:bg-blue-900 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 group"
          aria-label="Open AI Chat"
        >
          <MessageCircle size={24} />
          {/* Pulse ring */}
          <span className="absolute w-14 h-14 rounded-full bg-blue-800 animate-ping opacity-30" />
          {/* Tooltip */}
          <span className="absolute right-16 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Ask AI Assistant
          </span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-90 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-all duration-300 ${
            isMinimized ? "h-16" : "h-130"
          }`}
          style={{ maxWidth: "calc(100vw - 2rem)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-blue-800 text-white shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <Sparkles size={15} />
              </div>
              <div>
                <div className="font-semibold text-sm">NestFinder AI</div>
                <div className="text-xs text-blue-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                  Online · Powered by Gemini
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(v => !v)}
                className="p-1.5 hover:bg-blue-700 rounded-lg transition-colors"
                aria-label="Minimize"
              >
                <Minimize2 size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-blue-700 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Body — only shown when not minimized */}
          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                {messages.map(msg => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}

                {/* Loading indicator */}
                {loading && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center shrink-0 mt-1">
                      <Bot size={14} className="text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-2xl rounded-tl-sm">
                      <div className="flex gap-1 items-center">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-xs text-red-600 dark:text-red-400">
                    {error}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested questions — only show if only welcome message */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map(q => (
                    <button
                      key={q}
                      onClick={() => handleSuggestion(q)}
                      className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-3 py-1.5 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors text-left"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Clear chat */}
              {messages.length > 2 && (
                <div className="px-4 pb-1 flex justify-end">
                  <button
                    onClick={handleClear}
                    className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    Clear chat
                  </button>
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 px-3 py-3 border-t border-gray-100 dark:border-gray-700 shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about properties..."
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white text-sm outline-none border border-gray-200 dark:border-gray-700 focus:border-blue-800 dark:focus:border-blue-400 disabled:opacity-60 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 bg-blue-800 text-white rounded-xl flex items-center justify-center hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default AIChatbot