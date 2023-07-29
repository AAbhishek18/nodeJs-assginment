const student_model=require("../models/student.model")
 const faculty_model=require("../models/faculty.model")
 const assignment_model=require("../models/assignment.model")
 const assignment_submission_model=require("../models/sumitassignment.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const express_validator=require("express-validator")
const { options } = require("../routes/routes")




//student register
exports.add_student=async(req,res)=>{

    try{
        const error=express_validator.validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }

        const {firstName,lastName,email,password}=req.body

        if(!firstName){
            return res.status(400).json({message:"firstName is required"})
        }  
        if(!lastName){
            return res.status(400).json({message:"lastName is required"})
        }
        // email validation regex
        if(!email){
            return res.status(400).json({message:"email is required"})
        }   
        let email_regex= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        if(!email_regex.test(email)){
            return res.status(400).json({message:"email is invalid"})
        }


         if(!password){
            return res.status(400).json({message:"password is required"})
        }
        if(password.length<6){
            return res.status(400).json({message:"password must be atleast 6 characters"})
        }

        //check if email already exists
        let user_found=await student_model.findOne({email:email})
        if(user_found){
            return res.status(400).json({message:"email already exists"})
        }

        //hash password
        const salt=await bcrypt.genSalt(10)
        const hashed_password=await bcrypt.hash(password,salt)

        //create new user
        const new_user=new student_model({
            firstName:firstName,
            lastName:lastName,
            email:email,    
            password:hashed_password,
            assignments:req.body._id

        })

        //save user
       let user_created = await new_user.save()
        return res.status(200).json({status:true,message:"user created successfully",data:user_created})

    }catch(err){
        return res.status(500).json({message:err.message})

    }

}

//student login
exports.student_login=async(req,res)=>{

    try{
        const error=express_validator.validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }

        const {email,password}=req.body

        if(!email){
            return res.status(400).json({message:"email is required"})
        }   
        let email_regex= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        if(!email_regex.test(email)){
            return res.status(400).json({message:"email is invalid"})
        }

        if(!password){
            return res.status(400).json({message:"password is required"})

        }

        //check if user exists
        let user_found=await student_model.findOne({email:email})
        if(!user_found){
            return res.status(400).json({message:"email does not exists"})
        }

        //check if password is correct
        let password_matched=await bcrypt.compare(password,user_found.password)
        if(!password_matched){
            return res.status(400).json({message:"password is incorrect"})
        }

        //create token
        const token=jwt.sign({_id:user_found._id},process.env.JWT_SECRET,{expiresIn:"1h"})
        return res.status(200).json({status:true,message:"login successfull",token:token})

    }catch(err){
        return res.status(500).json({status:false,message:err.message})

    }

}

//faculty register
exports.add_faculty=async(req,res)=>{

    try{
        const error=express_validator.validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }

        const {firstName,lastName,email,password}=req.body
        
        //check if email already exists
        let faculty_found=await faculty_model.findOne({email:email})
            if(faculty_found){
                return res.status(400).json({message:"email already exists"})
            }
        
           

        if(!firstName){
            return res.status(400).json({status:false,message:"firstName is required"})
        }  
        if(!lastName){
            return res.status(400).json({status:false,message:"lastName is required"})
        }
        // email validation regex
        if(!email){
            return res.status(400).json({status:false,message:"email is required"})
        }   
        let email_regex= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        if(!email_regex.test(email)){
            return res.status(400).json({message:"email is invalid"})
        }

        if(!password){
            return res.status(400).json({status:false,message:"password is required"})
        }

        if(password.length<6){
            return res.status(400).json({status:false,message:"password must be atleast 6 characters"})
        }

        //hash password
        const salt=await bcrypt.genSalt(10)
        const hashed_password=await bcrypt.hash(password,salt)

        //create new user
        const new_user=new faculty_model({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hashed_password,
            assignments:req.body._id
        })  

        //save user
        let user_created=await new_user.save()
        return res.status(200).json({status:true,message:"user created successfully",data:user_created})

    }catch(err){
        return res.status(500).json({status:false,message:err.message})

    }

}

//faculty login
exports.faculty_login=async(req,res)=>{
    try{
        const error=express_validator.validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }

        const {email,password}=req.body

        if(!email){
            return res.status(400).json({message:"email is required"})
        }   
        let email_regex= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        if(!email_regex.test(email)){
            return res.status(400).json({message:"email is invalid"})
        }

        if(!password){
            return res.status(400).json({message:"password is required"})

        }

        //check if user exists
        let user_found=await faculty_model.findOne({email:email})
        if(!user_found){
            return res.status(400).json({message:"email does not exists"})
        }

        //check if password is correct
        let password_matched=await bcrypt.compare(password,user_found.password)
        if(!password_matched){
            return res.status(400).json({message:"password is incorrect"})
        }

        //create token
        const token=jwt.sign({_id:user_found._id},process.env.JWT_SECRET,{expiresIn:"1h"})
        return res.status(200).json({status:true,message:"login successfull",token:token})

    }catch(err){
        return res.status(500).json({status:false,message:err.message})

    }

}

//add assignment by faculty
exports.add_assignment=async(req,res)=>{
    try{
        const error=express_validator.validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }

        const {_id,title,questions,deadline}=req.body

        // if(!questions){
        //     return res.status(400).json({message:"questions is required"})
        // }   
        if(!req.body.questions[0].options){
            return res.status(400).json({message:"Options  are required"})
        }
        if(!_id){
            return res.status(400).json({message:"faculty id is required"})
        }
        //create new assignment
        const new_assignment=new assignment_model({
            faculty_id:_id,
            title:title,
            questions:questions,
            deadline:deadline
        })  

        //save assignment
        let assignment_created=await new_assignment.save()
        return res.status(200).json({status:true,message:"assignment created successfully",data:assignment_created})

    }catch(err){
        return res.status(500).json({status:false,message:err.message})

    }


}

// attend assignment by student
exports.attend_assignment=async(req,res)=>{
    try{
        const error=express_validator.validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }

        const {assignment_id,student_id,answer}=req.body

        if(!assignment_id){
            return res.status(400).json({message:"assignment_id is required"})
        }   
        if(!student_id){
            return res.status(400).json({message:"student_id is required"})
        }
        if(!answer){
            return res.status(400).json({message:"answer is required"})
        }

        //check if assignment exists
        let assignment_found=await assignment_model.findOne({_id:assignment_id})
        if(!assignment_found){
            return res.status(400).json({message:"assignment does not exists"})
        }
        let student_found=await student_model.findOne({_id:student_id})
        if(!student_found){
            return res.status(400).json({message:"student does not exists"})
        }
        //marks of a student for submitted assignment
        let marks=0;
        //check if answer is correct
        
        // for(let i=0;i<assignment_found.questions.length;i++){
        //     if(assignment_found.questions.options[i]==answer){
        //         marks++;
        //     }
        // }
     //create new assignment
        const assign_submitted=new assignment_submission_model({
            assignment_id:assignment_id,
            student_id:student_id,
            answer:answer,
            marks:marks
        })
       
        //save assignment
        let assignment_attended=await assign_submitted.save()
        return res.status(200).json({status:true,message:"attendance created successfully",data: assignment_attended})

    }catch(err){
        return res.status(500).json({status:false,message:err.message})

    }

}

//get all assignments by faculty
exports.get_all_assignments=async(req,res)=>{
    try{
        const error=express_validator.validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }

        const {_id}=req.body

        if(!_id){
            return res.status(400).json({message:"faculty id is required"})
        }   

        //check if faculty exists
        let faculty_found=await faculty_model.findOne({_id:_id})
        if(!faculty_found){
            return res.status(400).json({message:"faculty does not exists"})
        }

        //get all assignments
        let assignments=await assignment_submission_model.find({})
        return res.status(200).json({status:true,message:"assignments fetched successfully",data:assignments})

    }catch(err){
        return res.status(500).json({status:false,message:err.message})

    }

}

//get all assignment of an individual student
exports.get_all_assignments_of_student=async(req,res)=>{
    try{
        const error=express_validator.validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }

        const {_id}=req.body

        if(!_id){
            return res.status(400).json({message:"student id is required"})
        }   

        //check if student exists
        let student_found=await student_model.findOne({_id:_id})
        if(!student_found){
            return res.status(400).json({message:"student does not exists"})
        }

        //get all assignments
        let assignments=await assignment_submission_model.find({student_id:_id})
        return res.status(200).json({status:true,message:"assignments fetched successfully",data:assignments})

    }catch(err){
        return res.status(500).json({status:false,message:err.message})

    }

}

//get attended assignment by student
exports.get_attended_assignment_by_student=async(req,res)=>{
    try{
        const error=express_validator.validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }

        const {_id}=req.body

        if(!_id){
            return res.status(400).json({message:"student id is required"})
        }   

        //check if student exists
        let student_found=await student_model.findOne({_id:_id})
        if(!student_found){
            return res.status(400).json({message:"student does not exists"})
        }

        //get all assignments
        let assignments=await assignment_submission_model.find({student_id:_id})
        return res.status(200).json({status:true,message:"assignments fetched successfully",data:assignments})

    }catch(err){
        return res.status(500).json({status:false,message:err.message})

    }

}

//get perticuler attended assignment by student
exports.get_perticuler_attended_assignment_by_student=async(req,res)=>{
    try{
        const error=express_validator.validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }

        const {_id,attended_assignment_id}=req.body

        if(!_id){
            return res.status(400).json({message:"student id is required"})
        }   

        //check if student exists
        let student_found=await student_model.findOne({_id:_id})
        if(!student_found){
            return res.status(400).json({message:"student does not exists"})
        }

        //get all assignments
        let assignments=await assignment_submission_model.find({$and:[{student_id:_id},{_id:attended_assignment_id}]})
        console.log(assignments);
        return res.status(200).json({status:true,message:"assignments fetched successfully",data:assignments})

    }catch(err){
        return res.status(500).json({status:false,message:err.message})

    }

}







        







