import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useApp } from '../../context/AppContext'
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Users,
    DollarSign,
    Clock,
    Search,
    FileSearch,
    MessageSquare,
    Settings,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    Scale,
    BookOpen,
    UserCog
} from 'lucide-react'
import './Sidebar.css'

const menuItems = {
    admin: [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/cases', icon: Briefcase, label: 'Manajemen Kasus' },
        { path: '/clients', icon: Users, label: 'Database Klien' },
        { path: '/billing', icon: DollarSign, label: 'Penagihan' },
        { path: '/time-tracking', icon: Clock, label: 'Time Tracking' },
        { path: '/research', icon: Search, label: 'Riset Hukum' },
        { path: '/documents', icon: FileText, label: 'Dokumen' },
        { path: '/templates', icon: BookOpen, label: 'Template' },
        { path: '/users', icon: UserCog, label: 'Manajemen User' },
        { path: '/settings', icon: Settings, label: 'Pengaturan' },
    ],
    lawyer: [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/cases', icon: Briefcase, label: 'Kasus Saya' },
        { path: '/clients', icon: Users, label: 'Klien' },
        { path: '/billing', icon: DollarSign, label: 'Penagihan' },
        { path: '/time-tracking', icon: Clock, label: 'Time Tracking' },
        { path: '/research', icon: Search, label: 'Riset Hukum' },
        { path: '/documents', icon: FileText, label: 'Dokumen' },
    ],
    paralegal: [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/cases', icon: Briefcase, label: 'Kasus' },
        { path: '/documents', icon: FileText, label: 'Dokumen' },
        { path: '/research', icon: Search, label: 'Riset' },
    ],
    client: [
        { path: '/portal', icon: LayoutDashboard, label: 'Portal Saya' },
        { path: '/portal/cases', icon: Briefcase, label: 'Kasus Saya' },
        { path: '/portal/documents', icon: FileText, label: 'Dokumen' },
        { path: '/portal/messages', icon: MessageSquare, label: 'Pesan' },
        { path: '/portal/billing', icon: DollarSign, label: 'Tagihan' },
    ]
}

export default function Sidebar({ collapsed, onToggle }) {
    const { user } = useAuth()
    const { logo, firmInfo } = useApp()
    const location = useLocation()

    const items = menuItems[user?.role] || menuItems.client

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    {logo ? (
                        <img src={logo} alt="Logo" className="logo-icon logo-image" />
                    ) : (
                        <Scale className="logo-icon" />
                    )}
                    {!collapsed && (
                        <div className="logo-text">
                            <span className="logo-name">{firmInfo?.name || 'Also & Partners'}</span>
                            <span className="logo-tagline">{firmInfo?.tagline || 'Law Firm'}</span>
                        </div>
                    )}
                </div>
                <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    {items.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                title={collapsed ? item.label : undefined}
                            >
                                <item.icon className="nav-icon" />
                                {!collapsed && <span className="nav-label">{item.label}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <NavLink to="/help" className="nav-link" title={collapsed ? 'Bantuan' : undefined}>
                    <HelpCircle className="nav-icon" />
                    {!collapsed && <span className="nav-label">Bantuan</span>}
                </NavLink>
            </div>
        </aside>
    )
}

