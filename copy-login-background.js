// Copy login_background.png from src/resources to public before build
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'src', 'resources', 'login_background.png');
const dest = path.join(__dirname, 'public', 'login_background.png');

fs.copyFileSync(src, dest);
console.log('Copied login_background.png to public folder.');
