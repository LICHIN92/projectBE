import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    courtId: {
        type: mongoose.Types.ObjectId,
        ref: "Court",
        required: true
    },
    slotId: {
        type: Array,
        // type:mongoose.Types.ObjectId,
        required: true,
        ref:"courtschedule"
    },
    totalPrice: {
        type: Number,
        required: true
    },
    createdOn: {
        type: Date,
        dafault: new Date(),
    },
    bookedBy: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    }
})
const ORDER=mongoose.model("orders",orderSchema)
export default ORDER