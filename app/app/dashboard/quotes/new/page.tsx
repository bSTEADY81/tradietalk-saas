

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { QuoteCreationWizard } from '@/components/quotes/quote-creation-wizard'

export default async function NewQuotePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return <QuoteCreationWizard session={session} />
}
