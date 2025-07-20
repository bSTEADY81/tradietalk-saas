
'use client'

import { useState } from 'react'
import { DashboardHeader } from './dashboard-header'
import { DashboardStats } from './dashboard-stats'
import { RecentQuotes } from './recent-quotes'
import { QuickActions } from './quick-actions'

interface DashboardContentProps {
  session: any
}

export function DashboardContent({ session }: DashboardContentProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader session={session} />
      
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {session?.user?.name || 'Tradie'}!
          </h1>
          <p className="text-blue-100">
            Ready to create some professional quotes? Let's get started.
          </p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Stats */}
        <DashboardStats />

        {/* Recent Quotes */}
        <RecentQuotes />
      </main>
    </div>
  )
}
