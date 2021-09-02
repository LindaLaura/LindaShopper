const express = require('express');
const path = require('path');
//const volleyball = require('volleyball');

const app = express();

// Logging middleware
//app.use(volleyball)

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))
// app.use(express.static(path.join(__dirname, '..', 'node_modules', 'font-awesome', 'css')))
// app.use('/fonts', express.static(path.join(__dirname, '..', 'node_modules', 'font-awesome', 'fonts')))


// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./api'))
//app.use('/api/categories', require('./api/categoryRoute'));


// This middleware will catch any URLs resembling a file extension
// for example: .js, .html, .css
// This allows for proper 404s instead of the wildcard '#<{(|' catching
// URLs that bypass express.static because the given file does not exist.
// app.use((req, res, next) => {
//   if (path.extname(req.path).length > 0) {
//     res.status(404).end()
//   } else {
//     next()
//   }
// })

// Sends our index.html (the "single page" of our SPA)
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

// Error catching endware
app.use((err, req, res, next) => {
    console.error(err, err.stack);
    res.status(500).send(err);
});

module.exports = app;