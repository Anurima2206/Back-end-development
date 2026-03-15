const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// GET USER INFO
const getUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.user.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //hinde password
    user.password = undefined;
    //resp
    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user,
    });
  }
  catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Get User API",
      error,
    });
  }
};

//UPDATE USER INFO
const updateUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.user.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "USer Updated SUccessfully",
    });
  } catch (error) {
    console.log(erorr);
    res.status(500).send({
      success: false,
      message: "Error In Udpate Userr API",
      error,
    });
  }
};

//RESET PASSWORD way 1
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found or invalid answer",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "eror in PASSWORD RESET API",
      error,
    });
  }
};

//RESET PASSWORD way 2
const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById({_id:req.user.id});
    if(!user){
      res.status(404).send({
      success: false,
      message: "user not found",
      });
    }
    const {oldPassword,newPassword}=req.body
    if(!oldPassword||!newPassword){
      res.status(400).send({
      success: false,
      message: "missing fields",
    });
    }
    const isMatch=await bcrypt.compare(oldPassword,user.password)
        if(!isMatch){
          return res.status(500).send({
            success:false,
            message:"Invalid credentials"
          })
        }
      //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "eror in PASSWORD UPDATE API",
      error,
    });
  }
}

//DELETE USER PROFILE
const deleteProfileController = async (req, res) => {
  try {
    const user=await userModel.findByIdAndDelete(req.user.id);
  if (!user) {
    return res.status(404).send({
    success:false,
    message:"User not found"
  })
}
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Delete Profile API",
      error,
    });
  }
};


module.exports = { getUserController,updateUserController,resetPasswordController,updatePasswordController,deleteProfileController};