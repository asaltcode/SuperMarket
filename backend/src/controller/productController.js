import ProductModel from "../model/productModel.js"


const addProduct = async (req, res, next) =>{
    try {
        const {name, price} = req.body
        const product = await ProductModel.create({name, price})
        
        res.status(201).send({
            success: true,
            product
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}

const getProduct = async (req, res, next) =>{
    try {
        const product = await ProductModel.find()
        res.status(201).send({
            success: true,
            product
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}
const deleteProduct = async (req, res, next) =>{
    try {
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}
const editProduct = async (req, res, next) =>{
    try {
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}

export default {addProduct, getProduct, deleteProduct, editProduct}