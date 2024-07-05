import USER from "../Model/usermodel.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv'
import twilio from 'twilio';
dotenv.config()

const signin = async (req, res) => {
    console.log('signin');
    const { email, password } = req.body
    console.log(req.body);
    try {
        const userData = await USER.findOne({ email })
        console.log(userData);
        if (!userData) {
            return res.status(400).json('invalid Email')
        }
        const isMatch = await bcrypt.compare(password, userData.password)
        if (!isMatch) {
            console.log('password');
            return res.status(400).json("Invalid password");
        }
        console.log(isMatch);
        const option = {
            expiresIn: '1h',
            algorithm: 'HS256',

        }
        userData.password = undefined
        const token = jsonwebtoken.sign({ ...userData }, process.env.JWT_SECRET, option)
        console.log(token);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json({ data: "Signin successful", token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ data: "Server error", error });
    }

};


const signup = async (req, res) => {
    console.log('signup');
    const { firstName, lastName, mobile, email, password } = req.body;
    console.log(req.body);

    const accountSid = process.env.Account_SID;
    const authToken = process.env.AuthToken;
    const client = twilio(accountSid, authToken);
    // const sendMessage = async (to, message) => {
    //     try {
    //         const response = await client.messages.create({
    //             body: message,
    //             from: process.env.My_Twilio_phone_number,
    //             to: to, // Verify this number in your Twilio trial account
    //         });
    //         console.log('Message sent successfully:', response.sid);
    //         return response.sid;
    //     } catch (error) {
    //         console.error('Error sending message:', error);
    //         throw error;
    //     }
    // };

    // // Example usage
    // const toPhoneNumber = mobile; // Replace with a verified phone number
    // const messageContent = 'Hello, this is a test message from Turf_Hub!';

    // sendMessage(mobile, messageContent)
    //     .then(sid => console.log(`Message SID: ${sid}`))
    //     .catch(error => console.error(`Failed to send message: ${error.message}`));


    try {

        const mailExist = await USER.findOne({ email: email });
        if (mailExist) {
            console.log(`mailExist ${mailExist}`);
            return res.status(400).json("Email already exists");
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new USER({ firstName, lastName, email, mobile, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Server error', error });
    }
};

const usercount = async (req, res) => {
    console.log("hhhh");
    try {
        const users = await USER.countDocuments()
        console.log("users", users);
        res.status(200).json(users

        )
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteAccount = async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    try {
        const deleteAccount = await USER.findById(id)
        console.log(deleteAccount);
        if (deleteAccount) {
            return res.status(200).json('Account deleted Successfully')
        }
        return res.status(404).json('account not found')
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}
const getdata = async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    try {
        let userdata = await USER.findById(id)
        console.log(userdata);
    } catch (error) {

    }
}
const updatesuser = async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    const id = req.params.id
    const update = req.body
    try {
        const updates = await USER.findByIdAndUpdate(id, update, { new: true })
        if (!updates) {
            console.log(updates);
            return res.status(200).json({ message: "user not found" })
        }
        console.log(updates);
        updates.password = undefined
        return res.status(200).json(updates)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' })

    }
}
const changePassword = async (req, res) => {
    console.log('changePassword');
    console.log(req.body);
    const { email, mobile, New_Password } = req.body
    try {
        const accounnt = await USER.findOne({ email: email })
        console.log(accounnt);
        if (!accounnt) {
            console.log('email is not registered');
            return res.status(400).json( "Email is not registered" )
        }
        if (accounnt.mobile.toString() !== mobile) {
            console.log('mobile is not match');
            return res.status(400).json( "Mobile is not registered with this account" )
        }
        const changingPassword = await USER.findOneAndUpdate({email} , { password: New_Password }, { new: true })
        console.log(changingPassword,'updated');
    } catch (error) {
        console.log(error);
    }
}
export { signin, signup, usercount, deleteAccount, getdata, updatesuser, changePassword };

