const express=require("express");
const router = express.Router({mergeParams:true});
const catchAsync=require('../utils/catchAsync');
const Campground = require('../views/modules/campGorund');
const Review=require('../views/modules/seeds/review');

router.post('',catchAsync(async(req,res)=>{
    const campground=await Campground.findById(req.params.id);
    const review=new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
    
}))

//delete review

router.delete('/:reviewId',catchAsync(async(req,res)=>{
    const {id,reviewId}=req.params;
    const campground=await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${campground._id}`)
}))
module.exports=router;