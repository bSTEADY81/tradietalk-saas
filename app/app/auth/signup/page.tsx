
import { SignUpForm } from '@/components/auth/signup-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check } from 'lucide-react'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2 text-blue-600">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back</span>
        </Link>
        <div className="text-2xl font-bold text-blue-600">TradieTalk</div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Start Your Free Trial</h1>
              <p className="text-gray-600">Create professional quotes in minutes with AI voice assistance</p>
            </div>

            {/* Free plan benefits */}
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <h3 className="font-medium text-blue-900">Free Plan Includes:</h3>
              <div className="space-y-1">
                {[
                  'Unlimited quotes',
                  'Voice recognition',
                  'Professional PDF generation',
                  'Quote management',
                  'Mobile-optimized interface'
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-blue-800">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <SignUpForm />

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/auth/signin" className="text-blue-600 font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="text-center text-xs text-gray-500">
              No credit card required • Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
