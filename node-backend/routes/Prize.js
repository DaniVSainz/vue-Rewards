const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/database');
const Prize = require("../models/Prize");

//Old method when beginning developement
router.post('/new', (req, res, next) => {
    let name = req.body.name;
    let description = req.body.description;
    let quantity = req.body.quantity;
    let image_url = req.body.image_url;

    let new_post = new Prize({
        name,
        description,
        quantity,
        image_url
    });
    console.log(new_post);

    new_post.save(function (error) {
        if (error) {
        console.log(error)
        }
        res.send({
        success: true,
        message: 'Prize saved successfully!'
        })
    })
});


//Get all Prizes
router.get('/', (req, res) => {
    Prize.find({}, function (error, prizes) {
      if (error) { console.error(error); }
      res.send({
        prizes
      })
    })
    // .sort({_id:-1})
});

//Try claiming a prize
// router.put('/claimprize/:id', async (req, res,next) => {
//   try{
//     let prize = await Prize.findOne({_id: req.params.id});
//     if(prize.quantity > 0 ){
//       prize.quantity = prize.quantity -1 ;
//       await prize.save((err)=>{
//         if(err){
//           return res.status(500).send({claimPrizeRes: 'Ran into Error,Sorry :(', msg:err});
//         }else{
//           return res.status(200).send({claimPrizeRes: 'Congratulations', msg:`You redeemed ${prize.name}.`});
//         }
//       });
//     }else if(prize.quantity == 0){
//       return res.status(200).send({claimPrizeRes: 'Out of Stock', msg:`Sorry try another prize, ${prize.name} is out of stock.`});
//     }
//   }catch(err){
//     res.status(500).send({claimPrizes:`Ran into error`,msg:err});
//     next(err);
//   }
// });

router.put('/claimprize/:id', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
  try{
    let tempUser = req.user;
    let user = {
      name: tempUser.name,
      email: tempUser.email,
      username: tempUser.username,
      isVerified: tempUser.isVerified
    }
    res.status(200).send({user, msg:'Success'});
  }catch (err){
    res.status(500).send({claimPrizes:`Ran into error`,msg:err});
    next(err);
  }
});




//Method to clear db / seed data
router.get('/seeddata', async(req,res,next)=>{
  try{
    await Prize.collection.drop();
    let urls = [
      'https://i.imgur.com/Y7H4c44.png',
      'https://i.imgur.com/DoC4xCh.png',
      'https://i.imgur.com/ovRHwJf.png',
      'https://i.imgur.com/vjLMii9.png',
      'https://i.imgur.com/mgCAhJL.png',
      'https://i.imgur.com/SM8tTO7.png'
    ]
    let names = ['Vinyl Player','iPhone 8',`Microphone`,`Ferrari Ride`,`Blue Microphone`,`PlayStation 4`]
    let descriptions = [
      `AT-LP60-USB by Audio-Technica (Factory New) brings its legendary quality and audio fidelity to the digital realm with this LP-to-digital
      recording system. The AT-LP60-USB stereo turntable comes equipped with a USB output that allows direct connection to your computer. The system
      also offers: Mac- and PC-compatible Audacity software; an integral dual-magnet Audio-Technica phono cartridge; and a USB cable and adapter
      cables. `,
      `iPhone 8 introduces an all‑new glass design. The world’s most popular camera, now even better. The most powerful and smartest chip ever in
      a smartphone. Wireless charging that’s truly effortless. And augmented reality experiences never before possible. iPhone 8. A new generation
      of iPhone.`,
      `You'll love Shure's 55SH Series UNIDYNE II if you long for the days when mics carried a little weight and substance, and dig the look and feel
      of the classic mics of the '50s and '60s. This cardioid dynamic vocal mic updates Shure's UNIDYNE series with classic looks and thoroughly modern
      performance characteristics. Vocals sound incredible through this mic! Features of the 55SH UNIDYNE II include low impedance, a frequency
      response of 50Hz to 15kHz, and an on/off switch. Make a statement with your Shure 55SH UNIDYNE II mic today!`,
      `The Ferrari 458 Italia is the poster child for seductive Italian supercars. First introduced in 2009 as the successor to the F430, the Italia
      is more aggressive and precise in every way. With its roots stemming from Formula 1 technology the Italia’s 4.5-liter V8 produces 563 horsepower
      and never misses a beat thanks to a flawless 7-speed dual-clutch transmission. Its sound alone will excite you and raise the hair on the back
      of your neck.`,
      `The Blue Bluebird SL large-diaphragm cardioid condenser microphone captures every nuance of your sound. With high-frequency clarity, smooth
      mid frequencies, and rich lows, your tracks will sound better than ever. Record electric guitars with presence and acoustic guitars with
      incredible detail. Throw up a pair and capture the full power of a drum kit. The Bluebird SL offers excellent off-axis rejection, thanks to
      its unusually tight cardioid polar pattern. A highpass filter minimizes mud and rumble, while a -20dB pad effectively handles loud sources.
      An excellent workhorse mic for any studio, the Blue Bluebird SL large-diaphragm cardioid condenser microphone delivers accurate presence
      and transparency for any voice or instrument.`,
      `PS4 Pro gets you closer to your game. Heighten your experiences. Enrich your adventures. Let the super-charged PS4 Pro lead the way.`


    
    ]
    let quantities =[6,10,3,35,2,55];
    let newPrize;
  
    for(let i =0; i<urls.length;i++){
      newPrize = new Prize({
        name: names[i],
        description: descriptions[i],
        image_url: urls[i],
        quantity: quantities[i]
      });
      
      await newPrize.save();
    }

    res.send({msg:'Success'});
  }catch(err){
    console.log(err);
    next(err);
  }

})

// Fetch single prize
router.get('/:id', (req, res) => {
  Prize.findById(req.params.id, '', function (error, post) {
    if (error) { console.error(error); }
    res.send(post)
  })
})

//Delete a prize
router.delete('/:id', (req, res) => {
  Prize.remove({
    _id: req.params.id
  }, function(err, post){
    if (err)
      res.send(err)
    res.send({
      success: true,
      msg:'Deleted Prize'
    })
  })
})

module.exports = router;

