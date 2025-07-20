
'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Search, 
  Eye, 
  Edit,
  FileText,
  Filter,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  Send
} from 'lucide-react'
import Link from 'next/link'

interface QuotesContentProps {
  session: any
}

export function QuotesContent({ session }: QuotesContentProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Mock data - in real app, this would come from API
  const quotes = [
    {
      id: '1',
      quoteNumber: 'QUO-001',
      jobTitle: 'Backyard Concrete Slab',
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah@example.com',
      totalAmount: 3300,
      status: 'DRAFT',
      createdAt: '2024-01-15',
      tradeType: 'CONCRETE'
    },
    {
      id: '2',
      quoteNumber: 'QUO-002',
      jobTitle: 'Bathroom Tiling',
      clientName: 'Mike Wilson',
      clientEmail: 'mike@example.com',
      totalAmount: 2850,
      status: 'SENT',
      createdAt: '2024-01-14',
      tradeType: 'TILING'
    },
    {
      id: '3',
      quoteNumber: 'QUO-003',
      jobTitle: 'House Painting',
      clientName: 'Lisa Chen',
      clientEmail: 'lisa@example.com',
      totalAmount: 4200,
      status: 'ACCEPTED',
      createdAt: '2024-01-12',
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

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader session={session} />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quotes</h1>
            <p className="text-gray-600">Manage all your quotes in one place</p>
          </div>
          
          <Link href="/dashboard/quotes/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Quote
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search quotes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                {['all', 'DRAFT', 'SENT', 'ACCEPTED', 'REJECTED'].map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter(status)}
                  >
                    {status === 'all' ? 'All' : status}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quotes List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              All Quotes ({filteredQuotes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredQuotes.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No quotes found</h3>
                <p className="mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Create your first quote to get started!'
                  }
                </p>
                <Link href="/dashboard/quotes/new">
                  <Button>Create Quote</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuotes.map((quote) => (
                  <div key={quote.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
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
                        
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {quote.quoteNumber} - {quote.jobTitle}
                        </h3>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{quote.clientName} • {quote.createdAt}</span>
                          <span className="font-semibold text-lg text-gray-900">
                            ${quote.totalAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Link href={`/dashboard/quotes/${quote.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Link href={`/dashboard/quotes/${quote.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
