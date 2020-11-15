export async function renderhome() {
    const root = $('#root');
    const users = await axios({
        method: 'get',
        url: 'https://recipeasy426.herokuapp.com/user'
    })
    console.log(users.data);
    $('#feed').empty();
    for (let i = 0; i < users.data.length; i++) {
        console.log(users.data[i]);
        const user = await axios({
            method: 'get',
            url: `https://cors-anywhere.herokuapp.com/https://recipeasy426.herokuapp.com/user/${users.data[i]}`
        })
        $('#recipefeed').append(createRecipeView(user.data));
    }
}

export async function createUser(event) {
    const result = await axios({
        method: 'post',
        url: `https://cors-anywhere.herokuapp.com/https://recipeasy426.herokuapp.com/user/`,
        data: {
            firstName: "Well maybe",
            lastName: "Dude",
            favorites: [0, 2, 3],
            diet: "help",
        }
    });
    renderhome();
    console.log(result);
};

export function createRecipeView(user) {
    console.log(user);
    let recipeview = `<div class="card m-3" id ="${user.id}">
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-4">${user.firstName}</p>
                    <p class="subtitle is-6">@${user.lastName}</p>
                </div>
            </div>
            <div class="content">${user.diet}</div>
        </div>
        <footer class="card-footer">`
    recipeview += `</footer ></div >`
    return recipeview;
}

$(function () {
    renderhome();
    $(".button").on("click", createUser);
});