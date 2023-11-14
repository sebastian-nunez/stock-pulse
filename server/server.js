import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import { GitHub } from "./config/auth.js";
import CategoryRoutes from "./routes/categories.js";
import ProductTagRoutes from "./routes/productTag.js";
import ProductRoutes from "./routes/products.js";
import TagRoutes from "./routes/tags.js";
import UserRoutes from "./routes/users.js";
dotenv.config();

// constants
const PORT = process.env.PORT || 3001;
const app = express();

// auth middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(GitHub);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// middleware
app.use(express.json());

// routes
app.use("/api/users", UserRoutes);
app.use("/api/tags", TagRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/product-tag", ProductTagRoutes);

// health check endpoints
app.get("/api", (req, res) => {
  res.status(200).json({ message: "StockPulse API is up and running..." });
});

app.get("/", (req, res) => {
  res.redirect(process.env.CLIENT_URL);
});

// launch server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
