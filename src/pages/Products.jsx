import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useProductStore from '../stores/useProductStore'

export default function Products() {
    const [sortBy, setSortBy] = useState('newest')
    const { products, loading, error, fetchProducts } = useProductStore()

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    const getSortedProducts = () => {
        switch (sortBy) {
            case 'price-low':
                return [...products].sort((a, b) => a.price - b.price)
            case 'price-high':
                return [...products].sort((a, b) => b.price - a.price)
            case 'newest':
            default:
                return products
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-gray-600">Loading products...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-red-600">Error: {error}</div>
            </div>
        )
    }

    return (
        <div className="bg-white">
            <div>
                <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>

                        <div className="flex items-center">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="input max-w-xs"
                            >
                                <option value="newest">Newest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                    <li>
                                        <a href="#" className="hover:text-primary-600">
                                            All
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-primary-600">
                                            Clothing
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-primary-600">
                                            Electronics
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-primary-600">
                                            Jewelry
                                        </a>
                                    </li>
                                </ul>
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                    {getSortedProducts().map((product) => (
                                        <Link key={product.id} to={`/products/${product.id}`} className="group">
                                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                                />
                                            </div>
                                            <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                                            <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
} 