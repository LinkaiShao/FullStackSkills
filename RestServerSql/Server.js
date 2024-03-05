const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// Endpoint to get server time
app.get('/getServerTime', (req, res) => {
    const serverTime = new Date();
    res.send(serverTime.toString());
});
// Send a file from server
const path = require('path');

// Endpoint to serve a local file
app.get('/getFile', (req, res) => {
    // Path to the local file
    const filePath = path.join(__dirname, 'testSend.txt');

    // Send the file
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(err.status).end();
        } else {
            console.log('File sent successfully');
        }
    });
});
app.use(fileUpload());
// file upload
// Endpoint to handle file upload
app.post('/upload', (req, res) => {
    if (!req.files ) {
        return res.status(400).send('No files were uploaded.');
    }
    if(Object.keys(req.files).length === 0){
        return res.status(400).send('req files length is 0');
    }

    // retrieve
    const uploadedFile = req.files.file;

    // move to a directory
    uploadedFile.mv('uploads/' + uploadedFile.name, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.send('File uploaded successfully.');
    });
});
// Start the server
const port = 3000; 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
