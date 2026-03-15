const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createRestaurantController, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController } = require("../controllers/restaurantController");


const router = express.Router();

//routes
// CRAETE RESTAURANT || POST
router.post("/create", authMiddleware, createRestaurantController);

//GET RESTAURANT || GET
router.get("/getAllRestaurants", authMiddleware, getAllRestaurantController);

//GET RESTAURANT BY ID || GET
router.get("/getIdRestaurant/:id", authMiddleware, getRestaurantByIdController);

//DELETE RESTAURANT
router.delete("/delete/:id", authMiddleware, deleteRestaurantController);

module.exports = router;