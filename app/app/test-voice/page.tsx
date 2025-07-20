
'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Mic, 
  Volume2,
  Square
} from 'lucide-react'

export default function TestVoicePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [recordingError, setRecordingError] = useState('')
  const [processedData, setProcessedData] = useState<any>(null)
  const recognitionRef = useRef<any>(null)

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
          tradeType: 'GENERAL'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to process voice input')
      }

      const data = await response.json()
      console.log('Processed voice data:', data)
      setProcessedData(data)
      setIsProcessing(false)
      
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
    setProcessedData(null)
    
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Voice Recording Test</h1>
          <p className="text-gray-600">Testing TradieTalk voice recording functionality</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-blue-600" />
              Voice Recording Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Badge variant={speechSupported ? "default" : "destructive"}>
                  Speech API: {speechSupported ? "Supported" : "Not Supported"}
                </Badge>
              </div>
              <div className="text-center">
                <Badge variant={permissionGranted ? "default" : "secondary"}>
                  Microphone: {permissionGranted ? "Granted" : "Not Checked"}
                </Badge>
              </div>
              <div className="text-center">
                <Badge variant={isRecording ? "default" : isProcessing ? "secondary" : "outline"}>
                  Status: {isRecording ? "Recording" : isProcessing ? "Processing" : "Ready"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
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
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Display processed data */}
        {processedData && (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">✅ Voice Input Processed Successfully!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Client Information:</h4>
                  <p><strong>Name:</strong> {processedData.clientName || 'Not provided'}</p>
                  <p><strong>Email:</strong> {processedData.clientEmail || 'Not provided'}</p>
                  <p><strong>Phone:</strong> {processedData.clientPhone || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Job Details:</h4>
                  <p><strong>Title:</strong> {processedData.jobTitle}</p>
                  <p><strong>Trade:</strong> {processedData.tradeType}</p>
                  <p><strong>Location:</strong> {processedData.location || 'Not specified'}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-semibold mb-2">Description:</h4>
                  <p className="text-gray-700">{processedData.jobDescription}</p>
                </div>
                {processedData.measurements && (
                  <div>
                    <h4 className="font-semibold mb-2">Measurements:</h4>
                    <p><strong>Length:</strong> {processedData.measurements.length || 'N/A'}</p>
                    <p><strong>Width:</strong> {processedData.measurements.width || 'N/A'}</p>
                    <p><strong>Area:</strong> {processedData.measurements.area || 'N/A'}</p>
                  </div>
                )}
                {processedData.materials && processedData.materials.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Materials:</h4>
                    <ul className="list-disc list-inside">
                      {processedData.materials.map((material: string, index: number) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Original transcript:</strong> "{processedData.originalText}"
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
