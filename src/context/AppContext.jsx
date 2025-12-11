import { createContext, useContext, useState, useEffect } from 'react'
import { mockCases as initialCases, mockInvoices as initialInvoices, mockClients } from '../data/mockData'

const AppContext = createContext()

export function useApp() {
    const context = useContext(AppContext)
    // Return default values if context is not available to prevent crashes
    if (!context) {
        return {
            logo: null,
            updateLogo: () => { },
            firmInfo: { name: 'Also & Partners', tagline: 'Law Firm' },
            updateFirmInfo: () => { },
            cases: [],
            addCase: () => { },
            updateCase: () => { },
            deleteCase: () => { },
            getCaseById: () => null,
            invoices: [],
            addInvoice: () => { },
            updateInvoice: () => { },
            deleteInvoice: () => { },
            clients: []
        }
    }
    return context
}

export function AppProvider({ children }) {
    // Logo state - bisa diubah oleh admin
    const [logo, setLogo] = useState(null)

    // Firm info
    const [firmInfo, setFirmInfo] = useState({
        name: 'Also & Partners',
        tagline: 'Law Firm',
        address: 'Jl. Sudirman No. 123, Jakarta Selatan',
        phone: '+62 21 555 1234',
        email: 'contact@alsoandpartners.com'
    })

    // Mutable data
    const [cases, setCases] = useState(initialCases)
    const [invoices, setInvoices] = useState(initialInvoices)
    const [clients] = useState(mockClients)

    // Generate next ID
    const generateCaseId = () => {
        const year = new Date().getFullYear()
        const count = cases.filter(c => c.id.includes(year.toString())).length + 1
        return `CASE-${year}-${String(count).padStart(3, '0')}`
    }

    const generateInvoiceId = () => {
        const year = new Date().getFullYear()
        const count = invoices.filter(i => i.id.includes(year.toString())).length + 1
        return `INV-${year}-${String(count).padStart(3, '0')}`
    }

    // Case CRUD
    const addCase = (newCase) => {
        const caseWithId = {
            ...newCase,
            id: generateCaseId(),
            createdAt: new Date().toISOString().split('T')[0],
            progress: 0,
            documents: 0,
            notes: 0
        }
        setCases(prev => [caseWithId, ...prev])
        return caseWithId
    }

    const updateCase = (caseId, updates) => {
        setCases(prev => prev.map(c =>
            c.id === caseId ? { ...c, ...updates } : c
        ))
    }

    const deleteCase = (caseId) => {
        setCases(prev => prev.filter(c => c.id !== caseId))
    }

    const getCaseById = (caseId) => {
        return cases.find(c => c.id === caseId)
    }

    // Invoice CRUD
    const addInvoice = (newInvoice) => {
        const invoiceWithId = {
            ...newInvoice,
            id: generateInvoiceId(),
            issuedAt: new Date().toISOString().split('T')[0],
            status: 'draft'
        }
        setInvoices(prev => [invoiceWithId, ...prev])
        return invoiceWithId
    }

    const updateInvoice = (invoiceId, updates) => {
        setInvoices(prev => prev.map(i =>
            i.id === invoiceId ? { ...i, ...updates } : i
        ))
    }

    const deleteInvoice = (invoiceId) => {
        setInvoices(prev => prev.filter(i => i.id !== invoiceId))
    }

    // Logo management
    const updateLogo = (logoUrl) => {
        setLogo(logoUrl)
        // Persist to localStorage
        if (logoUrl) {
            localStorage.setItem('firmLogo', logoUrl)
        } else {
            localStorage.removeItem('firmLogo')
        }
    }

    // Update firm info
    const updateFirmInfo = (updates) => {
        setFirmInfo(prev => ({ ...prev, ...updates }))
        localStorage.setItem('firmInfo', JSON.stringify({ ...firmInfo, ...updates }))
    }

    // Load persisted data on mount
    useEffect(() => {
        const savedLogo = localStorage.getItem('firmLogo')
        const savedFirmInfo = localStorage.getItem('firmInfo')

        if (savedLogo) setLogo(savedLogo)
        if (savedFirmInfo) {
            try {
                setFirmInfo(JSON.parse(savedFirmInfo))
            } catch (e) {
                console.error('Error parsing saved firm info', e)
            }
        }
    }, [])

    const value = {
        // Logo
        logo,
        updateLogo,

        // Firm info
        firmInfo,
        updateFirmInfo,

        // Cases
        cases,
        addCase,
        updateCase,
        deleteCase,
        getCaseById,

        // Invoices
        invoices,
        addInvoice,
        updateInvoice,
        deleteInvoice,

        // Clients (read-only for now)
        clients
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
