import CourtSchedule from "../Model/slotModel.js";


const createSlot=async(req,res)=>{
   // console.log(req.body);
   // console.log(req.params);
   const {startDate,endDate,selectedSlot}=req.body
   // console.log(new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)));
   // console.log(new Date(startDate ));
   let currentDate=new Date(new Date(startDate).setUTCHours(0, 0, 0, 0))
   let endDates=new Date(new Date(endDate).setUTCHours(0, 0, 0, 0))
   const slotObjects=[];

   try {
      // console.log(selectedSlot);
      while (currentDate<=endDates) {
         console.log(currentDate);
         for(let slot of selectedSlot){
            console.log(slot);
            slotObjects.push({
              date:startDate,
               slot:{
                  name:slot.name,
                  id:slot.id
               }  
            })
            console.log(slotObjects);
         }
         currentDate.setDate(currentDate.getDate()+1)
      }
      
   } catch (error) {
      
   }
}

export {createSlot}