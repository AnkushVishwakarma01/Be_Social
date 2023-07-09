const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDataSchema = Schema({
    username: {
        type: String,
        minLength: [12, 'To small for username'],
        maxLength: [18, 'To Big for username'],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_pic: {
        data: Buffer,
        contentType: String,
    },
    posts: [{
        name: {
            type: String,
            default: null
        },
        data: {
            type: Buffer,
            deafult: []
        }
    }],
    followers: {
        type: Array,
        default: []
    },
    follows: {
        type: Array,
        default: []
    },
    likes: {
        type: Array,
        default: []
    },
    getLikes : [{
        user: String,
        post: ObjectId
    }],
    comments: [{
        id: ObjectId,
        postId: ObjectId,
        comment: String
    }]
})

const userData = mongoose.model('user_data', userDataSchema);
module.exports = userData;