
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  FileText, 
  DollarSign, 
  Clock, 
  TrendingUp,
  Calculator
} from 'lucide-react'

export function DashboardStats() {
  // Mock data - in real app, this would come from API
  const stats = [
    {
      title: 'Total Quotes',
      value: '12',
      description: '+2 from last month',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Quote Value',
      value: '$47,250',
      description: '+15% from last month',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Accepted Quotes',
      value: '8',
      description: '67% acceptance rate',
      icon: TrendingUp,
      color: 'text-orange-600'
    },
    {
      title: 'Avg. Quote Time',
      value: '3.2 min',
      description: '45% faster than manual',
      icon: Clock,
      color: 'text-purple-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
