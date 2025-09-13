const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS for all origins (needed for Roam to load the CSS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Serve the CSS file with correct MIME type
app.get('/theme.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'dist', 'theme.css'));
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Roam theme development server running',
    cssUrl: `http://localhost:${PORT}/theme.css`
  });
});

app.listen(PORT, () => {
  console.log(`🎨 Roam theme server running at http://localhost:${PORT}`);
  console.log(`📎 CSS URL: http://localhost:${PORT}/theme.css`);
  console.log('💡 Add this URL to your Roam custom CSS setting');
});