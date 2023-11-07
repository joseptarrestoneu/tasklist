const getAllTasks = () => {
  
    return fetch('http://localhost:3001/api/tasks')
        .then(response => response.json())
        .then((json) => json);

}
    
export default getAllTasks;