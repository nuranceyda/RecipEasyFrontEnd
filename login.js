//Most of these functions are working from the backend

const usernameLogin = document.querySelector("#usernameLogin").value;
const passwordLogin = document.querySelector("#passwordLogin").value;

const usernameSignup = document.querySelector("#usernameSignup").value;
const passwordSignup = document.querySelector("#passwordSignup").value;
const firstnameSignup = document.querySelector("#firstnameSignup").value;
const lastnameSignup = document.querySelector("#lastnameSignup").value;


const loginButton = document.querySelector("#loginButton")
const signupButton = document.querySelector("#signupButton")

loginButton.addEventListener('click', function (e) {
     console.log("clickedButton")
    getAllUserNames();
    console.log("those are then names!")
})




// login into account, this should create a cookie
export async function login(username,password) {
        const result = await axios({
            method: 'post',
            url: `https://cors-anywhere.herokuapp.com/https://recipeasy426.herokuapp.com/login`,
            data: {
                username: username,
                password: password
            }
        });
        console.log("logged in!")
        console.log(result);
}
// logs you out and should delete the cookie
export async function logout() {
    const result = await axios({
        method: 'get',
        url: `https://cors-anywhere.herokuapp.com/https://recipeasy426.herokuapp.com/logout`
    });
    console.log(result);
}

// Return all usernames to check if username exists
export async function getAllUserNames() {
    const result = await axios({
        method: 'get',
        url: `https://cors-anywhere.herokuapp.com/https://recipeasy426.herokuapp.com/user`,
        //headers: {'X-Requested-With': 'XMLHttpRequest'}
        crossDomain: false
    });
    console.log("returning all userNames")
    console.log(result);
}
// create a new user object
export async function createUser(username, password, firstname, lastname) {
    const result = await axios({
        method: 'post',
        url: `https://cors-anywhere.herokuapp.com/https://recipeasy426.herokuapp.com/user`,
        data: {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            favorites: [],
        }
    });
    console.log(result);
}
//update into favorites
export async function updateUserFavorites(itemID) {
    const result = await axios({
        method: 'put',
        url: `https://cors-anywhere.herokuapp.com/https://recipeasy426.herokuapp.com/user/${username}` ,
        data: {
            favorites: itemID
        }
    });
    console.log(result);

}