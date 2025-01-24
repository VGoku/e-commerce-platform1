import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../lib/supabaseClient'

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            loading: false,
            error: null,

            // Initialize the auth state
            initialize: async () => {
                set({ loading: true })
                try {
                    // Check for existing session
                    const { data: { session }, error } = await supabase.auth.getSession()
                    if (error) throw error

                    if (session) {
                        set({ user: session.user })
                    }

                    // Listen for auth changes
                    supabase.auth.onAuthStateChange((_event, session) => {
                        set({ user: session?.user || null })
                    })
                } catch (error) {
                    console.error('Auth initialization error:', error)
                    set({ error: error.message })
                } finally {
                    set({ loading: false })
                }
            },

            // Sign in with email
            signIn: async (email, password) => {
                set({ loading: true, error: null })
                try {
                    const { data: { user }, error } = await supabase.auth.signInWithPassword({
                        email,
                        password
                    })
                    if (error) throw error
                    set({ user })
                    return { success: true }
                } catch (error) {
                    set({ error: error.message })
                    return { success: false, error: error.message }
                } finally {
                    set({ loading: false })
                }
            },

            // Sign in with GitHub
            signInWithGithub: async () => {
                set({ loading: true, error: null })
                try {
                    const { error } = await supabase.auth.signInWithOAuth({
                        provider: 'github'
                    })
                    if (error) throw error
                    return { success: true }
                } catch (error) {
                    set({ error: error.message })
                    return { success: false, error: error.message }
                } finally {
                    set({ loading: false })
                }
            },

            // Sign up with email
            signUp: async (email, password) => {
                set({ loading: true, error: null })
                try {
                    const { data: { user }, error } = await supabase.auth.signUp({
                        email,
                        password
                    })
                    if (error) throw error
                    set({ user })
                    return { success: true }
                } catch (error) {
                    set({ error: error.message })
                    return { success: false, error: error.message }
                } finally {
                    set({ loading: false })
                }
            },

            // Sign out
            signOut: async () => {
                set({ loading: true, error: null })
                try {
                    const { error } = await supabase.auth.signOut()
                    if (error) throw error
                    set({ user: null })
                    return { success: true }
                } catch (error) {
                    set({ error: error.message })
                    return { success: false, error: error.message }
                } finally {
                    set({ loading: false })
                }
            },

            // Clear error
            clearError: () => set({ error: null }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user })
        }
    )
)

export default useAuthStore 