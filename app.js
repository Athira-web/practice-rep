const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
let users = [
  { id: 1, name: 'John Doe', age: 25 },

  { id: 2, name: 'Jane Smith', age: 30 },
];

// Root route (GET /)
app.get('/', (req, res) => {
  res.send('Welcome to my Express server!');
});

// GET: Fetch all users
app.get('/users', (req, res) => {
  res.json(users);
});

// POST: Create a new user
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Get the user ID from the URL parameter
    const userIndex = users.findIndex(user => user.id === userId); // Find the user index
  
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' }); // Handle case where user does not exist
    }
  
    // Update user details
    const updatedUser = {
      id: userId,
      name: req.body.name, // Get the updated name from the request body
      age: req.body.age,   // Get the updated age from the request body
    };
  
    users[userIndex] = updatedUser; // Update the user in the users array
    res.json(updatedUser); // Respond with the updated user
  });
  app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
  
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    users.splice(userIndex, 1); // Remove the user from the array
    res.json({ message: 'User deleted successfully' });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
