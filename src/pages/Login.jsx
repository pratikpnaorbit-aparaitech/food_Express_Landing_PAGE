import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("Please enter your email and password.");
      return;
    }

    setMessage("Login form submitted successfully.");
    console.log("Login data:", formData);
  };

  return (
    <main className="auth-page">
      <section className="auth-container">
        <div className="auth-brand-panel">
          <Link to="/" className="auth-logo">
            <span className="logo-icon">F</span>
            <span>
              Food<span>Express</span>
            </span>
          </Link>
          <div className="brand-content"></div>"
          <div className="brand-content">
            <span className="brand-badge">Fast and fresh delivery</span>

            <h1>
              Welcome back to <span>FoodExpress</span>
            </h1>

            <p>
              Login to explore delicious meals, place orders and track your
              delivery.
            </p>

            <div className="brand-points">
              <div>
                <span>✓</span>
                Fresh meals from trusted restaurants
              </div>

              <div>
                <span>✓</span>
                Fast and reliable doorstep delivery
              </div>

              <div>
                <span>✓</span>
                Safe and secure ordering experience
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            <div className="auth-heading">
              <p className="auth-label">Welcome back</p>
              <h2>Login to your account</h2>
              <p>Enter your details to continue ordering.</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>

                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />

                  <span>Remember me</span>
                </label>

                <button type="button" className="text-button">
                  Forgot password?
                </button>
              </div>

              {message && <p className="form-message">{message}</p>}

              <button type="submit" className="auth-submit-button">
                Login
              </button>
            </form>

            <p className="auth-switch-text">
              Do not have an account? <Link to="/signup">Create account</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
