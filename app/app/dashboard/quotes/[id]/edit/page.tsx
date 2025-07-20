
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { QuoteEditForm } from '@/components/quotes/quote-edit-form'

interface EditQuotePageProps {
  params: {
    id: string
  }
}

export default async function EditQuotePage({ params }: EditQuotePageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return <QuoteEditForm session={session} quoteId={params.id} />
}
