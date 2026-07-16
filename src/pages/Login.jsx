import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.role === "admin") {
          // Immediately redirect admin to CloudKitchen login
          window.location.href = data.redirectUrl || "https://cloudkitchen.aparaitech.org/admin/login";
        } else {
          // Customer login flow: save info locally and stay on landing page
          localStorage.setItem("foodExpressUser", JSON.stringify(data.user));
          localStorage.setItem("customer_token", data.token);
          alert("Login successful!");
          navigate("/");
        }
      } else {
        setError(data.message || "Invalid Email or Password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Connection error. Please ensure the backend is running.");
    } finally {
      setIsLoading(false);
    }
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

          <div className="brand-content">
            <span className="brand-badge">Welcome Back</span>

            <h1>
              Delicious food is only a few <span>clicks away.</span>
            </h1>

            <p>
              Log in to your account and order fresh food from your favourite
              restaurants.
            </p>

            <div className="brand-points">
              <div>
                <span>✓</span>
                Discover hundreds of delicious meals
              </div>

              <div>
                <span>✓</span>
                Save your favourite dishes and addresses
              </div>

              <div>
                <span>✓</span>
                Track every order in real time
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            <div className="auth-heading">
              <p className="auth-label">Welcome Back</p>
              <h2>Sign in to FoodExpress</h2>
              <p>Enter your credentials to access your account.</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="loginEmail">Email address</label>
                <input
                  id="loginEmail"
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <input
                  id="loginPassword"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>

              {error && <p className="form-message">{error}</p>}

              <button type="submit" className="auth-submit-button" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Login"}
              </button>
            </form>

            <p className="auth-switch-text">
              Don't have an account?{" "}
              <Link to="/signup">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
