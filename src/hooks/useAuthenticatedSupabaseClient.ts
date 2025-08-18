import { useAuth } from '@clerk/clerk-react'
import { getSupabaseClient } from '../lib/supabase'
import { useMemo } from 'react'

export function useAuthenticatedSupabaseClient() {
  const { getToken } = useAuth()
  
  const client = useMemo(async () => {
    try {
      // Try to get the Supabase JWT token from Clerk, fallback to default token
      let token
      try {
        token = await getToken({ template: 'supabase' })
      } catch (templateError) {
        // If supabase template doesn't exist, use default token
        console.warn('Supabase JWT template not found, using default token')
        token = await getToken()
      }
      return getSupabaseClient(token || undefined)
    } catch (error) {
      console.error('Error getting auth token:', error)
      // Return unauthenticated client as fallback
      return getSupabaseClient()
    }
  }, [getToken])
  
  return client
}