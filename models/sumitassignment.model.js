const mongoose=require("mongoose")

const assignmentSubmissionSchema = new mongoose.Schema({
  student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    assignment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
    },
    submission: {
      type: String, // You can store the Base64 encoded submission here.
      required: false,
    },
    answer:{
      type:String,
      required:true,
    }
   
    
  },{timestamps:true});

    module.exports = mongoose.model('AssignmentSubmission', assignmentSubmissionSchema);