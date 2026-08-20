import express from "express";
import { createMainRouter } from "./routes/main";
import cookieParser from "cookie-parser";
import cors from "cors";

function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }));

  app.use(createMainRouter());

  return app;
}

export const app = createApp();
