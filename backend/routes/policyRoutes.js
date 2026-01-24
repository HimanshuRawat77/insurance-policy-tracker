import express from "express";
import {
  getPolicies,
  createPolicy,
  updatePolicy,
  deletePolicy,
} from "../controllers/policyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
  Routes:
  GET    /api/policies       -> Get all user policies
  POST   /api/policies       -> Create new policy
  PUT    /api/policies/:id   -> Update policy
  DELETE /api/policies/:id   -> Delete policy
*/

router.route("/").get(protect, getPolicies).post(protect, createPolicy);

router.route("/:id").put(protect, updatePolicy).delete(protect, deletePolicy);

export default router;
