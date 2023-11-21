// IIFE: Imeediately Invoked Function Experssion
( async function (){ //anonymous function
    const response = await fetch("./recipes.json");
    const recipes = await response.json();
    

    const inputElem = document.getElementById("searchInput");
    const btnElem = document.getElementById("searchBtn");
    const listElem = document.getElementById("recipe-list");
    const detailsElem = document.getElementById("recipeDetailsContainer");


    function loadRecipeDetails(recipe){
        console.log(recipe)
        detailsElem.innerHTML = `
        <h2 class="title">${recipe.Name}</h2>
        <h3>Ingredients:</h3>
        <ul>${recipe.Ingredients.map(function(ingredient){
            return "<li>" + ingredient + "</li>"

        }).join("")}</ul>
        <h3>Method:</h3>
        <div>${recipe.Method}</div>
        
        `

    }

    function displaySearchResults(results){
        listElem.innerHTML = "";
        results.forEach(function (recipe)  {
            const li = document.createElement("li");
            // const listItem = `
            // <div class="Name">${recipe.Name}</div>
            // <div class="Description">${recipe.Description}</div>
            // `;
            li.innerHTML = recipe.Name;
            li.addEventListener("click", function(){
                loadRecipeDetails(recipe);

            })
            listElem.appendChild(li);
            
        });

    }
    function search(){
        const query = inputElem.value.toLowerCase();
        console.log(query);
        const results = recipes.filter(function (recipe) {
            return(recipe.Name.toLowerCase().includes(query) ||
            recipe.Ingredients.join(" ").toLowerCase().includes(query))
            
        });

        displaySearchResults(results)
    }
    btnElem.addEventListener("click", search);
    //  console.log(recipes)
})();