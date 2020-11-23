//Most of these functions are working from the backend
const loginButton = document.querySelector("#loginButton");
const signupButton = document.querySelector("#signupButton");

loginButton.addEventListener("click", async function (e) {
  let usernameLogin = $("#usernameLogin").val();
  let passwordLogin = $("#passwordLogin").val();
  console.log("clickedLoginButton");
  let user = await login(usernameLogin, passwordLogin);
  console.log(user);
  localStorage.setItem("user", JSON.stringify(user.data));
  console.log(localStorage.getItem("user"));
  if (user.data != null) {
    window.location.replace("favorites.html");
  }
});

signupButton.addEventListener("click", async function (e) {
  let usernameSignup = $("#usernameSignup").val();
  let passwordSignup = $("#passwordSignup").val();
  let firstnameSignup = $("#firstnameSignup").val();
  let lastnameSignup = $("#lastnameSignup").val();
  console.log("insanity");
  let users = await getAllUserNames();
  let userData = users.data;
  console.log(userData);
  let creatable = true;
  for (let i = 0; i < userData.length; i++) {
    if (userData[i] == usernameSignup) {
      console.log(userData[i]);
      creatable = false;
      alert("This username is taken. Please try again!");
      break;
    }
  }
  if (creatable) {
    let result = await createUser(
      usernameSignup,
      passwordSignup,
      firstnameSignup,
      lastnameSignup
    );
    console.log(result.data);
  }
});

// login into account, this should create a cookie
export async function login(username, password) {
  try {
    const result = await axios({
      method: "post",
      withCredentials: true,
      url: `https://recipeasy426.herokuapp.com/login`,
      //url: link + "login",
      data: {
        username: username,
        password: password,
      },
    });
    console.log("You are successfully logged in!");
    return result;
  } catch (error) {
    alert("This username and password is incorrect. Please try again!");
    return { data: null };
  }
}

//get user information

// logs you out and should delete the cookie
export async function logout() {
  localStorage.setItem("user", JSON.stringify(null));
  // const result = await axios({
  //     method: 'get',
  //     url: `https://cors-anywhere.herokuapp.com/https://recipeasy426.herokuapp.com/logout`
  // });
  //console.log(result);
}

// Return all usernames to check if username exists
export async function getAllUserNames() {
  const result = await axios({
    method: "get",
    url: `https://recipeasy426.herokuapp.com/usernames`,
    //headers: {'X-Requested-With': 'XMLHttpRequest'}
    //crossDomain: false
  });
  console.log("returning all userNames");
  return result;
}
// create a new user object
export async function createUser(username, password, firstname, lastname) {
  const result = await axios({
    method: "post",
    url: `https://recipeasy426.herokuapp.com/user`,
    data: {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      favorites: [],
    },
  });
  return result;
}
//update into favorites
export async function updateUserFavorites(itemID) {
  const result = await axios({
    method: "put",
    url: `https://cors-anywhere.herokuapp.com/https://recipeasy426.herokuapp.com/user/${username}`,
    data: {
      favorites: itemID,
    },
  });
  console.log(result);
}
