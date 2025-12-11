import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { AppProvider } from './context/AppContext'

// Layout
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'

// Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CaseList from './pages/cases/CaseList'
import CaseForm from './pages/cases/CaseForm'
import BillingDashboard from './pages/billing/BillingDashboard'
import InvoiceForm from './pages/billing/InvoiceForm'
import ResearchDashboard from './pages/research/ResearchDashboard'
import ClientDashboard from './pages/portal/ClientDashboard'
import UserManagement from './pages/UserManagement'
import Settings from './pages/Settings'

// CSS imports for pages
import './pages/Dashboard.css'
import './pages/cases/Cases.css'
import './pages/billing/Billing.css'
import './pages/research/Research.css'
import './pages/portal/Portal.css'
import './pages/Settings.css'

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }) {
    const { user, isLoading, isAuthenticated } = useAuth()

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner"></div>
                <p>Memuat...</p>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (allowedRoles && !allowedRoles.includes(user.role) && user.role !== 'admin') {
        return <Navigate to="/dashboard" replace />
    }

    return children
}

// Main Layout Component
function MainLayout({ children }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    return (
        <div className="app-container">
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
            <div className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
                <Header
                    collapsed={sidebarCollapsed}
                    onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
                <main className="page-container" style={{ marginTop: 'var(--header-height)' }}>
                    {children}
                </main>
            </div>
        </div>
    )
}

// App Routes
function AppRoutes() {
    const { user, isAuthenticated } = useAuth()

    return (
        <Routes>
            {/* Public Routes */}
            <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
            />

            {/* Protected Routes - Internal Users */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute allowedRoles={['admin', 'lawyer', 'paralegal']}>
                        <MainLayout><Dashboard /></MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/cases"
                element={
                    <ProtectedRoute allowedRoles={['admin', 'lawyer', 'paralegal']}>
                        <MainLayout><CaseList /></MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/cases/new"
                element={
                    <ProtectedRoute allowedRoles={['admin', 'lawyer']}>
                        <MainLayout><CaseForm /></MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/cases/:id/edit"
                element={
                    <ProtectedRoute allowedRoles={['admin', 'lawyer']}>
                        <MainLayout><CaseForm /></MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/cases/:id"
                element={
                    <ProtectedRoute allowedRoles={['admin', 'lawyer', 'paralegal']}>
                        <MainLayout><CaseList /></MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/clients"
                element={
                    <ProtectedRoute allowedRoles={['admin', 'lawyer']}>
                        <MainLayout><Dashboard /></MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/billing"
                element={
                    <ProtectedRoute allowedRoles={['admin', 'lawyer']}>
                        <MainLayout><BillingDashboard /></MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/billing/new"
                element={
                    <ProtectedRoute allowedRoles={['admin', 'lawyer']}>
                        <MainLayout><InvoiceForm /></MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/billing/*"
                element={
                    <ProtectedRoute allowedRoles={['admin', 'lawyer']}>
                        <MainLayout><BillingDashboard /></MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/time-tracking"
                element={
                    <ProtectedRoute allowedRoles={['admin', 'lawyer', 'paralegal']}>
                        <MainLayout><BillingDashboard /></MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/research"
                element={
                    <ProtectedRoute allowedRoles={['admin', 'lawyer', 'paralegal']}>
                        <MainLayout><ResearchDashboard /></MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/documents"
                element={
                    <ProtectedRoute allowedRoles={['admin', 'lawyer', 'paralegal']}>
                        <MainLayout><Dashboard /></MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/templates"
                element={
                    <ProtectedRoute allowedRoles={['admin', 'lawyer']}>
                        <MainLayout><ResearchDashboard /></MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/users"
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <MainLayout><UserManagement /></MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/settings"
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <MainLayout><Settings /></MainLayout>
                    </ProtectedRoute>
                }
            />

            {/* Client Portal Routes */}
            <Route
                path="/portal"
                element={
                    <ProtectedRoute allowedRoles={['client']}>
                        <MainLayout><ClientDashboard /></MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/portal/*"
                element={
                    <ProtectedRoute allowedRoles={['client']}>
                        <MainLayout><ClientDashboard /></MainLayout>
                    </ProtectedRoute>
                }
            />

            {/* Default Redirect */}
            <Route
                path="/"
                element={
                    isAuthenticated
                        ? <Navigate to={user?.role === 'client' ? '/portal' : '/dashboard'} replace />
                        : <Navigate to="/login" replace />
                }
            />

            {/* 404 Fallback */}
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    )
}

// Main App Component
function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <AppProvider>
                        <AppRoutes />
                    </AppProvider>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
