const Blog = require("../models/blog.model")

class BlogController {
   //create Blog 
   createBlog= async (req,res) =>{
     const blog =  Blog(req.body)
      blog.save()
     .then ((savedBlog) => res.status(200).json(savedBlog))
     .catch((err)=> res.status(500).json(err))
   }
   
  //UpdateBlog
  updateBlog= async (req,res) => {
    const blog = await Blog.findById({_id: req.params.id})
     if (blog.username === req.body.username){

          await Blog.findByIdAndUpdate({_id:req.params.id},req.body , {new:true})

         .then((updatedBlog)=> res.status(200).json(updatedBlog))
         .catch((err) => res.status(500).json(err))
     }
     
    else {
        res.status(401).json('Sorry you can update only your blog ')
     }

  }


   //Delete Blog
  deleteBlog = async(req,res) =>{
    if (Blog.username === req.body){

      await Blog.deleteOne({_id: req.params.id})
     .then((deleteConfirmation) => res.status(200).json(deleteConfirmation))
     .catch((err) => res.status(500).json(err))
    }
    else {
        res.status(401).json('Sorry you can delete only your blog ')
    }
}

   //GetAllBlog
  getAllBlog= async (req,res) =>{
      username = req.query.username 
      cat = req.query.cat
      title = req.query.title
        .then( async () => { 
            let blogs
             if (username){
                 blogs = await Blog.find({username})
             }
             else if (categorie){
                 blogs = await Blog.find({categorie: $in [cat]})
             }
             else if (title){
                 blogs = await Blog.find({title})
             }
             else {
                 blogs = await Blog.find()
             }
             res.status(200).json(blogs)
        })
        .catch((err) => { 
            res.status(500).json(err)
        })  

  }
  
}  module.exports = new BlogController();