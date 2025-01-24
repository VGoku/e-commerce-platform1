import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'

const product = {
    name: 'Basic Tee',
    price: '$35',
    rating: 4,
    images: [
        {
            id: 1,
            src: '#',
            alt: 'Product image',
        },
    ],
    colors: [
        { name: 'Black', value: '#000000' },
        { name: 'Gray', value: '#808080' },
    ],
    sizes: [
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
    ],
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
    const { id } = useParams()
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes[2])

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    {/* Image gallery */}
                    <div className="flex flex-col-reverse">
                        <div className="aspect-h-1 aspect-w-1 w-full">
                            <div className="h-full w-full bg-gray-200" />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>
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
                                                product.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{product.rating} out of 5 stars</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <p className="text-base text-gray-900">{product.description}</p>
                        </div>

                        <form className="mt-6">
                            {/* Colors */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                                <div className="mt-2">
                                    <div className="flex items-center space-x-3">
                                        {product.colors.map((color) => (
                                            <button
                                                key={color.name}
                                                type="button"
                                                className={classNames(
                                                    color.value === selectedColor.value ? 'ring-2 ring-primary-500' : '',
                                                    'relative h-8 w-8 rounded-full border border-black border-opacity-10'
                                                )}
                                                style={{ backgroundColor: color.value }}
                                                onClick={() => setSelectedColor(color)}
                                            >
                                                <span className="sr-only">{color.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sizes */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                </div>

                                <div className="mt-2">
                                    <div className="grid grid-cols-5 gap-2">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size.name}
                                                type="button"
                                                className={classNames(
                                                    size.name === selectedSize.name
                                                        ? 'border-primary-500 ring-2 ring-primary-500'
                                                        : 'border-gray-300',
                                                    'flex items-center justify-center rounded-md border py-2 text-sm font-medium uppercase hover:bg-gray-50'
                                                )}
                                                onClick={() => setSelectedSize(size)}
                                            >
                                                {size.name}
                                            </button>
                                        ))}
                                    </div>
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