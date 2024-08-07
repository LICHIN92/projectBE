import Court from "../Model/courtModel.js"
import mongoose from "mongoose"
import { cloudinaryInstance } from "../config/cloudinary.js";

const getcourtData = async (req, res) => {
    try {
        const data = await Court.find();
        if (data.length > 0) {
            res.status(200).json(data);
            // console.log('Court data retrieved:', data);
        } else {
            res.status(404).json({ message: 'No court data found' });
            console.log('No court data found');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving court data', error: error.message });
        console.error('Error retrieving court data:', error);
    }
};

const getSingleCourt = async (req, res) => {
    console.log('hit');
    try {
        console.log(req.query.id);
        console.log(req.params.id);
        const courtdata = await Court.findById(req.params.id)
        if (!courtdata) {
            return res.status(400).json('Court is not found')
        }
        console.log(courtdata);
        res.status(200).json(courtdata)
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");

    }
}

const extractPublicId = (url) => {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split('/');
    const versionIndex = parts.findIndex(part => part.startsWith('v'));
    let publicIdWithVersion;
    if (versionIndex !== -1) {
        publicIdWithVersion = parts.slice(versionIndex + 1).join('/');
    } else {
        publicIdWithVersion = parts.slice(parts.indexOf('upload') + 1).join('/');
    }
    const publicId = publicIdWithVersion.substring(0, publicIdWithVersion.lastIndexOf('.'));
    return publicId;
};

const deleteCourt = async (req, res) => {
    console.log(req.params.id);
    console.log('delete');
    try {
        const courtData = await Court.findById(req.params.id);

        if (!courtData) {
            return res.status(404).json({ error: 'Court not found' });
        }

        const pics = courtData.pics;
        console.log(pics);

        if (pics && pics.length > 0) {
            const deletionResults = await Promise.all(
                pics.map(async (file) => {
                    const publicId = extractPublicId(file);
                    console.log(publicId);
                    const result = await cloudinaryInstance.uploader.destroy(publicId);
                    if (result.result !== 'ok') {
                        throw new Error(`Failed to delete file: ${file}`);
                    }
                    return result;
                })
            );

            console.log('All files deleted successfully', deletionResults);
        } else {
            console.log('No files to delete');
        }

        // Delete the court document from the database
        await Court.findByIdAndDelete(req.params.id);

        // Send a success response to the client
        res.status(200).json({ message: 'Deletion process completed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const mycourtCourts = async (req, res) => {
    console.log('mycourts');
    console.log(req.params);
    try {
        const courts = await Court.find({ Createdby: req.params.id })
        if (courts.length > 0) {
            console.log(courts.length)
            return res.status(200).json(courts)
        }
        return res.status(404).json({ error: 'Court not found' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

const updateCourt=async(req,res)=>{
    console.log(req.params);
    console.log(req.body);
    const id=req.params.id
  try {
       const updated=await Court.findByIdAndUpdate(id,req.body,{new:true})
       console.log(updated);
       if(updated){
        return res.status(200).json({message:'Court is modified Successfully'})
       }
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:'server error'})
  }
}

export { getcourtData, getSingleCourt, deleteCourt, mycourtCourts,updateCourt }