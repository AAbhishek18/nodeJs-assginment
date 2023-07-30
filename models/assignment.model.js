const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      question_text: {
        type: String,
        required: true,
      },
      options: {
        type: [String], // Array of options for MCQ
      },
      correct_answers: {
        type: [String], // Array of correct answers for MCQ
      },
    },
  ],
 assignment_created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
 }

},{timestamps:true});

module.exports = mongoose.model('Assignment', assignmentSchema);

