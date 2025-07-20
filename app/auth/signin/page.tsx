
import { SignInForm } from '@/components/auth/signin-form'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">TradieTalk</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}
