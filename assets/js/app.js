window.addEventListener("load", () => {
    let id = 0;
    let alert = document.querySelector(".alert");
    let message = document.querySelector(".message");
    let form = document.querySelector(".formulario");
    let add = document.querySelector("#addTask");
    let input = document.querySelector("#task"); 
    let input1 = document.querySelector("#dateStart"); 
    let input2 = document.querySelector("#dateEnd"); 
    let arrow = document.querySelector(".arrow");
    let container = document.querySelector(".list-task");
    let done = document.querySelectorAll(".fa-circle-check")
    let trash = document.querySelectorAll(".fa-trash");
    let pencil = document.querySelectorAll(".fa-pencil");
    let task = document.querySelectorAll(".task");
    let buttonAll = document.querySelector(".all");
    let buttonToDo = document.querySelector(".todo");
    let buttonDone = document.querySelector(".done");
    let onboarding1 = document.querySelector(".onboarding1")
    let onboarding2 = document.querySelector(".onboarding2")
    let onboarding3 = document.querySelector(".onboarding3")
    let header = document.querySelector(".header")
    let main = document.querySelector(".main")
    let footer = document.querySelector(".footer")

    countTask();
    
    window.addEventListener("keydown", (event) => {

        if (event.ctrlKey && event.code == "F8" ) {
            input.focus()
        };
        if (document.querySelectorAll(".task-file").length !== 0) {
            if (event.ctrlKey && event.shiftKey && event.code == "F1" ) {
                document.querySelectorAll(".task-file")[0].remove();
            };
            if (event.ctrlKey && event.shiftKey && event.code == "F2" ) {
                document.querySelectorAll(".task-file")[document.querySelectorAll(".task-file").length-1].remove();
            };
            if (event.ctrlKey && event.shiftKey && event.code == "F5" ) {
                document.querySelectorAll(".task-file")[0].firstElementChild.lastElementChild.focus();
            };
            if (event.ctrlKey && event.shiftKey && event.code == "F6" ) {
                document.querySelectorAll(".task-file")[document.querySelectorAll(".task-file").length-1].firstElementChild.lastElementChild.focus();
            };
            if (event.ctrlKey && event.code == "Delete" ) {
                document.querySelectorAll(".task-file").forEach(item => {
                    item.remove();           
                });
            };
        }
    })

    add.addEventListener("click", () => {
        if (add.getAttribute("class") !== "fa-solid fa-circle-plus") {
            add.setAttribute("class","fa-solid fa-circle-plus");
            form.classList.add("deleted");
        } else {
            add.setAttribute("class","fa-solid fa-circle-minus");
            form.classList.remove("deleted")
        }
    });
    
    input.addEventListener("focus", () => {
        document.addEventListener("keydown", (event) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
            };
            if (event.code === "Tab" && event.target.value.length !== 0) {
                event.target.value = "";
                event.preventDefault();
            };
            if (event.ctrlKey && event.shiftKey && event.code == "KeyS") {
                addTask(id, container, message, input, input1, input2);
            };
        });
    });

    arrow.addEventListener("click", (event) => {
        // Eliminar los espacios al principio y al final del string
        if (input.value.trim() === "") {
            event.preventDefault();
            input.value = "";
            input1.value = "";
            input2.value = "";
            alert.classList.remove("dismissible");
            setTimeout(() => {
                alert.classList.add("dismissible");
            }, 3000);
        } else {
            addTask(id, container, message, input, input1, input2);
            form.classList.add("deleted");
            add.setAttribute("class","fa-solid fa-circle-plus");
        }
        done = document.querySelectorAll(".fa-circle-check");  
    });  

    // Marcar las tareas como realizadas. Hay que recorrer todos los items
    done.forEach(item => {
        item.addEventListener("click", (event) => {
            deleteTask(event);
        });        
    });

    // Borrar las tareas como realizadas. Hay que recorrer todos los items
    trash.forEach(item => {
        item.addEventListener("click", (event) => {
            removeTask(event, false);
        });        
    });

    // Editar las tareas como realizadas. Hay que recorrer todos los items
    pencil.forEach(item => {
        item.addEventListener("click", (event) => {
            editTask(event, false)
        });        
    });

    // Editar las tareas como realizadas pero desde la misma tarea. Hay que recorrer todos los items
    task.forEach(item => {
        item.addEventListener("focus", (event) => {
            editTask(event, true);
        });        
    });

    // Filtrar las tareas 
    // All
    buttonAll.addEventListener("click", () => {
        let tasks = document.querySelectorAll(".task-file");
        tasks.forEach(item => {
            item.classList.remove("deleted");
        }) 
    });
    // ToDo
    buttonToDo.addEventListener("click", () => {
        let tasks = document.querySelectorAll(".task-file");
        tasks.forEach(item => {
            item.classList.remove("deleted");
            if (item.firstElementChild.lastElementChild.dataset.completed == "true") {
                item.classList.add("deleted");
            }
        }) 
    });
    // Done
    buttonDone.addEventListener("click", () => {
        let tasks = document.querySelectorAll(".task-file");
        tasks.forEach(item => {
            item.classList.remove("deleted");
            if (item.firstElementChild.lastElementChild.dataset.completed == "false") {
                item.classList.add("deleted");
            }
        })
    });


    // Onboarding Pages
    setTimeout(() => {
        onboarding1.classList.add("deleted");
        onboarding2.classList.remove("deleted");
    }, 3000)
    setTimeout(() => {
        onboarding2.classList.add("deleted");
        onboarding3.classList.remove("deleted");
    }, 6000)
    setTimeout(() => {
        onboarding3.classList.add("deleted");
        header.classList.remove("deleted");
        main.classList.remove("deleted");
        footer.classList.remove("deleted");
    }, 9000)


});

// Funcion para generar una nueva fila (nueva nota) => refactoración
const generateRow = (id, text, date1, date2) => {
    //Opcion 1
    let newRow = `<tr id=${id} class="task-file">
        <td>
            <i class="fa-solid fa-circle-check fa-2x"></i>
            <span class="task" contenteditable="true" data-completed="false">${text}</span>
        </td>
        <td>
            <span class="task" contenteditable="true" data-completed="false">${date1}</span>
        </td>
        <td>
            <span class="task" contenteditable="true" data-completed="false">${date2}</span>
        </td>
        <td>
            <span class="fa-stack fa-2x">
                <i class="fa-solid fa-square fa-stack-2x"></i>
                <i class="fa-solid fa-pencil fa-stack-1x fa-inverse"></i>
            </span>
        </td>
        <td>
            <span class="fa-stack fa-2x">
                <i class="fa-solid fa-square fa-stack-2x"></i>
                <i class="fa-solid fa-trash fa-stack-1x fa-inverse"></i>
            </span>
        </td>
    </tr>`
    return newRow
}

// Funcion añadir tarea
const addTask = (id, container, message, input, input1, input2) => {
    id++;

    // // Control de fechas. Permitimos entrar tareas sin fecha. Si nos viene sin fechas devolvemos string vacio
    container.querySelector("tbody")?.insertAdjacentHTML("beforeend", generateRow(id, input.value, input1.valueAsDate?.toLocaleDateString() || "", input2.valueAsDate?.toLocaleDateString()  || ""));
    // Añadimos escuchador de eventos para el primer boton
    container.querySelector("tbody").lastElementChild.firstElementChild.firstElementChild.addEventListener("click", (event) => {
        deleteTask(event)
    })
    // Añadimos escuchador de eventos para el segundo boton
    container.querySelector("tbody").lastElementChild.lastElementChild.previousElementSibling.firstElementChild.lastElementChild.addEventListener("click", (event) => {
        editTask(event, false)
    })
    // Añadimos escuchador de eventos para el tercer boton
    container.querySelector("tbody").lastElementChild.lastElementChild.firstElementChild.lastElementChild.addEventListener("click", (event) => {
        removeTask(event, false)
    })
    // Añadimos escuchador de eventos para el editar el texto sin el boton
    container.querySelector("tbody").lastElementChild.firstElementChild.lastElementChild.addEventListener("focus", (event) => {
        editTask(event, true)
    })

    countTask();

    message.classList.remove("dismissible");

    setTimeout(() => {
        message.classList.add("dismissible");
    }, 3000);

    input.value = "";
    input1.value = "";
    input2.value = "";
}

// Funcion para marcar las tareas como realizadas
const deleteTask = (event) => {
    let task = event.target.nextElementSibling
    let text = task.textContent;
    if (task.querySelector("del")) {
        event.target.nextElementSibling.innerHTML = `${text}`;
        // Añadimos data-completed para dar información al programador
        task.setAttribute("data-completed", "false");
        countTask();
    } else {
        event.target.nextElementSibling.innerHTML = `<del>${text}</del>`;
        // Añadimos data-completed para dar información al programador
        task.setAttribute("data-completed", "true");
        countTask();
    }
}

// Funcion para borrar las tareas como realizadas
const removeTask = (event, editing) => {
    if (editing) {
        event.target.parentNode.parentNode.remove();
        countTask();
    } else {
        event.target.parentNode.parentNode.parentNode.remove();
        countTask();
    }
}

// Funcion para editar las tareas como realizadas
const editTask = (event, onfocus) => {
    let editask = event;
    if (onfocus) {
        editask.target.classList.add("editable");
        document.addEventListener("keydown", (event) => {
            if (event.code === "Escape") {
                editask.target.classList.remove("editable");
                editask.target.blur();
                if (editask.target.textContent.trim().length === 0) {
                    removeTask(editask, true);
                    countTask();
                }
            }
        });
        editask.target.addEventListener("blur", () => {
            if (editask.target.innerHTML === "") {
                removeTask(editask, true);
                countTask();
            }
            editask.target.classList.remove("editable");
        });
    } else {
        let editableTask = event.target.parentNode.parentNode.parentNode.firstElementChild.lastElementChild;
        editableTask.classList.add("editable");
        editableTask.focus();
        countTask();
    }
}

// Proyecto sacar funcion botones
const filtrar = (element) => {
    buttonAll.addEventListener("click", () => {
        element.forEach(item => {
            item.parentNode.parentNode.classList.remove("deleted");
            if (item.dataset.completed == "false") {
                item.parentNode.parentNode.classList.add("deleted");
            }
        }) 
    });
}

// Modo oscuro
function changeLight() {
    let main = document.querySelector(".main");
    let body = document.querySelector(".total");
    let icon = document.querySelector("#light");
    
    if (icon.getAttribute("class") !== "fa-solid fa-moon") {
        icon.setAttribute("class","fa-solid fa-moon");
    } else {
        icon.setAttribute("class","fa-solid fa-sun light-mode");
    }
    main.classList.toggle("dark")
    body.classList.toggle("dark-mode")
}

// Funcion contar tareas
function countTask () {
    let doneTaks = document.querySelectorAll(".fa-circle-check")
    let buttonAlls = document.querySelector(".all");
    let buttonToDos = document.querySelector(".todo");
    let buttonDones = document.querySelector(".done");
    let taskAll = 0; 
    let taskToDo = 0;
    let taskDone = 0;
    doneTaks.forEach((element) => {
        if (element.nextElementSibling.dataset.completed == "false") {
            taskToDo = taskToDo + 1;           
        }
        if (element.nextElementSibling.dataset.completed == "true") {
            taskDone = taskDone + 1;
        }
    })
    taskAll = taskToDo + taskDone;
    buttonAlls.firstElementChild.innerHTML = taskAll;
    buttonToDos.firstElementChild.innerHTML = taskToDo;
    buttonDones.firstElementChild.innerHTML = taskDone;
}

// PROYECTO
// Funcion calendario anual de tareas
function anualTask () {
    for (let i = 0; i < 54; i++) {
        generateDay()
    }
}

// Generar clanedario
const generateDay = (date, tasks) => {
    let newDate = `<div id="${date}">${tasks}</div>`
    return newDate
}