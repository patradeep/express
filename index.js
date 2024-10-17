const express = require ('express');
const path = require('path');

const userModel = require('./models/user.js');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

let PORT=process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/alluser', async (req, res) => {
  let users = await userModel.find();
  // console.log(users);
  
  res.render('all.ejs',{users});
});

app.post('/create', async (req, res) => {
  let {image,name,email} = req.body;
  const createuser=await userModel.create({image,name, email})
  res.redirect('/alluser');
  
});

app.get('/edite/:id', async (req, res) => {

  const User=await userModel.findOne({_id:req.params.id});
  res.render('update.ejs', {User});
});

app.post('/update/:id', async (req, res) => {
  let {image,name,email} = req.body;
  const updateUser=await userModel.findOneAndUpdate({_id:req.params.id}, {image,name,email},{new:true});
  res.redirect('/alluser');
});

app.get('/read', async (req, res) => {
  let users=await userModel.find();
  res.send(users);
});

app.get('/delete/:id',async (req, res) => {
  const deleteUser=await userModel.findOneAndDelete({_id: req.params.id});
  res.redirect('/alluser');
  // res.send(deleteUser);
});

app.listen(PORT);