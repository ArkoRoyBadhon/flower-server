import express from "express";
import { UserRoutes } from "../modules/auth/auth.route";
import { flowerRoutes } from "../modules/flower/flower.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/flower",
    route: flowerRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
