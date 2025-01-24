import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'
import toast from 'react-hot-toast'
import { getProfile, updateProfile } from '../lib/supabase'

export default function Profile() {
    const { user } = useAuthStore()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState({
        full_name: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        phone: ''
    })

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }

        // Fetch user profile
        const fetchProfile = async () => {
            setLoading(true)
            try {
                const { data, error } = await getProfile(user.id)
                if (error) throw error
                if (data) {
                    setProfile(data)
                }
            } catch (error) {
                toast.error('Error loading profile')
                console.error('Error:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [user, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await updateProfile(user.id, profile)
            if (error) throw error
            toast.success('Profile updated successfully')
        } catch (error) {
            toast.error('Error updating profile')
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setProfile(prev => ({
            ...prev,
            [name]: value
        }))
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Profile Information</h3>
                    <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                        <div>
                            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="full_name"
                                id="full_name"
                                value={profile.full_name || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={profile.address || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={profile.city || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    State
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    id="state"
                                    value={profile.state || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    name="postal_code"
                                    id="postal_code"
                                    value={profile.postal_code || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={profile.phone || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
} 