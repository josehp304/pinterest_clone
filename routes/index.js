var express = require('express');
var router = express.Router();
const upload = require('./multer')
const LocalStratergy = require('passport-local')
const userModel = require ('./users')
const passport = require('passport')
const postModel=require('./posts')
passport.use(new LocalStratergy(userModel.authenticate()))



router.get('/', function(req, res, next) {
  res.render('index',{error:req.flash("error")});
});
router.get('/signup',(req,res)=>{
  res.render('signup')
})
router.get('/home',isLoggedIn,async function(req,res,next){
  allPost = await postModel.find()
  res.render('home',{allPost:allPost})
})
router.get('/profile',isLoggedIn, async function(req,res,next){
  user = await userModel.findOne({username:req.session.passport.user}).populate("posts")
  console.log(user.posts)
  res.render('profile',{user:user})
  
})
router.post('/register',async(req,res)=>{
  try{

    var userData = new userModel({
      username:req.body.username,
      secret:req.body.secret
    })
    userModel.register(userData,req.body.password).then(function(){
      passport.authenticate("local")(req,res,function(){
        res.redirect("/home")
      })
    })    
  } catch(error){
    res.render("error",{error})
    
  }

})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash:true,
}));

router.post('/logout',(req,res)=>{
  req.logout((err)=>{
    if(err){
      console.error(err)
    }
    res.redirect("/")

  })
})

router.post('/upload',upload.single("file"),async (req,res,next)=>{
  if(!req.file){
    return res.status(400).send('no files reached the server')
  }
  user =await userModel.findOne({username:req.session.passport.user})
  console.log(user._id)
  post = await postModel.create({
    postImage:req.file.filename,
    postText:req.body.filecaption,
    user:user._id,
  })  

  
  user.posts.push(post._id)
  await user.save()
  res.redirect('/profile')
})

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next()
  }
  res.redirect("/")
}



module.exports = router;
