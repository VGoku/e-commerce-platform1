import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useProductStore from '../stores/useProductStore'

export default function Products() {
    const { products, loading, error, fetchProducts } = useProductStore()
    const [sortBy, setSortBy] = useState('newest')

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        // Default to newest
        return new Date(b.created_at) - new Date(a.created_at)
    })

    if (loading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
    )

    if (error) return (
        <div className="text-center text-red-600">
            Error: {error}
        </div>
    )

    return (
        <div className="bg-white dark:bg-gray-800">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Our Products</h2>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="block w-48 rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {sortedProducts.map((product) => (
                        <Link key={product.id} to={`/products/${product.id}`} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image'
                                    }}
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700 dark:text-gray-200">{product.name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
} 