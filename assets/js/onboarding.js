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
        
        console.log(userName);
        console.log(userUser);
        console.log(userPassword);
        
    })

    const postUser = (name, user, password) => {

        let userName = document.forms["signingForm"]["name"].value;
        let userUser = document.forms["signingForm"]["user"].value;;
        let userPassword = document.forms["signingForm"]["password"].value;;
    
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

})