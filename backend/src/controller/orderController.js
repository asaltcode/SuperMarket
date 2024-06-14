import OrderModel from "../model/orderModel.js"
import uniqueId from "generate-unique-id"


const createOrder = async (req, res, next) =>{
    try {
        const orderId = uniqueId({length: 5, useLetters: false})
        const order = await OrderModel.create({
            orderId
        })
        res.status(201).send({
            success: true, 
            order
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}
const getOrders = async (req, res, next) =>{
    try {
        const orders = await OrderModel.find()
        res.status(201).send({
            success: true, 
            orders
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}
const getByIdOrder = async (req, res, next) =>{
    try {
        const order = await OrderModel.findById(req.params.id)
        if (!order) {
            return  res.status(404).send({
                  success: false,
                  message: "Not found"
              })
            } 
        res.status(200).send({
            success: true, 
            order
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}
const deleteOrder = async (req, res, next) =>{
    try {
        const order = await OrderModel.findByIdAndDelete( req.params.id )
        if (!order) {
          return  res.status(404).send({
                success: false,
                message: "Not found"
            })
          } 
          res.status(204).send({
            success: true,
            message: "Order deleted"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}
const editOrder = async (req, res, next) =>{
    const {orderAmount, customerName, items} = req.body
    const order = await OrderModel.findByIdAndUpdate( req.params.id, req.body, { new: true } )
    if (!order) {
      return  res.status(404).send({
            success: false,
            message: "Not found"
        })
      } 
      res.status(201).send({
        success: true,
        message: "Order edited"
    })
}

export default {createOrder, getOrders, getByIdOrder, deleteOrder, editOrder}