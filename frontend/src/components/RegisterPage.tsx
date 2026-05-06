import { useState, type FormEvent } from 'react'
import { User, Mail, Lock, UserPlus, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import './Login.css'

export default function RegisterPage() {
  const { login } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, password, password_confirmation })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: 'success', message: 'Registrasi berhasil!' })
        setTimeout(() => login(data.access_token, data.user), 1000)
      } else {
        setStatus({ type: 'error', message: data.message || 'Registrasi gagal.' })
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Gagal terhubung ke server.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-blob login-blob--1" />
      <div className="login-blob login-blob--2" />

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
      >
        <div className="login-header">
          <div className="login-logo">
            <UserPlus size={28} />
          </div>
          <h1 className="login-title">Buat Akun</h1>
          <p className="login-subtitle">Daftar untuk mulai mengelola koleksi Anda</p>
        </div>

        <AnimatePresence>
          {status && (
            <motion.div
              className={`login-alert login-alert--${status.type}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span>{status.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} noValidate>
          <div className="login-field">
            <label className="login-label">Nama Lengkap</label>
            <div className="login-input-wrap">
              <User size={18} className="login-input-icon" />
              <input
                type="text"
                placeholder="Budi Santoso"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-label">Email</label>
            <div className="login-input-wrap">
              <Mail size={18} className="login-input-icon" />
              <input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-label">Kata Sandi</label>
            <div className="login-input-wrap">
              <Lock size={18} className="login-input-icon" />
              <input
                type="password"
                placeholder="Minimal 8 karakter"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-label">Konfirmasi Kata Sandi</label>
            <div className="login-input-wrap">
              <Lock size={18} className="login-input-icon" />
              <input
                type="password"
                placeholder="Ulangi kata sandi"
                value={password_confirmation}
                onChange={e => setPasswordConfirmation(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? <Loader2 size={20} className="login-spinner" /> : 'Daftar'}
          </button>
        </form>

        <p className="login-footer-text">
          Sudah punya akun? <a href="#" className="login-link login-link--accent">Masuk</a>
        </p>
      </motion.div>
    </div>
  )
}
