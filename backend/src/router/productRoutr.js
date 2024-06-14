import express from "express"
import productController from "../controller/productController.js"

const router = express.Router()
router.post("/", productController.addProduct)
router.get('/', productController.getProduct)

export default router