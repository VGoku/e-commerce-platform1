import { useState } from 'react'
import { Link } from 'react-router-dom'

const orders = [
    {
        id: 1,
        date: '2024-01-22',
        total: '$35.00',
        status: 'Delivered',
        items: [
            {
                id: 1,
                name: 'Basic Tee',
                price: '$35.00',
                quantity: 1,
            },
        ],
    },
]

const tabs = [
    { name: 'Orders', href: '#orders', current: true },
    { name: 'Settings', href: '#settings', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
    const [currentTab, setCurrentTab] = useState('Orders')

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Account Dashboard</h1>

                <div className="mt-6">
                    <div className="sm:hidden">
                        <label htmlFor="tabs" className="sr-only">
                            Select a tab
                        </label>
                        <select
                            id="tabs"
                            name="tabs"
                            className="input"
                            value={currentTab}
                            onChange={(e) => setCurrentTab(e.target.value)}
                        >
                            {tabs.map((tab) => (
                                <option key={tab.name}>{tab.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="hidden sm:block">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                {tabs.map((tab) => (
                                    <a
                                        key={tab.name}
                                        href={tab.href}
                                        onClick={() => setCurrentTab(tab.name)}
                                        className={classNames(
                                            tab.name === currentTab
                                                ? 'border-primary-500 text-primary-600'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                            'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                                        )}
                                    >
                                        {tab.name}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    {currentTab === 'Orders' ? (
                        <div className="space-y-20">
                            {orders.map((order) => (
                                <div key={order.id}>
                                    <h2 className="sr-only">Order placed on {order.date}</h2>

                                    <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                                        <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                            <div className="flex justify-between sm:block">
                                                <dt className="font-medium text-gray-900">Date placed</dt>
                                                <dd className="sm:mt-1">{order.date}</dd>
                                            </div>
                                            <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                                <dt className="font-medium text-gray-900">Order number</dt>
                                                <dd className="sm:mt-1">{order.id}</dd>
                                            </div>
                                            <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                                <dt className="font-medium text-gray-900">Total amount</dt>
                                                <dd className="sm:mt-1">{order.total}</dd>
                                            </div>
                                        </dl>
                                        <div className="mt-6 sm:mt-0">
                                            <Link
                                                to={`/orders/${order.id}`}
                                                className="btn btn-secondary"
                                            >
                                                View Order
                                            </Link>
                                        </div>
                                    </div>

                                    <table className="mt-4 w-full text-gray-500 sm:mt-6">
                                        <caption className="sr-only">Products</caption>
                                        <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                                            <tr>
                                                <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
                                                    Product
                                                </th>
                                                <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">
                                                    Price
                                                </th>
                                                <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">
                                                    Status
                                                </th>
                                                <th scope="col" className="w-0 py-3 text-right font-normal">
                                                    Info
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                                            {order.items.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="py-6 pr-8">
                                                        <div className="flex items-center">
                                                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <div className="h-full w-full bg-gray-200" />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="font-medium text-gray-900">{item.name}</div>
                                                                <div className="mt-1 sm:hidden">{item.price}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="hidden py-6 pr-8 sm:table-cell">{item.price}</td>
                                                    <td className="hidden py-6 pr-8 sm:table-cell">{order.status}</td>
                                                    <td className="whitespace-nowrap py-6 text-right font-medium">
                                                        <Link to={`/products/${item.id}`} className="text-primary-600">
                                                            View<span className="hidden lg:inline"> Product</span>
                                                            <span className="sr-only">, {item.name}</span>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Update your account information.
                                </p>
                            </div>

                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="input"
                                            disabled
                                            value="user@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="input"
                                            placeholder="Your name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" className="btn btn-primary">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 