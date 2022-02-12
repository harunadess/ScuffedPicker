const express = require('express');
const { join } = require('path');
const config = require('./config.json');

// set up express
const app = express();

app.use(express.static(join(__dirname, 'build')));
app.get('/', (_, res) => {
    res.sendFile(join(__dirname, 'build', 'index.html'));
});


// set up server
console.log(`${new Date()} serving content to:`);
try {
    app.listen(config.port, () => {
      console.log(`-> ${config.hostname}`);
      console.log(`-> localhost:${config.port}`);
    });
} catch(e) {
    console.error('server crash:', e);
    process.exit(1);
}