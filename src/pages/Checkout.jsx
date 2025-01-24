import { useState } from 'react'
import { Link } from 'react-router-dom'

const cart = {
    items: [
        {
            id: 1,
            name: 'Basic Tee',
            price: '$35.00',
            color: 'Black',
            size: 'Large',
            quantity: 1,
        },
    ],
}

export default function Checkout() {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        postalCode: '',
        phone: '',
    })

    const subtotal = cart.items.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity, 0)
    const shipping = 5.00
    const tax = subtotal * 0.1
    const total = subtotal + shipping + tax

    const handleSubmit = async (e) => {
        e.preventDefault()
        // TODO: Implement checkout with Stripe
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Contact information</h2>

                                <div className="mt-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="input"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>

                                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                            First name
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="input"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                            Last name
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="input"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                            Address
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="input"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
                                            Apartment, suite, etc.
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="apartment"
                                                name="apartment"
                                                value={formData.apartment}
                                                onChange={handleChange}
                                                className="input"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                            City
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className="input"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                            State
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="state"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                className="input"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                                            Postal code
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="postalCode"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleChange}
                                                className="input"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                            Phone
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="input"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Payment</h2>
                                <div className="mt-4">
                                    <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                                        <p className="text-sm text-gray-500">
                                            Payment will be processed securely through Stripe
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full"
                                >
                                    Pay ${total.toFixed(2)}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="rounded-lg bg-gray-50 px-4 py-6">
                            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

                            <div className="mt-6">
                                <div className="flow-root">
                                    <ul className="-my-4 divide-y divide-gray-200">
                                        {cart.items.map((item) => (
                                            <li key={item.id} className="flex items-center space-x-4 py-4">
                                                <div className="flex-shrink-0">
                                                    <div className="h-16 w-16 rounded-md border border-gray-200 bg-gray-200" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-sm text-gray-700">{item.name}</h3>
                                                    <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                                                    <p className="mt-1 text-sm text-gray-500">Size {item.size}</p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <p className="text-sm font-medium text-gray-900">{item.price}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <dl className="mt-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-600">Subtotal</dt>
                                        <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-600">Shipping</dt>
                                        <dd className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-600">Tax</dt>
                                        <dd className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="text-base font-medium text-gray-900">Order total</dt>
                                        <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 