const express = require('express')
const Task = require('../models/task.js')
const auth = require('../middleware/auth.js')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user.id
        })

        await task.save()

        // const task = await Task(req.body)

        res.status(201).send(task)

    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', auth, async (req, res) => {
    try {
        // const tasks = await Task.find({})
        const tasks = await Task.find({ owner: req.user.id })
        
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {    
    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user.id })

        if (!task) {
            return res.status(404).send()
        }

        res.status(302).send(task)

    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description', 'completeStatus']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user.id })

        updates.forEach(update => task[update] = req.body[update])
        
        await task.save()

        if (!task) {
            return res.status(404).send()
        } 
        res.send(task)
        
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {

    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id })

        if (!task) {
            return res.status(404).send()    
        }
        
        res.send(`The following task has been deleted: \n${task}`)

    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router