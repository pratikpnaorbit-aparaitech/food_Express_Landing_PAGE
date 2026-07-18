import { Link } from "react-router-dom";
import "./style.css";

const categories = [
  ["🍕", "Pizza", "24 items"],
  ["🍔", "Burger", "18 items"],
  ["🍜", "Noodles", "16 items"],
  ["🥗", "Healthy", "20 items"],
  ["🍰", "Desserts", "14 items"],
  ["🥤", "Drinks", "22 items"],
];

function App() {
  return (
    <div>
      <header className="header">
        <div className="container navbar">
          <Link to="/" className="logo" aria-label="FoodExpress home">
            <span className="logo-icon">F</span>
            Food<span>Express</span>
          </Link>

          <nav className="nav-links" aria-label="Main navigation">
            <a href="#home">Home</a>
            <a href="#menu">Menu</a>
            <a href="#features">Why us</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="nav-auth-actions">
            <Link to="/login" className="login-nav-button">
              Login
            </Link>
            <Link to="/signup" className="nav-button">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                ⚡ Fast delivery at your doorstep
              </div>
              <h1>
                Delicious food, <span>delivered fast.</span>
              </h1>
              <p className="hero-description">
                Order your favourite meals from trusted restaurants and enjoy
                fresh food delivered quickly, safely and conveniently.
              </p>

              <div className="hero-actions">
                <a href="#menu" className="primary-button">
                  Explore Menu →
                </a>
                <Link to="/login" className="video-button">
                  <span className="play-icon">→</span>
                  Login to order
                </Link>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <strong>10K+</strong>
                  <span>Happy customers</span>
                </div>
                <div className="stat-item">
                  <strong>500+</strong>
                  <span>Food choices</span>
                </div>
                <div className="stat-item">
                  <strong>30 min</strong>
                  <span>Average delivery</span>
                </div>
              </div>
            </div>

            <div className="hero-image-area">
              <div className="circle-decoration" />

              <div className="food-orbit">
                <div className="orbit-path" />

                <div className="orbit-item orbit-item-one">
                  <span>🍔</span>
                </div>

                <div className="orbit-item orbit-item-two">
                  <span>🍕</span>
                </div>

                <div className="orbit-item orbit-item-three">
                  <span>🍜</span>
                </div>
              </div>

              <div className="hero-main-circle">
                <img
                  className="hero-image"
                  src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85"
                  alt="Fresh colourful meal"
                />
              </div>
              <div className="floating-card rating-card">
                <span className="floating-icon">⭐</span>
                <div>
                  <strong>4.9 customer rating</strong>
                  <span>Trusted by food lovers</span>
                </div>
              </div>
              <div className="floating-card delivery-card">
                <span className="floating-icon delivery-icon">🛵</span>
                <div>
                  <strong>Fast delivery</strong>
                  <span>Fresh and on time</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="categories-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-label">Browse categories</span>
                <h2>What would you like today?</h2>
                <p>
                  Choose from popular food categories and discover your next
                  favourite meal.
                </p>
              </div>
            </div>
            <div className="categories-grid">
              {categories.map(([icon, title, count], index) => (
                <article
                  className={`category-card ${index === 0 ? "active" : ""}`}
                  key={title}
                >
                  <div className="category-icon">{icon}</div>
                  <h3>{title}</h3>
                  <p>{count}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="container">
            <div className="section-heading centered-heading">
              <div>
                <span className="section-label">Why FoodExpress</span>
                <h2>Food delivery made simple</h2>
                <p>
                  Everything you need for a fast, safe and satisfying ordering
                  experience.
                </p>
              </div>
            </div>
            <div className="features-grid">
              {[
                [
                  "🥘",
                  "Fresh food",
                  "Meals prepared with quality ingredients.",
                ],
                [
                  "⚡",
                  "Quick delivery",
                  "Your order reaches you fresh and fast.",
                ],
                [
                  "🔒",
                  "Secure ordering",
                  "A reliable and protected ordering process.",
                ],
                [
                  "💬",
                  "Friendly support",
                  "Helpful support whenever you need it.",
                ],
              ].map(([icon, title, text]) => (
                <article className="feature-card" key={title}>
                  <div className="feature-icon">{icon}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="simple-footer" id="contact">
        <div className="container footer-row">
          <Link to="/" className="logo">
            <span className="logo-icon">F</span>Food<span>Express</span>
          </Link>
          <p>© 2026 FoodExpress. Fresh food, fast delivery.</p>
          <div className="footer-auth-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Create account</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
