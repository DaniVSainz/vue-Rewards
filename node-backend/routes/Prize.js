const express = require('express');
const router = express.Router();

const Prize = require("../models/Prize");


router.post('/new', (req, res, next) => {
    let name = req.body.name;
    let description = req.body.description;
    console.log(req);
    let new_post = new Prize({
        name: name,
        description: description
    })

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
    Prize.find({}, function (error, posts) {
      if (error) { console.error(error); }
      console.log(posts);
      res.send({
        posts: posts
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

