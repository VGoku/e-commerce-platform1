import { UserGroupIcon, ShieldCheckIcon, TruckIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

export default function About() {
    const features = [
        {
            name: 'Quality Products',
            description: 'We source only the highest quality products from trusted manufacturers and brands.',
            icon: ShieldCheckIcon,
        },
        {
            name: 'Fast Shipping',
            description: 'Free shipping on orders over $50. Most orders delivered within 2-3 business days.',
            icon: TruckIcon,
        },
        {
            name: 'Best Prices',
            description: 'We regularly check competitor prices to ensure you get the best deals.',
            icon: CurrencyDollarIcon,
        },
        {
            name: 'Expert Team',
            description: 'Our customer service team is available 24/7 to help with any questions.',
            icon: UserGroupIcon,
        },
    ]

    const team = [
        {
            name: 'John Smith',
            role: 'CEO & Founder',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'Sarah Johnson',
            role: 'Head of Operations',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'Michael Chen',
            role: 'Lead Developer',
            image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ]

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">About Our Company</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        We're dedicated to providing the best shopping experience for our customers.
                    </p>
                </div>

                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative">
                                <div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500 text-white">
                                    <feature.icon className="h-8 w-8" aria-hidden="true" />
                                </div>
                                <p className="ml-16 text-xl font-semibold leading-6 text-gray-900 dark:text-white">{feature.name}</p>
                                <p className="mt-2 ml-16 text-base text-gray-600 dark:text-gray-300">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mx-auto mt-32 max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Meet our team</h2>
                        <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            We're a dynamic group of individuals who are passionate about what we do.
                        </p>
                    </div>
                    <ul role="list" className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                        {team.map((person) => (
                            <li key={person.name}>
                                <img className="mx-auto h-24 w-24 rounded-full" src={person.image} alt="" />
                                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900 dark:text-white text-center">{person.name}</h3>
                                <p className="text-sm leading-6 text-gray-600 dark:text-gray-300 text-center">{person.role}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
} 