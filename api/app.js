const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require('./routes');
const { connectToDatabase } = require("./helpers/db-conn");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// app.use((_, res) => {
//     res.send({
//         message: 'Not found 404!'
//     })
// });

app.use('/api', routes);

connectToDatabase();
app.listen(5000, (req, res) => {
    console.log("Server is listening on port 5000");
})