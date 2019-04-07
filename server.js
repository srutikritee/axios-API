const axios = require("axios");
const querystring = require("querystring");

const CLIENT_ID = "";
const CLIENT_SECRET = "";
const USERNAME = "";
const PASSWORD = "";

module.exports = {
  authorize: function() {
    return axios.post(
      "https://login.salesforce.com/services/oauth2/token",
      querystring.stringify({
        grant_type: "password",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        username: USERNAME,
        password: PASSWORD
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    );
  },
  createProduct: function(token, instanceUrl) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      data: {
        Name: "testAPIagain555",
        Price__c: 200
      },
      url: instanceUrl + "/services/data/v41.0/sobjects/Pharma_Products"
    });
  }
};
