// Importar tasks de la BBDD
const getAllTasks = () => {
    return fetch('http://localhost:3001/api/tasks')
        .then(response => response.json())
        .then((json) => json );

}

// Grabar tasks a la BBDD
const postTask = (title, initialDate, finalDate) => {

    let titleText = title;
    let descriptionText = "xxxx"
    let initialDateText = initialDate;
    let finalDateText = finalDate;
    let userTaskText = "Josep Tarrés"

    const update = {
        titleTask: titleText,
        descriptionTask: descriptionText,
        initialDate: initialDateText,
        finalDate: finalDateText,
        closedTask: false,
        userTask: userTaskText,
    };
       
    const options = {
        method: 'POST',
        headers: 
            {
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(update),
    };

    fetch('http://localhost:3001/api/tasks', options)

}

// Borrar tasks de la BBDD
const deleteTasks = (id) => {
    fetch(`http://localhost:3001/api/tasks/${id}`, { method: 'DELETE' })
}

// Editar tasks de la BBDD
const putTask = (id, title, initialDate, finalDate) => {

    let titleText = title;
    let descriptionText = "Canviat";
    let initialDateText = initialDate;
    let finalDateText = finalDate;
    let closeTaskText = false;
    let userTaskText = "Marta";

    const update = {
        titleTask: titleText,
        descriptionTask: descriptionText,
        initialDate: initialDateText,
        finalDate: finalDateText,
        closedTask: closeTaskText,
        userTask: userTaskText,
    };

    const options = {
        method: 'PUT',
        headers: 
            {
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(update),
    };

    fetch(`http://localhost:3001/api/tasks/${id}`, options)
}