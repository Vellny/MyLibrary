import { useState, useEffect } from 'react'
import { Book, Library, Search, Plus, Globe, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import './App.css'

interface BookItem {
  id: number;
  title: string;
  author: string;
}

function App() {
  const [books, setBooks] = useState<BookItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch books:", err)
        // Fallback data if server is not running
        setBooks([
          { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
          { id: 2, title: '1984', author: 'George Orwell' },
          { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
        ])
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen">
      <nav className="navbar">
        <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Library className="text-primary" size={32} color="#6366f1" />
          <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>MyLibrary</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Dashboard</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Collections</a>
          <button className="btn-primary">Connect Wallet</button>
        </div>
      </nav>

      <header className="hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Curate Your Digital Library</h1>
          <p>
            The ultimate template for book lovers. Manage your collection with a
            modern, fast, and beautiful interface powered by React and Express.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button onClick={() => window.location.href = '/AddBook'} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={20} /> Add New Book
            </button>
            <button style={{
              background: 'transparent',
              border: '1px solid var(--glass-border)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Search size={20} /> Explore
            </button>
          </div>
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

      <footer style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid var(--glass-border)', marginTop: '4rem' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>&copy; 2026 MyLibrary Template. Built with ❤️ by Antigravity.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Globe size={24} color="#94a3b8" />
        </div>
      </footer>
    </div>
  )
}

export default App
