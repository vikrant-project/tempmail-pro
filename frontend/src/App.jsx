import { useState, useEffect, useCallback, createContext, useContext, useRef } from "react"
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate, useLocation } from "react-router-dom"
import { 
  Mail, Plus, Trash2, Copy, Download, RefreshCw, Eye, Menu, X, Check, Clock, LogOut, 
  Shield, Inbox, Send, Key, Settings, User, ChevronRight, ChevronLeft, Sparkles, Globe, Zap, Bell, 
  Search, MailOpen, FileCode, KeyRound, AlertCircle, Webhook, BarChart3, RotateCcw, Activity, 
  Play, Star, Paperclip, ExternalLink, CheckCircle, XCircle, ArrowRight, Lock
} from "lucide-react"
import "./App.css"
import AnalyticsPageComponent from "./AnalyticsPage"

const API_URL = import.meta.env.VITE_API_URL || "https://api.amitbrand.shop/api"

// Toast notification system
const ToastContext = createContext(null)

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  
  const addToast = (message, type = "info") => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
  }
  
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.type === "success" && <CheckCircle size={18} />}
            {toast.type === "error" && <XCircle size={18} />}
            {toast.type === "info" && <Bell size={18} />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function useToast() {
  return useContext(ToastContext)
}

// Auth Context
const AuthContext = createContext(null)

function useAuth() {
  return useContext(AuthContext)
}

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [sessionToken, setSessionToken] = useState("")
  const [userToken, setUserToken] = useState("")
  const [usage, setUsage] = useState({ today: 0, limit: 200000, remaining: 200000 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("mailtemp_session")
    if (saved) {
      try {
        const { token, session } = JSON.parse(saved)
        setSessionToken(session)
        setUserToken(token)
        setIsLoggedIn(true)
      } catch (e) {
        localStorage.removeItem("mailtemp_session")
      }
    }
    setLoading(false)
  }, [])

  const api = useCallback(async (endpoint, options = {}) => {
    const headers = {
      "Content-Type": "application/json",
      ...(sessionToken && { "Authorization": `Bearer ${sessionToken}` })
    }
    const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Request failed")
    return data
  }, [sessionToken])

  const login = async (token) => {
    const res = await fetch(`${API_URL}/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Login failed")
    setSessionToken(data.session_token)
    setUserToken(token)
    setIsLoggedIn(true)
    setUsage({ today: data.current_usage || 0, limit: data.daily_limit || 200000, remaining: (data.daily_limit || 200000) - (data.current_usage || 0) })
    localStorage.setItem("mailtemp_session", JSON.stringify({ token, session: data.session_token }))
    return data
  }

  const logout = () => {
    setIsLoggedIn(false)
    setSessionToken("")
    setUserToken("")
    localStorage.removeItem("mailtemp_session")
  }

  const fetchUsage = async () => {
    try {
      const data = await api("/v1/token/usage")
      setUsage(data.usage)
    } catch (err) {
      console.error("Usage fetch error:", err)
    }
  }

  if (loading) return (
    <div className="loading-screen">
      <div className="loading-spinner">
        <Mail size={48} className="spin" />
      </div>
      <p>Loading...</p>
    </div>
  )

  return (
    <AuthContext.Provider value={{ isLoggedIn, sessionToken, userToken, usage, api, login, logout, fetchUsage, setUsage }}>
      {children}
    </AuthContext.Provider>
  )
}

// Protected Route
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) return <Navigate to="/login" replace />
  return children
}

// ============== LANDING PAGE ==============
function LandingPage() {
  const { isLoggedIn } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  if (isLoggedIn) return <Navigate to="/inbox" replace />

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav" data-testid="landing-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <div className="logo-icon">
              <Mail size={24} />
            </div>
            <span className="logo-text">TempMail</span>
          </Link>
          <div className="nav-links">
            <Link to="/login" className="nav-link" data-testid="nav-login-btn">Login</Link>
            <Link to="/signup" className="btn btn-primary btn-glow" data-testid="nav-signup-btn">
              Get Started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`hero-section ${isVisible ? "visible" : ""}`}>
        <div className="hero-container">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Privacy-First Email Service</span>
          </div>
          
          <h1 className="hero-title">
            Temporary Email
            <span className="gradient-text">Without the Hassle</span>
          </h1>
          
          <p className="hero-description">
            No registration. No passwords. Just instant, disposable email addresses 
            powered by token-based authentication. Your privacy, simplified.
          </p>
          
          <div className="hero-cta">
            <Link to="/signup" className="btn btn-primary btn-lg btn-glow" data-testid="hero-get-started-btn">
              <Key size={20} />
              Get Your Token
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg" data-testid="hero-login-btn">
              Already have a token?
            </Link>
          </div>

          {/* Floating Elements */}
          <div className="hero-visual">
            <div className="floating-card card-1">
              <Mail size={20} />
              <span>New email received</span>
            </div>
            <div className="floating-card card-2">
              <Shield size={20} />
              <span>100% Anonymous</span>
            </div>
            <div className="floating-card card-3">
              <Zap size={20} />
              <span>Instant delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2>Why Choose TempMail?</h2>
            <p>Everything you need for disposable email, nothing you dont.</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card" data-testid="feature-privacy">
              <div className="feature-icon">
                <Shield size={28} />
              </div>
              <h3>Complete Privacy</h3>
              <p>No personal info required. Your 40-character token is your only identity. No tracking, no data selling.</p>
            </div>
            
            <div className="feature-card" data-testid="feature-instant">
              <div className="feature-icon">
                <Zap size={28} />
              </div>
              <h3>Instant Setup</h3>
              <p>Generate a token and start receiving emails in under 30 seconds. No verification needed.</p>
            </div>
            
            <div className="feature-card" data-testid="feature-domains">
              <div className="feature-icon">
                <Globe size={28} />
              </div>
              <h3>Multiple Domains</h3>
              <p>Choose from temp, soul, or crack subdomains for your addresses. Variety for every need.</p>
            </div>
            
            <div className="feature-card" data-testid="feature-realtime">
              <div className="feature-icon">
                <Bell size={28} />
              </div>
              <h3>Real-time Updates</h3>
              <p>Receive emails instantly with live inbox updates. Never miss an important message.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <span className="stat-number">400K+</span>
            <span className="stat-label">Users Trust Us</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-card">
            <span className="stat-number">200K</span>
            <span className="stat-label">Daily API Calls</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-card">
            <span className="stat-number">99.9%</span>
            <span className="stat-label">Uptime</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to protect your inbox?</h2>
          <p>Start using temporary emails in seconds. No credit card required.</p>
          <Link to="/signup" className="btn btn-primary btn-lg btn-glow">
            Create Free Account <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <Mail size={20} />
            <span>TempMail by Amit Brands</span>
          </div>
          <p>&copy; 2024 Temp Amit Brands. Privacy-first temporary email service.</p>
        </div>
      </footer>
    </div>
  )
}

// ============== LOGIN PAGE ==============
function LoginPage() {
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [shake, setShake] = useState(false)
  const { login, isLoggedIn } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  if (isLoggedIn) return <Navigate to="/inbox" replace />

  const handleLogin = async (e) => {
    e.preventDefault()
    if (token.length !== 40) {
      setError("Token must be exactly 40 characters")
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    setLoading(true)
    setError("")
    try {
      await login(token)
      addToast("Welcome back!", "success")
      navigate("/inbox")
    } catch (err) {
      setError(err.message)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="bg-gradient"></div>
        <div className="bg-grid"></div>
      </div>
      
      <Link to="/" className="back-link" data-testid="back-to-home">
        <ChevronLeft size={18} />
        Back to home
      </Link>
      
      <div className={`auth-card ${shake ? "shake" : ""}`} data-testid="login-card">
        <div className="auth-icon">
          <div className="icon-glow">
            <Key size={32} />
          </div>
        </div>
        
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Enter your 40-character token to access your account</p>
        
        <form onSubmit={handleLogin}>
          {error && (
            <div className="alert alert-error" data-testid="login-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="token">Your Token</label>
            <div className="input-wrapper">
              <input
                ref={inputRef}
                id="token"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))}
                placeholder="Enter your 40-character token"
                maxLength={40}
                className="input input-lg"
                data-testid="login-token-input"
                spellCheck="false"
                autoComplete="off"
              />
              <Lock size={18} className="input-icon" />
            </div>
            <div className="input-meta">
              <span className="input-hint">Alphanumeric characters only</span>
              <span className={`char-counter ${token.length === 40 ? "complete" : ""}`}>
                {token.length}/40
              </span>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full btn-lg" 
            disabled={loading || token.length !== 40}
            data-testid="login-submit-btn"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : (
              <>
                Login
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <div className="auth-footer">
          <p>Dont have a token?</p>
          <Link to="/signup" className="btn btn-outline btn-full" data-testid="go-to-signup">
            Generate one for free
          </Link>
        </div>
      </div>
    </div>
  )
}

// ============== SIGNUP PAGE ==============
function SignupPage() {
  const [newToken, setNewToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const { isLoggedIn } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  if (isLoggedIn) return <Navigate to="/inbox" replace />

  const generateToken = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${API_URL}/v1/auth/signup`, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" } 
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setNewToken(data.token)
      addToast("Token generated successfully!", "success")
    } catch (err) {
      setError(err.message)
      addToast("Failed to generate token", "error")
    }
    setLoading(false)
  }

  const copyToken = () => {
    navigator.clipboard.writeText(newToken)
    setCopied(true)
    addToast("Token copied to clipboard!", "success")
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadToken = () => {
    const content = `Temp Amit Brands - Your Access Token
=====================================
Token: ${newToken}

IMPORTANT: Save this token securely! 
Its your only way to access your account.

How to use:
1. Go to https://temp.amitbrand.shop/login
2. Enter this 40-character token
3. Create temporary email addresses
4. Receive emails instantly

Available domains:
- @temp.amitbrand.shop
- @soul.amitbrand.shop  
- @crack.amitbrand.shop

Daily Limit: 200,000 API calls
Generated: ${new Date().toLocaleString()}`
    
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "tempmail-token.txt"
    a.click()
    URL.revokeObjectURL(url)
    addToast("Token file downloaded!", "success")
  }

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="bg-gradient"></div>
        <div className="bg-grid"></div>
      </div>
      
      <Link to="/" className="back-link" data-testid="back-to-home">
        <ChevronLeft size={18} />
        Back to home
      </Link>
      
      <div className="auth-card auth-card-wide" data-testid="signup-card">
        {!newToken ? (
          <>
            <div className="auth-icon">
              <div className="icon-glow success">
                <Sparkles size={32} />
              </div>
            </div>
            
            <h1>Create Your Token</h1>
            <p className="auth-subtitle">Get started with your private, anonymous email service</p>
            
            {error && (
              <div className="alert alert-error">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="benefits-list">
              <div className="benefit-item">
                <CheckCircle size={20} />
                <span>Unique 40-character access token</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={20} />
                <span>200,000 API calls per day</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={20} />
                <span>Multiple email addresses across 3 domains</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={20} />
                <span>24-hour email retention</span>
              </div>
            </div>

            <button 
              onClick={generateToken} 
              className="btn btn-primary btn-full btn-lg btn-glow"
              disabled={loading}
              data-testid="generate-token-btn"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate My Token
                </>
              )}
            </button>

            <div className="auth-footer">
              <p>Already have a token? <Link to="/login" data-testid="go-to-login">Login here</Link></p>
            </div>
          </>
        ) : (
          <>
            <div className="auth-icon">
              <div className="icon-glow success">
                <CheckCircle size={32} />
              </div>
            </div>
            
            <h1>Your Token is Ready!</h1>
            <p className="auth-subtitle warning">
              <AlertCircle size={16} />
              Save this token now - you wont see it again
            </p>

            <div className="token-display">
              <code data-testid="generated-token">{newToken}</code>
              <div className="token-actions">
                <button onClick={copyToken} className="btn btn-icon" title="Copy token">
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
                <button onClick={downloadToken} className="btn btn-icon" title="Download token">
                  <Download size={18} />
                </button>
              </div>
            </div>

            <div className="token-buttons">
              <button onClick={copyToken} className="btn btn-outline btn-full">
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copied!" : "Copy Token"}
              </button>
              <button onClick={downloadToken} className="btn btn-outline btn-full">
                <Download size={18} />
                Download as File
              </button>
            </div>

            <button 
              onClick={() => navigate("/login")}
              className="btn btn-primary btn-full btn-lg"
              data-testid="proceed-to-login"
            >
              Continue to Login
              <ArrowRight size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ============== DASHBOARD LAYOUT ==============
function DashboardLayout({ children }) {
  const { userToken, usage, logout } = useAuth()
  const { addToast } = useToast()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { path: "/inbox", icon: Inbox, label: "Inbox" },
    { path: "/emails", icon: Mail, label: "Addresses" },
    { path: "/send", icon: Send, label: "Compose" },
    { path: "/keys", icon: Key, label: "API Keys" },
    { path: "/webhooks", icon: Webhook, label: "Webhooks" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/docs", icon: FileCode, label: "API Docs" },
  ]

  const copyToken = () => {
    navigator.clipboard.writeText(userToken)
    addToast("Token copied!", "success")
  }

  return (
    <div className="dashboard">
      {/* Mobile Header */}
      <header className="mobile-header">
        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="mobile-logo">
          <Mail size={20} />
          <span>TempMail</span>
        </div>
        <button className="btn btn-icon" onClick={logout}>
          <LogOut size={20} />
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link to="/inbox" className="sidebar-logo">
            <Mail size={24} />
            <span>TempMail</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="usage-card">
            <div className="usage-header">
              <Activity size={16} />
              <span>Daily Usage</span>
            </div>
            <div className="usage-bar">
              <div 
                className="usage-fill" 
                style={{ width: `${Math.min((usage.today / usage.limit) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="usage-text">
              {usage.today.toLocaleString()} / {usage.limit.toLocaleString()}
            </div>
          </div>

          <div className="token-card" onClick={copyToken}>
            <Key size={16} />
            <span className="token-preview">{userToken.slice(0, 8)}...{userToken.slice(-4)}</span>
            <Copy size={14} />
          </div>

          <button className="btn btn-outline btn-full logout-btn" onClick={logout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {children}
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  )
}

// ============== INBOX PAGE ==============
function InboxPage() {
  const { api } = useAuth()
  const { addToast } = useToast()
  const [emails, setEmails] = useState([])
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [messagesLoading, setMessagesLoading] = useState(false)

  const fetchEmails = async () => {
    try {
      const data = await api("/v1/email/list")
      setEmails(data.emails || [])
      if (data.emails?.length > 0 && !selectedEmail) {
        setSelectedEmail(data.emails[0])
      }
    } catch (err) {
      addToast("Failed to load emails", "error")
    }
    setLoading(false)
  }

  const fetchMessages = async (emailId) => {
    setMessagesLoading(true)
    try {
      const data = await api(`/v1/email/${emailId}/messages`)
      setMessages(data.messages || [])
    } catch (err) {
      addToast("Failed to load messages", "error")
    }
    setMessagesLoading(false)
  }

  const fetchFullMessage = async (emailId, messageId) => {
    try {
      const data = await api(`/v1/email/${emailId}/messages/${messageId}`)
      setSelectedMessage(data.message)
    } catch (err) {
      addToast("Failed to load message", "error")
    }
  }

  useEffect(() => {
    fetchEmails()
    const interval = setInterval(fetchEmails, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (selectedEmail) {
      fetchMessages(selectedEmail.id)
    }
  }, [selectedEmail])

  const copyEmail = (address) => {
    navigator.clipboard.writeText(address)
    addToast("Email address copied!", "success")
  }

  return (
    <div className="inbox-page">
      <div className="page-header">
        <h1>Inbox</h1>
        <button className="btn btn-outline" onClick={fetchEmails}>
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="skeleton skeleton-list"></div>
        </div>
      ) : emails.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <Mail size={48} />
          </div>
          <h3>No email addresses yet</h3>
          <p>Create your first temporary email address to start receiving messages.</p>
          <Link to="/emails" className="btn btn-primary">
            <Plus size={18} />
            Create Email Address
          </Link>
        </div>
      ) : (
        <div className="inbox-layout">
          {/* Email Addresses */}
          <div className="email-list">
            <div className="list-header">
              <h3>Your Addresses</h3>
            </div>
            {emails.map(email => (
              <div 
                key={email.id}
                className={`email-item ${selectedEmail?.id === email.id ? "active" : ""}`}
                onClick={() => {setSelectedEmail(email); setSelectedMessage(null)}}
              >
                <div className="email-info">
                  <span className="email-address">{email.address}</span>
                  <span className="email-meta">
                    {email.unread_count > 0 && (
                      <span className="unread-badge">{email.unread_count}</span>
                    )}
                    {email.message_count} messages
                  </span>
                </div>
                <button className="btn btn-icon" onClick={(e) => {e.stopPropagation(); copyEmail(email.address)}}>
                  <Copy size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Messages */}
          <div className="messages-list">
            <div className="list-header">
              <h3>Messages</h3>
              {selectedEmail && (
                <span className="selected-email">{selectedEmail.address}</span>
              )}
            </div>
            {messagesLoading ? (
              <div className="loading-state">
                <div className="skeleton skeleton-messages"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="empty-state small">
                <MailOpen size={32} />
                <p>No messages yet</p>
              </div>
            ) : (
              messages.map(msg => (
                <div 
                  key={msg.id}
                  className={`message-item ${!msg.is_read ? "unread" : ""} ${selectedMessage?.id === msg.id ? "active" : ""}`}
                  onClick={() => fetchFullMessage(selectedEmail.id, msg.id)}
                >
                  <div className="message-sender">{msg.sender?.split("<")[0] || "Unknown"}</div>
                  <div className="message-subject">{msg.subject || "(No subject)"}</div>
                  <div className="message-preview">{msg.body_text?.slice(0, 80) || ""}</div>
                  <div className="message-time">
                    {new Date(msg.received_at).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message View */}
          <div className="message-view">
            {selectedMessage ? (
              <>
                <div className="message-header">
                  <h2>{selectedMessage.subject || "(No subject)"}</h2>
                  <div className="message-details">
                    <span><strong>From:</strong> {selectedMessage.sender}</span>
                    <span><strong>Date:</strong> {new Date(selectedMessage.received_at).toLocaleString()}</span>
                  </div>
                </div>
                <div className="message-body">
                  {selectedMessage.body_html ? (
                    <iframe 
                      srcDoc={selectedMessage.body_html}
                      title="Email content"
                      sandbox="allow-same-origin"
                    ></iframe>
                  ) : (
                    <pre>{selectedMessage.body_text}</pre>
                  )}
                </div>
              </>
            ) : (
              <div className="empty-state">
                <Eye size={32} />
                <p>Select a message to view</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ============== EMAILS PAGE ==============
function EmailsPage() {
  const { api } = useAuth()
  const { addToast } = useToast()
  const [emails, setEmails] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [newEmail, setNewEmail] = useState({ type: "random", name: "", subdomain: "temp" })

  const fetchEmails = async () => {
    try {
      const data = await api("/v1/email/list")
      setEmails(data.emails || [])
    } catch (err) {
      addToast("Failed to load emails", "error")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchEmails()
  }, [])

  const createEmail = async () => {
    setCreating(true)
    try {
      const payload = { type: newEmail.type, subdomain: newEmail.subdomain }
      if (newEmail.type === "custom") payload.name = newEmail.name
      await api("/v1/email/create", { method: "POST", body: JSON.stringify(payload) })
      addToast("Email address created!", "success")
      setShowModal(false)
      setNewEmail({ type: "random", name: "", subdomain: "temp" })
      fetchEmails()
    } catch (err) {
      addToast(err.message, "error")
    }
    setCreating(false)
  }

  const deleteEmail = async (id) => {
    if (!confirm("Delete this email address?")) return
    try {
      await api(`/v1/email/${id}`, { method: "DELETE" })
      addToast("Email deleted", "success")
      fetchEmails()
    } catch (err) {
      addToast(err.message, "error")
    }
  }

  const copyEmail = (address) => {
    navigator.clipboard.writeText(address)
    addToast("Copied!", "success")
  }

  return (
    <div className="emails-page">
      <div className="page-header">
        <h1>Email Addresses</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Create New
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="skeleton skeleton-grid"></div>
        </div>
      ) : emails.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <Mail size={48} />
          </div>
          <h3>No email addresses</h3>
          <p>Create your first temporary email to get started</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Create Email
          </button>
        </div>
      ) : (
        <div className="emails-grid">
          {emails.map(email => (
            <div key={email.id} className="email-card">
              <div className="email-card-header">
                <Mail size={20} />
                <span className={`domain-badge ${email.subdomain}`}>{email.subdomain}</span>
              </div>
              <div className="email-card-body">
                <span className="email-address">{email.address}</span>
                <div className="email-stats">
                  <span><Inbox size={14} /> {email.message_count} msgs</span>
                  <span><Clock size={14} /> {new Date(email.expires_at).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="email-card-actions">
                <button className="btn btn-outline btn-sm" onClick={() => copyEmail(email.address)}>
                  <Copy size={14} /> Copy
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteEmail(email.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create Email Address</h2>
              <button className="btn btn-icon" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Type</label>
                <div className="toggle-group">
                  <button 
                    className={`toggle-btn ${newEmail.type === "random" ? "active" : ""}`}
                    onClick={() => setNewEmail({...newEmail, type: "random"})}
                  >
                    Random
                  </button>
                  <button 
                    className={`toggle-btn ${newEmail.type === "custom" ? "active" : ""}`}
                    onClick={() => setNewEmail({...newEmail, type: "custom"})}
                  >
                    Custom
                  </button>
                </div>
              </div>

              {newEmail.type === "custom" && (
                <div className="form-group">
                  <label>Email Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="myemail"
                    value={newEmail.name}
                    onChange={e => setNewEmail({...newEmail, name: e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, "")})}
                  />
                </div>
              )}

              <div className="form-group">
                <label>Domain</label>
                <div className="domain-select">
                  {["temp", "soul", "crack"].map(d => (
                    <button
                      key={d}
                      className={`domain-btn ${newEmail.subdomain === d ? "active" : ""}`}
                      onClick={() => setNewEmail({...newEmail, subdomain: d})}
                    >
                      @{d}.amitbrand.shop
                    </button>
                  ))}
                </div>
              </div>

              <div className="preview-box">
                <span className="preview-label">Preview:</span>
                <code>
                  {newEmail.type === "custom" && newEmail.name 
                    ? `${newEmail.name}@${newEmail.subdomain}.amitbrand.shop`
                    : `<random>@${newEmail.subdomain}.amitbrand.shop`
                  }
                </code>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button 
                className="btn btn-primary" 
                onClick={createEmail}
                disabled={creating || (newEmail.type === "custom" && !newEmail.name)}
              >
                {creating ? "Creating..." : "Create Email"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============== SEND MAIL PAGE ==============
function SendMailPage() {
  const { api } = useAuth()
  const { addToast } = useToast()
  const [emails, setEmails] = useState([])
  const [form, setForm] = useState({ emailId: "", to: "", subject: "", body: "" })
  const [sending, setSending] = useState(false)

  useEffect(() => {
    api("/v1/email/list").then(data => setEmails(data.emails || [])).catch(() => {})
  }, [])

  const sendMail = async (e) => {
    e.preventDefault()
    if (!form.emailId || !form.to || !form.subject || !form.body) {
      addToast("Please fill all fields", "error")
      return
    }
    setSending(true)
    try {
      await api("/v1/mail/send", { method: "POST", body: JSON.stringify(form) })
      addToast("Email sent successfully!", "success")
      setForm({ emailId: form.emailId, to: "", subject: "", body: "" })
    } catch (err) {
      addToast(err.message, "error")
    }
    setSending(false)
  }

  return (
    <div className="send-page">
      <div className="page-header">
        <h1>Compose Email</h1>
      </div>

      <div className="compose-card">
        <form onSubmit={sendMail}>
          <div className="form-group">
            <label>From</label>
            <select 
              className="input" 
              value={form.emailId} 
              onChange={e => setForm({...form, emailId: e.target.value})}
            >
              <option value="">Select sender address</option>
              {emails.map(e => <option key={e.id} value={e.id}>{e.address}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>To</label>
            <input
              type="email"
              className="input"
              placeholder="recipient@example.com"
              value={form.to}
              onChange={e => setForm({...form, to: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              className="input"
              placeholder="Email subject"
              value={form.subject}
              onChange={e => setForm({...form, subject: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              className="input textarea"
              placeholder="Write your message..."
              rows={10}
              value={form.body}
              onChange={e => setForm({...form, body: e.target.value})}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" disabled={sending}>
            {sending ? (
              <>
                <span className="spinner"></span>
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Send Email
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

// ============== API KEYS PAGE ==============
function ApiKeysPage() {
  const { api } = useAuth()
  const { addToast } = useToast()
  const [keys, setKeys] = useState([])
  const [loading, setLoading] = useState(true)
  const [newKey, setNewKey] = useState(null)
  const [creating, setCreating] = useState(false)

  const fetchKeys = async () => {
    try {
      const data = await api("/v1/keys")
      setKeys(data.keys || [])
    } catch (err) {
      addToast("Failed to load keys", "error")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchKeys()
  }, [])

  const createKey = async () => {
    setCreating(true)
    try {
      const data = await api("/v1/keys/create", { method: "POST", body: JSON.stringify({ name: "API Key" }) })
      setNewKey(data.api_key)
      addToast("API key created!", "success")
      fetchKeys()
    } catch (err) {
      addToast(err.message, "error")
    }
    setCreating(false)
  }

  const deleteKey = async (id) => {
    if (!confirm("Delete this API key?")) return
    try {
      await api(`/v1/keys/${id}`, { method: "DELETE" })
      addToast("Key deleted", "success")
      fetchKeys()
    } catch (err) {
      addToast(err.message, "error")
    }
  }

  const copyKey = (key) => {
    navigator.clipboard.writeText(key)
    addToast("Copied!", "success")
  }

  return (
    <div className="keys-page">
      <div className="page-header">
        <h1>API Keys</h1>
        <button className="btn btn-primary" onClick={createKey} disabled={creating}>
          <Plus size={18} />
          {creating ? "Creating..." : "Create Key"}
        </button>
      </div>

      {newKey && (
        <div className="alert alert-success new-key-alert">
          <div>
            <strong>New API Key Created!</strong>
            <p>Save this key now - you wont see it again.</p>
            <code>{newKey}</code>
          </div>
          <div className="alert-actions">
            <button className="btn btn-outline btn-sm" onClick={() => copyKey(newKey)}>
              <Copy size={14} /> Copy
            </button>
            <button className="btn btn-icon" onClick={() => setNewKey(null)}>
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          <div className="skeleton skeleton-list"></div>
        </div>
      ) : keys.length === 0 ? (
        <div className="empty-state">
          <Key size={48} />
          <h3>No API keys</h3>
          <p>Create an API key to use programmatic access</p>
          <button className="btn btn-primary" onClick={createKey}>
            <Plus size={18} />
            Create Key
          </button>
        </div>
      ) : (
        <div className="keys-list">
          {keys.map(key => (
            <div key={key.id} className="key-card">
              <div className="key-info">
                <span className="key-name">{key.name}</span>
                <code className="key-prefix">{key.key_prefix}...</code>
                <span className="key-meta">
                  Created: {new Date(key.created_at).toLocaleDateString()}
                  {key.last_used_at && ` • Last used: ${new Date(key.last_used_at).toLocaleDateString()}`}
                </span>
              </div>
              <div className="key-actions">
                <button className="btn btn-danger btn-sm" onClick={() => deleteKey(key.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============== WEBHOOKS PAGE ==============
function WebhooksPage() {
  const { api } = useAuth()
  const { addToast } = useToast()
  const [webhooks, setWebhooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [newWebhook, setNewWebhook] = useState({ url: "", events: ["message.received"] })

  const fetchWebhooks = async () => {
    try {
      const data = await api("/v1/webhooks")
      setWebhooks(data.webhooks || [])
    } catch (err) {
      addToast("Failed to load webhooks", "error")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchWebhooks()
  }, [])

  const createWebhook = async () => {
    try {
      await api("/v1/webhooks", { method: "POST", body: JSON.stringify(newWebhook) })
      addToast("Webhook created!", "success")
      setShowModal(false)
      setNewWebhook({ url: "", events: ["message.received"] })
      fetchWebhooks()
    } catch (err) {
      addToast(err.message, "error")
    }
  }

  const deleteWebhook = async (id) => {
    if (!confirm("Delete this webhook?")) return
    try {
      await api(`/v1/webhooks/${id}`, { method: "DELETE" })
      addToast("Webhook deleted", "success")
      fetchWebhooks()
    } catch (err) {
      addToast(err.message, "error")
    }
  }

  const testWebhook = async (id) => {
    try {
      const data = await api(`/v1/webhooks/${id}/test`, { method: "POST" })
      addToast(data.delivered ? "Webhook test successful!" : "Webhook test failed", data.delivered ? "success" : "error")
    } catch (err) {
      addToast(err.message, "error")
    }
  }

  return (
    <div className="webhooks-page">
      <div className="page-header">
        <h1>Webhooks</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Add Webhook
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="skeleton skeleton-list"></div>
        </div>
      ) : webhooks.length === 0 ? (
        <div className="empty-state">
          <Webhook size={48} />
          <h3>No webhooks</h3>
          <p>Add a webhook to receive real-time notifications</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Add Webhook
          </button>
        </div>
      ) : (
        <div className="webhooks-list">
          {webhooks.map(wh => (
            <div key={wh.id} className="webhook-card">
              <div className="webhook-info">
                <span className="webhook-url">{wh.url}</span>
                <span className="webhook-events">{wh.events?.join(", ")}</span>
                <span className={`webhook-status ${wh.status}`}>{wh.status}</span>
              </div>
              <div className="webhook-actions">
                <button className="btn btn-outline btn-sm" onClick={() => testWebhook(wh.id)}>
                  <Play size={14} /> Test
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteWebhook(wh.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Webhook</h2>
              <button className="btn btn-icon" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Webhook URL</label>
                <input
                  type="url"
                  className="input"
                  placeholder="https://example.com/webhook"
                  value={newWebhook.url}
                  onChange={e => setNewWebhook({...newWebhook, url: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Events</label>
                <div className="checkbox-group">
                  {["message.received", "message.read", "email.created", "email.deleted"].map(event => (
                    <label key={event} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newWebhook.events.includes(event)}
                        onChange={e => {
                          if (e.target.checked) {
                            setNewWebhook({...newWebhook, events: [...newWebhook.events, event]})
                          } else {
                            setNewWebhook({...newWebhook, events: newWebhook.events.filter(ev => ev !== event)})
                          }
                        }}
                      />
                      <span>{event}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={createWebhook} disabled={!newWebhook.url}>
                Create Webhook
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============== ANALYTICS PAGE ==============
function AnalyticsPage() { const { api } = useAuth(); return <AnalyticsPageComponent api={api} />; }
function AnalyticsPageOld() {
  const { api, usage } = useAuth()
  const { addToast } = useToast()
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [range, setRange] = useState("24h")

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const data = await api(`/v1/analytics/usage?range=${range}`)
      setAnalytics(data)
    } catch (err) {
      addToast("Failed to load analytics", "error")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchAnalytics()
  }, [range])

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>Analytics</h1>
        <div className="range-selector">
          {["1h", "24h", "7d", "30d"].map(r => (
            <button
              key={r}
              className={`btn btn-sm ${range === r ? "btn-primary" : "btn-outline"}`}
              onClick={() => setRange(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon"><Activity size={24} /></div>
          <div className="stat-content">
            <span className="stat-value">{usage.today.toLocaleString()}</span>
            <span className="stat-label">Today Usage</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><BarChart3 size={24} /></div>
          <div className="stat-content">
            <span className="stat-value">{analytics?.totals?.total_requests || 0}</span>
            <span className="stat-label">Total Requests ({range})</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Zap size={24} /></div>
          <div className="stat-content">
            <span className="stat-value">{analytics?.totals?.total_tokens || 0}</span>
            <span className="stat-label">Tokens Used ({range})</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="skeleton skeleton-chart"></div>
        </div>
      ) : analytics?.data?.length > 0 ? (
        <div className="chart-card">
          <h3>Usage Over Time</h3>
          <div className="simple-chart">
            {analytics.data.map((point, i) => (
              <div key={i} className="chart-bar" title={`${point.requests} requests`}>
                <div 
                  className="bar-fill"
                  style={{ height: `${Math.min(100, (parseInt(point.requests) / Math.max(...analytics.data.map(d => parseInt(d.requests)))) * 100)}%` }}
                ></div>
                <span className="bar-label">{new Date(point.period).toLocaleTimeString([], {hour: "2-digit"})}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <BarChart3 size={48} />
          <p>No data for selected period</p>
        </div>
      )}
    </div>
  )
}

// ============== API DOCS PAGE ==============
function ApiDocsPage() {
  const [endpoints, setEndpoints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/v1/docs/endpoints`)
      .then(r => r.json())
      .then(data => setEndpoints(data.endpoints || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="docs-page">
      <div className="page-header">
        <h1>API Documentation</h1>
        <a href={`${API_URL}/v1/docs/openapi.json`} className="btn btn-outline" target="_blank" rel="noopener">
          <Download size={18} />
          OpenAPI Spec
        </a>
      </div>

      <div className="docs-intro">
        <p>Base URL: <code>https://api.amitbrand.shop/api</code></p>
        <p>Authentication: Bearer token or X-API-Key header</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="skeleton skeleton-list"></div>
        </div>
      ) : (
        <div className="endpoints-list">
          {endpoints.map((ep, i) => (
            <div key={i} className="endpoint-card">
              <div className="endpoint-header">
                <span className={`method-badge ${ep.method.toLowerCase()}`}>{ep.method}</span>
                <code className="endpoint-path">{ep.path}</code>
                {ep.tokens > 0 && <span className="token-cost">{ep.tokens} tokens</span>}
              </div>
              <p className="endpoint-desc">{ep.desc}</p>
              <span className="endpoint-auth">{ep.auth}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============== MAIN APP ==============
function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/inbox" element={<ProtectedRoute><DashboardLayout><InboxPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/emails" element={<ProtectedRoute><DashboardLayout><EmailsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/send" element={<ProtectedRoute><DashboardLayout><SendMailPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/keys" element={<ProtectedRoute><DashboardLayout><ApiKeysPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/webhooks" element={<ProtectedRoute><DashboardLayout><WebhooksPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><DashboardLayout><AnalyticsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/docs" element={<ProtectedRoute><DashboardLayout><ApiDocsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
