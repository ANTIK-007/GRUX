import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

// Removed Supabase client import and initialization as it was not used in this function.
// If Supabase database or storage interaction is needed in the future, re-add it with proper Deno.env.get() for secrets.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Consider restricting this to specific origins in production
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, files } = await req.json()
    
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    
    if (!openaiApiKey) {
      // SECURITY FIX: More specific error message for API key configuration
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Server-side configuration error: OpenAI API key is missing.' 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        },
      )
    }

    // Prepare messages for OpenAI
    const messages = [
      {
        role: "system",
        content: "You are Grux, a helpful AI assistant. Provide clear, concise, and helpful responses to user questions."
      },
      {
        role: "user",
        content: message
      }
    ]

    // Add file context if files are attached.
    // NOTE: This currently only sends file *names* to the LLM, not actual file content.
    // For processing file content (e.g., images, documents), a more advanced setup
    // involving file uploads to storage and a vision-capable LLM would be required.
    if (files && files.length > 0) {
      const fileContext = files.map((file: any) => `File: ${file.name}`).join(', ')
      messages[1].content = `${message}\n\nAttached files: ${fileContext}`
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o', // FUNCTIONAL FIX: Updated to a valid and modern OpenAI model.
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API raw error:', errorText); // Log detailed error server-side
      // SECURITY FIX: Do not leak raw external API errors to the client
      throw new Error(`Failed to get a valid response from the AI service. Status: ${response.status}.`);
    }

    const data = await response.json()
    const assistantMessage = data.choices[0]?.message?.content

    if (!assistantMessage) {
      throw new Error('The AI service did not return a message or message content was empty.') // More specific error
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: assistantMessage,
        usage: data.usage 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in chat-completion function:', error)
    // SECURITY FIX: Generic error message to prevent leaking internal server details
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    // For a production system, consider a generic "An unexpected server error occurred."
    // or log a specific error ID for debugging without exposing internal details.
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Internal server error: ${errorMessage}` 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})