
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
  Star,
  Copy,
  Trash2,
  Crown
} from 'lucide-react'
import Link from 'next/link'

interface TemplatesContentProps {
  session: any
}

export function TemplatesContent({ session }: TemplatesContentProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  // Mock data - in real app, this would come from API
  const templates = [
    {
      id: '1',
      name: 'Basic Concrete Slab',
      tradeType: 'CONCRETE',
      description: 'Standard concrete slab installation with reinforcement',
      defaultRate: 85.0,
      defaultMarkup: 25.0,
      isSystemTemplate: true,
      isActive: true,
      timesUsed: 12
    },
    {
      id: '2',
      name: 'Concrete Driveway',
      tradeType: 'CONCRETE',
      description: 'Residential driveway with decorative finish options',
      defaultRate: 95.0,
      defaultMarkup: 30.0,
      isSystemTemplate: true,
      isActive: true,
      timesUsed: 8
    },
    {
      id: '3',
      name: 'Ceramic Floor Tiling',
      tradeType: 'TILING',
      description: 'Standard ceramic tile installation for floors',
      defaultRate: 55.0,
      defaultMarkup: 35.0,
      isSystemTemplate: true,
      isActive: true,
      timesUsed: 15
    },
    {
      id: '4',
      name: 'My Custom Template',
      tradeType: 'PAINTING',
      description: 'Custom interior painting template',
      defaultRate: 30.0,
      defaultMarkup: 40.0,
      isSystemTemplate: false,
      isActive: true,
      timesUsed: 3
    }
  ]

  const getTradeColor = (tradeType: string) => {
    switch (tradeType) {
      case 'CONCRETE': return 'bg-stone-100 text-stone-800'
      case 'TILING': return 'bg-cyan-100 text-cyan-800'
      case 'PAINTING': return 'bg-yellow-100 text-yellow-800'
      case 'LANDSCAPING': return 'bg-green-100 text-green-800'
      case 'BUILDING': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = filterType === 'all' || 
                       (filterType === 'system' && template.isSystemTemplate) ||
                       (filterType === 'custom' && !template.isSystemTemplate) ||
                       template.tradeType === filterType
    
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader session={session} />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
            <p className="text-gray-600">Manage your quote templates for faster quote creation</p>
          </div>
          
          <div className="flex items-center gap-2">
            {session?.user?.subscriptionTier === 'FREE' && (
              <Badge className="bg-orange-100 text-orange-800">
                <Crown className="h-3 w-3 mr-1" />
                Upgrade for Custom Templates
              </Badge>
            )}
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={session?.user?.subscriptionTier === 'FREE'}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {['all', 'system', 'custom', 'CONCRETE', 'TILING', 'PAINTING', 'LANDSCAPING'].map((type) => (
                  <Button
                    key={type}
                    variant={filterType === type ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType(type)}
                  >
                    {type === 'all' ? 'All' : 
                     type === 'system' ? 'System' :
                     type === 'custom' ? 'Custom' : type}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Notice for Free Users */}
        {session?.user?.subscriptionTier === 'FREE' && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="h-8 w-8 text-orange-600" />
                  <div>
                    <h3 className="font-semibold text-orange-900">Unlock Custom Templates</h3>
                    <p className="text-orange-700 text-sm">
                      Upgrade to Basic plan to create and manage your own custom templates
                    </p>
                  </div>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getTradeColor(template.tradeType)}>
                      {template.tradeType}
                    </Badge>
                    {template.isSystemTemplate && (
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        <Star className="h-3 w-3 mr-1" />
                        System
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {template.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Rate:</span>
                      <div className="font-medium">${template.defaultRate}/m²</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Markup:</span>
                      <div className="font-medium">{template.defaultMarkup}%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Used {template.timesUsed} times</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link href={`/dashboard/quotes/new?template=${template.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="h-4 w-4 mr-1" />
                        Use Template
                      </Button>
                    </Link>
                    
                    {!template.isSystemTemplate && (
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 opacity-50 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Start by using our system templates or create your own'
                }
              </p>
              {session?.user?.subscriptionTier !== 'FREE' && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
