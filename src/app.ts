import express, { Request, Response, NextFunction, Errback } from "express";
const app = express();
import cors from "cors";

import authRoutes from "./api/routes/auth.routes";
import plannerRoutes from "./api/routes/planner.routes";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// api routes
app.use("/auth", authRoutes);
app.use("/plan", plannerRoutes);

export = app;
