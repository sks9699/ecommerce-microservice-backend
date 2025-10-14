require("dotenv").config()  
const express = require("express") 
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser")
const cors = require("cors")
const connect = require("./app/config/database")

app.use(cors())

app.use(bodyParser.json({
    limit:"100mb"
}))

app.use(bodyParser.urlencoded({
    limit:"100mb",
    extended:true
}))
const db = connect();

require("./app/routes/auth.route")(app);
require("./app/routes/product.route")(app);
require("./app/routes/cart.route")(app);
require("./app/routes/order.route")(app);
require("./app/routes/admin.route")(app);

app.use("/",(req,res)=>{
res.send("Welcome working perfectly fine !")
})

app.listen(PORT,()=>{
    console.log(`server is running at port http://localhost:${PORT}`);
})