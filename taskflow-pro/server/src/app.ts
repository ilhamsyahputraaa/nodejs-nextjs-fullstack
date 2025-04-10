import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import projectRoutes from "./routes/project.routes";
import taskRoutes from "./routes/task.routes";
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// ✅ FIX CORS CONFIG
app.use(
  cors({
    origin: "http://localhost:3000", // FE origin
    credentials: true, // biar bisa kirim & terima cookie
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/profile", userRoutes)
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);




// ⛔️ Pasang errorHandler di paling akhir
app.use(errorHandler);

export default app;
