const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
 firstName:{
    type:String,
    required:true,
 },
  lastName:{
    type:String,
    required:false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    
  },
  department: {
    type: String,
    required: false,
  },
  assignments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
    },
  ],
},{timestamps:true});

module.exports = mongoose.model('Faculty', facultySchema);

// const Faculty = mongoose.model('Faculty', facultySchema);
// module.exports = Faculty;
