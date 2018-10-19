
const Post = require("../models/post")
const mongoose = require ("mongoose")




//--------------------- get all post ---------------------------------//
  exports.posts_get=(req,res)=>{
    console.log('req.query',req.query['sort'])
    Post.find({}).sort('id').then(post=>{
        res.status(200).json(
            post
        )
    }).catch(err=>res.status(401).json({err}))
}


//----------------------- create post ----------------------------------//
  exports.posts_post=(req, res, next) => {
    //console.log(req.file)
    const post = new Post({
        
      title: req.body.title,
      body: req.body.body,
      userId:req.body.userId
    });
    post
      .save()
      .then(rsl => {
        res.status(201).json({
          message: "post added successfully",
          createdPost: rsl
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          err: err
        });
      });
  }



  // -----------------------------get single post-------------------------//
  exports.posts_getById=(req, res, next) => {
    const id = req.params.id;
    console.log('id',id)
    Post.find({id:id})
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json(doc[0]);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }



  //-----------------------------delete many post-----------------------------//
  exports.posts_delete=(req, res, next) => {
    // const id = req.params.id;
    const id = req.query['filter'];
    console.log('ids',id)
    const ids=JSON.parse(id)
    console.log('ids arry',ids)
    Post.deleteMany({ id: {$in:ids} })
      .exec()
      .then(result => {
        res.status(200).json(
          {
            id:ids

          }
        );
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }


//----------------------------delete single post ------------------------------//

exports.posts_deleteOne=(req, res, next) => {
  const id = req.params.id;
  Post.deleteMany({ id:id })
    .exec()
    .then(result => {
      res.status(200).json(
        {
          id:id

        }
      );
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

//-----------------------------update post-------------------------------------//
  exports.posts_update=(req, res, next) => {
    const id = req.params.id;
 
    Post.update({ id: id }, { $set: {title:req.body.title,body:req.body.body,userId:req.body.userId} })
      .exec()
      .then(result => {
        res.status(200).json({
          id:id,
          title:req.body.title
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  



  

