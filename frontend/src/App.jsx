import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "./config";
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("customer_token");
    const storedUser = localStorage.getItem("foodExpressUser");

    if (token && storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);

        // Verify/Refresh profile details from backend
        fetch(`${API_BASE}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          if (res.status === 401) {
            localStorage.removeItem("customer_token");
            localStorage.removeItem("foodExpressUser");
            setUser(null);
          } else {
            return res.json();
          }
        })
        .then(data => {
          if (data && data.success) {
            setUser(data.user);
            localStorage.setItem("foodExpressUser", JSON.stringify(data.user));
          }
        })
        .catch(err => console.error("Session verification error:", err));
      } catch (err) {
        console.error("Parse user error:", err);
      }
    }
  }, []);

  const handleLogout = (event) => {
    if (event) event.preventDefault();
    localStorage.removeItem("customer_token");
    localStorage.removeItem("foodExpressUser");
    setUser(null);
    alert("Logged out successfully!");
  };
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
            {user ? (
              <>
                <Link to="/profile" className="login-nav-button">
                  My Profile
                </Link>
                <button onClick={handleLogout} className="nav-button" style={{ cursor: "pointer" }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="login-nav-button">
                  Login
                </Link>
                <Link to="/signup" className="nav-button">
                  Sign Up
                </Link>
              </>
            )}
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
                {user ? (
                  <Link to="/profile" className="video-button">
                    <span className="play-icon">👤</span>
                    My Profile
                  </Link>
                ) : (
                  <Link to="/login" className="video-button">
                    <span className="play-icon">→</span>
                    Login to order
                  </Link>
                )}
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

      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="logo footer-logo">
                <span className="logo-icon">F</span>
                Food<span>Express</span>
              </Link>
              <p>
                Fresh and delicious meals delivered directly to your doorstep. Satisfying your cravings, anytime, anywhere.
              </p>
              <div className="social-links">
                <a href="#facebook" aria-label="Facebook"><span>🌐</span></a>
                <a href="#twitter" aria-label="Twitter"><span>🐦</span></a>
                <a href="#instagram" aria-label="Instagram"><span>📸</span></a>
                <a href="#linkedin" aria-label="LinkedIn"><span>💼</span></a>
              </div>
            </div>

            <div className="footer-column">
              <h3>Company</h3>
              <a href="#about">About Us</a>
              <a href="#careers">Careers</a>
              <a href="#blog">Blog</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="footer-column">
              <h3>Services</h3>
              <a href="#delivery">Food Delivery</a>
              <a href="#catering">Catering Services</a>
              <a href="#partner">Become a Partner</a>
              <a href="#privacy">Privacy Policy</a>
            </div>

            <div className="footer-column">
              <h3>Account</h3>
              {user ? (
                <>
                  <Link to="/profile">My Profile</Link>
                  <a href="#logout" onClick={handleLogout}>
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Create Account</Link>
                </>
              )}
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 FoodExpress. All rights reserved.</p>
            <div>
              <a href="#terms">Terms of Service</a>
              <a href="#privacy">Privacy</a>
              <a href="#security">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
