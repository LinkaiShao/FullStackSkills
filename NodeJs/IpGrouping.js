const https = require('https');
const readline = require('readline');
const subnetCalculator = require('ip-subnet-calculator');
const fs = require('fs');
const csvWriter = require('csv-writer').createObjectCsvWriter;

// Function to check if an IP falls within the given range
function inIPRange(ip, startIP, endIP) {
    const cidrData = subnetCalculator.calculateCIDRPrefix(`${startIP}/${subnetCalculator.calculateSubnetMask(startIP, endIP)}`);
    if (cidrData) {
        const { start, end } = cidrData;
        return subnetCalculator.isIpInSubnet(ip, start, end);
    }
    return false;
}

// Read the first file containing IP ranges
const ipRanges = [];
const ipRangesFilePath = "C:\\Users\\linka\\OneDrive\\Desktop\\Code\\NodeJSProjs\\CN-suip.biz.txt";
const rlRanges = readline.createInterface({
    input: fs.createReadStream(ipRangesFilePath),
    crlfDelay: Infinity
});
rlRanges.on('line', (line) => {
    const [startIP, endIP] = line.split('-');
    ipRanges.push({ start: startIP.trim(), end: endIP.trim() });
});

// Create an object to store grouped IPs
const groupedIPs = {};
let ipCounter = 0; // keep count
const encounteredIPs = {}; // Store encountered IPs

// Function to process IPs
function processIPs(rlIPs) {
    let currentIndex = 0; // Track the index of the current IP being processed
    rlIPs.on('line', (line) => {
        // Process IPs only if currentIndex is less than ipCounter
        if (currentIndex >= ipCounter) {
            const [timestamp, ip] = line.split(' ');
            // Check if the IP is already encountered
            if (encounteredIPs[ip]) {
                // Process the IP accordingly
                console.log(`Duplicate IP encountered: ${ip}`);
                ipCounter++;
                console.log(`Processed ${ipCounter} IPs`);
                // You can handle duplicate IPs here
            } else {
                // Mark the IP as encountered
                encounteredIPs[ip] = true;
                for (const range of ipRanges) {
                    if (inIPRange(ip, range.start, range.end)) {
                        const groupName = `${range.start}-${range.end}`;
                        if (!groupedIPs[groupName]) {
                            groupedIPs[groupName] = [];
                        }
                        groupedIPs[groupName].push({ ip, timestamp });
                        break;
                    }
                }
                ipCounter++;
                console.log(`Processed ${ipCounter} IPs`);
            }
        }
        currentIndex++; // Increment currentIndex for each IP
    });

    rlIPs.on('error', (error) => {
        console.error('An error occurred while reading input:', error);
        console.log('Retrying...'); // Log that we're retrying the operation
        // Retry the operation by calling processIPs() again
        fetchData();
    });

    rlIPs.on('close', () => {
        console.log('done, writing');
        // Write grouped IPs to a CSV file
        const csvWriterInstance = csvWriter({
            path: 'grouped_ips.csv',
            header: [
                { id: 'group', title: 'Group' },
                { id: 'ips', title: 'IPs' }
            ]
        });

        const records = Object.keys(groupedIPs).map(groupName => ({
            group: groupName,
            ips: groupedIPs[groupName].map(({ ip, timestamp }) => `${ip} (${timestamp})`).join(', ')
        }));

        csvWriterInstance.writeRecords(records)
            .then(() => console.log('CSV file has been written successfully'));
    });
}

// Function to fetch data
function fetchData() {
    const url = 'https://files.idigest.app/ip.txt';
    const options = {
        timeout: 10000 // Set timeout to 10 seconds
    };

    const req = https.get(url, options, (res) => {
        const rlIPs = readline.createInterface({
            input: res,
            crlfDelay: Infinity
        });
        // Process IPs
        processIPs(rlIPs);
    });
    // listener
    req.on('error', (error) => {
        if (error.code === 'ECONNRESET') {
            console.error('Connection reset by peer');
            // Fetch data again from the last processed IP
            fetchData();
        } else {
            console.error('Error:', error);
            // If another error occurs, fetch data again from the last processed IP
            fetchData();
        }
    });
}

// Start fetching data
fetchData();
