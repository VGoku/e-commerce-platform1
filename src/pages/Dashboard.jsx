import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'
import useBalanceStore from '../stores/useBalanceStore'
import { ShoppingBagIcon, CreditCardIcon, UserCircleIcon, HeartIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline'

export default function Dashboard() {
    const navigate = useNavigate()
    const { user } = useAuthStore()
    const getBalance = useBalanceStore((state) => state.getBalance)
    const balance = getBalance()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    const stats = [
        { name: 'Available Balance', value: `$${balance.toFixed(2)}`, icon: CreditCardIcon, color: 'bg-green-500' },
        { name: 'Total Orders', value: '0', icon: ShoppingBagIcon, color: 'bg-purple-500' },
        { name: 'Wishlist Items', value: '0', icon: HeartIcon, color: 'bg-blue-500' },
        { name: 'Member Since', value: new Date(user?.created_at).toLocaleDateString(), icon: UserCircleIcon, color: 'bg-pink-500' },
    ]

    const recentlyViewed = [
        { name: 'No items viewed yet', price: '', image: '' }
    ]

    if (!user) return null

    return (
        <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Welcome Banner */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg">
                    <div className="absolute inset-0 bg-grid-white/10"></div>
                    <div className="relative p-8">
                        <h1 className="text-3xl font-bold text-white">
                            Welcome back, {user.user_metadata?.username || user.email}! 👋
                        </h1>
                        <p className="mt-2 text-lg text-white/90">
                            Here's what's happening with your account today.
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((item) => (
                        <div
                            key={item.name}
                            className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 py-5 shadow-md transition-transform hover:scale-105 sm:px-6"
                        >
                            <dt>
                                <div className={`absolute rounded-md ${item.color} p-3`}>
                                    <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">{item.name}</p>
                            </dt>
                            <dd className="ml-16 flex items-baseline">
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{item.value}</p>
                            </dd>
                        </div>
                    ))}
                </dl>

                {/* Activity and Recommendations */}
                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                                <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
                                Recent Activity
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                No recent activity to show
                            </div>
                        </div>
                    </div>

                    {/* Recently Viewed */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                                <StarIcon className="h-5 w-5 mr-2 text-gray-400" />
                                Recently Viewed
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {recentlyViewed.map((item, index) => (
                                <div key={index} className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <button
                            onClick={() => navigate('/profile')}
                            className="btn btn-secondary flex items-center justify-center gap-2 py-4"
                        >
                            <UserCircleIcon className="h-5 w-5" />
                            Update Profile
                        </button>
                        <button
                            onClick={() => navigate('/products')}
                            className="btn btn-primary flex items-center justify-center gap-2 py-4"
                        >
                            <ShoppingBagIcon className="h-5 w-5" />
                            Browse Products
                        </button>
                        <button
                            onClick={() => navigate('/wishlist')}
                            className="btn btn-secondary flex items-center justify-center gap-2 py-4"
                        >
                            <HeartIcon className="h-5 w-5" />
                            View Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 