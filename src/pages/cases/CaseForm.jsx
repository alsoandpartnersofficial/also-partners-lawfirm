import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    ArrowLeft,
    Save,
    Briefcase,
    User,
    Calendar,
    DollarSign,
    FileText,
    AlertCircle
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatCurrency } from '../../data/mockData'
import './Cases.css'

export default function CaseForm() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { addCase, updateCase, getCaseById, clients } = useApp()

    const isEditing = Boolean(id)

    const caseTypes = ['Perdata', 'Pidana', 'Keluarga', 'Korporasi', 'Properti', 'Ketenagakerjaan']
    const priorityOptions = [
        { value: 'high', label: 'Tinggi' },
        { value: 'medium', label: 'Sedang' },
        { value: 'low', label: 'Rendah' }
    ]
    const statusOptions = [
        { value: 'active', label: 'Aktif' },
        { value: 'pending', label: 'Pending' },
        { value: 'closed', label: 'Selesai' }
    ]

    const [formData, setFormData] = useState({
        title: '',
        type: 'Perdata',
        client: '',
        clientId: '',
        priority: 'medium',
        status: 'active',
        deadline: '',
        description: '',
        value: '',
        assignedTo: []
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Load case data if editing
    useEffect(() => {
        if (isEditing && id) {
            const caseData = getCaseById(id)
            if (caseData) {
                setFormData({
                    title: caseData.title || '',
                    type: caseData.type || 'Perdata',
                    client: caseData.client || '',
                    clientId: caseData.clientId || '',
                    priority: caseData.priority || 'medium',
                    status: caseData.status || 'active',
                    deadline: caseData.deadline || '',
                    description: caseData.description || '',
                    value: caseData.value || '',
                    assignedTo: caseData.assignedTo || []
                })
            } else {
                // Case not found, redirect
                navigate('/cases')
            }
        }
    }, [id, isEditing, getCaseById, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }))
        }
    }

    const handleClientChange = (e) => {
        const clientId = e.target.value
        const selectedClient = clients.find(c => c.id === Number(clientId))
        setFormData(prev => ({
            ...prev,
            clientId: clientId,
            client: selectedClient ? selectedClient.name : ''
        }))
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.title.trim()) {
            newErrors.title = 'Judul kasus wajib diisi'
        }
        if (!formData.client) {
            newErrors.client = 'Klien wajib dipilih'
        }
        if (!formData.deadline) {
            newErrors.deadline = 'Deadline wajib diisi'
        }
        if (!formData.value || isNaN(Number(formData.value))) {
            newErrors.value = 'Nilai kasus wajib diisi dengan angka'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            const caseData = {
                ...formData,
                value: Number(formData.value),
                clientId: Number(formData.clientId)
            }

            if (isEditing) {
                updateCase(id, caseData)
            } else {
                addCase(caseData)
            }

            navigate('/cases')
        } catch (error) {
            console.error('Error saving case:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="case-form-page">
            <div className="page-header">
                <button className="btn btn-ghost" onClick={() => navigate('/cases')}>
                    <ArrowLeft size={18} />
                    Kembali
                </button>
                <h1 className="page-title">
                    {isEditing ? 'Edit Kasus' : 'Tambah Kasus Baru'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="case-form">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">
                            <Briefcase size={20} />
                            Informasi Kasus
                        </h3>
                    </div>
                    <div className="card-body">
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label className="form-label">Judul Kasus *</label>
                                <input
                                    type="text"
                                    name="title"
                                    className={`form-input ${errors.title ? 'error' : ''}`}
                                    placeholder="Contoh: PT. ABC vs PT. XYZ - Sengketa Kontrak"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                                {errors.title && (
                                    <span className="form-error">
                                        <AlertCircle size={14} />
                                        {errors.title}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Tipe Kasus *</label>
                                <select
                                    name="type"
                                    className="form-input form-select"
                                    value={formData.type}
                                    onChange={handleChange}
                                >
                                    {caseTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Klien *</label>
                                <select
                                    name="clientId"
                                    className={`form-input form-select ${errors.client ? 'error' : ''}`}
                                    value={formData.clientId}
                                    onChange={handleClientChange}
                                >
                                    <option value="">Pilih Klien</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>
                                            {client.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.client && (
                                    <span className="form-error">
                                        <AlertCircle size={14} />
                                        {errors.client}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Prioritas</label>
                                <select
                                    name="priority"
                                    className="form-input form-select"
                                    value={formData.priority}
                                    onChange={handleChange}
                                >
                                    {priorityOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <select
                                    name="status"
                                    className="form-input form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    {statusOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Deadline *</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    className={`form-input ${errors.deadline ? 'error' : ''}`}
                                    value={formData.deadline}
                                    onChange={handleChange}
                                />
                                {errors.deadline && (
                                    <span className="form-error">
                                        <AlertCircle size={14} />
                                        {errors.deadline}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Nilai Kasus (Rp) *</label>
                                <input
                                    type="number"
                                    name="value"
                                    className={`form-input ${errors.value ? 'error' : ''}`}
                                    placeholder="Contoh: 500000000"
                                    value={formData.value}
                                    onChange={handleChange}
                                />
                                {errors.value && (
                                    <span className="form-error">
                                        <AlertCircle size={14} />
                                        {errors.value}
                                    </span>
                                )}
                                {formData.value && !errors.value && (
                                    <span className="form-hint">
                                        {formatCurrency(Number(formData.value))}
                                    </span>
                                )}
                            </div>

                            <div className="form-group full-width">
                                <label className="form-label">Deskripsi</label>
                                <textarea
                                    name="description"
                                    className="form-input form-textarea"
                                    rows={4}
                                    placeholder="Deskripsi singkat tentang kasus..."
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/cases')}
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        <Save size={18} />
                        {isSubmitting ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah Kasus')}
                    </button>
                </div>
            </form>
        </div>
    )
}
