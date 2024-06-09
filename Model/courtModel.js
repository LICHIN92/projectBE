import mongoose from "mongoose";
const courtSchema = mongoose.Schema({
    CourtName: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    AddressLine1: {
        type: String,
        required: true
    },
    AddressLine2: {
        type: String,
        required: true
    },
    AddressLine3: {
        type: String,
        required: true
    },
    ContactNumber: {
        type: String,
        required: true
    },
    Landmark: {
        type: String,
        required: true
    },
    pics: {
        type: Array,
        required: true
    },
    CourtType: {
        type: String,
        required: true
    },
    AvailableSports: {
        type: Array,
        required: true
    },
    Price:{
        type:Number,
        required:true
    },
    Createdby: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }
},
    { timestamps: true }
)

const Court = mongoose.model("Court", courtSchema)
export default Court