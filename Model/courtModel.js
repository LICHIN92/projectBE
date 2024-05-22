import mongoose from "mongoose";
const courtSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
        required: true
    },
    addressLine3: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    landMark: {
        type: String,
        required: true
    },
    pics: {
        type: Array,
        required: true
    }
},
    { timestamp: true }
)

const Court=mongoose.model("Court",courtSchema)
export default Court