

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path=require("path")
const generatesStudentReportPDF = (student) => {
  const doc = new PDFDocument();
 // const folderPath="public/report"
  //fs.mkdirSync(folderPath,{recursive:true})

  const filename =path.join("public",`${student.username}_report.pdf`);
  const stream = fs.createWriteStream(filename);

  doc.pipe(stream);

  // Add content to the PDF
  doc.fontSize(20).text('Student Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).text(`Student Name: ${student.username}`);
  doc.fontSize(16).text(`Role: ${student.role}`);
 // doc.fontSize(16).text(`Subject: ${student.title}`)
  doc.fontSize(16).text(`Total Marks: ${student.marks}`);

  // End and save the PDF
  doc.end();

  return filename;
};

module.exports = {
  generatesStudentReportPDF,
};








// Usage example:
// const student = {
//   "_id": {
//     "$oid": "64c5104206cd14ac15a8a557"
//   },
//   "username": "Manoj",
//   "password": "abc@123",
//   "role": "faculty",
//   "marks": 0,
//   "assignmentsAttended": [],
//   "__v": 0
// };

//const pdfFilename = generatesStudentReportPDF();
// console.log(`PDF generated: ${pdfFilename}`);
















