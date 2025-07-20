
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { voiceText, tradeType } = await request.json()

    if (!voiceText || !voiceText.trim()) {
      return NextResponse.json(
        { error: 'Voice text is required' },
        { status: 400 }
      )
    }

    // Process voice input with LLM API
    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: `You are an AI assistant specialized in extracting structured quote information from voice input for Australian tradies. 

Extract the following information from the voice input and respond with clean JSON only:

{
  "clientName": "extracted client name or null",
  "clientEmail": "extracted email or null", 
  "clientPhone": "extracted phone or null",
  "jobTitle": "brief descriptive title for the job",
  "jobDescription": "detailed description of work required",
  "location": "job location/address",
  "tradeType": "CONCRETE|TILING|PAINTING|LANDSCAPING|PLUMBING|ELECTRICAL|CARPENTRY|GENERAL",
  "measurements": {
    "length": "number or null",
    "width": "number or null", 
    "area": "number or null",
    "unit": "meters|feet|sqm|sqft or null"
  },
  "materials": ["list of materials mentioned"],
  "specialRequirements": ["any special requirements or notes"],
  "urgency": "URGENT|STANDARD|FLEXIBLE",
  "estimatedHours": "estimated work hours if mentioned or null",
  "additionalNotes": "any other relevant information"
}

Respond with raw JSON only. Do not include code blocks, markdown, or any other formatting.`
          },
          {
            role: 'user',
            content: `Please extract quote information from this voice input: "${voiceText}"`
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1500,
        temperature: 0.1
      }),
    })

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.status}`)
    }

    const data = await response.json()
    const extractedInfo = JSON.parse(data.choices[0].message.content)

    // Add some processing metadata
    const processedResult = {
      ...extractedInfo,
      originalText: voiceText,
      processedAt: new Date().toISOString(),
      confidence: 'high' // Could be determined by LLM in future
    }

    return NextResponse.json(processedResult)

  } catch (error) {
    console.error('Voice processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process voice input' },
      { status: 500 }
    )
  }
}
