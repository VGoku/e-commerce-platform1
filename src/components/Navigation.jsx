import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCartStore } from '../stores/useCartStore'
import useAuthStore from '../stores/useAuthStore'
import useThemeStore from '../stores/useThemeStore'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
    const navigate = useNavigate()
    const location = useLocation()
    const getCurrentUserItems = useCartStore((state) => state.getCurrentUserItems)
    const clearCart = useCartStore((state) => state.clearCart)
    const { user, signOut } = useAuthStore()
    const { theme, toggleTheme } = useThemeStore()
    const cartItems = getCurrentUserItems()
    const cartItemsCount = cartItems?.length || 0

    const handleSignOut = async () => {
        clearCart()
        await signOut()
        navigate('/')
    }

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        ...(user ? [{ name: 'Dashboard', href: '/dashboard' }] : [])
    ]

    return (
        <Disclosure as="nav" className="bg-white dark:bg-gray-800 shadow-sm">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link to="/" className="text-xl font-bold text-primary-600">
                                        E-Shop
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={classNames(
                                                location.pathname === item.href
                                                    ? 'border-primary-500 text-gray-900 dark:text-white'
                                                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200',
                                                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                <button
                                    onClick={toggleTheme}
                                    className="rounded-full bg-white dark:bg-gray-800 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                >
                                    {theme === 'dark' ? (
                                        <SunIcon className="h-6 w-6" />
                                    ) : (
                                        <MoonIcon className="h-6 w-6" />
                                    )}
                                </button>

                                <Link
                                    to="/cart"
                                    className="ml-3 relative rounded-full bg-white dark:bg-gray-800 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                >
                                    <ShoppingCartIcon className="h-6 w-6" />
                                    {cartItemsCount > 0 && (
                                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary-500 text-xs font-medium text-white">
                                            {cartItemsCount}
                                        </span>
                                    )}
                                </Link>

                                {/* Profile dropdown */}
                                {user ? (
                                    <Menu as="div" className="relative ml-3">
                                        <Menu.Button className="flex rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                                            <span className="sr-only">Open user menu</span>
                                            <UserCircleIcon className="h-8 w-8 text-gray-400" />
                                        </Menu.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/dashboard"
                                                            className={classNames(
                                                                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                                                'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                                                            )}
                                                        >
                                                            Dashboard
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={handleSignOut}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                                                'block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                                                            )}
                                                        >
                                                            Sign out
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="ml-3 inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                    >
                                        Sign in
                                    </Link>
                                )}
                            </div>

                            {/* Mobile menu button */}
                            <div className="flex items-center sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as={Link}
                                    to={item.href}
                                    className={classNames(
                                        location.pathname === item.href
                                            ? 'bg-primary-50 dark:bg-primary-900 border-primary-500 text-primary-700 dark:text-primary-100'
                                            : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200',
                                        'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                                    )}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
} 