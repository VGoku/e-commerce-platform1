import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import useProductStore from '../stores/useProductStore'
import useCartStore from '../stores/useCartStore'
import toast from 'react-hot-toast'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { products, loading, error, fetchProducts } = useProductStore()
    const addItem = useCartStore((state) => state.addItem)
    const [selectedQuantity, setSelectedQuantity] = useState(1)

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts()
        }
    }, [fetchProducts, products.length])

    const handleAddToCart = (e) => {
        e.preventDefault()
        addItem(product, selectedQuantity)
        toast.success('Added to cart!')
        navigate('/cart')
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-gray-600">Loading product details...</div>
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

    const product = products.find(p => p.id === parseInt(id))

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-gray-600">Product not found</div>
            </div>
        )
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    {/* Image gallery */}
                    <div className="flex flex-col-reverse">
                        <div className="aspect-h-1 aspect-w-1 w-full">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-full w-full object-contain object-center"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.title}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">${product.price.toFixed(2)}</p>
                        </div>

                        {/* Reviews */}
                        <div className="mt-3">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                product.rating?.rate > rating ? 'text-yellow-400' : 'text-gray-300',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="ml-2 text-sm text-gray-500">
                                    {product.rating?.rate} ({product.rating?.count} reviews)
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <p className="text-base text-gray-900">{product.description}</p>
                        </div>

                        <form className="mt-6" onSubmit={handleAddToCart}>
                            {/* Quantity */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                                </div>

                                <div className="mt-2">
                                    <select
                                        value={selectedQuantity}
                                        onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
                                        className="input max-w-[100px]"
                                    >
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <option key={num} value={num}>
                                                {num}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-8 flex w-full items-center justify-center btn btn-primary"
                            >
                                Add to cart
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
} 