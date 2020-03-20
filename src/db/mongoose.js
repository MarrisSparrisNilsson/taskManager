const mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true, 
//     useCreateIndex: true,
//     useFindAndModify: false
// })

// process.env.MONGODB_URL

// OLD DATABASE URL
// 'mongodb+srv://martin:martin()@cluster0-ybm7x.mongodb.net/test?retryWrites=true&w=majority'

// NEW DATABASE URL
// 'mongodb+srv://Sparris20:NilmartiT4@cluster0-rdupx.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect('mongodb+srv://Sparris20:NilmartiT4@cluster0-rdupx.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})

// ------------------- Starta connection med databasen ------------------
// /Users/marti/mongodb/bin/mongod.exe --dbpath=/Users/marti/mongodb-data

// 'mongodb+srv://martin:martin()@cluster0-ybm7x.mongodb.net/test?retryWrites=true&w=majority'