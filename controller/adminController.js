import Court from "../Model/courtModel.js";
import { cloudinaryInstance } from "../config/cloudinary.js";

const createCourt =async (req, res) => {
    console.log(req.body);
    console.log('createCourt');
    const { name, location, addressLine1, addressLine2, addressLine3, contactNumber, landMark } = req.body
    console.log(req.file);
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const result = await cloudinaryInstance.uploader.upload(req.file.path);
        console.log('result', result);
        const imageUrl = result.url;
         console.log(imageUrl);
        const body = req.body;
        console.log(body, "body");

        
        const courtData = {
            name,
            location,
            addressLine1,
            addressLine2,
            addressLine3,
            contactNumber,
            landMark,
            image: imageUrl 
        };

        const newCourt = new Court(courtData);

   } catch (error) {
     console.log(error);
   }
    
 }

export { createCourt }


// import Court from "../Model/courtModel.js";
// import { cloudinaryInstance } from "../config/cloudinary.js";

// const createCourt = async (req, res) => {
//     console.log('createCourt');
//     const { name, location, addressLine1, addressLine2, addressLine3, contactNumber, landMark } = req.body;
//     console.log(req.files);
    
//     try {
//         if (!req.files || req.files.length === 0) {
//             return res.status(400).json({ success: false, message: "No file uploaded" });
//         }

//         // Use Promise.all to wait for multiple file uploads if needed
//         const uploadPromises = req.files.map(file => 
//             cloudinaryInstance.uploader.upload(file.path)
//         );
//     console.log(uploadPromises)
//         const uploadResults = await Promise.all(uploadPromises);

//         const imageUrls = uploadResults.map(result => result.url);


//         // Here you can now create the Court object and save it to the database
//         const courtData = {
//             name,
//             location,
//             addressLine1,
//             addressLine2,
//             addressLine3,
//             contactNumber,
//             landMark,
//             images: imageUrls // assuming you want to store the image URLs
//         };

//         const newCourt = new Court(courtData);
//         await newCourt.save();

//         // Send response after successful save
//         res.status(200).json({ success: true, data: newCourt });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };

// export { createCourt };
