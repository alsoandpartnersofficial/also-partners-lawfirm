// Mock data for the law firm application

// Cases
export const mockCases = []

// Clients
export const mockClients = []

// Invoices
export const mockInvoices = []

// Time entries
// Time entries
export const mockTimeEntries = []

// Upcoming events/deadlines
// Upcoming events/deadlines
export const mockEvents = []

// Document templates
export const mockTemplates = [
    {
        id: 1,
        name: 'Surat Kuasa Umum',
        category: 'Kuasa',
        description: 'Template surat kuasa untuk keperluan umum',
        usageCount: 45,
        lastUsed: '2024-02-18'
    },
    {
        id: 2,
        name: 'Kontrak Kerja Sama',
        category: 'Kontrak',
        description: 'Template perjanjian kerja sama bisnis',
        usageCount: 32,
        lastUsed: '2024-02-15'
    },
    {
        id: 3,
        name: 'Gugatan Perdata',
        category: 'Litigasi',
        description: 'Template surat gugatan perdata',
        usageCount: 28,
        lastUsed: '2024-02-10'
    },
    {
        id: 4,
        name: 'MoU',
        category: 'Kontrak',
        description: 'Template Memorandum of Understanding',
        usageCount: 22,
        lastUsed: '2024-02-08'
    },
    {
        id: 5,
        name: 'Legal Opinion',
        category: 'Opinion',
        description: 'Template legal opinion standar',
        usageCount: 18,
        lastUsed: '2024-02-01'
    }
]

// Dashboard statistics
export const mockStats = {
    activeCases: 4,
    pendingInvoices: 2,
    totalRevenue: 945000000,
    upcomingDeadlines: 3,
    casesThisMonth: 2,
    revenueGrowth: 12.5,
    clientsTotal: 5,
    activeClients: 4,
    billableHours: 156,
    collectionRate: 78
}

// Messages for client portal
export const mockMessages = [
    {
        id: 1,
        from: 'Sarah Wijaya, S.H.',
        to: 'PT. Maju Sejahtera',
        subject: 'Update Perkembangan Kasus',
        message: 'Selamat siang, berikut kami sampaikan update terkait perkembangan kasus...',
        date: '2024-02-20',
        time: '10:30',
        read: false
    },
    {
        id: 2,
        from: 'PT. Maju Sejahtera',
        to: 'Sarah Wijaya, S.H.',
        subject: 'Re: Permintaan Dokumen',
        message: 'Terima kasih atas informasinya. Dokumen yang diminta sudah kami siapkan...',
        date: '2024-02-19',
        time: '15:45',
        read: true
    }
]

// Helper function to format currency
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount)
}

// Helper function to format date
export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}

// Helper function to get status color
export const getStatusColor = (status) => {
    const colors = {
        active: 'badge-active',
        pending: 'badge-pending',
        closed: 'badge-closed',
        paid: 'badge-active',
        overdue: 'badge-urgent',
        draft: 'badge-info'
    }
    return colors[status] || 'badge-info'
}

// Helper function to get priority color
export const getPriorityColor = (priority) => {
    const colors = {
        high: 'text-error',
        medium: 'text-warning',
        low: 'text-success'
    }
    return colors[priority] || ''
}
