import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Search,
    Plus,
    Filter,
    MoreVertical,
    Briefcase,
    Calendar,
    User,
    FileText,
    ChevronDown,
    Eye,
    Edit,
    Trash2,
    ArrowUpDown
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { mockCases, formatCurrency, formatDate, getStatusColor, getPriorityColor } from '../../data/mockData'
import './Cases.css'

export default function CaseList() {
    const { cases: contextCases, deleteCase } = useApp()
    // Use mockCases as fallback if context is empty
    const cases = contextCases.length > 0 ? contextCases : mockCases
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [typeFilter, setTypeFilter] = useState('all')
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState('desc')
    const [showFilters, setShowFilters] = useState(false)

    const caseTypes = ['Perdata', 'Pidana', 'Keluarga', 'Korporasi', 'Properti', 'Ketenagakerjaan']
    const statusOptions = [
        { value: 'all', label: 'Semua Status' },
        { value: 'active', label: 'Aktif' },
        { value: 'pending', label: 'Pending' },
        { value: 'closed', label: 'Selesai' }
    ]

    const handleDeleteCase = (caseId, caseTitle) => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus kasus "${caseTitle}"?`)) {
            deleteCase(caseId)
        }
    }

    const filteredCases = cases
        .filter(c => {
            const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.client.toLowerCase().includes(searchQuery.toLowerCase())
            const matchStatus = statusFilter === 'all' || c.status === statusFilter
            const matchType = typeFilter === 'all' || c.type === typeFilter
            return matchSearch && matchStatus && matchType
        })
        .sort((a, b) => {
            const modifier = sortOrder === 'asc' ? 1 : -1
            if (sortBy === 'createdAt') {
                return modifier * (new Date(a.createdAt) - new Date(b.createdAt))
            }
            if (sortBy === 'deadline') {
                return modifier * (new Date(a.deadline) - new Date(b.deadline))
            }
            if (sortBy === 'value') {
                return modifier * (a.value - b.value)
            }
            return 0
        })

    const toggleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortOrder('desc')
        }
    }

    const getStatusLabel = (status) => {
        const labels = { active: 'Aktif', pending: 'Pending', closed: 'Selesai' }
        return labels[status] || status
    }

    const getPriorityLabel = (priority) => {
        const labels = { high: 'Tinggi', medium: 'Sedang', low: 'Rendah' }
        return labels[priority] || priority
    }

    return (
        <div className="cases-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Manajemen Kasus</h1>
                    <p className="page-subtitle">Kelola semua kasus hukum kantor</p>
                </div>
                <Link to="/cases/new" className="btn btn-primary">
                    <Plus size={18} />
                    Kasus Baru
                </Link>
            </div>

            {/* Filters */}
            <div className="filters-bar">
                <div className="search-container">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        className="form-input search-input"
                        placeholder="Cari kasus, ID, atau klien..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="filter-actions">
                    <select
                        className="form-input form-select filter-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>

                    <select
                        className="form-input form-select filter-select"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="all">Semua Tipe</option>
                        {caseTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>

                    <button
                        className={`btn btn-secondary ${showFilters ? 'active' : ''}`}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter size={18} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="cases-stats">
                <div className="stat-pill">
                    <span className="stat-pill-value">{mockCases.filter(c => c.status === 'active').length}</span>
                    <span className="stat-pill-label">Aktif</span>
                </div>
                <div className="stat-pill pending">
                    <span className="stat-pill-value">{mockCases.filter(c => c.status === 'pending').length}</span>
                    <span className="stat-pill-label">Pending</span>
                </div>
                <div className="stat-pill closed">
                    <span className="stat-pill-value">{mockCases.filter(c => c.status === 'closed').length}</span>
                    <span className="stat-pill-label">Selesai</span>
                </div>
            </div>

            {/* Cases Table */}
            <div className="card">
                <div className="table-container">
                    <table className="table cases-table">
                        <thead>
                            <tr>
                                <th>Kasus</th>
                                <th>Klien</th>
                                <th>Tipe</th>
                                <th>Status</th>
                                <th>Prioritas</th>
                                <th className="sortable" onClick={() => toggleSort('deadline')}>
                                    Deadline
                                    <ArrowUpDown size={14} />
                                </th>
                                <th className="sortable" onClick={() => toggleSort('value')}>
                                    Nilai
                                    <ArrowUpDown size={14} />
                                </th>
                                <th>Progress</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCases.map(caseItem => (
                                <tr key={caseItem.id}>
                                    <td>
                                        <div className="case-cell">
                                            <span className="case-cell-id">{caseItem.id}</span>
                                            <Link to={`/cases/${caseItem.id}`} className="case-cell-title">
                                                {caseItem.title}
                                            </Link>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="client-cell">
                                            <div className="client-avatar">
                                                {caseItem.client.charAt(0)}
                                            </div>
                                            <span>{caseItem.client}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="type-badge">{caseItem.type}</span>
                                    </td>
                                    <td>
                                        <span className={`badge ${getStatusColor(caseItem.status)}`}>
                                            {getStatusLabel(caseItem.status)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`priority-badge ${caseItem.priority}`}>
                                            {getPriorityLabel(caseItem.priority)}
                                        </span>
                                    </td>
                                    <td>{formatDate(caseItem.deadline)}</td>
                                    <td className="value-cell">{formatCurrency(caseItem.value)}</td>
                                    <td>
                                        <div className="progress-cell">
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: `${caseItem.progress}%` }}
                                                ></div>
                                            </div>
                                            <span>{caseItem.progress}%</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="actions-cell">
                                            <Link to={`/cases/${caseItem.id}`} className="btn btn-icon btn-ghost" title="Lihat">
                                                <Eye size={16} />
                                            </Link>
                                            <Link to={`/cases/${caseItem.id}/edit`} className="btn btn-icon btn-ghost" title="Edit">
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                className="btn btn-icon btn-ghost btn-danger"
                                                title="Hapus"
                                                onClick={() => handleDeleteCase(caseItem.id, caseItem.title)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredCases.length === 0 && (
                    <div className="empty-table">
                        <Briefcase size={48} />
                        <h3>Tidak ada kasus ditemukan</h3>
                        <p>Coba ubah filter atau kata kunci pencarian</p>
                    </div>
                )}
            </div>
        </div>
    )
}
