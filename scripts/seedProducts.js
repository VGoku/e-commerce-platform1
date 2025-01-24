import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jqhgqhgsgczaigagjiur.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaGdxaGdzZ2N6YWlnYWdqaXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NjU4MzgsImV4cCI6MjA1MzI0MTgzOH0.b_skL62L0XuYfetX4mtddE3fr0_iCsPztOsFYXMLGq8'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const sampleProducts = [
    {
        name: "Premium Leather Backpack",
        description: "Handcrafted genuine leather backpack with laptop compartment and multiple pockets",
        price: 129.99,
        image_url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80",
        category: "Bags",
        stock_quantity: 50
    },
    {
        name: "Wireless Noise-Canceling Headphones",
        description: "Premium wireless headphones with active noise cancellation and 30-hour battery life",
        price: 249.99,
        image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80",
        category: "Electronics",
        stock_quantity: 100
    },
    {
        name: "Smart Fitness Watch",
        description: "Advanced fitness tracker with heart rate monitoring and GPS",
        price: 199.99,
        image_url: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80",
        category: "Electronics",
        stock_quantity: 75
    },
    {
        name: "Organic Cotton T-Shirt",
        description: "Sustainable, soft organic cotton t-shirt available in multiple colors",
        price: 29.99,
        image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80",
        category: "Clothing",
        stock_quantity: 200
    },
    {
        name: "Minimalist Wall Clock",
        description: "Modern design wall clock with silent movement",
        price: 49.99,
        image_url: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80",
        category: "Home Decor",
        stock_quantity: 30
    }
]

async function seedProducts() {
    console.log('Starting to seed products...')

    // First, sign in with your admin account
    const { error: signInError } = await supabase.auth.signInWithPassword({
        email: 'your-admin-email@example.com',  // Replace with your admin email
        password: 'your-admin-password'         // Replace with your admin password
    })

    if (signInError) {
        console.error('Error signing in:', signInError.message)
        return
    }

    // Now seed the products
    for (const product of sampleProducts) {
        try {
            const { data, error } = await supabase
                .from('products')
                .insert([product])
                .select()

            if (error) {
                console.error(`Error seeding product ${product.name}:`, error.message)
                continue
            }
            console.log(`Successfully added product: ${product.name}`)
        } catch (error) {
            console.error(`Unexpected error adding product ${product.name}:`, error)
        }
    }

    console.log('Finished seeding products')

    // Sign out after seeding
    await supabase.auth.signOut()
}

// Run the seeding function
seedProducts() 