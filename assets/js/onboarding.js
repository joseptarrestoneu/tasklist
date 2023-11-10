window.addEventListener("load", () => {
    let loginButton = document.querySelector(".buttonLogin");
    let loginSignin = document.querySelector(".buttonSignin")
    let signinLink = document.querySelector(".signinLink");
    let login = document.querySelector(".login");
    let signin = document.querySelector(".signin");


    signinLink.addEventListener("click", () => {
        login.classList.add("deleted")
        signin.classList.remove("deleted")
    })

    loginSignin.addEventListener("click", (event) => {
        let userName = event.target.parentNode.firstElementChild.value;
        let userUser = event.target.parentNode.firstElementChild.nextElementSibling.value;
        let userPassword = event.target.parentNode.firstElementChild.nextElementSibling.nextElementSibling.value;
        postUser(userName, userUser, userPassword)
    })

    loginButton.addEventListener("click", () => {
        let userUser = event.target.parentNode.firstElementChild.value;
        let userPassword = event.target.parentNode.firstElementChild.nextElementSibling.value;
        getAllUsers().then(tasks => {
            tasks.map(element => {
                if (element.userUser == userUser && element.userPassword == userPassword) {
                    window.location.href='principal.html';                  
                }
            })
        })
    })
})

const postUser = (userName, userUser, userPassword) => {

    const update = {
        userName: userName,
        userUser: userUser,
        userPassword: userPassword,
    };

    console.log(update);
    

    const options = {
        method: 'POST',
        headers: 
            {
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(update),
    };

    fetch(`http://localhost:3001/api/users/`, options)
}

const getAllUsers = () => {
    return fetch('http://localhost:3001/api/users')
        .then(response => response.json())
        .then((json) => json );
}