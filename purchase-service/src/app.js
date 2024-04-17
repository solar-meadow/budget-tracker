import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import router from "./routers/index.js";
import jsonErrHandler from "./middleware/json_validator.js";
import "dotenv/config";

const app = express();
app.use(morgan("dev"));
app.use(express.json(), jsonErrHandler);
app.use(`/api`, router);

const ConnectDB = async function () {
  try {
    console.log("DB connecting...");
    await mongoose.connect(process.env.MONGO_CONNECT);
    console.log("DB connected successfully");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

ConnectDB()
  .then(() => {
    const PORT = process.env.PORT || 9090;
    app.listen(PORT, () => {
      console.log(`server started at localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
