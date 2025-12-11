import { useState } from 'react'
import {
    UserPlus,
    Users,
    Trash2,
    Edit,
    Search,
    AlertCircle,
    Check,
    X
} from 'lucide-react'
import './Settings.css'

export default function UserManagement() {
    const [users, setUsers] = useState(() => {
        // Load users from localStorage or use default
        const saved = localStorage.getItem('appUsers')
        if (saved) {
            return JSON.parse(saved)
        }
        return [
            {
                id: 1,
                email: 'admin@alsoandpartners.com',
                name: 'Super Admin',
                role: 'admin',
                title: 'Administrator',
                status: 'active',
                createdAt: new Date().toISOString().split('T')[0]
            }
        ]
    })

    const [showForm, setShowForm] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'lawyer',
        title: ''
    })

    const roleOptions = [
        { value: 'lawyer', label: 'Lawyer' },
        { value: 'paralegal', label: 'Paralegal' }
    ]

    const saveUsersToStorage = (newUsers) => {
        localStorage.setItem('appUsers', JSON.stringify(newUsers))
        setUsers(newUsers)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        // Validation
        if (!formData.name || !formData.email || !formData.role) {
            setError('Nama, email, dan role wajib diisi')
            return
        }

        if (!editingUser && !formData.password) {
            setError('Password wajib diisi untuk user baru')
            return
        }

        // Check duplicate email
        const existingUser = users.find(u =>
            u.email === formData.email && u.id !== editingUser?.id
        )
        if (existingUser) {
            setError('Email sudah terdaftar')
            return
        }

        if (editingUser) {
            // Update existing user
            const updatedUsers = users.map(u =>
                u.id === editingUser.id
                    ? {
                        ...u,
                        name: formData.name,
                        email: formData.email,
                        role: formData.role,
                        title: formData.title,
                        ...(formData.password && { password: formData.password })
                    }
                    : u
            )
            saveUsersToStorage(updatedUsers)
            setSuccess('User berhasil diperbarui')
        } else {
            // Add new user
            const newUser = {
                id: Date.now(),
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                title: formData.title || roleOptions.find(r => r.value === formData.role)?.label,
                status: 'active',
                createdAt: new Date().toISOString().split('T')[0]
            }
            saveUsersToStorage([...users, newUser])
            setSuccess('User baru berhasil ditambahkan')
        }

        // Reset form
        setFormData({ name: '', email: '', password: '', role: 'lawyer', title: '' })
        setShowForm(false)
        setEditingUser(null)
    }

    const handleEdit = (user) => {
        if (user.role === 'admin') {
            setError('Admin tidak dapat diedit dari sini')
            return
        }
        setEditingUser(user)
        setFormData({
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
            title: user.title || ''
        })
        setShowForm(true)
        setError('')
        setSuccess('')
    }

    const handleDelete = (userId) => {
        const user = users.find(u => u.id === userId)
        if (user?.role === 'admin') {
            setError('Admin tidak dapat dihapus')
            return
        }

        if (window.confirm(`Apakah Anda yakin ingin menghapus user "${user?.name}"?`)) {
            const updatedUsers = users.filter(u => u.id !== userId)
            saveUsersToStorage(updatedUsers)
            setSuccess('User berhasil dihapus')
        }
    }

    const handleCancel = () => {
        setShowForm(false)
        setEditingUser(null)
        setFormData({ name: '', email: '', password: '', role: 'lawyer', title: '' })
        setError('')
    }

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const getRoleBadgeClass = (role) => {
        switch (role) {
            case 'admin': return 'badge-admin'
            case 'lawyer': return 'badge-lawyer'
            case 'paralegal': return 'badge-paralegal'
            default: return 'badge-default'
        }
    }

    return (
        <div className="settings-page">
            <div className="page-header">
                <div className="header-content">
                    <h1 className="page-title">
                        <Users size={28} />
                        Manajemen Pengguna
                    </h1>
                    <p className="page-subtitle">Kelola akun lawyer dan paralegal</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setShowForm(true)
                        setEditingUser(null)
                        setFormData({ name: '', email: '', password: '', role: 'lawyer', title: '' })
                        setError('')
                        setSuccess('')
                    }}
                >
                    <UserPlus size={18} />
                    Tambah User
                </button>
            </div>

            {error && (
                <div className="alert alert-error">
                    <AlertCircle size={18} />
                    {error}
                </div>
            )}

            {success && (
                <div className="alert alert-success">
                    <Check size={18} />
                    {success}
                </div>
            )}

            {showForm && (
                <div className="card user-form-card">
                    <div className="card-header">
                        <h3>{editingUser ? 'Edit User' : 'Tambah User Baru'}</h3>
                        <button className="btn btn-ghost btn-icon" onClick={handleCancel}>
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="user-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Nama Lengkap *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Masukkan nama lengkap"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>{editingUser ? 'Password Baru (kosongkan jika tidak diubah)' : 'Password *'}</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Masukkan password"
                                    required={!editingUser}
                                />
                            </div>
                            <div className="form-group">
                                <label>Role *</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    required
                                >
                                    {roleOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Jabatan/Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Contoh: Senior Associate"
                                />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                Batal
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {editingUser ? 'Simpan Perubahan' : 'Tambah User'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card">
                <div className="card-header">
                    <h3>Daftar Pengguna</h3>
                    <div className="search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Cari user..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="users-table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Jabatan</th>
                                <th>Tanggal Dibuat</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="empty-state">
                                        Tidak ada user ditemukan
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        <td className="user-name">{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge ${getRoleBadgeClass(user.role)}`}>
                                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                            </span>
                                        </td>
                                        <td>{user.title || '-'}</td>
                                        <td>{user.createdAt}</td>
                                        <td className="actions-cell">
                                            {user.role !== 'admin' && (
                                                <>
                                                    <button
                                                        className="btn btn-ghost btn-icon"
                                                        onClick={() => handleEdit(user)}
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        className="btn btn-ghost btn-icon btn-danger"
                                                        onClick={() => handleDelete(user.id)}
                                                        title="Hapus"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </>
                                            )}
                                            {user.role === 'admin' && (
                                                <span className="text-muted">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
