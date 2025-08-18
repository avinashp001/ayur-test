// import React from 'react'
// import { useUser } from '@clerk/clerk-react'
// import { Navigate } from 'react-router-dom'

// interface ProtectedRouteProps {
//   children: React.ReactNode
//   requireAdmin?: boolean
// }

// export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
//   const { isLoaded, isSignedIn, user } = useUser()

//   if (!isLoaded) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
//       </div>
//     )
//   }

//   if (!isSignedIn) {
//     return <Navigate to="/" replace />
//   }

//   if (requireAdmin && user?.publicMetadata?.role !== 'admin') {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
//           <p className="text-gray-400 mb-6">You don't have permission to access this page.</p>
//           <button 
//             onClick={() => window.history.back()}
//             className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return <>{children}</>
// }


import React from 'react'
import { useUser, SignIn } from '@clerk/clerk-react' // Import SignIn
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (!isSignedIn) {
    // Render Clerk's SignIn component directly
    return <SignIn routing="path" path="/admin" />
  }

  if (requireAdmin && user?.publicMetadata?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">You don't have permission to access this page.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
