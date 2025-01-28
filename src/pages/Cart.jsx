import { Link } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '../stores/useCartStore'

export default function Cart() {
    const { items, removeItem, updateQuantity, getTotal } = useCartStore()
    const subtotal = getTotal()
    const shipping = items.length > 0 ? 5.00 : 0
    const tax = subtotal * 0.1
    const total = subtotal + shipping + tax

    const handleUpdateQuantity = (productId, quantity) => {
        updateQuantity(productId, quantity)
    }

    const handleRemoveItem = (productId) => {
        removeItem(productId)
    }

    if (items.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-900">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Your cart is empty</h2>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">Start shopping to add items to your cart.</p>
                        <div className="mt-6">
                            <Link to="/products" className="btn btn-primary">
                                Browse Products
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Shopping Cart</h1>

                <form className="mt-12">
                    <div>
                        <h2 className="sr-only">Items in your shopping cart</h2>

                        <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {items.map((item) => (
                                <li key={item.id} className="flex py-6">
                                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <div className="absolute inset-0 bg-white">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-full w-full object-contain"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/150'
                                                    e.target.onerror = null
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                                        <div>
                                            <div className="flex justify-between">
                                                <h4 className="text-sm">
                                                    <Link to={`/products/${item.id}`} className="font-medium text-gray-700 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white">
                                                        {item.title}
                                                    </Link>
                                                </h4>
                                                <p className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                ${item.price.toFixed(2)} each
                                            </p>
                                        </div>

                                        <div className="mt-4 flex flex-1 items-end justify-between">
                                            <div className="flex items-center space-x-2">
                                                <label htmlFor={`quantity-${item.id}`} className="sr-only">
                                                    Quantity
                                                </label>
                                                <select
                                                    id={`quantity-${item.id}`}
                                                    name={`quantity-${item.id}`}
                                                    className="input max-w-[80px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    value={item.quantity}
                                                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                                                >
                                                    {[1, 2, 3, 4, 5].map((num) => (
                                                        <option key={num} value={num}>
                                                            {num}
                                                        </option>
                                                    ))}
                                                </select>
                                                <button
                                                    type="button"
                                                    className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Order summary */}
                    <div className="mt-10 sm:ml-32 sm:pl-6">
                        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 px-4 py-6 sm:p-6 lg:p-8">
                            <h2 className="sr-only">Order summary</h2>

                            <div className="flow-root">
                                <dl className="-my-4 divide-y divide-gray-200 text-sm">
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600 dark:text-gray-400">Subtotal</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600 dark:text-gray-400">Shipping</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white">${shipping.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600 dark:text-gray-400">Tax</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white">${tax.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-base font-medium text-gray-900 dark:text-white">Order total</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">${total.toFixed(2)}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="mt-10">
                            <Link
                                to="/checkout"
                                className="w-full btn btn-primary"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
} 