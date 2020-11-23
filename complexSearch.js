// this is to get a list of recipes with the complex search
const token = "&apiKey=6facd6c9578d47ebb7ffbf93f799dcda";

// Submit button after typing in ingredient stuff
//THIS IS A TEMPLATE FOR HOW ITLL WORK
// https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&apiKey=904d4a518d2c404a8907c2e69d7d52c8

// select the id of the ingredient search
const submitButton = document.querySelector("#compButton");

// select the limit of the amount of results
const limit = "&number=1";

let user = JSON.parse(localStorage.getItem("user"));
console.log(user);
if (user != null) {
  const login = document.querySelector("#login");
  login.remove();
}

//Button event listener to run the function when clicked
submitButton.addEventListener("click", function (e) {
  getComplexSearchItems();
});

//get the ingredient searches
export async function getComplexSearchItems() {
  let compFeed = $("#compFeed");
  compFeed.empty();
  const compInput = document.querySelector("#compSearch").value;
  const result = await axios({
    method: "get",
    //OFFICIAL PRODUCTION URL FOR HEROKU
    //url: `https://cors-anywhere.herokuapp.com/https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientInput}${token}${limit}`,
    //LOCAL TEST URL
    url: `https://api.spoonacular.com/recipes/complexSearch?query=${compInput}${token}${limit}`,
  });
  // renderhome();
  if (result) {
    // console.log("successful call for compSearch")
    // console.log(result.results);
    // console.log("result data is");
    // console.log("result number is " + result.number)
    //console.log(result.results[0].id);

    for (let i = 0; i < result.data.results.length; i++) {
      console.log("Inside for loop");
      console.log(i);
      let recipeData = result.data.results[i];
      let source = await getRecipeInformation(recipeData.id);
      compFeed.append(createRecipeView(recipeData, source));
      console.log($(`#favoriteButton${recipeData.id}`));
      $(`#favoriteButton${recipeData.id}`).on(
        "click",
        { id: recipeData.id },
        userUpdate
      );
    }
  } else {
    console.log("Ingredient Search Failed");
  }
}

// this should be hit when we click on the card and direct to the source URL
export async function getRecipeInformation(id) {
  const result = await axios({
    method: "get",
    url: `https://api.spoonacular.com/recipes/${id}/information?${token}&includeNutrition=false`,
  });
  if (result) {
    console.log("successful call for recipe by ID");
    console.log(result);
  }
  return result.data;
}

export function isitTrue(value) {
  if (value) {
    return "Yes";
  }
  return "No";
}

export function createRecipeView(recipe, source) {
  let url = source.sourceUrl;
  let isVegan = isitTrue(source.vegan);
  let isGlutenFree = isitTrue(source.glutenFree);
  let readyinTime = source.readyInMinutes;
  let isDairyFree = isitTrue(source.dairyFree);
  let amountOfServings = source.servings;

  console.log("InsideRevipeView");
  console.log(recipe);
  let recipeview = `
    <div class="card m-3" id ="${recipe.id}">
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <img src = ${recipe.image}>
                    <p class="title is-6">${recipe.title}</p>
                </div>
            </div>
        <div class="content"><b>Vegan:</b> ${isVegan}</div>
        <div class="content"><b>GlutenFree:</b> ${isGlutenFree}</div>
        <div class="content"><b>DairyFree:</b> ${isDairyFree}</div>
        <div class="content"><b>Servings:</b> ${amountOfServings}</div>
        <div class="content"><b>Prep Time :</b> ${readyinTime} minutes</div>
        <button class="button is-link is-light" onclick="window.location.href = '${url}';">See Full Info</button>
        <button class="button is-warning is-rounded" id="favoriteButton${recipe.id}"><i class="fas fa-star"></i></button>
    </div>
        <footer class="card-footer">`;
  recipeview += `</footer ></div >`;
  console.log("do we get here");
  return recipeview;
}

// test function to make sure that searching is working
export async function sayHey() {
  console.log("hay it was clicked");
}

// $(function () {
//     $("#ingButton").on("click", getIngredientSearchItems())
//     console.log("clicked");
// })
export async function userUpdate(event) {
    alert("attempting to add" +event.data.id + " to favorites");
    //here we need to do another if else statement to check if the recipe has already been in the users favorites
    //user.favorites
    if (user == null) {
      alert("please login");
    } else {
  
        if(user.favorites.includes(event.data.id)) {
            alert("You already have this in your favorites ");
        }
        else {
          console.log(user.favorites)
          alert("Successfully added to favorites");
      updateUserFavorites(event.data.id, user);
      user.favorites.push(event.data.id);
      localStorage.setItem("user", JSON.stringify(user));
        }
    }
  }

  // test function to make sure that searching is working
export async function updateUserFavorites(itemID, user) {
    let favorites = user.favorites;
    favorites.push(itemID);
    console.log(favorites);
    let name = user.username;
    console.log(name);
    const result = await axios({
      method: "put",
      url: `https://recipeasy426.herokuapp.com/user/${name}`,
      data: {
        favorites: favorites,
      },
    });
    console.log(result);
  }