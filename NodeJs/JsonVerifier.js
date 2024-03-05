const fs = require('fs');

function isValidJSON(file) {
    try {
        JSON.parse(fs.readFileSync(file));
        return true;
    } catch (error) {
        return false;
    }
}

const filename = "C:\\Users\\linka\\OneDrive\\Desktop\\Code\\NodeJSProjs\\JsonTest.json";

if (isValidJSON(filename)) {
    console.log(`${filename} is a valid JSON file.`);
} else {
    console.log(`${filename} is not a valid JSON file.`);
}
