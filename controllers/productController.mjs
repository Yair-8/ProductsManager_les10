import ProductsDBService from "../models/ProductsDBService.mjs";
import { validationResult } from "express-validator";

class ProductController {
  static async productsList(req, res) {
    try {
      let sortOption = {};
      // Only apply sorting if the user is authenticated
      if (req.session.user) {
        // If user is logged in, apply sorting based on session sort preference
        sortOption = { price: req.session.sortInAscOrder ? 1 : -1 };
      }
      const dataList = await ProductsDBService.getList(
        {},
        { sort: sortOption }
      );
      res.render("products/productsList", {
        products: dataList,
        title: "Products List",
        user: req.session.user,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async registerForm(req, res) {
    try {
      const productId = req.params.id;
      let product = null;
      if (productId) {
        product = await ProductsDBService.getById(productId);
      }
      res.render("products/productRegister", {
        errors: [],
        data: product,
        user: req.session.user,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async registerProduct(req, res) {
    const errors = validationResult(req);
    const data = req.body;

    console.log("=========productsData");
    console.log(data);

    if (!errors.isEmpty()) {
      if (req.params.id) data.id = req.params.id;
      return res.status(400).render("products/productRegister", {
        errors: errors.array(),
        data,
      });
    }
    try {
      // const { title, price, quantity } = req.body;
      console.log("====>>> req.body");
      console.log(req.body);
      // const productData = { title, price, quantity };
      const productData = {
        ...req.body,
        // image: req.file ? req.file.buffer.toString('base64') : null,
      };

      if (req.file?.buffer)
        productData.image = req.file.buffer.toString("base64");

      req.session.sortInAscOrder = -1;
      // Check if we are updating an existing product
      if (req.params.id) {
        // Оновлюємо дані про користувача в базі даних
        await ProductsDBService.update(req.params.id, productData);
      } else {
        // Додаємо користувача в базу даних
        await ProductsDBService.create(productData);
      }
      res.redirect("/products");
    } catch (error) {
      console.error("Error registering product:", error);
      res.status(500).render("products/productRegister", {
        errors: [{ msg: error.message }],
        data,
      });
    }
  }
  static async deleteProduct(req, res) {
    try {
      await ProductsDBService.deleteById(req.body.id);
      res.json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete product" });
    }
  }
}
export default ProductController;
