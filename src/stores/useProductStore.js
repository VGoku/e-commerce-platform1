import { create } from 'zustand'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../lib/supabase'

const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,

    // Fetch all products
    fetchProducts: async () => {
        set({ loading: true, error: null })
        try {
            const { data, error } = await getProducts()
            if (error) throw error
            set({ products: data })
            return { success: true, data }
        } catch (error) {
            set({ error: error.message })
            return { success: false, error: error.message }
        } finally {
            set({ loading: false })
        }
    },

    // Get a single product
    getProduct: async (id) => {
        const product = get().products.find(p => p.id === id)
        if (product) return { success: true, data: product }

        try {
            const { data, error } = await getProduct(id)
            if (error) throw error
            return { success: true, data }
        } catch (error) {
            return { success: false, error: error.message }
        }
    },

    // Add a new product
    addProduct: async (product) => {
        set({ loading: true, error: null })
        try {
            const { data, error } = await createProduct(product)
            if (error) throw error
            set(state => ({ products: [...state.products, data[0]] }))
            return { success: true, data: data[0] }
        } catch (error) {
            set({ error: error.message })
            return { success: false, error: error.message }
        } finally {
            set({ loading: false })
        }
    },

    // Update a product
    updateProduct: async (id, updates) => {
        set({ loading: true, error: null })
        try {
            const { data, error } = await updateProduct(id, updates)
            if (error) throw error
            set(state => ({
                products: state.products.map(p =>
                    p.id === id ? data[0] : p
                )
            }))
            return { success: true, data: data[0] }
        } catch (error) {
            set({ error: error.message })
            return { success: false, error: error.message }
        } finally {
            set({ loading: false })
        }
    },

    // Delete a product
    deleteProduct: async (id) => {
        set({ loading: true, error: null })
        try {
            const { error } = await deleteProduct(id)
            if (error) throw error
            set(state => ({
                products: state.products.filter(p => p.id !== id)
            }))
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
}))

export default useProductStore 