import { useState } from 'react'
import {
    Search,
    Sparkles,
    Send,
    BookOpen,
    FileText,
    Clock,
    Star,
    Copy,
    ExternalLink,
    ChevronRight,
    Lightbulb,
    Scale,
    MessageSquare
} from 'lucide-react'
import './Research.css'

export default function ResearchDashboard() {
    const [query, setQuery] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [searchResult, setSearchResult] = useState(null)

    const recentSearches = [
        { id: 1, query: 'Pasal 1365 KUHPerdata tentang perbuatan melawan hukum', time: '2 jam lalu' },
        { id: 2, query: 'Prosedur gugatan class action di Indonesia', time: '1 hari lalu' },
        { id: 3, query: 'Ketentuan force majeure dalam kontrak', time: '2 hari lalu' },
    ]

    const suggestedTopics = [
        'Hukum Kontrak & Perjanjian',
        'Sengketa Properti',
        'Hukum Perusahaan',
        'Perceraian & Waris',
        'Ketenagakerjaan',
        'Hukum Pidana'
    ]

    const legalResources = [
        { id: 1, name: 'JDIH Kemenkumham', description: 'Database peraturan perundang-undangan', icon: Scale },
        { id: 2, name: 'Putusan MA', description: 'Direktori putusan Mahkamah Agung', icon: BookOpen },
        { id: 3, name: 'Hukumonline', description: 'Berita dan analisis hukum', icon: FileText },
    ]

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!query.trim()) return

        setIsSearching(true)

        // Simulate AI search
        await new Promise(resolve => setTimeout(resolve, 2000))

        setSearchResult({
            query: query,
            summary: `Berdasarkan pencarian Anda tentang "${query}", berikut adalah ringkasan hasil analisis hukum:\n\nPasal 1365 KUHPerdata mengatur tentang perbuatan melawan hukum (onrechtmatige daad). Menurut pasal ini, setiap perbuatan yang melawan hukum dan membawa kerugian kepada orang lain, mewajibkan orang yang karena salahnya menerbitkan kerugian itu untuk mengganti kerugian tersebut.\n\nUnsur-unsur perbuatan melawan hukum:\n1. Adanya perbuatan yang melawan hukum\n2. Adanya kesalahan\n3. Adanya kerugian\n4. Adanya hubungan kausal antara perbuatan dan kerugian`,
            references: [
                { title: 'Pasal 1365 KUHPerdata', source: 'Kitab Undang-Undang Hukum Perdata' },
                { title: 'Putusan MA No. 1875 K/Pdt/1984', source: 'Yurisprudensi MA' },
                { title: 'Arrest Lindenbaum-Cohen (1919)', source: 'Hukum Belanda' },
            ],
            relatedCases: [
                'PT. ABC vs PT. XYZ (2023)',
                'Budi Hartono vs Bank Indo (2022)',
            ]
        })

        setIsSearching(false)
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <div className="research-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        <Sparkles className="title-icon" />
                        AI Legal Research
                    </h1>
                    <p className="page-subtitle">Riset hukum cerdas dengan bantuan AI</p>
                </div>
            </div>

            {/* Search Section */}
            <div className="search-section">
                <form onSubmit={handleSearch} className="ai-search-form">
                    <div className="ai-search-input-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            className="ai-search-input"
                            placeholder="Tanyakan pertanyaan hukum Anda..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary search-btn"
                            disabled={isSearching || !query.trim()}
                        >
                            {isSearching ? (
                                <span className="animate-spin"><Sparkles size={18} /></span>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Cari
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Suggested Topics */}
                <div className="suggested-topics">
                    <span className="topics-label"><Lightbulb size={14} /> Topik populer:</span>
                    <div className="topic-tags">
                        {suggestedTopics.map((topic, index) => (
                            <button
                                key={index}
                                className="topic-tag"
                                onClick={() => setQuery(topic)}
                            >
                                {topic}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Search Result */}
            {searchResult && (
                <div className="search-result card animate-slide-up">
                    <div className="result-header">
                        <div className="result-title">
                            <Sparkles className="ai-icon" />
                            <span>Hasil AI Research</span>
                        </div>
                        <button className="btn btn-ghost btn-sm" onClick={() => copyToClipboard(searchResult.summary)}>
                            <Copy size={16} />
                            Salin
                        </button>
                    </div>

                    <div className="result-query">
                        <span className="query-label">Pertanyaan:</span>
                        <span className="query-text">{searchResult.query}</span>
                    </div>

                    <div className="result-content">
                        <pre className="result-summary">{searchResult.summary}</pre>
                    </div>

                    <div className="result-references">
                        <h4>📚 Referensi Hukum</h4>
                        <ul>
                            {searchResult.references.map((ref, index) => (
                                <li key={index}>
                                    <span className="ref-title">{ref.title}</span>
                                    <span className="ref-source">{ref.source}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="result-related">
                        <h4>⚖️ Kasus Terkait</h4>
                        <div className="related-cases">
                            {searchResult.relatedCases.map((caseItem, index) => (
                                <span key={index} className="related-case-tag">{caseItem}</span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Dashboard Grid */}
            {!searchResult && (
                <div className="research-grid">
                    {/* Recent Searches */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Clock size={20} />
                                Pencarian Terakhir
                            </h3>
                        </div>
                        <div className="recent-searches">
                            {recentSearches.map(search => (
                                <button
                                    key={search.id}
                                    className="recent-search-item"
                                    onClick={() => setQuery(search.query)}
                                >
                                    <div className="search-query-text">{search.query}</div>
                                    <div className="search-time">{search.time}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Legal Resources */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <BookOpen size={20} />
                                Sumber Hukum
                            </h3>
                        </div>
                        <div className="legal-resources">
                            {legalResources.map(resource => (
                                <a
                                    key={resource.id}
                                    href="#"
                                    className="resource-item"
                                >
                                    <div className="resource-icon">
                                        <resource.icon size={24} />
                                    </div>
                                    <div className="resource-info">
                                        <h4>{resource.name}</h4>
                                        <p>{resource.description}</p>
                                    </div>
                                    <ExternalLink size={16} className="external-icon" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* AI Chat Preview */}
                    <div className="card ai-chat-card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <MessageSquare size={20} />
                                AI Legal Assistant
                            </h3>
                        </div>
                        <div className="ai-chat-preview">
                            <div className="chat-bubble assistant">
                                <Sparkles size={16} className="chat-icon" />
                                <p>Halo! Saya adalah AI Legal Assistant. Saya dapat membantu Anda dengan:</p>
                                <ul>
                                    <li>Analisis kasus hukum</li>
                                    <li>Pencarian peraturan dan yurisprudensi</li>
                                    <li>Drafting dokumen hukum</li>
                                    <li>Interpretasi pasal-pasal undang-undang</li>
                                </ul>
                            </div>
                        </div>
                        <button className="btn btn-accent full-width">
                            <MessageSquare size={18} />
                            Mulai Chat dengan AI
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
