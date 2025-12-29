import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pbusdbddqhhhaotfvowb.supabase.co'
const supabaseKey = Deno.env.get('SUPABASE_KEY') // Retrieve Supabase key from environment variables
const supabase = createClient(supabaseUrl, supabaseKey)

// Allow the frontend origin to be configurable via an environment variable.
// Fallback to '*' for development/testing, but recommend a specific origin for production.
const allowedOrigin = Deno.env.get('FRONTEND_ORIGIN') || '*'

const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigin,
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
      throw new Error('OpenAI API key not configured')
    }

    // --- Start Prompt Injection Mitigation and Structured Prompting ---
    // Define a clear system prompt for the AI's persona and instructions.
    const systemPrompt = "You are Grux, a helpful AI assistant. Provide clear, concise, and helpful responses to user questions. Avoid unnecessary conversational filler and get straight to the point."

    // Wrap the user's message with clear delimiters to prevent it from being misinterpreted as instructions.
    let userContent = `User message:\n---\n${message}\n---`;

    // If files metadata is present, include it explicitly as part of the user's context, also with delimiters.
    if (files && files.length > 0) {
      const fileContext = files.map((file: any) => `* ${file.name}`).join('\n');
      userContent += `\n\nAttached files metadata:\n---\n${fileContext}\n---`;
    }

    // Construct the messages array with distinct roles and clearly separated content.
    const messages = [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: userContent
      }
    ]
    // --- End Prompt Injection Mitigation and Structured Prompting ---

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o', // Updated to a valid and recent OpenAI model (e.g., gpt-4o)
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`OpenAI API error: ${error}`)
    }

    const data = await response.json()
    const assistantMessage = data.choices[0]?.message?.content

    if (!assistantMessage) {
      throw new Error('No response from OpenAI')
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
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
