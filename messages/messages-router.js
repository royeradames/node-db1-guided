const express = require("express")
const db = require("../data/config")

const router = express.Router()

// done
router.get("/", (req, res, next) => {
    // respond with a list of posts from the databse
    // select * from posts;
    //db('posts') //alternative code, no need for the select or from
    db.select('*').from('messages').then(messages => {
        res.status(200).json({ data: messages })
    }).catch(error => {
        console.log(error)

        res.status(500).json({ error: error.message })
    })
})

// done
router.get("/:id", (req, res, next) => {
    console.log(req.params.id)
    db.select('*').from('messages').where(`id`, req.params.id).then(message => {
        res.status(200).json({ data: message })
    }).catch(error => {
        console.log(error)
        res.status(500).json({ error: error.message })
    })
})

// done
router.post("/", (req, res, next) => {
    const post = req.body

    db('messages')
        .insert(post)
        .returning('id') //do not exlude this line if you plan to support PostgreSQL
        .then(ids => {
            // the warning: ".returning() is not supported by sqlite3 and will not have any effect."
            // can safely be ignored when using SQLite
            // it will go away when using PosgreSQL
            res.status(201).json({ inserted: ids })
        }).catch(error => {
            console.log(error)

            res.status(500).json({ error: error.message })
        })
})

// done
router.put("/:id", (req, res, next) => {
    const changes = req.body
    const messageId = req.params.id

    // where id = id
    db('messages')
        .where({ id: messageId })
        // .where( "id", "=" "messageId") //another way to write the where
        .update(changes)
        .then(count => {
            if (count) {
                res.status(200).json({ message: 'updated succesfully' })
            } else {
                res.status(404).json({ message: 'not found' })
            }
        })
        .catch(error => {
            console.log(error)

            res.status(500).json({ error: error.message })
        })
})

// done
router.delete("/:id", (req, res, next) => {
    const messageId = req.params.id

    // where id = id
    db('messages')
        .where({ id: messageId })
        // .where( "id", "=" "messageId") //another way to write the where
        .del() //delete instead of update
        .then(count => {
            if (count) {
                res.status(200).json({ message: 'remove succesfully' })
            } else {
                res.status(404).json({ message: 'not found' })
            }
        })
        .catch(error => {
            console.log(error)

            res.status(500).json({ error: error.message })
        })
})

module.exports = router