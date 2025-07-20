
'use client'

import { useState, useEffect, useRef } from 'react'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Mic, 
  Plus, 
  FileText, 
  Camera,
  ArrowLeft,
  ArrowRight,
  Volume2,
  VolumeX,
  Play,
  Square
} from 'lucide-react'
import Link from 'next/link'

interface QuoteCreationWizardProps {
  session: any
  method?: string
}

export function QuoteCreationWizard({ session, method = 'voice' }: QuoteCreationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isRecording, setIsRecording] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(method)
  const [transcript, setTranscript] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [recordingError, setRecordingError] = useState('')
  const recognitionRef = useRef<any>(null)

  const methods = [
    {
      id: 'voice',
      title: 'Voice Recording',
      description: 'Speak your quote details',
      icon: Mic,
      color: 'bg-blue-500 hover:bg-blue-600',
      featured: true
    },
    {
      id: 'manual',
      title: 'Manual Entry',
      description: 'Type quote details',
      icon: Plus,
      color: 'bg-green-500 hover:bg-green-600',
      featured: false
    },
    {
      id: 'template',
      title: 'From Template',
      description: 'Use existing template',
      icon: FileText,
      color: 'bg-purple-500 hover:bg-purple-600',
      featured: false
    },
    {
      id: 'photo',
      title: 'Photo First',
      description: 'Add photos then details',
      icon: Camera,
      color: 'bg-orange-500 hover:bg-orange-600',
      featured: false
    }
  ]

  const steps = [
    { id: 1, title: 'Method', description: 'Choose input method' },
    { id: 2, title: 'Details', description: 'Job information' },
    { id: 3, title: 'Calculations', description: 'Pricing & measurements' },
    { id: 4, title: 'Review', description: 'Final review' }
  ]

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      
      if (SpeechRecognition) {
        setSpeechSupported(true)
        const recognition = new SpeechRecognition()
        
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'en-AU' // Australian English for tradies
        recognition.maxAlternatives = 1
        
        recognition.onstart = () => {
          console.log('Speech recognition started')
          setRecordingError('')
        }
        
        recognition.onresult = (event: any) => {
          let finalTranscript = ''
          let interimTranscript = ''
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' '
            } else {
              interimTranscript += transcript
            }
          }
          
          setTranscript(finalTranscript + interimTranscript)
        }
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setRecordingError(`Speech recognition error: ${event.error}`)
          setIsRecording(false)
          setIsProcessing(false)
        }
        
        recognition.onend = () => {
          console.log('Speech recognition ended')
          setIsRecording(false)
          if (transcript.trim()) {
            setIsProcessing(true)
            processVoiceInput(transcript)
          }
        }
        
        recognitionRef.current = recognition
      } else {
        setSpeechSupported(false)
        console.warn('Speech recognition not supported in this browser')
      }
    }
  }, [])

  // Check microphone permissions
  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach(track => track.stop()) // Stop the stream immediately
      setPermissionGranted(true)
      return true
    } catch (error) {
      console.error('Microphone permission denied:', error)
      setRecordingError('Microphone access is required for voice recording')
      setPermissionGranted(false)
      return false
    }
  }

  // Process voice input using LLM API
  const processVoiceInput = async (voiceText: string) => {
    try {
      const response = await fetch('/api/voice/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          voiceText,
          tradeType: 'GENERAL' // Can be determined from context later
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to process voice input')
      }

      const data = await response.json()
      console.log('Processed voice data:', data)
      
      // Move to next step with processed data
      setIsProcessing(false)
      setCurrentStep(3) // Skip to calculations step with extracted data
      
    } catch (error) {
      console.error('Error processing voice input:', error)
      setRecordingError('Failed to process voice input. Please try again.')
      setIsProcessing(false)
    }
  }

  const handleStartRecording = async () => {
    if (!speechSupported) {
      setRecordingError('Speech recognition is not supported in this browser')
      return
    }

    const hasPermission = await checkMicrophonePermission()
    if (!hasPermission) {
      return
    }

    setIsRecording(true)
    setTranscript('')
    setRecordingError('')
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Failed to start speech recognition:', error)
        setRecordingError('Failed to start voice recording')
        setIsRecording(false)
      }
    }
  }

  const handleStopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop()
    }
    setIsRecording(false)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">How would you like to create your quote?</h2>
              <p className="text-gray-600">Choose the method that works best for you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {methods.map((method) => (
                <Button
                  key={method.id}
                  variant={selectedMethod === method.id ? "default" : "outline"}
                  className={`h-32 flex flex-col gap-3 ${
                    selectedMethod === method.id ? method.color : ''
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <method.icon className="h-8 w-8" />
                  <div className="text-center">
                    <div className="font-medium text-base">{method.title}</div>
                    <div className="text-sm opacity-80">{method.description}</div>
                  </div>
                  {method.featured && (
                    <Badge className="absolute top-2 right-2 bg-orange-500">Recommended</Badge>
                  )}
                </Button>
              ))}
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={() => {
                  if (selectedMethod === 'voice') {
                    handleStartRecording()
                  } else {
                    setCurrentStep(2)
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!selectedMethod}
              >
                {selectedMethod === 'voice' ? 'Start Recording' : 'Continue'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 2:
        if (selectedMethod === 'voice') {
          return (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Voice Recording</h2>
                <p className="text-gray-600">Speak clearly about your job requirements</p>
              </div>

              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-8 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-blue-600 rounded-full flex items-center justify-center">
                    {isRecording ? (
                      <div className="animate-pulse">
                        <Mic className="h-16 w-16 text-white" />
                      </div>
                    ) : (
                      <Volume2 className="h-16 w-16 text-white" />
                    )}
                  </div>

                  {isProcessing ? (
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">Processing...</h3>
                      <p className="text-blue-700 mb-4">Analyzing your voice input using AI</p>
                      <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                      {transcript && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border">
                          <p className="text-sm text-blue-800 font-medium mb-1">What you said:</p>
                          <p className="text-blue-700 italic">"{transcript}"</p>
                        </div>
                      )}
                    </div>
                  ) : isRecording ? (
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">Recording...</h3>
                      <p className="text-blue-700 mb-4">Speak clearly about your job requirements</p>
                      
                      {/* Real-time transcript display */}
                      {transcript && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg border">
                          <p className="text-sm text-blue-800 font-medium mb-1">Live transcript:</p>
                          <p className="text-blue-700">{transcript}</p>
                        </div>
                      )}
                      
                      <div className="flex justify-center space-x-3">
                        <Button 
                          onClick={handleStopRecording}
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Square className="h-4 w-4 mr-2" />
                          Stop Recording
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">Ready to Record</h3>
                      <p className="text-blue-700 mb-6">
                        Tell me about the job: location, type of work, measurements, and any special requirements.
                      </p>
                      
                      {/* Error messages */}
                      {recordingError && (
                        <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-red-700 text-sm">{recordingError}</p>
                        </div>
                      )}
                      
                      {/* Browser compatibility warning */}
                      {!speechSupported && (
                        <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <p className="text-amber-700 text-sm">
                            Voice recording is not supported in this browser. Please use Chrome, Edge, or Safari for voice features.
                          </p>
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        <Button 
                          onClick={handleStartRecording}
                          className="bg-blue-600 hover:bg-blue-700"
                          disabled={!speechSupported}
                        >
                          <Mic className="h-4 w-4 mr-2" />
                          {speechSupported ? 'Start Recording' : 'Recording Unavailable'}
                        </Button>
                        
                        {speechSupported && (
                          <div className="text-sm text-blue-600">
                            Example: "I need a quote for a 6 by 4 meter concrete slab for Sarah Johnson's backyard in Melbourne"
                          </div>
                        )}
                        
                        {!speechSupported && (
                          <div className="space-y-2">
                            <Button 
                              onClick={() => setSelectedMethod('manual')}
                              variant="outline"
                              className="w-full"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Use Manual Entry Instead
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )
        } else {
          return (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Manual Quote Entry</h2>
                <p className="text-gray-600">This feature will be available soon</p>
              </div>
              
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-gray-500 mb-4">
                    <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
                    <p>Manual quote entry will be available in the next update.</p>
                  </div>
                  
                  <Button onClick={() => setSelectedMethod('voice')} variant="outline">
                    Try Voice Recording Instead
                  </Button>
                </CardContent>
              </Card>
            </div>
          )
        }

      default:
        return (
          <div className="text-center py-8">
            <h3 className="text-xl font-medium mb-2">Feature in Development</h3>
            <p className="text-gray-600 mb-4">This step is being built and will be available soon.</p>
            <Link href="/dashboard/quotes">
              <Button>Back to Quotes</Button>
            </Link>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader session={session} />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard/quotes">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Quotes
            </Button>
          </Link>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Quote</h1>
            <p className="text-gray-600">AI-powered quote creation</p>
          </div>
        </div>

        {/* Progress Steps */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    currentStep >= step.id 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-gray-300 text-gray-500'
                  }`}>
                    {step.id}
                  </div>
                  <div className="ml-2 hidden sm:block">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card>
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
