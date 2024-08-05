import express from "express";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.route.js";
import friendRoutes from "./routes/friend.route.js";
import postRoutes from "./routes/post.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/friend", friendRoutes);
app.use("/api/v1/post", postRoutes);

app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
  connectDB();
});
