

const User = require("../model/user");
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            if (userExist.password === password) {
                const token = jwt.sign({ id: userExist._id, email: userExist.email }, 'iconnect_technology');
                res.cookie('token', token);

               
                if (userExist.role === 'admin') {
                    res.json({ msg: "Admin login successful", id: userExist._id, user: userExist.email, token: token, role: userExist.role });
                } else {
                    
                    if (userExist.isVoted) {
                        res.status(400).json({ error: "You have already voted" });
                    } else {
                        res.json({ msg: "User login successful", id: userExist._id, user: userExist.email, token: token, role: userExist.role });
                    }
                }
            } else {
                res.status(400).json({ error: "Password not Match" });
            }
        } else {
            res.status(404).json({ error: "User not Found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};



const Register = async (req, res) => {
    try {
        const { email, password, name, number, role } = req.body;
        const isExist = await User.findOne({ email: email });
        if (isExist) {
            res.status(400).json({ error: 'User already exists' });
        } else {
            const newUser = new User({
                email: email,
                password: password,
                name: name,
                number: number,
                role: role
            });
            const result = await newUser.save();
            if (result) {
                res.json({ msg: "User registered successfully" });
            } else {
                res.status(500).json({ error: "User not registered" });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}
const validateLogin = [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').notEmpty().withMessage('Password is required'),
];

const validateRegister = [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('name').notEmpty().withMessage('Name is required'),
    check('number').isNumeric().withMessage('Mobile number must be numeric'),
];


const UpdateIsVoted = async (req, res) => {
    try {
        const { _id, isVoted } = req.body;
        console.log('Received isVoted:', isVoted);

       
        const updatedUsers = await User.updateMany(
            
            { $set: { isVoted } } 
        );

        res.status(200).json({ success: true, updatedUsers });
    } catch (error) {
        console.error('Error updating isVoted:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};



const users = async (req,res)=>{
    try {
        
        const users = await User.find({}, '_id email password '); 
        res.json(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}













module.exports = { Login, Register, UpdateIsVoted,validateLogin,validateRegister ,users };
