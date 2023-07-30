const router = require("express").Router();
const user_controller = require("../controllers/user.controller");
const assignment_controller = require("../controllers/assignment.controller");
///const assignment_controller=require("../controllers/assignment.controller")

router.post("/add-user", user_controller.add_user);
// router.get(
//   "/get-student-report/:studentId",
//   user_controller.get_student_report
// );

router.post("/add-assignment", assignment_controller.add_assignment);
// router.get(
//   "/get-assignment/:assignmentId",
//   assignment_controller.get_assignment
// );
//router.get("/get-all-assignment", assignment_controller.get_all_assignment);

router.post("/attend-assignment", assignment_controller.attend_assignment);
router.get("/get-student-result/:studentId",assignment_controller.get_student_results)
router.get("/get-assignment-result/:studentId/:assignmentId",assignment_controller.getStudentAssignmentResult)
router.get("/get-pdf-report/:studentId/:assignmentId",assignment_controller.student_report_generator)
router.get("/view-all-assignment",assignment_controller.get_all_assignment)
router.get("/get-particular-assignment",assignment_controller.get_particular_assignment)

router.get("/get-all-assignment-by-faculty",assignment_controller.get_all_assignment_by_faculty)
router.get("/get-perticular-assginment-by-faculty",assignment_controller.get_particular_attended_assignment)
router.get("/get-attend-assignment-by-student",assignment_controller.get_all_attended_assignment)

module.exports = router;
