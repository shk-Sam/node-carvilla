const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');

app.use(cors())
app.use(express.json())

// MongoDB connection (local)
const mongoURI = 'mongodb://localhost:27017/basic'; // Local MongoDB connection string

//{ useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

  //database me jo field jaane wali hai usey define schema krti hai... in simple data me kya jaaega wo schema krta hai 
// MongoDB schema and model for profiles
const profileSchema = new mongoose.Schema({
    id: Number,
    name: String,
    desc: String,
    link: String
});

// Create a Profile model
const Profile = mongoose.model('Profile', profileSchema);
// const profile = [
//     {
//         "id":1,
//         "name":"",
//         "desc":"",
//         "link":""
//     }
// ]

//  const data = [
//     {
//         "id" : 1,
//         "name" : "Saad",
//         "address" : {
//             "city" : "Mumbra",
//             "state" : "Maha"
//         },
//         "images" : [
//             "img1",
//             "img2"
//         ],
//         "imagesWithKey" : [
//             {
//                 "path" : "/image/",
//                 "name" : "img1"
//             },
//             {
//                 "path" : "/image/",
//                 "name" : "img2"
//             }
//         ]
//     },
//     {
//         id : 2,
//         name : 'basheer',
//         address : {
//             city : 'Mumbra',
//             state : 'Maha'
//         },
//         images : [
//             'img1',
//             'img2'
//         ],
//         imagesWithKey : [
//             {
//                 path : '/image/',
//                 name : 'img2'
//             },
//             {
//                 path : '/image/',
//                 name : 'img1'
//             }
//         ]
//     },
//     {
//         id : 3,
//         name : 'prince',
//         address : {
//             city : 'Mumbra',
//             state : 'Maha'
//         },
//         images : [
//             'img1',
//             'img2'
//         ],
//         imagesWithKey : [
//             {
//                 path : '/image/',
//                 name : 'img3'
//             },
//             {
//                 path : '/image/',
//                 name : 'img4'
//             }
//         ]
//     }
// ]

// '/' user kis naam se server access krenga uske liya slash daalte hai access


app.get('/', async (req,res)=>{
    const profiles = await Profile.find(); // Fetch all profiles from the database
    res.send(profiles)
    // res.send(data)
})

app.get('/data',(req,res)=>{
    res.send('this is my data')
})


app.post('/searchEngine/:query', async (req,res)=>{
    const query = req.params.query;
    // Find profile by ID
    const profile = await Profile.find({ name : query })
    res.send(profile??'Not Found');
}) 


app.get('/home' , (req,res) => {
    const result = data.filter((item) => {
        // return item.images.includes("img3")
        const naam = item.imagesWithKey.findIndex((obj) => {
            return obj.name == 'img1'
        })
        if(naam == -1){
            return false;
        }
        else{
            return true; 
        }
    })
    res.send(result)
})

// get all profile 

app.get('/profiles', async (req,res)=>{
    const profiles = await Profile.find(); // Fetch all profiles from the database
    // console.log(profiles)
    res.send(profiles.length !==  0 ? profiles : [])
})

// params dynamic cheezo ke data ko store krke rkh ta hai

// get single profile

app.get('/profile/:id', async (req,res)=>{
    const newId = req.params.id;
    // Find profile by ID
    const profile = await Profile.findOne({ id: newId })
    // const profile = profiles.find((profile)=>{
    //     return profile.id == id
    // })
    res.send(profile??'Not Found');
}) 

// create new profile
app.post('/profileCreate/', async (req,res)=>{
    const profile = req.body;
    // Create a new profile and save it to MongoDB
    const newProfile = new Profile(profile);// create a new profile document 
    await newProfile.save()// save the profile to mongodb
    const profiles = await Profile.find(); // Fetch all profiles from the database
    // profiles.push(profile);
    res.status(201).json(profiles); // res.status(201) 201 create ke liye hai...
})

// update the old profile  
app.put('/profileUpdate/', async (req,res) => {
    const profile = req.body;
    const result = await Profile.updateOne(
        { id: profile.id },
        { $set: profile }
    );
    if (result.matchedCount === 0 )
        res.status(404).json('Not Found...');
    const profiles = await Profile.find();
    res.status(200).json(profiles);
    // const profileIndex = profiles.findIndex((item)=>{
    //     return item.id == newProfile.id
    // })
    // if(profileIndex == -1) {
    //     res.status(404).json('Not Found...');
    // }
    // // profiles of profileIndex niche wale ka fullform ye [] bracket ka matlab of hai 
    // profiles[profileIndex] = newProfile;
})

// ! isey not sign kehte hai

// delete the old profile delete
app.delete('/profileDelete/:id', async (req,res) => {
    const id = req.params.id;
    const profile = await Profile.findOneAndDelete({ id: id }); // Find and delete profile by id
    // const profileIndex = profiles.findIndex((item)=>{
    //     return item.id == id
    // })
    if(!profile) {
        res.status(404).json('Not Found...');
    }
    const profiles = await Profile.find(); // Fetch all profiles from the database 
    // profiles.splice(profileIndex, 1)
    res.status(200).json(profiles);
})

app.listen('8000',()=>{
    console.log('Server is running on port 8000...')
})

//http methods

// 1. get => to get data

// 2. post => to save/create values

// 3. put/patch => to update data 

// 4. delete => to delete data

// overleaf.com//latex/templates 