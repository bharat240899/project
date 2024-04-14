const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const applicationSchema = new mongoose.Schema({
    fname: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
    },
    laname: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
    },
    znumber: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    resume: {
        data: Buffer,
        contentType: String,
    },
    experience: {
        required: true,
        type: Boolean,
    },
    relevant_courses: {
        type: String,
        required: function () {
            return this.experience === true; // Required only if experience is true
        },
    },
    from: {
        type: Date,
        required: function () {
            return this.experience === true; // Required only if experience is true
        },
    },
    to: {
        type: Date,
        required: function () {
            return this.experience === true; // Required only if experience is true
        },
    },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
