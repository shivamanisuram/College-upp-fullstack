import cors from "cors";
import express from "express";
import collegeRoutes from "./routes/colleges";
import { errorHandler } from "./middleware/errors";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ data: { status: "ok", service: "college-discovery-api" } });
});

app.use("/api/colleges", collegeRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`College discovery API listening on http://127.0.0.1:${port}`);
});
