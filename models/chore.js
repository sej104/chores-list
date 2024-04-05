const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const choreSchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    assignTo: {type: Schema.Types.ObjectId, ref: 'User', required: false},
    priority: {type: String,
        required: [true, 'category is required'],
        enum: ['None', 'Low', 'Medium', 'High']},
    date: {type: Date, required: [true, 'date is required']},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
    completed: { type: Boolean, default: false }}
    );

module.exports = mongoose.model('Chore', choreSchema);