import { useState } from 'react'
import { Link } from 'react-router-dom'

const products = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '/products/1',
        price: '$35',
        description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
        imageSrc: '#',
        imageAlt: 'Black t-shirt.',
    },
    // Add more products here
]

export default function Products() {
    const [sortBy, setSortBy] = useState('newest')

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
                                            Accessories
                                        </a>
                                    </li>
                                </ul>
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                    {products.map((product) => (
                                        <Link key={product.id} to={product.href} className="group">
                                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                                                <div className="h-full w-full bg-gray-200 group-hover:opacity-75" />
                                            </div>
                                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
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