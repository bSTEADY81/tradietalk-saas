
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Mic, 
  Calculator, 
  FileText, 
  Smartphone, 
  Clock, 
  Check,
  Star,
  ArrowRight,
  Menu,
  X
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: Mic,
      title: 'Voice-First Quoting',
      description: 'Speak your quote details and let AI handle the calculations'
    },
    {
      icon: Calculator,
      title: 'Smart Calculations',
      description: 'Automatic area calculations, markup, GST, and professional formatting'
    },
    {
      icon: FileText,
      title: 'Professional PDFs',
      description: 'Generate branded quotes with your company details and logo'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Optimized for on-site use with large buttons and easy navigation'
    }
  ]

  const trades = [
    'Concrete', 'Tiling', 'Painting', 'Landscaping', 
    'Building', 'Plumbing', 'Electrical', 'Carpentry'
  ]

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Unlimited quotes',
        'Voice recognition',
        'Basic templates',
        'PDF generation',
        'TradieTalk branding'
      ],
      buttonText: 'Start Free',
      buttonVariant: 'outline' as const,
      popular: false
    },
    {
      name: 'Basic',
      price: '$19',
      period: 'per month',
      description: 'Remove branding and customize',
      features: [
        'Everything in Free',
        'Remove TradieTalk branding',
        'Custom company logo',
        'Basic customization',
        'Email support'
      ],
      buttonText: 'Choose Basic',
      buttonVariant: 'default' as const,
      popular: true
    },
    {
      name: 'Pro',
      price: '$49',
      period: 'per month',
      description: 'Advanced features for growing businesses',
      features: [
        'Everything in Basic',
        'Upload custom templates',
        'Advanced branding options',
        'Photo integration',
        'Priority support'
      ],
      buttonText: 'Choose Pro',
      buttonVariant: 'default' as const,
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">TradieTalk</div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
              <Link href="/auth/signin" className="text-gray-600 hover:text-blue-600">Sign In</Link>
              <Link href="/auth/signup">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Start Free Trial
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-blue-600">Features</a>
              <a href="#pricing" className="block text-gray-600 hover:text-blue-600">Pricing</a>
              <Link href="/auth/signin" className="block text-gray-600 hover:text-blue-600">Sign In</Link>
              <Link href="/auth/signup" className="block">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Start Free Trial
                </Button>
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            AI-Powered Quoting Assistant
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Professional Quotes in{' '}
            <span className="text-blue-600">Minutes</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The first voice-powered quoting system designed specifically for Australian tradies. 
            Speak your requirements and get professional quotes instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/signup">
              <Button size="lg" className="h-12 px-8 bg-orange-500 hover:bg-orange-600 text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 px-8 text-lg">
              Watch Demo
            </Button>
          </div>

          {/* Trade Types */}
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 mb-4">Trusted by tradies across all specialties:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {trades.map((trade) => (
                <Badge key={trade} variant="secondary" className="bg-blue-100 text-blue-800">
                  {trade}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Quote Professionally
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built specifically for tradies who want to spend more time working and less time on paperwork.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade when you're ready. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-gray-900">
                    {plan.price}
                    <span className="text-lg font-normal text-gray-600">/{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/auth/signup" className="block">
                    <Button 
                      variant={plan.buttonVariant} 
                      className="w-full h-11"
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Quoting Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of tradies who are saving time and winning more jobs with professional quotes.
          </p>
          
          <Link href="/auth/signup">
            <Button size="lg" className="h-12 px-8 bg-orange-500 hover:bg-orange-600 text-lg">
              Start Your Free Trial Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <p className="text-blue-200 mt-4 text-sm">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold text-blue-400 mb-4 md:mb-0">TradieTalk</div>
            
            <div className="flex space-x-6 text-gray-400">
              <Link href="/auth/signin" className="hover:text-white">Sign In</Link>
              <Link href="/auth/signup" className="hover:text-white">Sign Up</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 TradieTalk. Built for Australian tradies.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
