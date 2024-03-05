const fs = require('fs');
const path = require('path');
const chineseConv = require('chinese-conv');

function convertFilesInDirectory(directoryPath, conversionFunction) {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        // have all the files
        files.forEach(file => {
            // concat path
            const filePath = path.join(directoryPath, file);
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return;
                }
                // write back
                const convertedData = conversionFunction(data);
                fs.writeFile(filePath, convertedData, err => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    console.log(`Converted ${filePath}`);
                });
            });
        });
    });
}

const sourceDirectory = "C:\\Users\\linka\\OneDrive\\Desktop\\Code\\NodeJSProjs\\ChineseTest";

// Convert Simplified Chinese to Traditional Chinese
// sify is simple to trad
// tify is trad to simple
convertFilesInDirectory(sourceDirectory, chineseConv.sify);

// Convert Traditional Chinese to Simplified Chinese
// convertFilesInDirectory(sourceDirectory, chineseConv.tify);
