
import { SignUpForm } from '@/components/auth/signup-form'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">TradieTalk</h1>
          <p className="text-gray-600">Create your account</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}
