const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(cookieParser());
app.use(
    session({
          secret: 'your-secret-key', // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set 'secure: true' for production with HTTPS
    genid: () => uuidv4(), // Generate unique session IDs
  })
);

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Authenticate user (replace with your own authentication logic)
  if (username === 'admin' && password === 'admin123') {
    // Create a session token (replace with your own token generation logic)
    const sessionToken = uuidv4();

    // Set the session token in the session
    req.session.sessionToken = sessionToken;

    // Send the session token back to the client
    res.json({ sessionToken });
  } else {
    // Unauthorized
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  // Destroy the session
  req.session.destroy();

  res.sendStatus(200);
});

// Other routes and server logic...

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
