import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

const app = express();

// ✅ Enable CORS for all origins (or restrict if needed)
app.use(cors({
  origin: "*",   // or ["http://localhost:5173", "https://yourdomain.com"]
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 🔹 Change this to your real backend URL
const BACKEND_URL = "https://yykb-evershop-app-backend-production.up.railway.app/api/graphql";

// Proxy all /api requests to backend
app.use(
  "/api",
  createProxyMiddleware({
    target: BACKEND_URL,
    changeOrigin: true
  })
);

// Railway will assign a dynamic PORT
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
