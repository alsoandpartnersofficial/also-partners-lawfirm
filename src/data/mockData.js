// Mock data for the law firm application

// Cases
export const mockCases = [
    {
        id: 'CASE-2024-001',
        title: 'PT. Abadi Jaya vs PT. Mitra Sejahtera',
        type: 'Perdata',
        status: 'active',
        priority: 'high',
        client: 'PT. Abadi Jaya',
        clientId: 1,
        assignedTo: ['Dr. Ahmad Fauzi, S.H., M.H.', 'Sarah Wijaya, S.H.'],
        createdAt: '2024-01-15',
        deadline: '2024-03-20',
        description: 'Sengketa kontrak kerjasama bisnis senilai Rp 5.2 Miliar',
        progress: 65,
        value: 5200000000,
        documents: 12,
        notes: 8
    },
    {
        id: 'CASE-2024-002',
        title: 'Budi Hartono - Perceraian',
        type: 'Keluarga',
        status: 'active',
        priority: 'medium',
        client: 'Budi Hartono',
        clientId: 2,
        assignedTo: ['Sarah Wijaya, S.H.'],
        createdAt: '2024-01-20',
        deadline: '2024-04-15',
        description: 'Pengurusan perceraian dan pembagian harta gono-gini',
        progress: 40,
        value: 150000000,
        documents: 6,
        notes: 4
    },
    {
        id: 'CASE-2024-003',
        title: 'PT. Global Tech - Akuisisi',
        type: 'Korporasi',
        status: 'pending',
        priority: 'high',
        client: 'PT. Global Tech',
        clientId: 3,
        assignedTo: ['Dr. Ahmad Fauzi, S.H., M.H.'],
        createdAt: '2024-02-01',
        deadline: '2024-06-30',
        description: 'Due diligence dan dokumentasi hukum akuisisi perusahaan',
        progress: 20,
        value: 8500000000,
        documents: 25,
        notes: 10
    },
    {
        id: 'CASE-2024-004',
        title: 'CV. Karya Mandiri - Sengketa Tanah',
        type: 'Properti',
        status: 'active',
        priority: 'low',
        client: 'CV. Karya Mandiri',
        clientId: 4,
        assignedTo: ['Sarah Wijaya, S.H.'],
        createdAt: '2024-02-10',
        deadline: '2024-05-20',
        description: 'Sengketa kepemilikan tanah seluas 2 hektar di Bogor',
        progress: 55,
        value: 3200000000,
        documents: 18,
        notes: 7
    },
    {
        id: 'CASE-2024-005',
        title: 'Rina Susanti - Kecelakaan Kerja',
        type: 'Ketenagakerjaan',
        status: 'closed',
        priority: 'medium',
        client: 'Rina Susanti',
        clientId: 5,
        assignedTo: ['Sarah Wijaya, S.H.'],
        createdAt: '2023-11-05',
        deadline: '2024-01-30',
        description: 'Klaim kompensasi kecelakaan kerja terhadap PT. Industri Jaya',
        progress: 100,
        value: 250000000,
        documents: 9,
        notes: 5
    }
]

// Clients
export const mockClients = [
    {
        id: 1,
        name: 'PT. Abadi Jaya',
        type: 'corporate',
        email: 'legal@abadijaya.co.id',
        phone: '+62 21 555 1234',
        address: 'Jl. Sudirman No. 100, Jakarta Selatan',
        contactPerson: 'Hendra Wijaya',
        activeCases: 1,
        totalCases: 3,
        totalBilled: 850000000,
        status: 'active',
        joinedAt: '2022-05-15'
    },
    {
        id: 2,
        name: 'Budi Hartono',
        type: 'individual',
        email: 'budi.hartono@email.com',
        phone: '+62 812 3456 7890',
        address: 'Jl. Kemang Raya No. 45, Jakarta Selatan',
        contactPerson: null,
        activeCases: 1,
        totalCases: 1,
        totalBilled: 75000000,
        status: 'active',
        joinedAt: '2024-01-20'
    },
    {
        id: 3,
        name: 'PT. Global Tech',
        type: 'corporate',
        email: 'corporate@globaltech.id',
        phone: '+62 21 777 8888',
        address: 'Gedung Cyber Tower, Jl. HR Rasuna Said, Jakarta',
        contactPerson: 'Diana Kusuma',
        activeCases: 1,
        totalCases: 5,
        totalBilled: 2500000000,
        status: 'active',
        joinedAt: '2021-08-10'
    },
    {
        id: 4,
        name: 'CV. Karya Mandiri',
        type: 'corporate',
        email: 'info@karyamandiri.com',
        phone: '+62 251 555 6789',
        address: 'Jl. Pahlawan No. 88, Bogor',
        contactPerson: 'Agus Pratama',
        activeCases: 1,
        totalCases: 2,
        totalBilled: 180000000,
        status: 'active',
        joinedAt: '2023-06-22'
    },
    {
        id: 5,
        name: 'Rina Susanti',
        type: 'individual',
        email: 'rina.s@email.com',
        phone: '+62 878 9012 3456',
        address: 'Jl. Margonda Raya No. 200, Depok',
        contactPerson: null,
        activeCases: 0,
        totalCases: 1,
        totalBilled: 50000000,
        status: 'inactive',
        joinedAt: '2023-11-05'
    }
]

// Invoices
export const mockInvoices = [
    {
        id: 'INV-2024-001',
        caseId: 'CASE-2024-001',
        client: 'PT. Abadi Jaya',
        amount: 250000000,
        status: 'paid',
        issuedAt: '2024-01-20',
        dueDate: '2024-02-20',
        paidAt: '2024-02-15',
        items: [
            { description: 'Konsultasi Awal', hours: 4, rate: 5000000, amount: 20000000 },
            { description: 'Drafting Dokumen', hours: 20, rate: 3500000, amount: 70000000 },
            { description: 'Representasi Pengadilan', hours: 16, rate: 10000000, amount: 160000000 }
        ]
    },
    {
        id: 'INV-2024-002',
        caseId: 'CASE-2024-002',
        client: 'Budi Hartono',
        amount: 75000000,
        status: 'pending',
        issuedAt: '2024-02-01',
        dueDate: '2024-03-01',
        paidAt: null,
        items: [
            { description: 'Konsultasi', hours: 3, rate: 5000000, amount: 15000000 },
            { description: 'Persiapan Dokumen', hours: 12, rate: 3000000, amount: 36000000 },
            { description: 'Mediasi', hours: 6, rate: 4000000, amount: 24000000 }
        ]
    },
    {
        id: 'INV-2024-003',
        caseId: 'CASE-2024-003',
        client: 'PT. Global Tech',
        amount: 500000000,
        status: 'overdue',
        issuedAt: '2024-01-15',
        dueDate: '2024-02-15',
        paidAt: null,
        items: [
            { description: 'Due Diligence', hours: 80, rate: 5000000, amount: 400000000 },
            { description: 'Legal Opinion', hours: 20, rate: 5000000, amount: 100000000 }
        ]
    },
    {
        id: 'INV-2024-004',
        caseId: 'CASE-2024-004',
        client: 'CV. Karya Mandiri',
        amount: 120000000,
        status: 'draft',
        issuedAt: null,
        dueDate: null,
        paidAt: null,
        items: [
            { description: 'Survey Lokasi', hours: 8, rate: 5000000, amount: 40000000 },
            { description: 'Penelitian Dokumen', hours: 16, rate: 3000000, amount: 48000000 },
            { description: 'Negosiasi', hours: 8, rate: 4000000, amount: 32000000 }
        ]
    }
]

// Time entries
export const mockTimeEntries = [
    {
        id: 1,
        caseId: 'CASE-2024-001',
        userId: 1,
        userName: 'Dr. Ahmad Fauzi, S.H., M.H.',
        date: '2024-02-20',
        hours: 4,
        description: 'Persiapan dokumen untuk sidang',
        billable: true,
        rate: 5000000
    },
    {
        id: 2,
        caseId: 'CASE-2024-001',
        userId: 2,
        userName: 'Sarah Wijaya, S.H.',
        date: '2024-02-20',
        hours: 6,
        description: 'Research case law dan preseden',
        billable: true,
        rate: 3500000
    },
    {
        id: 3,
        caseId: 'CASE-2024-002',
        userId: 2,
        userName: 'Sarah Wijaya, S.H.',
        date: '2024-02-19',
        hours: 3,
        description: 'Meeting dengan klien',
        billable: true,
        rate: 3500000
    },
    {
        id: 4,
        caseId: 'CASE-2024-003',
        userId: 1,
        userName: 'Dr. Ahmad Fauzi, S.H., M.H.',
        date: '2024-02-19',
        hours: 8,
        description: 'Due diligence review dokumen perusahaan',
        billable: true,
        rate: 5000000
    }
]

// Upcoming events/deadlines
export const mockEvents = [
    {
        id: 1,
        title: 'Sidang Perdana - PT. Abadi Jaya',
        caseId: 'CASE-2024-001',
        type: 'court',
        date: '2024-02-25',
        time: '09:00',
        location: 'Pengadilan Negeri Jakarta Selatan'
    },
    {
        id: 2,
        title: 'Meeting Klien - Budi Hartono',
        caseId: 'CASE-2024-002',
        type: 'meeting',
        date: '2024-02-22',
        time: '14:00',
        location: 'Kantor Also & Partners'
    },
    {
        id: 3,
        title: 'Deadline Submission Due Diligence',
        caseId: 'CASE-2024-003',
        type: 'deadline',
        date: '2024-02-28',
        time: '17:00',
        location: null
    },
    {
        id: 4,
        title: 'Mediasi - CV. Karya Mandiri',
        caseId: 'CASE-2024-004',
        type: 'mediation',
        date: '2024-03-05',
        time: '10:00',
        location: 'Kantor BPN Bogor'
    }
]

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
