import Court from "../Model/courtModel.js"

const getcourtData=async (req,res)=>{
    const data=await Court.find()
    if(data){
        res.status(200).json(data)
    }
    console.log(data);

}

export {getcourtData}