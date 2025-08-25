import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GruxSidebar } from "@/components/GruxSidebar";
import { ChatInterface } from "@/components/ChatInterface";

interface ChatHistoryItem {
  id: string;
  message: string;
  timestamp: Date;
}

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([
    {
      id: "1",
      message: "Tell us about your capability",
      timestamp: new Date()
    },
    {
      id: "2", 
      message: "Tell us about your capability",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: "3",
      message: "Tell us about your capability", 
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: "4",
      message: "Tell us about your capability",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: "5",
      message: "Tell us about your capability",
      timestamp: new Date("2025-01-10")
    }
  ]);

  const handleSendMessage = (message: string) => {
    const newChat: ChatHistoryItem = {
      id: Date.now().toString(),
      message,
      timestamp: new Date()
    };
    setChatHistory(prev => [newChat, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--grux-main-bg))] relative overflow-hidden">
      {/* Sidebar */}
      <GruxSidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        chatHistory={chatHistory}
      />

      {/* Main Content */}
      <div className={`min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-80' : 'ml-0'}`}>
        {/* Header with Menu Toggle */}
        <div className="flex items-center justify-between p-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:bg-white/10"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6">
          {/* Grux Logo */}
          <div className="mb-16">
            <h1 className="text-6xl font-light text-white tracking-wider">
              Grux
            </h1>
          </div>

          {/* Welcome Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Welcome back <span className="text-[hsl(var(--grux-welcome-text))]">Grux!</span>
            </h2>
            <p className="text-xl text-gray-200">
              Which subject do you want to analyze today?
            </p>
          </div>

          {/* Chat Interface */}
          <ChatInterface onSendMessage={handleSendMessage} />
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
