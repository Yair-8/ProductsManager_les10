import express from "express";
import mainRoutes from "./mainRoutes.mjs";
import productsRoutes from "./products.mjs";
import userRoutes from "./userRoutes.mjs";
import loginRoutes from "./login.mjs";

const router = express.Router();

router.use("/", mainRoutes);
router.use("/products", productsRoutes);
router.use("/users", userRoutes);
router.use("/", loginRoutes);

export default router;
