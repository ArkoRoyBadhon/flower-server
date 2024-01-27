import express from "express";
import authPermission from "../../middlewares/auth";
import { saleController } from "./sale.controller";

const router = express.Router();

router.post("/create", authPermission("admin"), saleController.insertIntoDB);
router.get("/get-all", authPermission("admin"), saleController.getAllSales);

export const saleRoutes = router;
