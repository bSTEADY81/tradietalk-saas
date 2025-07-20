
'use client'

import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Save,
  FileText
} from 'lucide-react'
import Link from 'next/link'

interface QuoteEditFormProps {
  session: any
  quoteId: string
}

export function QuoteEditForm({ session, quoteId }: QuoteEditFormProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader session={session} />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href={`/dashboard/quotes/${quoteId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Quote
              </Button>
            </Link>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Quote</h1>
              <p className="text-gray-600">QUO-{quoteId.padStart(3, '0')}</p>
            </div>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Coming Soon */}
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500 mb-4">
              <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium mb-2">Edit Quote Feature</h3>
              <p className="mb-4">
                Quote editing functionality is currently being developed and will be available soon.
              </p>
              <p className="text-sm">
                This will include inline editing of all quote details, pricing calculations, and client information.
              </p>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Link href={`/dashboard/quotes/${quoteId}`}>
                <Button variant="outline">
                  Back to Quote View
                </Button>
              </Link>
              <Link href="/dashboard/quotes/new">
                <Button>
                  Create New Quote Instead
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
