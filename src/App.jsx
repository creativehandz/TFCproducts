import { useState, useEffect } from 'react'
import './App.css'
import * as Sentry from "@sentry/react"

// Error button component to test Sentry's error tracking
function ErrorButton() {
  const handleClick = () => {
    // Manually send error to Sentry
    Sentry.captureException(new Error('This is your first error!'));
    
    // Also throw to see it in console
    setTimeout(() => {
      throw new Error('This is your first error!');
    }, 100);
    
    alert('Error sent to Sentry! Check your Sentry dashboard.\n\n(CORS errors in console are normal and don\'t prevent tracking)');
  };

  return (
    <button
      className="hero-button sentry-test-btn"
      onClick={handleClick}
    >
      🧪 Test Sentry (Break the world)
    </button>
  );
}

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [visiblePasswords, setVisiblePasswords] = useState({
    kuantan188: false,
    clevdex: false,
    restaurant: false
  })
  const [copiedPassword, setCopiedPassword] = useState('')
  
  // Set your password here
  const CORRECT_PASSWORD = 'tfc2026'

  // Check if user is already authenticated on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Toggle password visibility
  const togglePasswordVisibility = (productKey) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [productKey]: !prev[productKey]
    }))
  }

  // Copy password to clipboard
  const copyToClipboard = async (password, productKey) => {
    try {
      await navigator.clipboard.writeText(password)
      setCopiedPassword(productKey)
      setTimeout(() => setCopiedPassword(''), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('isAuthenticated', 'true')
      setError('')
    } else {
      setError('Incorrect password. Please try again.')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
    setPassword('')
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // Show password page if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="password-page">
        <div className="password-container">
          <div className="password-card">
            <img src="/Primary_Logo_White.webp" alt="TFC Logo" className="password-logo" />
            <h1>Welcome</h1>
            <p>Please enter the password to access this page</p>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="password-input"
                autoFocus
              />
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="password-submit">
                Enter
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="company-page">
      {/* Main Layout Container */}
      <div className="main-layout">
        {/* Left Sidebar */}
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-logo">
            <img src="/Primary_Logo_White.webp" alt="TFC Products Logo" className="logo" />
          </div>
          <div className="sidebar-header">
            <h3>Menu</h3>
          </div>
          <nav className="sidebar-nav">
            <a href="#home" className="sidebar-link active">Home</a>
            <a href="#about" className="sidebar-link">About</a>
            <a href="#products" className="sidebar-link">Products</a>
            
            <a href="#contact" className="sidebar-link">Contact</a>
          </nav>
        </aside>

        {/* Right Content Area */}
        <main className="content-area">
          {/* Top Bar */}
          <div className="top-bar">
            <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <button className="logout-btn" onClick={handleLogout} aria-label="Logout">
              Logout
            </button>
          </div>
          
          {/* Title and Social Bar */}
          <div className="title-social-bar">
            <div className="top-bar-title">
              <strong>TheFaceCraft Digital Solutions</strong>
            </div>
            <div className="social-icons">
              <a href="#" aria-label="Twitter" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="#fff"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#fff" strokeWidth="2"></line>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" aria-label="Medium" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795h6.633v.403l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.19-.19.19-.246.19-.537v-10.91l-5.389 13.688h-.728l-6.275-13.688v9.174c-.052.385.076.774.347 1.052l2.521 3.058v.404h-7.148v-.404l2.521-3.058c.27-.279.39-.67.325-1.052v-10.608z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Hero Section */}
          <section className="hero-section" id="home">
            <div className="hero-content">
              <div className="hero-text">
                <h1>Digital Products Designed for Growth</h1>
                <p className="tagline">Building the Future with AI-Powered Digital Products</p>
                <p className="hero-description">
                  Transform the way you work with innovative AI applications, automation platforms, and business tools developed by TheFaceCraft to increase efficiency, productivity, and customer engagement.
                </p>
                <div style={{ marginTop: '20px' }}>
                  <ErrorButton />
                </div>
              </div>
              <div className="hero-image">
                <img src="/digital.png" alt="TFC Products" />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="section about" id="about">
            <div className="main-content">
              <h2>About Us</h2>
              <p>
                At TheFaceCraft, we build innovative digital products that help businesses work smarter, grow faster, and stay ahead in an ever-evolving digital world. Our mission is to transform complex business challenges into simple, scalable, and user-friendly technology solutions.
              </p>
              <p>We specialize in developing modern software products, AI-powered applications, automation tools, and custom digital solutions that enhance productivity, streamline operations, and improve customer experiences. By combining technical expertise with a deep understanding of business needs, we create products that deliver measurable value and long-term impact.</p>
              <p>
                Our team is passionate about innovation, quality, and continuous improvement. Every product we build is designed with performance, scalability, and usability in mind, ensuring that businesses of all sizes can leverage technology to achieve their goals.
              </p>
              <p>Whether it's artificial intelligence, workflow automation, customer engagement platforms, or custom business software, TheFaceCraft is committed to creating digital products that empower organizations to innovate, scale, and succeed in the digital age.</p>
            </div>
          </section>

          {/* Services Section */}
          <section className="section services" id="products">
            <div className="main-content">
              <h2>Our Products & Services</h2>
              <div className="services-grid">
                <div className="service-card">
                  <h3>Kuantan188 Ticket Management</h3>
                  <div className="card-buttons">
                    <a href="https://tickets.tfcmockup.com/" target="_blank" rel="noopener noreferrer" className="card-btn frontend-btn">
                      Frontend
                    </a>
                    <a href="https://admin.tfcmockup.com/login" target="_blank" rel="noopener noreferrer" className="card-btn backend-btn">
                      Backend
                    </a>
                  </div>
                  <div className="card-credentials">
                    <p><strong>Username:</strong> admin@kuantan188.com</p>
                    <div className="password-field">
                      <strong>Password:</strong>
                      <span className="password-value">
                        {visiblePasswords.kuantan188 ? 'admin123' : '••••••••'}
                      </span>
                      <button 
                        className="icon-btn" 
                        onClick={() => togglePasswordVisibility('kuantan188')}
                        aria-label="Toggle password visibility"
                      >
                        {visiblePasswords.kuantan188 ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                      <button 
                        className="icon-btn copy-btn" 
                        onClick={() => copyToClipboard('admin123', 'kuantan188')}
                        aria-label="Copy password"
                      >
                        {copiedPassword === 'kuantan188' ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="service-card">
                  <h3>Clevdex AI chatbot</h3>
                  <div className="card-buttons">
                    <a href="https://clevdex.com/" target="_blank" rel="noopener noreferrer" className="card-btn frontend-btn">
                      Frontend
                    </a>
                    <a href="https://company.clevdex.com/login" target="_blank" rel="noopener noreferrer" className="card-btn backend-btn">
                      Backend
                    </a>
                  </div>
                  <div className="card-credentials">
                    <p><strong>Username:</strong> kuantan@tfcmockup.com</p>
                    <div className="password-field">
                      <strong>Password:</strong>
                      <span className="password-value">
                        {visiblePasswords.clevdex ? 'Momilu@99' : '••••••••'}
                      </span>
                      <button 
                        className="icon-btn" 
                        onClick={() => togglePasswordVisibility('clevdex')}
                        aria-label="Toggle password visibility"
                      >
                        {visiblePasswords.clevdex ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                      <button 
                        className="icon-btn copy-btn" 
                        onClick={() => copyToClipboard('Momilu@99', 'clevdex')}
                        aria-label="Copy password"
                      >
                        {copiedPassword === 'clevdex' ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="service-card">
                  <h3>Restaurant Table Management</h3>
                  <div className="card-buttons">
                    <a href="https://rafw.tfcmockup.com/" target="_blank" rel="noopener noreferrer" className="card-btn frontend-btn">
                      Frontend
                    </a>
                    <a href="https://rafw.tfcmockup.com/admin" target="_blank" rel="noopener noreferrer" className="card-btn backend-btn">
                      Backend
                    </a>
                  </div>
                  <div className="card-credentials">
                    <p><strong>Username:</strong> prasharpranav@gmail.com</p>
                    <div className="password-field">
                      <strong>Password:</strong>
                      <span className="password-value">
                        {visiblePasswords.restaurant ? ':qcDS=G5' : '••••••••'}
                      </span>
                      <button 
                        className="icon-btn" 
                        onClick={() => togglePasswordVisibility('restaurant')}
                        aria-label="Toggle password visibility"
                      >
                        {visiblePasswords.restaurant ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                      <button 
                        className="icon-btn copy-btn" 
                        onClick={() => copyToClipboard(':qcDS=G5', 'restaurant')}
                        aria-label="Copy password"
                      >
                        {copiedPassword === 'restaurant' ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

         

          {/* Contact Section */}
          <section className="section contact" id="contact">
            <div className="main-content">
              <h2>Get In Touch</h2>
              <div className="contact-info">
                <div className="contact-item">
                  <strong>Email:</strong> info@thefacecraft.com
                </div>
                <div className="contact-item">
                  <strong>Phone:</strong> +41 76 715 23 36
                </div>
                <div className="contact-item">
                  <strong>Address:</strong> Grossmatte O 24B, 6014 Luzern, Switzerland
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <p>&copy; 2026 FaceCraft GmbH. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default App
