require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "food_express_secret_key_123";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@foodexpress.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123";

const DATA_DIR = path.join(__dirname, "data");
if (!fs.existsSync(DATA_DIR)) {
  try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) {}
}

const USERS_FILE = path.join(DATA_DIR, "users.json");
const ROOT_USERS_FILE = path.join(__dirname, "users.json");

// Helper function to read users
function readUsers() {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, "utf8");
      return JSON.parse(data || "[]");
    }
    if (fs.existsSync(ROOT_USERS_FILE)) {
      const data = fs.readFileSync(ROOT_USERS_FILE, "utf8");
      const parsed = JSON.parse(data || "[]");
      fs.writeFileSync(USERS_FILE, JSON.stringify(parsed, null, 2));
      return parsed;
    }
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
    return [];
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
}

// Helper function to write users
function writeUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing users file:", error);
  }
}


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "https://food-express-lan-git-5bf6a6-pratikpnaorbit-aparaitechs-projects.vercel.app",
  "https://food-express-landing-page.onrender.com/api",
  "https://food-delivery-pi-drab.vercel.app",
  process.env.FRONTEND_URL
].filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  const cleanOrigin = origin.toLowerCase().trim();
  if (
    cleanOrigin.includes("localhost") ||
    cleanOrigin.includes("127.0.0.1") ||
    cleanOrigin.includes("192.168.") ||
    cleanOrigin.endsWith(".vercel.app") ||
    cleanOrigin.endsWith(".onrender.com") ||
    cleanOrigin.includes("vercel.app") ||
    allowedOrigins.some(o => o.toLowerCase() === cleanOrigin)
  ) {
    return true;
  }
  return false;
};

// Dynamic CORS Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin || isAllowedOrigin(origin)) {
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
      res.setHeader("Access-Control-Allow-Origin", "*");
    }
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  }
  
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  next();
});

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
    return callback(null, false);
  },
  credentials: true
}));

app.use(express.json({ limit: "10mb", type: ["application/json", "application/*+json", "text/plain"] }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Fallback JSON parser in case proxy/client sends body as raw string or Buffer
app.use((req, res, next) => {
  if (typeof req.body === "string" && req.body.trim()) {
    try {
      req.body = JSON.parse(req.body);
    } catch (e) {}
  }
  if (Buffer.isBuffer(req.body)) {
    try {
      req.body = JSON.parse(req.body.toString("utf8"));
    } catch (e) {}
  }
  next();
});

// Raw Body Stream Reader Fallback Middleware for Proxy Edge Cases (Render / Cloudflare)
app.use((req, res, next) => {
  if (["POST", "PUT", "PATCH"].includes(req.method) && (!req.body || Object.keys(req.body).length === 0)) {
    const contentLength = req.headers["content-length"];
    if (contentLength && parseInt(contentLength, 10) > 0) {
      let data = "";
      req.setEncoding("utf8");
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        if (data && data.trim()) {
          try {
            req.body = JSON.parse(data);
          } catch (err) {
            try {
              const querystring = require("querystring");
              req.body = querystring.parse(data);
            } catch (qsErr) {}
          }
        }
        next();
      });
      return;
    }
  }
  next();
});

// Detailed Request Logger Middleware
app.use((req, res, next) => {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    console.log(`\n[API Request] 📩 ${req.method} ${req.originalUrl || req.url}`);
    console.log(`[API Request] Content-Type:`, req.headers["content-type"]);
    console.log(`[API Request] Headers:`, JSON.stringify(req.headers));
    console.log(`[API Request] Body:`, req.body);
  }
  next();
});

// JWT verification middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }
    req.user = decoded;
    next();
  });
}

// Public Health Check Endpoints
app.get(["/health", "/api/health", "/health/", "/api/health/"], (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "Food Express Backend API",
    timestamp: new Date().toISOString()
  });
});

// Get Profile Endpoint (Protected)
const handleGetProfile = (req, res) => {
  try {
    const users = readUsers();

    if (req.user.role === "admin") {
      return res.json({
        success: true,
        user: {
          id: "admin-id",
          email: ADMIN_EMAIL,
          role: "admin"
        }
      });
    }

    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        profilePhoto: user.profilePhoto || "",
        address: user.address || "",
        role: "customer"
      }
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ message: "Server error retrieving profile." });
  }
};

app.get([
  "/api/auth/profile", "/api/auth/profile/",
  "/auth/profile", "/auth/profile/",
  "/api/auth/me", "/api/auth/me/",
  "/auth/me", "/auth/me/"
], authenticateToken, handleGetProfile);

// Update Profile Endpoint (Protected)
const handleUpdateProfile = async (req, res) => {
  try {
    const body = req.body || {};
    const fullName = body.fullName ? String(body.fullName).trim() : "";
    const email = body.email ? String(body.email).trim() : "";
    const phone = body.phone ? String(body.phone).trim() : "";
    const profilePhoto = body.profilePhoto || "";
    const address = body.address || "";

    if (req.user.role === "admin") {
      return res.status(400).json({ message: "Admin profile cannot be updated." });
    }

    if (!fullName || !email || !phone) {
      return res.status(400).json({ message: "Full Name, Email, and Phone are required." });
    }

    const lowerEmail = email.toLowerCase().trim();
    const users = readUsers();

    const userIndex = users.findIndex(u => u.id === req.user.id);
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if email already taken by someone else
    const emailTaken = users.some((u, idx) => u.email.toLowerCase() === lowerEmail && idx !== userIndex);
    if (emailTaken || lowerEmail === ADMIN_EMAIL.toLowerCase()) {
      return res.status(400).json({ message: "Email is already in use by another account." });
    }

    users[userIndex].fullName = fullName.trim();
    users[userIndex].email = lowerEmail;
    users[userIndex].phone = phone.trim();
    users[userIndex].profilePhoto = profilePhoto || "";
    users[userIndex].address = address || "";
    users[userIndex].updatedAt = new Date().toISOString();

    writeUsers(users);

    return res.json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: users[userIndex].id,
        fullName: users[userIndex].fullName,
        email: users[userIndex].email,
        phone: users[userIndex].phone,
        profilePhoto: users[userIndex].profilePhoto,
        address: users[userIndex].address,
        role: "customer"
      }
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Server error updating profile." });
  }
};

app.put([
  "/api/auth/profile", "/api/auth/profile/",
  "/auth/profile", "/auth/profile/"
], authenticateToken, handleUpdateProfile);

// Signup Endpoint (Customer only)
const handleSignup = async (req, res) => {
  try {
    const body = req.body || {};
    const fullName = body.fullName ? String(body.fullName).trim() : "";
    const email = body.email ? String(body.email).trim() : "";
    const phone = body.phone ? String(body.phone).trim() : "";
    const password = body.password ? String(body.password) : "";

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: "Please fill in all fields." });
    }

    const lowerEmail = email.toLowerCase().trim();

    // Prevent signing up with Admin email
    if (lowerEmail === ADMIN_EMAIL.toLowerCase()) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    const users = readUsers();

    // Check if user already exists
    if (users.some(u => u.email.toLowerCase() === lowerEmail)) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      fullName: fullName.trim(),
      email: lowerEmail,
      phone: phone.trim(),
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeUsers(users);

    // Generate JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: "customer" },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        role: "customer"
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error during registration." });
  }
};

app.post([
  "/api/auth/signup", "/api/auth/signup/",
  "/auth/signup", "/auth/signup/",
  "/api/auth/register", "/api/auth/register/",
  "/auth/register", "/auth/register/"
], handleSignup);

// Login Endpoint (Admin & Customer)
const handleLogin = async (req, res) => {
  try {
    const body = req.body || {};
    const email = body.email ? String(body.email).trim() : "";
    const password = body.password ? String(body.password) : "";

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please enter email and password." });
    }

    const lowerEmail = email.toLowerCase().trim();

    // 1. Admin Flow (UNCHANGED)
    if (lowerEmail === ADMIN_EMAIL.toLowerCase()) {
      if (password === ADMIN_PASSWORD) {
        const token = jwt.sign(
          { id: "admin-id", email: ADMIN_EMAIL, role: "admin" },
          JWT_SECRET,
          { expiresIn: "24h" }
        );
        return res.json({
          success: true,
          role: "admin",
          token,
          user: {
            id: "admin-id",
            email: ADMIN_EMAIL,
            role: "admin"
          },
          redirectUrl: "https://food-delivery-pi-drab.vercel.app/"
        });
      } else {
        return res.status(401).json({ message: "Invalid Email or Password." });
      }
    }

    // 2. Customer Flow
    const users = readUsers();
    const user = users.find(u => u.email.toLowerCase() === lowerEmail);
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Email or Password." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: "customer" },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.json({
      success: true,
      role: "customer",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: "customer"
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    if (res.headersSent) return;
    return res.status(500).json({ message: "Server error during login." });
  }
};

app.post([
  "/api/auth/login", "/api/auth/login/",
  "/auth/login", "/auth/login/"
], handleLogin);

// 404 Fallback Handler
app.use((req, res, next) => {
  if (res.headersSent) {
    return next();
  }
  return res.status(404).json({ message: `Route ${req.originalUrl} not found.` });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error("Uncaught Server Error:", err);
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  return res.status(statusCode).json({
    message: err.message || "Internal Server Error"
  });
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Food Express Backend server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
