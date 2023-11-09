const  express = require('express')
const mongoose=require('mongoose');
const Campground = require('../views/modules/campGorund');
const {descriptors,places}=require('./seedHelpers')
const cities=require('./cities');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("connected to database");
});
const sample=array=>array[Math.floor(Math.random() *array.length)];
const price=()=> Math.floor(Math.random()*30)+10;
const app = express()
const seedDB=async()=>{
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        let random=Math.floor(Math.random()*1000);
        const camp=new Campground({
            location:`${cities[random].city},${cities[random].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            image:'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ullam reiciendis illum odio, voluptatibus, inventore assumenda, dignissimos quod porro ut quas tempore beatae quasi vel eligendi explicabo possimus asperiores doloribus.',
            price:price(),
        })
        await camp.save();
        
    }
}

seedDB();