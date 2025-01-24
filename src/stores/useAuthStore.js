import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { signIn, signUp, signOut, getCurrentUser } from '../lib/supabase'

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
                    const { user, error } = await getCurrentUser()
                    if (error) throw error
                    set({ user, error: null })
                } catch (error) {
                    set({ error: error.message })
                } finally {
                    set({ loading: false })
                }
            },

            // Sign in
            signIn: async (email, password) => {
                set({ loading: true, error: null })
                try {
                    const { data, error } = await signIn(email, password)
                    if (error) throw error
                    set({ user: data.user })
                    return { success: true }
                } catch (error) {
                    set({ error: error.message })
                    return { success: false, error: error.message }
                } finally {
                    set({ loading: false })
                }
            },

            // Sign up
            signUp: async (email, password) => {
                set({ loading: true, error: null })
                try {
                    const { data, error } = await signUp(email, password)
                    if (error) throw error
                    set({ user: data.user })
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
                    const { error } = await signOut()
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
        }
    )
)

export default useAuthStore 