import cors from "cors";
import express from "express";
import collegeRoutes from "./routes/colleges";
import { errorHandler } from "./middleware/errors";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ data: { status: "ok", service: "college-discovery-api" } });
});

app.use("/api/colleges", collegeRoutes);
app.use(errorHandler);
