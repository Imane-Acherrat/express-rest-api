const express = require("express") // CommonJs (import -> ES Modules)

// TODO
const productsRoutes = require("./routes/products")

const app = express()

app.use(express.json())

// TODO
app.use("/products", productsRoutes)

app.listen(3000, () => {
    console.log("Server running on port 3000")
})