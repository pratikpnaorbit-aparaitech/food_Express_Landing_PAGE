import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
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

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!formData.acceptTerms) {
      setMessage("Please accept the terms and conditions.");
      return;
    }

    setMessage("Account created successfully.");
    console.log("Signup data:", formData);
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
            <span className="brand-badge">Join FoodExpress</span>

            <h1>
              Delicious food is only a few <span>clicks away.</span>
            </h1>

            <p>
              Create your account and order fresh food from your favourite
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
          <div className="auth-form-wrapper signup-wrapper">
            <div className="auth-heading">
              <p className="auth-label">Create account</p>
              <h2>Sign up for FoodExpress</h2>
              <p>Enter your information to get started.</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full name</label>

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="signupEmail">Email address</label>

                  <input
                    id="signupEmail"
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone number</label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="signupPassword">Password</label>

                  <input
                    id="signupPassword"
                    type="password"
                    name="password"
                    placeholder="Minimum 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm password</label>

                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Enter password again"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <label className="checkbox-label terms-checkbox">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                />

                <span>
                  I agree to the <button type="button">Terms</button> and{" "}
                  <button type="button">Privacy Policy</button>.
                </span>
              </label>

              {message && <p className="form-message">{message}</p>}

              <button type="submit" className="auth-submit-button">
                Create account
              </button>
            </form>

            <p className="auth-switch-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;
