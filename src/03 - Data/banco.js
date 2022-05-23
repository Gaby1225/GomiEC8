const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://flopuser:senhaflopada@gomiv3.k5ci8.mongodb.net/GomiV3?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

mongoose.connect('mongodb://localhost:27017/GomiV3Testation', { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function() {
//     console.log("Connected successfully");
// });

module.exports = mongoose;