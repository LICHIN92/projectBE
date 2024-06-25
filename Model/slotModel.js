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
        ref:'courts'
    },
    booked: {
        type: Boolean,
        default: false
    },
    bookedby:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    }
})
const CourtSchedule=mongoose.model("courtschedule",Schema)
Schema.index({date:1,'slot.id':1,courtId:1},{unique:true})
export default CourtSchedule