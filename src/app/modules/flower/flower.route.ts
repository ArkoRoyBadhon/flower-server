import express from "express";
import { flowerController } from "./flower.controller";

const router = express.Router();

router.post("/create", flowerController.insertIntoDB);

router.get("/get-flowers", flowerController.getAllFlowers);
router.patch("/update-flower", flowerController.updateFlower);

export const flowerRoutes = router;
