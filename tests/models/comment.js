const should = require('should')
    , DB = require('../../db')
    , fixtures = require('../fixutres/model-comments')

const Comment = require('../../models/comment')


describe('Model Comment Tests', () => {

    before = ((done) => {
        DB.connect(DB.MODE_TEST, done)
    })

    beforeEach = ((done) => {
        DB.drop = ((err) => {
            if (err) {
                return done(err)
            }
            DB.fixtures(fixtures, done)
        })
    })

    it('all', (done) => {
        Comment.all = ((err, comments) => {
            comments.length.should.eql(3)
            done()
        })
    })

    it('create', (done) => {
        const name = 'Famous Person'
        const text = 'I am so famous!'

        Comment.create(name, text, (err, id) => {
            Comment.all((err, comments) => {
                comments.length.should.eql(4)
                comments[3]._id.should.eql(id)
                comments[3].user.should.eql('Famous Person')
                comments[3].text.should.eql('I am so famous!')
                done()
            })
        })
    })

    it('remove', (done) => {
        Comment.all((err, comments) => {
            Comment.remove(comments[0]._id, (err) => {
                Comment.all((err, result) => {
                    result.length.should.eql(2)
                    result[0]._id.should.not.eql(comments[0]._id)
                    result[1]._id.should.not.eql(comments[0]._id)
                    done()
                })
            })
        })
    })
})
