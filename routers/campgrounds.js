const express=require("express");
const router = express.Router({mergeParams:true});
const appError=require('../utils/AppError');
const catchAsync=require('../utils/catchAsync');
const Campground = require('../views/modules/campGorund');
const { isLogedIn } = require("../middleware");

//SHOW ALL CAMPGROUNDS
router.get('',catchAsync( async(req,res)=>{
    const campgrounds=await Campground.find({});
    res.render('campgrounds/index',{campgrounds})
}))
//CREATE NEW CAMPGROUND
router.get('/new',isLogedIn,(req,res)=>{
   
    res.render('campgrounds/new');
})
router.post('',isLogedIn,catchAsync( async (req,res,next)=>{
    const campground=new Campground(req.body.campground);
    await campground.save()
    console.log(campground); 
    req.flash('succes','campground added') ;  
    res.redirect('/campgrounds');
}) )


//SHOW CAMPGROUND DETAILLS
router.get('/:id',catchAsync( async(req,res)=>{
    const {id}=req.params;
    const campground=await Campground.findById(id).populate('reviews');
    res.render(`campgrounds/details`,{campground:campground});
}))

//EDIT CAMPGROUND
router.get('/:id/edit',catchAsync( async(req,res)=>{

    const {id}=req.params
    const campground=await Campground.findById(id);
    res.render('campgrounds/edit',{campground})
}))
router.put('/:id',catchAsync( async (req,res,next)=>{
    const {id}=req.params;
    console.log(req.body);
   if (!req.body) throw new appError('Invalid Campground Data',400)
    const campground=await Campground.findByIdAndUpdate(id,{...req.body.campground},{runValidators:true});
    res.redirect(`/campgrounds/${campground._id}`);
}))

//delete campground

router.delete('/:id',catchAsync( async(req,res,next)=>{
    const {id}=req.params;
    await Campground.findByIdAndRemove(id);
    res.redirect('/campgrounds');
}))


module.exports=router;