import express from "express";
import { flowerController } from "./flower.controller";

const router = express.Router();

router.post("/create", flowerController.insertIntoDB);

router.get("/get-flowers", flowerController.getAllFlowers);
router.patch("/update-flower/:id", flowerController.updateFlower);
router.delete("/delete-flower/:id", flowerController.deleteFlower);

export const flowerRoutes = router;
