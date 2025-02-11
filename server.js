import bodyParser from "body-parser";
import express from "express";
import expressLayouts from "express-ejs-layouts";

const app = express();
const port = 3000;

// Store posts in an array


app.set("view engine", "ejs");
app.use(expressLayouts); // Use express-ejs-layouts middleware
app.set("layout", "layout"); // Set the default layout

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let posts = [];
// Home Route - Show all posts
app.get("/", (req, res) => {
  res.render("index", { posts: posts }); 
});

// Add a new post
app.post("/add-post", (req, res) => {
  let newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };

  if (!newPost.title || !newPost.content) {
    return res.send("Error: Title and Content are required.");
  }

  posts.push(newPost);
  res.redirect("/"); // Redirect back to home page to see the new post
});

// Edit post page
app.get("/edit/:id", (req, res) => {
  let post = posts.find(p => p.id == req.params.id);
  if (!post) return res.send("Post not found");
  res.render("edit", { post });
});

// Update post
app.post("/update/:id", (req, res) => {
  let post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
  }
  res.redirect("/");
});

// Delete post
app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id); // Remove the post
  res.redirect("/");
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
