const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const port = 3000;

// Set up storage for multer
const storage = multer.diskStorage({
    destination: 'stored/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle image upload
app.post('/upload', upload.single('imageInput'), (req, res) => {
    res.send('Image uploaded successfully! <a href="/index.html">Back to Home</a>');
});

// Handle request for fetching stored images
app.get('/getStoredImages', async (req, res) => {
    try {
        const files = await fs.readdir(path.join(__dirname, 'stored'));
        res.json(files);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
