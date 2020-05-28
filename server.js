// Requiring dependencies
const express = require("express");
// Create express server
const app = express();
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