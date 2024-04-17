const jsonErrHandler = (err, req, res, next) => {
  if (err) {
    console.error("Error parsing JSON body: ", err);
    res.sendStatus(400).json({ message: "Invalid JSON data" });
  } else {
    next();
  }
};

export default jsonErrHandler;
