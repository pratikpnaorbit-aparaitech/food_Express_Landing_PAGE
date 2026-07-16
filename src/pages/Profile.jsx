import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    profilePhoto: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // 'success' or 'error'
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("customer_token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setFormData({
            fullName: data.user.fullName || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            profilePhoto: data.user.profilePhoto || "",
            address: data.user.address || "",
          });
        } else {
          // Token expired or invalid
          localStorage.removeItem("customer_token");
          localStorage.removeItem("foodExpressUser");
          navigate("/login");
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
        setMessage("Error loading profile. Please ensure server is running.");
        setMessageType("error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage("");
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage("Image size must be less than 2MB.");
        setMessageType("error");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePhoto: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      setMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      setMessage("Full Name, Email, and Phone number are required.");
      setMessageType("error");
      return;
    }

    setIsSaving(true);
    setMessage("");

    const token = localStorage.getItem("customer_token");

    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("foodExpressUser", JSON.stringify(data.user));
        setMessage("Profile updated successfully!");
        setMessageType("success");
      } else {
        setMessage(data.message || "Failed to update profile.");
        setMessageType("error");
      }
    } catch (err) {
      console.error("Update profile error:", err);
      setMessage("Connection error. Could not update profile.");
      setMessageType("error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "sans-serif", color: "#666" }}>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-container profile-container">
        <div className="auth-brand-panel">
          <Link to="/" className="auth-logo">
            <span className="logo-icon">F</span>
            <span>
              Food<span>Express</span>
            </span>
          </Link>

          <div className="brand-content">
            <span className="brand-badge">My Account</span>

            <h1>
              Manage your <span>profile details.</span>
            </h1>

            <p>
              Keep your profile up to date to ensure fast deliveries and personalized recommendations.
            </p>

            <div className="brand-points">
              <div>
                <span>✓</span>
                Quick checkout and saved addresses
              </div>

              <div>
                <span>✓</span>
                Real-time delivery tracking
              </div>

              <div>
                <span>✓</span>
                Exclusive member-only discounts
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="auth-form-wrapper profile-form-wrapper">
            <div className="auth-heading">
              <p className="auth-label">Edit Profile</p>
              <h2>My Profile</h2>
              <p>View and update your personal details.</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="profile-photo-section">
                <img
                  src={formData.profilePhoto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                  alt="Profile Preview"
                  className="profile-preview"
                />
                <label htmlFor="photoUpload" className="profile-photo-label">
                  Upload Photo
                </label>
                <input
                  id="photoUpload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="profile-photo-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="form-row">
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
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Mobile Number</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Delivery Address (Optional)</label>
                <textarea
                  id="address"
                  name="address"
                  placeholder="Enter your complete delivery address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="profile-textarea"
                />
              </div>

              {message && (
                <p className={`form-message ${messageType === "error" ? "error-message" : "success-message"}`}>
                  {message}
                </p>
              )}

              <div className="profile-actions-row">
                <button type="submit" className="auth-submit-button" disabled={isSaving}>
                  {isSaving ? "Saving changes..." : "Save Changes"}
                </button>
                <Link to="/" className="profile-back-link">
                  ← Back to Home
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;
