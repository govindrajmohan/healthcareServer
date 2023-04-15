const router = require("express").Router();
const passport = require("passport");
const PatientModel = require("./model/patient")
const AppointmentModel = require("./model/appointment")
const RecordModel = require("./model//medicalrecord")
const InventoryModel = require("./model/inventory")
const BillingModel = require("./model/billling")
const User = require('./model/user')

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);



router.get("/patient", async (req, res,next) => {
  // console.log("Access Token", req.headers.authorization)
  
  try {
    const findToken = await User.findOne({accessToken:req.headers.authorization});
    
    if (!findToken) {
      return res.status(404).json({ message: "User not authorized." });
    }
    const patient = await PatientModel.find({});
    
      res.send(patient)
    
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }


});

// Get all billing documents
router.get('/billing', async (req, res) => {

  
  try {
    const findToken = await User.findOne({accessToken:req.headers.authorization});
    
    if (!findToken) {
      return res.status(404).json({ message: "User not authorized." });
    }
    const billings = await BillingModel.find({});
    res.send(billings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
  
});

// Get all inventory documents
router.get('/inventory', async (req, res) => {
  try {
    const findToken = await User.findOne({accessToken:req.headers.authorization});
    
    if (!findToken) {
      return res.status(404).json({ message: "User not authorized." });
    }
    const inventory = await InventoryModel.find({});
  res.send(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
  
});

// Get all appointment documents
router.get('/appointment', async (req, res) => {
  try {
    const findToken = await User.findOne({accessToken:req.headers.authorization});
    
    if (!findToken) {
      return res.status(404).json({ message: "User not authorized." });
    }
    const appointments = await AppointmentModel.find({});
  res.send(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
  
  
});

// Get all record documents
router.get('/record', async (req, res) => {
  try {
    const findToken = await User.findOne({accessToken:req.headers.authorization});
    
    if (!findToken) {
      return res.status(404).json({ message: "User not authorized." });
    }
    const records = await RecordModel.find({});
  res.send(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
  
  
  
});
module.exports = router