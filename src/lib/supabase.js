import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jqhgqhgsgczaigagjiur.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaGdxaGdzZ2N6YWlnYWdqaXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NjU4MzgsImV4cCI6MjA1MzI0MTgzOH0.b_skL62L0XuYfetX4mtddE3fr0_iCsPztOsFYXMLGq8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })
    return { data, error }
}

export const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    return { data, error }
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
}

export const getCurrentUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
}

// Database helper functions
export const createProduct = async (product) => {
    const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
    return { data, error }
}

export const getProducts = async () => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
    return { data, error }
}

export const getProduct = async (id) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()
    return { data, error }
}

export const updateProduct = async (id, updates) => {
    const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
    return { data, error }
}

export const deleteProduct = async (id) => {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
    return { error }
}

// Order helper functions
export const createOrder = async (order) => {
    const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
    return { data, error }
}

export const getOrders = async (userId) => {
    const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', userId)
    return { data, error }
}

// Profile helper functions
export const updateProfile = async (userId, updates) => {
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
    return { data, error }
}

export const getProfile = async (userId) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
    return { data, error }
} 