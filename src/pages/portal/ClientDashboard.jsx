import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
    Briefcase,
    FileText,
    MessageSquare,
    DollarSign,
    Calendar,
    Clock,
    ChevronRight,
    Download,
    Eye
} from 'lucide-react'
import './Portal.css'

export default function ClientDashboard() {
    const { user } = useAuth()

    // Mock client data
    const clientCases = [
        {
            id: 'CASE-2024-001',
            title: 'PT. Abadi Jaya vs PT. Mitra Sejahtera',
            status: 'active',
            progress: 65,
            lastUpdate: '2024-02-20',
            lawyer: 'Dr. Ahmad Fauzi, S.H., M.H.'
        },
        {
            id: 'CASE-2023-015',
            title: 'Kontrak Kerjasama dengan PT. Indo Prima',
            status: 'closed',
            progress: 100,
            lastUpdate: '2024-01-15',
            lawyer: 'Sarah Wijaya, S.H.'
        }
    ]

    const recentDocuments = [
        { id: 1, name: 'Surat Kuasa.pdf', type: 'PDF', size: '245 KB', date: '2024-02-18' },
        { id: 2, name: 'Perjanjian Kerjasama.docx', type: 'DOCX', size: '1.2 MB', date: '2024-02-15' },
        { id: 3, name: 'Legal Opinion.pdf', type: 'PDF', size: '890 KB', date: '2024-02-10' },
    ]

    const upcomingEvents = [
        { id: 1, title: 'Sidang Perdana', date: '2024-02-25', time: '09:00', location: 'PN Jakarta Selatan' },
        { id: 2, title: 'Meeting Review Dokumen', date: '2024-02-28', time: '14:00', location: 'Kantor A&P' },
    ]

    const invoices = [
        { id: 'INV-2024-001', amount: 250000000, status: 'paid', date: '2024-01-20' },
        { id: 'INV-2024-002', amount: 75000000, status: 'pending', date: '2024-02-01' },
    ]

    const stats = [
        { label: 'Kasus Aktif', value: 1, icon: Briefcase, color: 'primary' },
        { label: 'Dokumen', value: 12, icon: FileText, color: 'accent' },
        { label: 'Pesan Baru', value: 3, icon: MessageSquare, color: 'info' },
        { label: 'Invoice Pending', value: 1, icon: DollarSign, color: 'warning' },
    ]

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount)
    }

    return (
        <div className="portal-page">
            <div className="portal-header">
                <div className="welcome-section">
                    <h1 className="page-title">Selamat Datang, {user?.name}</h1>
                    <p className="page-subtitle">Portal Klien Also & Partners</p>
                </div>
            </div>

            {/* Stats */}
            <div className="portal-stats">
                {stats.map((stat, index) => (
                    <div key={index} className={`portal-stat-card ${stat.color}`}>
                        <div className="stat-icon-wrapper">
                            <stat.icon size={24} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="portal-grid">
                {/* My Cases */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">
                            <Briefcase size={20} />
                            Kasus Saya
                        </h3>
                        <Link to="/portal/cases" className="card-link">
                            Lihat Semua <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="portal-case-list">
                        {clientCases.map(caseItem => (
                            <div key={caseItem.id} className="portal-case-item">
                                <div className="case-main">
                                    <span className="case-id">{caseItem.id}</span>
                                    <h4 className="case-title">{caseItem.title}</h4>
                                    <p className="case-lawyer">Ditangani oleh: {caseItem.lawyer}</p>
                                </div>
                                <div className="case-status-section">
                                    <span className={`badge ${caseItem.status === 'active' ? 'badge-active' : 'badge-closed'}`}>
                                        {caseItem.status === 'active' ? 'Aktif' : 'Selesai'}
                                    </span>
                                    <div className="case-progress-bar">
                                        <div className="progress-fill" style={{ width: `${caseItem.progress}%` }}></div>
                                    </div>
                                    <span className="progress-label">{caseItem.progress}% selesai</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">
                            <Calendar size={20} />
                            Jadwal Mendatang
                        </h3>
                    </div>
                    <div className="portal-events">
                        {upcomingEvents.map(event => (
                            <div key={event.id} className="portal-event">
                                <div className="event-date-box">
                                    <span className="event-day">{new Date(event.date).getDate()}</span>
                                    <span className="event-month">{new Date(event.date).toLocaleDateString('id-ID', { month: 'short' })}</span>
                                </div>
                                <div className="event-details">
                                    <h4>{event.title}</h4>
                                    <p><Clock size={12} /> {event.time} - {event.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Documents */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">
                            <FileText size={20} />
                            Dokumen Terbaru
                        </h3>
                        <Link to="/portal/documents" className="card-link">
                            Lihat Semua <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="portal-documents">
                        {recentDocuments.map(doc => (
                            <div key={doc.id} className="portal-document">
                                <div className="doc-icon">
                                    <FileText size={20} />
                                </div>
                                <div className="doc-info">
                                    <h4>{doc.name}</h4>
                                    <p>{doc.size} • {doc.date}</p>
                                </div>
                                <div className="doc-actions">
                                    <button className="btn btn-icon btn-ghost" title="Preview">
                                        <Eye size={16} />
                                    </button>
                                    <button className="btn btn-icon btn-ghost" title="Download">
                                        <Download size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Invoices */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">
                            <DollarSign size={20} />
                            Invoice
                        </h3>
                        <Link to="/portal/billing" className="card-link">
                            Lihat Semua <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="portal-invoices">
                        {invoices.map(invoice => (
                            <div key={invoice.id} className="portal-invoice">
                                <div className="invoice-info">
                                    <span className="invoice-id">{invoice.id}</span>
                                    <span className="invoice-date">{invoice.date}</span>
                                </div>
                                <div className="invoice-amount-section">
                                    <span className="invoice-amount">{formatCurrency(invoice.amount)}</span>
                                    <span className={`badge ${invoice.status === 'paid' ? 'badge-active' : 'badge-pending'}`}>
                                        {invoice.status === 'paid' ? 'Dibayar' : 'Pending'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="card contact-card">
                <div className="contact-content">
                    <div className="contact-info">
                        <h3>Butuh Bantuan?</h3>
                        <p>Tim kami siap membantu Anda. Hubungi kami melalui pesan atau jadwalkan konsultasi.</p>
                    </div>
                    <div className="contact-actions">
                        <Link to="/portal/messages" className="btn btn-primary">
                            <MessageSquare size={18} />
                            Kirim Pesan
                        </Link>
                        <button className="btn btn-secondary">
                            <Calendar size={18} />
                            Jadwalkan Konsultasi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
