import Court from "../Model/courtModel.js";
import { cloudinaryInstance } from "../config/cloudinary.js";

const createCourt = async (req, res) => {
    console.log('createCourt');
    console.log('createCourt');

    console.log(req.body);
    console.log(req.userId);
    console.log('createCourt');

    const { CourtName, Location, AddressLine1, AddressLine2, AddressLine3,
         ContactNumber, CourtType, Landmark,Amenities, AvailableSports, Price } = req.body
    console.log(req.files);
    const sportsArray = JSON.parse(AvailableSports);
    const amenitiesArray = Amenities ? JSON.parse(Amenities) : [];
     console.log(sportsArray);
     console.log(amenitiesArray);
    try {
        const item = await Court.find({ CourtName: CourtName, Location: Location })
        if (item.length !== 0) {
            return res.status(400).json('this court is exist')
        }

        if (!req.files) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // const result = await cloudinaryInstance.uploader.upload(req.files.path);
        const result = req.files.map(file =>
            cloudinaryInstance.uploader.upload(file.path)
        );
        console.log('result', result);

        const uploadResults = await Promise.all(result);
        console.log('uploadResults', uploadResults);
        const imageUrls = uploadResults.map(result => result.url);
        // const imageUrls = result.map(results => results.url);
        console.log('imageUrls', imageUrls);
        const courtData = {
            CourtName,
            Location,
            AddressLine1,
            AddressLine2,
            AddressLine3,
            CourtType,
            ContactNumber,
            Amenities:amenitiesArray,
            Landmark,
            Price,
            AvailableSports:sportsArray,
            Createdby:req.userId,
            pics: imageUrls
        };
       
        const newCourt = new Court(courtData);
        await newCourt.save()
        res.status(200).json({ data: "succeessfully Added" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }

}
export { createCourt }

