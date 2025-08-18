// import { useAuth } from '@clerk/clerk-react'
// import { getSupabaseClient } from '../lib/supabase'
// import { useMemo } from 'react'
// import { useState, useEffect } from 'react' // Import useState and useEffect
// import { SupabaseClient } from '@supabase/supabase-js'

// export function useAuthenticatedSupabaseClient() {
//   const { getToken } = useAuth()
  
//   const client = useMemo(async () => {
//     try {
//       // Try to get the Supabase JWT token from Clerk, fallback to default token
//       let token
//       try {
//         token = await getToken({ template: 'supabase' })
//       } catch (templateError) {
//         // If supabase template doesn't exist, use default token
//         console.warn('Supabase JWT template not found, using default token')
//         token = await getToken()
//       }
//       return getSupabaseClient(token || undefined)
//     } catch (error) {
//       console.error('Error getting auth token:', error)
//       // Return unauthenticated client as fallback
//       return getSupabaseClient()
//     }
//   }, [getToken])
  
//   return client
// }


import { useAuth } from '@clerk/clerk-react'
import { getSupabaseClient } from '../lib/supabase'
import { useState, useEffect } from 'react' // Import useState and useEffect
import { SupabaseClient } from '@supabase/supabase-js' // Import SupabaseClient type

export function useAuthenticatedSupabaseClient(): SupabaseClient | null { // Specify return type
  const { getToken } = useAuth()
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null) // State to hold the client

  useEffect(() => {
    const initializeClient = async () => {
      try {
        let token: string | undefined
        try {
          // Try to get the Supabase JWT token from Clerk, fallback to default token
          token = await getToken({ template: 'supabase' })
        } catch (templateError) {
          // If supabase template doesn't exist, use default token
          console.warn('Supabase JWT template not found, using default token')
          token = await getToken()
        }
        const client = getSupabaseClient(token || undefined)
        setSupabaseClient(client) // Set the initialized client to state
      } catch (error) {
        console.error('Error getting auth token or initializing Supabase client:', error)
        // Fallback to unauthenticated client if there's an error
        setSupabaseClient(getSupabaseClient())
      }
    }

    initializeClient() // Call the async function

  }, [getToken]) // Re-run effect if getToken changes

  return supabaseClient // Return the stateful client
}
