import mongoose from "mongoose";

const Schema=mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    slot:{
        type:Object,
        required:true
    },
    courtId:{
        type:mongoose.Types.ObjectId,
        ref:'Court'
    },
    booked: {
        type: Boolean,
        default: false
    },
    bookedBy:{
        type:mongoose.Types.ObjectId,
        ref:'user',
    },
    orderId:{
        type:mongoose.Types.ObjectId,
        ref:'orders',
    }
})
const CourtSchedule=mongoose.model("courtschedule",Schema)
Schema.index({date:1,'slot.id':1,courtId:1},{unique:true})
export default CourtSchedule