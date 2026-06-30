import { useState, useEffect, useRef } from 'react'
import './App.css'
import * as Sentry from "@sentry/react"
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visiblePasswords, setVisiblePasswords] = useState({
    kuantan188: false,
    clevdex: false,
    qhomes: false,
    restaurant: false,
    ecommerce: false
  })
  const [copiedPassword, setCopiedPassword] = useState('')
  const aboutFirstParasRef = useRef(null)
  const aboutSecondParasRef = useRef(null)
  const aboutSectionRef = useRef(null)
  
  // Set your password here
  const CORRECT_PASSWORD = 'tfc2026'

  // Check if user is already authenticated on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Initialize Lenis Smooth Scroll with GSAP integration
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
    smoothWheel: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.5,
    })

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  // GSAP Scroll Animation for About Section - Two-part transition
  useEffect(() => {
    if (isAuthenticated && aboutFirstParasRef.current && aboutSecondParasRef.current && aboutSectionRef.current) {
      // Create a timeline for the about section
     const tl = gsap.timeline({
    scrollTrigger: {
         trigger: aboutSectionRef.current,
    start: "top top",
    end: "+=120%",
    pin: true,
    scrub: 0.5,
    anticipatePin: 1
    }
      })

      // Initially set first paragraphs visible and second paragraphs hidden
      gsap.set(aboutFirstParasRef.current, { opacity: 1, y: 0 })
      gsap.set(aboutSecondParasRef.current, { opacity: 0, y: 60 })

      // Animate: fade out first paragraphs while fading in second paragraphs
      tl
.to(aboutFirstParasRef.current, {
    y: -300,
    duration: 2
})

.to(aboutFirstParasRef.current, {
    opacity: 0,
    duration: 1
})

.fromTo(
    aboutSecondParasRef.current,
    {
        y: 120,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,
        duration: 2
    }
); // '<' makes it start at the same time as previous animation

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }
  }, [isAuthenticated])

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
            <h1>Welcome</h1>
            
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
        <img src="/Primary_Logo_White.webp" alt="TFC Logo" className="password-logo" />
      </div>
    )
  }

  return (
    <div className="company-page">
      {/* Hero Background Wrapper */}
      <div className="hero-bg-wrapper">
        {/* Header */}
        <header className="header">
          <div className="container">
            <div className="header-content">
              <div className="header-logo">
                <img src="/Primary_Logo_White.webp" alt="TFC Products Logo" />
              </div>
              
              {/* Desktop Navigation */}
              <nav className="header-nav">
                <a href="#home" className="active">Home</a>
                <a href="#about">About</a>
                <a href="#products">Products</a>
                <a href="#contact">Contact</a>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </nav>
              
              {/* Mobile Menu Button */}
              <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
          
          {/* Mobile Drawer */}
          <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
            <nav className="mobile-nav">
              <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#products" onClick={() => setMobileMenuOpen(false)}>Products</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </nav>
          </div>
          
          {/* Mobile Overlay */}
          {mobileMenuOpen && <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}></div>}
        </header>

        {/* Hero Section */}
        <section className="hero-section" id="home">
          <div className="container">
            <div className="hero-content">
              <h1>Digital Products<br />Designed for Growth</h1>
              <div className="hero-text-wrapper">
                <p className="tagline">Building the Future with AI-Powered Digital Products</p>
                <p className="hero-description">
                  Transform the way you work with innovative AI applications, automation platforms, and business tools developed by TheFaceCraft to increase efficiency, productivity, and customer engagement.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Main Content Area */}
      <main className="content-area">
        {/* About Section */}
        <section className="section about" id="about" ref={aboutSectionRef}>
          <div className="container">
            <div className="about-container ">
              
              <div className="about-left">
                  <h2>About Us</h2>
              </div>

              <div className="about-right">

                  <div class="about-slider">

                    <div className="about-first-paras" ref={aboutFirstParasRef}>
                <p>
                  At TheFaceCraft, we build innovative digital products that help businesses work smarter, grow faster, and stay ahead in an ever-evolving digital world. <span class="red-text">Our mission</span> is to transform complex business challenges into <span class="red-text">simple, scalable, and user-friendly technology solutions.</span>
                </p>
                <p>We specialize in developing modern software products, AI-powered applications, automation tools, and custom digital solutions that enhance productivity, streamline operations, and improve customer experiences. By combining technical expertise with a deep understanding of business needs, we create products that deliver measurable value and long-term impact.</p>
              </div>
                               <div className="about-second-paras" ref={aboutSecondParasRef}>
                <p>
                  Our team is passionate about innovation, quality, and continuous improvement. Every product we build is designed with performance, scalability, and usability in mind, ensuring that businesses of all sizes can leverage technology to achieve their goals.
                </p>
                <p>Whether it's artificial intelligence, workflow automation, customer engagement platforms, or custom business software, TheFaceCraft is committed to creating digital products that empower organizations to innovate, scale, and succeed in the digital age.</p>
              </div>
                  </div>
                    
                    

              </div>

          </div>
            
            
          </div>
        </section>

          {/* Services Section */}
          <section className="section services" id="products">
            <div className="container container-sm  ">
              <h2 className="section-title-with-arrow">
                Product Demo
                
              </h2>
              <div className="services-grid">
                <div className="col">
                <div className="service-card" style={{ background: '#838384' }}>
                  <h3>
                    Booking & Ticketing System
                    <svg className="card-title-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </h3>
                  <div className="card-buttons">
                    <a href="https://tickets.tfcmockup.com/" target="_blank" rel="noopener noreferrer" className="card-btn frontend-btn">
                      Frontend
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <a href="https://admin.tfcmockup.com/login" target="_blank" rel="noopener noreferrer" className="card-btn backend-btn">
                      Backend
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                  <div className="card-credentials">
                    <p>Username:<strong> yusri@thefacecraft.com</strong></p>
                    <div className="password-field">
                      Password:
                      <span className="password-value">
                        {visiblePasswords.kuantan188 ? 'TFC@yusri2026' : '••••••••'}
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
                        onClick={() => copyToClipboard('TFC@yusri2026', 'kuantan188')}
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
                </div>
                
                <div className="col">
                <div className="service-card" style={{ background: '#201F1F' }}>
                  <h3>
                    Real Estate <br></br>Portal
                    <svg className="card-title-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </h3>
                  <div className="card-buttons">
                    <a href="https://qhomesfrontend.tfcmockup.com" target="_blank" rel="noopener noreferrer" className="card-btn frontend-btn">
                      Frontend
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <a href="https://qhomesbackend.tfcmockup.com/login" target="_blank" rel="noopener noreferrer" className="card-btn backend-btn">
                      Backend
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                  <div className="card-credentials">
                    <p class="text-white">Username:<strong> admin@qhomes.com</strong></p>
                    <div className="password-field password-field-text-white">
                      Password:
                      <span className="password-value">
                        {visiblePasswords.qhomes ? 'admin123' : '••••••••'}
                      </span>
                      <button 
                        className="icon-btn" 
                        onClick={() => togglePasswordVisibility('qhomes')}
                        aria-label="Toggle password visibility"
                      >
                        {visiblePasswords.qhomes ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                      <button 
                        className="icon-btn copy-btn" 
                        onClick={() => copyToClipboard('admin123', 'qhomes')}
                        aria-label="Copy password"
                      >
                        {copiedPassword === 'qhomes' ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                </div>

                <div className="col">
                <div className="service-card" style={{ background: '#201F1F' }}>
                  <h3>
                    Restaurant Reservation System
                    <svg className="card-title-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </h3>
                  <div className="card-buttons">
                    <a href="https://rafw.tfcmockup.com/" target="_blank" rel="noopener noreferrer" className="card-btn frontend-btn">
                      Frontend
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <a href="https://rafw.tfcmockup.com/admin/#" target="_blank" rel="noopener noreferrer" className="card-btn backend-btn">
                      Backend
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                  <div className="card-credentials">
                    <p class="text-white">Username:<strong> yusri@thefacecraft.com</strong></p>
                    <div className="password-field password-field-text-white">
                      Password:
                      <span className="password-value">
                        {visiblePasswords.ecommerce ? 'Rafw@2026!Secure#Admin' : '••••••••'}
                      </span>
                      <button 
                        className="icon-btn" 
                        onClick={() => togglePasswordVisibility('ecommerce')}
                        aria-label="Toggle password visibility"
                      >
                        {visiblePasswords.ecommerce ? (
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
                        onClick={() => copyToClipboard('Rafw@2026!Secure#Admin', 'ecommerce')}
                        aria-label="Copy password"
                      >
                        {copiedPassword === 'ecommerce' ? (
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

                <div className="col">
                <div className="service-card" style={{ background: '#0A0A0A' }}>
                  <h3>
                    Real Estate <br />Website
                    <svg className="card-title-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </h3>
                  <div className="card-buttons">
                    <a href="https://realestateportal.thefacecraft.com/" target="_blank" rel="noopener noreferrer" className="card-btn frontend-btn">
                      Frontend
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    
                  </div>
                  
                </div>
                </div>
              </div>
            </div>
          </section>

         

          {/* Contact Section */}
          <section className="section contact" id="contact">
            <div className="container">
              <div className="col">
                <div className="contact-left">
                  <img src="/Primary_Logo_White.webp" alt="FaceCraft Logo" className="contact-logo" />
                  <h2>WE CRAFT<br/>DIGITAL<br/>SOLUTIONS</h2>
                </div>
              </div>
              <div className="col">
                <div className="contact-right">
                  <div className="contact-item">
                    <a href="mailto:yusri@thefacecraft.com">yusri@thefacecraft.com</a>
                  </div>
                  <div className="contact-item">
                    <a href="tel:+60132865798">+60 13-286 5798</a>
                  </div>
                  <div className="contact-item">
                    <a href="https://share.google/mCC1qkbvygFoSSmZk" target="_blank">Switzerland</a> | <a href="https://share.google/I0d6hJNyvWr1QxugT" target="_blank" rel="noopener noreferrer">Malaysia</a>
                  </div>
                  <div className="contact-social">
                    <a href="https://www.instagram.com/thefacecraftstudio/" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://www.linkedin.com/company/thefacecraft/posts/?feedView=all" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://www.facebook.com/thefacecraftstudio/" target="_blank" rel="noopener noreferrer">Facebook</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <div className="container">
              <div className="footer-col-left">
                <a href="#">TC</a>
                <a href="#">Privacy</a>
              </div>
              
              <div className="footer-col-right">
                &copy; 2026 FaceCraft GmbH. All rights reserved.
              </div>
            </div>
          </footer>
        </main>
    </div>
  )
}

export default App
