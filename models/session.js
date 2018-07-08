const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: -1
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Session', SessionSchema);
