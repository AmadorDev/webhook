const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT;

app.use(express.json());

app.get("/webhook", (req, res) => {
  console.log("--")
  let verifyToken = process.env.TOKEN;
  let mode = req.query["hub.mode"];
  let challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];

  if (mode && token) {
    if (mode === "subscribe" && token == verifyToken) {
      return res.status(200).send(challenge);
    } else {
      return res.status(403)
    }
  }
  return res.status(403)
  
});

app.post("/webhook", (req, res) => {
  let body = req.body
  console.log(body)
  return res.status(200)
});

app.listen(port, () => {
  console.log(`running port ${port}`);
});
