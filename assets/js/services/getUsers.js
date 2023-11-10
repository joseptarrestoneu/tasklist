export const getAllUsers = () => {
    // return fetch('http://localhost:3001/api/users')
    return fetch('https://tasklist-backend-dtk7.onrender.com/api/users')
        .then(response => response.json())
        .then((json) => json );
}