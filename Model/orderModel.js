import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    courtId: {
        type: mongoose.Types.ObjectId,
        ref: "courts",
        required: true
    },
    slotId: {
        type: Array,
        required: true
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
        ref: "users",
        required: true
    }
})
const ORDER=mongoose.model("orders",orderSchema)
export default ORDER