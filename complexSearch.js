// this is to get a list of recipes with the ingredient search

const token = "&apiKey=904d4a518d2c404a8907c2e69d7d52c8"
// Submit button after typing in ingredient stuff
//THIS IS A TEMPLATE FOR HOW ITLL WORK
// https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&apiKey=904d4a518d2c404a8907c2e69d7d52c8

// select the id of the ingredient search
const submitButton = document.querySelector("#compButton");

// select the limit of the amount of results
const limit = "&number=3"

//Button event listener to run the function when clicked
submitButton.addEventListener('click', function (e) {
    getComplexSearchItems();

})


//get the ingredient searches
export async function getComplexSearchItems() {
    let recipeFeed = $('#recipeFeed');
    recipeFeed.empty();
    const compInput = document.querySelector("#compSearch").value;
    const result = await axios({
        method: 'get',
        //OFFICIAL PRODUCTION URL FOR HEROKU
        //url: `https://cors-anywhere.herokuapp.com/https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientInput}${token}${limit}`,
        //LOCAL TEST URL
        url:`https://api.spoonacular.com/recipes/complexSearch?query=${compInput}${token}${limit}`,
});
    // renderhome();
    if(result) {
        console.log("successful call for compSearch")
        console.log(result)
        for(let i =0; i < result.data.length; i++ ) {
            let recipeData = result.data[i];
            recipeFeed.append(createRecipeView(recipeData))
        }
    }
    else {
        console.log("comp Search Failed");
    }
};


// this should be hit when we click on the card and direct to the source URL
export async function getRecipeInformation(id) {
    const result = await axios ({
        method: 'get',
        url:`https://api.spoonacular.com/recipes/${id}/information?${token}$includeNutrition=true`
    } )
    if(result) {
        console.log("successful call for recipe by ID")
        console.log(result);
    }
}

// this is get the name of the ingredients you didn't write out 
// export function createMissedIngredientNames(missedIngredients) {
//         let missedIngredientsView  =  `<div class="content">$You're missing {missedIngredients.title}</div>`
// }


export function createRecipeView(recipe) {
    console.log(recipe);
    let recipeview = `<div class="card m-3" id ="${recipe.id}">
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <img src = ${recipe.image}>
                    <p class="title is-6">${recipe.title}</p>
                </div>
            </div>
            <div class="content">${recipe.calories}</div>
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