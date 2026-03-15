const userModel = require("../models/userModel");
const bcrypt=require("bcrypt");
const JWT=require('jsonwebtoken')
//Register
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address,answer} = req.body;
    //validation
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    // check user
    const exisiting = await userModel.findOne({ email });
    if (exisiting) {
      return res.status(400).send({
        success: false,
        message: "Email Already Registerd please Login",
      });
    }

    //hashing password
    var salt=bcrypt.genSaltSync(10);
    const hashedpass=await bcrypt.hash(password,salt);
    //create new user
    const user = await userModel.create({
      userName,
      email,
      password:hashedpass,
      address,
      phone,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error:error.message,
    });
  }
};

//login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validfatuion
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Provide Email OR Password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //compare password
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(500).send({
        success:false,
        message:"Invalid credentials"

      })
    }
    const token=JWT.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    user.password=undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
}
catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error:error.message,
    });
  }
}
module.exports = { registerController,loginController };