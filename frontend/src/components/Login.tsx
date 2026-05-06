import { useState, useEffect, type FormEvent } from 'react'
import { Eye, EyeOff, Mail, Lock, LogIn, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './Login.css'

interface LoginProps {
  onLoginSuccess: () => void
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePassword(password: string): boolean {
  return password.length >= 8
}

// ── Replace this function with a real API call ──────────────────────
async function simulateLogin(credentials: { email: string; password: string }): Promise<{ success: boolean; message: string }> {
  // Simulated network delay
  await new Promise(resolve => setTimeout(resolve, 1800))

  // For demo purposes, accept any valid input
  if (credentials.email && credentials.password) {
    return { success: true, message: 'Login berhasil! Mengalihkan ke dashboard...' }
  }

  return { success: false, message: 'Email atau kata sandi salah.' }
}
// ────────────────────────────────────────────────────────────────────

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Validation state
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)

  const emailValid = validateEmail(email)
  const passwordValid = validatePassword(password)
  const formValid = emailValid && passwordValid

  // Clear status when user starts typing again
  useEffect(() => {
    if (status) setStatus(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setEmailTouched(true)
    setPasswordTouched(true)

    if (!formValid) return

    setLoading(true)
    setStatus(null)

    try {
      const result = await simulateLogin({ email, password })

      if (result.success) {
        setStatus({ type: 'success', message: result.message })
        setTimeout(() => onLoginSuccess(), 1500)
      } else {
        setStatus({ type: 'error', message: result.message })
      }
    } catch {
      setStatus({ type: 'error', message: 'Terjadi kesalahan. Silakan coba lagi.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      {/* Decorative blobs */}
      <div className="login-blob login-blob--1" />
      <div className="login-blob login-blob--2" />

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="login-header">
          <div className="login-logo">
            <LogIn size={28} />
          </div>
          <h1 className="login-title">Selamat Datang</h1>
          <p className="login-subtitle">Masuk ke akun MyLibrary Anda</p>
        </div>

        {/* Status notification */}
        <AnimatePresence>
          {status && (
            <motion.div
              className={`login-alert login-alert--${status.type}`}
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
            >
              {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span>{status.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Email field */}
          <div className="login-field">
            <label htmlFor="login-email" className="login-label">Email</label>
            <div className={`login-input-wrap ${emailTouched && !emailValid ? 'login-input-wrap--error' : ''} ${emailTouched && emailValid ? 'login-input-wrap--valid' : ''}`}>
              <Mail size={18} className="login-input-icon" />
              <input
                id="login-email"
                type="email"
                placeholder="nama@email.com"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                disabled={loading}
              />
            </div>
            <AnimatePresence>
              {emailTouched && !emailValid && (
                <motion.p
                  className="login-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                >
                  Format email tidak valid
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Password field */}
          <div className="login-field">
            <label htmlFor="login-password" className="login-label">Kata Sandi</label>
            <div className={`login-input-wrap ${passwordTouched && !passwordValid ? 'login-input-wrap--error' : ''} ${passwordTouched && passwordValid ? 'login-input-wrap--valid' : ''}`}>
              <Lock size={18} className="login-input-icon" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimal 8 karakter"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                disabled={loading}
              />
              <button
                type="button"
                className="login-toggle-pw"
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <AnimatePresence>
              {passwordTouched && !passwordValid && (
                <motion.p
                  className="login-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                >
                  Kata sandi minimal 8 karakter
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Forgot password link */}
          <div className="login-aux-row">
            <a href="#" className="login-link">Lupa kata sandi?</a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? (
              <span className="login-submit-inner">
                <Loader2 size={20} className="login-spinner" />
                Memproses...
              </span>
            ) : (
              <span className="login-submit-inner">
                <LogIn size={20} />
                Masuk
              </span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="login-divider">
          <span>atau</span>
        </div>

        {/* Google login */}
        <button className="login-google" type="button" disabled={loading}>
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
          </svg>
          Masuk dengan Google
        </button>

        {/* Register link */}
        <p className="login-footer-text">
          Belum punya akun? <a href="#" className="login-link login-link--accent">Daftar sekarang</a>
        </p>
      </motion.div>
    </div>
  )
}
