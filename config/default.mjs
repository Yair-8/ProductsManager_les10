import dotenv from "dotenv";
dotenv.config();
export default Object.freeze({
  databaseName: process.env.DATABASE_NAME,
  databaseUrl: process.env.MONGODB_URL,
  mongoURI: `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`,
  secretKey: process.env.SECRET_KEY,
  port: process.env.PORT,
});
