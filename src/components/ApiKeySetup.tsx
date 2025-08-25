import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const ApiKeySetup = () => {
  const openSupabaseSecrets = () => {
    // This would open the Supabase dashboard to set up secrets
    window.open('https://supabase.com/dashboard', '_blank');
  };

  return (
    <Alert className="mb-6 bg-[hsl(var(--grux-input-bg))] border-[hsl(var(--grux-input-border))] text-gray-200">
      <AlertDescription className="flex items-center justify-between">
        <span>
          To enable ChatGPT responses, add your OpenAI API key to Supabase Edge Function Secrets as 'OPENAI_API_KEY'
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={openSupabaseSecrets}
          className="ml-4 bg-transparent border-[hsl(var(--accent))] text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))] hover:text-white"
        >
          Setup API Key
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};