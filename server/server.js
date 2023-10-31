import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import UserRoutes from "./routes/users.js";
import CategoryRoutes from "./routes/categories.js";

// constants
const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", UserRoutes);
app.use("/api/categories", CategoryRoutes);

// health check endpoints
app.get("/api", (req, res) => {
  res.status(200).json({ message: "StockPulse API is up and running..." });
});

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      '<h1 style="text-align: center; margin-top: 50px;">StockPulse API</h1>'
    );
});

// launch server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
