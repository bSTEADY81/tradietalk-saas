
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      subscriptionTier: string
    }
  }

  interface User {
    subscriptionTier: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    subscriptionTier: string
  }
}
