import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", userRoutes)

// ⛔️ Pasang errorHandler di paling akhir
app.use(errorHandler);

export default app;
