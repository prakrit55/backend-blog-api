const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
import Post, { IPost } from './models/models';

// const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json()); // Parse JSON request bodies

// Routes
// app.use('/api/posts', postRoutes);
// Connect to MongoDB
var uri = process.env;

mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err: Error) => console.error("Could not connect to MongoDB...", err));

  app.get('/api/posts', async (req: any, res: any) => {
    try {
      const posts: IPost[] = await Post.find();
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  app.get('/api/posts/:id', async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const updatedPost: IPost | null = await Post.findById(id);
  
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // Create a new post
  app.post('/api/posts', async (req: any, res: any) => {
    try {
      const { title, content, author }: { title: string; content: string; author: string } = req.body;
      const post: IPost = new Post({ title, content, author });
      await post.save();
      res.status(201).json(post); // Return newly created post
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // Update a post
  app.put('/api/posts/:id', async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const { title, content, author }: { title: string; content: string; author: string } = req.body;
      const updatedPost: IPost | null = await Post.findByIdAndUpdate(id, { title, content, author }, { new: true });
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // Delete a post
  app.delete('/api/posts/:id', async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const deletedPost: IPost | null = await Post.findByIdAndDelete(id);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle server errors
server.on('error', (error: Error) => {
    console.error('Server error:', error);
    // Handle error more robustly (e.g., exit process, retry logic)
});

export default app; // Export the Express app


