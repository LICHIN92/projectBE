import USER from "../Model/usermodel.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv'
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
            algorithm: 'HS256'
        }
        // const token = jsonwebtoken.sign({ id: userData._id, email: userData.email }, process.env.JWT_SECRET, { expiresIn: '1h' })
        userData.password = undefined
        const token = jsonwebtoken.sign({ ...userData }, process.env.JWT_SECRET, option)
        console.log(token);
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
const getdata=async(req,res)=>{
    console.log(req.params.id);
    const id = req.params.id;
    try {
        let userdata=await USER.findById(id)
        console.log(userdata);
    } catch (error) {
        
    }
}
const updatesuser=async (req,res)=>{
    console.log(req.params);
    console.log(req.body);
    const id=req.params.id
    const update=req.body
    try {
        const updates=await USER.findByIdAndUpdate(id,update,{new:true})
        if(!updates){
            console.log(updates);
            return res.status(200).json({message:"user not found"})
        }
        console.log(updates);
        updates.password=undefined
        return res.status(200).json(updates)

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'server error'})
        
    }
}
export { signin, signup, usercount, deleteAccount,getdata,updatesuser };

