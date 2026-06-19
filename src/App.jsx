import './App.css'

function App() {
  return (
    <div className="company-page">
      {/* Main Layout Container */}
      <div className="main-layout">
        {/* Left Sidebar */}
        <aside className="sidebar">
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
            <a href="#services" className="sidebar-link">Services</a>
            <a href="#contact" className="sidebar-link">Contact</a>
          </nav>
        </aside>

        {/* Right Content Area */}
        <main className="content-area">
          {/* Hero Section */}
          <section className="hero-section" id="home">
            <h1>TFC Products</h1>
            <p className="tagline">Your Trusted Partner in Quality Solutions</p>
            <p className="hero-description">
              Aenean ornare velit lacus, ac varius enim ullamcorper eu. Proin aliquam 
              facilisis ante interdum congue. Integer mollis, nisl amet convallis, 
              porttitor magna ullamcorper, amet egestas mauris.
            </p>
            <button className="hero-button">Learn More</button>
          </section>

          {/* About Section */}
          <section className="section about" id="about">
        <h2>About Us</h2>
        <p>
          TFC Products is a leading provider of innovative solutions designed to meet
          the evolving needs of our customers. With years of experience and a commitment
          to excellence, we deliver products and services that exceed expectations.
        </p>
      </section>

          {/* Services Section */}
          <section className="section services" id="products">
        <h2>Our Products & Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Product Development</h3>
            <p>
              Innovative product design and development tailored to your business needs.
            </p>
          </div>
          <div className="service-card">
            <h3>Quality Assurance</h3>
            <p>
              Rigorous testing and quality control to ensure the highest standards.
            </p>
          </div>
          <div className="service-card">
            <h3>Customer Support</h3>
            <p>
              Dedicated support team available to assist you every step of the way.
            </p>
          </div>
        </div>
      </section>

          {/* Mission Section */}
          <section className="section mission" id="services">
        <h2>Our Mission</h2>
        <p>
          To empower businesses with cutting-edge products and exceptional service,
          fostering long-term partnerships built on trust and reliability.
        </p>
      </section>

          {/* Contact Section */}
          <section className="section contact" id="contact">
        <h2>Get In Touch</h2>
        <div className="contact-info">
          <div className="contact-item">
            <strong>Email:</strong> info@tfcproducts.com
          </div>
          <div className="contact-item">
            <strong>Phone:</strong> +1 (555) 123-4567
          </div>
          <div className="contact-item">
            <strong>Address:</strong> 123 Business Avenue, Suite 100, City, State 12345
          </div>
        </div>
      </section>

          {/* Footer */}
          <footer className="footer">
            <p>&copy; 2026 TFC Products. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default App
