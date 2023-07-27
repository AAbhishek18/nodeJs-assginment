const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question_text: { type: String, required: false },
  options: [{ type: String, required: false }],
  correct_answers: [{ type: Number, required: true, min: 0, max: 3 }], // Assuming 4 options (0 to 3)
});

const assignmentSchema = new mongoose.Schema({
  faculty_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  title: { type: String, required: true },
  questions: [{ type: questionSchema, required: false }],
  deadline: { type: Date, required: false },
  // Other assignment-related fields
},{timestamps:true});

module.exports = mongoose.model("Assignment", assignmentSchema);
