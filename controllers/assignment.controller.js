const assignment_model=require("../models/assignment.model")
const express_validator=require("express-validator")
const user_model=require("../models/user.model")
const pdf_report_gnerator=require("../helper/pdf_generator").generatesStudentReportPDF

exports.add_assignment=async (req,res)=>{
    try{
        const errors=express_validator.validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({status:false, message:errors.array()})
        }
        const {title,questions,user_id}=req.body;
        let user=await user_model.findById(user_id)
        
            if(user.role=='student'){
                return res.status(400).json({status:false,message:"Student can not create Assignment!"})
        }
        
        
        const assignment=new assignment_model({
            title:title,
            questions:questions,
            assignment_created_by:user_id
        })
        let assignment_created=await assignment.save();
        res.status(201).json({status:true, message: "Assignment created successfully",data:assignment_created });
    }catch(err){
        res.status(500).json({status:false, message:"Failed to create assignment",err:err.message})
    }
}



exports.get_all_assignment=async (req,res)=>{
    try{
      const {user_id}=req.body
      let student=await user_model.findById(user_id)
      if(student.role=='faculty'){
          return res.status(400).json({status:false,message:"Faculty can not get Assignment!"})
      }
        let assignment=await assignment_model.find();
        if(!assignment){
            return res.status(404).json({status:false, message:"Assignment not found"})
        }
        res.status(200).json({status:true, message: "Assignment found successfully",data:assignment });
    }catch(err){
        res.status(500).json({status:false, message:"Failed to find assignment",err:err.message})
    }
}
//get articular assignent by student
exports.get_particular_assignment=async (req,res)=>{
    try{
      const {user_id,assignment_id}=req.body
      let student=await user_model.findById(user_id)
      if(student.role=='faculty'){
          return res.status(400).json({status:false,message:"Faculty can not get Assignment!"})
      }

      let assignment=await assignment_model.findById(assignment_id)
      if(!assignment){
          return res.status(404).json({status:false, message:"Assignment not found"})
      }
        res.status(200).json({status:true, message: "Assignment found successfully",data:assignment });
    }catch(err){
        res.status(500).json({status:false, message:"Failed to find assignment",err:err.message})
    }
}

//get all attended assignment by faculty

exports.get_all_assignment_by_faculty=async (req,res)=>{
    try{
      const {faculty_id,student_id}=req.body

      let user=await user_model.findById(faculty_id)
      if(user.role=='student'){
          return res.status(400).json({status:false,message:"Student can not get Assignment!"})
        }

        let student=await user_model.findById(student_id)
        if(student.assignmentsAttended.length==0){
            return res.status(404).json({status:false, message:"No Assignment  found"})
        }
        res.status(200).json({status:true, message: "Assignment found successfully",data:student.assignmentsAttended });
    }catch(err){
        res.status(500).json({status:false, message:"Failed to find assignment",err:err.message})

    }

  }

//get-perticular-assginment-by-faculty
exports.get_particular_attended_assignment=async (req,res)=>{
    try{
      const {faculty_id,student_id,attended_assignment_id}=req.body

      let faculty=await user_model.findById(faculty_id)

      if(faculty.role=='student'){
          return res.status(400).json({status:false,message:"Student can not get Assignment!"})
        }

        let student=await user_model.findById(student_id)
        if(student.assignmentsAttended.length==0){ 
            return res.status(404).json({status:false, message:"No Assignment  found"})
        }
        //
        const attendedAssignment = student.assignmentsAttended.find((assignment) => assignment._id.toString() === attended_assignment_id);
        
        if(!attendedAssignment){
            return res.status(404).json({status:false, message:"No Assignment  found"})
        }
        res.status(200).json({status:true, message: "Assignment found successfully",data:attendedAssignment });
    }catch(err){
        res.status(500).json({status:false, message:"Failed to find assignment",err:err.message})
    }
}
//get attended assignment by student
exports.get_all_attended_assignment=async (req,res)=>{
    try{
      const {student_id}=req.body
      let student=await user_model.findById(student_id)

      if(student.role=='faculty'){
          return res.status(400).json({status:false,message:"Faculty can not get Assignment!"})
        }
        if(student.assignmentsAttended.length==0){
            return res.status(404).json({status:false, message:"No Assignment  found"})
        }
        res.status(200).json({status:true, message: "Assignment found successfully",data:student.assignmentsAttended });
    }catch(err){
        res.status(500).json({status:false, message:"Failed to find assignment",err:err.message})
    }
}

  
     







// attended assignment
exports.attend_assignment=async(req,res)=>{
    try{
        const { student_id, assignment_id, selectedAnswers } = req.body;
        const student = await user_model.findById(student_id);
        if(student.role=='faculty'){
            return res.status(400).json({status:false,message:"Faculty can not attend Assignment!"})
        }
        const assignment=await assignment_model.findById(assignment_id)
            if(!assignment){
                return res.status(404).json({status:false,message:"Assignment not found!"})
            }
        if (!student || !assignment) {

            return res.status(404).json({ message: 'Student or Assignment not found' });
        }
        
        // after doing assignment push in the assignmentAttended
        if(selectedAnswers==assignment.questions[assignment.questions.length-1].correct_answers){
            student.marks+=1;
            marksObtained=1
        }else{

            marksObtained=0
        }
        student.assignmentsAttended.push({ assignment: assignment_id,title:assignment.title, selectedAnswers,marksObtained});
        let assign_done=await student.save()
        res.status(200).json({status:true, message: "Assignment attended successfully",data:assign_done.assignmentsAttended[student.assignmentsAttended.length-1]});
    }catch(err){
        res.status(500).json({status:false, message:"Failed to attend assignment",err:err.message})
    }


}

exports.get_student_results = async (req, res) => {
      try {
        const { studentId } = req.params;
        const student = await user_model.findById(studentId)//.populate('assignmentsAttended.assignment');
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({status:true,message:"Report Fetched Successfully",data:student.assignmentsAttended});
      } catch (err) {
        res.status(500).json({status:false, message:'Failed to fetch student results',err:err.message });

      }
    };

    exports.getStudentAssignmentResult = async (req, res) => {
          try {
            const { studentId, assignmentId } = req.params;
            const student = await user_model.findById(studentId).populate('assignmentsAttended.assignment');
            if (!student) {
              return res.status(404).json({ message: 'Student not found' });
            }
            //
            const attendedAssignment = student.assignmentsAttended.find((assignment) => assignment.assignment._id.toString() === assignmentId);
            console.log(attendedAssignment)
            if (!attendedAssignment) {
              return res.status(404).json({ message: 'Student did not attend this assignment' });
            }
            res.status(200).json({status:true,message:"Student Assignment Result Fetched",data:attendedAssignment});
          } catch (err) {
            res.status(500).json({status:false, message: 'Failed to fetch student assignment result',err:err.message });
          }
        };
        



exports.student_report_generator=async(req,res)=>{
    try{
        const { studentId, assignmentId } = req.params;
        const student = await user_model.findById(studentId).populate('assignmentsAttended.assignment');
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }
        const attendedAssignment = student.assignmentsAttended.find((assignment) => assignment.assignment._id.toString() === assignmentId);
        console.log(attendedAssignment)
        if (!attendedAssignment) {
          return res.status(404).json({ message: 'Student did not attend this assignment' });
        }
        let pdf= pdf_report_gnerator(student/*,attendedAssignment*/)
        console.log(pdf)
        res.status(200).json({status:true,message:"PDF Generated Successfully",data:pdf})
    }catch(err){
        res.status(500).json({status:false,message:"Failed to generate pdf",err:err.message})
    }
}

exports.getStudentAssignment = async (req, res) => {
  try {
    const { studentId, assignmentId } = req.params;
    const student = await User.findById(studentId).populate('assignmentsAttended.assignment');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const attendedAssignment = student.assignmentsAttended.find((assignment) => assignment.assignment._id.toString() === assignmentId);
    if (!attendedAssignment) {
      return res.status(404).json({ message: 'Student did not attend this assignment' });
    }
    res.status(200).json(attendedAssignment);
  } catch (err) {
    res.status(500).json({status:false, message: 'Failed to fetch student assignment',err:err.message });
  }
};
