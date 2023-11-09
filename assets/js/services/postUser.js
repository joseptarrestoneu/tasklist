const postUser = (name, user, password) => {

    let userName = name;
    let userUser = user;
    let userPassword = password;

    const update = {
        userName: userName,
        userUser: userUser,
        userPassword: userPassword,
    };

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