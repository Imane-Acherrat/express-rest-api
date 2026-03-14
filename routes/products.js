const express = require("express")
const fs = require("fs")

const router = express.Router()

function readProducts() {
    const data = fs.readFileSync("./data/products.json", "utf-8")
    return JSON.parse(data)
}
function writeProducts(data) {
    fs.writeFileSync("./data/products.json", JSON.stringify(data, null, 2))
}
router.get("/", (req, res) => {
    const data = readProducts()
    res.status(200).json(data)
})
router.get("/:id", (req, res) => {
    const data = readProducts()
    const id = parseInt(req.params.id)

    const product = data.find(p => p.id == id)

    if (!product) {
        res.status(404).json({ message: "Product not found" })
    }

    res.status(200).json(product)
})


router.post("", (req, res) => {
    const data = readProducts()
    const newProduct = {
        id: Date.now(),
        name: req.body.name,
        price: req.body.price
    }
    data.push(newProduct)
    writeProducts(data)
    res.status(201).json(newProduct)
})

router.put("/:id", (req, res) => {
    const data = readProducts()
    const id = parseInt(req.params.id)

    const product = data.find(p => p.id == id)

    if (!product) {
        res.status(404).json({ message: "Product not found" })
    }

    product.name = req.body.name,
        product.price = req.body.price

    writeProducts(data)
    res.status(200).json(product)
})

router.delete("/:id", (req, res) => {
    const data = readProducts()
    const id = parseInt(req.params.id)

    const index = data.findIndex(p => p.id == id)

    if (index == -1) {
        res.status(404).json({ message: "Product not found" })
    }
    data.splice(index, 1)
    writeProducts(data)
    res.status(200).json({ message: "Product deleted" })
})
module.exports = router