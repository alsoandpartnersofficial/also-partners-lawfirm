import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import {
    Briefcase,
    Users,
    DollarSign,
    Clock,
    TrendingUp,
    Calendar,
    AlertTriangle,
    ArrowRight,
    FileText,
    ChevronRight
} from 'lucide-react'
import { mockCases, mockStats, mockEvents, mockInvoices, formatCurrency, formatDate, getStatusColor } from '../data/mockData'
import './Dashboard.css'

export default function Dashboard() {
    const { user } = useAuth()

    const stats = [
        {
            label: 'Kasus Aktif',
            value: mockStats.activeCases,
            icon: Briefcase,
            color: 'var(--color-primary-500)',
            lightColor: 'var(--color-primary-50)',
            change: `+${mockStats.casesThisMonth} bulan ini`,
            positive: true
        },
        {
            label: 'Total Klien',
            value: mockStats.clientsTotal,
            icon: Users,
            color: 'var(--color-accent-500)',
            lightColor: 'var(--color-accent-50)',
            change: `${mockStats.activeClients} aktif`,
            positive: true
        },
        {
            label: 'Pendapatan',
            value: formatCurrency(mockStats.totalRevenue),
            icon: DollarSign,
            color: 'var(--color-success)',
            lightColor: 'var(--color-success-light)',
            change: `+${mockStats.revenueGrowth}%`,
            positive: true
        },
        {
            label: 'Jam Billable',
            value: mockStats.billableHours,
            icon: Clock,
            color: 'var(--color-info)',
            lightColor: 'var(--color-info-light)',
            change: 'Bulan ini',
            positive: true
        }
    ]

    const upcomingDeadlines = mockEvents.slice(0, 4)
    const recentCases = mockCases.filter(c => c.status !== 'closed').slice(0, 4)
    const pendingInvoices = mockInvoices.filter(i => i.status === 'pending' || i.status === 'overdue')

    const getEventTypeIcon = (type) => {
        const icons = {
            court: '⚖️',
            meeting: '👥',
            deadline: '📅',
            mediation: '🤝'
        }
        return icons[type] || '📌'
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div>
                    <h1 className="page-title">Selamat Datang, {user?.name?.split(' ')[0]}</h1>
                    <p className="page-subtitle">Berikut ringkasan aktivitas kantor hari ini</p>
                </div>
                <div className="header-actions">
                    <Link to="/cases/new" className="btn btn-primary">
                        <Briefcase size={18} />
                        Kasus Baru
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="stat-card"
                        style={{ '--stat-color': stat.color, '--stat-color-light': stat.lightColor }}
                    >
                        <div className="stat-icon">
                            <stat.icon size={24} />
                        </div>
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                        <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                            <TrendingUp size={14} />
                            {stat.change}
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid">
                {/* Recent Cases */}
                <div className="card dashboard-card">
                    <div className="card-header">
                        <h3 className="card-title">
                            <Briefcase size={20} />
                            Kasus Terbaru
                        </h3>
                        <Link to="/cases" className="card-link">
                            Lihat Semua
                            <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="case-list">
                        {recentCases.map(caseItem => (
                            <Link to={`/cases/${caseItem.id}`} key={caseItem.id} className="case-item">
                                <div className="case-info">
                                    <span className="case-id">{caseItem.id}</span>
                                    <h4 className="case-title">{caseItem.title}</h4>
                                    <div className="case-meta">
                                        <span className="case-type">{caseItem.type}</span>
                                        <span className="case-client">{caseItem.client}</span>
                                    </div>
                                </div>
                                <div className="case-right">
                                    <span className={`badge ${getStatusColor(caseItem.status)}`}>
                                        {caseItem.status === 'active' ? 'Aktif' : caseItem.status === 'pending' ? 'Pending' : 'Selesai'}
                                    </span>
                                    <div className="case-progress">
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: `${caseItem.progress}%` }}></div>
                                        </div>
                                        <span className="progress-text">{caseItem.progress}%</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="card dashboard-card">
                    <div className="card-header">
                        <h3 className="card-title">
                            <Calendar size={20} />
                            Jadwal Mendatang
                        </h3>
                        <Link to="/calendar" className="card-link">
                            Kalender
                            <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="event-list">
                        {upcomingDeadlines.map(event => (
                            <div key={event.id} className="event-item">
                                <div className="event-date">
                                    <span className="event-day">{new Date(event.date).getDate()}</span>
                                    <span className="event-month">{new Date(event.date).toLocaleDateString('id-ID', { month: 'short' })}</span>
                                </div>
                                <div className="event-info">
                                    <div className="event-type-icon">{getEventTypeIcon(event.type)}</div>
                                    <div className="event-details">
                                        <h4 className="event-title">{event.title}</h4>
                                        <div className="event-meta">
                                            <span>{event.time}</span>
                                            {event.location && <span>{event.location}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pending Invoices */}
                <div className="card dashboard-card">
                    <div className="card-header">
                        <h3 className="card-title">
                            <DollarSign size={20} />
                            Invoice Tertunda
                        </h3>
                        <Link to="/billing" className="card-link">
                            Lihat Semua
                            <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="invoice-list">
                        {pendingInvoices.length > 0 ? (
                            pendingInvoices.map(invoice => (
                                <div key={invoice.id} className="invoice-item">
                                    <div className="invoice-info">
                                        <span className="invoice-id">{invoice.id}</span>
                                        <h4 className="invoice-client">{invoice.client}</h4>
                                        <span className="invoice-date">Jatuh tempo: {formatDate(invoice.dueDate)}</span>
                                    </div>
                                    <div className="invoice-right">
                                        <span className="invoice-amount">{formatCurrency(invoice.amount)}</span>
                                        <span className={`badge ${getStatusColor(invoice.status)}`}>
                                            {invoice.status === 'pending' ? 'Pending' : 'Terlambat'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>Tidak ada invoice tertunda</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card dashboard-card quick-actions-card">
                    <div className="card-header">
                        <h3 className="card-title">Aksi Cepat</h3>
                    </div>
                    <div className="quick-actions">
                        <Link to="/cases/new" className="quick-action">
                            <div className="quick-action-icon">
                                <Briefcase size={24} />
                            </div>
                            <span>Buat Kasus</span>
                        </Link>
                        <Link to="/clients/new" className="quick-action">
                            <div className="quick-action-icon">
                                <Users size={24} />
                            </div>
                            <span>Tambah Klien</span>
                        </Link>
                        <Link to="/billing/new" className="quick-action">
                            <div className="quick-action-icon">
                                <FileText size={24} />
                            </div>
                            <span>Buat Invoice</span>
                        </Link>
                        <Link to="/time-tracking" className="quick-action">
                            <div className="quick-action-icon">
                                <Clock size={24} />
                            </div>
                            <span>Catat Waktu</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
