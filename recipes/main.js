import { recipes } from './recipes.mjs';

document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");

    recipes.forEach(recipe => {
        const recipeCard = document.createElement("article");
        recipeCard.classList.add("recipe");

        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h2>${recipe.name}</h2>
            <p>${recipe.description}</p>
            <span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
                ${'⭐'.repeat(recipe.rating)}${'☆'.repeat(5 - recipe.rating)}
            </span>
            <p>Prep Time: ${recipe.prepTime} | Cook Time: ${recipe.cookTime}</p>
        `;

        main.appendChild(recipeCard);
    });
});
