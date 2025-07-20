
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Eye, 
  Edit,
  MoreHorizontal,
  Clock,
  CheckCircle,
  XCircle,
  Send
} from 'lucide-react'
import Link from 'next/link'

export function RecentQuotes() {
  // Mock data - in real app, this would come from API
  const quotes = [
    {
      id: '1',
      quoteNumber: 'QUO-001',
      jobTitle: 'Backyard Concrete Slab',
      clientName: 'Sarah Johnson',
      totalAmount: 3300,
      status: 'DRAFT',
      createdAt: '2 hours ago',
      tradeType: 'CONCRETE'
    },
    {
      id: '2',
      quoteNumber: 'QUO-002',
      jobTitle: 'Bathroom Tiling',
      clientName: 'Mike Wilson',
      totalAmount: 2850,
      status: 'SENT',
      createdAt: '1 day ago',
      tradeType: 'TILING'
    },
    {
      id: '3',
      quoteNumber: 'QUO-003',
      jobTitle: 'House Painting',
      clientName: 'Lisa Chen',
      totalAmount: 4200,
      status: 'ACCEPTED',
      createdAt: '3 days ago',
      tradeType: 'PAINTING'
    }
  ]

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

  const getTradeColor = (tradeType: string) => {
    switch (tradeType) {
      case 'CONCRETE': return 'bg-stone-100 text-stone-800'
      case 'TILING': return 'bg-cyan-100 text-cyan-800'
      case 'PAINTING': return 'bg-yellow-100 text-yellow-800'
      case 'LANDSCAPING': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Recent Quotes
            </CardTitle>
            <CardDescription>
              Your latest quotes and their status
            </CardDescription>
          </div>
          <Link href="/dashboard/quotes">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {quotes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No quotes yet. Create your first quote to get started!</p>
            <Link href="/dashboard/quotes/new" className="mt-4 inline-block">
              <Button>Create Quote</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {quotes.map((quote) => (
              <div key={quote.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={getTradeColor(quote.tradeType)}>
                      {quote.tradeType}
                    </Badge>
                    <Badge className={getStatusColor(quote.status)}>
                      {getStatusIcon(quote.status)}
                      <span className="ml-1">{quote.status}</span>
                    </Badge>
                  </div>
                  
                  <h3 className="font-medium text-gray-900 truncate">
                    {quote.quoteNumber} - {quote.jobTitle}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600">
                      {quote.clientName} • {quote.createdAt}
                    </p>
                    <p className="font-semibold text-gray-900">
                      ${quote.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Link href={`/dashboard/quotes/${quote.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/dashboard/quotes/${quote.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
