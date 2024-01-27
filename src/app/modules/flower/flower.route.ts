import express from "express";
import { flowerController } from "./flower.controller";
import authPermission from "../../middlewares/auth";

const router = express.Router();

router.post("/create", authPermission("admin"), flowerController.insertIntoDB);

router.get("/get-flowers", flowerController.getAllFlowers);
router.patch(
  "/update-flower/:id",
  authPermission("admin"),
  flowerController.updateFlower,
);
router.delete(
  "/delete-flower/:id",
  authPermission("admin"),
  flowerController.deleteFlower,
);

export const flowerRoutes = router;
