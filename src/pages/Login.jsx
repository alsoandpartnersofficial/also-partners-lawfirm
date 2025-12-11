import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Scale, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'
import './Login.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        const result = await login(email, password)

        if (result.success) {
            navigate('/dashboard')
        } else {
            setError(result.error)
        }

        setIsLoading(false)
    }



    return (
        <div className="login-page">
            <div className="login-left">
                <div className="login-branding">
                    <div className="login-logo">
                        <Scale size={48} />
                    </div>
                    <h1>Also & Partners</h1>
                    <p className="tagline">Law Firm Management System</p>
                </div>

                <div className="login-features">
                    <div className="feature-item">
                        <div className="feature-icon">⚖️</div>
                        <div className="feature-text">
                            <h3>Case Management</h3>
                            <p>Kelola semua kasus hukum dalam satu platform terintegrasi</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">💰</div>
                        <div className="feature-text">
                            <h3>Billing & Invoicing</h3>
                            <p>Otomatisasi penagihan dan pelacakan pembayaran klien</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">🔍</div>
                        <div className="feature-text">
                            <h3>Legal Research</h3>
                            <p>AI-powered research tools untuk riset hukum cepat</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">🔒</div>
                        <div className="feature-text">
                            <h3>Secure Portal</h3>
                            <p>Portal klien yang aman untuk komunikasi dan dokumen</p>
                        </div>
                    </div>
                </div>

                <div className="login-footer-left">
                    <p>© 2024 Also & Partners. All rights reserved.</p>
                </div>
            </div>

            <div className="login-right">
                <div className="login-form-container">
                    <div className="login-header">
                        <h2>Selamat Datang</h2>
                        <p>Masuk ke akun Anda untuk melanjutkan</p>
                    </div>

                    {error && (
                        <div className="login-error">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-input"
                                placeholder="nama@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-input"
                                    placeholder="Masukkan password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <span>Ingat saya</span>
                            </label>
                            <a href="#" className="forgot-link">Lupa password?</a>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg login-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="btn-loading">Memproses...</span>
                            ) : (
                                <>
                                    <span>Masuk</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>


                </div>
            </div>
        </div>
    )
}
