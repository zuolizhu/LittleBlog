const express = require('express');
const Post = require('../models/post');
const checkAuth = require("../middleware/authValidator");

const nodemailer = require('nodemailer');

const router = express.Router();



// nodemailer config
let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "apikey",
      pass: "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"
    }
  });

  let mailOptions = {
      from: 'zzhu9@albany.edu',
      to: 'slipper17@outlook.com',
      subject: 'New article has been uploaded!',
      text: 'Little blog has new update!'
  };

router.get("", (req, res, next) => {

    // Return all posts from DB
    Post.find().then(documents => {
        res.status(200).json({
            message: "Posts feteched successfully",
            posts: documents
        });
    });
});

router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'Post not found!'});
        }
    });
});






// Unlock for dev
router.post("", (req, res, next) => {
// router.post("", checkAuth, (req, res, next) => {
    // Construct a new Post object based on mongoose schema
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    // Save created post into cloud DB
    post.save().then(createdPost => {
        // Send update email to user
        transporter.sendMail(mailOptions, function(error, info){
            if(error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        // Send response information
        res.status(201).json({
            message: 'Post added successfully!',
            postId: createdPost._id
        });
    });
});


router.delete("/:id", checkAuth, (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Post deleted!'
        });
    });
    
});

// update
router.put("/:id", checkAuth, (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });

    Post.updateOne({_id: req.params.id}, post).then(result => {
        console.log(result);
        res.status(200).json({message: 'update successful!'});
    });
});



module.exports = router;