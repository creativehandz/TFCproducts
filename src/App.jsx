import { useState } from 'react'
import './App.css'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="company-page">
      {/* Main Layout Container */}
      <div className="main-layout">
        {/* Left Sidebar */}
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-logo">
            <img src="/tfc-logo.png" alt="TFC Products Logo" className="logo" />
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
                  <p>
                    Frontend  : https://tickets.tfcmockup.com/
                  </p>
                  <p>
                    Backend : https://admin.tfcmockup.com/login
                  </p>
                  <p>Username: admin@kuantan188.com</p>
                  <p>Password: admin123</p>
                </div>
                <div className="service-card">
                  <h3>Clevdex AI chatbot</h3>
                  <p>
                    Frontend  : https://clevdex.com/
                  </p>
                  <p>
                    Backend : https://company.clevdex.com/login
                  </p>
                  <p>Username: kuantan@tfcmockup.com</p>
                  <p>Password: Momilu@99</p>
                </div>
                <div className="service-card">
                  <h3>Restaurant Table Management</h3>
                  <p>
                    Frontend  : https://rafw.tfcmockup.com/
                  </p>
                  <p>
                    Backend : https://rafw.tfcmockup.com/admin
                  </p>
                  <p>Username: prasharpranav@gmail.com</p>
                  <p>Password: :qcDS=G5</p>
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
