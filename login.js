//Most of these functions are working from the backend

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
        console.log(result);
}
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
        url: `https://cors-anywhere.herokuapp.com/https://recipeasy426.herokuapp.com/user`
    });
    console.log(result);
}

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