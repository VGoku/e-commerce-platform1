import { useState } from 'react'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // In a real application, you would send this data to your backend
        console.log('Form submitted:', formData)
        toast.success('Message sent successfully!')
        setFormData({ name: '', email: '', message: '' })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Contact Us</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
                    {/* Contact Form */}
                    <div className="rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="block w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                >
                                    Send message
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Get in touch</h3>
                        <dl className="mt-6 space-y-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Address</span>
                                    <MapPinIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                    123 Market Street<br />
                                    San Francisco, CA 94105
                                </dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Telephone</span>
                                    <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                    <a className="hover:text-gray-900 dark:hover:text-white" href="tel:+1 (555) 234-5678">
                                        +1 (555) 234-5678
                                    </a>
                                </dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Email</span>
                                    <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                    <a className="hover:text-gray-900 dark:hover:text-white" href="mailto:support@example.com">
                                        support@example.com
                                    </a>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
} 