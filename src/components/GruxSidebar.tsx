import { X, MoreHorizontal, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHistoryItem {
  id: string;
  message: string;
  timestamp: Date;
}

interface GruxSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chatHistory: ChatHistoryItem[];
}

export const GruxSidebar = ({ isOpen, onClose, chatHistory }: GruxSidebarProps) => {
  const groupChatsByTime = (chats: ChatHistoryItem[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return {
      today: chats.filter(chat => chat.timestamp >= today),
      yesterday: chats.filter(chat => chat.timestamp >= yesterday && chat.timestamp < today),
      last3Days: chats.filter(chat => chat.timestamp >= threeDaysAgo && chat.timestamp < yesterday),
      last7Days: chats.filter(chat => chat.timestamp >= sevenDaysAgo && chat.timestamp < threeDaysAgo),
      older: chats.filter(chat => chat.timestamp < sevenDaysAgo)
    };
  };

  const grouped = groupChatsByTime(chatHistory);

  const renderChatGroup = (title: string, chats: ChatHistoryItem[]) => {
    if (chats.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium text-sidebar-foreground mb-3">{title}</h3>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center justify-between p-3 mb-2 rounded-lg bg-[hsl(var(--grux-sidebar-item))] hover:bg-[hsl(var(--grux-sidebar-item-hover))] cursor-pointer transition-colors"
          >
            <span className="text-sm text-sidebar-foreground truncate flex-1 mr-2">
              {chat.message}
            </span>
            <MoreHorizontal className="w-4 h-4 text-sidebar-foreground opacity-50" />
          </div>
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-[hsl(var(--grux-sidebar))] text-sidebar-foreground z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
        <h2 className="text-lg font-semibold">History</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-sidebar-foreground hover:bg-[hsl(var(--grux-sidebar-item))]"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Chat History */}
      <div className="flex-1 p-6 overflow-y-auto">
        {renderChatGroup("Today", grouped.today)}
        {renderChatGroup("Yesterday", grouped.yesterday)}
        {renderChatGroup("Last 3 Days", grouped.last3Days)}
        {renderChatGroup("Last 7 Days", grouped.last7Days)}
        {grouped.older.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-sidebar-foreground mb-3">10.01.2025</h3>
            {grouped.older.slice(0, 1).map((chat) => (
              <div
                key={chat.id}
                className="flex items-center justify-between p-3 mb-2 rounded-lg bg-[hsl(var(--grux-sidebar-item))] hover:bg-[hsl(var(--grux-sidebar-item-hover))] cursor-pointer transition-colors"
              >
                <span className="text-sm text-sidebar-foreground truncate flex-1 mr-2">
                  {chat.message}
                </span>
                <MoreHorizontal className="w-4 h-4 text-sidebar-foreground opacity-50" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subscription Section */}
      <div className="p-6 border-t border-sidebar-border">
        <div className="bg-[hsl(var(--grux-input-bg))] rounded-lg p-4 border border-[hsl(var(--grux-input-border))]">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[hsl(var(--grux-input-border))] rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-sidebar-foreground leading-relaxed">
                <span className="font-semibold">Purchase</span><br />
                a subscription to unlock<br />
                over 15 new features
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-sidebar-foreground hover:bg-[hsl(var(--grux-sidebar-item))] p-1"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};