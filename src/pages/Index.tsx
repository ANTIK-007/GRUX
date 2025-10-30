import { useState, useRef } from "react";
import { Menu, Send, Paperclip, X, MoreHorizontal, Sparkles, Plus, Settings, User, Crown, Bell, Lock, Palette, Globe, Zap, Moon, Sun, Monitor, Check, Briefcase, Shield, Eye, EyeOff, Download, Trash2, LogOut, Key, Smartphone, Mail, Volume2, VolumeX, Save, RefreshCw, Database, Languages, Clock, MessageSquare, FileText, Image, Video, Code, BarChart, HelpCircle, Info, ExternalLink, ChevronRight, Keyboard, Mic } from "lucide-react";

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

const ToggleSetting = ({ label, description, checked, onChange, disabled = false }: any) => {
  return (
    <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-white mb-1">{label}</h4>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
        <button
          onClick={() => !disabled && onChange(!checked)}
          disabled={disabled}
          className={`relative w-12 h-6 rounded-full transition-all ${
            checked ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-slate-700'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-lg ${
              checked ? 'right-1' : 'left-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

const SettingsSection = ({ icon: Icon, title, children, iconColor }: any) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/5">
        <div className={`w-10 h-10 rounded-lg ${iconColor} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

const GruxApp = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
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

  // Settings state - Account & Profile
  const [userName, setUserName] = useState('John Doe');
  const [userEmail, setUserEmail] = useState('john.doe@example.com');
  const [userBio, setUserBio] = useState('AI enthusiast and creative thinker');
  const [userPhone, setUserPhone] = useState('+1 (555) 123-4567');
  const [userLocation, setUserLocation] = useState('San Francisco, CA');
  const [userWebsite, setUserWebsite] = useState('https://johndoe.com');
  const [userCompany, setUserCompany] = useState('Tech Innovations Inc.');
  const [userRole, setUserRole] = useState('Product Manager');
  
  // Appearance Settings
  const [theme, setTheme] = useState<'dark' | 'light' | 'auto'>('dark');
  const [accentColor, setAccentColor] = useState('blue');
  const [fontSize, setFontSize] = useState('medium');
  const [messageSpacing, setMessageSpacing] = useState('comfortable');
  const [codeHighlighting, setCodeHighlighting] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [showTimestamps, setShowTimestamps] = useState(true);
  
  // Language & Region
  const [language, setLanguage] = useState('english');
  const [timezone, setTimezone] = useState('America/Los_Angeles');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [timeFormat, setTimeFormat] = useState('12h');
  
  // Notifications
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(true);
  const [mobileNotifications, setMobileNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [notificationSound, setNotificationSound] = useState('default');
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [doNotDisturb, setDoNotDisturb] = useState(false);
  const [dndStartTime, setDndStartTime] = useState('22:00');
  const [dndEndTime, setDndEndTime] = useState('08:00');
  
  // AI Behavior
  const [aiPersonality, setAiPersonality] = useState('professional');
  const [responseLength, setResponseLength] = useState('balanced');
  const [creativityLevel, setCreativityLevel] = useState('balanced');
  const [codeExecution, setCodeExecution] = useState(true);
  const [webSearch, setWebSearch] = useState(true);
  const [imageGeneration, setImageGeneration] = useState(true);
  const [dataAnalysis, setDataAnalysis] = useState(true);
  const [suggestFollowUps, setSuggestFollowUps] = useState(true);
  const [contextMemory, setContextMemory] = useState(true);
  const [autoCorrect, setAutoCorrect] = useState(true);
  
  // Privacy & Security
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [passwordlessLogin, setPasswordlessLogin] = useState(false);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(false);
  const [thirdPartyAccess, setThirdPartyAccess] = useState(false);
  const [locationTracking, setLocationTracking] = useState(false);
  const [autoLogout, setAutoLogout] = useState(true);
  
  // Data & Storage
  const [autoSave, setAutoSave] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [cloudSync, setCloudSync] = useState(true);
  const [compressionEnabled, setCompressionEnabled] = useState(true);
  const [cacheSize, setCacheSize] = useState('500');
  
  // Accessibility
  const [screenReader, setScreenReader] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(true);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [speechToText, setSpeechToText] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [focusIndicators, setFocusIndicators] = useState(true);
  
  // Advanced
  const [developerMode, setDeveloperMode] = useState(false);
  const [betaFeatures, setBetaFeatures] = useState(false);
  const [experimentalFeatures, setExperimentalFeatures] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [apiAccess, setApiAccess] = useState(false);
  const [webhooks, setWebhooks] = useState(false);
  const [customModels, setCustomModels] = useState(false);

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

      {/* Sidebar */}
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

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Profile</h2>
                  <p className="text-sm text-slate-400">Manage your personal information</p>
                </div>
              </div>
              <button
                onClick={() => setShowProfile(false)}
                className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Profile Header */}
              <div className="mb-8 text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                    {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{userName}</h3>
                <p className="text-slate-400 text-sm">{userEmail}</p>
              </div>

              {/* Account Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-400" />
                  Account Information
                </h3>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4 
                                  transform transition-all duration-300 hover:scale-105 
                                  hover:shadow-lg hover:border-blue-500/30">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Full Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg 
                                px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 
                                transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4 
                                  transform transition-all duration-300 hover:scale-105 
                                  hover:shadow-lg hover:border-blue-500/30">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Email Address</label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg 
                                px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 
                                transition-all"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4 
                                  transform transition-all duration-300 hover:scale-105 
                                  hover:shadow-lg hover:border-blue-500/30">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Phone Number</label>
                    <input
                      type="tel"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg 
                                px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 
                                transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Location */}
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4 
                                  transform transition-all duration-300 hover:scale-105 
                                  hover:shadow-lg hover:border-blue-500/30">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Location</label>
                    <input
                      type="text"
                      value={userLocation}
                      onChange={(e) => setUserLocation(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg 
                                px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 
                                transition-all"
                      placeholder="Enter your location"
                    />
                  </div>

                  {/* Website */}
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4 
                                  transform transition-all duration-300 hover:scale-105 
                                  hover:shadow-lg hover:border-blue-500/30 md:col-span-2">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Website</label>
                    <input
                      type="url"
                      value={userWebsite}
                      onChange={(e) => setUserWebsite(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg 
                                px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 
                                transition-all"
                      placeholder="Enter your website"
                    />
                  </div>

                  {/* Bio (Full width) */}
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4 
                                  transform transition-all duration-300 hover:scale-105 
                                  hover:shadow-lg hover:border-blue-500/30 md:col-span-2">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Bio</label>
                    <textarea
                      value={userBio}
                      onChange={(e) => setUserBio(e.target.value)}
                      rows={4}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg 
                                px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 
                                transition-all resize-none"
                      placeholder="Tell us about yourself"
                    />
                  </div>
                </div>
              </div>

              {/* Usage Statistics */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Usage Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">247</p>
                        <p className="text-xs text-slate-400">Total Chats</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">1,432</p>
                        <p className="text-xs text-slate-400">AI Queries</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">45h</p>
                        <p className="text-xs text-slate-400">Time Saved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subscription Details */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  Subscription
                </h3>
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-white/5 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Current Plan</p>
                      <p className="text-2xl font-bold text-white">Free Plan</p>
                    </div>
                    <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-400 text-sm font-medium rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Daily Queries</span>
                      <span className="text-white font-medium">78 / 100</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setShowProfile(false);
                      setIsPricingModalOpen(true);
                    }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-medium rounded-lg transition-all shadow-lg shadow-amber-500/20"
                  >
                    Upgrade to Pro
                  </button>
                </div>
              </div>

              {/* Account Actions */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-slate-400" />
                  Account Actions
                </h3>
                <div className="space-y-3">
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white mb-1">Change Password</h4>
                        <p className="text-xs text-slate-400">Update your account password</p>
                      </div>
                      <button 
                        onClick={() => alert('Password change dialog would open here')}
                        className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 text-sm font-medium rounded-lg transition-all"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white mb-1">Download Data</h4>
                        <p className="text-xs text-slate-400">Export all your information</p>
                      </div>
                      <button 
                        onClick={() => alert('Data download would start')}
                        className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 text-sm font-medium rounded-lg transition-all"
                      >
                        Export
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white mb-1">Sign Out</h4>
                        <p className="text-xs text-slate-400">Sign out from your account</p>
                      </div>
                      <button 
                        onClick={() => {
                          if (confirm('Are you sure you want to sign out?')) {
                            alert('Signing out...');
                          }
                        }}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 text-sm font-medium rounded-lg transition-all"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-slate-900/50">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">Member since October 2024</p>
                <button
                  onClick={() => setShowProfile(false)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-blue-500/20"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Settings Panel */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Settings</h2>
                  <p className="text-sm text-slate-400">Customize your Grux experience</p>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Account Section */}
              <SettingsSection icon={User} title="Account & Profile" iconColor="bg-indigo-500/20 text-indigo-400">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Display Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Email Address</label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Company</label>
                    <input
                      type="text"
                      value={userCompany}
                      onChange={(e) => setUserCompany(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                      placeholder="Your company"
                    />
                  </div>
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Job Title</label>
                    <input
                      type="text"
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                      placeholder="Your role"
                    />
                  </div>
                </div>
                <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                        <Key className="w-4 h-4 text-blue-400" />
                        Change Password
                      </h4>
                      <p className="text-xs text-slate-400">Update your account security</p>
                    </div>
                    <button 
                      onClick={() => alert('Password change dialog')}
                      className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 text-sm font-medium rounded-lg transition-all"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </SettingsSection>

              {/* Appearance Section */}
              <SettingsSection icon={Palette} title="Appearance & Display" iconColor="bg-blue-500/20 text-blue-400">
                <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                  <label className="text-sm font-medium text-slate-300 mb-3 block">Theme Mode</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'light', icon: Sun, label: 'Light' },
                      { value: 'dark', icon: Moon, label: 'Dark' },
                      { value: 'auto', icon: Monitor, label: 'Auto' }
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setTheme(opt.value as any)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                          theme === opt.value
                            ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                            : 'bg-slate-800/50 border-white/5 text-slate-400 hover:border-white/10'
                        }`}
                      >
                        <opt.icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Accent Color</label>
                    <select
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                    >
                      <option value="blue">Blue</option>
                      <option value="purple">Purple</option>
                      <option value="green">Green</option>
                      <option value="red">Red</option>
                      <option value="orange">Orange</option>
                    </select>
                  </div>
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Font Size</label>
                    <select
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="xlarge">Extra Large</option>
                    </select>
                  </div>
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Message Spacing</label>
                    <select
                      value={messageSpacing}
                      onChange={(e) => setMessageSpacing(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                    >
                      <option value="compact">Compact</option>
                      <option value="comfortable">Comfortable</option>
                      <option value="spacious">Spacious</option>
                    </select>
                  </div>
                </div>

                <ToggleSetting
                  label="Code Syntax Highlighting"
                  description="Enable colorful code highlighting in messages"
                  checked={codeHighlighting}
                  onChange={setCodeHighlighting}
                />
                <ToggleSetting
                  label="Compact Mode"
                  description="Reduce spacing for more content on screen"
                  checked={compactMode}
                  onChange={setCompactMode}
                />
                <ToggleSetting
                  label="Smooth Animations"
                  description="Enable transitions and micro-interactions"
                  checked={animationsEnabled}
                  onChange={setAnimationsEnabled}
                />
                <ToggleSetting
                  label="Show Timestamps"
                  description="Display time on each message"
                  checked={showTimestamps}
                  onChange={setShowTimestamps}
                />
              </SettingsSection>

              {/* Language & Region */}
              <SettingsSection icon={Globe} title="Language & Region" iconColor="bg-purple-500/20 text-purple-400">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                      <option value="japanese">Japanese</option>
                      <option value="chinese">Chinese</option>
                      <option value="arabic">Arabic</option>
                      <option value="hindi">Hindi</option>
                    </select>
                  </div>
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Timezone</label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                    >
                      <option value="America/Los_Angeles">Pacific Time</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="Europe/London">London</option>
                      <option value="Europe/Paris">Paris</option>
                      <option value="Asia/Tokyo">Tokyo</option>
                      <option value="Asia/Kolkata">India</option>
                    </select>
                  </div>
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Date Format</label>
                    <select
                      value={dateFormat}
                      onChange={(e) => setDateFormat(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Time Format</label>
                    <select
                      value={timeFormat}
                      onChange={(e) => setTimeFormat(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                    >
                      <option value="12h">12-hour (AM/PM)</option>
                      <option value="24h">24-hour</option>
                    </select>
                  </div>
                </div>
              </SettingsSection>

              {/* Notifications */}
              <SettingsSection icon={Bell} title="Notifications & Alerts" iconColor="bg-green-500/20 text-green-400">
                <ToggleSetting
                  label="Master Notifications"
                  description="Enable all notification types"
                  checked={notifications}
                  onChange={setNotifications}
                />
                <ToggleSetting
                  label="Email Notifications"
                  description="Receive updates via email"
                  checked={emailNotifications}
                  onChange={setEmailNotifications}
                  disabled={!notifications}
                />
                <ToggleSetting
                  label="Desktop Notifications"
                  description="Show browser notifications"
                  checked={desktopNotifications}
                  onChange={setDesktopNotifications}
                  disabled={!notifications}
                />
                <ToggleSetting
                  label="Mobile Push Notifications"
                  description="Receive notifications on mobile devices"
                  checked={mobileNotifications}
                  onChange={setMobileNotifications}
                  disabled={!notifications}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Notification Sound</label>
                    <select
                      value={notificationSound}
                      onChange={(e) => setNotificationSound(e.target.value)}
                      disabled={!notifications}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all disabled:opacity-50"
                    >
                      <option value="default">Default</option>
                      <option value="chime">Chime</option>
                      <option value="bell">Bell</option>
                      <option value="subtle">Subtle</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>

                <ToggleSetting
                  label="Vibration"
                  description="Vibrate on new notifications"
                  checked={vibrationEnabled}
                  onChange={setVibrationEnabled}
                  disabled={!notifications}
                />
                
                <ToggleSetting
                  label="Do Not Disturb Mode"
                  description="Mute notifications during specific hours"
                  checked={doNotDisturb}
                  onChange={setDoNotDisturb}
                />
                
                {doNotDisturb && (
                  <div className="grid grid-cols-2 gap-4 bg-slate-800/30 border border-white/5 rounded-xl p-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">Start Time</label>
                      <input
                        type="time"
                        value={dndStartTime}
                        onChange={(e) => setDndStartTime(e.target.value)}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">End Time</label>
                      <input
                        type="time"
                        value={dndEndTime}
                        onChange={(e) => setDndEndTime(e.target.value)}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                  </div>
                )}
              </SettingsSection>

              {/* AI Behavior */}
              <SettingsSection icon={Sparkles} title="AI Behavior & Preferences" iconColor="bg-yellow-500/20 text-yellow-400">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">AI Personality</label>
                    <select
                      value={aiPersonality}
                      onChange={(e) => setAiPersonality(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                    >
                      <option value="professional">Professional</option>
                      <option value="friendly">Friendly</option>
                      <option value="concise">Concise</option>
                      <option value="creative">Creative</option>
                      <option value="technical">Technical</option>
                    </select>
                  </div>
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Response Length</label>
                    <select
                      value={responseLength}
                      onChange={(e) => setResponseLength(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                    >
                      <option value="concise">Concise</option>
                      <option value="balanced">Balanced</option>
                      <option value="detailed">Detailed</option>
                      <option value="comprehensive">Comprehensive</option>
                    </select>
                  </div>
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Creativity Level</label>
                    <select
                      value={creativityLevel}
                      onChange={(e) => setCreativityLevel(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                    >
                      <option value="conservative">Conservative</option>
                      <option value="balanced">Balanced</option>
                      <option value="creative">Creative</option>
                      <option value="experimental">Experimental</option>
                    </select>
                  </div>
                </div>

                <ToggleSetting
                  label="Enable Code Execution"
                  description="Allow AI to run code and perform computations"
                  checked={codeExecution}
                  onChange={setCodeExecution}
                />
                <ToggleSetting
                  label="Enable Web Search"
                  description="Let AI search the internet for current information"
                  checked={webSearch}
                  onChange={setWebSearch}
                />
                <ToggleSetting
                  label="Enable Image Generation"
                  description="Allow AI to create images and visualizations"
                  checked={imageGeneration}
                  onChange={setImageGeneration}
                />
                <ToggleSetting
                  label="Enable Data Analysis"
                  description="Advanced analytics and data processing capabilities"
                  checked={dataAnalysis}
                  onChange={setDataAnalysis}
                />
                <ToggleSetting
                  label="Suggest Follow-up Questions"
                  description="Show relevant follow-up prompts after responses"
                  checked={suggestFollowUps}
                  onChange={setSuggestFollowUps}
                />
                <ToggleSetting
                  label="Context Memory"
                  description="Remember conversation context across sessions"
                  checked={contextMemory}
                  onChange={setContextMemory}
                />
                <ToggleSetting
                  label="Auto-correct Inputs"
                  description="Automatically fix spelling and grammar in your messages"
                  checked={autoCorrect}
                  onChange={setAutoCorrect}
                />
              </SettingsSection>

              {/* Privacy & Security */}
              <SettingsSection icon={Shield} title="Privacy & Security" iconColor="bg-red-500/20 text-red-400">
                <ToggleSetting
                  label="Two-Factor Authentication"
                  description="Require 2FA code for account access"
                  checked={twoFactorAuth}
                  onChange={setTwoFactorAuth}
                />
                <ToggleSetting
                  label="Biometric Authentication"
                  description="Use fingerprint or face recognition"
                  checked={biometricAuth}
                  onChange={setBiometricAuth}
                />
                <ToggleSetting
                  label="Passwordless Login"
                  description="Sign in with magic links via email"
                  checked={passwordlessLogin}
                  onChange={setPasswordlessLogin}
                />
                
                <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Session Timeout</label>
                  <select
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="240">4 hours</option>
                    <option value="never">Never</option>
                  </select>
                </div>

                <ToggleSetting
                  label="End-to-End Encryption"
                  description="Encrypt all conversations and data"
                  checked={encryptionEnabled}
                  onChange={setEncryptionEnabled}
                />
                <ToggleSetting
                  label="Auto Logout on Inactivity"
                  description="Automatically sign out after timeout period"
                  checked={autoLogout}
                  onChange={setAutoLogout}
                />

                <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-blue-400" />
                        Active Sessions
                      </h4>
                      <p className="text-xs text-slate-400">Manage logged-in devices</p>
                    </div>
                    <button 
                      onClick={() => alert('Active sessions: 3 devices')}
                      className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 text-sm font-medium rounded-lg transition-all"
                    >
                      View All
                    </button>
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                        <Eye className="w-4 h-4 text-blue-400" />
                        Login History
                      </h4>
                      <p className="text-xs text-slate-400">View recent account access</p>
                    </div>
                    <button 
                      onClick={() => alert('Login history would display here')}
                      className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 text-sm font-medium rounded-lg transition-all"
                    >
                      View
                    </button>
                  </div>
                </div>
              </SettingsSection>

              {/* Data & Storage */}
              <SettingsSection icon={Database} title="Data & Storage" iconColor="bg-cyan-500/20 text-cyan-400">
                <ToggleSetting
                  label="Save Chat History"
                  description="Store conversations for future reference"
                  checked={saveHistory}
                  onChange={setSaveHistory}
                />
                <ToggleSetting
                  label="Auto-Save Drafts"
                  description="Automatically save unsent messages"
                  checked={autoSave}
                  onChange={setAutoSave}
                />
                <ToggleSetting
                  label="Automatic Backups"
                  description="Regular backups of your data"
                  checked={autoBackup}
                  onChange={setAutoBackup}
                />
                
                <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Backup Frequency</label>
                  <select
                    value={backupFrequency}
                    onChange={(e) => setBackupFrequency(e.target.value)}
                    disabled={!autoBackup}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all disabled:opacity-50"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <ToggleSetting
                  label="Cloud Sync"
                  description="Sync data across all your devices"
                  checked={cloudSync}
                  onChange={setCloudSync}
                />
                <ToggleSetting
                  label="Data Compression"
                  description="Reduce storage space usage"
                  checked={compressionEnabled}
                  onChange={setCompressionEnabled}
                />

                <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Cache Size Limit (MB)</label>
                  <input
                    type="number"
                    value={cacheSize}
                    onChange={(e) => setCacheSize(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                    min="100"
                    max="5000"
                  />
                  <p className="text-xs text-slate-400 mt-2">Current usage: 247 MB</p>
                </div>

                <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                        <Download className="w-4 h-4 text-blue-400" />
                        Download All Data
                      </h4>
                      <p className="text-xs text-slate-400">Export your complete data archive</p>
                    </div>
                    <button 
                      onClick={() => alert('Data export started')}
                      className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 text-sm font-medium rounded-lg transition-all"
                    >
                      Export
                    </button>
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                        <Trash2 className="w-4 h-4 text-red-400" />
                        Clear All Data
                      </h4>
                      <p className="text-xs text-slate-400">Permanently delete chat history and cache</p>
                    </div>
                    <button 
                      onClick={() => {
                        if (confirm('This will delete all your data. Continue?')) {
                          alert('Data cleared');
                        }
                      }}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 text-sm font-medium rounded-lg transition-all"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <ToggleSetting
                  label="Share Anonymous Usage Data"
                  description="Help improve Grux by sharing analytics"
                  checked={analyticsData}
                  onChange={setAnalyticsData}
                />
                <ToggleSetting
                  label="Allow Third-Party Access"
                  description="Enable integrations with external services"
                  checked={thirdPartyAccess}
                  onChange={setThirdPartyAccess}
                />
                <ToggleSetting
                  label="Location Tracking"
                  description="Use location for personalized results"
                  checked={locationTracking}
                  onChange={setLocationTracking}
                />
              </SettingsSection>

              {/* Accessibility */}
              <SettingsSection icon={Eye} title="Accessibility" iconColor="bg-orange-500/20 text-orange-400">
                <ToggleSetting
                  label="Screen Reader Support"
                  description="Optimize for screen reader navigation"
                  checked={screenReader}
                  onChange={setScreenReader}
                />
                <ToggleSetting
                  label="High Contrast Mode"
                  description="Increase contrast for better visibility"
                  checked={highContrast}
                  onChange={setHighContrast}
                />
                <ToggleSetting
                  label="Keyboard Navigation"
                  description="Full keyboard control support"
                  checked={keyboardNavigation}
                  onChange={setKeyboardNavigation}
                />
                <ToggleSetting
                  label="Text-to-Speech"
                  description="Read responses aloud"
                  checked={textToSpeech}
                  onChange={setTextToSpeech}
                />
                <ToggleSetting
                  label="Speech-to-Text"
                  description="Voice input for messages"
                  checked={speechToText}
                  onChange={setSpeechToText}
                />
                <ToggleSetting
                  label="Reduce Motion"
                  description="Minimize animations and transitions"
                  checked={reducedMotion}
                  onChange={setReducedMotion}
                />
                <ToggleSetting
                  label="Focus Indicators"
                  description="Show clear focus outlines"
                  checked={focusIndicators}
                  onChange={setFocusIndicators}
                />

                <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                        <Keyboard className="w-4 h-4 text-blue-400" />
                        Keyboard Shortcuts
                      </h4>
                      <p className="text-xs text-slate-400">View and customize shortcuts</p>
                    </div>
                    <button 
                      onClick={() => alert('Keyboard shortcuts reference')}
                      className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 text-sm font-medium rounded-lg transition-all"
                    >
                      View
                    </button>
                  </div>
                </div>
              </SettingsSection>

              {/* Advanced Settings */}
              <SettingsSection icon={Code} title="Advanced Settings" iconColor="bg-pink-500/20 text-pink-400">
                <ToggleSetting
                  label="Developer Mode"
                  description="Enable advanced developer features"
                  checked={developerMode}
                  onChange={setDeveloperMode}
                />
                <ToggleSetting
                  label="Beta Features"
                  description="Access experimental features early"
                  checked={betaFeatures}
                  onChange={setBetaFeatures}
                />
                <ToggleSetting
                  label="Experimental Features"
                  description="Try cutting-edge unstable features"
                  checked={experimentalFeatures}
                  onChange={setExperimentalFeatures}
                />
                <ToggleSetting
                  label="Debug Mode"
                  description="Show detailed error logs and diagnostics"
                  checked={debugMode}
                  onChange={setDebugMode}
                />
                <ToggleSetting
                  label="API Access"
                  description="Enable programmatic access to Grux"
                  checked={apiAccess}
                  onChange={setApiAccess}
                />
                <ToggleSetting
                  label="Webhook Integration"
                  description="Send events to external webhooks"
                  checked={webhooks}
                  onChange={setWebhooks}
                />
                <ToggleSetting
                  label="Custom AI Models"
                  description="Use your own fine-tuned models"
                  checked={customModels}
                  onChange={setCustomModels}
                />

                {apiAccess && (
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                          <Key className="w-4 h-4 text-blue-400" />
                          API Keys
                        </h4>
                        <p className="text-xs text-slate-400">Manage your API credentials</p>
                      </div>
                      <button 
                        onClick={() => alert('API key management')}
                        className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 text-sm font-medium rounded-lg transition-all"
                      >
                        Manage
                      </button>
                    </div>
                    <div className="bg-slate-900/50 border border-white/10 rounded-lg p-3">
                      <p className="text-xs text-slate-400 font-mono">sk-grux-••••••••••••••••••••••••</p>
                    </div>
                  </div>
                )}

                <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-blue-400" />
                        Reset All Settings
                      </h4>
                      <p className="text-xs text-slate-400">Restore default configuration</p>
                    </div>
                    <button 
                      onClick={() => {
                        if (confirm('Reset all settings to default values?')) {
                          alert('Settings reset to defaults');
                        }
                      }}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 text-sm font-medium rounded-lg transition-all"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </SettingsSection>

              {/* About & Help */}
              <SettingsSection icon={Info} title="About & Support" iconColor="bg-slate-500/20 text-slate-400">
                <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1">Version Information</h4>
                      <p className="text-xs text-slate-400">Grux AI Assistant v2.5.0</p>
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 text-green-400 text-xs font-medium rounded-full">
                      Up to date
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Last updated: October 30, 2025</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button className="bg-slate-800/50 border border-white/5 rounded-xl p-4 text-left hover:border-white/10 transition-all">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-blue-400" />
                      <div>
                        <h4 className="text-sm font-medium text-white mb-0.5">Help Center</h4>
                        <p className="text-xs text-slate-400">FAQs and guides</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 ml-auto" />
                    </div>
                  </button>

                  <button className="bg-slate-800/50 border border-white/5 rounded-xl p-4 text-left hover:border-white/10 transition-all">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-purple-400" />
                      <div>
                        <h4 className="text-sm font-medium text-white mb-0.5">Documentation</h4>
                        <p className="text-xs text-slate-400">Technical docs</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 ml-auto" />
                    </div>
                  </button>

                  <button className="bg-slate-800/50 border border-white/5 rounded-xl p-4 text-left hover:border-white/10 transition-all">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-green-400" />
                      <div>
                        <h4 className="text-sm font-medium text-white mb-0.5">Contact Support</h4>
                        <p className="text-xs text-slate-400">Get assistance</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 ml-auto" />
                    </div>
                  </button>

                  <button 
                    onClick={() => {
                      setShowSettings(false);
                      setIsLicenseModalOpen(true);
                    }}
                    className="bg-slate-800/50 border border-white/5 rounded-xl p-4 text-left hover:border-white/10 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-amber-400" />
                      <div>
                        <h4 className="text-sm font-medium text-white mb-0.5">License</h4>
                        <p className="text-xs text-slate-400">MIT License</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 ml-auto" />
                    </div>
                  </button>
                </div>

                <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-white/5 rounded-xl p-6 text-center">
                  <p className="text-sm text-slate-300 mb-2">Made with ❤️ by ANTIK MONDAL</p>
                  <p className="text-xs text-slate-500">© 2025 Grux AI. All rights reserved.</p>
                </div>
              </SettingsSection>

              {/* Account Management */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <Crown className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Subscription & Billing</h3>
                </div>
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-white/5 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Current Plan</p>
                      <p className="text-2xl font-bold text-white">Free Plan</p>
                    </div>
                    <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-400 text-sm font-medium rounded-full">
                      Active
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      setShowSettings(false);
                      setIsPricingModalOpen(true);
                    }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-medium rounded-lg transition-all shadow-lg shadow-amber-500/20"
                  >
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-slate-900/50">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">Changes are saved automatically</p>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-blue-500/20"
                >
                  Done
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
              <button 
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowProfile(true)}
                className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 ? (
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

      {/* Pricing Modal */}
      {isPricingModalOpen && (
        <PricingModal onClose={() => setIsPricingModalOpen(false)} />
      )}
    </div>
  );
};

export default GruxApp;
