const express = require('express');
const router = express.Router();

const Prize = require("../models/Prize");


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

router.get('/', (req, res) => {
    Prize.find({}, function (error, prizes) {
      if (error) { console.error(error); }
      console.log(prizes);
      res.send({
        prizes
      })
    }).sort({_id:-1})
});

router.put('/:id', (req, res) => {
    var db = req.db;
    Prize.findById(req.params.id, 'name description', function (error, post) {
      if (error) { console.error(error); }
  
      post.name = req.body.name
      post.description = req.body.description
      post.save(function (error) {
        if (error) {
          console.log(error)
        }
        res.send({
          success: true,
        })
      })
    })
})

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
    let name = 'Win a Flyaway';
    let description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum turpis risus, sed elementum lacus laoreet nec.
     Nulla pulvinar turpis vitae accumsan ultrices. Donec rutrum porta dui, sit amet pharetra quam tristique eget. Aliquam dolor justo, condimentum
      a nibh nec, porta ultricies augue. Sed convallis venenatis vestibulum`
    let quantity =5;
    let newPrize;
  
    for(let i =0; i<urls.length;i++){
      newPrize = new Prize({
        name,
        description,
        image_url: urls[i].image_url,
        quantity
      });
      
      await newPrize.save();
    }

    res.send({msg:'Success'});
  }catch(err){
    console.log(err);
    next(err);
  }

})

  // Fetch single post
router.get('/:id', (req, res) => {
  var db = req.db;
  Prize.findById(req.params.id, 'name description', function (error, post) {
    if (error) { console.error(error); }
    res.send(post)
  })
})

router.delete('/:id', (req, res) => {
  var db = req.db;
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

