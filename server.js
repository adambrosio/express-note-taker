// Requiring dependencies
const express = require("express");
const compression = require("compression");
// Create express server
const app = express();

app.use(compression({ filter: shouldCompress }))

function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false;
    }
    // fallback to standard filter function
    return compression.filter(req, res);
};
// Set initial port
const PORT = process.env.PORT || 3000;
// Express app handling data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// Point server to route files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function(){
    console.log("App is listening on PORT: " + PORT);
});