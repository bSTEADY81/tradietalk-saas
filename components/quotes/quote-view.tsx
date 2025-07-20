
'use client'

import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Edit, 
  Download, 
  Send, 
  Copy,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'

interface QuoteViewProps {
  session: any
  quoteId: string
}

export function QuoteView({ session, quoteId }: QuoteViewProps) {
  // Mock data - in real app, this would come from API
  const quote = {
    id: quoteId,
    quoteNumber: 'QUO-001',
    jobTitle: 'Backyard Concrete Slab',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@example.com',
    clientPhone: '+61 400 987 654',
    clientAddress: '456 Client Street, Melbourne VIC 3000',
    tradeType: 'CONCRETE',
    measurements: {
      length: 6,
      width: 4,
      thickness: 0.1,
    },
    baseRate: 85.0,
    area: 24.0,
    baseCost: 2040.0,
    markupPercentage: 25.0,
    markupAmount: 510.0,
    extras: [
      { name: 'Exposed aggregate finish', cost: 300.0 },
      { name: 'Extra reinforcement', cost: 150.0 },
    ],
    subtotal: 3000.0,
    gstAmount: 300.0,
    totalAmount: 3300.0,
    notes: 'Client wants exposed aggregate finish with decorative border.',
    status: 'DRAFT',
    createdAt: '2024-01-15',
    validUntil: '2024-02-15'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DRAFT': return <Clock className="h-4 w-4" />
      case 'SENT': return <Send className="h-4 w-4" />
      case 'ACCEPTED': return <CheckCircle className="h-4 w-4" />
      case 'REJECTED': return <XCircle className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT': return 'bg-gray-100 text-gray-800'
      case 'SENT': return 'bg-blue-100 text-blue-800'
      case 'ACCEPTED': return 'bg-green-100 text-green-800'
      case 'REJECTED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader session={session} />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/quotes">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Quotes
              </Button>
            </Link>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{quote.quoteNumber}</h1>
              <p className="text-gray-600">{quote.jobTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(quote.status)}>
              {getStatusIcon(quote.status)}
              <span className="ml-1">{quote.status}</span>
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Quote Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Client Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Client Name</label>
                    <p className="text-gray-900">{quote.clientName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {quote.clientEmail}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {quote.clientPhone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="text-gray-900 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {quote.clientAddress}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Trade Type</label>
                    <p className="text-gray-900">{quote.tradeType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Area</label>
                    <p className="text-gray-900">{quote.area} m²</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Dimensions</label>
                    <p className="text-gray-900">
                      {quote.measurements.length}m × {quote.measurements.width}m × {quote.measurements.thickness}m
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Rate</label>
                    <p className="text-gray-900">${quote.baseRate}/m²</p>
                  </div>
                </div>
                
                {quote.notes && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Notes</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{quote.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pricing Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  Pricing Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Base Cost ({quote.area} m² × ${quote.baseRate})</span>
                    <span>${quote.baseCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Markup ({quote.markupPercentage}%)</span>
                    <span>${quote.markupAmount.toLocaleString()}</span>
                  </div>
                  
                  {quote.extras.map((extra, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{extra.name}</span>
                      <span>${extra.cost.toLocaleString()}</span>
                    </div>
                  ))}
                  
                  <hr className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Subtotal</span>
                    <span>${quote.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (10%)</span>
                    <span>${quote.gstAmount.toLocaleString()}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total Amount</span>
                    <span>${quote.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions & Info Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/dashboard/quotes/${quote.id}/edit`} className="block">
                  <Button className="w-full" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Quote
                  </Button>
                </Link>
                
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4 mr-2" />
                  Send to Client
                </Button>
                
                <Button className="w-full" variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Quote
                </Button>
              </CardContent>
            </Card>

            {/* Quote Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quote Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Created</span>
                  <span className="text-sm">{quote.createdAt}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Valid Until</span>
                  <span className="text-sm">{quote.validUntil}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <Badge className={getStatusColor(quote.status)} variant="outline">
                    {quote.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
