import mongoose from "mongoose";
import config from "../config/default.mjs";

const { Schema } = mongoose;
const productSchema = new Schema({
  title: {
    type: String,
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [50, "Title must be at most 50 characters long"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    toInt: true,
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    toInt: true,
  },
  image: {
   type: String,
   // validate: {
   //   validator: function (v) {
   //     return /^data:image\/(jpeg|png|gif|bmp);base64,/.test(v)
   //   },
   //   message:
   //     'Image must be a valid base64 string in JPEG, PNG, GIF, or BMP format',
   // },
 },
});
productSchema.statics.checkDatabaseExists = async () => {
  const databases = await mongoose.connection.listDatabases();
  return databases.databases.some(
    (db) => db.name === config.productsDatabaseName
  );
};
productSchema.statics.checkCollectionExists = async function () {
  const collections = await mongoose.connection.db
    .listCollections({ name: "products" })
    .toArray();
  return collections.length > 0;
};
const Product = mongoose.model("Product", productSchema);
export default Product;
