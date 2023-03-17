require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const port = process.env.PORT || 3000;

//models
const chefRegister = require("./Schemas/ChefsRegistrySchema");
const userRegister = require("./Schemas/usersRegistrySchema");
const workChart = require("./Schemas/works")

//Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//GET : http://localhost:3000/{}/ (All users categorized)
app.get("/chef", async (req, res) => {
  await chefRegister.find({}).then((data) => {
    res.json(data);
  });
});

app.get("/user", async (req, res) => {
  await userRegister.find({}).then((data) => {
    res.json(data);
  });
});

//GET : http://localhost:3000/{}/?id=? (particular login users all data)
app.get("/chef/:id", async (req, res) => {
  await chefRegister.findById(req.params.id).then((data) => {
    res.json(data);
  });
});

app.get("/user/:id", async (req, res) => {
  await userRegister.findById(req.params.id).then((data) => {
    res.json(data);
  });
});

//GET : http://localhost:3000/{}/login/username=?/password=? (for login)

app.get("/chef/login/:username/:password", async (req, res) => {
  const User = await chefRegister.findOne({
    username: req.params.username,
  });
  if (User) {
    const password = User["password"];
    if (bcrypt.compareSync(req.params.password, password)) {
      res.json({ msg: "success", _id: User["_id"] });
    } else {
      res.send({ msg: "wrong password" });
    }
  } else {
    res.send({ msg: "user does not exists", _id: null });
  }
});

app.get("/user/login/:username/:password", async (req, res) => {
  const User = await userRegister.findOne({
    username: req.params.username,
  });
  if (User) {
    const password = User["password"];
    if (bcrypt.compareSync(req.params.password, password)) {
      res.json({ msg: "success", _id: User["_id"] });
    } else {
      res.send({ msg: "wrong password" });
    }
  } else {
    res.send({ msg: "user does not exists" });
  }
});

//Data From WorkChart Saved
app.get("/work",async(req,res)=>{
  const data = await workChart.find({})
  res.send(data)
})

//Data from workchart with query
app.get('/work/search',async(req,res)=>{
  const chefId = req.query.chefid;
  const userId = req.query.userid;
  const startDate = req.query.startDate
  const endDate = req.query.endDate

  if(chefId){
    const works = await workChart.findOne({chefId:chefId})
    res.status(200).json(works)
  }else if(userId){
    const works = await workChart.findOne({userId:userId})
    res.status(200).json(works)
  }else if(startDate){
    const works = await workChart.findOne({startDate:startDate})
    res.status(200).json(works)
  }else if(endDate){
    const works = await workChart.findOne({endDate:endDate})
    res.status(200).json(works)
  }
})

//PUT METHODS (edit profile)
app.put("/update/chef/:id", async (req, res) => {
  await chefRegister
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      res.status(200).json({ msg: "updated successfully" });
    });
});

app.put("/update/user/:id", async (req, res) => {
  await userRegister
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      res.status(200).json({ msg: "updated successfully" });
    });
});

//POST METHODS
//For Adding New User
app.post("/addchef", async (req, res) => {
  let {
    email,
    username,
    password,
    profile,
    name,
    mobile,
    yearofexp,
    summary,
    company,
    hourly_rate,
    total_package,
    specifications,
  } = req.body;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  password = hash;
  const data = await new chefRegister({
    email,
    username,
    password,
    profile,
    name,
    mobile,
    yearofexp,
    company,
    summary,
    hourly_rate,
    total_package,
    specifications,
  });
  try {
    data.save();
    res.status(200).json({ msg: "data sent successfully" });
  } catch (error) {
    res.status(400).json({ msg: "data not sent" });
  }
});

//For Adding New User
app.post("/adduser", async (req, res) => {
  let { profile, email, username, password, name, mobile } = req.body;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  password = hash;
  const user_data = await new userRegister({
    profile,
    email,
    username,
    password,
    name,
    mobile,
  });
  try {
    user_data.save();
    res.status(200).json({ msg: "data sent successfully" });
  } catch (error) {
    res.status(400).json({ error: "data not sent" });
  }
});

//For Adding New Work

app.post('/addwork',async(req,res)=>{
  let {chefId,userId,startDate,endDate,paid,eventName,eventOrganizer} = req.body;
  const AddWork = await new workChart({
    chefId,
    userId,
    startDate,
    endDate,
    paid,
    eventName,
    eventOrganizer
  })
  try{
    AddWork.save()
    res.status(200).json({msg : "successfully stored work data"})
  }catch(err){
    res.status(400).json({msg:"error"})
  }
})

//DELETE METHODS (delete my account)
app.delete("/delete/chef/:id", async (req, res) => {
  await chefRegister.findOneAndDelete({ _id: req.params.id }).then(() => {
    res.status(200).json({ msg: "delete successfully" });
  });
});

app.delete("/delete/user/:id", async (req, res) => {
  await userRegister.findOneAndDelete({ _id: req.params.id }).then(() => {
    res.status(200).json({ msg: "delete successfully" });
  });
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

//db connect

mongoose
  .connect(process.env.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  });
