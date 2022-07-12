import express from "express";
import api from "./api/api";
import solve from "./api/solve";
import problems from "./api/problems";

const router = express.Router();

router.use("/api", api);
router.use("/solve", solve);
router.use("/problems", problems);

export default router;
