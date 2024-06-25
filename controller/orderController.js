import Razorpay from "razorpay";
import ORDER from "../Model/orderModel.js";

const order = async (req, res,next) => {
    console.log(req.body);
    const {amount,slotId,courtId}=req.body
    console.log(req.userId);
    try {
        const instance = new Razorpay({
            key_id: process.env.RP_KEY_ID,
            key_secret: process.env.RP_SECRET_KEY,
        });
        const neworder= new ORDER({courtId:courtId,slotId:slotId, totalPrice:amount,bookedBy:req.userId})
        await neworder.save()
        const options={
            amount:amount*100,
            currency: "INR",
            receipt: neworder._id,
        };
        const order=await instance.orders.create(options);
        if(!order){
            console.log('order eror',order);
            return res.status(500).send("Some error occured");
        }
        res.status(200).json(order); 
    } catch (error) {
        console.log(error);
        next()
    }
}

export { order }