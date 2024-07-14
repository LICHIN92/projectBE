
import Razorpay from "razorpay";
import ORDER from "../Model/orderModel.js";
import Crypto from 'crypto';
import CourtSchedule from "../Model/slotModel.js";
import Court from "../Model/courtModel.js";
import path from "path";

const order = async (req, res, next) => {
    const { amount, slotId, courtId } = req.body;

    try {
        const instance = new Razorpay({
            key_id: process.env.RP_KEY_ID,
            key_secret: process.env.RP_SECRET_KEY,
        });

        const neworder = new ORDER({ courtId, slotId, totalPrice: amount, bookedBy: req.userId });
        await neworder.save();

        const options = {
            amount: amount * 100, // amount in paise
            currency: "INR",
            receipt: neworder._id.toString(), 
        };

        const order = await instance.orders.create(options);
        if (!order) {
            return res.status(500).send("Some error occurred");
        }

        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        next();
    }
};

const verify = async (req, res) => {
    console.log('verify');
    const { orderCreationId, courtId, razorpayPaymentId, razorpaySignature, slotIds, receipt, date } = req.body;
    console.log(req.body.date);
    try {
        const shasum = Crypto.createHmac("sha256", process.env.RP_SECRET_KEY);
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        const digest = shasum.digest("hex");

        // Comparing our digest with the actual signature
        if (digest !== razorpaySignature) {
            console.log(('not edqual'));
            return res.status(400).json({ msg: "Transaction not legit!" });
        }
        console.log('useeid=', req.userId);
        const updated = await CourtSchedule.updateMany(
            { _id: { $in: slotIds } },
            { $set: { bookedBy: req.userId, booked: true, orderId: receipt } }
        );
        console.log(updated);

        let localDate = new Date();
        console.log('Local Date:', localDate);
        let localDateOnly = new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate());
        console.log(localDateOnly);

        const updateorder = await ORDER.updateOne({ _id: receipt }, { $set: { bookedBy: req.userId, courtId: courtId, createdOn: new Date(localDateOnly) } })
        return res.status(200).json({ msg: "Transaction verified and slots booked successfully!" });
    } catch (error) {
        console.error('Error in verification:', error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

const bookedslot = async (req, res) => {
    try {
        const booking = await ORDER.find()
        console.log(booking.length);
        if (booking) {
            return res.status(200).json(booking.length)
        }
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}
const myorder = async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id
    console.log(id);
    try {
        let book = await CourtSchedule.find({ bookedBy: req.params.id })
            .populate({ path: 'courtId', select: ['CourtName', 'Location'] })
            .populate({ path: 'orderId', select: ['createdOn'] })
            .populate({ path: 'bookedBy', select: ['firstName', 'lastName'] })
        console.log(book);
        res.status(200).json(book)
    } catch (error) {
        console.log(error);
        res.status(500).json('internal server error')
 
    }


}
export { order, verify, bookedslot, myorder };
