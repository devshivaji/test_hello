import { Request, Response } from "express";
import Product, {productModel} from "../models/product";

export const getAllProduct = async(_: Request, res: Response) =>{
    try {
    const allData = await productModel('productDB').find({}).toArray();
    res.status(200).json({success: true, data: {allData}})
    } catch (error) {
        console.log(error);
    }
}

export const addProduct = async(req: Request, res: Response)=>{
    const validatedBody = req.body as Product;
    const { product_id, name, price, gst, category, plan_duration_by_dates, plan_duration_in_days, desc, status } = validatedBody;
    const product = new Product(product_id, name, price, gst, category, plan_duration_by_dates, plan_duration_in_days, desc, status);

    await productModel('productDB').insertOne(product.clearNulls());

    res.status(200).json({ success: true, message: `product inserted into database with id: ${product_id}`});
}

export const getSingleProduct = async(req: Request, res: Response) =>{
    const product_id = req.params.id;
    const allData = await productModel('productDB').findOne({product_id});
    res.status(200).json({success: true, data: {allData}})
}

export const updateProduct = async(req: Request, res:Response) => {
    const product_id = req.params.id;

    try {
        const productUpdate = await productModel('productDB').findOneAndUpdate({product_id},{ $set: req.body});
        if (!productUpdate){
            return res.status(404).json({ success: false, message: 'Cannot update product'});
        } else{
            return res.status(200).json({ success: true, message: `updated product with id ${product_id}`})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"couldn't update product"})
    }
}

export const deleteProduct = async(req:Request, res: Response) => {
    const product_id = req.params.id;
    
    try {
        const productDelete = await productModel('productDB').findOneAndDelete({ product_id });
        if (!productDelete){
            return res.status(404).json({ success: false, message: 'Cannot delete product'});
        } else{
            return res.status(200).json({ success: true, message: `deleted product with id ${product_id}`})
        }
    } catch (error) {
        return res.status(500).json({message:"couldn't delete product"})
    }

} 