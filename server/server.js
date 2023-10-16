import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import UserRoutes from "./routes/users.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", UserRoutes);

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

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
