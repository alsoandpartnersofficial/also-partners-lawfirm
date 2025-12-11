import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import {
    Bell,
    Sun,
    Moon,
    Search,
    ChevronDown,
    User,
    Settings,
    LogOut,
    Menu
} from 'lucide-react'
import './Header.css'

export default function Header({ onMenuClick, collapsed }) {
    const { user, logout } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const dropdownRef = useRef(null)
    const notifRef = useRef(null)

    // Sample notifications
    const notifications = [
        { id: 1, title: 'Kasus baru ditugaskan', message: 'Kasus PT. Abadi vs PT. Sejahtera', time: '5 menit lalu', unread: true },
        { id: 2, title: 'Pembayaran diterima', message: 'Invoice #INV-2024-001 telah dibayar', time: '1 jam lalu', unread: true },
        { id: 3, title: 'Deadline mendekat', message: 'Dokumen gugatan harus dikirim besok', time: '2 jam lalu', unread: false },
    ]

    const unreadCount = notifications.filter(n => n.unread).length

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifications(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const getInitials = (name) => {
        return name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U'
    }

    return (
        <header className="header" style={{ marginLeft: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)' }}>
            <div className="header-left">
                <button className="menu-btn mobile-only" onClick={onMenuClick}>
                    <Menu size={24} />
                </button>

                <div className="search-box">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Cari kasus, klien, atau dokumen..."
                        className="search-input"
                    />
                    <kbd className="search-shortcut">⌘K</kbd>
                </div>
            </div>

            <div className="header-right">
                <button
                    className="header-btn theme-toggle"
                    onClick={toggleTheme}
                    title={theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                {/* Notifications */}
                <div className="notification-wrapper" ref={notifRef}>
                    <button
                        className="header-btn notification-btn"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="notification-badge">{unreadCount}</span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="notification-dropdown">
                            <div className="dropdown-header">
                                <h4>Notifikasi</h4>
                                <button className="mark-all-read">Tandai semua dibaca</button>
                            </div>
                            <div className="notification-list">
                                {notifications.map(notif => (
                                    <div key={notif.id} className={`notification-item ${notif.unread ? 'unread' : ''}`}>
                                        <div className="notification-content">
                                            <p className="notification-title">{notif.title}</p>
                                            <p className="notification-message">{notif.message}</p>
                                            <span className="notification-time">{notif.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="dropdown-footer">
                                <button onClick={() => navigate('/notifications')}>Lihat semua notifikasi</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Menu */}
                <div className="user-wrapper" ref={dropdownRef}>
                    <button
                        className="user-btn"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <div className="user-avatar">
                            {getInitials(user?.name)}
                        </div>
                        <div className="user-info">
                            <span className="user-name">{user?.name}</span>
                            <span className="user-role">{user?.title}</span>
                        </div>
                        <ChevronDown size={16} className={`chevron ${showDropdown ? 'open' : ''}`} />
                    </button>

                    {showDropdown && (
                        <div className="user-dropdown">
                            <div className="dropdown-user-info">
                                <div className="user-avatar large">
                                    {getInitials(user?.name)}
                                </div>
                                <div>
                                    <p className="user-name">{user?.name}</p>
                                    <p className="user-email">{user?.email}</p>
                                </div>
                            </div>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item" onClick={() => navigate('/profile')}>
                                <User size={18} />
                                <span>Profil Saya</span>
                            </button>
                            <button className="dropdown-item" onClick={() => navigate('/settings')}>
                                <Settings size={18} />
                                <span>Pengaturan</span>
                            </button>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item danger" onClick={handleLogout}>
                                <LogOut size={18} />
                                <span>Keluar</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
