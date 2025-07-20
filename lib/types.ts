
import { SubscriptionTier, QuoteStatus, TradeType } from '@prisma/client'

export interface User {
  id: string
  name?: string | null
  email: string
  subscriptionTier: SubscriptionTier
}

export interface BusinessSettings {
  id: string
  userId: string
  companyName?: string | null
  companyLogo?: string | null
  address?: string | null
  phone?: string | null
  email?: string | null
  abn?: string | null
  customBranding: boolean
}

export interface Quote {
  id: string
  quoteNumber: string
  userId: string
  jobTitle: string
  clientName: string
  clientEmail?: string | null
  clientPhone?: string | null
  clientAddress?: string | null
  tradeType: TradeType
  templateId?: string | null
  measurements?: any
  baseRate?: number | null
  area?: number | null
  baseCost: number
  markupPercentage: number
  markupAmount: number
  extras?: any
  subtotal: number
  gstAmount: number
  totalAmount: number
  notes?: string | null
  status: QuoteStatus
  voiceRecordingUrl?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Template {
  id: string
  userId?: string | null
  name: string
  tradeType: TradeType
  description?: string | null
  defaultRate?: number | null
  defaultMarkup?: number | null
  isSystemTemplate: boolean
  isActive: boolean
  configuration?: any
}

export interface Photo {
  id: string
  quoteId: string
  url: string
  caption?: string | null
  order: number
}

export { SubscriptionTier, QuoteStatus, TradeType }
