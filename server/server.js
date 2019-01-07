const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(3000, () => {
	console.log('Server is UP');
});

// console.log(publicPath);
