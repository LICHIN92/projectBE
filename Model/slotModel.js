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
    }
})
const CourtSchedule=mongoose.model("courtschedues",Schema)
Schema.index({date:1,'slot.id':1,courtId:1},{unique:true})
export default CourtSchedule