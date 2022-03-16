const Blog = require("../models/blog.model")

class BlogController { 
   //CREATE BLOG
   createBlog= async (req,res) =>{
    const blog =  Blog(req.body)
     blog.save()
    .then ((savedBlog) => res.status(200).json(savedBlog))
    .catch((err)=> res.status(500).json(err))
  }
   
 //UPDATE BLOG
 updateBlog= async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (blog.username === req.body.username) {
        try {
          const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedBlog);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your blog!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  //DELETE BLOG
  deleteBlog= async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (blog.username === req.body.username) {
        try {
          await blog.delete();
          res.status(200).json("blog has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your blog!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  //GET BLOG
  getBlog= async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      res.status(200).json(blog);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  //GET ALL BLOGS
  getAllBlog = async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let blogs;
      if (username) {
        blogs = await Blog.find({ username });
      } else if (catName) {
        blogs = await Blog.find({
          categories: {
            $in: [catName],
          },
          
        });
      } else {
        blogs = await Blog.find();
      }
      res.status(200).json(blogs);
    } catch (err) {
      res.status(500).json(err);
    }
  };
}
  
  module.exports = new BlogController();

