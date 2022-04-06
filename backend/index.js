const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const envVariables = require('./env-variables.json');
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});
// app.use(jwt({
//   // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${envVariables.auth0Domain}/.well-known/jwks.json`
//   }),

//   // Validate the audience and the issuer.
//   audience: envVariables.apiIdentifier,
//   issuer: `https://${envVariables.auth0Domain}/`,
//   algorithms: ['RS256']
// }));

// app.get('/private', (req, res) => res.send('Only authenticated users can read this message.'));

