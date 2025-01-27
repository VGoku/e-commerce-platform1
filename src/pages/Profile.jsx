import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import useAuthStore from '../stores/useAuthStore'
import { supabase } from '../lib/supabaseClient'
import toast from 'react-hot-toast'

export default function Profile() {
    const navigate = useNavigate()
    const { user } = useAuthStore()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        username: user?.user_metadata?.username || '',
        website: '',
        avatar_url: ''
    })

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }
        fetchProfile()
    }, [user, navigate])

    async function fetchProfile() {
        try {
            setLoading(true)

            // First, try to get the existing profile
            let { data, error } = await supabase
                .from('profiles')
                .select('username, website, avatar_url')
                .eq('id', user.id)
                .maybeSingle()

            if (error && error.code !== 'PGRST116') {
                throw error
            }

            // If no profile exists, create one
            if (!data) {
                const newProfile = {
                    id: user.id,
                    username: user.user_metadata?.username || '',
                    updated_at: new Date().toISOString()
                }

                const { error: insertError } = await supabase
                    .from('profiles')
                    .insert([newProfile])

                if (insertError) throw insertError

                data = newProfile
            }

            // Update form data
            setFormData({
                username: data.username || user.user_metadata?.username || '',
                website: data.website || '',
                avatar_url: data.avatar_url || ''
            })
        } catch (error) {
            console.error('Error fetching profile:', error)
            toast.error('Error loading profile')
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile() {
        try {
            setSaving(true)

            // Validate username
            if (!formData.username.trim()) {
                toast.error('Username is required')
                return
            }

            const updates = {
                id: user.id,
                username: formData.username.trim(),
                website: formData.website.trim(),
                avatar_url: formData.avatar_url,
                updated_at: new Date().toISOString()
            }

            const { error } = await supabase
                .from('profiles')
                .upsert(updates, {
                    returning: 'minimal'
                })

            if (error) throw error

            // Update the username in auth metadata as well
            const { error: metadataError } = await supabase.auth.updateUser({
                data: { username: formData.username.trim() }
            })

            if (metadataError) throw metadataError

            toast.success('Profile updated successfully!')
        } catch (error) {
            console.error('Error updating profile:', error)
            toast.error(error.message || 'Error updating profile')
        } finally {
            setSaving(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateProfile()
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    if (!user) return null

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        )
    }

    return (
        <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Profile Settings</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                            Update your profile information
                        </p>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700">
                        <form onSubmit={handleSubmit} className="space-y-6 px-4 py-5 sm:p-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="input"
                                        value={user.email}
                                        disabled
                                    />
                                </div>
                                <p className="mt-1 text-sm text-gray-500">Your email cannot be changed.</p>
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Username
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="input"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        minLength={3}
                                    />
                                </div>
                                <p className="mt-1 text-sm text-gray-500">This is your public display name.</p>
                            </div>

                            <div>
                                <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Website
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="url"
                                        name="website"
                                        id="website"
                                        className="input"
                                        value={formData.website}
                                        onChange={handleChange}
                                        placeholder="https://example.com"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="btn btn-secondary"
                                    disabled={saving}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={saving}
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
} 