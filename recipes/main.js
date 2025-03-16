import recipes from './recipes.js';

// ==================== Random Number Generator ====================
function random(num) {
    return Math.floor(Math.random() * num);
}
console.log(random(5)); 

// ==================== Random Recipe Selector ====================
function randomListEntry(list) {
    const listLength = list.length;
    const randomNum = random(listLength); 
    return list[randomNum];
}

// ==================== Recipe Template ====================
function recipeTemplate(recipe) {
    return `<figure class="recipe">
        <img src="${recipe.image}" alt="image of ${recipe.name}" />
        <figcaption>
            ${tagsTemplate(recipe.tags)}
            <h2><a href="#">${recipe.name}</a></h2>
            <p class="recipe__ratings">
                ${ratingTemplate(recipe.rating)}
            </p>
            <p class="recipe__description">
                ${recipe.description}
            </p>
        </figcaption>
    </figure>`;
}

// ==================== Tags Template ====================
function tagsTemplate(tags) {
    let html = '<ul class="recipe__tags">';
    for (let tag of tags) {
        html += `<li>${tag}</li>`;
    }
    html += '</ul>';
    return html;
}

// ==================== Rating Template ====================
function ratingTemplate(rating) {
    let html = `<span
        class="rating"
        role="img"
        aria-label="Rating: ${rating} out of 5 stars"
    >`;

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }

    html += `</span>`;
    return html;
}

// ==================== Recipe Renderer ====================
function renderRecipes(recipeList) {
    const outputElement = document.querySelector('#recipes');
    const messageElement = document.querySelector('#no-results-message');

    if (recipeList.length === 0) {
        messageElement.classList.remove('hidden');
        outputElement.innerHTML = ''; // Clear any previous recipes
    } else {
        messageElement.classList.add('hidden');
        const html = recipeList.map(recipeTemplate).join('');
        outputElement.innerHTML = html;
    }
}

// ==================== Page Initialization ====================
function init() {
    const recipe = randomListEntry(recipes);  
    renderRecipes([recipe]);                     
}
init();

// ==================== Event Listeners ====================
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', searchHandler);

// ==================== Search Handler ====================
function searchHandler(e) {
    e.preventDefault(); // Prevents page reload
    const query = document.querySelector('input[type="text"]').value.toLowerCase();
    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
}

// ==================== Filter Function ====================
function filterRecipes(query) {
    return recipes
        .filter(recipe =>
            recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.tags.find(tag => tag.toLowerCase().includes(query)) ||
            recipe.recipeIngredient.find(ingredient => ingredient.toLowerCase().includes(query))
        )
        .sort((a, b) => a.name.localeCompare(b.name));
}


// function tagsTemplate(tags) {
// 	// loop through the tags list and transform the strings to HTML

// 	return html;
// }

// function ratingTemplate(rating) {
// 	// begin building an html string using the ratings HTML written earlier as a model.
// 	let html = `<span
// 	class="rating"
// 	role="img"
// 	aria-label="Rating: ${rating} out of 5 stars"
// >`
// // our ratings are always out of 5, so create a for loop from 1 to 5

// 		// check to see if the current index of the loop is less than our rating
// 		// if so then output a filled star

// 		// else output an empty star

// 	// after the loop, add the closing tag to our string
// 	html += `</span>`
// 	// return the html string
// 	return html
// }


// const recipe = getRandomListEntry(recipes);
// console.log(recipeTemplate(recipe));


// function init() {
//     const recipe = getRandomRecipe(); // Gets a random recipe from your data
//     renderRecipes([recipe]); // Converts the recipe into an array for compatibility
// }
// init();




// recipeSection.innerHTML = renderRecipe(getRandomRecipe());
