import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { testConnection } from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import { generalLimiter } from "./middleware/rateLimiter.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(helmet());
app.use(cors());
app.use(generalLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);


app.use(errorHandler);

testConnection().then((connected) => {
  if (connected) {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } else {
    console.error("Server not started due to database connection failure.");
    process.exit(1);
  }
});
