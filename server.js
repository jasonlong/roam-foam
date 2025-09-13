const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all routes (allows Roam to fetch the CSS)
app.use(cors());

// Serve static files from the dist directory
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// Serve the theme CSS with proper headers
app.get('/theme.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendFile(path.join(__dirname, 'dist', 'theme.css'));
});

app.listen(PORT, () => {
  console.log(`🎨 Roam theme server running at http://localhost:${PORT}`);
  console.log(`📄 Theme CSS available at: http://localhost:${PORT}/theme.css`);
  console.log('💡 Add this URL to Roam\'s CSS code block to use your theme');
});