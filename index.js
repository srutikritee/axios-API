const express = require("express");
const app = express();

const config = require("./config");
const request = require("request");
const server = require("./server");

app.use(express.json());

app.post("/api/users", function(req, res) {
  let token;
  let instanceUrl;

  server
    .authorize()
    .then(response => {
      console.log("**Successfully authorized**");
      token = response.data.access_token;
      instanceUrl = response.data.instance_url;
      console.log(token, instanceUrl);
      return server.createProduct(token, instanceUrl);
    })
    .then(response => {
      console.log(response.data);
      res.send(response.data);
      process.exit(0);
    })
    .catch(error => {
      if (error.status >= 100 && error.status < 600) {
        res.status(error.status);
        console.log(error.statusText);
      } else res.status(500);

      // process.exit(1);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
