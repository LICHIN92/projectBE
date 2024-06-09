import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const adminAuth = (req, res, next) => {
    console.log('adminauth');
    console.log(req.headers);
    console.log('adminauth');

    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    // console.log(authHeader);
    if(!authHeader){
        return res.status(401).send('Authorization header is missing');
    }
    const token = authHeader.split(' ')[1]; // Bearer token
    console.log(token);
   
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }
//   console.log(token);
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded; // attach the decoded token to req.user
        next(); 
    } catch (error) {
        return res.status(403).json({ message: 'Token is not valid' });
    }
};

export { adminAuth };
