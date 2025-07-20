
'use client'

import { useState } from 'react'
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

  const handleStartRecording = () => {
    setIsRecording(true)
    // Here would be the actual voice recording logic
    setTimeout(() => {
      setIsRecording(false)
      setCurrentStep(2)
    }, 3000) // Mock recording for 3 seconds
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

                  {isRecording ? (
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">Recording...</h3>
                      <p className="text-blue-700 mb-4">Listening to your voice input</p>
                      <div className="flex justify-center">
                        <Button 
                          onClick={() => setIsRecording(false)}
                          variant="outline"
                          className="border-blue-300"
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
                      <div className="space-y-3">
                        <Button 
                          onClick={handleStartRecording}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Mic className="h-4 w-4 mr-2" />
                          Start Recording
                        </Button>
                        <div className="text-sm text-blue-600">
                          Example: "I need a quote for a 6 by 4 meter concrete slab for Sarah Johnson's backyard in Melbourne"
                        </div>
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
