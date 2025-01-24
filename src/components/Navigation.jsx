import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import useCartStore from '../stores/useCartStore'
import useAuthStore from '../stores/useAuthStore'
import useThemeStore from '../stores/useThemeStore'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
    const cartItems = useCartStore((state) => state.items)
    const { user, signOut } = useAuthStore()
    const { theme, toggleTheme } = useThemeStore()

    const navigation = [
        { name: 'Home', href: '/', current: false },
        { name: 'Products', href: '/products', current: false },
        { name: 'About', href: '/about', current: false },
        { name: 'Contact', href: '/contact', current: false },
    ]

    return (
        <Disclosure as="nav" className="bg-white dark:bg-gray-800 shadow-sm">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link to="/" className="text-2xl font-bold text-primary-600">Shop</Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={classNames(
                                                item.current ? 'border-primary-500 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200',
                                                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center">
                                {/* Theme toggle */}
                                <button
                                    onClick={toggleTheme}
                                    className="rounded-full p-1 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                                >
                                    {theme === 'dark' ? (
                                        <SunIcon className="h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MoonIcon className="h-6 w-6" aria-hidden="true" />
                                    )}
                                </button>

                                {/* Cart */}
                                <Link
                                    to="/cart"
                                    className="ml-4 flow-root rounded-md px-2 py-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <div className="flex items-center">
                                        <ShoppingCartIcon className="h-6 w-6 flex-shrink-0 text-gray-500 dark:text-gray-300" aria-hidden="true" />
                                        {cartItems.length > 0 && (
                                            <span className="ml-1 text-sm font-medium text-primary-600 dark:text-primary-400">
                                                {cartItems.length}
                                            </span>
                                        )}
                                    </div>
                                </Link>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-4">
                                    <div>
                                        <Menu.Button className="flex rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none">
                                            <span className="sr-only">Open user menu</span>
                                            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                                        </Menu.Button>
                                    </div>
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
                                            {user ? (
                                                <>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to="/profile"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                                                                )}
                                                            >
                                                                Your Profile
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={signOut}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                                                    'block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                                                                )}
                                                            >
                                                                Sign out
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </>
                                            ) : (
                                                <>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to="/login"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                                                                )}
                                                            >
                                                                Sign in
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to="/register"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                                                                )}
                                                            >
                                                                Register
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                </>
                                            )}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        item.current ? 'bg-primary-50 dark:bg-gray-700 border-primary-500 text-primary-700 dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200',
                                        'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
} 