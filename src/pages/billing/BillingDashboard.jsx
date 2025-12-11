import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    DollarSign,
    TrendingUp,
    Clock,
    AlertCircle,
    Plus,
    Download,
    FileText,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    ChevronRight
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { mockInvoices, mockStats, formatCurrency, formatDate, getStatusColor } from '../../data/mockData'
import './Billing.css'

export default function BillingDashboard() {
    const { invoices: contextInvoices } = useApp()
    // Use mockInvoices as fallback if context is empty
    const invoices = contextInvoices.length > 0 ? contextInvoices : mockInvoices
    const [period, setPeriod] = useState('month')

    const totalRevenue = invoices.reduce((sum, inv) =>
        inv.status === 'paid' ? sum + inv.amount : sum, 0)
    const pendingAmount = invoices.reduce((sum, inv) =>
        inv.status === 'pending' ? sum + inv.amount : sum, 0)
    const overdueAmount = invoices.reduce((sum, inv) =>
        inv.status === 'overdue' ? sum + inv.amount : sum, 0)

    const stats = [
        {
            label: 'Total Pendapatan',
            value: formatCurrency(totalRevenue),
            icon: DollarSign,
            color: 'var(--color-success)',
            lightColor: 'var(--color-success-light)',
            change: '+12.5%',
            positive: true
        },
        {
            label: 'Menunggu Pembayaran',
            value: formatCurrency(pendingAmount),
            icon: Clock,
            color: 'var(--color-warning)',
            lightColor: 'var(--color-warning-light)',
            change: '2 invoice',
            positive: null
        },
        {
            label: 'Jatuh Tempo',
            value: formatCurrency(overdueAmount),
            icon: AlertCircle,
            color: 'var(--color-error)',
            lightColor: 'var(--color-error-light)',
            change: '1 invoice',
            positive: false
        },
        {
            label: 'Collection Rate',
            value: `${mockStats.collectionRate}%`,
            icon: TrendingUp,
            color: 'var(--color-primary-500)',
            lightColor: 'var(--color-primary-50)',
            change: '+5% vs bulan lalu',
            positive: true
        }
    ]

    const getStatusLabel = (status) => {
        const labels = { paid: 'Dibayar', pending: 'Pending', overdue: 'Terlambat', draft: 'Draft' }
        return labels[status] || status
    }

    // Simple chart data
    const monthlyData = [
        { month: 'Jan', revenue: 180000000 },
        { month: 'Feb', revenue: 250000000 },
        { month: 'Mar', revenue: 220000000 },
        { month: 'Apr', revenue: 310000000 },
        { month: 'Mei', revenue: 280000000 },
        { month: 'Jun', revenue: 350000000 },
    ]

    const maxRevenue = Math.max(...monthlyData.map(d => d.revenue))

    return (
        <div className="billing-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Billing & Akuntansi</h1>
                    <p className="page-subtitle">Kelola invoice dan laporan keuangan</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary">
                        <Download size={18} />
                        Export
                    </button>
                    <Link to="/billing/new" className="btn btn-primary">
                        <Plus size={18} />
                        Buat Invoice
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
                        {stat.positive !== null && (
                            <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.change}
                            </div>
                        )}
                        {stat.positive === null && (
                            <div className="stat-change neutral">{stat.change}</div>
                        )}
                    </div>
                ))}
            </div>

            <div className="billing-grid">
                {/* Revenue Chart */}
                <div className="card chart-card">
                    <div className="card-header">
                        <h3 className="card-title">Pendapatan Bulanan</h3>
                        <div className="period-selector">
                            <button
                                className={`period-btn ${period === 'month' ? 'active' : ''}`}
                                onClick={() => setPeriod('month')}
                            >
                                Bulanan
                            </button>
                            <button
                                className={`period-btn ${period === 'year' ? 'active' : ''}`}
                                onClick={() => setPeriod('year')}
                            >
                                Tahunan
                            </button>
                        </div>
                    </div>
                    <div className="chart-container">
                        <div className="bar-chart">
                            {monthlyData.map((data, index) => (
                                <div key={index} className="bar-item">
                                    <div className="bar-wrapper">
                                        <div
                                            className="bar"
                                            style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                                        >
                                            <span className="bar-tooltip">{formatCurrency(data.revenue)}</span>
                                        </div>
                                    </div>
                                    <span className="bar-label">{data.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Invoices */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">
                            <FileText size={20} />
                            Invoice Terbaru
                        </h3>
                        <Link to="/billing/invoices" className="card-link">
                            Lihat Semua
                            <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="invoice-list">
                        {invoices.slice(0, 4).map(invoice => (
                            <div key={invoice.id} className="invoice-item">
                                <div className="invoice-info">
                                    <div className="invoice-header">
                                        <span className="invoice-id">{invoice.id}</span>
                                        <span className={`badge ${getStatusColor(invoice.status)}`}>
                                            {getStatusLabel(invoice.status)}
                                        </span>
                                    </div>
                                    <h4 className="invoice-client">{invoice.client}</h4>
                                    <div className="invoice-meta">
                                        <span><Calendar size={12} /> {invoice.dueDate ? formatDate(invoice.dueDate) : 'Belum dikirim'}</span>
                                    </div>
                                </div>
                                <div className="invoice-amount">
                                    {formatCurrency(invoice.amount)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card quick-billing-actions">
                    <div className="card-header">
                        <h3 className="card-title">Aksi Cepat</h3>
                    </div>
                    <div className="billing-actions-grid">
                        <Link to="/billing/new" className="billing-action">
                            <div className="action-icon create">
                                <FileText size={24} />
                            </div>
                            <div className="action-text">
                                <h4>Buat Invoice</h4>
                                <p>Generate invoice baru untuk klien</p>
                            </div>
                        </Link>
                        <Link to="/time-tracking" className="billing-action">
                            <div className="action-icon time">
                                <Clock size={24} />
                            </div>
                            <div className="action-text">
                                <h4>Catat Waktu</h4>
                                <p>Record billable hours</p>
                            </div>
                        </Link>
                        <Link to="/billing/reports" className="billing-action">
                            <div className="action-icon report">
                                <TrendingUp size={24} />
                            </div>
                            <div className="action-text">
                                <h4>Laporan</h4>
                                <p>Financial reports & analytics</p>
                            </div>
                        </Link>
                        <Link to="/billing/payments" className="billing-action">
                            <div className="action-icon payment">
                                <DollarSign size={24} />
                            </div>
                            <div className="action-text">
                                <h4>Pembayaran</h4>
                                <p>Track payment records</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
