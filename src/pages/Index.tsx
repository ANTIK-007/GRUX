import { useState, useRef } from "react";
import { Menu, Send, Paperclip, X, MoreHorizontal, Sparkles, Plus, Settings, User, Crown, Check, Zap, Briefcase } from "lucide-react";

interface ChatHistoryItem {
  id: string;
  message: string;
  timestamp: Date;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  files?: File[];
}

// --- New Pricing Component (Moved out for clarity, but kept in the same file) ---

interface PricingTier {
  name: string;
  price: string;
  features: string[];
  isPopular: boolean;
  icon: React.ElementType;
  buttonClass: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Basic",
    price: "$9/mo",
    features: [
      "100 AI queries/day",
      "Standard response speed",
      "Community support",
      "5 concurrent chats",
      "3 file uploads/query (max 10MB)"
    ],
    isPopular: false,
    icon: User,
    buttonClass: "bg-slate-700 hover:bg-slate-600",
  },
  {
    name: "Advanced",
    price: "$29/mo",
    features: [
      "Unlimited AI queries",
      "Fastest response speed (Priority)",
      "Priority email support",
      "10 concurrent chats",
      "10 file uploads/query (max 50MB)",
      "Advanced data analysis tools",
      "Exclusive Pro models"
    ],
    isPopular: true,
    icon: Zap,
    buttonClass: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500",
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Dedicated AI instance",
      "On-premise deployment option",
      "SLA-backed uptime guarantee",
      "Dedicated account manager",
      "Advanced security & compliance",
      "Unlimited file uploads (max 500MB)",
      "Single Sign-On (SSO)"
    ],
    isPopular: false,
    icon: Briefcase,
    buttonClass: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400",
  },
];

const PricingModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-white/10 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all scale-100 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-slate-900 border-b border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between">
          <h2 className="text-3xl font-extrabold text-white mb-2 sm:mb-0">
            Choose Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Grux Pro</span> Plan
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-6 rounded-xl border-2 ${
                tier.isPopular ? 'border-purple-500 bg-slate-800/70 shadow-2xl shadow-purple-500/10' : 'border-white/5 bg-slate-800/50'
              } transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <tier.icon className={`w-6 h-6 ${tier.isPopular ? 'text-purple-400' : 'text-slate-400'}`} />
                  <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                </div>
                {tier.isPopular && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-600 text-white">
                    Most Popular
                  </span>
                )}
              </div>

              <p className="text-5xl font-extrabold text-white">
                {tier.price}
                {tier.price !== 'Custom' && (
                    <span className="text-lg font-medium text-slate-400">/mo</span>
                )}
              </p>
              <p className="text-sm text-slate-400 mb-6 mt-1">
                {tier.name === "Basic" && "The essential toolset for individuals."}
                {tier.name === "Advanced" && "Unleash Grux's full potential for power users."}
                {tier.name === "Enterprise" && "Custom solutions for large organizations."}
              </p>

              <div className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 px-4 ${tier.buttonClass} text-white text-md font-bold rounded-lg transition-all shadow-md ${
                    tier.isPopular ? 'shadow-purple-500/20' : 'shadow-none'
                }`}
                onClick={() => alert(`Initiating checkout for ${tier.name}`)}
              >
                {tier.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
        <div className="p-4 text-center border-t border-white/10">
            <p className="text-xs text-slate-500">All plans come with a 7-day money-back guarantee.</p>
        </div>
      </div>
    </div>
  );
};


// --- GruxApp Component ---

const GruxApp = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  // NEW STATE: For the Pricing Modal
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false); 
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([
    { id: "1", message: "Tell us about your capability", timestamp: new Date() },
    { id: "2", message: "Analyze quarterly revenue trends", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    { id: "3", message: "Create a React component for dashboard", timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    { id: "4", message: "Explain machine learning concepts", timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { id: "5", message: "Generate marketing copy ideas", timestamp: new Date("2025-01-10") }
  ]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (msg: string) => {
    const newChat: ChatHistoryItem = {
      id: Date.now().toString(),
      message: msg,
      timestamp: new Date()
    };
    setChatHistory(prev => [newChat, ...prev]);
  };

  const handleNewMessage = (content: string, files: File[]) => {
    if (!content.trim() && files.length === 0) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      files
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm here to help! This is a professional interface design with improved aesthetics and functionality. The dark theme provides better focus and reduced eye strain."
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

    const handleNewChat = () => {
    setMessages([]);
    setMessage("");
    setAttachedFiles([]);
    setIsSidebarOpen(false);
  };

  const handleSubmit = () => {
    if (!message.trim() && attachedFiles.length === 0) return;
    handleSendMessage(message);
    handleNewMessage(message, attachedFiles);
    setMessage("");
    setAttachedFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const groupChatsByTime = (chats: ChatHistoryItem[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return {
      today: chats.filter((chat) => chat.timestamp >= today),
      yesterday: chats.filter((chat) => chat.timestamp >= yesterday && chat.timestamp < today),
      last3Days: chats.filter((chat) => chat.timestamp >= threeDaysAgo && chat.timestamp < yesterday),
      last7Days: chats.filter((chat) => chat.timestamp >= sevenDaysAgo && chat.timestamp < threeDaysAgo),
      older: chats.filter((chat) => chat.timestamp < sevenDaysAgo)
    };
  };

  const grouped = groupChatsByTime(chatHistory);

  const renderChatGroup = (title: string, chats: ChatHistoryItem[]) => {
    if (chats.length === 0) return null;
    
    return (
      <div className="mb-6" key={title}>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">{title}</h3>
        <div className="space-y-1">
          {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={handleNewChat}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-transparent hover:bg-white/5 cursor-pointer transition-all group text-left"
          >
            <span className="text-sm text-slate-300 truncate flex-1 mr-2 group-hover:text-white transition-colors">
              {chat.message}
            </span>
            <MoreHorizontal className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          ))}
        </div>
      </div>
    );
  };

  const quickActions = [
    { icon: "📊", title: "Analyze Data", desc: "Upload and analyze datasets" },
    { icon: "💻", title: "Write Code", desc: "Generate code snippets" },
    { icon: "📝", title: "Content Creation", desc: "Write articles and posts" },
    { icon: "🎨", title: "Design Ideas", desc: "Brainstorm creative concepts" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {isSidebarOpen && (
        <div className="fixed left-0 top-0 h-full w-80 bg-slate-900/95 backdrop-blur-xl border-r border-white/5 z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">Chat History</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 border-b border-white/5">
          <button 
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {renderChatGroup("Today", grouped.today)}
            {renderChatGroup("Yesterday", grouped.yesterday)}
            {renderChatGroup("Last 3 Days", grouped.last3Days)}
            {renderChatGroup("Last 7 Days", grouped.last7Days)}
            {grouped.older.length > 0 && renderChatGroup("Older Chats", grouped.older)}
          </div>

          <div className="p-4 border-t border-white/5">
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-semibold text-amber-400">Upgrade to Pro</span>
                </div>
                <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                  Unlock advanced features, faster responses, and priority support
                </p>
                {/* MODIFIED: Open Pricing Modal */}
                <button 
                  onClick={() => setIsPricingModalOpen(true)}
                  className="w-full py-2 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-amber-500/20"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`min-h-screen transition-all duration-300 relative ${isSidebarOpen ? 'ml-80' : 'ml-0'}`}>
        <header className="border-b border-white/5 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-semibold text-white">Grux</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 ? (
              // Empty State UI
              <div>
                <div className="text-center mb-12 mt-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6 shadow-xl shadow-blue-500/20">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
                    Welcome to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Grux</span>
                  </h1>
                  <p className="text-xl text-slate-400">
                    Your AI-powered assistant for analysis, creation, and innovation
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(action.title)}
                      className="p-6 rounded-xl bg-slate-800/50 border border-white/5 hover:border-white/10 hover:bg-slate-800/80 transition-all text-left group"
                    >
                      <div className="text-3xl mb-3">{action.icon}</div>
                      <h3 className="text-white font-semibold mb-1 group-hover:text-blue-400 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-slate-400">{action.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Input Area when chat is empty (Duplicated logic from below to keep it here, could be refactored) */}
                {attachedFiles.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {attachedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2"
                      >
                        <span className="text-sm text-slate-300 truncate max-w-[200px]">
                          {file.name}
                        </span>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="relative">
                  <div className="relative bg-slate-800/50 border border-white/10 rounded-2xl p-4 focus-within:border-blue-500/50 focus-within:bg-slate-800/80 transition-all shadow-xl">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                      placeholder="Ask me anything..."
                      className="w-full bg-transparent text-white text-lg placeholder:text-slate-500 focus:outline-none pr-24"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*,text/*,.pdf,.doc,.docx"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!message.trim() && attachedFiles.length === 0}
                        className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/20"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-center text-xs text-slate-500 mt-4">
                  Grux can make mistakes. Consider checking important information.{' '}
                  <button 
                    onClick={() => setIsLicenseModalOpen(true)}
                    className="text-blue-400 hover:text-blue-300 underline transition-colors"
                  >
                    License
                  </button>
                </p>
              </div>

            ) : (
              // Active Chat UI
              <div>
                <div className="space-y-6 mb-6">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/20'
                            : 'bg-slate-800/50 border border-white/5 text-slate-200'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        {msg.files && msg.files.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/10 text-xs opacity-75">
                            📎 {msg.files.length} file(s) attached
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area when chat is active */}
                {attachedFiles.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {attachedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2"
                      >
                        <span className="text-sm text-slate-300 truncate max-w-[200px]">
                          {file.name}
                        </span>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="sticky bottom-0 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent pt-6">
                  <div className="relative bg-slate-800/50 border border-white/10 rounded-2xl p-4 focus-within:border-blue-500/50 focus-within:bg-slate-800/80 transition-all shadow-xl">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                      placeholder="Send a message..."
                      disabled={isLoading}
                      className="w-full bg-transparent text-white text-lg placeholder:text-slate-500 focus:outline-none pr-24"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*,text/*,.pdf,.doc,.docx"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading || (!message.trim() && attachedFiles.length === 0)}
                        className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/20"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* License Modal */}
      {isLicenseModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setIsLicenseModalOpen(false)}
        >
          <div 
            className="bg-slate-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900 border-b border-white/10 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">MIT License</h2>
              <button
                onClick={() => setIsLicenseModalOpen(false)}
                className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 text-slate-300 space-y-4">
              <p className="text-sm">
                <strong className="text-white">Copyright (c) 2025 ANTIK MONDAL</strong>
              </p>
              
              <p className="text-sm leading-relaxed">
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
              </p>
              
              <p className="text-sm leading-relaxed">
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
              </p>
              
              <p className="text-sm leading-relaxed text-slate-400">
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
              </p>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-slate-500">
                  This license applies to the Grux application interface and design.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW: Pricing Modal */}
      {isPricingModalOpen && (
        <PricingModal onClose={() => setIsPricingModalOpen(false)} />
      )}
    </div>
  );
};

export default GruxApp;