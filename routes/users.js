var express = require('express');
var router = express.Router();
var register = require('../Models/registration');
var passport = require('passport');
var cars = require('../Models/Cars');
var Car_Option = require('../Models/Caroption');
const bcrypt = require('bcrypt');
const admin = require('../Models/Admin');

//Registration
router.post('/register',function(req,res,next){
    addUser(req,res)
});

async function addUser(req,res){
  const emailExists = await register.findOne({email:req.body.email});
  if(emailExists) return res.send("email already exists");
  var user = new register({
    username:req.body.username,
    email:req.body.email,
    password:register.hashPassword(req.body.password),
    date:Date.now()
  });

  try{
    doc = await user.save();
    return res.json(doc);
  }
  catch(err){
    return res.json(err);
  }
}

//Login Authenticate
router.post('/login',function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.json(err); }
    if (!user) { return res.json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.json(err); }
      return res.status(200).json({message:'login successfull'});
    });
  })(req, res, next);
});
 
router.get('/usern',isValidUser,function(req,res,next){
  return res.json(req.user);

});

function isValidUser(req,res,next){
  if(req.isAuthenticated()) 
  next();
  else return res.json({message:'unauthorized request'});
 
}

router.get('/logout',isValidUser,function(req,res,next){
  req.logout();
  return res.json({message:'Logout Successfull'});
})

//Add Car
router.post('/addcar',function(req,res,next){
    addCar(req,res)
});

async function addCar(req,res){
  var car = new cars({
    Carname:req.body.Carname,
    CarType:req.body.CarType,
    Rent:req.body.Rent
  });

  try{
    doc = await car.save();
    return res.json(doc);
  }
  catch(err){
    return res.json(err);
  }
}
//book a car
router.post('/book',function(req,res,next){
  book(req,res)
});

async function book(req,res){
  const emailExists = await register.findOne({email:req.body.email});
  if(!emailExists) return res.send("this is not a registered email");
  var carso = new Car_Option({
    Carname:req.body.Carname,
    email:req.body.email,
    date : Date.now()
  })
  try{
    doc = await carso.save();
    return res.json(doc);
  }
  catch(err){
    return res.json(err);
  }
}

// router.get('/getbookings',async (req,res)=>{
//   const 
// })

router.post('/adminregister', async (req,res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password,salt);
  const Admin = new admin({
      username:req.body.username,
      password:hashPassword
  });
  try {
    const savedadmin = await Admin.save();
    res.json(savedadmin);
} catch (error) {
    res.status(400).send(error)
}
});



//adminlog
router.post('/admincheck',async(req,res) => {
  const adminexist = await admin.findOne({username:req.body.username});
  if(!adminexist) return res.send("Incorrect username");
  const validpass = await bcrypt.compare(req.body.password, adminexist.password);
  if(!validpass) return res.send("Incorect password")
  res.json({message:"Login Successful"});

});

//Get Bookings
router.get('/getbooking',async(req,res) => {
  const bookings = await Car_Option.find();
  res.json(bookings)
})


module.exports = router;
