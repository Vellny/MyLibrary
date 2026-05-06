import { useState, useEffect, type FormEvent } from 'react'
import { Eye, EyeOff, Mail, Lock, LogIn, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import './Login.css'

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePassword(password: string): boolean {
  return password.length >= 8
}

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)

  const emailValid = validateEmail(email)
  const passwordValid = validatePassword(password)
  const formValid = emailValid && passwordValid

  useEffect(() => {
    if (status) setStatus(null)
  }, [email, password])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setEmailTouched(true)
    setPasswordTouched(true)

    if (!formValid) return

    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: 'success', message: 'Login berhasil! Mengalihkan...' })
        setTimeout(() => login(data.access_token, data.user), 1000)
      } else {
        setStatus({ type: 'error', message: data.message || 'Email atau kata sandi salah.' })
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
            <LogIn size={28} />
          </div>
          <h1 className="login-title">Selamat Datang</h1>
          <p className="login-subtitle">Masuk ke akun MyLibrary Anda</p>
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
            <label className="login-label">Email</label>
            <div className={`login-input-wrap ${emailTouched && !emailValid ? 'login-input-wrap--error' : ''}`}>
              <Mail size={18} className="login-input-icon" />
              <input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-label">Kata Sandi</label>
            <div className={`login-input-wrap ${passwordTouched && !passwordValid ? 'login-input-wrap--error' : ''}`}>
              <Lock size={18} className="login-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimal 8 karakter"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                disabled={loading}
              />
              <button
                type="button"
                className="login-toggle-pw"
                onClick={() => setShowPassword(v => !v)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? <Loader2 size={20} className="login-spinner" /> : 'Masuk'}
          </button>
        </form>

        <p className="login-footer-text">
          Belum punya akun? <a href="#" className="login-link login-link--accent">Daftar sekarang</a>
        </p>
      </motion.div>
    </div>
  )
}
