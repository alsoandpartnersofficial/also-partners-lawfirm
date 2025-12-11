import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    Save,
    Plus,
    Trash2,
    FileText,
    DollarSign,
    AlertCircle,
    Calculator
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatCurrency } from '../../data/mockData'
import './Billing.css'

export default function InvoiceForm() {
    const navigate = useNavigate()
    const { addInvoice, clients, cases } = useApp()

    const [formData, setFormData] = useState({
        clientId: '',
        client: '',
        caseId: '',
        dueDate: '',
        items: [
            { description: '', hours: '', rate: '', amount: 0 }
        ]
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Filter cases by selected client
    const clientCases = formData.clientId
        ? cases.filter(c => c.clientId === Number(formData.clientId))
        : []

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))

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
            client: selectedClient ? selectedClient.name : '',
            caseId: '' // Reset case when client changes
        }))
    }

    const handleItemChange = (index, field, value) => {
        setFormData(prev => {
            const newItems = [...prev.items]
            newItems[index] = {
                ...newItems[index],
                [field]: value
            }

            // Calculate amount
            if (field === 'hours' || field === 'rate') {
                const hours = field === 'hours' ? Number(value) : Number(newItems[index].hours)
                const rate = field === 'rate' ? Number(value) : Number(newItems[index].rate)
                newItems[index].amount = hours * rate
            }

            return { ...prev, items: newItems }
        })
    }

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { description: '', hours: '', rate: '', amount: 0 }]
        }))
    }

    const removeItem = (index) => {
        if (formData.items.length === 1) return
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }))
    }

    const calculateTotal = () => {
        return formData.items.reduce((sum, item) => sum + (item.amount || 0), 0)
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.clientId) {
            newErrors.client = 'Klien wajib dipilih'
        }
        if (!formData.caseId) {
            newErrors.case = 'Kasus wajib dipilih'
        }
        if (!formData.dueDate) {
            newErrors.dueDate = 'Tanggal jatuh tempo wajib diisi'
        }

        const hasValidItem = formData.items.some(item =>
            item.description && item.hours && item.rate
        )
        if (!hasValidItem) {
            newErrors.items = 'Minimal satu item invoice harus diisi lengkap'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            const invoiceData = {
                clientId: Number(formData.clientId),
                client: formData.client,
                caseId: formData.caseId,
                dueDate: formData.dueDate,
                amount: calculateTotal(),
                items: formData.items.filter(item =>
                    item.description && item.hours && item.rate
                ).map(item => ({
                    description: item.description,
                    hours: Number(item.hours),
                    rate: Number(item.rate),
                    amount: item.amount
                }))
            }

            addInvoice(invoiceData)
            navigate('/billing')
        } catch (error) {
            console.error('Error saving invoice:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="invoice-form-page">
            <div className="page-header">
                <button className="btn btn-ghost" onClick={() => navigate('/billing')}>
                    <ArrowLeft size={18} />
                    Kembali
                </button>
                <h1 className="page-title">Buat Invoice Baru</h1>
            </div>

            <form onSubmit={handleSubmit} className="invoice-form">
                <div className="invoice-form-grid">
                    {/* Left Column - Invoice Details */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <FileText size={20} />
                                Detail Invoice
                            </h3>
                        </div>
                        <div className="card-body">
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
                                <label className="form-label">Kasus *</label>
                                <select
                                    name="caseId"
                                    className={`form-input form-select ${errors.case ? 'error' : ''}`}
                                    value={formData.caseId}
                                    onChange={handleChange}
                                    disabled={!formData.clientId}
                                >
                                    <option value="">
                                        {formData.clientId ? 'Pilih Kasus' : 'Pilih klien terlebih dahulu'}
                                    </option>
                                    {clientCases.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.id} - {c.title}
                                        </option>
                                    ))}
                                </select>
                                {errors.case && (
                                    <span className="form-error">
                                        <AlertCircle size={14} />
                                        {errors.case}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Jatuh Tempo *</label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    className={`form-input ${errors.dueDate ? 'error' : ''}`}
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                />
                                {errors.dueDate && (
                                    <span className="form-error">
                                        <AlertCircle size={14} />
                                        {errors.dueDate}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Summary */}
                    <div className="card invoice-summary-card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Calculator size={20} />
                                Ringkasan
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>{formatCurrency(calculateTotal())}</span>
                            </div>
                            <div className="summary-row">
                                <span>Pajak (0%)</span>
                                <span>{formatCurrency(0)}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>{formatCurrency(calculateTotal())}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Invoice Items */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">
                            <DollarSign size={20} />
                            Item Invoice
                        </h3>
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={addItem}
                        >
                            <Plus size={16} />
                            Tambah Item
                        </button>
                    </div>
                    <div className="card-body">
                        {errors.items && (
                            <div className="form-error-box">
                                <AlertCircle size={16} />
                                {errors.items}
                            </div>
                        )}

                        <div className="invoice-items-table">
                            <div className="invoice-items-header">
                                <span className="col-desc">Deskripsi</span>
                                <span className="col-hours">Jam</span>
                                <span className="col-rate">Rate (Rp)</span>
                                <span className="col-amount">Jumlah</span>
                                <span className="col-action"></span>
                            </div>

                            {formData.items.map((item, index) => (
                                <div key={index} className="invoice-item-row">
                                    <input
                                        type="text"
                                        className="form-input col-desc"
                                        placeholder="Deskripsi layanan"
                                        value={item.description}
                                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        className="form-input col-hours"
                                        placeholder="0"
                                        min="0"
                                        value={item.hours}
                                        onChange={(e) => handleItemChange(index, 'hours', e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        className="form-input col-rate"
                                        placeholder="0"
                                        min="0"
                                        value={item.rate}
                                        onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                                    />
                                    <span className="col-amount">
                                        {formatCurrency(item.amount || 0)}
                                    </span>
                                    <button
                                        type="button"
                                        className="btn btn-icon btn-ghost col-action"
                                        onClick={() => removeItem(index)}
                                        disabled={formData.items.length === 1}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/billing')}
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        <Save size={18} />
                        {isSubmitting ? 'Menyimpan...' : 'Buat Invoice'}
                    </button>
                </div>
            </form>
        </div>
    )
}
