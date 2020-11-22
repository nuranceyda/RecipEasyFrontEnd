// this is to get a list of recipes with the ingredient search
const token = "&apiKey=bb99f95aa31943519d9b8717cfeb3a8e"
// Submit button after typing in ingredient stuff
//THIS IS A TEMPLATE FOR HOW ITLL WORK
// https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&apiKey=904d4a518d2c404a8907c2e69d7d52c8

// select the id of the ingredient search
const submitButton = document.querySelector("#ingButton");

// select the limit of the amount of results
const limit = "&number=1"

//Button event listener to run the function when clicked
submitButton.addEventListener('click', function (e) {
    getIngredientSearchItems();

})


//get the ingredient searches
export async function getIngredientSearchItems() {
    let recipeFeed = $('#recipeFeed');
    recipeFeed.empty();
    const ingredientInput = document.querySelector("#ingSearch").value;
    const result = await axios({
        method: 'get',
        //OFFICIAL PRODUCTION URL FOR HEROKU
        //url: `https://cors-anywhere.herokuapp.com/https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientInput}${token}${limit}`,
        //LOCAL TEST URL
        url:`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientInput}${token}${limit}`,
    });
    // renderhome();
    if(result) {
        console.log("successful call for ingred")
        for(let i =0; i < result.data.length; i++ ) {
            let recipeData = result.data[i];
            let source = await getRecipeInformation(recipeData.id);
            recipeFeed.append(createRecipeView(recipeData, source))
        }

    }
    else {
        console.log("Ingredient Search Failed");
    }
};
// this should be hit when we click on the card and direct to the source URL
export async function getRecipeInformation(id) {
    const result = await axios ({
        method: 'get',
        url:`https://api.spoonacular.com/recipes/${id}/information?${token}&includeNutrition=false`
    } )
    if(result) {
        console.log("successful call for recipe by ID")
        console.log(result);
    }
    return result.data;
}

// this is get the name of the ingredients you didn't write out 
// export function createMissedIngredientNames(missedIngredients) {
//         let missedIngredientsView  =  `<div class="content">$You're missing {missedIngredients.name}</div>`
// }

//theres probably an easier way for this lmfao
export function isitTrue(value) {
    if(value) {
        return "Yes"
    }
    return "No";
}

export function createRecipeView(recipe, source) {
    console.log(recipe.id);
    // console.log(recipe);
    console.log("Here is the full info from grabsource")
    console.log("source url is",source.sourceUrl);
    

    var missingArray = [];
    for (let i = 0; i < recipe.missedIngredients.length; i++) {
        missingArray.push(recipe.missedIngredients[i].name);
    };
    let url = source.sourceUrl;
    let isVegan = isitTrue(source.vegan);
    let isGlutenFree = isitTrue(source.glutenFree)
    let readyinTime = source.readyInMinutes;
    let isDairyFree = isitTrue(source.dairyFree)
    let amountOfServings = source.servings
    // console.log(url);
    let recipeview =`
    <div class="card m-3" id ="${recipe.id}">
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <img src = ${recipe.image}>
                    <p class="title is-6">${recipe.title}</p>
                </div>
            </div>
            <strong> Your Main Missing Ingredients </strong>
        <div class="content">${missingArray}</div>
        <div class="content"><b>Vegan:</b> ${isVegan}</div>
        <div class="content"><b>GlutenFree:</b> ${isGlutenFree}</div>
        <div class="content"><b>DairyFree:</b> ${isDairyFree}</div>
        <div class="content"><b>Servings:</b> ${amountOfServings}</div>
        <div class="content"><b>Prep Time :</b> ${readyinTime} minutes</div>
        <button class="button is-link is-light" onclick="window.location.href = '${url}';">See Full Info</button>

    </div>
        <footer class="card-footer">`
    recipeview += `</footer ></div >`
    console.log("do we get here");
    return recipeview;
}

// test function to make sure that searching is working
export async function sayHey() {
    console.log("hay it was clicked")
}


// $(function () {
//     $("#ingButton").on("click", getIngredientSearchItems())
//     console.log("clicked");
// })

//    <button onclick="window.location.href = '${url}';">See the recipe</button>