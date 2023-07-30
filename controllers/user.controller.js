const user_model = require("../models/user.model");
const assignment_model = require("../models/assignment.model");
const express_validator=require("express-validator")
const pdf_gnerator=require("../helper/pdf_generator")
//const PDFGenerator = require('../pdfGenerator'); // You'll need to implement this module to generate PDF reports.

// UserController.js
exports.add_user = async (req, res) => {
  try {
    //body validation
    const errors=express_validator.validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({status:false, message:errors.array()})
    }
    const { username, password, role, marks } = req.body;

    const user = new user_model({
            username: username,
            password:password,
            role:role, 
            marks: marks 
            });
    let user_created=await user.save();
    res.status(201).json({status:true, message: "User created successfully",data:user_created });
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
};
