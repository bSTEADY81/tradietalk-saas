
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { QuoteView } from '@/components/quotes/quote-view'

interface QuotePageProps {
  params: {
    id: string
  }
}

export default async function QuotePage({ params }: QuotePageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return <QuoteView session={session} quoteId={params.id} />
}
