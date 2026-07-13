import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const selectedFood = sessionStorage.getItem("selectedFood");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanedPhone = formData.phone.replace(/\D/g, "");

    if (formData.fullName.trim().length < 3) {
      setError("Please enter your complete name.");
      return;
    }

    if (cleanedPhone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    const registeredUser = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: cleanedPhone,
      selectedFood: selectedFood || "",
    };

    localStorage.setItem("foodExpressUser", JSON.stringify(registeredUser));

    sessionStorage.removeItem("selectedFood");

    alert("Registration completed successfully!");

    navigate("/");
  };

  return (
    <main className="register-page">
      <section className="register-card">
        <button
          type="button"
          className="register-back-button"
          onClick={() => navigate("/")}
        >
          <span>←</span>
          Back to home
        </button>

        <div className="register-brand">
          <div className="register-brand-icon">F</div>

          <h2>
            Food<span>Express</span>
          </h2>
        </div>

        <div className="register-heading">
          <span className="register-label">WELCOME TO FOOD EXPRESS</span>

          <h1>Create your account</h1>

          <p>Register to add food items to your cart and place your order.</p>
        </div>

        {selectedFood && (
          <div className="selected-food-box">
            <span>Selected item</span>
            <strong>{selectedFood}</strong>
          </div>
        )}

        {error && (
          <div className="register-error" role="alert">
            <span>!</span>
            {error}
          </div>
        )}

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-field">
            <label htmlFor="fullName">Full name</label>

            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="email">Email address</label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="phone">Phone number</label>

            <div className="phone-input-wrapper">
              <span>+91</span>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="98765 43210"
                autoComplete="tel"
                inputMode="numeric"
                maxLength="10"
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>

          <div className="register-password-grid">
            <div className="register-field">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="confirmPassword">Confirm password</label>

              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter password again"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <label className="show-password-option">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(event) => setShowPassword(event.target.checked)}
            />

            <span>Show password</span>
          </label>

          <label className="register-terms">
            <input type="checkbox" required />

            <span>
              I agree to the{" "}
              <a href="#terms" onClick={(event) => event.preventDefault()}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#privacy" onClick={(event) => event.preventDefault()}>
                Privacy Policy
              </a>
              .
            </span>
          </label>

          <button type="submit" className="register-submit-button">
            Create Account
            <span>→</span>
          </button>
        </form>

        <p className="register-login-text">
          Already have an account? <Link to="/">Go to Home</Link>
        </p>
      </section>

      <section className="register-image-section">
        <div className="register-image-overlay"></div>

        <div className="register-image-content">
          <span className="register-image-badge">
            FAST &amp; FRESH DELIVERY
          </span>

          <h2>Delicious moments start here.</h2>

          <p>
            Create your account and enjoy fresh meals delivered directly to your
            doorstep.
          </p>

          <div className="register-benefits">
            <div>
              <span>✓</span>
              Fast doorstep delivery
            </div>

            <div>
              <span>✓</span>
              Exclusive discounts
            </div>

            <div>
              <span>✓</span>
              Easy order tracking
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
