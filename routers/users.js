const express= require('express');
const router=express.Router();
const User=require('../views/modules/users');
const passport = require('passport');

router.get('/register',(req,res)=>{
    res.render('users/register');
    req.flash('succes','wellcome to yelp camp')
});
router.post('/register',async(req,res,next)=>{
    const {username,email,password}=req.body;
    const user=new User({email,username});
    const registeredUser= await User.register(user,password);
    req.login(registeredUser,(err)=>{
        if (err) return next(err);
        req.flash('succes','welcome to Yelp Camp');
        res.redirect('/campgrounds');
    })
    
})

router.get('/login',(req,res)=>{
    req.flash('succes','loged in succesfuly');
    res.render('users/login');  
    
})
router.post('/login',passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }), (req, res) => {
    const redirectUrl = req.session.returnTo || '/campgrounds' ;
    
    res.redirect(redirectUrl);
  });
  
  router.get('/logout',(req, res, next)=>{
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('succes','loged out succesfuly')
      res.redirect('/campgrounds');
    });
  });
  

module.exports=router;