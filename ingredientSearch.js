// this is to get a list of recipes with the ingredient search


// Submit button after typing in ingredient stuff
//THIS IS A TEMPLATE FOR HOW ITLL WORK
// https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&apiKey=904d4a518d2c404a8907c2e69d7d52c8

// select the id of the ingredient search
const submitButton = document.querySelector("#ingButton");

// select the limit of the amount of results
const limit = "&number=3"

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
            recipeFeed.append(createRecipeView(recipeData))
        }
    }
    else {
        console.log("Ingredient Search Failed");
    }

};




export function createRecipeView(recipe) {
    console.log(recipe);
    let recipeview = `<div class="card m-3" id ="${recipe.id}">
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <img src = ${recipe.image}>
                    <p class="title is-6">@${recipe.title}</p>
                </div>
            </div>
            <div class="content">${recipe.missedIngredientCount}</div>
        </div>
        <footer class="card-footer">`
    recipeview += `</footer ></div >`
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