const express = require('express');
const https = require('https');
const { join } = require('path');
const { readFileSync } = require('fs'); 
const paths = require('./config.json');

const auth = { cert: '', key: '' };

try {
    auth.cert = readFileSync(config.cert);
    auth.key = readFileSync(config.key);
} catch(e) {
    console.error('failed to read auth:', e);
    process.exit(1);
}


// set up express
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (_, res) => {
    res.sendFile(join(__dirname, 'build', 'index.html'));
});


// set up server
const server = https.createServer(auth, app);
console.log(`${new Date()} serving content to:`);
try {
    server.listen(config.port, () => {
        console.log(`-> ${config.hostname}`);
    });
} catch(e) {
    console.error('server crash:', e);
    process.exit(1);
}