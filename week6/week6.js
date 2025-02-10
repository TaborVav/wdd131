
//=============== ACTIVITY ONE - MAP ===============
//  arrays.js
const steps = ["one", "two", "three"];
function listTemplate(step) {
  return `<li>${step}</li>`;
}
const stepsHtml = steps.map(listTemplate)// use map to convert the list from strings to HTML
document.querySelector("#myList").innerHTML = stepsHtml.join('');

//=============== ACTIVITY TWO - MAP ===============

let grades = ['A', 'B', 'A', 'C'];
let point;
let gpaPoints = grades.map(function(grade) {
    switch (grade){
        case 'A':
            point = 4
            break;
        case 'B':
            point = 3
            break;
        case 'C':
            point = 2
            break; 
        case 'D':
            point = 1
            break;
        case 'F':
            point = 0;
        default:
            alert('not a valid grade');
    }
    return point;
})

console.log(gpaPoints);

//=============== ACTIVITY THREE - REDUCE ===============

let totalPoint = gpaPoints.reduce(getTotal);

function getTotal(total, item){
    return total = item;
}

console.log(totalPoint);

let gpaAverage = totalPoint/gpaPoints.length;

console.log(gpaAverage);

//=============== ACTIVITY FOUR - FILTER ===============

let fruit = ['watermelon', 'peach', 'apple', 'tomato', 'grape']

let shortFruit = fruit.filter((item) => item.length < 6)

console.log(shortFruit)

//=============== OR ===============

const words = ["watermelon", "peach", "apple", "tomato", "grape"];
const shortWord = words.filter(function (word) {
  return word.length < 6;
});

//same thing with an arrow function
const shortWords = words.filter((word) => word.length < 6);

console.log(shortWord)

//=============== ACTIVITY FIVE - INDEXOF ===============

let values = [12, 34, 21, 54];
let luckyNumber = 21;

let luckyValues = values.indexOf(luckyNumber)+1; //Gets rid of the place 0

console.log(luckyValues)
