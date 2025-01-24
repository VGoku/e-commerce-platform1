import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="space-y-16">
            {/* Hero section */}
            <div className="relative">
                <div className="mx-auto max-w-7xl">
                    <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
                        <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56">
                            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                    Discover Amazing Products
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Shop the latest trends and find your perfect style. We offer a wide range of high-quality products at competitive prices.
                                </p>
                                <div className="mt-10 flex items-center gap-x-6">
                                    <Link
                                        to="/products"
                                        className="btn btn-primary"
                                    >
                                        Shop Now
                                    </Link>
                                    <Link to="/products" className="text-sm font-semibold leading-6 text-gray-900">
                                        Learn more <span aria-hidden="true">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured section */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>

                    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="group relative">
                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                    <div className="h-full w-full bg-gray-200" />
                                </div>
                                <h3 className="mt-6 text-sm text-gray-500">
                                    <Link to={`/products/${item}`}>
                                        <span className="absolute inset-0" />
                                        Product {item}
                                    </Link>
                                </h3>
                                <p className="text-base font-semibold text-gray-900">$99.00</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 