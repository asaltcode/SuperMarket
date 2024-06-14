import express from "express"
import orderController from "../controller/orderController.js"

const router = express.Router()

router.post("/", orderController.createOrder)
router.get("/", orderController.getOrders)
router.get("/:id", orderController.getByIdOrder)
router.delete("/:id", orderController.deleteOrder)
router.put("/:id", orderController.editOrder)

export default router

