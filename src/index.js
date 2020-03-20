const express = require('express')
const cors = require('cors')
require('./db/mongoose.js')
const userRouter = require('./router/user.js')
const taskRouter = require('./router/task.js')

// const {} = require('dotenv').config({path:'relative/path/to/your/.env'})


const app = express()
const port = process.env.PORT || 5000

// env-cmd ./config/dev.env

// app.use((req, res, next) => {
//     // console.log(req.method, req.path);

//     if (req.method === 'GET') {
//         res.send('Get requests are disabled')
//     } else {
//         next()
//     }    
// })

// app.use((req, res, next) => {
//     if (req.method) {
//         res.status(503).send('Service unavaible due to maintance!')
//     }
// })
                    
app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})

// const Task = require('./models/task.js')
// const User = require('./models/user.js')


// const main = async () => {
//     // const task = await Task.findById('5e25ae50f82f6e1ad821a03c')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner);

//     const user = await User.findById('5e2587076a911b1b708e5378')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks);
    
// }

// main()

// const bcrypt = require('bcryptjs')

// const myFunction = async() => {
//     const password = 'red12345'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     // console.log(password);
//     // console.log(hashedPassword);    
    
//     const isMatch = await bcrypt.compare(password, hashedPassword)

//     console.log(isMatch);    
// }

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
//     console.log(token);

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data);
    
// }

// myFunction()