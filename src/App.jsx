import { Link } from "react-router-dom";
import "./style.css";

import pizzaImage from "./assets/categories/pizza.jpg";
import burgerImage from "./assets/categories/burger.jpg";
import noodlesImage from "./assets/categories/noodles.jpg";
import healthyImage from "./assets/categories/healthy.jpg";
import dessertsImage from "./assets/categories/desserts.jpg";
import drinksImage from "./assets/categories/drinks.jpg";

import freshFoodImage from "./assets/features/fresh-food.jpg";
import quickDeliveryImage from "./assets/features/quick-delivery.jpg";
import secureOrderingImage from "./assets/features/secure-ordering.jpg";
import friendlySupportImage from "./assets/features/friendly-support.jpg";

import foodOrdersScreen from "./assets/app-screenshots/food-orders.jpeg";
import foodHomeScreen from "./assets/app-screenshots/food-home.jpeg";
import foodProfileScreen from "./assets/app-screenshots/food-profile.jpeg";

const categories = [
  {
    id: 1,
    name: "Pizza",
    image: pizzaImage,
  },
  {
    id: 2,
    name: "Burger",
    image: burgerImage,
  },
  {
    id: 3,
    name: "Noodles",
    image: noodlesImage,
  },
  {
    id: 4,
    name: "Healthy",
    image: healthyImage,
  },
  {
    id: 5,
    name: "Desserts",
    image: dessertsImage,
  },
  {
    id: 6,
    name: "Drinks",
    image: drinksImage,
  },
];
const infiniteCategories = [...categories, ...categories];
const features = [
  {
    id: 1,
    title: "Fresh food",
    description: "Meals prepared with quality ingredients.",
    image: freshFoodImage,
  },

  {
    id: 2,
    title: "Quick delivery",
    description: "Your order reaches you fresh and fast.",
    image: quickDeliveryImage,
  },

  {
    id: 3,
    title: "Secure ordering",
    description: "A reliable and protected ordering process.",
    image: secureOrderingImage,
  },

  {
    id: 4,
    title: "Friendly support",
    description: "Helpful support whenever you need it.",
    image: friendlySupportImage,
  },
];
const infiniteFeatures = [...features, ...features];
const mobileAppFeatures = [
  {
    icon: "🍽️",
    text: "Discover restaurants and delicious meals near you",
  },
  {
    icon: "📱",
    text: "Order food easily through a clean mobile experience",
  },
  {
    icon: "📍",
    text: "Track active orders with real-time status updates",
  },
  {
    icon: "🎟️",
    text: "Use coupons, offers and FoodExpress Gold benefits",
  },
  {
    icon: "❤️",
    text: "Save favourite dishes for quick ordering",
  },
  {
    icon: "💳",
    text: "Manage payments, addresses and account details securely",
  },
];

function MobileAppShowcase() {
  return (
    <section className="mobile-showcase-section" id="mobile-app">
      <div className="container">
        <div className="mobile-showcase-card">
          <div className="mobile-showcase-content">
            <span className="mobile-showcase-label">
              FOOD EXPRESS MOBILE APP
            </span>

            <h2>
              Your favourite food,
              <span> just one tap away.</span>
            </h2>

            <p className="mobile-showcase-description">
              Explore delicious meals, place orders, track your delivery and
              manage your FoodExpress account from one simple mobile app.
            </p>

            <div className="mobile-showcase-features">
              {mobileAppFeatures.map((feature) => (
                <div className="mobile-showcase-feature" key={feature.text}>
                  <span className="mobile-showcase-feature-icon">
                    {feature.icon}
                  </span>

                  <p>{feature.text}</p>
                </div>
              ))}
            </div>

            <div className="mobile-showcase-actions">
              <a
                href="#download-app"
                className="mobile-store-button"
                aria-label="Download FoodExpress from the App Store"
              >
                <span className="mobile-store-icon">●</span>

                <span className="mobile-store-text">
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </span>
              </a>

              <a
                href="#download-app"
                className="mobile-store-button"
                aria-label="Download FoodExpress from Google Play"
              >
                <span className="mobile-play-icon">▶</span>

                <span className="mobile-store-text">
                  <small>GET IT ON</small>
                  <strong>Google Play</strong>
                </span>
              </a>
            </div>
          </div>

          <div className="mobile-showcase-images">
            <div className="mobile-showcase-glow" />

            <div className="mobile-screen-card mobile-screen-orders">
              <img
                src={foodOrdersScreen}
                alt="FoodExpress My Orders mobile screen"
              />
            </div>

            <div className="mobile-screen-card mobile-screen-home">
              <img src={foodHomeScreen} alt="FoodExpress home mobile screen" />
            </div>

            <div className="mobile-screen-card mobile-screen-profile">
              <img
                src={foodProfileScreen}
                alt="FoodExpress account mobile screen"
              />
            </div>

            <div className="mobile-floating-badge mobile-floating-food">🍔</div>

            <div className="mobile-floating-badge mobile-floating-fast">⚡</div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
            <a href="#mobile-app">Mobile App</a>
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
              <div className="circle-decoration">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
              </div>

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

        <section className="categories-section" id="menu">
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
            <div className="category-slider-container">
              <div className="category-slider-track">
                {infiniteCategories.map((category, index) => (
                  <article className="category-card" key={index}>
                    <div className="category-image-box">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="category-image"
                      />
                    </div>

                    <h3>{category.name}</h3>
                  </article>
                ))}
              </div>
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
            <div className="slider-container">
              <div className="slider-track reverse-slider">
                {infiniteFeatures.map((feature, index) => (
                  <article className="feature-image-item" key={index}>
                    <div className="feature-real-image-box">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="feature-real-image"
                      />
                    </div>

                    <h3>{feature.title}</h3>

                    <p>{feature.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <MobileAppShowcase />
      </main>

      <footer className="food-footer" id="contact">
        <div className="container">
          <div className="food-footer-grid">
            {/* Brand and contact column */}
            <div className="food-footer-brand">
              <Link to="/" className="food-footer-logo">
                <span className="food-footer-logo-icon">F</span>

                <span className="food-footer-logo-text">
                  Food<span>Express</span>
                </span>
              </Link>

              <p className="food-footer-description">
                Delicious food delivered fresh, fast and safely to your
                doorstep. Explore your favourite meals and enjoy a simple
                ordering experience.
              </p>

              <div className="food-footer-contact-list">
                <a href="tel:+916364326342">
                  <span>📞</span>
                  +91 63643 26342
                </a>

                <a href="mailto:support@foodexpress.com">
                  <span>✉️</span>
                  support@foodexpress.com
                </a>

                <p>
                  <span>📍</span>
                  Baramati, Maharashtra, India
                </p>
              </div>
            </div>

            {/* Company links */}
            <div className="food-footer-column">
              <h3>Company</h3>

              <a href="#home">Home</a>
              <a href="#menu">Menu</a>
              <a href="#features">Why us</a>
              <a href="#mobile-app">Mobile App</a>
              <a href="#contact">Contact</a>
            </div>

            {/* Customer links */}
            <div className="food-footer-column">
              <h3>Customer</h3>

              <Link to="/login">Login</Link>
              <Link to="/signup">Create account</Link>
              <a href="#menu">Browse food</a>
              <a href="#mobile-app">Download app</a>
              <a href="mailto:support@foodexpress.com">Help & Support</a>
            </div>

            {/* Newsletter */}
            <div className="food-footer-newsletter">
              <h3>Stay Updated</h3>

              <p>
                Subscribe to get the latest food offers, discounts and delivery
                updates.
              </p>

              <form
                className="food-footer-form"
                onSubmit={(event) => event.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  required
                />

                <button type="submit">Subscribe</button>
              </form>

              <div className="food-footer-socials">
                <a href="#instagram" aria-label="Instagram">
                  IG
                </a>

                <a href="#facebook" aria-label="Facebook">
                  FB
                </a>

                <a href="#youtube" aria-label="YouTube">
                  YT
                </a>

                <a href="#twitter" aria-label="Twitter">
                  X
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="food-footer-bottom">
          <div className="container food-footer-bottom-row">
            <p>© 2026 FoodExpress. All rights reserved.</p>

            <div>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
