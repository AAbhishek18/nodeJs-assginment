const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false},

    email: { type: String, required: true },
    password: { type: String, required: true },

    assignments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);

// const Student = mongoose.model('Student', studentSchema);
// module.exports = Student;
