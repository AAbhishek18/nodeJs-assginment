
const router=require("express").Router()

const student_controllers=require("../controllers/controllers")
const faculty_controllers=require("../controllers/controllers")
const assignment_controller=require("../controllers/controllers")
const attend_assignment_controller=require("../controllers/controllers")
const all_assignment_by_faculty=require("../controllers/controllers")
const controllers=require("../controllers/controllers")


//routes
 router.post("/student-register",student_controllers.add_student)
 router.post("/student-login",student_controllers.student_login)

router.post("/faculty-register",faculty_controllers.add_faculty)
router.post("/faculty-login",faculty_controllers.faculty_login)

router.post("/add-assignment",assignment_controller.add_assignment)   

router.post("/submit-assignment",attend_assignment_controller.attend_assignment)

router.get("/all-assignment-by-faculty",all_assignment_by_faculty.get_all_assignments)
router.get("/get-assignment-student",controllers.get_all_assignments_of_student)

router.get ("/get-attended-assignment-by-student",controllers.get_attended_assignment_by_student)
router.get("/get-perticular-assginment-by-student",controllers.get_perticuler_attended_assignment_by_student)









module.exports=router