import { useState, useEffect } from 'react'
import { Book, Library, ExternalLink, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import { AuthProvider, useAuth } from './context/AuthContext'
import './App.css'

interface BookItem {
  id: number;
  title: string;
  author: string;
}

function LibraryApp() {
  const { user, logout } = useAuth()
  const [books, setBooks] = useState<BookItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch from the Laravel API here
    // fetch('http://localhost:8000/api/books', { headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` } })

    // Using mock data for now
    setTimeout(() => {
      setBooks([
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
        { id: 2, title: '1984', author: 'George Orwell' },
        { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
      ])
      setLoading(false)
    }, 800)
  }, [])

  return (
    <div className="min-h-screen">
      <nav className="navbar">
        <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Library className="text-primary" size={32} color="#6366f1" />
          <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>MyLibrary</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <span style={{ color: 'white', fontSize: '0.9rem' }}>Halo, {user?.name}</span>
          <button onClick={logout} className="btn-primary" style={{ background: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </nav>

      <header className="hero">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>Welcome, {user?.name}</h1>
          <p>Manage your personal collection with ease.</p>
        </motion.div>
      </header>

      <main className="grid">
        {loading ? (
          <p>Loading your collection...</p>
        ) : (
          books.map((book, index) => (
            <motion.div
              key={book.id}
              className="glass-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div style={{ marginBottom: '1rem' }}>
                <Book size={40} color="#6366f1" opacity={0.5} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{book.title}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{book.author}</p>
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', color: '#6366f1' }}>Available</span>
                <ExternalLink size={18} color="#94a3b8" />
              </div>
            </motion.div>
          ))
        )}
      </main>
    </div>
  )
}

function AppContent() {
  const { isAuthenticated, loading } = useAuth()
  const [showRegister, setShowRegister] = useState(false)

  if (loading) return <div>Loading...</div>

  if (!isAuthenticated) {
    return showRegister ?
      <div onClick={() => setShowRegister(false)}><RegisterPage /></div> :
      <div onClick={(e) => {
        if ((e.target as HTMLElement).innerText.includes('Daftar sekarang')) setShowRegister(true)
      }}><LoginPage /></div>
  }

  return <LibraryApp />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
