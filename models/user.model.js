const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ['student', 'faculty'],
    required: true,
  },
  marks: {
    type: Number,
    default: 0,
  },
  assignmentsAttended: [
    {
      title:{
        type:String,
        required:false
      },
      assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
      },
      selectedAnswers: [String], // Array of selected answers for MCQs
      marksObtained: Number,
    },
  ],
});

module.exports = mongoose.model('User', userSchema);


