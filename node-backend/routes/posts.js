const express = require('express');
const router = express.Router();

const Post = require("../models/posts");


router.post('/new', (req, res, next) => {
    let title = req.body.title;
    let description = req.body.description;
    console.log(req);
    let new_post = new Post({
        title: title,
        description: description
    })

    new_post.save(function (error) {
        if (error) {
        console.log(error)
        }
        res.send({
        success: true,
        message: 'Post saved successfully!'
        })
    })
});

router.get('/', (req, res) => {
    Post.find({}, 'title description', function (error, posts) {
      if (error) { console.error(error); }
      res.send({
        posts: posts
      })
    }).sort({_id:-1})
});

router.put('/:id', (req, res) => {
    var db = req.db;
    Post.findById(req.params.id, 'title description', function (error, post) {
      if (error) { console.error(error); }
  
      post.title = req.body.title
      post.description = req.body.description
      post.save(function (error) {
        if (error) {
          console.log(error)
        }
        res.send({
          success: true
        })
      })
    })
})

  // Fetch single post
router.get('/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'title description', function (error, post) {
    if (error) { console.error(error); }
    res.send(post)
  })
})

module.exports = router;

