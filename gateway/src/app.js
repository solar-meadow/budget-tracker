import express from "express";
import router from "./routes/index.js";

const app = express();

app.use(express.json(), (err, req, res, next) => {
  if (err) {
    console.error("Error parsing JSON body: ", err);
    res.status(400).json({ message: "Invalid JSON data" });
  } else {
    next();
  }
});

app.use(router);

const PORT = process.env.PORT || 9093;
app.listen(PORT, () => {
  console.log(`server started at localhost:${PORT}`);
});
