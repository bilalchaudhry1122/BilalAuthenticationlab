import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function HomePage() {
  // Server-side session validation
  const session = await auth()
  
  // Redirect to signin if no session exists
  if (!session) {
    redirect("/signin")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              {session.user?.image && (
                <div className="relative">
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-2xl mx-auto ring-4 ring-blue-200"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                </div>
              )}
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Welcome Back!
            </h1>
            <p className="text-2xl text-gray-700 mb-2">
              Hello, <span className="font-semibold text-blue-600">{session.user?.name || "User"}</span>!
            </p>
            <p className="text-gray-500">Ready to explore?</p>
          </div>

          {/* Quick Action Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Users Directory</h2>
                <p className="text-gray-600">Browse and explore user profiles from our directory</p>
              </div>
              <Link
                href="/main"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center gap-2"
              >
                <span>Explore Users</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Session Info Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Session Information
            </h2>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <pre className="text-sm text-gray-700 overflow-auto font-mono">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
