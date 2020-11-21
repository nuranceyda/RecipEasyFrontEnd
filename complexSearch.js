// this is to get a list of recipes with the complex search
const token = "&apiKey=904d4a518d2c404a8907c2e69d7d52c8"


// Submit button after typing in ingredient stuff
//THIS IS A TEMPLATE FOR HOW ITLL WORK
// https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&apiKey=904d4a518d2c404a8907c2e69d7d52c8

// select the id of the ingredient search
const compButton = document.querySelector("#complexButton");

// select the limit of the amount of results
const limit = "&number=1"

//Button event listener to run the function when clicked
submitButton.addEventListener('click', function (e) {
    getComplexSearchItems();

})

//get the complex searches
export async function getComplexSearchItems() {
    const complexInput = document.querySelector("#complexSearch").value;
    const result = await axios({
        method: 'get',
        //OFFICIAL PRODUCTION URL FOR HEROKU
        //url: `https://cors-anywhere.herokuapp.com/https://api.spoonacular.com/recipes/complexSearch?query=${complexInput}${token}${limit}`,
        //LOCAL TEST URL
        url:`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${complexInput}${token}${limit}`,
});
    // renderhome();
    if(result) {
    console.log("got foood!")
    console.log(result);

    }
    else {
        console.log("complex Search Failed");
    }
};

// test function to make sure that searching is working
export async function sayHey() {
    console.log("hay it was clicked")
}


// $(function () {
//     $("#ingButton").on("click", getComplexSearchItems())
//     console.log("clicked");
// })