const restaurantModel = require("../models/restaurantModel");

// CREATE RESTURANT
const createRestaurantController = async (req, res) => {
  try {
    const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords,} = req.body;
    // validation
    if (!title || !coords) {
      return res.status(400).send({
        success: false,
        message: "please provide title and address",
      });
    }
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();

    res.status(201).send({
      success: true,
      message: "New Restaurant Created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Restaurant API",
      error,
    });
  }
};


//GET RESTAURANT
const getAllRestaurantController = async (req,res) =>{
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get all Restaurant API",
      error,
    });
  }
};

// GET RESTAURNAT BY ID
const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurant= await restaurantModel.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Restaurant by id api",
      error,
    });
  }
};

//DELETE RESTAURANT
const deleteRestaurantController = async (req, res) => {
  try {
    const restaurant=await restaurantModel.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in delete resturant api",
      error,
    });
  }
};
module.exports = {createRestaurantController,getAllRestaurantController,getRestaurantByIdController, deleteRestaurantController};