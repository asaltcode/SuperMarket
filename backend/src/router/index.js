import express from "express"
import orderRouters from "./orderRouter.js"
import productRouters from "./productRoutr.js"

const router = express.Router();

router.get("/",(req, res)=> res.status(200).send({message : "Api is working"})) // This is Api testing
router.use("/orders", orderRouters)
router.use("/product", productRouters)

export default router