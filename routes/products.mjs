import express from "express";
import ProductController from "../controllers/productController.mjs";
import ProductValidator from "../validators/productValidator.mjs";
import { checkSchema } from "express-validator";
import upload from "../middleware/UploadManager.mjs";
import { ensureAuthenticated, ensureAdmin } from "../middleware/auth.mjs";
const router = express.Router();
router.get("/", ProductController.productsList);
router.get("/register/:id?", ProductController.registerForm);
router.post(
  "/register/:id?",
  //   checkSchema(ProductValidator.productSchema), check why is not working properly
  upload.single("image"),
  ProductController.registerProduct
);
// router.post(
//   "/:id?",
//   ensureAuthenticated,
//   upload.single("image"),
//   ProductController.registerProduct
// );
// router.put(
//   "/:id?",
//   ensureAuthenticated,
//   ensureAdmin,
//   upload.single("image"),
//   ProductController.registerProduct
// );
router.delete("/", ProductController.deleteProduct);

export default router;
