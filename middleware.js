module.exports.isLogedIn= (req,res,next)=>{
    if (!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error','you need to be registered first!');
        return res.redirect('/login');
       }
    next();   
}