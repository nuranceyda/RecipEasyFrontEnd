const token = "&apiKey=0c93c77f484441d0a44430bc6263cec2";

let user = JSON.parse(localStorage.getItem("user"));

export function renderpage() {
  console.log(user);
  if (user != null) {
    const login = document.querySelector("#login");
    login.remove();
    let profile = $("#profile");
    profile.empty();
    profile.append(
      `<h1 class="title">Hello, ${user.firstName} ${user.lastName}</h1>`
    );
    profile.append(`<h2 class = "subtitle" >Here are your Favorites!</h2>`);
    profile.append(`<div class = "buttons" style="position:absolute; top:25%; right: 3%;">
    <button id = "logout" class="button is-rounded is-dark">Logout</button>
    <button id = "del" class="button is-rounded is-dark">Delete</button></div>`);
    $("#del").on("click", async function (e) {
      const result = await axios({
        method: "delete",
        url: `https://recipeasy426.herokuapp.com/user/${user.username}`,
      });
      localStorage.setItem("user", JSON.stringify(null));
      window.location.replace("login.html");
    });
    $("#logout").on("click", function () {
      localStorage.setItem("user", JSON.stringify(null));
      window.location.replace("login.html");
    });
  }
}

$(function () {
  renderpage();
  renderfavorites();
});

export async function renderfavorites() {
  let recipeFeed = $("#favoriteFeed");
  //recipeFeed.empty();
  let favorites = user.favorites;
  console.log(user.favorites);
  for (let i = 0; i < favorites.length; i++) {
    let recipe = await getRecipeInformation(favorites[i]);
    recipeFeed.append(createRecipeView(recipe));
  }
}

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

export function createRecipeView(source) {
  console.log(source.id);
  // console.log(recipe);
  console.log("Here is the full info from grabsource");

  let url = source.sourceUrl;
  let isVegan = isitTrue(source.vegan);
  let isGlutenFree = isitTrue(source.glutenFree);
  let readyinTime = source.readyInMinutes;
  let isDairyFree = isitTrue(source.dairyFree);
  let amountOfServings = source.servings;
  // console.log(url);
  let recipeview = `
    <div class="card m-3" id ="${source.id}">
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <img src = ${source.image}>
                    <p class="title is-6">${source.title}</p>
                </div>
            </div>
        <div class="content"><b>Vegan:</b> ${isVegan}</div>
        <div class="content"><b>GlutenFree:</b> ${isGlutenFree}</div>
        <div class="content"><b>DairyFree:</b> ${isDairyFree}</div>
        <div class="content"><b>Servings:</b> ${amountOfServings}</div>
        <div class="content"><b>Prep Time :</b> ${readyinTime} minutes</div>
        <button class="button is-link is-light" onclick="window.location.href = '${url}';">See Full Info</button>

    </div></div >`;
  return recipeview;
}

export function isitTrue(value) {
  if (value) {
    return "Yes";
  }
  return "No";
}
