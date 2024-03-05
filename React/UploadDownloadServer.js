const express = require('express');
const multer = require('multer'); // Middleware for handling multipart/form-data (file uploads)
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer to save uploaded files to the 'uploads' directory
const upload = multer({ dest: 'uploads/' });

// Route for handling file upload
app.post('/upload', upload.single('file'), (req, res) => {
  // Retrieve the uploaded file from the request object
  const uploadedFile = req.file;

  // Check if file exists
  if (!uploadedFile) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // File uploaded successfully
  res.status(200).json({ message: 'File uploaded successfully', file: uploadedFile });
});

// Route for handling file download
app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', 'example.txt');

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  // Stream the file to the response
  const fileStream = fs.createReadStream(filePath);
  res.setHeader('Content-Disposition', 'attachment; filename=example.txt');
  fileStream.pipe(res);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
