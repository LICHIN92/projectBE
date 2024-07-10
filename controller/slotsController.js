import CourtSchedule from "../Model/slotModel.js";

const createSlot = async (req, res) => {
   console.log(req.body);
   const CourtId = req.params.courtId;
   const { startDate, endDate, selectedSlot } = req.body;
   let currentDate = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0));
   let endDates = new Date(new Date(endDate).setUTCHours(0, 0, 0, 0));
   const slotObjects = [];

   try {
      while (currentDate <= endDates) {
         let dateCopy = new Date(currentDate); // Create a copy of the current date
         console.log(dateCopy);
         for (let slot of selectedSlot) {
            slotObjects.push({
               date: dateCopy,
               slot: {
                  name: slot.name,
                  id: slot.id
               },
               courtId: CourtId
            });
            console.log(slotObjects);
         }
         currentDate.setDate(currentDate.getDate() + 1);
         // currentDate = new Date(new Date(currentDate).setUTCHours(0, 0, 0, 0));
      }

      const addSlot = await CourtSchedule.insertMany(slotObjects);
      res.status(201).json({ message: 'Slots created successfully', slots: addSlot });

   } catch (error) {
      if (error.code == 11000) {
         console.log(error.errorResponse.writeErrors.err);
         return res.status(500).json('Already Scheduled,duplication')
      }
      console.log(error);
      res.status(500).json({ message: 'Error creating slots', error: error.message });
   }
}

const getSlotData = async (req, res) => {
   console.log(req.query);
   let currentDate = new Date(req.query.date)
   console.log(currentDate);
   
   try {
      let slotdata = await CourtSchedule.find({ date: currentDate, courtId: req.query.id,booked:false })
      console.log(slotdata);

      if (slotdata) {
         return res.status(200).json(slotdata)

      }
      return res.status(400).json({ message: "no slot data" })

   } catch (error) {
      return res.status(500).json({ message: "internal server error" })

   }


}
export { createSlot, getSlotData };
