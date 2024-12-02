import { body } from "express-validator";

class ProductValidator {
  static productValidationRules = [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").not().isEmpty().withMessage("Price is required"),
    body("quantity").not().isEmpty().withMessage("Quantity is required"),
  ];
  static productSchema = {
    title: {
      notEmpty: {
        errorMessage: "Title is required",
      },
      isLength: {
        options: { min: 3 },
        errorMessage: "Title must be at least 3 characters long",
      },
      trim: true, // Видаляє пробіли на початку і в кінці
      escape: true, // Екранує HTML символи
    },
    price: {
      notEmpty: {
        errorMessage: "Price is required",
      },
      toInt: true,
      trim: true, // Видаляє пробіли на початку і в кінці
    },
    quantity: {
      notEmpty: {
        errorMessage: "Quantity is required",
      },
      toInt: true,
      trim: true, // Видаляє пробіли на початку і в кінці
    },
  };
}
export default ProductValidator;
