import { Router } from "express";
import { z } from "zod";
import { compareColleges, getCollege, getFacets, listColleges } from "../services/collegeService";

const router = Router();

const querySchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  stream: z.string().optional(),
  exam: z.string().optional(),
  maxFees: z.coerce.number().positive().optional(),
  sort: z.enum(["relevance", "fees", "rating", "placement"]).optional()
});

router.get("/", (request, response, next) => {
  try {
    const query = querySchema.parse(request.query);
    const data = listColleges(query);
    response.json({ data, meta: { count: data.length, facets: getFacets() } });
  } catch (error) {
    next(error);
  }
});

router.get("/facets", (_request, response) => {
  response.json({ data: getFacets() });
});

router.get("/compare", (request, response, next) => {
  try {
    const ids = z.string().transform((value) => value.split(",").filter(Boolean)).parse(request.query.ids ?? "");
    response.json({ data: compareColleges(ids), meta: { requested: ids.length } });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", (request, response) => {
  const college = getCollege(request.params.id);
  if (!college) {
    response.status(404).json({ error: { code: "NOT_FOUND", message: "College not found." } });
    return;
  }

  response.json({ data: college });
});

export default router;
