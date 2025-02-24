function getGrades() {
  let input = document.querySelector("#grades").value;
  return input.split(",").map(grade => grade.trim().toUpperCase());
}

  
function lookupGrade(grade) {
  if (grade === "A") return 4.0;
  else if (grade === "B") return 3.0;
  else if (grade === "C") return 2.0;
  else if (grade === "D") return 1.0;
  else if (grade === "F") return 0.0;
  else return null;  // Handles invalid input
}
  
function calculateGpa(gradesArray) {
  let points = gradesArray.map(lookupGrade).filter(value => value !== null); // Convert to GPA points & remove invalid grades
  if (points.length === 0) return "Invalid input";
  
  let total = points.reduce((sum, value) => sum + value, 0);
  let gpa = total / points.length;
  return gpa.toFixed(2);  // Round to 2 decimal places
}

  
function displayGpa(gpa) {
  document.querySelector("#output").textContent = `Your GPA is: ${gpa}`;
}

  
function clickHandler() {
  let grades = getGrades();
  let gpa = calculateGpa(grades);
  displayGpa(gpa);
}


document.querySelector("#submitButton").addEventListener("click", clickHandler);
