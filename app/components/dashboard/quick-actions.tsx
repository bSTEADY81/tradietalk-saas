
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Mic, 
  Plus, 
  FileText, 
  Camera,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export function QuickActions() {
  const actions = [
    {
      title: 'Voice Quote',
      description: 'Start with voice recording',
      icon: Mic,
      href: '/dashboard/quotes/new?method=voice',
      color: 'bg-blue-500 hover:bg-blue-600',
      featured: true
    },
    {
      title: 'Manual Quote',
      description: 'Type quote details',
      icon: Plus,
      href: '/dashboard/quotes/new?method=manual',
      color: 'bg-green-500 hover:bg-green-600',
      featured: false
    },
    {
      title: 'From Template',
      description: 'Use existing template',
      icon: FileText,
      href: '/dashboard/quotes/new?method=template',
      color: 'bg-purple-500 hover:bg-purple-600',
      featured: false
    },
    {
      title: 'Photo Quote',
      description: 'Add photos first',
      icon: Camera,
      href: '/dashboard/quotes/new?method=photo',
      color: 'bg-orange-500 hover:bg-orange-600',
      featured: false
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-blue-600" />
          Quick Actions
        </CardTitle>
        <CardDescription>
          Choose how you'd like to create your next quote
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button
                variant={action.featured ? "default" : "outline"}
                className={`h-24 w-full flex flex-col gap-2 ${action.featured ? action.color : ''}`}
              >
                <action.icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs opacity-80">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
