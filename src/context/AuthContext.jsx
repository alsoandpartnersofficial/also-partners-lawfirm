import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Mock users for demo
const MOCK_USERS = [
    {
        id: 1,
        email: 'admin@alsoandpartners.com',
        password: 'admin123',
        name: 'Super Admin',
        role: 'admin',
        avatar: null,
        title: 'Administrator'
    }
]

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check for saved session
        const savedUser = localStorage.getItem('alsopartners_user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setIsLoading(false)
    }, [])

    const login = async (email, password) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))

        const foundUser = MOCK_USERS.find(
            u => u.email === email && u.password === password
        )

        if (foundUser) {
            const { password: _, ...userWithoutPassword } = foundUser
            setUser(userWithoutPassword)
            localStorage.setItem('alsopartners_user', JSON.stringify(userWithoutPassword))
            return { success: true }
        }

        return { success: false, error: 'Email atau password salah' }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('alsopartners_user')
    }

    const hasPermission = (requiredRoles) => {
        if (!user) return false
        if (typeof requiredRoles === 'string') {
            return user.role === requiredRoles || user.role === 'admin'
        }
        return requiredRoles.includes(user.role) || user.role === 'admin'
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isLoading,
            hasPermission,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export default AuthContext
