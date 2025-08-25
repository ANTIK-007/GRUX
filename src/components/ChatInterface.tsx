import { useState, useRef } from "react";
import { Send, Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useChat } from "@/hooks/useChat";
import { ApiKeySetup } from "@/components/ApiKeySetup";
import { motion, AnimatePresence } from "framer-motion";

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
}

export const ChatInterface = ({ onSendMessage }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { messages, isLoading, sendMessage } = useChat();

  const handleFileAttachment = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
    toast({
      title: "Files attached",
      description: `${files.length} file(s) attached successfully.`,
    });
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && attachedFiles.length === 0) return;

    try {
      await sendMessage(message, attachedFiles);
      onSendMessage(message);
      setMessage("");
      setAttachedFiles([]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* API Key Setup Notice */}
      <ApiKeySetup />

      {/* Chat Messages Display */}
      {messages.length > 0 && (
        <div className="max-h-96 overflow-y-auto space-y-4 p-4 bg-[hsl(var(--grux-input-bg))] border border-[hsl(var(--grux-input-border))] rounded-2xl">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <motion.div
                  className={`max-w-[80%] p-3 rounded-lg shadow-lg ${
                    msg.role === 'user'
                      ? 'bg-[hsl(var(--accent))] text-white'
                      : 'bg-[hsl(var(--grux-sidebar-item-hover))] text-gray-200'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  {msg.files && msg.files.length > 0 && (
                    <div className="mt-2 text-xs opacity-75">
                      Files: {msg.files.map(f => f.name).join(', ')}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-[hsl(var(--grux-sidebar-item-hover))] text-gray-200 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} />
                  <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} />
                  <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Attached Files Display */}
      <AnimatePresence>
        {attachedFiles.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {attachedFiles.map((file, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 bg-[hsl(var(--grux-input-bg))] border border-[hsl(var(--grux-input-border))] rounded-lg px-3 py-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="text-sm text-gray-300 truncate max-w-[200px]">
                  {file.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="h-4 w-4 p-0 text-gray-400 hover:text-red-400"
                >
                  <motion.span whileTap={{ rotate: 90 }}>
                    <X className="w-3 h-3" />
                  </motion.span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Search Input */}
      <form onSubmit={handleSubmit} className="relative">
        <motion.div
          className="relative"
          initial={false}
          animate={message ? { boxShadow: "0 0 0 3px hsl(var(--accent)/0.3)" } : { boxShadow: "none" }}
          transition={{ duration: 0.2 }}
        >
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message Grux..."
            className="w-full h-16 px-6 text-lg bg-[hsl(var(--grux-input-bg))] border-2 border-[hsl(var(--grux-input-border))] rounded-2xl text-white placeholder:text-gray-400 focus:border-[hsl(var(--accent))] transition-colors"
            disabled={isLoading}
            style={{ transition: "box-shadow 0.2s" }}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,text/*,.pdf,.doc,.docx"
            />
            <motion.div whileTap={{ scale: 0.85 }} whileHover={{ scale: 1.15 }}>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleFileAttachment}
                className="text-gray-400 hover:text-white"
              >
                <Paperclip className="w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ rotate: 20 }} whileTap={{ scale: 0.9 }}>
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
                disabled={isLoading || (!message.trim() && attachedFiles.length === 0)}
              >
                <Send className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </form>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          "Analyze data",
          "Write code",
          "Explain concept",
          "Generate ideas"
        ].map((action, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.07, boxShadow: "0 4px 16px hsl(var(--accent)/0.15)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Button
              variant="outline"
              className="h-12 bg-[hsl(var(--grux-input-bg))] border-[hsl(var(--grux-input-border))] text-gray-300 hover:bg-[hsl(var(--grux-sidebar-item-hover))] hover:text-white rounded-xl transition-all"
              onClick={() => setMessage(action)}
            >
              {action}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};