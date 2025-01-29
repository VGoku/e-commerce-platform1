import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useProductStore from '../stores/useProductStore'

export default function Products() {
    const { products, loading, error, fetchProducts } = useProductStore()
    const [sortBy, setSortBy] = useState('newest')
    const [imageLoadStates, setImageLoadStates] = useState({})

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    const handleImageLoad = (productId) => {
        setImageLoadStates(prev => ({
            ...prev,
            [productId]: true
        }))
    }

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        // Default to newest
        return b.id - a.id
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
        <div className="bg-white dark:bg-gray-900">
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
                            <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                                {!imageLoadStates[product.id] && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-gray-400">Loading...</div>
                                    </div>
                                )}
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className={`h-full w-full object-contain object-center transition-opacity duration-300 ${imageLoadStates[product.id] ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    onLoad={() => handleImageLoad(product.id)}
                                    onError={(e) => {
                                        console.log('Image failed to load:', product.image)
                                        e.target.src = 'https://placehold.co/400x400/png?text=Product+Image'
                                        handleImageLoad(product.id)
                                    }}
                                />
                            </div>
                            <div className="mt-4 space-y-2">
                                <h3 className="text-sm text-gray-700 dark:text-gray-200">{product.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{product.description}</p>
                                <p className="text-lg font-medium text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{product.category}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
} 