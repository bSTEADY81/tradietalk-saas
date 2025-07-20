
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { QuoteCreationWizard } from '@/components/quotes/quote-creation-wizard'

interface NewQuotePageProps {
  searchParams: {
    method?: string
  }
}

export default async function NewQuotePage({ searchParams }: NewQuotePageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return <QuoteCreationWizard session={session} method={searchParams.method} />
}
