const DB = require('../db')

const COLLECTION = 'comments'


// Get all comments
exports.all = (cb) => {
    db = DB.getDB()
    db.collection(COLLECTION).find().toArray(cb)
}


// Create new comment and return its id.
exports.create = (user, text, cb) => {
    db.DB.getDB()
    db.collection(COLLECTION)
        .insert({ user: user, text: text }, (err, docs) => {
            if (err) {
                return cb(err)
            }
            cb(null, docs[0]._id)
        })
}


// Remove a comment.
exports.remove = (id, cb) => {
    db = DB.getDB()
    db.collection(COLLECTION)
        .remove({ _id: id }, (err, result) => {
            cb(err)
        })
}
