import { Link } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/24/outline'

const cart = {
    items: [
        {
            id: 1,
            name: 'Basic Tee',
            href: '/products/1',
            price: '$35.00',
            color: 'Black',
            size: 'Large',
            quantity: 1,
        },
    ],
}

export default function Cart() {
    const subtotal = cart.items.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity, 0)
    const shipping = 5.00
    const tax = subtotal * 0.1
    const total = subtotal + shipping + tax

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>

                <form className="mt-12">
                    <div>
                        <h2 className="sr-only">Items in your shopping cart</h2>

                        <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {cart.items.map((item) => (
                                <li key={item.id} className="flex py-6">
                                    <div className="flex-shrink-0">
                                        <div className="h-24 w-24 rounded-md border border-gray-200 bg-gray-200" />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                                        <div>
                                            <div className="flex justify-between">
                                                <h4 className="text-sm">
                                                    <Link to={item.href} className="font-medium text-gray-700 hover:text-gray-800">
                                                        {item.name}
                                                    </Link>
                                                </h4>
                                                <p className="ml-4 text-sm font-medium text-gray-900">{item.price}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {item.color} / {item.size}
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
                                                    className="input max-w-[80px]"
                                                    value={item.quantity}
                                                >
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                    <option value={5}>5</option>
                                                </select>
                                                <button type="button" className="text-gray-500 hover:text-gray-600">
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
                        <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                            <h2 className="sr-only">Order summary</h2>

                            <div className="flow-root">
                                <dl className="-my-4 divide-y divide-gray-200 text-sm">
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600">Subtotal</dt>
                                        <dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600">Shipping</dt>
                                        <dd className="font-medium text-gray-900">${shipping.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600">Tax</dt>
                                        <dd className="font-medium text-gray-900">${tax.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-base font-medium text-gray-900">Order total</dt>
                                        <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
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