import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './components/Navigation'
import AppRoutes from './routes'
import { Toaster } from 'react-hot-toast'
import useThemeStore from './stores/useThemeStore'
import useAuthStore from './stores/useAuthStore'

function App() {
    const { theme } = useThemeStore()
    const { initialize } = useAuthStore()

    useEffect(() => {
        // Initialize auth state
        initialize()

        // Apply theme class to html element
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(theme)
    }, [theme, initialize])

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Navigation />
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    <AppRoutes />
                </main>
                <Toaster position="top-right" />
            </div>
        </BrowserRouter>
    )
}

export default App 