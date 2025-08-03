const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
app.use(express.static(path.join(path.dirname(__dirname), "build")));

app.get("/*w", (req, res) => {
  console.log("hello broo");
  console.log(path.join(path.dirname(__dirname), "build"));
  //   res.send("ok repo");
  res.sendFile(
    path.join(path.join(path.dirname(__dirname), "build", "index.html"))
  );
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
