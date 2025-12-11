import { useState, useRef } from 'react'
import {
    Settings as SettingsIcon,
    Image,
    Building,
    Upload,
    Trash2,
    Save,
    AlertCircle,
    Check,
    X
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import './Settings.css'

export default function Settings() {
    const { logo, updateLogo, firmInfo, updateFirmInfo } = useApp()
    const fileInputRef = useRef(null)

    const [localFirmInfo, setLocalFirmInfo] = useState(firmInfo)
    const [previewLogo, setPreviewLogo] = useState(logo)
    const [isSaving, setIsSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)

    const handleFirmInfoChange = (e) => {
        const { name, value } = e.target
        setLocalFirmInfo(prev => ({ ...prev, [name]: value }))
    }

    const handleLogoUpload = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('File harus berupa gambar')
            return
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('Ukuran file maksimal 2MB')
            return
        }

        // Convert to base64 for storage
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreviewLogo(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleRemoveLogo = () => {
        setPreviewLogo(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleSave = async () => {
        setIsSaving(true)

        try {
            // Save logo
            updateLogo(previewLogo)

            // Save firm info
            updateFirmInfo(localFirmInfo)

            setSaveSuccess(true)
            setTimeout(() => setSaveSuccess(false), 3000)
        } catch (error) {
            console.error('Error saving settings:', error)
            alert('Gagal menyimpan pengaturan')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="settings-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Pengaturan</h1>
                    <p className="page-subtitle">Kelola pengaturan aplikasi dan firma</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <>Menyimpan...</>
                    ) : saveSuccess ? (
                        <>
                            <Check size={18} />
                            Tersimpan!
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            Simpan Pengaturan
                        </>
                    )}
                </button>
            </div>

            {saveSuccess && (
                <div className="success-toast">
                    <Check size={18} />
                    Pengaturan berhasil disimpan!
                </div>
            )}

            <div className="settings-grid">
                {/* Logo Settings */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">
                            <Image size={20} />
                            Logo Aplikasi
                        </h3>
                    </div>
                    <div className="card-body">
                        <p className="settings-description">
                            Upload logo firma Anda. Logo akan ditampilkan di sidebar dan dokumen.
                        </p>

                        <div className="logo-upload-section">
                            <div className="logo-preview-container">
                                {previewLogo ? (
                                    <div className="logo-preview">
                                        <img
                                            src={previewLogo}
                                            alt="Logo Preview"
                                            className="logo-preview-img"
                                        />
                                        <button
                                            className="logo-remove-btn"
                                            onClick={handleRemoveLogo}
                                            title="Hapus Logo"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="logo-placeholder">
                                        <Image size={48} />
                                        <span>Belum ada logo</span>
                                    </div>
                                )}
                            </div>

                            <div className="logo-upload-controls">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    className="hidden-input"
                                    id="logo-upload"
                                />
                                <label htmlFor="logo-upload" className="btn btn-secondary">
                                    <Upload size={18} />
                                    Upload Logo Baru
                                </label>
                                <p className="upload-hint">
                                    Format: PNG, JPG, SVG. Maksimal 2MB.<br />
                                    Disarankan: 200x200px atau lebih besar dengan rasio 1:1
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Firm Info Settings */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">
                            <Building size={20} />
                            Informasi Firma
                        </h3>
                    </div>
                    <div className="card-body">
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Nama Firma</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    value={localFirmInfo.name}
                                    onChange={handleFirmInfoChange}
                                    placeholder="Nama firma hukum"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Tagline</label>
                                <input
                                    type="text"
                                    name="tagline"
                                    className="form-input"
                                    value={localFirmInfo.tagline}
                                    onChange={handleFirmInfoChange}
                                    placeholder="Tagline firma"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label className="form-label">Alamat</label>
                                <textarea
                                    name="address"
                                    className="form-input form-textarea"
                                    rows={2}
                                    value={localFirmInfo.address}
                                    onChange={handleFirmInfoChange}
                                    placeholder="Alamat lengkap firma"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Telepon</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-input"
                                    value={localFirmInfo.phone}
                                    onChange={handleFirmInfoChange}
                                    placeholder="+62 21 xxx xxxx"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    value={localFirmInfo.email}
                                    onChange={handleFirmInfoChange}
                                    placeholder="email@firma.com"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
