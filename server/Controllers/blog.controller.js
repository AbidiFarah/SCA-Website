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
    const blog= await Blog.findById({_id:req.params.id})

    if ( blog.username === req.body.username){
      await Blog.updateOne({_id: req.params.id} , { $set: req.body }, {new:true})
      .then((updatedblog) => res.status(200).json({msg: "Success !",updatedblog}))
      .catch((err) => res.status(500).json(err))
    }

    else {
      res.status(401).json('Sorry you can update only your Blog ')
   }

  }


   //Delete Blog
  deleteBlog = async(req,res) =>{
    await Blog.findByIdAndDelete({_id: req.params.id})
    .then((deleteConfirmation) => res.status(200).json({msg: "Is Deleted !", deleteConfirmation}))
    .catch((err) => res.status(500).json(err))

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
